import React from "react";
import Link from "next/link";
import Experience from "@/components/home/Experience";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import { experience } from "@/lib/experience";
import { socials } from "@/lib/socials";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

function generateExperienceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SEO_CONFIG.name,
    jobTitle: "Full-Stack Engineer",
    hasOccupation: experience.map((exp) => ({
      "@type": "Occupation",
      name: exp.position,
      occupationLocation: {
        "@type": "Place",
        name: exp.location,
      },
      startDate: exp.startDate,
      endDate: exp.endDate === "Present" ? undefined : exp.endDate,
      hiringOrganization: {
        "@type": "Organization",
        name: exp.company,
      },
    })),
  };
}

const reasons = [
  {
    title: "Production experience",
    body: "I've built and deployed real applications used by thousands - not tutorials or toy projects, but production systems with uptime, monitoring, and real users.",
  },
  {
    title: "Full-stack ownership",
    body: "I handle everything from database design to frontend polish. One point of contact, no handoff friction, faster delivery.",
  },
  {
    title: "Startup velocity",
    body: "Having worked with early-stage startups, I know how to ship fast, iterate quickly, and avoid over-engineering.",
  },
  {
    title: "Clear communication",
    body: "I work async-first, document decisions, and keep you updated - without a meeting for everything.",
  },
];

function Work() {
  return (
    <div className="px-2 md:px-8 md:my-32 my-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work Experience", url: `${SITE_URL}/work` },
        ]}
      />
      <JsonLd data={generateExperienceSchema()} />

      <header className="px-4 sm:px-6 md:px-8 mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Professional Experience
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Over 2 years building production-grade web and mobile apps for
          startups, businesses, and independent projects - shipping real products
          used by thousands, from AI-powered developer tools to monitoring
          platforms.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Currently available for new projects
          </span>
          <span aria-hidden="true">·</span>
          <span>Remote-friendly</span>
          <span aria-hidden="true">·</span>
          <span>Global clients</span>
        </div>
      </header>

      <Experience completeView={true} showHeading={false} />

      <section className="px-4 sm:px-6 md:px-8 mt-14 sm:mt-16 pt-10 border-t border-border/60">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Why work with me</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-border/50 bg-card/40 dark:bg-card/20 p-5 sm:p-6 transition-colors hover:border-border/70"
            >
              <h3 className="font-semibold text-foreground mb-1.5">
                {reason.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                {reason.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-border/50 bg-card/40 dark:bg-card/20 p-6 sm:p-7">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              Have a project in mind?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tell me what you&apos;re building - I usually reply within a day.
            </p>
          </div>
          <Link href={socials.cal} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
              <Calendar className="w-4 h-4" />
              Book a call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Work;
