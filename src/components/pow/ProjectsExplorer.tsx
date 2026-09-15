"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projectsData";
import { Monitor, Smartphone, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

type Category = "all" | "web" | "mobile";

// Full /pow project list with a category filter.
//
// The initial category is read from the URL inside an effect (not via
// `useSearchParams`) on purpose: `useSearchParams()` forces the whole subtree
// up to the nearest Suspense boundary to be client-side rendered during static
// generation, which stripped the project cards out of the initial HTML. Reading
// the param after mount keeps the full list in the statically-generated HTML
// (activeTab defaults to "all") while still honouring deep links like
// /pow?category=mobile.
function ProjectsExplorer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Category>("all");

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category === "web") setActiveTab("web");
    else if (category === "mobile") setActiveTab("mobile");
    else setActiveTab("all");
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  const tabs = [
    { id: "all", label: "All Projects", icon: Grid },
    { id: "web", label: "Web Apps", icon: Monitor },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  ] as const;

  return (
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
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProjectsExplorer;
