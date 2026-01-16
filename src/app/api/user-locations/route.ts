import { getAllUserLocations } from "@/lib/query/query";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

function getGeoip() {
    try {
        if (typeof require !== 'undefined') {
            return require("geoip-lite");
        }
        return null;
    } catch (error) {
        console.error("Failed to load geoip-lite:", error);
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
        const geoip = getGeoip();
        if (!geoip) {
            return NextResponse.json(
                { error: "GeoIP service unavailable" },
                { status: 503 }
            );
        }

        const allData = await getAllUserLocations()
        const locationsWithCoords = allData.map((data) => {
            const ip = data.ip
            let latitude = 0;
            let longitude = 0;
            
            try {
                const location = geoip.lookup(ip as string);
                if (location && location.ll) {
                    latitude = location.ll[0] || 0;
                    longitude = location.ll[1] || 0;
                }
            } catch (lookupError) {
                console.error(`Error looking up IP ${ip}:`, lookupError);
            }
            
            return {
                ...data,
                latitude,
                longitude
            }
        })
        await redis.set("user-locations", locationsWithCoords, {
            ex: 60 * 60 * 2, 
        });
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

