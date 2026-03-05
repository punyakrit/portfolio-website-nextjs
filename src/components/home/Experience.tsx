"use client";
import { experience, type BulletSegment } from "@/lib/experience";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

function Experience({ completeView }: { completeView: boolean }) {
  const router = useRouter();
  const displayedExperiences = completeView ? experience : experience.slice(0, 1);
  const remainingExperiences = completeView ? [] : experience.slice(1);

  const renderExperienceHeader = (
    exp: (typeof experience)[0],
    isClickable: boolean = false
  ) => (
    <div
      className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 ${isClickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
      onClick={isClickable ? () => router.push("/work") : undefined}
    >
      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
        <div className={exp.blurred ? "blur-md select-none" : ""}>
          <Image
            src={exp.links.image}
            alt={exp.blurred ? "Company logo" : `${exp.company} logo`}
            width={44}
            height={44}
            loading="lazy"
            className="rounded-xl object-cover w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 ring-1 ring-border/40"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`font-semibold text-base sm:text-lg text-foreground ${exp.blurred ? "blur-md select-none" : ""}`}>
              {exp.company}
            </span>
            {exp.links.companyUrl.icon && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={exp.links.companyUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Visit ${exp.company} website`}
                  >
                    <exp.links.companyUrl.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${exp.company} on GitHub`}
                  >
                    <exp.links.githubUrl.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${exp.company} on LinkedIn`}
                  >
                    <exp.links.linkedinUrl.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            )}
            {exp.endDate === "Present" && (
              <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-full">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {exp.position}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0 sm:ml-4">
        <time
          dateTime={exp.startDate}
          className="text-xs font-medium text-muted-foreground tabular-nums"
        >
          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
        </time>
        <span className="text-[11px] sm:text-xs text-muted-foreground/80">
          {exp.location}
        </span>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="px-4 sm:px-6 md:px-8">
        <h2
          id="experience-heading"
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        >
          Work Experience
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {displayedExperiences.map((exp) => (
            <article
              key={exp.company}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 dark:bg-card/20 p-5 sm:p-6 md:p-7 shadow-sm transition-shadow hover:shadow-md hover:border-border/70"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-l-2xl bg-gradient-to-b from-primary/70 via-primary/40 to-primary/20" aria-hidden />
              <div className="pl-4 sm:pl-5">
                {renderExperienceHeader(exp)}

                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border/40">
                  {exp.bullets && exp.bullets.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                        What I did
                      </h3>
                      <ul className="space-y-3.5">
                        {exp.bullets.map((bullet, index) => {
                          const isRich = Array.isArray(bullet);
                          return (
                            <li
                              key={index}
                              className="flex gap-3 text-sm sm:text-[15px] text-muted-foreground leading-relaxed"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                                aria-hidden
                              />
                              <span>
                                {isRich ? (
                                  (bullet as BulletSegment[]).map((seg, i) =>
                                    seg.type === "highlight" ? (
                                      <span
                                        key={i}
                                        className="font-semibold text-foreground bg-primary/15 dark:bg-primary/20 px-1.5 py-0.5 rounded-md"
                                      >
                                        {seg.value}
                                      </span>
                                    ) : (
                                      <span key={i}>{seg.value}</span>
                                    )
                                  )
                                ) : (
                                  bullet as string
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {exp.tech && exp.tech.length > 0 && (
                    <div className={`space-y-3 ${exp.bullets?.length ? "mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-border/40" : ""}`}>
                      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                        Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((skill, index) => {
                          if (!skill) return null;
                          const Icon = skill.icon;
                          return (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/60 dark:bg-muted/40 border border-border/40 text-xs sm:text-sm text-foreground/90 hover:border-border/60 transition-colors"
                            >
                              {Icon && (
                                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" />
                              )}
                              {skill.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}

          {remainingExperiences.length > 0 && (
            <>
              <div className="space-y-3">
                {remainingExperiences.map((exp) => (
                  <div
                    key={exp.company}
                    className="rounded-xl border border-border/40 bg-card/30 dark:bg-card/10 p-4 sm:p-5 transition-colors hover:bg-card/50 hover:border-border/60"
                  >
                    {renderExperienceHeader(exp, true)}
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-4 sm:pt-5">
                <button
                  onClick={() => router.push("/work")}
                  className="px-4 py-2.5 rounded-lg bg-muted/80 hover:bg-muted text-sm font-medium transition-colors"
                >
                  View complete work history
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Experience;
