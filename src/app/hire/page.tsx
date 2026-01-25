/**
 * Hire Developer - Hub Page
 *
 * Main landing page for all hiring-related searches.
 * Acts as the hub in hub-and-spoke internal linking strategy.
 */

import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SEO_CONFIG, createMetadata } from "@/lib/seo";
import {
  SKILLS,
  ROLES,
  ALL_LOCATIONS,
  INTERNATIONAL_LOCATIONS,
  INDIA_CITIES,
} from "@/lib/seo/programmatic";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Hire a Freelance Developer | Remote Full-Stack Developer for Hire",
  description:
    "Looking to hire a freelance developer? I'm a full-stack developer with 4+ years experience in React, Next.js, TypeScript, and Node.js. Available for remote projects worldwide. Get a free consultation.",
  path: "/hire",
  keywords: [
    "hire freelance developer",
    "hire web developer",
    "hire remote developer",
    "freelance developer for hire",
    "hire full-stack developer",
    "hire React developer",
    "hire Next.js developer",
    "freelance web developer",
    "contract developer",
    "remote developer for hire",
    "best freelance developer",
    "top freelance developer",
    "hire developer for startup",
    "MVP developer",
  ],
});

const HOMEPAGE_FAQS = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in React, Next.js, TypeScript, Node.js, PostgreSQL, and modern web technologies. I build production-grade full-stack applications for startups and businesses worldwide.",
  },
  {
    question: "Are you available for remote work?",
    answer:
      "Yes! I work with clients globally. I offer flexible hours to align with US, UK, European, and other timezones. Clear communication and reliable delivery are my priorities.",
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "Timeline depends on scope. Simple projects take 2-4 weeks, MVPs typically 4-8 weeks, and complex applications 2-3 months. I provide detailed estimates after understanding your requirements.",
  },
  {
    question: "Do you offer fixed-price or hourly rates?",
    answer:
      "Both! I offer fixed-price quotes for well-defined projects and hourly rates for ongoing work or projects with evolving requirements. Let's discuss what works best for your situation.",
  },
  {
    question: "How do you handle communication across timezones?",
    answer:
      "I use Slack, email, and video calls (Zoom/Google Meet). I'm flexible with call times and maintain clear async communication. You'll always know your project status.",
  },
];

// Group skills by category for display
const skillsByCategory = {
  "Full-Stack & Frontend": SKILLS.filter(
    (s) => s.category === "fullstack" || s.category === "frontend"
  ).slice(0, 8),
  "Backend & Databases": SKILLS.filter(
    (s) => s.category === "backend" || s.category === "database"
  ).slice(0, 8),
  "DevOps & Cloud": SKILLS.filter((s) => s.category === "devops").slice(0, 6),
};

// Featured locations (prioritize international)
const featuredLocations = [
  ...INTERNATIONAL_LOCATIONS.filter((l) => l.isTechHub).slice(0, 12),
  ...INDIA_CITIES.filter((l) => l.isTechHub).slice(0, 6),
];

