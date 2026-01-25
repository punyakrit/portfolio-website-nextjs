/**
 * Programmatic SEO Types
 *
 * Core type definitions for scalable programmatic SEO pages.
 * Designed to handle 100,000+ pages without duplication or thin content.
 */

export interface LocationData {
  slug: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  region: string; // "South Asia", "North America", etc.
  timezone?: string;
  population?: "metro" | "large" | "medium" | "small";
  isCapital?: boolean;
  isTechHub?: boolean;
}

export interface SkillData {
  slug: string;
  name: string;
  category: "frontend" | "backend" | "fullstack" | "database" | "devops" | "mobile" | "ai" | "design";
  experience: string; // "3+ years"
  proficiency: "expert" | "advanced" | "intermediate";
  relatedSkills: string[];
  useCases: string[];
  description: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  verticals: string[];
  commonProjects: string[];
  technologies: string[];
  challenges: string[];
  description: string;
}

export interface RoleData {
  slug: string;
  title: string;
  alternativeTitles: string[];
  description: string;
  responsibilities: string[];
  idealFor: string[];
}

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  idealFor: string[];
}

export interface ProgrammaticPageConfig {
  type: "location" | "skill" | "industry" | "role" | "service" | "combination";
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  h1: string;
  description: string;
  content: ContentBlock[];
  faqs: FAQItem[];
  schema: SchemaConfig;
  internalLinks: InternalLinkConfig;
  canonical?: string;
  noIndex?: boolean;
}

export interface ContentBlock {
  type: "hero" | "intro" | "features" | "process" | "skills" | "cta" | "testimonial" | "faq" | "related";
  heading?: string;
  content: string;
  bulletPoints?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaConfig {
  type: "ProfessionalService" | "LocalBusiness" | "Product" | "Service" | "Person";
  additionalTypes?: string[];
  properties: Record<string, unknown>;
}

export interface InternalLinkConfig {
  hub: string;
  spokes: string[];
  related: string[];
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PageGenerationResult {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    openGraph: Record<string, unknown>;
    twitter: Record<string, unknown>;
  };
  schemas: object[];
  content: {
    h1: string;
    intro: string;
    sections: ContentBlock[];
    faqs: FAQItem[];
  };
  links: {
    breadcrumbs: BreadcrumbItem[];
    related: Array<{ title: string; url: string; description: string }>;
    hub: { title: string; url: string };
  };
}

export interface ContentGenerationConfig {
  name: string;
  location?: LocationData;
  skill?: SkillData;
  industry?: IndustryData;
  role?: RoleData;
  service?: ServiceData;
}

export interface ContentVariation {
  templates: string[];
  currentIndex: number;
}

export interface CanonicalGroup {
  canonical: string;
  duplicates: string[];
  reason: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  wordCount: number;
  uniquenessScore: number;
  keywordDensity: Record<string, number>;
}
