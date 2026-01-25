/**
 * Dynamic Use Case Page
 *
 * Programmatic SEO page for use-case specific searches like:
 * - "MVP developer"
 * - "SaaS development"
 * - "Build my web app"
 * - "E-commerce developer"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import { USE_CASES, getUseCaseBySlug } from "@/lib/seo/programmatic/extended-data";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all use cases
export async function generateStaticParams() {
  return USE_CASES.map((useCase) => ({
    slug: useCase.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    return {
      title: "Service Not Found",
    };
  }

  const title = `${useCase.name} | Hire Expert Developer for ${useCase.name}`;
  const description = `${useCase.description} ${useCase.timeline} delivery. Technologies: ${useCase.technologies.slice(0, 4).join(", ")}. Get a free consultation.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      ...useCase.searchTerms,
      ...useCase.technologies.map(t => `${t} developer`),
      "freelance developer",
      "hire developer",
    ],
    alternates: {
      canonical: `${SITE_URL}/services/use-case/${useCase.slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/services/use-case/${useCase.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
    },
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: useCase.name, url: `/services/use-case/${useCase.slug}` },
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
          __html: JSON.stringify(generateFAQSchema(useCase.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: useCase.name,
            description: useCase.description,
            url: `${SITE_URL}/services/use-case/${useCase.slug}`,
            provider: {
              "@id": `${SITE_URL}/#person`,
            },
            serviceType: useCase.name,
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
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {useCase.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            {useCase.description}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href="https://cal.com/punyakrit"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/pow"
              className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              View Similar Projects
            </Link>
          </div>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              {useCase.timeline} timeline
            </span>
            <span className="px-3 py-1 text-sm bg-muted rounded-full">
              {useCase.technologies.length}+ technologies
            </span>
            <span className="px-3 py-1 text-sm bg-muted rounded-full">
              Available worldwide
            </span>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {useCase.deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <span className="text-primary text-lg">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <p className="text-muted-foreground mb-4">
            I use modern, battle-tested technologies for {useCase.name.toLowerCase()}:
          </p>
          <div className="flex flex-wrap gap-2">
            {useCase.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-muted rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="mb-10 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCase.idealFor.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-primary">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Discovery Call", desc: "Free 30-min call to understand your needs" },
              { step: "2", title: "Proposal", desc: "Detailed scope, timeline, and pricing" },
              { step: "3", title: "Development", desc: "Iterative building with regular updates" },
              { step: "4", title: "Launch", desc: "Deployment and handover" },
            ].map((phase) => (
              <div key={phase.step} className="text-center p-4 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  {phase.step}
                </div>
                <h3 className="font-semibold mb-1">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {useCase.faqs.map((faq, index) => (
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

        {/* Related Use Cases */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.filter((uc) => uc.slug !== useCase.slug)
              .slice(0, 6)
              .map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/services/use-case/${uc.slug}`}
                  className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
                >
                  {uc.name}
                </Link>
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 px-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">
            Ready for {useCase.name}?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Let's discuss your project. I'll provide a detailed proposal with
            timeline and pricing within 48 hours.
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
