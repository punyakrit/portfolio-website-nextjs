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
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const reversed = index % 2 === 1;

  return (
    <article
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/50 to-card/10 transition-colors duration-200 hover:border-border/70 sm:flex-row",
        reversed && "sm:flex-row-reverse"
      )}
    >
      <Link
        href={`/pow/${getSlug(project.title)}`}
        className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${project.title} case study`}
      />

      <div
        className={cn(
          "pointer-events-none relative z-[2] shrink-0 overflow-hidden bg-muted/40 sm:w-80 md:w-[26rem] sm:self-center",
          project.category === "mobile"
            ? "aspect-[9/16] sm:aspect-auto sm:h-64"
            : "aspect-video sm:aspect-auto sm:h-64"
        )}
      >
        <ProjectMedia
          video={project.video}
          image={project.image}
          alt={project.title}
          isMobile={project.category === "mobile"}
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

      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-5 select-none font-[family-name:var(--font-geist-mono)] text-5xl sm:text-6xl font-bold tabular-nums text-foreground/[0.05]"
        >
          {number}
        </span>

        <div>
          <p className="mb-1.5 font-[family-name:var(--font-geist-mono)] text-[11px] lowercase tracking-tight text-indigo-500 dark:text-indigo-400">
            {project.category === "mobile" ? "mobile app" : "web application"}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-2 max-w-md">
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
          {project.tech.slice(0, 5).map((tech, idx) => {
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
          {project.tech.length > 5 && (
            <span className="text-[11px] px-2 py-1 text-muted-foreground/70 rounded-md border border-border/40">
              +{project.tech.length - 5}
            </span>
          )}
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
