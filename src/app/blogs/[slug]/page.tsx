import { fetchBySlug, fetchPage, notion } from '@/lib/notion'
import React from 'react'
import { notFound } from 'next/navigation'
import { NotionRenderer } from '@notion-render/client'
import hljsPlugin from '@notion-render/hljs-plugin'
import bookmarkPlugin from '@notion-render/bookmark-plugin'
import type { Metadata } from 'next'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

function getBlogTitle(blog: PageObjectResponse): string {
  const titleProp = blog.properties.Title
  if (titleProp && titleProp.type === 'title' && titleProp.title.length > 0) {
    return titleProp.title[0].plain_text
  }
  return 'Untitled'
}

function getBlogDescription(blog: PageObjectResponse): string {
  return `Read ${getBlogTitle(blog)} by Punyakrit Singh Makhni`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await fetchBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  const title = getBlogTitle(blog)
  const description = getBlogDescription(blog)

  return {
    title: `${title} | Punyakrit Singh Makhni`,
    description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  }
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await fetchBySlug(slug)

  if (!blog) {
    notFound()
  }

  const content = await fetchPage(blog.id as string)

  const renderer = new NotionRenderer({
    client: notion 
  })

  renderer.use(hljsPlugin({}) as any)
  renderer.use(bookmarkPlugin(undefined) as any)

  const html = await renderer.render(...content)

  const title = getBlogTitle(blog)

  return (
    <article className='px-4 sm:px-6 md:px-8 py-8  sm:py-12 mt-14 max-w-5xl mx-auto'>
      <header className='mb-4'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-4'>{title}</h1>
      </header>
      <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        className='prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted' 
      />
    </article>
  )
}

export default page