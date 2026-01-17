import type { Metadata } from "next";
import { createMetadata, type MetadataOptions } from "./metadata";
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  type BreadcrumbItem,
  type FAQItem,
  type ArticleData,
} from "./schema";
import {
  generateRelatedPages,
  generateBreadcrumbs,
  type RelatedPage,
} from "./linking";
import { validateContent, type ContentValidation } from "./content";

export interface ProgrammaticPageData {
  title: string;
  description: string;
  path: string;
  content: string;
  keywords?: string[];
  tags?: string[];
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: "website" | "article" | "profile";
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  relatedPages?: RelatedPage[];
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export interface ProgrammaticPageResult {
  metadata: Metadata;
  schemas: object[];
  breadcrumbs: BreadcrumbItem[];
  relatedPages: RelatedPage[];
  contentValidation: ContentValidation;
}

export function createProgrammaticPage(
  data: ProgrammaticPageData,
  allPages?: RelatedPage[]
): ProgrammaticPageResult {
  const contentValidation = validateContent(data.content);

  const metadataOptions: MetadataOptions = {
    title: data.title,
    description: data.description,
    path: data.path,
    keywords: data.keywords,
    tags: data.tags,
    image: data.image,
    type: data.type || "website",
    noIndex: data.noIndex,
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
  };

  const metadata = createMetadata(metadataOptions);

  const schemas: object[] = [];

  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    const breadcrumbSchema = generateBreadcrumbSchema(data.breadcrumbs);
    if (breadcrumbSchema) {
      schemas.push(breadcrumbSchema);
    }
  }

  if (data.faqs && data.faqs.length > 0) {
    const faqSchema = generateFAQSchema(data.faqs);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  if (data.type === "article" && data.publishedTime) {
    const articleData: ArticleData = {
      title: data.title,
      description: data.description,
      url: data.path,
      image: data.image?.url,
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime,
      tags: data.tags,
    };
    const articleSchema = generateArticleSchema(articleData);
    schemas.push(articleSchema);
  }

  const breadcrumbs = data.breadcrumbs
    ? generateBreadcrumbs(data.breadcrumbs)
    : [{ name: "Home", url: "/" }];

  const relatedPages = data.relatedPages
    ? data.relatedPages
    : allPages
      ? generateRelatedPages(
          allPages,
          data.path,
          data.tags,
          6
        )
      : [];

  return {
    metadata,
    schemas,
    breadcrumbs,
    relatedPages,
    contentValidation,
  };
}

export function createArticlePage(
  article: ArticleData & {
    path: string;
    content: string;
    breadcrumbs?: BreadcrumbItem[];
    faqs?: FAQItem[];
    relatedPages?: RelatedPage[];
    allPages?: RelatedPage[];
  }
): ProgrammaticPageResult {
  return createProgrammaticPage(
    {
      title: article.title,
      description: article.description,
      path: article.path,
      content: article.content || "",
      keywords: article.tags,
      tags: article.tags,
      image: article.image
        ? {
            url: article.image,
            alt: article.title,
          }
        : undefined,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      breadcrumbs: article.breadcrumbs,
      faqs: article.faqs,
      relatedPages: article.relatedPages,
    },
    article.allPages
  );
}

export function createProjectPage(
  project: {
    name: string;
    description: string;
    path: string;
    content: string;
    image: string;
    url: string;
    github?: string;
    tech?: string[];
    breadcrumbs?: BreadcrumbItem[];
    relatedPages?: RelatedPage[];
    allPages?: RelatedPage[];
  }
): ProgrammaticPageResult {
  const contentValidation = validateContent(project.content);

  const metadataOptions: MetadataOptions = {
    title: `${project.name} - Case Study | Full-Stack Web Development Project`,
    description: `${project.description} Built with ${project.tech?.join(", ") || "modern web technologies"}. A production-grade project showcasing real-world problem solving and modern web development.`,
    path: project.path,
    keywords: [project.name, ...(project.tech || [])],
    tags: project.tech,
    image: {
      url: project.image,
      alt: `${project.name} - Project Screenshot`,
    },
    type: "article",
  };

  const metadata = createMetadata(metadataOptions);

  const schemas: object[] = [];

  const breadcrumbSchema = generateBreadcrumbSchema(
    project.breadcrumbs || [
      { name: "Home", url: "/" },
      { name: "Projects", url: "/pow" },
      { name: project.name, url: project.path },
    ]
  );
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  const softwareSchema = generateSoftwareApplicationSchema({
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    codeRepository: project.github,
    programmingLanguage: project.tech,
  });
  schemas.push(softwareSchema);

  const breadcrumbs = generateBreadcrumbs(
    project.breadcrumbs || [
      { name: "Home", url: "/" },
      { name: "Projects", url: "/pow" },
      { name: project.name, url: project.path },
    ]
  );

  const relatedPages = project.relatedPages
    ? project.relatedPages
    : project.allPages
      ? generateRelatedPages(project.allPages, project.path, project.tech, 6)
      : [];

  return {
    metadata,
    schemas,
    breadcrumbs,
    relatedPages,
    contentValidation,
  };
}
