import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  generatePortfolioSchema,
  generateProjectSchema,
  generateArticleSchema,
  generateFAQSchema,
} from "./seo";

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function RootJsonLd() {
  const schemas = [
    generatePersonSchema(),
    generateWebSiteSchema(),
    generateProfessionalServiceSchema(),
  ];

  return <JsonLd data={schemas} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return <JsonLd data={generateBreadcrumbSchema(items)} />;
}

export function PortfolioJsonLd({
  projects,
}: {
  projects: Array<{
    title: string;
    description: string;
    url: string;
    image: string;
    tech: string[];
  }>;
}) {
  return <JsonLd data={generatePortfolioSchema(projects)} />;
}

export function ProjectJsonLd({
  project,
}: {
  project: {
    title: string;
    description: string;
    url: string;
    github: string;
    image: string;
    tech: string[];
    problem: string;
    solution: string;
  };
}) {
  return <JsonLd data={generateProjectSchema(project)} />;
}

export function ArticleJsonLd({
  article,
}: {
  article: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    tags?: string[];
  };
}) {
  return <JsonLd data={generateArticleSchema(article)} />;
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  return <JsonLd data={generateFAQSchema(faqs)} />;
}

