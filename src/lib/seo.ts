import { Metadata } from "next";

export const SITE_URL = "https://punyakrit.dev";
export const SITE_NAME = "Punyakrit Singh Makhni";

export const SEO_CONFIG = {
  name: "Punyakrit Singh Makhni",
  title: "Punyakrit Singh Makhni",
  jobTitle: "Freelance Full-Stack Developer",
  location: "India",
  description:
    "Freelance Full-Stack Developer from India building production-grade web applications. Hire me for Next.js, React, TypeScript, and Node.js projects. Available for remote work globally.",
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

export const PRIMARY_KEYWORDS: string[] = [
  "Best Web Developer",
  "Best Frontend Developer",
  "Best Backend Developer",
  "Best Full-Stack Developer",
  "Freelance Web Developer India",
  "Freelance Full-Stack Developer",
  "Hire Web Developer",
  "Hire Frontend Developer",
  "Hire Backend Developer",
  "Hire Full-Stack Developer",
  "Remote Web Developer",
  "Next.js Developer",
  "React Developer India",
  "TypeScript Developer",
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
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "India",
    },
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
      name: "Independent / Freelance",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${SEO_CONFIG.name} | Freelance Full-Stack Developer`,
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
    name: `${SEO_CONFIG.name} - Freelance Web Development`,
    description:
      "Professional freelance web development services. I build production-grade web applications using Next.js, React, TypeScript, and Node.js. Available for remote projects globally.",
    url: SITE_URL,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
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
  siteName: `${SEO_CONFIG.name} | Freelance Full-Stack Developer`,
  images: [
    {
      url: SEO_CONFIG.image,
      width: 1200,
      height: 630,
      alt: `${SEO_CONFIG.name} - Freelance Full-Stack Developer`,
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
  openGraph?: Partial<Metadata["openGraph"]>;
  noIndex?: boolean;
}): Metadata {
  const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords || [...PRIMARY_KEYWORDS],
    authors: [{ name: SEO_CONFIG.name }],
    creator: SEO_CONFIG.name,
    publisher: SEO_CONFIG.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      ...defaultOpenGraph,
      ...options.openGraph,
    },
    twitter: {
      ...defaultTwitter,
      title: options.title,
      description: options.description,
      images: [SEO_CONFIG.image],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

