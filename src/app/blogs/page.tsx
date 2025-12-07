import React from 'react'
import type { Metadata } from 'next'
import MainBlogs from '@/components/blogs/MainBlogs'
import { fetchPages } from '@/lib/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const metadata: Metadata = {
  title: "Blogs | Punyakrit Singh Makhni",
  description:
    "Read articles and blog posts by Punyakrit Singh Makhni about web development, programming, technology, and software engineering insights.",
  keywords: [
    "web development blog",
    "programming articles",
    "tech blog",
    "software engineering",
    "React tutorials",
    "Next.js guides",
    "TypeScript articles",
    "developer blog",
  ],
  alternates: {
    canonical: "/blogs",
  },
  
}

async function page() {
  const blogs = await fetchPages()
  const pageBlogs = blogs.filter((blog): blog is PageObjectResponse => blog.object === 'page')
  
  return (
    <div className='px-2 md:px-8 md:my-32 my-24'>
      <MainBlogs blogs={pageBlogs} />
    </div>
  )
}

export default page;  