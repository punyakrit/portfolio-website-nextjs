/**
 * Dynamic Skill/Role Page
 *
 * Programmatic SEO page for technology and role-based searches like:
 * - "Hire React developer"
 * - "Freelance Next.js developer"
 * - "Remote TypeScript developer"
 * - "Contract developer for hire"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  SKILLS,
  ROLES,
  getSkillBySlug,
  getRoleBySlug,
  generateSkillPage,
  generateRolePage,
} from "@/lib/seo/programmatic";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface PageProps {
  params: Promise<{ skill: string }>;
}

// Generate static params for all skills AND roles
export async function generateStaticParams() {
  const skillParams = SKILLS.map((skill) => ({
    skill: skill.slug,
  }));

  const roleParams = ROLES.map((role) => ({
    skill: role.slug,
  }));

  return [...skillParams, ...roleParams];
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { skill: slug } = await params;

  // Try skill first, then role
  const skill = getSkillBySlug(slug);
  const role = !skill ? getRoleBySlug(slug) : null;

  if (!skill && !role) {
    return {
      title: "Page Not Found",
    };
  }

  const page = skill ? generateSkillPage(skill) : generateRolePage(role!);

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

export default async function SkillPage({ params }: PageProps) {
  const { skill: slug } = await params;

  // Try skill first, then role
  const skill = getSkillBySlug(slug);
  const role = !skill ? getRoleBySlug(slug) : null;

  if (!skill && !role) {
    notFound();
  }

  const page = skill ? generateSkillPage(skill) : generateRolePage(role!);
  const isSkill = !!skill;

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
              View My {isSkill ? skill.name : ""} Projects
            </Link>
          </div>

          {/* Skill-specific badges */}
          {isSkill && (
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                {skill.experience} Experience
              </span>
              <span className="px-3 py-1 text-sm bg-muted rounded-full capitalize">
                {skill.proficiency} Level
              </span>
              <span className="px-3 py-1 text-sm bg-muted rounded-full capitalize">
                {skill.category} Development
              </span>
            </div>
          )}
        </section>

        {/* Content Sections */}
        {page.content.sections.map((section, index) => {
          if (section.type === "cta") return null; // Handle CTA separately

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

        {/* Why Choose Me Section */}
        <section className="mb-10 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Why Hire Me{isSkill ? ` for ${skill.name}` : ""}?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Production Experience</h3>
              <p className="text-sm text-muted-foreground">
                I've built real applications that handle real users and real
                traffic. Not just tutorials—production-grade code.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Modern Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                TypeScript, testing, clean architecture, and documentation. Code
                that's maintainable long-term.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Clear Communication</h3>
              <p className="text-sm text-muted-foreground">
                Regular updates, responsive to questions, and transparent about
                progress. You'll always know the status.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Fixed-price for defined projects, hourly for ongoing work. We'll
                find what works for you.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Projects - if skill */}
        {isSkill && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              {skill.name} Projects I've Built
            </h2>
            <p className="text-muted-foreground mb-4">
              Here are some types of projects I've delivered using {skill.name}:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {skill.useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg"
                >
                  <h3 className="font-medium mb-1">{useCase}</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with {skill.name}
                    {skill.relatedSkills[0] && ` and ${skill.relatedSkills[0]}`}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/pow"
              className="inline-block mt-4 text-primary hover:underline"
            >
              See detailed case studies →
            </Link>
          </section>
        )}

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

        {/* Related Skills/Roles */}
        {page.links.related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">
              {isSkill ? "Related Technologies" : "Other Engagement Types"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {page.links.related.map((related, index) => (
                <Link
                  key={index}
                  href={related.url}
                  className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Find by Location - for skills */}
        {isSkill && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">
              Find {skill.name} Developer by Location
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { slug: "usa", name: "USA" },
                { slug: "new-york", name: "New York" },
                { slug: "san-francisco", name: "San Francisco" },
                { slug: "uk", name: "UK" },
                { slug: "london", name: "London" },
                { slug: "canada", name: "Canada" },
                { slug: "toronto", name: "Toronto" },
                { slug: "australia", name: "Australia" },
                { slug: "germany", name: "Germany" },
                { slug: "remote", name: "Remote" },
              ].map((location) => (
                <Link
                  key={location.slug}
                  href={`/hire/${slug}/in/${location.slug}`}
                  className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
                >
                  {skill.name} Developer in {location.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center py-12 px-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Start Your {isSkill ? skill.name : ""} Project?
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
