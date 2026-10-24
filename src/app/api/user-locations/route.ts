import { getVisitorLocations } from "@/lib/query/query";
import { NextResponse } from "next/server";

/**
 * Visitor map data: one point per location, with visits summed.
 *
 * Coordinates are stored on UserLog when a visit is written, from Cloudflare's
 * request.cf (see src/lib/request-geo.ts). This route used to geolocate stored
 * IPs with geoip-lite on every cache miss, which cannot run in a Worker, and
 * cached the result in Upstash Redis, which no longer exists - between them the
 * map had been empty since the move to Cloudflare.
 */
export async function GET() {
  try {
    const locations = await getVisitorLocations();
    return NextResponse.json(locations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
