import { getAllUserLocations } from "@/lib/query/query";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

let geoipCache: any = null;

async function getGeoip() {
    if (geoipCache) {
        return geoipCache;
    }
    
    try {
        if (typeof require !== 'undefined') {
            const geoip = require("geoip-lite");
            geoipCache = geoip;
            
            try {
                const testLookup = geoip.lookup("8.8.8.8");
                if (!testLookup) {
                    console.warn("geoip-lite loaded but test lookup failed - data files may be missing");
                }
            } catch (testError) {
                console.warn("geoip-lite data files check failed:", testError);
            }
            
            return geoipCache;
        }
        return null;
    } catch (error: any) {
        if (error.code === 'ENOENT' && error.path?.includes('geoip')) {
            console.error("geoip-lite data files not found. Ensure geoip-lite is properly installed with data files.");
        } else {
            console.error("Failed to load geoip-lite:", error);
        }
        return null;
    }
}

export async function GET() {
    try {
        const checkCache = await redis.get("user-locations");
        if(checkCache) {
            return NextResponse.json(checkCache, {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        const geoip = await getGeoip();
        const allData = await getAllUserLocations()
        let resolved = 0;
        const locationsWithCoords = allData.map((data) => {
            const ip = data.ip
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

            return {
                ...data,
                latitude,
                longitude
            }
        })

        // Only cache a result geoip actually resolved. Caching a failed pass
        // writes all-zero coordinates under a 30-day TTL, and because the cache
        // is checked first, every later request serves those zeros and geoip is
        // never consulted again - the map stays empty until the key is deleted
        // by hand. Better to recompute on the next request than to poison it.
        if (resolved > 0) {
            await redis.set("user-locations", locationsWithCoords, {
                ex: 60 * 60 * 24 * 30,
            });
        } else if (allData.length > 0) {
            console.warn(
                `user-locations: geoip resolved 0 of ${allData.length} IPs - skipping cache write.`
            );
        }
        return NextResponse.json(locationsWithCoords, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }
}

