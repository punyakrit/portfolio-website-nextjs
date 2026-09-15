import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projectsData";
import ProjectCard from "./ProjectCard";

/**
 * Homepage projects section - deliberately quiet.
 *
 * This used to render full cards: a full-width 16:9 screenshot, a stat-pill
 * block and the entire tech list, three times over. It was by far the loudest
 * thing on the page and pushed Experience out of the first two screens, which
 * inverts the argument - the work history is what is being sold here, and the
 * projects are corroboration.
 *
 * So: one compact row each, in the same divided-list shape as Experience and
 * Stack, so the page reads as one document rather than three components that
 * happen to share a page. The full cards still exist on /pow, where the
 * projects are the point.
 *
 * Server component: rows are in the initial HTML so crawlers and link-preview
 * bots see real titles and summaries.
 */
const SHOWN = 4;

function FeaturedProjects() {
  const visible = projects.slice(0, SHOWN);
  const remaining = projects.length - visible.length;

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        <Link
          href="/pow"
          className="group flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {remaining > 0 ? `All ${projects.length}` : "View all"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="divide-y divide-border/40">
        {visible.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} compact />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProjects;
