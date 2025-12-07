'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, PenTool, Calendar, Eye, Tag, Image as ImageIcon } from 'lucide-react'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'

function BlogImage({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className='relative w-full h-48 overflow-hidden bg-muted'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-muted animate-pulse'>
          <ImageIcon className='h-8 w-8 text-muted-foreground' />
        </div>
      )}
      {error ? (
        <div className='w-full h-full flex items-center justify-center bg-muted'>
          <ImageIcon className='h-8 w-8 text-muted-foreground' />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading='lazy'
          decoding='async'
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />
      )}
    </div>
  )
}

function getBlogTitle(blog: PageObjectResponse): string {
  const titleProp = blog.properties.Title
  if (titleProp && titleProp.type === 'title' && titleProp.title.length > 0) {
    return titleProp.title[0].plain_text
  }
  return 'Untitled'
}

function getBlogSlug(blog: PageObjectResponse): string {
  const slugProp = blog.properties.slug
  if (slugProp && slugProp.type === 'rich_text' && slugProp.rich_text.length > 0) {
    return slugProp.rich_text[0].plain_text
  }
  return blog.id
}

function getBlogImage(blog: PageObjectResponse): string | null {
  const mediaProp = blog.properties.media
  if (mediaProp && mediaProp.type === 'files' && mediaProp.files.length > 0) {
    const file = mediaProp.files[0]
    if (file.type === 'file' && file.file) {
      return file.file.url
    }
  }
  return null
}

function getBlogDate(blog: PageObjectResponse): string {
  const dateProp = blog.properties.Date
  if (dateProp && dateProp.type === 'created_time') {
    return new Date(dateProp.created_time).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return new Date(blog.created_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getBlogTags(blog: PageObjectResponse): string[] {
  const tagsProp = blog.properties.Tags
  if (tagsProp && tagsProp.type === 'multi_select') {
    return tagsProp.multi_select.map(tag => tag.name)
  }
  return []
}

function getReadCount(blog: PageObjectResponse): number | null {
  const readProp = blog.properties.read
  if (readProp && readProp.type === 'number') {
    return readProp.number
  }
  return null
}

function MainBlogs({ blogs }: { blogs: PageObjectResponse[] }) {

  if (blogs.length === 0) {
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

  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Blogs</h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
        {blogs.map((blog) => {
          if (blog.object !== 'page') return null
          
          const title = getBlogTitle(blog as PageObjectResponse)
          const slug = getBlogSlug(blog as PageObjectResponse)
          const imageUrl = getBlogImage(blog as PageObjectResponse)
          const date = getBlogDate(blog as PageObjectResponse)
          const tags = getBlogTags(blog as PageObjectResponse)
          const readCount = getReadCount(blog as PageObjectResponse)

          return (
            <Link key={(blog as PageObjectResponse).id} href={`/blogs/${slug}`}>
              <Card className='h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group'>
                {imageUrl && <BlogImage src={imageUrl} alt={title} />}
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between gap-2 mb-2'>
                    <CardTitle className='text-lg sm:text-xl line-clamp-2 group-hover:text-primary transition-colors'>
                      {title}
                    </CardTitle>
                  </div>
                  <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3' />
                      <span>{date}</span>
                    </div>
                    {readCount !== null && (
                      <div className='flex items-center gap-1'>
                        <Eye className='h-3 w-3' />
                        <span>{readCount}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                {tags.length > 0 && (
                  <CardContent className='pt-0'>
                    <div className='flex flex-wrap gap-2'>
                      {tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground'
                        >
                          <Tag className='h-3 w-3' />
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className='inline-flex items-center px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground'>
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MainBlogs