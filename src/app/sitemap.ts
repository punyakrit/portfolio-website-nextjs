import { MetadataRoute } from "next";
import { projects } from "@/lib/projectsData";
import { SITE_URL } from "@/lib/seo";

function getProjectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const revalidate = 3600;

// A portfolio has a handful of real pages. Everything here is a page a human
// would actually want to land on - no programmatic long tail.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  return [
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
    ...projects.map((project) => ({
      url: `${SITE_URL}/pow/${getProjectSlug(project.title)}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
