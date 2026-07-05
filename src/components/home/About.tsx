import React from 'react'
import { env } from '@/lib/env'
import EmailCopy from './EmailCopy'
import { socials } from '@/lib/socials'
import MultiSocials from './MultiSocials'

function About() {
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"

  return (
    <div className="-mt-20 z-10 relative px-4 sm:px-6 md:px-8">
      <img
        src={image}
        alt="Punyakrit Singh Makhni - Full-Stack & React Native Engineer"
        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-2xl object-cover ring-2 ring-background shadow-xl"
      />

      <h1 className="mt-5 text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.03]">
        Punyakrit Singh Makhni
      </h1>

      <p className="mt-4 font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-muted-foreground">
        full-stack&nbsp;engineer&nbsp;&nbsp;/&nbsp;&nbsp;remote&nbsp;&nbsp;/&nbsp;&nbsp;
        <EmailCopy email={socials.email} />
      </p>

      <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
        I build production-grade web &amp; mobile apps for startups worldwide -
        from first idea to launch. Working across Next.js, React, React Native,
        TypeScript, Node.js, and AI / RAG.
      </p>

      <div className="mt-6 flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        available for work
      </div>

      <div className="mt-6">
        <MultiSocials showAll={false} />
      </div>
    </div>
  )
}

export default About
