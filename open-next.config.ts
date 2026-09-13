import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

/**
 * IMPORTANT: every override in this object defaults to "dummy", which is a
 * silent no-op - not a slower fallback. Leaving `incrementalCache` out does not
 * downgrade caching, it removes caching entirely, with no build error and no
 * runtime warning. Two routes here depend on it:
 *
 *   - `/`            ISR, 6h  (CommitsSection fetches the GitHub contributions
 *                              API with `next: { revalidate: 60 * 60 * 6 }`)
 *   - `/sitemap.xml` ISR, 1h  (`export const revalidate = 3600`)
 *
 * With a dummy cache both would refetch on every single request, which on the
 * free plan burns request quota and CPU for no reason, and hammers a third-party
 * API that has no business being called on every page view.
 *
 * tagCache is deliberately left unset. That IS the dummy no-op, and it is the
 * right call here only because nothing in this codebase calls revalidateTag or
 * revalidatePath - all revalidation is time-based, which the incrementalCache
 * handles on its own. If tag-based revalidation is ever added, this must become
 * a real implementation (d1NextTagCache or doShardedTagCache) or the new
 * revalidation will appear to work and quietly do nothing.
 */
export default defineCloudflareConfig({
  // R2 is the durable store; the regional Cache API layer in front of it keeps
  // repeat reads in-colo so an ISR hit doesn't pay an R2 round trip every time.
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),

  // Regenerates ISR pages after they go stale. Requires the WORKER_SELF_REFERENCE
  // service binding in wrangler.jsonc - without it this throws at revalidation
  // time, not at build time.
  queue: memoryQueue,
});
