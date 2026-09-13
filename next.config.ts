import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "d3uhdrv85r0gh2.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
    deviceSizes: [320, 640, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  serverExternalPackages: ["geoip-lite"],

  // Next's output-file tracer runs under Node, so it resolves every package
  // through the "default" export condition. pg-cloudflare - the TCP socket shim
  // that lets @prisma/adapter-pg talk to Postgres from a Worker - exposes
  // dist/empty.js under "default" and its real implementation only under the
  // "workerd" condition. The tracer therefore copies empty.js and nothing else.
  //
  // OpenNext then bundles with esbuild using the workerd condition, where
  // require('pg-cloudflare') resolves to dist/index.js, which was never copied,
  // and the build dies with "Could not resolve pg-cloudflare". The error names
  // the package, but the package is fine - the two steps simply disagree about
  // which export condition applies. Forcing the workerd entry points into the
  // trace makes them agree.
  outputFileTracingIncludes: {
    "**/*": [
      "./node_modules/pg-cloudflare/dist/**",
      "./node_modules/pg-cloudflare/esm/**",
    ],
  },

  // The tracer is indiscriminate about Prisma's build directory: it copies every
  // query compiler Prisma ships (mysql, sqlite, cockroachdb, sqlserver - this app
  // is postgresql only), both the "fast" and "small" variants, the schema engine,
  // and pglite, an entire Postgres compiled to wasm that only Prisma's local dev
  // tooling uses. That was ~60MB of wasm in the Worker, none of it reachable.
  //
  // The postgresql compiler the app actually needs is NOT excluded here: it is
  // imported statically from src/generated/prisma/internal and travels with the
  // module graph rather than through this trace.
  outputFileTracingExcludes: {
    "**/*": [
      "./node_modules/prisma/build/**",
      "./node_modules/@prisma/dev/**",
      "./node_modules/@electric-sql/pglite/**",
      "./node_modules/@electric-sql/pglite-tools/**",
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // /hire and /services are gone entirely - see src/proxy.ts, which
      // 308s the whole tree. No per-slug redirects needed here any more.
      {
        source: "/work",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pow/kill-switch",
        destination: "/pow",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              chunks: "all",
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module: any) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module: any) {
                const hash = require("crypto")
                  .createHash("sha1")
                  .update(module.identifier())
                  .digest("hex")
                  .substring(0, 8);
                return `lib-${hash}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module: any, chunks: any) {
                return (
                  require("crypto")
                    .createHash("sha1")
                    .update(
                      chunks.reduce((acc: string, chunk: any) => {
                        return acc + chunk.name;
                      }, "")
                    )
                    .digest("hex")
                    .substring(0, 8)
                );
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
      };
    }

    return config;
  },
  turbopack: {},
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
