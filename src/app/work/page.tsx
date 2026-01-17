import React from "react";
import Experience from "@/components/home/Experience";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import { experience } from "@/lib/experience";

function generateExperienceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SEO_CONFIG.name,
    jobTitle: "Freelance Full-Stack Developer",
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

      <header className="px-4 sm:px-6 md:px-0 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Professional Experience
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Over 2 years of hands-on experience building production-grade web applications 
          for startups, businesses, and independent projects. I&apos;ve shipped real products 
          used by thousands - from AI-powered developer tools to monitoring platforms.
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Currently available for freelance work
          </span>
          <span>•</span>
          <span>Remote-friendly</span>
          <span>•</span>
          <span>India-based, global clients</span>
        </div>
      </header>

      <Experience completeView={true} />

      <section className="px-4 sm:px-6 md:px-0 mt-12 pt-8 border-t border-border">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Why Work With Me
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm sm:text-base text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground mb-2">Production Experience</h3>
            <p>
              I&apos;ve built and deployed real applications used by thousands of users. 
              Not tutorials or toy projects - actual production systems with uptime, 
              monitoring, and real users.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Full-Stack Ownership</h3>
            <p>
              I handle everything from database design to frontend polish. 
              One point of contact, no handoff friction, faster delivery.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Startup Velocity</h3>
            <p>
              Having worked with early-stage startups, I understand the importance 
              of shipping fast, iterating quickly, and not over-engineering.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Clear Communication</h3>
            <p>
              I communicate async-first, document decisions, and keep you 
              updated without meetings for everything.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Work;
