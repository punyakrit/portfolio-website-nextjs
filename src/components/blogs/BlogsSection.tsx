import React from 'react'
import MainBlogs from './MainBlogs'
import { fetchPages } from '@/lib/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

async function BlogsSection({ isHome = false }: { isHome?: boolean }) {
  const blogs = await fetchPages()
  const pageBlogs = (blogs || [])
    .filter((blog): blog is PageObjectResponse => blog && blog.object === 'page')
    .sort((a, b) => {
      const dateA = new Date(a.last_edited_time || a.created_time).getTime()
      const dateB = new Date(b.last_edited_time || b.created_time).getTime()
      return dateB - dateA
    })
  
  return (
    <div className='px-2 md:px-8 md:my-32 my-24'>
      <MainBlogs blogs={pageBlogs} isHome={isHome} />
    </div>
  )
}

export default BlogsSection

