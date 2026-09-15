"use client";
import React from "react";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Globe, Github, ArrowRight, TrendingUp } from "lucide-react";
import { SiApple } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectMedia from "./ProjectMedia";

type Project = (typeof projects)[number];

export function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getTechIcon(techName: string) {
  const normalizedName = techName.toLowerCase().trim();
  const skill = skills.find((s) => {
    const skillName = s.name.toLowerCase().trim();
    return (
      skillName === normalizedName ||
      skillName.replace(/[.\s-]/g, "") === normalizedName.replace(/[.\s-]/g, "") ||
      (normalizedName.includes("next") && skillName.includes("next")) ||
      (normalizedName.includes("typescript") && skillName.includes("typescript")) ||
      (normalizedName.includes("react") && skillName.includes("react")) ||
      (normalizedName.includes("postgresql") && skillName.includes("postgresql")) ||
      (normalizedName.includes("mongodb") && skillName.includes("mongodb")) ||
      (normalizedName.includes("redis") && skillName.includes("redis")) ||
      (normalizedName.includes("node") && skillName.includes("node")) ||
      (normalizedName.includes("tailwind") && skillName.includes("tailwind")) ||
      (normalizedName.includes("vercel") && skillName.includes("vercel")) ||
      (normalizedName.includes("expo") && skillName.includes("expo"))
    );
  });
  return skill?.icon;
}

// Shared project card - used on the home preview and the /pow page.
// Presentational; the only interactive bit is the <ProjectMedia> video island.
function ProjectCard({
  project,
  index,
  still = false,
  compact = false,
}: {
  project: Project;
  index: number;
  /** Render the media as a poster frame instead of a playing video - used by
   *  the blurred teaser on the home page, which is in-viewport but unwatchable. */
  still?: boolean;
  /** One quiet row instead of a full card. The homepage uses this: Experience is
   *  the argument there, and a full-bleed 16:9 screenshot per project made the
   *  work sections shout over it. /pow keeps the full card, where the projects
   *  ARE the page. */
  compact?: boolean;
}) {
  const reversed = index % 2 === 1;
  const isMobile = project.category === "mobile";

  if (compact) {
    return (
      <article className="group relative flex items-start gap-4 py-4">
        <Link
          href={`/pow/${getSlug(project.title)}`}
          className="absolute inset-0 z-[1] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${project.title} case study`}
        />

        {/* Raw <img>, not next/image, for the same reason About.tsx uses one:
            there is no Images binding on the Worker, so routing a 112px thumb
            through /_next/image would add a subrequest per row and still serve
            the original bytes. */}
        <div className="pointer-events-none relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border border-border/40 bg-muted/40 sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="pointer-events-none min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold leading-tight">
              {project.title}
            </h3>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground/60">
            {project.tech.slice(0, 5).join("  ·  ")}
          </p>
        </div>
      </article>
    );
  }

  // The media's own orientation decides the layout, rather than one rule for
  // everything. A website capture is landscape, so it goes ABOVE the text at the
  // card's full width and keeps its 16:9 shape. A phone capture is portrait, so
  // it stays BESIDE the text, where a tall narrow image belongs.
  //
  // The old layout put both side by side in a fixed sm:h-64 box. That box was
  // 416px wide when the page column was 896px - landscape, and fine. Each time
  // the column narrowed the width came down (416 -> 288 -> 240) while the height
  // stayed at 256px, so the box quietly turned portrait and object-cover started
  // slicing the sides off every landscape screenshot. Height has to move with
  // width, or not be fixed at all - hence aspect-video here.
  return (
    <article
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/50 to-card/10 transition-colors duration-200 hover:border-border/70",
        isMobile && "sm:flex-row",
        isMobile && reversed && "sm:flex-row-reverse"
      )}
    >
      <Link
        href={`/pow/${getSlug(project.title)}`}
        className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${project.title} case study`}
      />

      <div
        className={cn(
          "pointer-events-none relative z-[2] overflow-hidden bg-muted/40",
          isMobile
            ? "aspect-[9/16] shrink-0 sm:aspect-auto sm:h-72 sm:w-48 sm:self-center md:w-56"
            : "aspect-video w-full"
        )}
      >
        <ProjectMedia
          video={project.video}
          image={project.image}
          alt={project.title}
          isMobile={project.category === "mobile"}
          still={still}
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          {project.link && (
            <Button size="sm" variant="secondary" asChild className="h-8 px-3 text-xs rounded-lg">
              <Link href={project.link} target="_blank">
                <Globe className="w-3.5 h-3.5 mr-1.5" /> Live
              </Link>
            </Button>
          )}
          {project.github && (
            <Button size="sm" variant="secondary" asChild className="h-8 px-3 text-xs rounded-lg">
              <Link href={project.github} target="_blank">
                <Github className="w-3.5 h-3.5 mr-1.5" /> Source
              </Link>
            </Button>
          )}
          {project.appStoreLink && (
            <Button size="sm" variant="secondary" asChild className="h-8 px-3 text-xs rounded-lg">
              <Link href={project.appStoreLink} target="_blank">
                <SiApple className="w-3.5 h-3.5 mr-1.5" aria-hidden /> App Store
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col justify-center gap-3.5 p-5 sm:p-6">
        <div>
          <p className="mb-1.5 font-mono text-[11px] lowercase tracking-tight text-indigo-500 dark:text-indigo-400">
            {project.category === "mobile" ? "mobile app" : "web application"}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {project.stats && project.stats.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stats.map((stat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300"
              >
                <TrendingUp className="w-3 h-3" />
                {stat}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech, idx) => {
            const TechIcon = getTechIcon(tech);
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/40 dark:bg-muted/20 border border-border/40 text-[11px] font-medium text-muted-foreground"
              >
                {TechIcon && <TechIcon className="w-2.5 h-2.5 opacity-60" />}
                {tech}
              </span>
            );
          })}
        </div>

        <span className="mt-1 flex items-center gap-1.5 self-start text-sm font-medium text-foreground">
          View case study
          <ArrowRight className="w-4 h-4 text-indigo-500 dark:text-indigo-400 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;
