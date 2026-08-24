import { Metadata } from "next";

export const SITE_URL = "https://punyakrit.dev";
export const SITE_NAME = "Punyakrit Singh Makhni";

export const SEO_CONFIG = {
  name: "Punyakrit Singh Makhni",
  title: "Punyakrit Singh Makhni",
  jobTitle: "AI Engineer",
  location: "Remote",
  description:
    "AI Engineer building multi-model agent systems and LLM pipelines that run in production - agent orchestration, RAG, evaluation loops, and the infrastructure underneath them. Python, TypeScript, Gemini, OpenAI, pgvector, FastAPI, Next.js.",
  url: SITE_URL,
  email: "punyakritsinghmakhni@gmail.com",
  image: `${SITE_URL}/profile.jpeg`,
  profileImage: `${SITE_URL}/profile.jpeg`,
  socials: {
    twitter: "https://x.com/punyakrit_22",
    github: "https://github.com/punyakrit",
    linkedin: "https://www.linkedin.com/in/punyakrit-singh-makhni/",
  },
  twitterHandle: "@punyakrit_22",
} as const;

// A small, honest set of role/technology terms. The meta keywords tag is
// ignored by major search engines, so this is kept short and free of
// superlatives ("best"/"top"/"senior") and location stuffing on purpose.
export const PRIMARY_KEYWORDS: string[] = [
  "AI Engineer",
  "AI Agent Engineer",
  "LLM Engineer",
  "Applied AI Engineer",
  "Agent Orchestration",
  "RAG Engineer",
  "Multimodal AI",
  "Full-Stack AI Engineer",
];

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SEO_CONFIG.name,
    jobTitle: SEO_CONFIG.jobTitle,
    description: SEO_CONFIG.description,
    url: SITE_URL,
    email: `mailto:${SEO_CONFIG.email}`,
    image: SEO_CONFIG.profileImage,
    sameAs: [
      SEO_CONFIG.socials.twitter,
      SEO_CONFIG.socials.github,
      SEO_CONFIG.socials.linkedin,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Agents",
      "LLM Orchestration",
      "Multimodal AI",
      "Retrieval-Augmented Generation",
      "Prompt Engineering",
      "LLM Evaluation",
      "Gemini",
      "OpenAI",
      "pgvector",
      "Python",
      "FastAPI",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Independent Projects",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${SEO_CONFIG.name} | AI Engineer`,
    url: SITE_URL,
    description: SEO_CONFIG.description,
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${SEO_CONFIG.name} - AI Engineering`,
    description:
      "AI engineering: multi-model agent systems, LLM pipelines, RAG, and evaluation loops, shipped to production on Python, FastAPI, TypeScript, and Next.js.",
    url: SITE_URL,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Worldwide",
      },
    ],
    serviceType: [
      "AI Engineering",
      "AI Agent Development",
      "LLM Application Development",
      "Retrieval-Augmented Generation",
      "Multimodal AI Pipelines",
      "Full-Stack Development",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://cal.com/punyakrit",
      serviceType: "Online",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generatePortfolioSchema(
  projects: Array<{
    title: string;
    description: string;
    url: string;
    image: string;
    tech: string[];
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/pow#portfolio`,
    name: "AI Engineering Portfolio",
    description:
      "AI agent systems, LLM pipelines, and production applications built by Punyakrit Singh Makhni",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.url,
        image: project.image,
        author: {
          "@id": `${SITE_URL}/#person`,
        },
        keywords: project.tech.join(", "),
      },
    })),
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  url: string;
  github: string;
  image: string;
  tech: string[];
  problem: string;
  solution: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.url,
    image: project.image,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    codeRepository: project.github,
    programmingLanguage: project.tech,
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || SEO_CONFIG.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    keywords: article.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const defaultOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: `${SEO_CONFIG.name} | AI Engineer`,
};

export const defaultTwitter = {
  card: "summary_large_image" as const,
  site: SEO_CONFIG.twitterHandle,
  creator: SEO_CONFIG.twitterHandle,
};

export function createMetadata(options: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  tags?: string[];
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  noFollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  canonical?: string;
  openGraph?: Partial<Metadata["openGraph"]>;
  twitter?: Partial<Metadata["twitter"]>;
}): Metadata {
  const { createMetadata: createMetadataNew } = require("./seo/metadata");
  return createMetadataNew({
    title: options.title,
    description: options.description,
    path: options.path || "/",
    keywords: options.keywords,
    tags: options.tags,
    image: options.image,
    type: options.type,
    noIndex: options.noIndex,
    noFollow: options.noFollow,
    publishedTime: options.publishedTime,
    modifiedTime: options.modifiedTime,
    authors: options.authors,
    section: options.section,
    canonical: options.canonical,
    openGraph: options.openGraph,
    twitter: options.twitter,
  });
}

