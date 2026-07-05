import React, { Suspense } from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import HorizontalLine from "@/components/global/HorizontalLine";
import Experience from "@/components/home/Experience";
import Projects from "@/components/pow/Projects";
import Github from "@/components/home/Github";
import Stack from "@/components/home/Stack";
import Cta from "@/components/home/Cta";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import SEOLinks from "@/components/seo/SEOLinks";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import World from "@/components/home/World";


export const metadata: Metadata = {
  title:
    "Punyakrit Singh Makhni | Full-Stack Engineer for Hire - Web & Mobile",
  description:
    "Looking to hire a top full-stack engineer? I'm Punyakrit Singh Makhni, a full-stack developer specializing in Next.js, React, React Native (Expo), TypeScript & Node.js. Available for remote projects in US, UK, Europe & worldwide. Book a free consultation.",
  keywords: [
    "best full-stack developer",
    "senior full-stack developer",
    "hire full-stack developer",
    "full-stack developer",
    "senior software engineer",
    "software engineer for hire",
    "remote developer",
    "full-stack web developer",
    "hire web developer",
    "best developer for hire",
    "MVP developer",
    "startup developer",
    "developer for startups",
    "full-stack developer USA",
    "full-stack developer UK",
    "remote developer for hire",
    "Next.js developer",
    "React developer",
    "React Native Expo developer",
    "TypeScript developer",
    "full-stack developer for hire",
    "Punyakrit Singh Makhni",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Punyakrit Singh Makhni | Full-Stack Engineer for Hire",
    description:
      "Hire a top full-stack engineer for your project. I build production-grade web and mobile applications with Next.js, React, React Native (Expo) & TypeScript. Serving clients in US, UK, Europe & worldwide.",
    url: SITE_URL,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/card1.png`,
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.name} - Full-Stack Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | Hire a Top Full-Stack Engineer",
    description:
      "I'm a full-stack engineer building production-grade web and mobile apps. Specializing in Next.js, React, React Native (Expo), TypeScript. Available for remote projects globally.",
    images: [`${SITE_URL}/card1.png`],
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const homepageFAQs = [
  {
    question: "What services does Punyakrit offer as a full-stack engineer?",
    answer:
      "I offer full-stack web and mobile development including custom web applications, React Native (Expo) mobile apps, SaaS products, frontend development with React/Next.js, backend development with Node.js/FastAPI, database design, API development, and deployment on cloud platforms like AWS and Vercel.",
  },
  {
    question: "How can I hire Punyakrit for my project?",
    answer:
      "You can book a free consultation call through my calendar at cal.com/punyakrit. We'll discuss your project requirements, timeline, and budget. I work with startups, businesses, and individuals on both short-term and long-term projects.",
  },
  {
    question: "What tech stack does Punyakrit specialize in?",
    answer:
      "I specialize in modern web and mobile technologies including Next.js, React, React Native (Expo), TypeScript, Node.js, FastAPI, PostgreSQL, Redis, Tailwind CSS, and cloud services like AWS, Vercel, and Supabase. I focus on building scalable, production-ready web and mobile applications.",
  },
  {
    question: "Does Punyakrit work with international clients?",
    answer:
      "Yes, I work with clients globally. I work remotely across all time zones and have collaborated with startups and companies in the US, Europe, and Asia.",
  },
];

function HomePage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: SITE_URL }]}
      />
      <FAQJsonLd faqs={homepageFAQs} />

      <Hero />
      <About />
      <HorizontalLine />

      <section aria-labelledby="experience-heading">
        <Experience completeView={false} />
      </section>

      <HorizontalLine />

      <section aria-labelledby="projects-heading">
        <Suspense
          fallback={
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-2xl border-2 border-dashed border-muted h-48 animate-pulse" />
                <div className="rounded-2xl border-2 border-dashed border-muted h-48 animate-pulse" />
              </div>
            </div>
          }
        >
          <Projects showAll={false} />
        </Suspense>
      </section>

      <HorizontalLine />

      <section aria-labelledby="github-heading">
        <Github />
      </section>

      <div className="hidden md:block">
        <HorizontalLine />
      </div>

      <section aria-labelledby="stack-heading">
        <Stack />
      </section>

      <HorizontalLine />

      <section aria-labelledby="contact-heading">
        <Cta />
      </section>
      <HorizontalLine />

      {/* <section aria-labelledby="seo-links-heading">
        <SEOLinks />
      </section>
      <HorizontalLine /> */}

      <section aria-labelledby="world-heading">
        <World />
      </section>
    </div>
  );
}

export default HomePage;
