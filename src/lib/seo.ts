import { Metadata } from "next";

export const SITE_URL = "https://punyakrit.dev";
export const SITE_NAME = "Punyakrit Singh Makhni";

export const SEO_CONFIG = {
  name: "Punyakrit Singh Makhni",
  title: "Punyakrit Singh Makhni",
  jobTitle: "Full-Stack Engineer",
  location: "Remote",
  description:
    "Full-Stack Engineer building production-grade web and mobile applications. Hire me for Next.js, React, React Native (Expo), TypeScript, and Node.js projects. Available for remote work globally.",
  url: SITE_URL,
  email: "punyakritsinghmakhni@gmail.com",
  image: `${SITE_URL}/card1.png`,
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
  "Full-Stack Engineer",
  "Full-Stack Developer",
  "Next.js Developer",
  "React Developer",
  "React Native Developer",
  "TypeScript Developer",
  "Node.js Developer",
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
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "FastAPI",
      "Python",
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
    name: `${SEO_CONFIG.name} | Full-Stack Engineer`,
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
    name: `${SEO_CONFIG.name} - Full-Stack Web Development`,
    description:
      "Professional full-stack web development services. I build production-grade web applications using Next.js, React, TypeScript, and Node.js. Available for remote projects globally.",
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
      "Web Development",
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development",
      "React Development",
      "Next.js Development",
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
    name: "Web Development Portfolio",
    description:
      "Production-grade web development projects built by Punyakrit Singh Makhni",
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
  siteName: `${SEO_CONFIG.name} | Full-Stack Engineer`,
  images: [
    {
      url: SEO_CONFIG.image,
      width: 1200,
      height: 630,
      alt: `${SEO_CONFIG.name} - Full-Stack Engineer`,
    },
  ],
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

