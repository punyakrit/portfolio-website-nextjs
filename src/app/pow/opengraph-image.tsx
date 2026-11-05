import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "../_og/render";

export const alt = "What Punyakrit Singh Makhni has built";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "What I've built",
    line: "Six products shipped end to end: RemJobs, an AI demo video builder, a generative video pipeline, retrieval over large codebases, uptime monitoring and an iOS app.",
    meta: "punyakrit.dev/pow",
  });
}
