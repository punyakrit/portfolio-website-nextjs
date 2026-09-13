import { Redis } from "@upstash/redis";

/**
 * Two things differ from the stock `Redis.fromEnv()` this used to be.
 *
 * 1. `cache: "default"`.
 *    @upstash/redis hard-defaults its fetch to `cache: "no-store"`
 *    (see node_modules/@upstash/redis/nodejs.mjs, the HttpClient constructor).
 *    Next reads a `no-store` fetch as an explicit request to bail out of static
 *    rendering. On a route that is already dynamic that is harmless, which is
 *    why it never caused trouble on Vercel. Inside a Worker, hitting it partway
 *    through generating an ISR page aborts the generation instead, and the
 *    failure surfaces as a stale or missing page rather than as an error
 *    pointing at Redis. Any client that defaults to `no-store` needs this.
 *
 * 2. Lazy construction.
 *    OpenNext populates `process.env` from the Cloudflare bindings during its
 *    init, before a request is handled - but module scope can evaluate earlier
 *    than you expect. Building the client on first use rather than on import
 *    means the credentials are always there by the time they are read.
 */
let client: Redis | null = null;

export function getRedis(): Redis {
  if (client) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Upstash Redis is not configured: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are missing."
    );
  }

  client = new Redis({ url, token, cache: "default" });
  return client;
}
