import { MetadataRoute } from "next";
import { SITE_URL } from "../seo";

export interface SitemapPage {
  url: string;
  lastModified?: Date | string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

const MAX_SITEMAP_SIZE = 50000;
const MAX_SITEMAP_BYTES = 50 * 1024 * 1024;

export function chunkSitemap(
  pages: SitemapPage[],
  maxSize: number = MAX_SITEMAP_SIZE
): SitemapPage[][] {
  const chunks: SitemapPage[][] = [];
  let currentChunk: SitemapPage[] = [];
  let currentSize = 0;

  for (const page of pages) {
    const pageSize = estimatePageSize(page);
    if (currentSize + pageSize > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [page];
      currentSize = pageSize;
    } else {
      currentChunk.push(page);
      currentSize += pageSize;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function estimatePageSize(page: SitemapPage): number {
  const url = page.url.length;
  const lastModified = page.lastModified
    ? page.lastModified.toString().length
    : 0;
  const changeFrequency = page.changeFrequency
    ? page.changeFrequency.length
    : 0;
  const priority = page.priority ? page.priority.toString().length : 0;

  return url + lastModified + changeFrequency + priority + 200;
}

export function createSitemapIndex(
  sitemaps: Array<{ url: string; lastModified?: Date | string }>
): { sitemaps: Array<{ url: string; lastModified: Date }> } {
  return {
    sitemaps: sitemaps.map((sitemap) => ({
      url: sitemap.url,
      lastModified: sitemap.lastModified
        ? new Date(sitemap.lastModified)
        : new Date(),
    })),
  };
}

export function formatSitemapPage(page: SitemapPage): MetadataRoute.Sitemap[0] {
  return {
    url: page.url,
    lastModified: page.lastModified
      ? typeof page.lastModified === "string"
        ? new Date(page.lastModified)
        : page.lastModified
      : new Date(),
    changeFrequency: page.changeFrequency || "monthly",
    priority: page.priority ?? 0.5,
  };
}

export function optimizeSitemapPages(
  pages: SitemapPage[]
): MetadataRoute.Sitemap {
  return pages.map(formatSitemapPage);
}

export async function generateSitemapWithPagination(
  allPages: SitemapPage[],
  basePath: string = "/sitemap"
): Promise<{
  index: { sitemaps: Array<{ url: string; lastModified: Date }> } | null;
  sitemaps: Array<{ url: string; pages: MetadataRoute.Sitemap }>;
}> {
  if (allPages.length <= MAX_SITEMAP_SIZE) {
    return {
      index: null,
      sitemaps: [
        {
          url: `${SITE_URL}${basePath}.xml`,
          pages: optimizeSitemapPages(allPages),
        },
      ],
    };
  }

  const chunks = chunkSitemap(allPages);
  const sitemaps = chunks.map((chunk, index) => ({
    url: `${SITE_URL}${basePath}-${index + 1}.xml`,
    pages: optimizeSitemapPages(chunk),
  }));

  const index = createSitemapIndex(sitemaps);

  return {
    index,
    sitemaps,
  };
}
