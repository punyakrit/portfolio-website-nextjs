import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "./_og/render";

export const alt = "Punyakrit Singh Makhni - Full Stack Engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "FULL STACK ENGINEER",
    title: "Punyakrit Singh Makhni",
    line: "I build and ship full stack products end to end - web, mobile, and the AI features inside them.",
    meta: "punyakrit.dev · open to full stack engineer roles · remote",
  });
}
