import React from "react";
import type { Metadata } from "next";
import { projects } from "@/lib/projectsData";
import { notFound } from "next/navigation";
import Section from "@/components/doc/Section";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL, createMetadata } from "@/lib/seo";

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  return projects.map((project) => ({ title: getSlug(project.title) }));
}

function getProjectBySlug(slug: string) {
  const normalized = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    projects.find((p) => getSlug(p.title) === normalized) ??
    projects.find((p) => {
      const s = getSlug(p.title);
      return normalized.startsWith(s) || s.startsWith(normalized);
    }) ??
    null
  );
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
    title: `${project.title} - Case Study`,
    description: `${project.description} Built with ${project.tech.join(", ")}.`,
    path: `/pow/${getSlug(project.title)}`,
    keywords: [project.title, ...project.tech, "AI Engineering Project"],
    tags: project.tech,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const project = getProjectBySlug(title);
  if (!project) notFound();

  const projectUrl = `${SITE_URL}/pow/${getSlug(project.title)}`;

  const links: { label: string; href: string }[] = [];
  if (project.link) links.push({ label: "site", href: project.link });
  if (project.appStoreLink)
    links.push({ label: "app store", href: project.appStoreLink });
  if (project.github) links.push({ label: "source", href: project.github });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/pow` },
          { name: project.title, url: projectUrl },
        ]}
      />
      <SoftwareApplicationJsonLd
        project={{
          name: project.title,
          description: project.description,
          url: project.link || projectUrl,
          image: project.image,
          applicationCategory:
            project.category === "mobile" ? "MobileApplication" : "WebApplication",
          codeRepository: project.github,
          programmingLanguage: project.tech,
        }}
      />

      <article>
        <header>
          <h1 className="text-[1.6rem] font-semibold tracking-tight">
            {project.title}
          </h1>

          {links.length > 0 && (
            <p className="mt-1 text-[0.95rem]">
              {links.map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="text-muted-foreground"> · </span>}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </p>
          )}

          <p className="mt-4 leading-relaxed">{project.description}</p>

          {project.stats && project.stats.length > 0 && (
            <p className="mt-3 text-[0.95rem] text-muted-foreground">
              {project.stats.join(" · ")}
            </p>
          )}
        </header>

        <Section label="the problem">
          <p className="leading-relaxed">{project.problem}</p>
        </Section>

        <Section label="what i built">
          <p className="leading-relaxed">{project.solution}</p>
        </Section>

        <Section label="why it's interesting">
          <p className="leading-relaxed">{project.whyThis}</p>
        </Section>

        <Section label="built with">
          <p className="leading-relaxed text-muted-foreground">
            {project.tech.join(", ").toLowerCase()}
          </p>
        </Section>
      </article>
    </>
  );
}
