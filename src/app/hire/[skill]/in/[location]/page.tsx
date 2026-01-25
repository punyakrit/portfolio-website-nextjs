/**
 * Dynamic Skill + Location Combination Page
 *
 * Programmatic SEO page for skill+location specific searches like:
 * - "React developer in San Francisco"
 * - "Next.js developer in New York"
 * - "TypeScript developer in London"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import {
  SKILLS,
  ROLES,
  ALL_LOCATIONS,
  getSkillBySlug,
  getRoleBySlug,
  getLocationBySlug,
} from "@/lib/seo/programmatic";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  generateAllCombinationPages,
  type CombinationPageData,
} from "@/lib/seo/programmatic/extended-data";

interface PageProps {
  params: Promise<{ skill: string; location: string }>;
}

// Top skills and locations for generating static pages
const TOP_SKILLS = [
  "react",
  "nextjs",
  "typescript",
  "nodejs",
  "python",
  "fullstack-development",
  "frontend-development",
  "backend-development",
  "postgresql",
  "api-development",
];

const TOP_LOCATIONS = [
  "usa",
  "new-york",
  "san-francisco",
  "los-angeles",
  "seattle",
  "austin",
  "boston",
  "uk",
  "london",
  "manchester",
  "canada",
  "toronto",
  "vancouver",
  "australia",
  "sydney",
  "melbourne",
  "germany",
  "berlin",
  "remote",
  "worldwide",
];

// Generate static params for combination pages
export async function generateStaticParams() {
  const params: Array<{ skill: string; location: string }> = [];

  for (const skill of TOP_SKILLS) {
    for (const location of TOP_LOCATIONS) {
      params.push({ skill, location });
    }
  }

  return params;
}

// Helper to get skill or role data
function getSkillOrRole(slug: string) {
  const skill = getSkillBySlug(slug);
  if (skill) return { type: "skill" as const, data: skill, name: skill.name };
  const role = getRoleBySlug(slug);
  if (role) return { type: "role" as const, data: role, name: role.title };
  return null;
}

// Generate metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { skill: skillSlug, location: locationSlug } = await params;
  const skillOrRole = getSkillOrRole(skillSlug);
  const location = getLocationBySlug(locationSlug);

  if (!skillOrRole || !location) {
    return { title: "Not Found" };
  }

  const { data: skillData, type, name: skillName } = skillOrRole;
  const locationName = location.city;
  const isCountry = location.city === location.country;

  const title = `Hire ${skillName} Developer in ${locationName} | Freelance Expert`;
  const description = `Looking for a ${skillName} developer in ${locationName}? I'm a freelance full-stack developer specializing in ${skillName} development. Remote-friendly, timezone-flexible, delivering production-grade applications for clients ${isCountry ? `across ${locationName}` : `in ${locationName}`}.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      `${skillName} developer ${locationName}`,
      `hire ${skillName} developer ${locationName}`,
      `${skillName} freelancer ${locationName}`,
      `${skillName} consultant ${locationName}`,
      `freelance ${skillName} developer`,
      `remote ${skillName} developer`,
    ],
    alternates: {
      canonical: `${SITE_URL}/hire/${skillSlug}/in/${locationSlug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/hire/${skillSlug}/in/${locationSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
    },
  };
}

export default async function SkillLocationPage({ params }: PageProps) {
  const { skill: skillSlug, location: locationSlug } = await params;
  const skillOrRole = getSkillOrRole(skillSlug);
  const location = getLocationBySlug(locationSlug);

  if (!skillOrRole || !location) {
    notFound();
  }

  const { data: skillData, type, name: skillName } = skillOrRole;
  const locationName = location.city;
  const isCountry = location.city === location.country;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Hire", url: "/hire" },
    { name: skillName, url: `/hire/${skillSlug}` },
    {
      name: locationName,
      url: `/hire/${skillSlug}/in/${locationSlug}`,
    },
  ];

  const faqs = [
    {
      question: `How do I hire a ${skillName} developer in ${locationName}?`,
      answer: `I'm a freelance ${skillName} developer available for projects in ${locationName}. I work remotely and am flexible with timezones. Schedule a free consultation call to discuss your project requirements and get a detailed proposal.`,
    },
    {
      question: `What is the typical rate for a ${skillName} developer?`,
      answer: `Rates vary based on project complexity and scope. I offer both hourly and fixed-price options. Let's discuss your project to provide an accurate quote that fits your budget and requirements.`,
    },
    {
      question: `Do you work on-site in ${locationName}?`,
      answer: `I work remotely but am fully flexible with ${location.countryCode === "US" || location.countryCode === "CA" ? "US/Canada" : location.region} timezones. I've successfully delivered projects for clients worldwide with excellent communication and regular updates.`,
    },
    {
      question: `What ${skillName} projects can you help with?`,
      answer:
        type === "skill"
          ? `I specialize in ${(skillData as import("@/lib/seo/programmatic").SkillData).description}. Common projects include web applications, MVPs, SaaS platforms, e-commerce sites, and API development using ${skillName}.`
          : `As a ${skillName}, I help with full-stack development, architecture decisions, code reviews, and building production-grade applications.`,
    },
  ];

  // Related skills and locations for internal linking
  const relatedSkills = SKILLS.filter((s) => s.slug !== skillSlug).slice(0, 6);
  const relatedLocations = ALL_LOCATIONS.filter(
    (l) => l.slug !== locationSlug && l.countryCode === location.countryCode
  ).slice(0, 6);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: `${skillName} Developer in ${locationName}`,
            description: `Freelance ${skillName} developer serving clients in ${locationName}. Expert in ${type === "skill" ? (skillData as import("@/lib/seo/programmatic").SkillData).relatedSkills?.join(", ") || skillName : skillName}.`,
            url: `${SITE_URL}/hire/${skillSlug}/in/${locationSlug}`,
            provider: {
              "@id": `${SITE_URL}/#person`,
            },
            areaServed: {
              "@type": "Place",
              name: locationName,
              address: {
                "@type": "PostalAddress",
                addressLocality: !isCountry ? locationName : undefined,
                addressCountry: location.country,
              },
            },
            serviceType: `${skillName} Development`,
          }),
        }}
      />

      <main className="px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hire {skillName} Developer in {locationName}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Looking for a {skillName.toLowerCase()} developer{" "}
            {isCountry ? "across" : "in"} {locationName}? I'm a freelance
            full-stack developer with deep expertise in {skillName}. I deliver
            production-grade applications for startups, agencies, and
            enterprises.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href="https://cal.com/punyakrit"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Schedule Free Consultation
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View My Work
            </Link>
          </div>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              Remote-friendly
            </span>
            <span className="px-3 py-1 text-sm bg-muted rounded-full">
              {location.region} timezone flexible
            </span>
            <span className="px-3 py-1 text-sm bg-muted rounded-full">
              Available for new projects
            </span>
          </div>
        </section>

        {/* Why Hire Section */}
        <section className="mb-10 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Why Hire Me for {skillName} Development in {locationName}?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">
                {skillName} Expertise
              </h3>
              <p className="text-sm text-muted-foreground">
                {type === "skill"
                  ? `Proficient in ${skillName} with experience building production applications. ${(skillData as import("@/lib/seo/programmatic").SkillData).description}`
                  : `As a ${skillName}, I bring comprehensive knowledge across the development stack.`}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {location.region} Time Zone Coverage
              </h3>
              <p className="text-sm text-muted-foreground">
                Flexible working hours to overlap with{" "}
                {locationName} business hours. Regular communication and
                updates throughout your project.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Direct Communication</h3>
              <p className="text-sm text-muted-foreground">
                You work directly with me—no account managers or junior
                developers. Clear, responsive communication throughout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Proven Track Record</h3>
              <p className="text-sm text-muted-foreground">
                I've delivered successful projects for clients across the US,
                UK, Europe, and Asia. Check my portfolio for case studies.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            {skillName} Development Services
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Custom Web Applications",
              "MVP Development",
              "API Development & Integration",
              "Performance Optimization",
              "Code Review & Refactoring",
              "Technical Consulting",
            ].map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <span className="text-primary text-lg">✓</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Technologies */}
        {type === "skill" && (skillData as import("@/lib/seo/programmatic").SkillData).relatedSkills && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Related Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {(skillData as import("@/lib/seo/programmatic").SkillData).relatedSkills.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-muted rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="border border-border rounded-lg group"
              >
                <summary className="p-4 cursor-pointer font-medium hover:bg-muted/50 transition-colors list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            Other Skills in {locationName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedSkills.map((skill) => (
              <Link
                key={skill.slug}
                href={`/hire/${skill.slug}/in/${locationSlug}`}
                className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
              >
                {skill.name} Developer
              </Link>
            ))}
          </div>
        </section>

        {/* Related Locations */}
        {relatedLocations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">
              {skillName} Developers in Other {location.country} Cities
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/hire/${skillSlug}/in/${loc.slug}`}
                  className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
                >
                  {loc.city}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center py-12 px-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Hire a {skillName} Developer?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Let's discuss your project. I'll provide a detailed proposal with
            timeline and pricing within 48 hours.
          </p>
          <Link
            href="https://cal.com/punyakrit"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get a Free Consultation
          </Link>
        </section>

        {/* Back Links */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href={`/hire/${skillSlug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← {skillName} Developer
          </Link>
          <Link
            href={`/hire/location/${locationSlug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Developers in {locationName} →
          </Link>
        </div>
      </main>
    </>
  );
}
