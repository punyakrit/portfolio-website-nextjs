import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='px-4 sm:px-6 md:px-8 py-8 sm:py-12'>
      <div className='flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-2xl mx-auto'>
        <div className='space-y-4'>
          <h1 className='text-7xl sm:text-8xl md:text-9xl font-bold'>404</h1>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Page Not Found</h2>
          <p className='text-base sm:text-lg text-muted-foreground max-w-md mx-auto'>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
          <Button
            variant='default'
            size='lg'
            asChild
          >
            <Link href='/'>
              <Home className='w-4 h-4 mr-2' />
              Go Home
            </Link>
          </Button>
          <Button
            variant='outline'
            size='lg'
            asChild
          >
            <Link href='/pow'>
              View Projects
            </Link>
          </Button>
          <Button
            variant='outline'
            size='lg'
            asChild
          >
            <Link href='/work'>
              View Work
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

