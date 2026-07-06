import React from 'react'
import { socials } from '@/lib/socials'
import { Github as GithubIcon } from 'lucide-react'
import Link from 'next/link'
import type { Activity } from 'react-activity-calendar'
import GithubCalendarWrapper from './GithubCalendarWrapper'

// Fetch a year of contributions on the server so the graph is present in the
// initial HTML. Revalidated every 6 hours (ISR) so it stays reasonably fresh
// without hitting the third-party API on every request.
async function getContributions(username: string): Promise<Activity[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } }
    )
    if (!res.ok) return null
    const data = (await res.json()) as { contributions?: Activity[] }
    return Array.isArray(data.contributions) ? data.contributions : null
  } catch {
    return null
  }
}

async function Github() {
  const githubUsername = socials.github.split('/').pop() || 'punyakrit'
  const contributions = await getContributions(githubUsername)

  return (
    <div className='hidden md:block w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 min-w-0'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold truncate'>GitHub Contributions</h2>
        <Link
          href={socials.github}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted hover:bg-muted/80 rounded-md text-xs sm:text-sm font-medium transition-colors flex-shrink-0'
        >
          <GithubIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          <span>View Profile</span>
        </Link>
      </div>
      <div className='w-full  rounded-lg border border-border bg-card overflow-hidden'>
        {contributions ? (
          <GithubCalendarWrapper data={contributions} />
        ) : (
          <div className='w-full max-w-full overflow-hidden'>
            <div className='inline-block min-w-full p-2 sm:p-3 md:p-4'>
              <div className='min-w-max h-[170px] flex items-center justify-center'>
                <p className='text-muted-foreground text-sm sm:text-base'>
                  Couldn&apos;t load contributions right now.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Github
