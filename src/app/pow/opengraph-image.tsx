import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "../_og/render";

export const alt = "Projects - Punyakrit Singh Makhni";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "WHAT I'VE BUILT",
    title: "Projects",
    line: "Agent pipelines, generative video systems, and RAG over large codebases - with the architecture decisions behind them.",
    meta: "punyakrit.dev/pow",
  });
}
