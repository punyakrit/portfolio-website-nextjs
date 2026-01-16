"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

interface UserLocation {
  ip: string;
  visitCount: number;
  latitude: number;
  longitude: number;
}

interface ProcessedLocation {
  lng: number;
  lat: number;
  level: "high" | "medium" | "low";
  visitCount: number;
}

const getMarkerSize = (level: string) => {
  switch (level) {
    case "high":
      return "h-6 w-6";
    case "medium":
      return "h-4 w-4";
    case "low":
      return "h-3 w-3";
    default:
      return "h-4 w-4";
  }
};

const getMarkerOpacity = (level: string) => {
  switch (level) {
    case "high":
      return "opacity-100";
    case "medium":
      return "opacity-75";
    case "low":
      return "opacity-50";
    default:
      return "opacity-75";
  }
};

const getLevelFromVisitCount = (visitCount: number): "high" | "medium" | "low" => {
  if (visitCount >= 10) return "high";
  if (visitCount >= 3) return "medium";
  return "low";
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const clusterLocations = (
  locations: ProcessedLocation[],
  thresholdKm: number = 50
): ProcessedLocation[] => {
  const clusters: ProcessedLocation[] = [];
  const used = new Set<number>();

  for (let i = 0; i < locations.length; i++) {
    if (used.has(i)) continue;

    const cluster: ProcessedLocation[] = [locations[i]];
    used.add(i);
    let totalVisits = locations[i].visitCount;
    let weightedLat = locations[i].lat * locations[i].visitCount;
    let weightedLng = locations[i].lng * locations[i].visitCount;

    for (let j = i + 1; j < locations.length; j++) {
      if (used.has(j)) continue;

      const distance = calculateDistance(
        locations[i].lat,
        locations[i].lng,
        locations[j].lat,
        locations[j].lng
      );

      if (distance <= thresholdKm) {
        cluster.push(locations[j]);
        used.add(j);
        totalVisits += locations[j].visitCount;
        weightedLat += locations[j].lat * locations[j].visitCount;
        weightedLng += locations[j].lng * locations[j].visitCount;
      }
    }

    const avgLat = weightedLat / totalVisits;
    const avgLng = weightedLng / totalVisits;

    clusters.push({
      lat: avgLat,
      lng: avgLng,
      visitCount: totalVisits,
      level: getLevelFromVisitCount(totalVisits),
    });
  }

  return clusters;
};

function World() {
  const [userLocations, setUserLocations] = useState<ProcessedLocation[]>([]);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await fetch("/api/user-locations");
        if (!response.ok) {
          throw new Error("Failed to fetch user locations");
        }
        const data: UserLocation[] = await response.json();
        
        const filteredLocations = data.filter((location) => {
          return (
            location.latitude !== 0 &&
            location.longitude !== 0 &&
            !isNaN(location.latitude) &&
            !isNaN(location.longitude)
          );
        });

        const processedLocations: ProcessedLocation[] = filteredLocations.map((location) => ({
          lng: location.longitude,
          lat: location.latitude,
          level: getLevelFromVisitCount(location.visitCount),
          visitCount: location.visitCount,
        }));

        const clusteredLocations = clusterLocations(processedLocations, 50);
        const total = clusteredLocations.reduce((sum, loc) => sum + loc.visitCount, 0);
        
        setUserLocations(clusteredLocations);
        setTotalVisits(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user locations:", error);
        setLoading(false);
      }
    };

    fetchUserLocations();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8" aria-labelledby="world-heading">
      <div className="relative w-full max-w-7xl mx-auto">
        <Card className="h-[400px]  p-0 overflow-hidden relative">
          <div className="h-full w-full">
            <Map center={[0, 20]} zoom={1.5} theme="dark">
            {userLocations.map((location, index) => (
              <MapMarker
                key={`${location.lat}-${location.lng}-${index}`}
                longitude={location.lng}
                latitude={location.lat}
              >
                <MarkerContent>
                  <div
                    className={`${getMarkerSize(
                      location.level
                    )} ${getMarkerOpacity(
                      location.level
                    )} rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse`}
                  />
                </MarkerContent>
              </MapMarker>
            ))}
            </Map>
          </div>

          <div className="absolute top-4 left-4 z-10">
            <Card className="bg-black/80 dark:bg-black/90 backdrop-blur-sm border-gray-800 p-3 min-w-[140px]">
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider ">
                Total Visits
              </h3>
              <div className="text-2xl -mt-3 font-bold text-white mb-1">
                {loading ? "..." : totalVisits.toLocaleString()}
              </div>
              
            </Card>
          </div>

          <div className="absolute bottom-3 left-3 z-10">
            <Card className="bg-black/80 dark:bg-black/90 backdrop-blur-sm border-gray-800 p-2">
              <div className="flex  gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 opacity-100" />
                  <span className="text-xs text-white/70">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 opacity-75" />
                  <span className="text-[10px] text-white/70">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 opacity-50" />
                  <span className="text-[8px] text-white/70">Low</span>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default World;