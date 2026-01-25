import { SITE_URL, SEO_CONFIG } from "../seo";
import type { BreadcrumbItem as BreadcrumbItemType, FAQItem as FAQItemType } from "./programmatic/types";

// Re-export types from programmatic module for backwards compatibility
export type BreadcrumbItem = BreadcrumbItemType;
export type FAQItem = FAQItemType;

// Local interface definitions for backward compatibility
export interface BreadcrumbItemLocal {
  name: string;
  url: string;
}

export interface ArticleData {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
  author?: {
    name: string;
    url?: string;
  };
}

export interface ProductData {
  name: string;
  description: string;
  url: string;
  image: string;
  brand?: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    contactType: string;
    email?: string;
    url?: string;
  };
}

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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  if (faqs.length === 0) {
    return null;
  }

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

export function generateArticleSchema(article: ArticleData) {
  const articleUrl = article.url.startsWith("http")
    ? article.url
    : `${SITE_URL}${article.url.startsWith("/") ? article.url : `/${article.url}`}`;

  const articleImage = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image.startsWith("/") ? article.image : `/${article.image}`}`
    : SEO_CONFIG.image;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: articleUrl,
    image: articleImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.name,
          ...(article.author.url && { url: article.author.url }),
        }
      : {
          "@id": `${SITE_URL}/#person`,
        },
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    ...(article.tags && article.tags.length > 0 && {
      keywords: article.tags.join(", "),
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}

export function generateProductSchema(product: ProductData) {
  const productUrl = product.url.startsWith("http")
    ? product.url
    : `${SITE_URL}${product.url.startsWith("/") ? product.url : `/${product.url}`}`;

  const productImage = product.image.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image.startsWith("/") ? product.image : `/${product.image}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: productUrl,
    image: productImage,
    ...(product.brand && {
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
    }),
    ...(product.category && {
      category: product.category,
    }),
    ...(product.offers && {
      offers: {
        "@type": "Offer",
        ...(product.offers.price && { price: product.offers.price }),
        ...(product.offers.priceCurrency && {
          priceCurrency: product.offers.priceCurrency,
        }),
        ...(product.offers.availability && {
          availability: `https://schema.org/${product.offers.availability}`,
        }),
      },
    }),
  };
}

export function generateSoftwareApplicationSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  applicationCategory?: string;
  operatingSystem?: string;
  codeRepository?: string;
  programmingLanguage?: string[];
  author?: {
    "@id"?: string;
    name?: string;
  };
}) {
  const projectUrl = project.url.startsWith("http")
    ? project.url
    : `${SITE_URL}${project.url.startsWith("/") ? project.url : `/${project.url}`}`;

  const projectImage = project.image.startsWith("http")
    ? project.image
    : `${SITE_URL}${project.image.startsWith("/") ? project.image : `/${project.image}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: projectUrl,
    image: projectImage,
    applicationCategory: project.applicationCategory || "WebApplication",
    operatingSystem: project.operatingSystem || "Web Browser",
    author: project.author || {
      "@id": `${SITE_URL}/#person`,
    },
    ...(project.codeRepository && {
      codeRepository: project.codeRepository,
    }),
    ...(project.programmingLanguage && project.programmingLanguage.length > 0 && {
      programmingLanguage: project.programmingLanguage,
    }),
  };
}

export function generateItemListSchema(items: Array<{
  name: string;
  description?: string;
  url: string;
  image?: string;
  position?: number;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position ?? index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        ...(item.description && { description: item.description }),
        url: item.url.startsWith("http")
          ? item.url
          : `${SITE_URL}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
        ...(item.image && {
          image: item.image.startsWith("http")
            ? item.image
            : `${SITE_URL}${item.image.startsWith("/") ? item.image : `/${item.image}`}`,
        }),
        author: {
          "@id": `${SITE_URL}/#person`,
        },
      },
    })),
  };
}

export function generateOrganizationSchema(org: OrganizationData) {
  const orgUrl = org.url.startsWith("http")
    ? org.url
    : `${SITE_URL}${org.url.startsWith("/") ? org.url : `/${org.url}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: orgUrl,
    ...(org.logo && {
      logo: org.logo.startsWith("http")
        ? org.logo
        : `${SITE_URL}${org.logo.startsWith("/") ? org.logo : `/${org.logo}`}`,
    }),
    ...(org.description && { description: org.description }),
    ...(org.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: org.contactPoint.contactType,
        ...(org.contactPoint.email && { email: org.contactPoint.email }),
        ...(org.contactPoint.url && { url: org.contactPoint.url }),
      },
    }),
  };
}
