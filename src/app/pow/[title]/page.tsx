import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projectsData";
import { projectSlug } from "@/lib/projectSlug";
import Section, { WRAP } from "@/components/landing/Section";
import Screenshot from "@/components/landing/Screenshot";
import { Facts } from "@/components/landing/Work";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL, createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return projects.map((project) => ({ title: projectSlug(project.title) }));
}

function getProjectBySlug(slug: string) {
  const normalized = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    projects.find((p) => projectSlug(p.title) === normalized) ??
    projects.find((p) => {
      const s = projectSlug(p.title);
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
    path: `/pow/${projectSlug(project.title)}`,
    keywords: [project.title, ...project.tech, "Full Stack Engineering Project"],
    tags: project.tech,
    image: {
      url: project.image,
      alt: `${project.title} - project screenshot`,
    },
    type: "article",
  });
}

const host = (url: string) => new URL(url).host.replace(/^www\./, "");

const prose = "max-w-[62ch] text-lg leading-[1.6]";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const project = getProjectBySlug(title);
  if (!project) notFound();

  const projectUrl = `${SITE_URL}/pow/${projectSlug(project.title)}`;
  const others = projects.filter((p) => p.title !== project.title);

  return (
    <article>
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
            project.category === "mobile"
              ? "MobileApplication"
              : "WebApplication",
          codeRepository: project.github,
          programmingLanguage: project.tech,
        }}
      />

      <header className={`${WRAP} pt-8 sm:pt-12`}>
        <Link
          href="/pow"
          className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          All work
        </Link>

        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.03em]">
          {project.title}
        </h1>

        <div className="mt-6 grid gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[52ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.4] lg:col-span-8">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-4 lg:justify-self-end">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background no-underline transition-opacity hover:opacity-85"
              >
                Open {host(project.link)}
              </a>
            )}
            {project.appStoreLink && (
              <a
                href={project.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  project.link
                    ? "text-sm underline-offset-4"
                    : "inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background no-underline transition-opacity hover:opacity-85"
                }
              >
                On the App Store
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline-offset-4"
              >
                Source on GitHub
              </a>
            )}
          </div>
        </div>

        {project.tiles ? (
          <div className="mt-3 max-w-[56rem]">
            <Facts project={project} columns="grid-cols-2 sm:grid-cols-4" />
          </div>
        ) : project.stats?.length ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {project.stats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className={`${WRAP} mt-10 sm:mt-14`}>
        {project.video ? (
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="block h-auto w-full"
              aria-label={`${project.title} demo video`}
            />
          </div>
        ) : project.images && project.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {project.images.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt={`${project.title} screen ${i + 1}`}
                width={project.imageSize?.[0]}
                height={project.imageSize?.[1]}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full rounded-lg border border-border bg-surface"
              />
            ))}
          </div>
        ) : (
          <Screenshot project={project} eager />
        )}
      </div>

      <div className="mt-10 sm:mt-14">
        <Section title="The problem" tight>
          <p className={prose}>{project.problem}</p>
        </Section>
        <Section title="How I built it" tight>
          <p className={prose}>{project.solution}</p>
        </Section>
        <Section title="Why this one" tight>
          <p className={`${prose} text-muted-foreground`}>{project.whyThis}</p>
        </Section>
        <Section title="Built with" tight>
          <p className={prose}>{project.tech.join(", ")}</p>
        </Section>
        <Section title="More work" tight>
          <ul className="border-t border-border">
            {others.map((other) => (
              <li key={other.title} className="border-b border-border">
                <Link
                  href={`/pow/${projectSlug(other.title)}`}
                  className="group grid gap-x-8 gap-y-1 py-4 no-underline sm:grid-cols-[11rem_1fr]"
                >
                  <span className="font-medium underline-offset-4 group-hover:underline">
                    {other.title}
                  </span>
                  <span className="text-muted-foreground">{other.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
      <div className="h-6 sm:h-10" aria-hidden="true" />
    </article>
  );
}
