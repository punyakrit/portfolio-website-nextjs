"use client";
import React from "react";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Globe, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";

function Projects({ showAll }: { showAll: boolean }) {
  const getSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getTechIcon = (techName: string) => {
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
        (normalizedName.includes("tailwind") &&
          skillName.includes("tailwind")) ||
        (normalizedName.includes("vercel") && skillName.includes("vercel"))
      );
    });
    return skill?.icon;
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <TooltipProvider>
      <div className="px-4 sm:px-6 md:px-8">
        <h2
          id="projects-heading"
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        >
          {showAll ? "" : "Featured Projects"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {displayedProjects.map((project) => {
            return (
              <article
                key={project.title}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} - Web Development Project Screenshot`}
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold flex-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                            aria-label={`Visit ${project.title} live site`}
                          >
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
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
                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View GitHub</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.tech.slice(0, 8).map((tech, index) => {
                      const TechIcon = getTechIcon(tech);
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-md text-xs cursor-default hover:bg-muted/80 transition-colors">
                              {TechIcon ? (
                                <TechIcon className="w-4 h-4 flex-shrink-0" />
                              ) : (
                                <span className="w-4 h-4 flex items-center justify-center text-[10px] font-semibold bg-foreground/10 rounded">
                                  {tech.charAt(0).toUpperCase()}
                                </span>
                              )}
                              <span className="hidden sm:inline">{tech}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tech}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                    {project.tech.length > 8 && (
                      <span className="text-xs text-muted-foreground px-2">
                        +{project.tech.length - 8}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full justify-between group"
                    asChild
                  >
                    <Link href={`/pow/${getSlug(project.title)}`}>
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <Button
              variant="outline"
              className="px-6 sm:px-8 py-2 sm:py-3"
              asChild
            >
              <Link href="/pow">View all projects & case studies</Link>
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default Projects;
