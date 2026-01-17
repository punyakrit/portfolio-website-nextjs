import type { Metadata } from "next";
import { SITE_URL, SEO_CONFIG, PRIMARY_KEYWORDS } from "../seo";

export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
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
  tags?: string[];
  canonical?: string;
  openGraph?: Partial<Metadata["openGraph"]>;
  twitter?: Partial<Metadata["twitter"]>;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: Required<Metadata["openGraph"]>;
  twitter: Required<Metadata["twitter"]>;
  robots: Metadata["robots"];
}

export function generatePageMetadata(options: MetadataOptions): PageMetadata {
  const {
    title,
    description,
    path,
    keywords = [],
    image,
    type = "website",
    noIndex = false,
    noFollow = false,
    publishedTime,
    modifiedTime,
    authors = [SEO_CONFIG.name],
    section,
    tags = [],
    canonical: customCanonical,
    openGraph: customOpenGraph = {},
    twitter: customTwitter = {},
  } = options;

  const canonicalPath = customCanonical || path;
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  const fullTitle = title.includes(SEO_CONFIG.name)
    ? title
    : `${title} | ${SEO_CONFIG.name}`;

  const allKeywords = [
    ...new Set([...keywords, ...PRIMARY_KEYWORDS, ...tags]),
  ];

  const defaultImage = {
    url: SEO_CONFIG.image,
    width: 1200,
    height: 630,
    alt: `${SEO_CONFIG.name} - ${title}`,
  };

  const ogImage = image
    ? {
        url: image.url.startsWith("http")
          ? image.url
          : `${SITE_URL}${image.url.startsWith("/") ? image.url : `/${image.url}`}`,
        width: image.width || 1200,
        height: image.height || 630,
        alt: image.alt || title,
      }
    : defaultImage;

  const openGraph: Required<Metadata["openGraph"]> = {
    type,
    locale: "en_US",
    url: canonicalUrl,
    siteName: `${SEO_CONFIG.name} | Freelance Full-Stack Developer`,
    title: fullTitle,
    description,
    images: [ogImage],
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
    ...(authors.length > 0 && { authors }),
    ...(section && { section }),
    ...(tags.length > 0 && { tags }),
    ...customOpenGraph,
  } as Required<Metadata["openGraph"]>;

  const twitter: Required<Metadata["twitter"]> = {
    card: "summary_large_image",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
    title: fullTitle,
    description,
    images: [ogImage.url],
    ...customTwitter,
  } as Required<Metadata["twitter"]>;

  const robots: Metadata["robots"] = noIndex || noFollow
    ? {
        index: !noIndex,
        follow: !noFollow,
        ...(noIndex && {
          googleBot: {
            index: false,
            follow: !noFollow,
          },
        }),
      }
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
      };

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    canonical: canonicalUrl,
    openGraph,
    twitter,
    robots,
  };
}

export function createMetadata(options: MetadataOptions): Metadata {
  const pageMetadata = generatePageMetadata(options);

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    authors: [{ name: SEO_CONFIG.name, url: SITE_URL }],
    creator: SEO_CONFIG.name,
    publisher: SEO_CONFIG.name,
    alternates: {
      canonical: pageMetadata.canonical,
    },
    openGraph: pageMetadata.openGraph,
    twitter: pageMetadata.twitter,
    robots: pageMetadata.robots,
    metadataBase: new URL(SITE_URL),
  };
}
