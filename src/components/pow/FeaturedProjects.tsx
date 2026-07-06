import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projectsData";
import ProjectCard from "./ProjectCard";

// Home "Featured Projects" section.
// Server component: the project cards are rendered into the initial HTML at
// build time so crawlers and link-preview bots see real titles/descriptions.
function FeaturedProjects() {
  // Show 2 full projects, then the 3rd as a half-faded teaser with a "Show more" prompt.
  const visible = projects.slice(0, 2);
  const teaser = projects[2];

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Projects</h2>
        <Link
          href="/pow"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {visible.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}

        {/* Third project - a faded, blurred teaser with the "Show more" button overlaid on top */}
        {teaser && (
          <div className="relative">
            <div aria-hidden className="pointer-events-none select-none blur-[3px]">
              <ProjectCard project={teaser} index={2} />
            </div>
            {/* Fade the card into the page background */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-background/30 via-background/75 to-background" />
            {/* Overlaid "Show more" button, centered on the faded card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/pow"
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur-sm transition-all hover:border-border hover:bg-background"
              >
                Show more projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedProjects;
