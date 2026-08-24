import React from "react";
import type { Metadata } from "next";
import { projects } from "@/lib/projectsData";
import ProofOfWork from "@/components/doc/ProofOfWork";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const metadata: Metadata = {
  title: "Projects | AI Agents, LLM Pipelines, RAG",
  description:
    "AI systems built by Punyakrit Singh Makhni, with the architecture decisions behind them. A multi-model video agent, a generative video pipeline, RAG over large codebases, and distributed monitoring.",
  alternates: { canonical: "/pow" },
  openGraph: {
    title: "Projects | Punyakrit Singh Makhni",
    description:
      "AI agent systems and LLM pipelines, with the engineering decisions behind them.",
    url: `${SITE_URL}/pow`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.name} - AI Engineer`,
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/pow` },
        ]}
      />
      <ItemListJsonLd
        items={projects.map((project) => ({
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/pow/${getSlug(project.title)}`,
          image: project.image,
        }))}
      />

      <h1 className="doc-label">what i&apos;ve built</h1>
      <ProofOfWork />
    </>
  );
}
