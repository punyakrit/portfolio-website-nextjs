import { SITE_URL } from "../seo";

export interface RelatedPage {
  title: string;
  url: string;
  description?: string;
  image?: string;
  relevance?: number;
}

export interface HubPage {
  title: string;
  url: string;
  description: string;
  pages: RelatedPage[];
}

export interface InternalLink {
  text: string;
  url: string;
  rel?: "nofollow" | "sponsored";
}

export function generateHubAndSpokeLinks(
  hub: HubPage,
  currentPageUrl: string
): RelatedPage[] {
  const currentPath = currentPageUrl.replace(SITE_URL, "");

  return hub.pages
    .filter((page) => {
      const pagePath = page.url.replace(SITE_URL, "");
      return pagePath !== currentPath;
    })
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    .slice(0, 6);
}

export function generateRelatedPages(
  allPages: RelatedPage[],
  currentPageUrl: string,
  tags?: string[],
  limit: number = 6
): RelatedPage[] {
  const currentPath = currentPageUrl.replace(SITE_URL, "");

  const filtered = allPages.filter((page) => {
    const pagePath = page.url.replace(SITE_URL, "");
    return pagePath !== currentPath;
  });

  if (tags && tags.length > 0) {
    const scored = filtered.map((page) => {
      let score = page.relevance || 0;
      const pageTitleLower = page.title.toLowerCase();
      const pageDescLower = (page.description || "").toLowerCase();

      tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        if (pageTitleLower.includes(tagLower)) score += 3;
        if (pageDescLower.includes(tagLower)) score += 2;
      });

      return { ...page, relevance: score };
    });

    return scored
      .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
      .slice(0, limit);
  }

  return filtered.slice(0, limit);
}

export function generateBreadcrumbs(
  segments: Array<{ name: string; url: string }>
): Array<{ name: string; url: string }> {
  const home = { name: "Home", url: SITE_URL };
  const breadcrumbs = [home];

  segments.forEach((segment) => {
    const url = segment.url.startsWith("http")
      ? segment.url
      : `${SITE_URL}${segment.url.startsWith("/") ? segment.url : `/${segment.url}`}`;
    breadcrumbs.push({ name: segment.name, url });
  });

  return breadcrumbs;
}

export function generateContextualLinks(
  content: string,
  availableLinks: InternalLink[]
): Array<{ text: string; url: string; position: number }> {
  const links: Array<{ text: string; url: string; position: number }> = [];
  const contentLower = content.toLowerCase();

  availableLinks.forEach((link) => {
    const linkTextLower = link.text.toLowerCase();
    const index = contentLower.indexOf(linkTextLower);

    if (index !== -1) {
      links.push({
        text: link.text,
        url: link.url,
        position: index,
      });
    }
  });

  return links.sort((a, b) => a.position - b.position);
}

export function validateInternalLink(url: string): boolean {
  if (!url) return false;

  if (url.startsWith("http")) {
    return url.startsWith(SITE_URL);
  }

  return url.startsWith("/");
}

export function normalizeInternalUrl(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}
