import { getAllUserLocations } from "@/lib/query/query";
import { getRedis } from "@/lib/redis";
import { NextResponse } from "next/server";

/**
 * geoip-lite cannot run on Workers, and this is not a bundling problem that can
 * be configured away: the package resolves IPs by reading .dat files off disk
 * with node:fs, and those files are 153 MB. A Worker has no filesystem, and the
 * whole script has to fit in 3 MB compressed on the free plan. There is no
 * arrangement of `serverExternalPackages` that makes that work.
 *
 * So the lookup is attempted only on a real Node runtime (local `next dev`),
 * and skipped in the Worker. The alternative - geolocating every stored IP
 * through an HTTP API - would mean one subrequest per row against a 50
 * subrequest/request cap, which works locally, where the cap is not enforced,
 * and 500s in production once the table has more than ~50 rows. That is the
 * trap, not the fix.
 *
 * Consequence, stated plainly: on Cloudflare this returns rows with
 * latitude/longitude of 0, the client drops them (World.tsx filters zeroes), and
 * /world renders an empty map. `geoResolved` in the payload says so explicitly
 * rather than leaving it to be inferred from an empty map. The real fix is to
 * record geo at write time from Cloudflare's own request data, which needs
 * columns on UserLog that do not exist yet.
 */
const IS_WORKER =
  typeof navigator !== "undefined" &&
  navigator.userAgent === "Cloudflare-Workers";

type Geoip = { lookup: (ip: string) => { ll?: [number, number] } | null };

let geoipCache: Geoip | null = null;

async function getGeoip(): Promise<Geoip | null> {
  if (IS_WORKER) return null;
  if (geoipCache) return geoipCache;

  try {
    const mod = await import("geoip-lite");
    geoipCache = (mod.default ?? mod) as unknown as Geoip;
    return geoipCache;
  } catch (error) {
    console.error("Failed to load geoip-lite:", error);
    return null;
  }
}

const CACHE_KEY = "user-locations";

export async function GET() {
  try {
    const redis = getRedis();

    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const geoip = await getGeoip();
    const allData = await getAllUserLocations();

    let resolved = 0;
    const locationsWithCoords = allData.map((data) => {
      const ip = data.ip;
      let latitude = 0;
      let longitude = 0;

      if (geoip) {
        try {
          const location = geoip.lookup(ip as string);
          if (location && location.ll) {
            latitude = location.ll[0] || 0;
            longitude = location.ll[1] || 0;
            if (latitude !== 0 || longitude !== 0) resolved++;
          }
        } catch (lookupError) {
          console.error(`Error looking up IP ${ip}:`, lookupError);
        }
      }

      return { ...data, latitude, longitude };
    });

    // Only cache a result geoip actually resolved. Caching a failed pass
    // writes all-zero coordinates under a 30-day TTL, and because the cache
    // is checked first, every later request serves those zeros and geoip is
    // never consulted again - the map stays empty until the key is deleted
    // by hand. Better to recompute on the next request than to poison it.
    //
    // This matters more on Workers, not less: geo never resolves there, so
    // without this guard the very first production request would pin an empty
    // map in Redis for 30 days and it would survive the geo fix.
    if (resolved > 0) {
      await redis.set(CACHE_KEY, locationsWithCoords, {
        ex: 60 * 60 * 24 * 30,
      });
    } else if (allData.length > 0) {
      console.warn(
        `user-locations: geo resolved 0 of ${allData.length} IPs` +
          (IS_WORKER ? " (expected on Workers - geoip-lite cannot run here)" : "") +
          " - skipping cache write."
      );
    }

    return NextResponse.json(locationsWithCoords, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Lets a caller tell "no visitors yet" apart from "geo lookup is
        // unavailable on this platform" without reading the logs.
        "X-Geo-Resolved": resolved > 0 ? "true" : "false",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
