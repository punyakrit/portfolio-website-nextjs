import React from "react";
import type { Metadata } from "next";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Globe, Github, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, createMetadata } from "@/lib/seo";
import { generateRelatedPages } from "@/lib/seo/linking";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    title: getSlug(project.title),
  }));
}

function normalizeSlug(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProjectBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);

  const exactMatch = projects.find(
    (project) => getSlug(project.title) === normalizedSlug
  );
  if (exactMatch) return exactMatch;

  const startsWithMatch = projects.find((project) => {
    const projectSlug = getSlug(project.title);
    return (
      normalizedSlug.startsWith(projectSlug) ||
      projectSlug.startsWith(normalizedSlug)
    );
  });
  if (startsWithMatch) return startsWithMatch;

  return null;
}

function getTechIcon(techName: string) {
  const normalizedName = techName.toLowerCase().trim();
  const skill = skills.find((s) => {
    const skillName = s.name.toLowerCase().trim();
    return (
      skillName === normalizedName ||
      skillName.replace(/[.\s-]/g, "") ===
        normalizedName.replace(/[.\s-]/g, "") ||
      (normalizedName.includes("next") && skillName.includes("next")) ||
      (normalizedName.includes("typescript") &&
        skillName.includes("typescript")) ||
      (normalizedName.includes("react") && skillName.includes("react")) ||
      (normalizedName.includes("postgresql") &&
        skillName.includes("postgresql")) ||
      (normalizedName.includes("mongodb") && skillName.includes("mongodb")) ||
      (normalizedName.includes("redis") && skillName.includes("redis")) ||
      (normalizedName.includes("node") && skillName.includes("node")) ||
      (normalizedName.includes("tailwind") && skillName.includes("tailwind")) ||
      (normalizedName.includes("vercel") && skillName.includes("vercel"))
    );
  });
  return skill?.icon;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const { title } = await params;
  const project = getProjectBySlug(title);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return createMetadata({
    title: `${project.title} - Case Study | Full-Stack Web Development Project`,
    description: `${project.description} Built with ${project.tech.join(", ")}. A production-grade project by Punyakrit Singh Makhni showcasing real-world problem solving and modern web development.`,
    path: `/pow/${getSlug(project.title)}`,
    keywords: [
      project.title,
      ...project.tech,
      "Web Development Case Study",
      "Full-Stack Project",
      "Production App",
      "Developer Portfolio",
      "Open Source Project",
    ],
    tags: project.tech,
    image: {
      url: project.image,
      alt: `${project.title} - Project Screenshot`,
    },
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const project = getProjectBySlug(title);

  if (!project) {
    notFound();
  }

  const projectUrl = `${SITE_URL}/pow/${getSlug(project.title)}`;
  const projectSlug = getSlug(project.title);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Projects", url: `${SITE_URL}/pow` },
    { name: project.title, url: projectUrl },
  ];

  const relatedPages = generateRelatedPages(
    projects
      .filter((p) => getSlug(p.title) !== projectSlug)
      .map((p) => ({
        title: p.title,
        url: `${SITE_URL}/pow/${getSlug(p.title)}`,
        description: p.description,
        relevance: p.tech.filter((tech) => project.tech.includes(tech)).length,
      })),
    projectUrl,
    project.tech,
    6
  );

  return (
    <TooltipProvider>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareApplicationJsonLd
        project={{
          name: project.title,
          description: project.description,
          url: project.link,
          image: project.image,
          codeRepository: project.github,
          programmingLanguage: project.tech,
        }}
      />

      <article className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <Button variant="ghost" className="mb-6 -ml-2" asChild>
          <Link href="/pow">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <div className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {project.title}
              </h1>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit website</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {project.description}
            </p>
          </header>

          <div className="relative w-full rounded-lg overflow-hidden bg-muted border border-border">
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              aria-label={`${project.title} demo video`}
            />
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Project Overview
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.summary}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {project.tech.map((tech, index) => {
                  const TechIcon = getTechIcon(tech);
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm cursor-default hover:bg-muted/80 transition-colors">
                          {TechIcon ? (
                            <TechIcon className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <span className="w-4 h-4 flex items-center justify-center text-[10px] font-semibold bg-foreground/10 rounded">
                              {tech.charAt(0).toUpperCase()}
                            </span>
                          )}
                          <span>{tech}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tech}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                The Problem
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                The Solution
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Why I Built This
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.whyThis}
              </p>
            </section>
          </div>

          {relatedPages.length > 0 && (
            <RelatedPages pages={relatedPages} title="Related Projects" />
          )}

          <footer className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-sm text-muted-foreground">
                Interested in working together? Let&apos;s build something great.
              </p>
              <Button asChild>
                <Link href="https://cal.com/punyakrit" target="_blank">
                  Book a Free Call
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </article>
    </TooltipProvider>
  );
}
