import React from "react";
import type { Metadata } from "next";
import World from "@/components/home/World";

// Test page. Renders the visitor map, which reads /api/user-locations ->
// Prisma (UserLog) -> geoip-lite, cached in Upstash Redis for 30 days.
// Kept out of the sitemap and out of the index on purpose.
export const metadata: Metadata = {
  title: "World",
  description: "Visitor map.",
  robots: { index: false, follow: false },
};

export default function WorldPage() {
  return (
    <>
      <h1 className="doc-label">where people read this from</h1>
      <World />
    </>
  );
}
