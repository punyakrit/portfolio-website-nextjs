"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Globe, Github, ArrowRight, Smartphone, Monitor, Grid, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function Projects({ showAll }: { showAll: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeTab, setActiveTab] = useState<"all" | "web" | "mobile">("all");

  useEffect(() => {
    if (categoryParam === "web") setActiveTab("web");
    else if (categoryParam === "mobile") setActiveTab("mobile");
    else setActiveTab("all");
  }, [categoryParam]);

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
        (normalizedName.includes("vercel") && skillName.includes("vercel")) ||
        (normalizedName.includes("expo") && skillName.includes("expo"))
      );
    });
    return skill?.icon;
  };

  const filteredProjects = projects.filter(
    (project) => activeTab === "all" || project.category === activeTab
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  const tabs = [
    { id: "all", label: "All Projects", icon: Grid },
    { id: "web", label: "Web Apps", icon: Monitor },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  ] as const;

  const webCount = projects.filter(p => p.category === "web").length;
  const mobileCount = projects.filter(p => p.category === "mobile").length;

  if (!showAll) {
    return (
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ExploreCard
            title="Web Applications"
            count={webCount}
            icon={Laptop}
            description="SaaS platforms, AI tools, and dashboards built with Next.js & Node.js."
            onClick={() => router.push("/pow?category=web")}
          />
          <ExploreCard
            title="Mobile Apps"
            count={mobileCount}
            icon={Smartphone}
            description="Native iOS & Android experiences built with React Native & Expo."
            onClick={() => router.push("/pow?category=mobile")}
          />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex p-1 bg-muted/50 rounded-xl self-start sm:self-auto w-full sm:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const query = tab.id === "all" ? "" : `?category=${tab.id}`;
                  router.push(`/pow${query}`);
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 z-10 flex items-center gap-2 whitespace-nowrap flex-1 sm:flex-none justify-center",
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                key={project.title}
                className="group relative flex flex-col h-full overflow-hidden rounded-2xl border-2 border-dashed border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 bg-card/40 dark:bg-card/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-l-2xl bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 opacity-80" aria-hidden />
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-muted/60 border-b border-dashed border-black/5 dark:border-white/5 flex items-center justify-center",
                    project.category === "mobile"
                      ? "aspect-[3/4] sm:aspect-[9/16]"
                      : "aspect-video"
                  )}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category === "mobile" ? "Mobile App" : "Web Project"}`}
                    fill
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-[1.03]",
                      project.category === "mobile"
                        ? "object-contain"
                        : "object-cover"
                    )}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                    <div className="flex gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      {project.link && (
                        <Button size="sm" variant="secondary" asChild className="h-8 px-3 text-xs rounded-lg border border-border/60">
                          <Link href={project.link} target="_blank">
                            <Globe className="w-3.5 h-3.5 mr-1.5" /> Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.github && (
                        <Button size="sm" variant="secondary" asChild className="h-8 px-3 text-xs rounded-lg border border-border/60">
                          <Link href={project.github} target="_blank">
                            <Github className="w-3.5 h-3.5 mr-1.5" /> Source
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative pl-4 sm:pl-5 p-5 sm:p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-medium text-muted-foreground mt-1 uppercase tracking-widest">
                      {project.category === "mobile" ? "Mobile App" : "Web Application"}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    {project.tech.slice(0, 6).map((tech, index) => {
                      const TechIcon = getTechIcon(tech);
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/60 dark:bg-muted/40 border border-border/40 text-[11px] font-medium text-foreground/90"
                        >
                          {TechIcon && <TechIcon className="w-3 h-3 opacity-70" />}
                          {tech}
                        </span>
                      );
                    })}
                    {project.tech.length > 6 && (
                      <span className="text-[10px] px-2.5 py-1.5 text-muted-foreground self-center rounded-lg border border-border/40">
                        +{project.tech.length - 6} more
                      </span>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-dashed border-black/5 dark:border-white/5">
                    <Link
                      href={`/pow/${getSlug(project.title)}`}
                      className="flex items-center justify-between w-full gap-2 rounded-lg border-2 border-dashed border-black/10 dark:border-white/10 bg-muted/30 dark:bg-muted/20 px-4 py-2.5 text-sm font-medium hover:border-primary/30 hover:bg-muted/50 dark:hover:bg-muted/30 transition-all duration-200 group/btn"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}

function ExploreCard({
  title,
  count,
  icon: Icon,
  description,
  onClick,
}: {
  title: string;
  count: number;
  icon: React.ElementType;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative border-2 border-dashed border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 rounded-2xl cursor-pointer transition-all duration-300"
    >
      <div className="p-6 sm:p-8 flex flex-col gap-5 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <span className="text-xs text-muted-foreground">{count} {count === 1 ? "project" : "projects"}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
          <span className="text-sm font-medium group-hover:underline underline-offset-4 transition-all">
            View all {title.toLowerCase()} →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Projects;
