import { fetchBySlug, fetchPage, fetchPages, notion } from "@/lib/notion";
import React from "react";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import type { Metadata } from "next";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogUserTracker from "./BlogUserTracker";
import LikeButton from "./LikeButton";
import { getBlogReadCount } from "@/lib/query/query";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/seo-jsonld";
import { SITE_URL, SEO_CONFIG } from "@/lib/seo";

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await fetchPages();
  const pageBlogs = (blogs || []).filter(
    (blog): blog is PageObjectResponse => blog && blog.object === "page"
  );

  return pageBlogs.map((blog) => {
    const slugProp = blog.properties?.slug;
    let slug = blog.id;

    if (
      slugProp &&
      slugProp.type === "rich_text" &&
      slugProp.rich_text &&
      Array.isArray(slugProp.rich_text) &&
      slugProp.rich_text.length > 0
    ) {
      slug = slugProp.rich_text[0].plain_text;
    }

    return {
      slug,
    };
  });
}

function getBlogTitle(blog: PageObjectResponse): string {
  const titleProp = blog.properties?.Title;
  if (
    titleProp &&
    titleProp.type === "title" &&
    titleProp.title &&
    Array.isArray(titleProp.title) &&
    titleProp.title.length > 0
  ) {
    return titleProp.title[0].plain_text;
  }
  return "Untitled";
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

function getBlogImage(blog: PageObjectResponse): string | null {
  const mediaProp = blog.properties?.media;
  if (
    mediaProp &&
    mediaProp.type === "files" &&
    mediaProp.files &&
    Array.isArray(mediaProp.files) &&
    mediaProp.files.length > 0
  ) {
    const file = mediaProp.files[0];
    if (file && file.type === "file" && file.file) {
      return `/api/blog-image?blogId=${blog.id}`;
    }
  }
  return null;
}

function getBlogDate(blog: PageObjectResponse): string {
  const dateProp = blog.properties?.Date;
  if (dateProp && dateProp.type === "created_time" && dateProp.created_time) {
    return new Date(dateProp.created_time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (blog.created_time) {
    return new Date(blog.created_time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "Date unavailable";
}

function getBlogDateISO(blog: PageObjectResponse): string {
  const dateProp = blog.properties?.Date;
  if (dateProp && dateProp.type === "created_time" && dateProp.created_time) {
    return new Date(dateProp.created_time).toISOString();
  }
  if (blog.created_time) {
    return new Date(blog.created_time).toISOString();
  }
  return new Date().toISOString();
}

function getBlogTags(blog: PageObjectResponse): string[] {
  const tagsProp = blog.properties?.Tags;
  if (
    tagsProp &&
    tagsProp.type === "multi_select" &&
    tagsProp.multi_select &&
    Array.isArray(tagsProp.multi_select)
  ) {
    return tagsProp.multi_select.map((tag) => tag?.name || "").filter(Boolean);
  }
  return [];
}

function calculateReadingTime(html: string): number {
  const textContent = html.replace(/<[^>]*>/g, " ");
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBySlug(slug);
  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const title = getBlogTitle(blog);
  const tags = getBlogTags(blog);
  const blogUrl = `${SITE_URL}/blogs/${slug}`;
  const imageUrl = getBlogImage(blog);

  return {
    title: `${title} | Developer Blog`,
    description: `${title} - A technical article by ${SEO_CONFIG.name}, freelance full-stack developer. ${tags.length > 0 ? `Topics: ${tags.join(", ")}` : ""}`,
    keywords: [
      title,
      ...tags,
      "Web Development",
      "Programming",
      "Developer Blog",
      SEO_CONFIG.name,
    ],
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: `${title} | ${SEO_CONFIG.name}`,
      description: `A technical article by ${SEO_CONFIG.name}`,
      url: blogUrl,
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl.startsWith("/")
                ? `${SITE_URL}${imageUrl}`
                : imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: `${SITE_URL}/card.png`,
              width: 1200,
              height: 630,
              alt: `${SEO_CONFIG.name} - Freelance Full-Stack Developer`,
            },
          ],
      authors: [SEO_CONFIG.name],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: `A technical article by ${SEO_CONFIG.name}`,
      images: imageUrl
        ? [imageUrl.startsWith("/") ? `${SITE_URL}${imageUrl}` : imageUrl]
        : [`${SITE_URL}/card.png`],
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
    },
  };
}

async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await fetchBySlug(slug);

  if (!blog) {
    notFound();
  }

  const content = await fetchPage(blog.id as string);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}) as any);
  renderer.use(bookmarkPlugin(undefined) as any);

  const html = await renderer.render(...content);

  const title = getBlogTitle(blog);
  const imageUrl = getBlogImage(blog);
  const date = getBlogDate(blog);
  const dateISO = getBlogDateISO(blog);
  const tags = getBlogTags(blog);
  const readingTime = calculateReadingTime(html);
  const blogReadCount = await getBlogReadCount(slug);
  const blogUrl = `${SITE_URL}/blogs/${slug}`;

  return (
    <article className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 mt-14 max-w-5xl mx-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blogs` },
          { name: title, url: blogUrl },
        ]}
      />
      <ArticleJsonLd
        article={{
          title,
          description: `${title} - A technical article by ${SEO_CONFIG.name}`,
          url: blogUrl,
          image: imageUrl
            ? imageUrl.startsWith("/")
              ? `${SITE_URL}${imageUrl}`
              : imageUrl
            : undefined,
          datePublished: dateISO,
          dateModified: blog.last_edited_time || dateISO,
          tags,
        }}
      />

      <BlogUserTracker slug={slug} />
      <div className="">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-6 -ml-2" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
          {title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={dateISO}>{date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>
                {blogReadCount} {blogReadCount === 1 ? "view" : "views"}
              </span>
            </div>
          </div>
          <LikeButton slug={slug} />
        </div>
        {imageUrl && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}

        <div className="space-y-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
      />

      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <span className="font-medium text-foreground">
                {SEO_CONFIG.name}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Freelance Full-Stack Developer from India
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/pow">View Projects</Link>
            </Button>
            <Button asChild>
              <Link href="https://cal.com/punyakrit" target="_blank">
                Work With Me
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default BlogPage;
