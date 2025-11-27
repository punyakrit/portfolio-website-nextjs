import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow only your CloudFront domain (safer than wildcard)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3uhdrv85r0gh2.cloudfront.net",
      },
    ],
    // make transforms predictable & limited to a few sizes
    deviceSizes: [320, 640, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 1 day — helps edge caches keep images longer
  },
};

export default nextConfig;
