"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/lib/projectsData";
import { skills } from "@/lib/skills";
import { Globe, Github, ArrowRight, Smartphone, Monitor, Grid, ChevronDown } from "lucide-react";
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
          "pointer-events-none w-full h-full transition-transform duration-500 group-hover:scale-[1.03]",
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
        "pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]",
        isMobile ? "object-contain" : "object-cover"
      )}
      sizes="(max-width: 768px) 100vw, 600px"
    />
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
    const SHOW = 3;
    const featuredProjects = projects.slice(0, SHOW + 1); // grab 4, show 3 + blurred peek
    const visible = featuredProjects.slice(0, SHOW);
    const peek = featuredProjects[SHOW];

    return (
      <TooltipProvider>
        <div className="px-4 sm:px-6 md:px-8">
          {/* Header */}
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

          {/* Project list */}
          <div className="flex flex-col gap-4">
            {visible.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="group relative flex cursor-pointer flex-col sm:flex-row overflow-hidden rounded-2xl border border-white/5 bg-card/30 hover:bg-card/50 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" aria-hidden />

                <Link
                  href={`/pow/${getSlug(project.title)}`}
                  className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${project.title} case study`}
                />

                <div
                  className={cn(
                    "pointer-events-none relative z-[2] shrink-0 overflow-hidden bg-muted/40",
                    "sm:w-64 md:w-80",
                    project.category === "mobile"
                      ? "aspect-[9/16] sm:aspect-auto sm:h-52"
                      : "aspect-video sm:aspect-auto sm:h-52"
                  )}
                >
                  <ProjectMedia
                    video={project.video}
                    image={project.image}
                    alt={project.title}
                    isMobile={project.category === "mobile"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-card/20 hidden sm:block" />
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

                <div className="pointer-events-none relative z-[2] flex flex-1 flex-col justify-center gap-3 p-5 sm:p-6 pl-6 sm:pl-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-semibold text-muted-foreground mt-0.5 uppercase tracking-widest">
                        {project.category === "mobile" ? "Mobile App" : "Web Application"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground/50 font-mono tabular-nums shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((tech, idx) => {
                      const TechIcon = getTechIcon(tech);
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 border border-border/30 text-[10px] font-medium text-foreground/80"
                        >
                          {TechIcon && <TechIcon className="w-2.5 h-2.5 opacity-60" />}
                          {tech}
                        </span>
                      );
                    })}
                    {project.tech.length > 5 && (
                      <span className="text-[10px] px-2 py-1 text-muted-foreground rounded-md border border-border/30">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  <span className="mt-1 flex items-center gap-1.5 self-start text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            ))}

            {/* Blurred peek card */}
            {peek && (
              <div className="relative">
                <div className="pointer-events-none select-none opacity-60 blur-[2px] scale-[0.99]">
                  <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-white/5 bg-card/30">
                    <div className="relative shrink-0 overflow-hidden bg-muted/40 sm:w-64 md:w-80 aspect-video sm:h-52">
                      <Image
                        src={peek.image}
                        alt={peek.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-3 p-5 sm:p-6 justify-center">
                      <div>
                        <h3 className="text-lg font-bold">{peek.title}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                          {peek.category === "mobile" ? "Mobile App" : "Web Application"}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{peek.description}</p>
                    </div>
                  </div>
                </div>

                {/* Fade + CTA overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background/95 rounded-2xl flex items-end justify-center pb-5">
                  <Link
                    href="/pow"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:bg-primary/90 transition-all duration-200 group"
                  >
                    <ChevronDown className="w-4 h-4" />
                    Show more
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

        {/* Project list */}
        <div className="flex flex-col gap-4">
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

type Project = (typeof projects)[number];

// Shared project row card
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
  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-card/30 transition-all duration-300 hover:border-white/10 hover:bg-card/50 hover:shadow-xl hover:shadow-black/20 sm:flex-row">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" aria-hidden />

      <Link
        href={`/pow/${getSlug(project.title)}`}
        className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${project.title} case study`}
      />

      <div
        className={cn(
          "pointer-events-none relative z-[2] shrink-0 overflow-hidden bg-muted/40",
          "sm:w-64 md:w-80",
          project.category === "mobile"
            ? "aspect-[9/16] sm:aspect-auto sm:h-52"
            : "aspect-video sm:aspect-auto sm:h-52"
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

      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col justify-center gap-3 p-5 sm:p-6 pl-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="text-[10px] font-semibold text-muted-foreground mt-0.5 uppercase tracking-widest">
              {project.category === "mobile" ? "Mobile App" : "Web Application"}
            </p>
          </div>
          <span className="text-xs text-muted-foreground/50 font-mono tabular-nums shrink-0 pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((tech, idx) => {
            const TechIcon = getTechIcon(tech);
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 border border-border/30 text-[10px] font-medium text-foreground/80"
              >
                {TechIcon && <TechIcon className="w-2.5 h-2.5 opacity-60" />}
                {tech}
              </span>
            );
          })}
          {project.tech.length > 5 && (
            <span className="text-[10px] px-2 py-1 text-muted-foreground rounded-md border border-border/30">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <span className="mt-1 flex items-center gap-1.5 self-start text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">
          View Case Study
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export default Projects;
