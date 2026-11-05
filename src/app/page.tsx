import React from "react";
import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import Intro from "@/components/landing/Intro";
import Work from "@/components/landing/Work";
import Inside from "@/components/landing/Inside";
import Route from "@/components/landing/Route";
import Tools from "@/components/landing/Tools";
import Close from "@/components/landing/Close";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Punyakrit Singh Makhni | Full-Stack AI Engineer",
  description:
    "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Punyakrit Singh Makhni | Full-Stack AI Engineer",
    description:
      "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
    url: SITE_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | Full-Stack AI Engineer",
    description:
      "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const homepageFAQs = [
  {
    question: "What has Punyakrit built?",
    answer:
      "Production web and mobile products, end to end. RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT through an MCP server he built. An AI Demo Video Builder that orchestrates four models across an eight-phase pipeline to turn screen recordings into narrated demos. Muze CMO, a marketing agent that reads live Meta and Google Ads data, predicts whether a creative will perform before spend, and generates new image and video ads. InfiniteUGC, a video pipeline used by 50+ brands across 32+ languages. CodeLens, retrieval over large codebases using pgvector. And an iOS app shipped on the App Store.",
  },
  {
    question: "How does Punyakrit approach shipping AI features inside product?",
    answer:
      "By drawing a hard line between judgment and execution: the model makes editorial decisions, deterministic code carries them out. In the AI Demo Video Builder that means a reconciliation phase with zero model calls, evidence grading that rejects unsupported claims, and a plan that passes 32 validation checks before any rendering starts.",
  },
  {
    question: "What is Punyakrit looking for?",
    answer:
      "Remote full-stack, AI and founding engineer roles at startups, full-time or contract. He is on IST and works US hours.",
  },
];

function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }]} />
      <FAQJsonLd faqs={homepageFAQs} />

      <LandingNav home />
      <main>
        <Intro />
        <Work />
        <Inside />
        <Route />
        <Tools />
      </main>
      <Close />
    </>
  );
}

export default HomePage;
