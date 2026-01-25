/**
 * Services - Hub Page
 *
 * Main landing page for service and industry-specific searches.
 * Targets searches like "web developer for startups", "e-commerce developer", etc.
 */

import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SEO_CONFIG, createMetadata } from "@/lib/seo";
import { INDUSTRIES, SERVICES } from "@/lib/seo/programmatic";
import { USE_CASES } from "@/lib/seo/programmatic/extended-data";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Web Development Services | Full-Stack Developer for Startups & Businesses",
  description:
    "Professional web development services for startups, e-commerce, SaaS, fintech, and more. I build production-grade applications using React, Next.js, and Node.js. Available worldwide.",
  path: "/services",
  keywords: [
    "web development services",
    "full-stack development services",
    "custom web development",
    "startup developer",
    "MVP development",
    "e-commerce development",
    "SaaS development",
    "web app development",
    "developer for startups",
    "developer for e-commerce",
    "developer for SaaS",
    "freelance development services",
  ],
});

const SERVICES_FAQS = [
  {
    question: "What industries do you specialize in?",
    answer:
      "I work with startups, e-commerce, SaaS, fintech, healthcare, education, and more. While I have experience across industries, I'm especially strong at building MVPs for startups and scalable applications for SaaS companies.",
  },
  {
    question: "What services do you offer?",
    answer:
      "I offer full-stack web development, MVP development, API integrations, e-commerce solutions, SaaS product development, performance optimization, and technical consultation. Each engagement is tailored to your needs.",
  },
  {
    question: "How do you price your services?",
    answer:
      "I offer both fixed-price quotes for defined projects and hourly rates for ongoing work. Pricing depends on project scope, complexity, and timeline. Let's discuss your project for an accurate estimate.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Absolutely! Startups are a significant part of my client base. I understand the need for speed, iteration, and budget consciousness. I can help you build an MVP quickly and scale as you grow.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "I specialize in React, Next.js, TypeScript, Node.js, PostgreSQL, and modern web technologies. I choose the best tools for each project based on requirements, scalability needs, and long-term maintainability.",
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
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
          __html: JSON.stringify(generateFAQSchema(SERVICES_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE_URL}/services#service`,
            name: `${SEO_CONFIG.name} - Web Development Services`,
            description:
              "Professional web development services for startups, e-commerce, SaaS, and businesses worldwide.",
            url: `${SITE_URL}/services`,
            provider: {
              "@id": `${SITE_URL}/#person`,
            },
            serviceType: [
              "Web Development",
              "MVP Development",
              "E-commerce Development",
              "SaaS Development",
              "API Integration",
              "Performance Optimization",
            ],
            areaServed: {
              "@type": "Place",
              name: "Worldwide",
            },
          }),
        }}
      />

      <main className="px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Web Development Services
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Whether you're a startup building an MVP, an e-commerce business
            scaling your platform, or a SaaS company adding features—I can help.
            Production-grade development for businesses worldwide.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="https://cal.com/punyakrit"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Discuss Your Project
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View Case Studies
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What I Offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="p-5 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs bg-muted rounded"
                    >
                      {typeof tech === "string" ? tech : "Various"}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Industries I Serve</h2>
          <p className="text-muted-foreground mb-6">
            I've worked with companies across various industries. Each sector
            has unique challenges—I adapt my approach accordingly.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/services/${industry.slug}`}
                className="p-5 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {industry.commonProjects.slice(0, 2).map((project, index) => (
                    <span
                      key={index}
                      className="text-xs text-muted-foreground"
                    >
                      {project}
                      {index < 1 && " •"}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What I Build</h2>
          <p className="text-muted-foreground mb-6">
            From MVPs to enterprise applications—I specialize in building these
            types of projects:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/services/use-case/${useCase.slug}`}
                className="p-5 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {useCase.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {useCase.description.slice(0, 100)}...
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                    {useCase.timeline}
                  </span>
                  <span>•</span>
                  <span>{useCase.technologies.slice(0, 2).join(", ")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How I Work</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Discovery",
                desc: "Understand your goals, requirements, and constraints",
              },
              {
                step: "2",
                title: "Planning",
                desc: "Define scope, architecture, and timeline",
              },
              {
                step: "3",
                title: "Development",
                desc: "Build in iterations with regular updates",
              },
              {
                step: "4",
                title: "Testing",
                desc: "Thorough QA and performance optimization",
              },
              {
                step: "5",
                title: "Launch",
                desc: "Deploy and provide ongoing support",
              },
            ].map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  {phase.step}
                </div>
                <h3 className="font-semibold mb-1">{phase.title}</h3>
                <p className="text-xs text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Me */}
        <section className="mb-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Why Work With Me?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Not an Agency</h3>
              <p className="text-sm text-muted-foreground">
                You work directly with me—no account managers, no junior devs.
                Clear communication and accountability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Global Experience</h3>
              <p className="text-sm text-muted-foreground">
                I've worked with US, UK, European, and Asian clients. I
                understand Western business expectations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Full-Stack Capability</h3>
              <p className="text-sm text-muted-foreground">
                From database design to UI polish—I handle the complete stack.
                No coordination overhead.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Long-Term Partner</h3>
              <p className="text-sm text-muted-foreground">
                I'm not just here for one project. Many clients return for
                ongoing development and support.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {SERVICES_FAQS.map((faq, index) => (
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
          <h2 className="text-2xl font-bold mb-3">Let's Build Something Great</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Have a project in mind? Schedule a free consultation call to discuss
            your requirements and get a quote.
          </p>
          <Link
            href="https://cal.com/punyakrit"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get a Free Consultation
          </Link>
        </section>
      </main>
    </>
  );
}
