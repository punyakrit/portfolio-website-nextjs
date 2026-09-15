import React from "react";
import type { Metadata } from "next";
import { projects } from "@/lib/projectsData";
import ProjectsExplorer from "@/components/pow/ProjectsExplorer";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const metadata: Metadata = {
  title: "Projects | Full Stack Web, Mobile and AI Features",
  description:
    "Products built by Punyakrit Singh Makhni, with the architecture decisions behind them. A multi-model video agent, a generative video pipeline, retrieval over large codebases, distributed monitoring, and an iOS app.",
  alternates: { canonical: "/pow" },
  openGraph: {
    title: "Projects | Punyakrit Singh Makhni",
    description:
      "Full stack products - web, mobile, and the AI features inside them - with the engineering decisions behind them.",
    url: `${SITE_URL}/pow`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Punyakrit Singh Makhni",
    description:
      "Full stack products - web, mobile, and the AI features inside them - with the engineering decisions behind them.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-6 md:px-8 my-12 md:my-16">
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

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          What I&apos;ve built
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Production applications I&apos;ve shipped end to end - web, mobile, and
          the AI features inside them. Each one covers the problem, the
          architecture, the implementation and the deployment.
        </p>
      </header>

      <ProjectsExplorer />
    </div>
  );
}
