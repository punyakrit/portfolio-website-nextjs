/**
 * Dynamic Industry Page
 *
 * Programmatic SEO page for industry-specific searches like:
 * - "Web developer for startups"
 * - "E-commerce developer"
 * - "SaaS development services"
 * - "Developer for fintech"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  INDUSTRIES,
  getIndustryBySlug,
  generateIndustryPage,
} from "@/lib/seo/programmatic";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface PageProps {
  params: Promise<{ industry: string }>;
}

// Generate static params for all industries
export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    industry: industry.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Industry Not Found",
    };
  }

  const page = generateIndustryPage(industry);

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    alternates: {
      canonical: page.metadata.canonical,
    },
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      url: page.metadata.canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metadata.title,
      description: page.metadata.description,
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const page = generateIndustryPage(industry);

  return (
    <>
      {/* Schema Markup */}
      {page.schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="px-4 py-8 md:py-12">
        <Breadcrumbs items={page.links.breadcrumbs} />

        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {page.content.h1}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            {page.content.intro}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="https://cal.com/punyakrit"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Discuss Your {industry.name} Project
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View Case Studies
            </Link>
          </div>

          {/* Industry tags */}
          <div className="flex flex-wrap gap-2">
            {industry.verticals.slice(0, 5).map((vertical, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-muted rounded-full"
              >
                {vertical}
              </span>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        {page.content.sections.map((section, index) => {
          if (section.type === "cta") return null;

          return (
            <section key={index} className="mb-10">
              {section.heading && (
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              )}
              <p className="text-muted-foreground mb-4">{section.content}</p>
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul
                  className={`${
                    section.type === "skills"
                      ? "flex flex-wrap gap-2"
                      : "grid md:grid-cols-2 gap-2"
                  }`}
                >
                  {section.bulletPoints.map((point, pointIndex) =>
                    section.type === "skills" ? (
                      <li
                        key={pointIndex}
                        className="px-3 py-1.5 text-sm bg-muted rounded-full"
                      >
                        {point}
                      </li>
                    ) : (
                      <li
                        key={pointIndex}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1">→</span>
                        <span>{point}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </section>
          );
        })}

        {/* Industry Challenges Section */}
        <section className="mb-10 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Challenges I Solve for {industry.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {industry.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-primary text-xl">✓</span>
                <div>
                  <h3 className="font-medium capitalize">{challenge}</h3>
                  <p className="text-sm text-muted-foreground">
                    I address this through careful planning, proven patterns,
                    and continuous testing.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Projects */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            What I Build for {industry.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {industry.commonProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <h3 className="font-medium mb-2">{project}</h3>
                <p className="text-sm text-muted-foreground">
                  Built with{" "}
                  {industry.technologies.slice(0, 2).join(" and ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Technologies for {industry.name}
          </h2>
          <p className="text-muted-foreground mb-4">
            I choose the right tools based on your specific requirements. For{" "}
            {industry.name.toLowerCase()} projects, I typically use:
          </p>
          <div className="flex flex-wrap gap-2">
            {industry.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-muted rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {page.content.faqs.map((faq, index) => (
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

        {/* Related Industries */}
        {page.links.related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Other Industries I Serve</h2>
            <div className="flex flex-wrap gap-2">
              {page.links.related.map((related, index) => (
                <Link
                  key={index}
                  href={related.url}
                  className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
                >
                  {related.title.replace("Developer for ", "")}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center py-12 px-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">
            Let's Build Your {industry.name} Project
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Have a {industry.name.toLowerCase()} project in mind? Schedule a
            free consultation call to discuss your requirements.
          </p>
          <Link
            href="https://cal.com/punyakrit"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get a Free Consultation
          </Link>
        </section>

        {/* Back to Hub */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Services
          </Link>
        </div>
      </main>
    </>
  );
}
