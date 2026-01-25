import { MetadataRoute } from "next";
import { projects } from "@/lib/projectsData";
import { fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { SITE_URL } from "@/lib/seo";
import {
  optimizeSitemapPages,
  type SitemapPage,
} from "@/lib/seo/sitemap";
import {
  ALL_LOCATIONS,
  SKILLS,
  ROLES,
  INDUSTRIES,
  USE_CASES,
} from "@/lib/seo/programmatic";

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
      url: `${SITE_URL}/hire`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
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

  // Programmatic SEO pages - Location pages
  const locationPages: SitemapPage[] = ALL_LOCATIONS.map((location) => ({
    url: `${SITE_URL}/hire/location/${location.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: location.isTechHub ? 0.85 : 0.75,
  }));

  // Programmatic SEO pages - Skill pages
  const skillPages: SitemapPage[] = SKILLS.map((skill) => ({
    url: `${SITE_URL}/hire/${skill.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: skill.proficiency === "expert" ? 0.85 : 0.75,
  }));

  // Programmatic SEO pages - Role pages
  const rolePages: SitemapPage[] = ROLES.map((role) => ({
    url: `${SITE_URL}/hire/${role.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic SEO pages - Industry pages
  const industryPages: SitemapPage[] = INDUSTRIES.map((industry) => ({
    url: `${SITE_URL}/services/${industry.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic SEO pages - Use Case pages
  const useCasePages: SitemapPage[] = USE_CASES.map((useCase) => ({
    url: `${SITE_URL}/services/use-case/${useCase.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85, // High priority for use cases
  }));

  // Programmatic SEO pages - Skill + Location combination pages
  const TOP_SKILLS_FOR_COMBOS = [
    "react",
    "nextjs",
    "typescript",
    "nodejs",
    "python",
    "fullstack-development",
    "frontend-development",
    "backend-development",
    "postgresql",
    "api-development",
  ];

  const TOP_LOCATIONS_FOR_COMBOS = [
    "usa",
    "new-york",
    "san-francisco",
    "los-angeles",
    "seattle",
    "austin",
    "boston",
    "uk",
    "london",
    "manchester",
    "canada",
    "toronto",
    "vancouver",
    "australia",
    "sydney",
    "melbourne",
    "germany",
    "berlin",
    "remote",
    "worldwide",
  ];

  const combinationPages: SitemapPage[] = [];
  for (const skill of TOP_SKILLS_FOR_COMBOS) {
    for (const location of TOP_LOCATIONS_FOR_COMBOS) {
      combinationPages.push({
        url: `${SITE_URL}/hire/${skill}/in/${location}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8, // High priority for combination pages
      });
    }
  }

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
    ...locationPages,
    ...skillPages,
    ...rolePages,
    ...industryPages,
    ...useCasePages,
    ...combinationPages,
    ...projectPages,
    ...blogPages,
  ];

  return optimizeSitemapPages(allPages);
}