export default function HirePage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Hire Developer", url: "/hire" },
  ];

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
          __html: JSON.stringify(generateFAQSchema(HOMEPAGE_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${SITE_URL}/hire#service`,
            name: `${SEO_CONFIG.name} - Freelance Developer for Hire`,
            description:
              "Professional freelance web development services. Full-stack developer available for remote projects worldwide.",
            url: `${SITE_URL}/hire`,
            provider: {
              "@id": `${SITE_URL}/#person`,
            },
            areaServed: [
              { "@type": "Country", name: "United States" },
              { "@type": "Country", name: "United Kingdom" },
              { "@type": "Country", name: "Canada" },
              { "@type": "Country", name: "Australia" },
              { "@type": "Country", name: "Germany" },
              { "@type": "Place", name: "Worldwide" },
            ],
            serviceType: [
              "Web Development",
              "Full-Stack Development",
              "Frontend Development",
              "Backend Development",
              "MVP Development",
              "React Development",
              "Next.js Development",
            ],
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://cal.com/punyakrit",
              serviceType: "Online",
            },
          }),
        }}
      />

      <main className="px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hire a Freelance Developer
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Looking for a skilled developer for your next project? I'm a
            full-stack developer with 4+ years of experience building
            production-grade web applications for clients worldwide.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="https://cal.com/punyakrit"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Schedule a Free Call
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View My Work
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Available for projects
            </span>
            <span>• 50+ projects delivered</span>
            <span>• Global clients (US, UK, EU, Asia)</span>
          </div>
        </section>

        {/* Skills/Technologies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hire by Technology</h2>
          <p className="text-muted-foreground mb-6">
            Find the right expertise for your project. I specialize in modern
            web technologies.
          </p>

          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/hire/${skill.slug}`}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {skill.experience}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Roles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Types of Engagement</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {ROLES.slice(0, 6).map((role) => (
              <Link
                key={role.slug}
                href={`/hire/${role.slug}`}
                className="p-5 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all"
              >
                <h3 className="font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {role.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Locations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Serving Clients Worldwide
          </h2>
          <p className="text-muted-foreground mb-6">
            I work with businesses globally. Whether you're in the US, UK,
            Europe, or Asia, I offer flexible hours and clear communication.
          </p>

          <div className="flex flex-wrap gap-2">
            {featuredLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/hire/location/${location.slug}`}
                className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
              >
                {location.city}
              </Link>
            ))}
            <Link
              href="/hire/location/remote"
              className="px-3 py-1.5 text-sm border border-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-all font-medium"
            >
              Remote / Worldwide
            </Link>
          </div>
        </section>

        {/* Popular Combinations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Popular Searches</h2>
          <p className="text-muted-foreground mb-6">
            Looking for a specific skill in your region? Here are some popular
            combinations:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { skill: "react", skillName: "React Developer", location: "san-francisco", locationName: "San Francisco" },
              { skill: "nextjs", skillName: "Next.js Developer", location: "new-york", locationName: "New York" },
              { skill: "typescript", skillName: "TypeScript Developer", location: "london", locationName: "London" },
              { skill: "fullstack-development", skillName: "Full-Stack Developer", location: "usa", locationName: "USA" },
              { skill: "nodejs", skillName: "Node.js Developer", location: "remote", locationName: "Remote" },
              { skill: "react", skillName: "React Developer", location: "austin", locationName: "Austin" },
              { skill: "frontend-development", skillName: "Frontend Developer", location: "toronto", locationName: "Toronto" },
              { skill: "backend-development", skillName: "Backend Developer", location: "berlin", locationName: "Berlin" },
              { skill: "python", skillName: "Python Developer", location: "sydney", locationName: "Sydney" },
            ].map((combo) => (
              <Link
                key={`${combo.skill}-${combo.location}`}
                href={`/hire/${combo.skill}/in/${combo.location}`}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {combo.skillName}
                </span>
                <span className="text-muted-foreground"> in {combo.locationName}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Value Props */}
        <section className="mb-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Direct Communication</h3>
            <p className="text-sm text-muted-foreground">
              No agencies, no middlemen. You work directly with me. Clear
              updates, quick responses, and transparent progress.
            </p>
          </div>
          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Production-Ready Code</h3>
            <p className="text-sm text-muted-foreground">
              I write clean, maintainable code following best practices.
              TypeScript, testing, and documentation included.
            </p>
          </div>
          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Timezone Flexibility</h3>
            <p className="text-sm text-muted-foreground">
              I adjust my hours to align with your timezone. Regular calls and
              async communication that works for you.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {HOMEPAGE_FAQS.map((faq, index) => (
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

        {/* CTA Section */}
        <section className="text-center py-12 px-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Let's discuss your project. Schedule a free 30-minute consultation
            call—no commitment required.
          </p>
          <Link
            href="https://cal.com/punyakrit"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Schedule Your Free Call
          </Link>
        </section>
      </main>
    </>
  );
}
