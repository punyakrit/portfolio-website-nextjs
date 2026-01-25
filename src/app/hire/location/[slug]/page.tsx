/**
 * Dynamic Location Page
 *
 * Programmatic SEO page for location-based searches like:
 * - "Hire freelance developer in San Francisco"
 * - "Web developer for New York companies"
 * - "Remote developer for UK businesses"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_LOCATIONS,
  getLocationBySlug,
  generateLocationPage,
} from "@/lib/seo/programmatic";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedPages } from "@/components/seo/RelatedPages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all locations
export async function generateStaticParams() {
  return ALL_LOCATIONS.map((location) => ({
    slug: location.slug,
  }));
}

// Generate metadata for each location
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const page = generateLocationPage(location);

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

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const page = generateLocationPage(location);

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
              Schedule a Free Call
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View My Portfolio
            </Link>
          </div>
        </section>

        {/* Content Sections */}
        {page.content.sections.map((section, index) => (
          <section key={index} className="mb-10">
            {section.heading && (
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
            )}
            <p className="text-muted-foreground mb-4">{section.content}</p>
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="grid md:grid-cols-2 gap-2">
                {section.bulletPoints.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Why Work With Me Section */}
        <section className="mb-10 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Why {location.city} Businesses Choose to Work With Me
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Clear Communication</h3>
              <p className="text-sm text-muted-foreground">
                Fluent English, regular updates, and responsive communication.
                No language barriers or timezone surprises.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quality Code</h3>
              <p className="text-sm text-muted-foreground">
                Production-ready, maintainable code with TypeScript, testing,
                and documentation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">
                I adjust my schedule to align with {location.city} business
                hours for real-time collaboration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Proven Track Record</h3>
              <p className="text-sm text-muted-foreground">
                50+ successful projects delivered for clients across the US, UK,
                Europe, and Asia.
              </p>
            </div>
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

        {/* Related Locations */}
        {page.links.related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">
              Also Serving Clients In
            </h2>
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
            Ready to Discuss Your {location.city} Project?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Schedule a free 30-minute consultation call. Let's discuss your
            requirements and see how I can help.
          </p>
          <Link
            href="https://cal.com/punyakrit"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Schedule Your Free Call
          </Link>
        </section>

        {/* Back to Hub */}
        <div className="mt-8 text-center">
          <Link
            href="/hire"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Hire Developer
          </Link>
        </div>
      </main>
    </>
  );
}
