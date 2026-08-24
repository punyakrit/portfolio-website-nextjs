import React from "react";
import type { Metadata } from "next";
import Masthead from "@/components/doc/Masthead";
import Section from "@/components/doc/Section";
import ProofOfWork from "@/components/doc/ProofOfWork";
import Experience from "@/components/doc/Experience";
import Stack from "@/components/doc/Stack";
import CommitsSection from "@/components/doc/CommitsSection";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Punyakrit Singh Makhni | AI Engineer - Agents, LLM Pipelines, RAG",
  description:
    "I'm Punyakrit Singh Makhni, an AI engineer who builds multi-model agent systems and LLM pipelines that run in production - agent orchestration, RAG, evals, and the infrastructure underneath. Python, FastAPI, Gemini, OpenAI, pgvector, TypeScript, Next.js.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Punyakrit Singh Makhni | AI Engineer",
    description:
      "AI engineer building agents and multi-model pipelines that hold up in production. An 8-phase video agent across four models, an ad-evaluation agent, and RAG over large codebases.",
    url: SITE_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | AI Engineer",
    description:
      "I build AI agents and multi-model pipelines that hold up in production - systems where models make the judgment calls and deterministic code does the execution.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

const faqs = [
  {
    question: "What kind of AI systems has Punyakrit built?",
    answer:
      "Multi-model agent pipelines and LLM applications in production. An AI Demo Video Builder that orchestrates four models across an eight-phase pipeline to turn screen recordings into narrated demos. Muze CMO, an AI marketing agent that reads live Meta and Google Ads data, predicts whether a creative will perform before spend, and generates new image and video ads. InfiniteUGC, an AI video pipeline used by 50+ brands across 32+ languages. And CodeLens, RAG over large codebases using pgvector.",
  },
  {
    question: "How does Punyakrit approach building reliable AI agents?",
    answer:
      "By drawing a hard line between judgment and execution: the model makes editorial decisions, deterministic code carries them out. In the AI Demo Video Builder that means a reconciliation phase with zero model calls, evidence grading that rejects unsupported claims, and a plan that passes 32 validation checks before any rendering starts.",
  },
  {
    question: "What is Punyakrit looking for?",
    answer:
      "AI engineer roles at startups building agent systems, LLM products, or applied AI infrastructure. Remote, working across US and European time zones.",
  },
];

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }]} />
      <FAQJsonLd faqs={faqs} />

      <Masthead />

      <Section label="where i've worked" id="experience">
        <Experience />
      </Section>

      <Section label="what i've built" id="work">
        <ProofOfWork />
      </Section>

      <Section label="what i work with" id="stack">
        <Stack />
      </Section>

      <Section label="commits" id="commits">
        <CommitsSection />
      </Section>

      <Section label="get in touch" id="contact">
        <p className="leading-relaxed">
          looking for ai engineer roles at startups.{" "}
          <a href="https://cal.com/punyakrit" target="_blank" rel="noopener noreferrer">
            book a call
          </a>{" "}
          or <a href="mailto:punyakritsinghmakhni@gmail.com">email me</a>.
        </p>
      </Section>
    </>
  );
}
