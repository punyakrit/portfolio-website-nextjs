"use client";

import React from 'react'
import { ActivityCalendar, type Activity } from 'react-activity-calendar'
import { useTheme } from 'next-themes'

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
// component only re-themes it once the resolved theme is known.
const GithubCalendarWrapper = ({ data }: GithubCalendarWrapperProps) => {
  const { resolvedTheme } = useTheme()

  // `resolvedTheme` is undefined on the server and on the first client render,
  // so reading it during that pass would SSR one palette and swap to the other
  // after hydration - a mismatch on the `fill` of all ~365 rects. Render the
  // light palette (which is what :root paints before next-themes adds .dark)
  // until mount, then let the real theme take over.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }

  return (
    <div className="w-full max-w-full overflow-hidden bg-transparent backdrop-blur-none border-0">
      {/* The grid is ~670px wide at blockSize 10 / blockMargin 2, which is wider
          than the page column on most viewports. It scrolls rather than being
          clipped - `overflow-x-hidden` would silently cut months off the end. */}
      <div
        className="w-full max-w-full overflow-x-auto overflow-y-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          msOverflowStyle: 'auto'
        }}
      >
        {/* `justify-center-safe`, not `justify-center`: once the grid is wider
            than the viewport, plain centring overflows both edges and the left
            months become unreachable by scrolling. Safe alignment falls back to
            flex-start in exactly that case. */}
        <div className="inline-flex items-center justify-center-safe min-w-full p-2 sm:p-3 md:p-4">
          <div className="max-w-2xl">
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
                colorScheme={dark ? "dark" : "light"}
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
    </div>
  )
}

export default GithubCalendarWrapper
