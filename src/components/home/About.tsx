import React from 'react'
import { env } from '@/lib/env'
import RedirectButtons from './RedirectButtons'
import MultiSocials from './MultiSocials'
function About() {
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"
  return (
    <div className="-mt-20 z-10 relative px-4 sm:px-6 md:px-8">
        <img 
          src={image} 
          alt="About" 
          className='h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full object-cover border shadow-lg border-white/20 dark:shadow-white/20'
        />
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-4 mt-6 sm:mt-8 font-[family-name:var(--font-inter)] leading-tight'>
          Hi, I&apos;m Punyakrit — <span className='font-bold bg-gradient-to-r from-black/80 to-black/50 dark:from-white/80 dark:to-white/50 bg-clip-text text-transparent'>A Full Stack web developer.</span>
        </h1>
        
        <p className='text-base sm:text-lg md:text-xl leading-relaxed dark:text-white/80 text-black/80 max-w-3xl mt-4 sm:mt-6'>
        I work across the stack with <span className='font-semibold dark:text-white text-black dark:bg-white/10 bg-black/5 px-2 py-0.5 rounded'>Next.js, FastAPI, and Postgres</span>, turning ideas into real products without overthinking the process. I care about clear UX, clean code, and shipping fast. From small tools to full production apps, I try to build things that feel good to use and easy to grow.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-4 my-6 justify-between items-start sm:items-center'>


        <RedirectButtons />
        <MultiSocials showAll={false} />
        </div>
    </div>
  )
}

export default About
