import { env } from "./env";

const CDN = env.NEXT_PUBLIC_CLOUDFRONT_URL;

// Media for the home page mosaic. The written case studies live in
// projectsData.ts.
export const REMJOBS_SHOTS = [
  "/remjobs.jpg",
  "/work/remjobs-jobs.jpg",
  "/work/remjobs-mcp.jpg",
];
export const CRAFT_PHONES = [`${CDN}/ct1.png`, `${CDN}/ct4.png`];
