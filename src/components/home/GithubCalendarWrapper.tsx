"use client"

import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

interface GithubCalendarWrapperProps {
  username: string
}

const GithubCalendarWrapper = ({ username }: GithubCalendarWrapperProps) => {
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
      <div className="w-full max-w-full overflow-hidden">
        <div 
          className="w-full max-w-full overflow-x-auto overflow-y-hidden" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'auto'
          }}
        >
          <div className="inline-block min-w-full p-2 sm:p-3 md:p-4">
            <div className="min-w-max h-[170px] flex items-center justify-center">
              <p className='text-muted-foreground text-sm sm:text-base'>Loading contributions...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
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
              username={username}
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
  )
}

export default GithubCalendarWrapper

