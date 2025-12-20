'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, PenTool, Calendar, Eye, Tag, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'
import { getBlogReadCount } from '@/lib/query/query'

const imageCache = new Set<string>()

function preloadImage(src: string) {
  if (imageCache.has(src)) return
  imageCache.add(src)
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

function BlogImage({ src, alt, onHover }: { src: string; alt: string; onHover?: () => void }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (src && !imageCache.has(src)) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        imageCache.add(src)
        setLoading(false)
      }
      img.onerror = () => {
        setLoading(false)
        setError(true)
      }
    } else if (imageCache.has(src)) {
      setLoading(false)
    }
  }, [src])

  const handleMouseEnter = () => {
    if (src && !imageCache.has(src)) {
      preloadImage(src)
    }
    onHover?.()
  }

  return (
    <div 
      className='relative w-full h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/60'
      onMouseEnter={handleMouseEnter}
    >
      {loading && (
        <div className='absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted/30 animate-pulse'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer bg-[length:200%_100%]' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <ImageIcon className='h-10 w-10 text-muted-foreground/50' />
          </div>
        </div>
      )}
      {error ? (
        <div className='w-full h-full flex items-center justify-center bg-muted/50'>
          <div className='text-center'>
            <ImageIcon className='h-10 w-10 text-muted-foreground/50 mx-auto mb-2' />
            <p className='text-xs text-muted-foreground'>Image unavailable</p>
          </div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading='lazy'
          decoding='async'
          fetchPriority='high'
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => {
            setLoading(false)
            imageCache.add(src)
          }}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
    </div>
  )
}

function getBlogTitle(blog: PageObjectResponse): string {
  const titleProp = blog.properties?.Title
  if (titleProp && titleProp.type === 'title' && titleProp.title && Array.isArray(titleProp.title) && titleProp.title.length > 0) {
    return titleProp.title[0].plain_text
  }
  return 'Untitled'
}

function getBlogSlug(blog: PageObjectResponse): string {
  const slugProp = blog.properties?.slug
  if (slugProp && slugProp.type === 'rich_text' && slugProp.rich_text && Array.isArray(slugProp.rich_text) && slugProp.rich_text.length > 0) {
    return slugProp.rich_text[0].plain_text
  }
  return blog.id
}

function getBlogImage(blog: PageObjectResponse): string | null {
  const mediaProp = blog.properties?.media
  if (mediaProp && mediaProp.type === 'files' && mediaProp.files && Array.isArray(mediaProp.files) && mediaProp.files.length > 0) {
    const file = mediaProp.files[0]
    if (file && file.type === 'file' && file.file) {
      const originalUrl = file.file.url
      return `/api/blog-image?blogId=${blog.id}`
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

function BlogViews({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const count = await getBlogReadCount(slug)
        setViews(count)
      } catch (error) {
        console.error('Error fetching blog views:', error)
      }
    }
    fetchViews()
  }, [slug])

  if (views === null) return null

  return (
    <div className='flex items-center gap-1.5'>
      <Eye className='h-4 w-4' />
      <span className='text-xs'>{views} {views === 1 ? 'view' : 'views'}</span>
    </div>
  )
}

function MainBlogs({ blogs, isHome }: { blogs: PageObjectResponse[]; isHome: boolean }) {
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className='px-4 sm:px-6 md:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Blogs</h2>
        <div className='flex justify-center'>
          <Card className='max-w-md w-full'>
            <CardHeader className='text-center pb-4'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted'>
                <PenTool className='h-8 w-8 text-muted-foreground' />
              </div>
              <CardTitle className='text-xl'>No Blogs Yet</CardTitle>
              <CardDescription className='text-base'>
                I&apos;m currently working on some exciting blog posts. Check back soon for insights on web development, tech tutorials, and my coding journey!
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
                <FileText className='h-4 w-4' />
                <span>New content coming soon...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const displayedBlogs = isHome ? blogs.slice(0, 2) : blogs

  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Blogs</h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
        {displayedBlogs.map((blog) => {
          if (!blog || blog.object !== 'page') return null
          
          const title = getBlogTitle(blog as PageObjectResponse)
          const slug = getBlogSlug(blog as PageObjectResponse)
          const imageUrl = getBlogImage(blog as PageObjectResponse)
          const date = getBlogDate(blog as PageObjectResponse)
          const tags = getBlogTags(blog as PageObjectResponse)
          const readCount = getReadCount(blog as PageObjectResponse)
          
          if (!title || !slug) return null

          return (
            <Link 
              key={(blog as PageObjectResponse).id} 
              href={`/blogs/${slug}`}
              className='block h-full'
              onMouseEnter={() => imageUrl && preloadImage(imageUrl)}
            >
              <Card className='h-full overflow-hidden border-border/50 hover:border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-card/50 backdrop-blur-sm'>
                {imageUrl && <BlogImage src={imageUrl} alt={title} />}
                <CardHeader className='pb-4 pt-6'>
                  <CardTitle className='text-xl sm:text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-3'>
                    {title}
                  </CardTitle>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1.5'>
                      <Calendar className='h-4 w-4' />
                      <span className='text-xs'>{date}</span>
                    </div>
                    {readCount !== null && (
                      <div className='flex items-center gap-1.5'>
                        <Eye className='h-4 w-4' />
                        <span className='text-xs'>{readCount} views</span>
                      </div>
                    )}
                    <BlogViews slug={slug} />
                  </div>
                </CardHeader>
                {tags.length > 0 && (
                  <CardContent className='pt-0 pb-6'>
                    <div className='flex flex-wrap gap-2'>
                      {tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors'
                        >
                          <Tag className='h-3 w-3' />
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border'>
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                )}
                <div className='px-6 pb-6 pt-0'>
                  <div className='flex items-center gap-2 text-sm text-primary  transition-opacity duration-300 font-medium'>
                    <span>Read more</span>
                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                  </div>
              </div>
          </Card>
            </Link>
          )
        })}
      </div>
      {isHome && (
        <div className='flex justify-center mt-8'>
          <Link href='/blogs'>
            <Button variant='outline' size='lg' className='group'>
              <span>Show more blogs</span>
              <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MainBlogs