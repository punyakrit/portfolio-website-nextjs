import { MetadataRoute } from "next";
import { projects } from "@/lib/projectsData";
import { fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { SITE_URL } from "@/lib/seo";
import {
  optimizeSitemapPages,
  type SitemapPage,
} from "@/lib/seo/sitemap";

function getProjectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getBlogSlug(blog: PageObjectResponse): string {
  const slugProp = blog.properties?.slug;
  if (
    slugProp &&
    slugProp.type === "rich_text" &&
    slugProp.rich_text &&
    Array.isArray(slugProp.rich_text) &&
    slugProp.rich_text.length > 0
  ) {
    return slugProp.rich_text[0].plain_text;
  }
  return blog.id;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  const staticPages: SitemapPage[] = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pow`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectPages: SitemapPage[] = projects.map((project) => ({
    url: `${SITE_URL}/pow/${getProjectSlug(project.title)}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogPages: SitemapPage[] = [];
  try {
    const blogs = await fetchPages();
    const pageBlogs = (blogs || []).filter(
      (blog): blog is PageObjectResponse => blog && blog.object === "page"
    );

    blogPages = pageBlogs.map((blog) => ({
      url: `${SITE_URL}/blogs/${getBlogSlug(blog)}`,
      lastModified: new Date(blog.last_edited_time || blog.created_time),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  const allPages: SitemapPage[] = [
    ...staticPages,
    ...projectPages,
    ...blogPages,
  ];

  return optimizeSitemapPages(allPages);
}
