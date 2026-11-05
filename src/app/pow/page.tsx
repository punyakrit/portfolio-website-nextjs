import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import { projectSlug } from "@/lib/projectSlug";
import { WRAP } from "@/components/landing/Section";
import Screenshot from "@/components/landing/Screenshot";
import { Facts } from "@/components/landing/Work";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects | Full-Stack and AI Products",
  description:
    "Products built by Punyakrit Singh Makhni, with the architecture decisions behind them. A multi-model video agent, a generative video pipeline, retrieval over large codebases, distributed monitoring, and an iOS app.",
  alternates: { canonical: "/pow" },
  openGraph: {
    title: "Projects | Punyakrit Singh Makhni",
    description:
      "Full-stack and AI products, with the engineering decisions behind them.",
    url: `${SITE_URL}/pow`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Punyakrit Singh Makhni",
    description:
      "Full-stack and AI products, with the engineering decisions behind them.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const host = (url: string) => new URL(url).host.replace(/^www\./, "");

export default function ProjectsPage() {
  return (
    <div className={WRAP}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/pow` },
        ]}
      />
      <ItemListJsonLd
        items={projects.map((project) => ({
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/pow/${projectSlug(project.title)}`,
          image: project.image,
        }))}
      />

      <header className="pb-10 pt-10 sm:pb-14 sm:pt-16">
        <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.025em]">
          What I&apos;ve built
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-[1.5] text-muted-foreground sm:text-xl">
          Six products shipped end to end: web, mobile and the AI inside them.
          Each case study covers the problem, how I built it and why it matters.
        </p>
      </header>

      <ol className="border-t border-border">
        {projects.map((project, i) => {
          const href = `/pow/${projectSlug(project.title)}`;
          return (
            <li
              key={project.title}
              className="grid gap-x-10 gap-y-6 border-b border-border py-10 sm:py-14 lg:grid-cols-12"
            >
              <Link
                href={href}
                aria-label={`${project.title} case study`}
                className="group block no-underline lg:col-span-6"
              >
                <Screenshot
                  project={project}
                  eager={i === 0}
                  className="transition-colors group-hover:border-foreground/40"
                />
              </Link>

              <div className="min-w-0 lg:col-span-6">
                <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                  <Link href={href} className="no-underline hover:underline underline-offset-4">
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[56ch] text-muted-foreground">
                  {project.description}
                </p>
                <Facts project={project} columns="grid-cols-2 sm:grid-cols-4 lg:grid-cols-2" />
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <Link href={href} className="underline-offset-4">
                    Read the case study
                  </Link>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline-offset-4 hover:text-foreground"
                    >
                      Open {host(project.link)}
                    </a>
                  )}
                  {project.appStoreLink && (
                    <a
                      href={project.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline-offset-4 hover:text-foreground"
                    >
                      On the App Store
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="h-14 sm:h-20" aria-hidden="true" />
    </div>
  );
}
