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
