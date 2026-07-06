"use client";

import React from 'react'
import { ActivityCalendar, type Activity } from 'react-activity-calendar'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

interface GithubCalendarWrapperProps {
  data: Activity[]
}

// Isolates the third-party contribution calendar so an intermittent render
// error degrades gracefully instead of crashing the whole page.
class CalendarErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

// Client hydration layer only. The contribution data is fetched on the server
// and passed in as `data`, so the grid is present in the initial HTML; this
// component just adds theming and the entrance animation on hydration.
const GithubCalendarWrapper = ({ data }: GithubCalendarWrapperProps) => {
  const { resolvedTheme } = useTheme()

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }

  return (
    <motion.div
      className="w-full max-w-full overflow-hidden bg-transparent backdrop-blur-none border-0 transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-full max-w-full overflow-x-hidden overflow-y-hidden scrollbar-thin"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          msOverflowStyle: 'auto'
        }}
      >
        <div className="inline-flex items-center justify-center min-w-full p-2 sm:p-3 md:p-4">
          <div className="max-w-2xl ">
            <CalendarErrorBoundary
              fallback={
                <div className="min-w-max h-[170px] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Couldn&apos;t load contributions right now.
                  </p>
                </div>
              }
            >
              <ActivityCalendar
                data={data}
                colorScheme={resolvedTheme === "light" ? "light" : "dark"}
                fontSize={12}
                blockSize={10}
                blockMargin={2}
                maxLevel={4}
                showWeekdayLabels={true}
                theme={theme}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
              />
            </CalendarErrorBoundary>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GithubCalendarWrapper
