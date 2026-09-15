import { env } from "./env";

/**
 * Banner images, all served from CloudFront.
 *
 * The list is built defensively because the base URL is not always there. The
 * old version interpolated `env.NEXT_PUBLIC_CLOUDFRONT_URL` straight into a
 * template literal, so a missing value produced the string "undefined/bg.jpeg".
 * `next/image` rejects that as an invalid src and THROWS, which escalated a
 * missing environment variable into a 500 on the entire homepage.
 *
 * That is not hypothetical. `scripts/cf-build.mjs` deliberately moves the .env
 * files aside for the duration of a build so secrets are not snapshotted into
 * the Worker bundle; a dev server started inside that window boots with no
 * NEXT_PUBLIC_* values at all and never recovers them. A fresh clone with no
 * .env does the same thing.
 *
 * So: no base URL, no banners. Hero renders without one rather than taking the
 * page down.
 */
const CDN = env.NEXT_PUBLIC_CLOUDFRONT_URL;

const BANNER_FILES = [
    "bg.jpeg",
    "bg1.jpg",
    "bg2.jpg",
    "bg3.jpg",
    "bg4.jpg",
    "bg5.jpg",
    "bg6.jpg",
    "bg7.jpg",
    "bg8.jpg",
    "bg9.jpg",
    "bg10.jpg",
    "bg11.jpg",
    "bg12.jpg",
    "bg13.jpg",
    "bg14.jpg",
] as const;

export const bannerImages: string[] = CDN
    ? BANNER_FILES.map((file) => `${CDN}/${file}`)
    : [];
