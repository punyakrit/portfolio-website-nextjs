import { fetchBySlug, fetchPage, fetchPages, notion } from '@/lib/notion'
import React from 'react'
import { notFound } from 'next/navigation'
import { NotionRenderer } from '@notion-render/client'
import hljsPlugin from '@notion-render/hljs-plugin'
import bookmarkPlugin from '@notion-render/bookmark-plugin'
import type { Metadata } from 'next'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'
import { ArrowLeft, Calendar, Eye, Tag, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamicParams = false
export const revalidate = 3600

export async function generateStaticParams() {
  const blogs = await fetchPages()
  const pageBlogs = (blogs || []).filter((blog): blog is PageObjectResponse => blog && blog.object === 'page')
  
  return pageBlogs.map((blog) => {
    const slugProp = blog.properties?.slug
    let slug = blog.id
    
    if (slugProp && slugProp.type === 'rich_text' && slugProp.rich_text && Array.isArray(slugProp.rich_text) && slugProp.rich_text.length > 0) {
      slug = slugProp.rich_text[0].plain_text
    }
    
    return {
      slug,
    }
  })
}

function getBlogTitle(blog: PageObjectResponse): string {
  const titleProp = blog.properties?.Title
  if (titleProp && titleProp.type === 'title' && titleProp.title && Array.isArray(titleProp.title) && titleProp.title.length > 0) {
    return titleProp.title[0].plain_text
  }
  return 'Untitled'
}

function getBlogDescription(blog: PageObjectResponse): string {
  return `Read ${getBlogTitle(blog)} by Punyakrit Singh Makhni`
}

function getBlogImage(blog: PageObjectResponse): string | null {
  const mediaProp = blog.properties?.media
  if (mediaProp && mediaProp.type === 'files' && mediaProp.files && Array.isArray(mediaProp.files) && mediaProp.files.length > 0) {
    const file = mediaProp.files[0]
    if (file && file.type === 'file' && file.file) {
      return file.file.url
    }
  }
  return null
}

function getBlogDate(blog: PageObjectResponse): string {
  const dateProp = blog.properties?.Date
  if (dateProp && dateProp.type === 'created_time' && dateProp.created_time) {
    return new Date(dateProp.created_time).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  if (blog.created_time) {
    return new Date(blog.created_time).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return 'Date unavailable'
}

function getBlogTags(blog: PageObjectResponse): string[] {
  const tagsProp = blog.properties?.Tags
  if (tagsProp && tagsProp.type === 'multi_select' && tagsProp.multi_select && Array.isArray(tagsProp.multi_select)) {
    return tagsProp.multi_select.map(tag => tag?.name || '').filter(Boolean)
  }
  return []
}

function getReadCount(blog: PageObjectResponse): number | null {
  const readProp = blog.properties?.read
  if (readProp && readProp.type === 'number' && typeof readProp.number === 'number') {
    return readProp.number
  }
  return null
}

function calculateReadingTime(html: string): number {
  const textContent = html.replace(/<[^>]*>/g, ' ')
  const words = textContent.trim().split(/\s+/).filter(word => word.length > 0)
  const wordsPerMinute = 200
  const minutes = Math.ceil(words.length / wordsPerMinute)
  return Math.max(1, minutes)
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
  const imageUrl = getBlogImage(blog)
  const date = getBlogDate(blog)
  const tags = getBlogTags(blog)
  const readCount = getReadCount(blog)
  const readingTime = calculateReadingTime(html)

  return (
    <article className='px-4 sm:px-6 md:px-8 py-8 sm:py-12 mt-14 max-w-5xl mx-auto'>
      <div className='mb-8'>
        <Link href='/blogs'>
          <Button variant='ghost' className='mb-6 -ml-2' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Blogs
          </Button>
        </Link>
      </div>

      <header className='mb-8'>
        {imageUrl && (
          <div className='relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden bg-muted'>
            <img
              src={imageUrl}
              alt={title}
              className='w-full h-full object-cover'
              loading='eager'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
          </div>
        )}
        
        <div className='space-y-4'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>{title}</h1>
          
          <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>{date}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4' />
              <span>{readingTime} min read</span>
            </div>
            {readCount !== null && (
              <div className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                <span>{readCount} views</span>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className='flex flex-wrap gap-2 pt-2'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20'
                >
                  <Tag className='h-3 w-3' />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        className='prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded' 
      />
    </article>
  )
}

export default page