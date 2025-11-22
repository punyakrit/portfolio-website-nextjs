import React from 'react'
import type { Metadata } from 'next'

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

function page() {
  return (
    <div>page</div>
  )
}

export default page