import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import HorizontalLine from "@/components/global/HorizontalLine";
import Experience from "@/components/home/Experience";
import Projects from "@/components/pow/Projects";
import Github from "@/components/home/Github";
import Stack from "@/components/home/Stack";
import BlogsSection from "@/components/blogs/BlogsSection";
import Cta from "@/components/home/Cta";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/lib/seo-jsonld";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";
import Globe from "@/components/home/Globe";

export const metadata: Metadata = {
  title:
    "Punyakrit Singh Makhni | Best Freelance Full-Stack Developer India - Hire Me",
  description:
    "Looking to hire a top freelance web developer? I'm Punyakrit Singh Makhni, a full-stack developer from India specializing in Next.js, React, TypeScript & Node.js. I build production-grade web applications for startups and businesses globally. Book a free call today.",
  keywords: [
    "Best Web Developer",
    "Best Full-Stack Developer",
    "Best Frontend Developer",
    "Freelance Web Developer India",
    "Hire Full-Stack Developer",
    "Hire Web Developer",
    "Remote Web Developer",
    "Next.js Developer India",
    "React Developer for Hire",
    "TypeScript Developer",
    "Freelance Full-Stack Developer",
    "Top Web Developer India",
    "Production-grade Web Apps",
    "Startup Developer",
    "Punyakrit Singh Makhni",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Punyakrit Singh Makhni | Hire the Best Freelance Full-Stack Developer",
    description:
      "I'm a freelance full-stack developer from India building production-grade web applications. Specializing in Next.js, React, TypeScript. Available for remote projects globally.",
    url: SITE_URL,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/card1.png`,
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.name} - Freelance Full-Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | Hire the Best Freelance Full-Stack Developer",
    description:
      "I'm a freelance full-stack developer from India building production-grade web applications. Specializing in Next.js, React, TypeScript. Available for remote projects globally.",
    images: [`${SITE_URL}/card1.png`],
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const homepageFAQs = [
  {
    question: "What services does Punyakrit offer as a freelance developer?",
    answer:
      "I offer full-stack web development services including custom web applications, SaaS products, frontend development with React/Next.js, backend development with Node.js/FastAPI, database design, API development, and deployment on cloud platforms like AWS and Vercel.",
  },
  {
    question: "How can I hire Punyakrit for my project?",
    answer:
      "You can book a free consultation call through my calendar at cal.com/punyakrit. We'll discuss your project requirements, timeline, and budget. I work with startups, businesses, and individuals on both short-term and long-term projects.",
  },
  {
    question: "What tech stack does Punyakrit specialize in?",
    answer:
      "I specialize in modern web technologies including Next.js, React, TypeScript, Node.js, FastAPI, PostgreSQL, Redis, Tailwind CSS, and cloud services like AWS, Vercel, and Supabase. I focus on building scalable, production-ready applications.",
  },
  {
    question: "Does Punyakrit work with international clients?",
    answer:
      "Yes, I work with clients globally. I'm based in India and available for remote work across all time zones. I've worked with startups and companies in the US, Europe, and Asia.",
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
        <Projects showAll={false} />
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

      <section aria-labelledby="blogs-heading">
        <BlogsSection isHome={true} />
      </section>

      <HorizontalLine />

      <section aria-labelledby="contact-heading">
        <Cta />
      </section>
    </div>
  );
}

export default HomePage;
