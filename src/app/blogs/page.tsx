import React from "react";
import type { Metadata } from "next";
import BlogsSection from "@/components/blogs/BlogsSection";
import { BreadcrumbJsonLd } from "@/lib/seo-jsonld";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Developer Blog | Web Development, React, Next.js & Full-Stack Insights",
  description:
    "Technical articles and insights from Punyakrit Singh Makhni - a freelance full-stack developer. Read about Next.js, React, TypeScript, system design, and real-world web development lessons from building production apps.",
  keywords: [
    "Web Development Blog",
    "React Tutorials",
    "Next.js Articles",
    "TypeScript Guide",
    "Full-Stack Development",
    "Developer Blog India",
    "Programming Tutorials",
    "System Design",
    "Tech Blog",
    "Software Engineering Articles",
    "Frontend Development",
    "Backend Development",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Developer Blog | Punyakrit Singh Makhni",
    description:
      "Technical articles on web development, React, Next.js, TypeScript, and lessons from building production applications.",
    url: `${SITE_URL}/blogs`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/card1.png`,
        width: 1200,
        height: 630,
        alt: "Punyakrit Singh Makhni Portfolio Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Blog | Punyakrit Singh Makhni",
    description:
      "Technical articles on web development, React, Next.js, TypeScript, and lessons from building production applications.",
    images: [`${SITE_URL}/card1.png`],
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
};

async function BlogsPage() {
  return (
    <div className="md:my-32 my-24 md:px-8 px-2">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blogs` },
        ]}
      />

      <header className="px-4 sm:px-6 md:px-0 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Developer Blog</h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Technical articles, tutorials, and insights from building production
          web applications. I write about Next.js, React, TypeScript, system
          design, and lessons learned from real projects.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Written by{" "}
          <span className="font-medium text-foreground">{SEO_CONFIG.name}</span>{" "}
          - Freelance Full-Stack Developer
        </p>
      </header>

      <BlogsSection isHome={false} />
    </div>
  );
}

export default BlogsPage;
