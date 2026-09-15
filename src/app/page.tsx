import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import HorizontalLine from "@/components/global/HorizontalLine";
import Experience from "@/components/home/Experience";
import FeaturedProjects from "@/components/pow/FeaturedProjects";
import Github from "@/components/home/Github";
import Stack from "@/components/home/Stack";
import Cta from "@/components/home/Cta";
import World from "@/components/home/World";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Punyakrit Singh Makhni | Full Stack Engineer - Web, Mobile, AI Features",
  description:
    "I'm Punyakrit Singh Makhni, a full stack engineer who ships product end to end - Next.js, React, React Native, TypeScript, Node.js, Python - including the AI features inside it. Remote, open to full stack engineer roles.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Punyakrit Singh Makhni | Full Stack Engineer",
    description:
      "Full stack engineer shipping product end to end - web, mobile, and the AI features inside them. A multi-model video agent, an ad-evaluation agent, an iOS app on the App Store.",
    url: SITE_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | Full Stack Engineer",
    description:
      "I build and ship full stack products end to end - Next.js, React, React Native, TypeScript, Node.js - and the AI features inside them.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const homepageFAQs = [
  {
    question: "What has Punyakrit built as a full stack engineer?",
    answer:
      "Production web and mobile products, end to end. An AI Demo Video Builder that orchestrates four models across an eight-phase pipeline to turn screen recordings into narrated demos. Muze CMO, a marketing agent that reads live Meta and Google Ads data, predicts whether a creative will perform before spend, and generates new image and video ads. InfiniteUGC, a video pipeline used by 50+ brands across 32+ languages. CodeLens, retrieval over large codebases using pgvector. And an iOS app shipped on the App Store.",
  },
  {
    question: "How does Punyakrit approach shipping AI features inside product?",
    answer:
      "By drawing a hard line between judgment and execution: the model makes editorial decisions, deterministic code carries them out. In the AI Demo Video Builder that means a reconciliation phase with zero model calls, evidence grading that rejects unsupported claims, and a plan that passes 32 validation checks before any rendering starts.",
  },
  {
    question: "What is Punyakrit looking for?",
    answer:
      "Full stack engineer roles at startups - building product end to end, including the AI features inside it. Remote, working across US and European time zones.",
  },
];

function HomePage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }]} />
      <FAQJsonLd faqs={homepageFAQs} />

      <Hero />
      <About />

      <HorizontalLine />

      <section aria-labelledby="experience-heading">
        <Experience completeView={false} />
      </section>

      <HorizontalLine />

      {/* FeaturedProjects, Github, Stack and World render their own headings but
          do not expose ids for them, so these landmarks are named with aria-label
          rather than a dangling aria-labelledby reference. */}
      <section aria-label="Featured projects">
        <FeaturedProjects />
      </section>

      <HorizontalLine />

      <section aria-label="GitHub contributions">
        <Github />
      </section>

      <div className="hidden md:block">
        <HorizontalLine />
      </div>

      <section aria-label="Stack I use">
        <Stack />
      </section>

      <HorizontalLine />

      {/* Cta renders its own <section aria-labelledby="contact-heading">, so it
          is mounted bare - wrapping it would nest a second landmark on the same
          heading id, which is what the old page did. */}
      <Cta />

      <HorizontalLine />

      <section aria-label="Where visitors come from">
        <World />
      </section>
    </div>
  );
}

export default HomePage;
