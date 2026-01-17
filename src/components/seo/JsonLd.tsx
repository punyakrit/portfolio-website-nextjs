import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateProductSchema,
  generateSoftwareApplicationSchema,
  generateItemListSchema,
  generateOrganizationSchema,
  type BreadcrumbItem,
  type FAQItem,
  type ArticleData,
  type ProductData,
  type OrganizationData,
} from "@/lib/seo/schema";

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
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
  ].filter(Boolean);

  return <JsonLd data={schemas} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = generateBreadcrumbSchema(items);
  if (!schema) return null;
  return <JsonLd data={schema} />;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = generateFAQSchema(faqs);
  if (!schema) return null;
  return <JsonLd data={schema} />;
}

export function ArticleJsonLd({ article }: { article: ArticleData }) {
  return <JsonLd data={generateArticleSchema(article)} />;
}

export function ProductJsonLd({ product }: { product: ProductData }) {
  return <JsonLd data={generateProductSchema(product)} />;
}

export function SoftwareApplicationJsonLd({
  project,
}: {
  project: {
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
  };
}) {
  return <JsonLd data={generateSoftwareApplicationSchema(project)} />;
}

export function ItemListJsonLd({
  items,
}: {
  items: Array<{
    name: string;
    description?: string;
    url: string;
    image?: string;
    position?: number;
  }>;
}) {
  return <JsonLd data={generateItemListSchema(items)} />;
}

export function OrganizationJsonLd({ org }: { org: OrganizationData }) {
  return <JsonLd data={generateOrganizationSchema(org)} />;
}
