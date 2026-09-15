import React from 'react'
import { env } from '@/lib/env'
import EmailCopy from './EmailCopy'
import { socials } from '@/lib/socials'
import MultiSocials from './MultiSocials'

// Three systems, not three headcounts.
//
// This was a row of volume numbers - students insured, brands served, percent
// faster. They read like a freelancer counting customers, which is the wrong
// argument for a full-stack hire: nobody is buying reach, they are buying
// whether he can hold a whole system in his head. So each line now names a
// thing he built and the part of it that was actually hard, and between them
// they cover the three surfaces the role asks about - a server-heavy web app,
// an AI pipeline, and a shipped mobile app.
//
// Every claim here is verifiable: remjobs.works is live, Craft Trading is on
// the App Store, and the pipeline details are in src/lib/projectsData.ts.
const PROOF = [
  {
    name: "RemJobs",
    detail:
      "career-page scraper, Postgres full-text search, email alerts and billing - live at remjobs.works",
  },
  {
    name: "AI Demo Video Builder",
    detail:
      "four models across eight phases, 410 tests, and no model ever touching ffmpeg",
  },
  {
    name: "Craft Trading",
    detail: "React Native trading app, live on the App Store",
  },
] as const;

function About() {
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"

  return (
    <div className="-mt-20 z-10 relative px-4 sm:px-6 md:px-8">
      {/* Deliberately a raw <img>, not next/image: there is no Images binding on
          the Worker, so routing this through /_next/image would add a subrequest
          and still serve the original bytes. width/height are the intrinsic
          square ratio, to hold the box before CSS lands. */}
      <img
        src={image}
        alt="Punyakrit Singh Makhni"
        width={112}
        height={112}
        decoding="async"
        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-2xl object-cover ring-2 ring-background shadow-xl"
      />

      {/* The md:text-[3.5rem] step was sized for a 896px column. At 672px it
          broke the name across two lines ("Punyakrit Singh / Makhni"), which
          reads as a layout accident rather than a choice. 48px is the largest
          size that still sets it on one line inside this measure. */}
      <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03]">
        Punyakrit Singh Makhni
      </h1>

      <p className="mt-4 font-mono text-xs sm:text-sm text-muted-foreground">
        full&nbsp;stack&nbsp;engineer&nbsp;&nbsp;/&nbsp;&nbsp;remote&nbsp;&nbsp;/&nbsp;&nbsp;
        <EmailCopy email={socials.email} />
      </p>

      {/* The stack names that used to be listed here were removed: the Stack
          section below now renders them grouped by layer, and repeating them
          in the opening sentence cost the one paragraph a reader is
          guaranteed to read without telling them anything it does not. */}
      <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
        I build and ship products end to end - the interface, the API, the data
        layer, and the infrastructure underneath - including the AI features
        inside them.
      </p>

      {/* Evidence, immediately under the claim.
          Everything above this point is assertion: a reader had to reach the
          Experience section and expand a row before the page offered a single
          verifiable fact. These three are each from a different employer, which
          is the actual point - the range is the argument, not any one number.
          All three are already in src/lib/experience.ts; nothing new is claimed
          here, and the rows below attribute each of them in context. */}
      <dl className="mt-7 space-y-2.5">
        {PROOF.map((item) => (
          <div key={item.name} className="sm:flex sm:gap-4">
            <dt className="shrink-0 text-sm font-semibold text-foreground sm:w-52">
              {item.name}
            </dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        open to full stack engineer roles
      </div>

      <div className="mt-6">
        <MultiSocials showAll={false} />
      </div>
    </div>
  )
}

export default About
