import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
