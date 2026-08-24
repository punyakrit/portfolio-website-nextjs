import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "./_og/render";

export const alt = "Punyakrit Singh Makhni - AI Engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "AI ENGINEER",
    title: "Punyakrit Singh Makhni",
    line: "I build multi-model agent systems, and make them reliable enough to ship.",
    meta: "punyakrit.dev · open to ai engineer roles · remote",
  });
}
