import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Built on first use, not on import.
 *
 * The previous version constructed PrismaPg at module scope, reading
 * process.env.DATABASE_URL as a side effect of the import. That is fine on a
 * long-lived Node server, where the environment is populated before anything is
 * required. Inside a Worker the bindings are copied into process.env by
 * OpenNext's init, and module evaluation can happen before that has run - so the
 * adapter would be built around `undefined` and every query would fail against a
 * connection string that looked fine in the dashboard.
 *
 * The Proxy keeps the `prisma.user.findMany()` call shape every caller already
 * uses, so nothing downstream changes; it just defers construction to the first
 * property access, by which point the environment is guaranteed to be there.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Inside a Worker the client is per request, not global.
 *
 * PrismaPg keeps a pg pool, and a pooled socket belongs to the request that
 * opened it: Workers do not allow one request to do I/O on another request's
 * socket. With a single global client, request B picked up the idle connection
 * request A left in the pool, and the runtime killed B as hung ("Worker's code
 * had hung and would never generate a response"). The broken socket was then
 * dropped, so request C reconnected and worked - every other database call
 * failed, which is how half of all visits went unrecorded.
 *
 * The key is the request's Cloudflare context object, which OpenNext creates
 * fresh for each request, so the WeakMap lets each client go with its request.
 */
const clientsByRequest = new WeakMap<object, PrismaClient>();

function getRequestScope(): object | null {
  try {
    return getCloudflareContext();
  } catch {
    // `next dev` and the build run on plain Node, where a socket can serve any
    // request, so the global client below is fine there.
    return null;
  }
}

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. On Cloudflare this is a Worker secret - set it " +
        "with `wrangler secret put DATABASE_URL`, not in a .env file (those are " +
        "snapshotted into the bundle at build time)."
    );
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

function getClient(): PrismaClient {
  const scope = getRequestScope();
  if (scope) {
    let client = clientsByRequest.get(scope);
    if (!client) {
      client = createClient();
      clientsByRequest.set(scope, client);
    }
    return client;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient() as object, prop, receiver);
  },
  has(_target, prop) {
    return Reflect.has(getClient() as object, prop);
  },
});
