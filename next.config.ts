import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3uhdrv85r0gh2.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
