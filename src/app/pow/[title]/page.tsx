import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import { SiApple } from "react-icons/si";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Button } from "@/components/ui/button";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL, createMetadata } from "@/lib/seo";
import { socials } from "@/lib/socials";

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

function getTechIcon(techName: string) {
  const normalized = techName.toLowerCase().trim().replace(/[.\s-]/g, "");
  return skills.find(
    (s) => s.name.toLowerCase().trim().replace(/[.\s-]/g, "") === normalized
  )?.icon;
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
    keywords: [project.title, ...project.tech, "Full Stack Engineering Project"],
    tags: project.tech,
    image: {
      url: project.image,
      alt: `${project.title} - project screenshot`,
    },
    type: "article",
  });
}

const mono = "font-[family-name:var(--font-geist-mono)]";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const project = getProjectBySlug(title);
  if (!project) notFound();

  const projectUrl = `${SITE_URL}/pow/${getSlug(project.title)}`;

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
            project.category === "mobile"
              ? "MobileApplication"
              : "WebApplication",
          codeRepository: project.github,
          programmingLanguage: project.tech,
        }}
      />

      <article className="px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <Link
          href="/pow"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        <header className="mb-12 sm:mb-16">
          <p
            className={`${mono} mb-4 text-xs lowercase tracking-[0.2em] text-muted-foreground`}
          >
            {project.category === "mobile" ? "mobile app" : "web application"}
            <span className="mx-2.5 text-border">/</span>
            <span className="text-muted-foreground/70">case study</span>
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background no-underline transition-transform hover:scale-[1.02]"
                aria-label={`Visit ${project.title} live site`}
              >
                <Globe className="h-4 w-4" />
                Visit live site
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-foreground no-underline transition-colors hover:border-border hover:bg-card/70"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-4 w-4" />
                Source
              </Link>
            )}
            {project.appStoreLink && (
              <Link
                href={project.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-foreground no-underline transition-colors hover:border-border hover:bg-card/70"
                aria-label={`Download ${project.title} on the App Store`}
              >
                <SiApple className="h-4 w-4" aria-hidden />
                App Store
              </Link>
            )}
          </div>

          {project.stats && project.stats.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-border/40 pt-7">
              {project.stats.map((stat) => {
                const [value, ...rest] = stat.split(" ");
                const label = rest.join(" ");
                return (
                  <div key={stat}>
                    <dt className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {value}
                    </dt>
                    <dd
                      className={`${mono} mt-0.5 text-[11px] lowercase tracking-wide text-muted-foreground`}
                    >
                      {label || " "}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </header>

        {project.video ? (
          <div className="mb-14 overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-auto w-full"
              aria-label={`${project.title} demo video`}
            />
          </div>
        ) : project.images && project.images.length > 0 ? (
          <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {project.images.map((src, i) => (
              <div
                key={src}
                className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-muted/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-[70vh] w-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Single column on purpose.
            These blocks split into columns at VIEWPORT breakpoints (lg:, md:)
            while the page column is fixed at 672px by SupportPageLayout. They
            were written when that column was 896px; now, on any desktop screen,
            the breakpoint fires and splits 608px of content into ~230px
            columns - roughly 30 characters a line, which turns a paragraph into
            a ragged ribbon and left the shorter card beside a tall void. Prose
            at this measure wants one column. */}
        {/* Built with - a scannable spec line right after the media, before the
            long-form prose starts. */}
        <section className="mb-14">
          <h2
            className={`${mono} mb-4 text-[11px] lowercase tracking-[0.2em] text-muted-foreground`}
          >
            built with
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => {
              const TechIcon = getTechIcon(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground/[0.06] px-2.5 py-1.5 text-[13px] font-medium"
                >
                  {TechIcon ? (
                    <TechIcon className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
                  ) : null}
                  {tech}
                </span>
              );
            })}
          </div>
        </section>

        {/* The case study itself, written as a document rather than a set of
            boxes.

            It used to be three bordered cards on a tinted background, each with
            its own icon and a lowercase mono eyebrow - a card for the problem, a
            card for the solution, a card for why it was built, plus an
            "overview" card that just restated the description already sitting in
            the header two screens above. Four containers for what is really one
            piece of writing, and nothing else on the site looks like that:
            Experience, Projects and Stack are all plain headings and rows
            separated by hairlines. The chrome was doing the opposite of its job,
            adding weight to the part of the page a reader actually came to read.

            So: real headings, full-measure prose, a rule between sections. The
            same shape as every other section on the site. */}
        <div className="border-t border-border/40 divide-y divide-border/40">
          {[
            { heading: "The problem", body: project.problem },
            { heading: "How I built it", body: project.solution },
            { heading: "Why this one", body: project.whyThis },
          ].map((section) => (
            <section key={section.heading} className="py-10 sm:py-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {/* Employer-facing close. The old version of this block was
            client-acquisition copy ("I take products from first idea to launch.
            Book a free call and let's scope it out."), which is exactly what was
            removed from the site. */}
        {/* No card here either. A bordered, tinted, centred box was the last
            thing left shouting on a page that is now a document, and its heading
            repeated the status line in the site header word for word. It asks
            the reader something instead, the way the homepage close does. */}
        <footer className="border-t border-border/40 py-10 sm:py-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Hiring for a full stack role?
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            This is the kind of work I do. Happy to walk through any of it.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href={socials.cal} target="_blank" rel="noopener noreferrer">
              Book a call
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </footer>
      </article>
    </>
  );
}
