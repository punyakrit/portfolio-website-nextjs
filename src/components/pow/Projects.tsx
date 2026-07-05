"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Globe, Github, ArrowRight, Smartphone, Monitor, Grid, TrendingUp } from "lucide-react";
import { SiApple } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Autoplay video with image fallback
function ProjectMedia({
  video,
  image,
  alt,
  isMobile,
}: {
  video: string;
  image: string;
  alt: string;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        autoPlay
        className={cn(
          "pointer-events-none w-full h-full transition-transform duration-700 ease-out group-hover:scale-105",
          isMobile ? "object-contain" : "object-cover"
        )}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      className={cn(
        "pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105",
        isMobile ? "object-contain" : "object-cover"
      )}
      sizes="(max-width: 768px) 100vw, 600px"
    />
  );
}

type Project = (typeof projects)[number];

// Shared project card - used on the home preview and the /pow page.
function ProjectRow({
  project,
  index,
  getSlug,
  getTechIcon,
}: {
  project: Project;
  index: number;
  getSlug: (t: string) => string;
  getTechIcon: (t: string) => React.ElementType | undefined;
}) {
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

  const getSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const getTechIcon = (techName: string) => {
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
  };

  const filteredProjects = projects.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  const tabs = [
    { id: "all", label: "All Projects", icon: Grid },
    { id: "web", label: "Web Apps", icon: Monitor },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  ] as const;

  // ─── HOME FEATURED VIEW ──────────────────────────────────────────────────────
  if (!showAll) {
    // Show 2 full projects, then the 3rd as a half-faded teaser with a "Show more" prompt.
    const visible = projects.slice(0, 2);
    const teaser = projects[2];

    return (
      <TooltipProvider>
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
              <ProjectRow
                key={project.title}
                project={project}
                index={i}
                getSlug={getSlug}
                getTechIcon={getTechIcon}
              />
            ))}

            {/* Third project — a faded, blurred teaser with the "Show more" button overlaid on top */}
            {teaser && (
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none select-none blur-[3px]"
                >
                  <ProjectRow
                    project={teaser}
                    index={2}
                    getSlug={getSlug}
                    getTechIcon={getTechIcon}
                  />
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
      </TooltipProvider>
    );
  }

  // ─── FULL /pow PAGE VIEW ─────────────────────────────────────────────────────

  return (
    <TooltipProvider>
      <div className="px-4 sm:px-6 md:px-0">
        {/* Tab filter */}
        <div className="flex p-1 bg-muted/50 rounded-xl self-start w-full sm:w-auto overflow-x-auto mb-8 sm:mb-10">
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
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-foreground rounded-lg -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <ProjectRow project={project} index={i} getSlug={getSlug} getTechIcon={getTechIcon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Projects;
