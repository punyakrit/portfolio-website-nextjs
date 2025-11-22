import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-5xl mx-auto'>
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-6xl sm:text-7xl font-bold'>404</h1>
          <h2 className='text-2xl sm:text-3xl font-semibold'>Project Not Found</h2>
          <p className='text-base sm:text-lg text-muted-foreground max-w-md'>
            The project you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Button
          variant='outline'
          className='mt-4'
          asChild
        >
          <Link href='/pow'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  )
}

