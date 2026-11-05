import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "./_og/render";

export const alt = "Punyakrit Singh Makhni, full-stack AI engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    title: "Punyakrit Singh Makhni",
    line: "Full-stack AI engineer. I build AI products end to end: the model makes the judgment calls and plain code carries them out.",
    meta: "punyakrit.dev",
  });
}
