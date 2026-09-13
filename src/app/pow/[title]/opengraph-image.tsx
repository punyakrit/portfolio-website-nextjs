import { projects } from "@/lib/projectsData";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "../../_og/render";

export const alt = "Case study - Punyakrit Singh Makhni";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return projects.map((project) => ({ title: getSlug(project.title) }));
}

// Every card is prerendered at build time, and nothing may be rendered on
// demand. renderOgImage reads its two .ttf files off disk, which only exists
// while Next is building - a Worker has no filesystem. Left at the default
// (true), a request for an unknown slug would try to render the fallback card
// at runtime and 500 on the font read. false makes those 404 instead, without
// executing the renderer.
export const dynamicParams = false;

// Each case study gets its own card, built from the same data the page renders.
export default async function Image({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const project = projects.find((p) => getSlug(p.title) === title);

  if (!project) {
    return renderOgImage({
      eyebrow: "CASE STUDY",
      title: "Projects",
      line: "Agent pipelines, generative video systems, and RAG over large codebases.",
      meta: "punyakrit.dev/pow",
    });
  }

  return renderOgImage({
    eyebrow: "CASE STUDY",
    title: project.title,
    line: project.summary,
    meta: `punyakrit.dev · ${project.tech.slice(0, 4).join(" · ").toLowerCase()}`,
  });
}
