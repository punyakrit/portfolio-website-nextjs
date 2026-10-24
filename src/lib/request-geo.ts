import { getCloudflareContext } from "@opennextjs/cloudflare";

export type Coordinates = { latitude: number; longitude: number };

/**
 * The current visitor's approximate location, from Cloudflare's `request.cf`.
 *
 * Coordinates are recorded when a visit is written because the Worker cannot
 * work them out later: geoip-lite resolves IPs from 153 MB of .dat files read
 * off disk, and a Worker has neither the filesystem nor the script size for
 * that. Cloudflare has already geolocated every request it proxies, so the
 * answer is sitting on the request.
 *
 * Returns null outside a Worker (`next dev` has no request.cf, so
 * getCloudflareContext throws) and when Cloudflare could not place the IP.
 */
export function getRequestCoordinates(): Coordinates | null {
  try {
    const { cf } = getCloudflareContext<{
      latitude?: string;
      longitude?: string;
    }>();
    const latitude = Number(cf?.latitude);
    const longitude = Number(cf?.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    if (latitude === 0 && longitude === 0) return null;

    return { latitude, longitude };
  } catch {
    return null;
  }
}
