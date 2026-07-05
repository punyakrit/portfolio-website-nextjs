"use client";
import { experience, type BulletSegment } from "@/lib/experience";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const formatDate = (dateString: string) => {
  if (dateString === "Present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

function Experience({
  completeView,
  showHeading = true,
}: {
  completeView: boolean;
  showHeading?: boolean;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (company: string) =>
    setExpanded((prev) => (prev === company ? null : company));
  const shown = completeView ? experience : experience.slice(0, 4);

  const renderLinks = (exp: (typeof experience)[0]) => (
    <>
      {exp.links.companyUrl.icon && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={exp.links.companyUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground/50 hover:text-foreground transition-colors inline-flex"
              aria-label={`Visit ${exp.company} website`}
            >
              <exp.links.companyUrl.icon className="w-3.5 h-3.5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Visit company website</p>
          </TooltipContent>
        </Tooltip>
      )}
      {exp.links.githubUrl.icon && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={exp.links.githubUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground/50 hover:text-foreground transition-colors inline-flex"
              aria-label={`View ${exp.company} on GitHub`}
            >
              <exp.links.githubUrl.icon className="w-3.5 h-3.5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View GitHub</p>
          </TooltipContent>
        </Tooltip>
      )}
      {exp.links.linkedinUrl.icon && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={exp.links.linkedinUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground/50 hover:text-foreground transition-colors inline-flex"
              aria-label={`View ${exp.company} on LinkedIn`}
            >
              <exp.links.linkedinUrl.icon className="w-3.5 h-3.5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div className="px-4 sm:px-6 md:px-8">
        {showHeading && (
          <h2
            id="experience-heading"
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
          >
            Experience
          </h2>
        )}
        <div className="divide-y divide-border/40">
          {shown.map((exp) => (
            <article key={exp.company} className="py-5 sm:py-6 first:pt-0">
              <div
                className={`flex items-start justify-between gap-4 sm:gap-8 ${
                  !completeView ? "cursor-pointer" : ""
                }`}
                onClick={
                  !completeView ? () => toggle(exp.company) : undefined
                }
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <Image
                    src={exp.links.image}
                    alt={`${exp.company} logo`}
                    width={44}
                    height={44}
                    loading="lazy"
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg object-cover ring-1 ring-border/40 flex-shrink-0 ${
                      exp.blurred ? "blur-md select-none" : ""
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={`text-base sm:text-lg font-semibold text-foreground ${
                          exp.blurred ? "blur-md select-none" : ""
                        }`}
                      >
                        {exp.company}
                      </span>
                      {renderLinks(exp)}
                      {exp.endDate === "Present" && !exp.hideWorkingBadge && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Working
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {exp.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                      {exp.location}
                    </p>
                  </div>
                  {!completeView && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(exp.company);
                      }}
                      aria-expanded={expanded === exp.company}
                      aria-label={
                        expanded === exp.company
                          ? `Collapse ${exp.company} details`
                          : `Expand ${exp.company} details`
                      }
                      className="mt-0.5 flex-shrink-0 rounded-md p-1 text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expanded === exp.company ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  completeView || expanded === exp.company
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 sm:pl-[3.75rem] space-y-4">
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, index) => {
                          const isRich = Array.isArray(bullet);
                          return (
                            <li
                              key={index}
                              className="flex gap-2.5 text-sm sm:text-[15px] text-muted-foreground leading-relaxed"
                            >
                              <span
                                className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/50"
                                aria-hidden
                              />
                              <span>
                                {isRich
                                  ? (bullet as BulletSegment[]).map((seg, i) =>
                                      seg.type === "highlight" ? (
                                        <span
                                          key={i}
                                          className="font-medium text-foreground"
                                        >
                                          {seg.value}
                                        </span>
                                      ) : (
                                        <span key={i}>{seg.value}</span>
                                      )
                                    )
                                  : (bullet as string)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {exp.tech && exp.tech.length > 0 && (
                      <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
                        {exp.tech
                          .filter(Boolean)
                          .map((skill) => skill!.name)
                          .join("  ·  ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!completeView && (
          <div className="mt-6">
            <button
              onClick={() => router.push("/work")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Show all work experiences →
            </button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default Experience;
