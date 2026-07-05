import React from "react";
import type { Metadata } from "next";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  Github,
  ArrowLeft,
  ArrowUpRight,
  Lightbulb,
  TriangleAlert,
  Sparkles,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import { Button } from "@/components/ui/button";
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

const mono = "font-[family-name:var(--font-geist-mono)]";

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-5">
      <span
        className={`${mono} block text-[11px] lowercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400`}
      >
        {eyebrow}
      </span>
      <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
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
    <>
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
        <Link
          href="/pow"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="mb-12 sm:mb-16">
          <p
            className={`${mono} mb-4 text-xs lowercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400`}
          >
            {project.category === "mobile" ? "mobile app" : "web application"}
            <span className="mx-2.5 text-border">/</span>
            <span className="text-muted-foreground/70">case study</span>
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {project.description}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
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
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-card/70"
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
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-card/70"
                aria-label={`Download ${project.title} on the App Store`}
              >
                <SiApple className="h-4 w-4" aria-hidden />
                App Store
              </Link>
            )}
          </div>

          {/* Stats */}
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
                      {label || " "}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </header>

        {/* ── Media ────────────────────────────────────────────── */}
        {project.video ? (
          <div className="mb-14 overflow-hidden rounded-2xl border border-border/50 bg-muted/30 shadow-2xl shadow-black/20 ring-1 ring-inset ring-white/5">
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full"
              aria-label={`${project.title} demo video`}
            />
          </div>
        ) : project.images && project.images.length > 0 ? (
          <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {project.images.map((src, i) => (
              <div
                key={i}
                className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-muted/40 ring-1 ring-inset ring-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="h-auto max-h-[70vh] w-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* ── Overview + tech stack ────────────────────────────── */}
        <div className="mb-14 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <section>
            <SectionHeading eyebrow="overview" title="Project Overview" />
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.summary}
            </p>
          </section>

          <aside>
            <span
              className={`${mono} block text-[11px] lowercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400`}
            >
              tech stack
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech, index) => {
                const TechIcon = getTechIcon(tech);
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground"
                  >
                    {TechIcon ? (
                      <TechIcon className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
                    ) : (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-foreground/10 text-[9px] font-semibold">
                        {tech.charAt(0).toUpperCase()}
                      </span>
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>
          </aside>
        </div>

        {/* ── Problem → Solution — the signature contrast ──────── */}
        <section className="mb-14 grid items-stretch gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-card/20 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 text-muted-foreground">
              <TriangleAlert className="h-4 w-4" />
              <span className={`${mono} text-[11px] lowercase tracking-[0.2em]`}>
                the problem
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {project.problem}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/20 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 text-foreground/70">
              <Lightbulb className="h-4 w-4" />
              <span className={`${mono} text-[11px] lowercase tracking-[0.2em]`}>
                the solution
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/80 sm:text-base">
              {project.solution}
            </p>
          </div>
        </section>

        {/* ── Why I built this — a personal aside ──────────────── */}
        <section>
          <div className="rounded-2xl border border-border/50 bg-card/20 p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
              <div className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-3">
                <Sparkles className="h-5 w-5 text-indigo-500/70 dark:text-indigo-400/70" />
                <span
                  className={`${mono} text-[11px] lowercase tracking-[0.2em] text-muted-foreground/70`}
                >
                  why i built this
                </span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {project.whyThis}
              </p>
            </div>
          </div>
        </section>

        {relatedPages.length > 0 && (
          <div className="mt-16">
            <RelatedPages pages={relatedPages} title="Related Projects" />
          </div>
        )}

        {/* ── Footer CTA ───────────────────────────────────────── */}
        <footer className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/10 px-6 py-8 text-center sm:px-10 sm:py-10">
            <span
              className={`${mono} text-[11px] lowercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400`}
            >
              let&apos;s build together
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Have something like this in mind?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              I take products from first idea to launch. Book a free call and
              let&apos;s scope it out.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="https://cal.com/punyakrit" target="_blank">
                Book a free call
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </>
  );
}
