"use client"

import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { socials } from '@/lib/socials'
import { Github as GithubIcon } from 'lucide-react'
import Link from 'next/link'

function Github() {
  const githubUsername = socials.github.split('/').pop() || 'punyakrit'
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }

  if (!mounted) {
    return (
      <div className='w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
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
        <div className='w-full max-w-full rounded-lg border border-border bg-card p-6 sm:p-8 flex items-center justify-center'>
          <p className='text-muted-foreground text-sm sm:text-base'>Loading contributions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
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
      <div className='w-full max-w-full rounded-lg border border-border bg-card overflow-hidden'>
        <motion.div
          className="w-full max-w-full overflow-hidden bg-transparent backdrop-blur-none border-0 transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="w-full max-w-full overflow-x-auto overflow-y-hidden scrollbar-thin" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              msOverflowStyle: 'auto'
            }}
          >
            <div className="inline-block min-w-full p-2 sm:p-3 md:p-4">
              <div className="min-w-max">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme={resolvedTheme as "light" | "dark"}
                  fontSize={12}
                  blockSize={10}
                  blockMargin={2}
                  showWeekdayLabels={true}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Github
