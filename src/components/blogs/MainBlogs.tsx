import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, PenTool } from 'lucide-react'

interface Blog {
  title: string
  description: string
  date: string
  slug: string
}

function MainBlogs() {
  const blogs: Blog[] = []

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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {blogs.map((blog, index) => (
          <Card key={index}>
            {/* Blog content will go here */}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MainBlogs