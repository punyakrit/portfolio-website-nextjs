"use client"
import React, { useEffect, useState } from 'react'
import { socials } from '@/lib/socials'
import { Github as GithubIcon } from 'lucide-react'
import Link from 'next/link'

interface Contribution {
  date: string
  count: number
  level: number
}

interface ContributionsData {
  total: {
    lastYear: number
  }
  contributions: Contribution[]
}

function Github() {
  const githubUsername = socials.github.split('/').pop() || 'punyakrit'
  const [data, setData] = useState<ContributionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch contributions')
        }
        const json: ContributionsData = await response.json()
        setData(json)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contributions')
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [githubUsername])

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-[#ebedf0] dark:bg-[#161b22]',
      'bg-[#9be9a8] dark:bg-[#0e4429]',
      'bg-[#40c463] dark:bg-[#006d32]',
      'bg-[#30a14e] dark:bg-[#26a641]',
      'bg-[#216e39] dark:bg-[#39d353]',
    ]
    return colors[level] || colors[0]
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const organizeContributions = (contributions: Contribution[]) => {
    const firstDate = new Date(contributions[0]?.date || '')
    const firstDayOfWeek = firstDate.getDay()
    
    const weeks: Contribution[][] = []
    let currentWeek: Contribution[] = []
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, level: 0 })
    }
    
    contributions.forEach((contribution) => {
      currentWeek.push(contribution)
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 })
      }
      weeks.push(currentWeek)
    }
    
    const transposed: Contribution[][] = []
    for (let day = 0; day < 7; day++) {
      transposed[day] = []
      for (let week = 0; week < weeks.length; week++) {
        transposed[day].push(weeks[week][day])
      }
    }
    
    return { weeks, transposed }
  }

  if (loading) {
    return (
      <div className='w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>GitHub Activity</h2>
          <Link
            href={socials.github}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted hover:bg-muted/80 rounded-md text-xs sm:text-sm font-medium transition-colors w-fit'
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

  if (error || !data) {
    return (
      <div className='w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>GitHub Contributions</h2>
          <Link
            href={socials.github}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted hover:bg-muted/80 rounded-md text-xs sm:text-sm font-medium transition-colors w-fit'
          >
            <GithubIcon className='w-4 h-4 sm:w-5 sm:h-5' />
            <span>View Profile</span>
          </Link>
        </div>
        <div className='w-full max-w-full rounded-lg border border-border bg-card p-6 sm:p-8 flex items-center justify-center'>
          <p className='text-muted-foreground text-sm sm:text-base text-center'>{error || 'Failed to load contributions'}</p>
        </div>
      </div>
    )
  }

  const { weeks, transposed } = organizeContributions(data.contributions)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthLabels: { [key: number]: string } = {}
  
  weeks.forEach((week, weekIndex) => {
    const firstContribution = week.find(c => c.date)
    if (firstContribution) {
      const date = new Date(firstContribution.date)
      const month = date.getMonth()
      if (!monthLabels[weekIndex]) {
        monthLabels[weekIndex] = months[month]
      }
    }
  })

  const getMonthLabel = (weekIndex: number) => {
    if (weekIndex === 0) return monthLabels[0] || ''
    const prevMonth = monthLabels[weekIndex - 1]
    const currentMonth = monthLabels[weekIndex]
    return prevMonth !== currentMonth ? currentMonth : ''
  }

  return (
    <div className='w-full max-w-full overflow-hidden px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>GitHub Contributions</h2>
        <Link
          href={socials.github}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted hover:bg-muted/80 rounded-md text-xs sm:text-sm font-medium transition-colors w-fit'
        >
          <GithubIcon className='w-4 h-4 sm:w-5 sm:h-5' />
          <span>View Profile</span>
        </Link>
      </div>
      <div className='w-full max-w-full rounded-lg border border-border bg-card overflow-hidden'>
        <div className='w-full overflow-x-auto overflow-y-hidden p-2 sm:p-3 md:p-4'>
          <div className='inline-flex flex-col min-w-max'>
            <div className='flex gap-0.5 mb-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground h-3 sm:h-4 items-end'>
              {weeks.map((_, weekIndex) => {
                const monthLabel = getMonthLabel(weekIndex)
                return (
                  <div 
                    key={weekIndex} 
                    className='w-2 sm:w-2.5 text-left leading-none flex-shrink-0'
                  >
                    {monthLabel}
                  </div>
                )
              })}
            </div>
            <div className='flex gap-0.5'>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className='flex flex-col gap-0.5 flex-shrink-0'>
                  {week.map((contribution, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm flex-shrink-0 ${getLevelColor(contribution.level)} transition-colors ${contribution.date ? 'hover:ring-1 hover:ring-border cursor-pointer' : ''}`}
                      title={contribution.date ? `${contribution.count} contributions on ${formatDate(contribution.date)}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4 text-[10px] sm:text-xs md:text-sm text-muted-foreground border-t border-border'>
          <span className='text-center sm:text-left whitespace-nowrap'>{data.total.lastYear} contributions in the last year</span>
          <div className='flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 flex-shrink-0'>
            <span className='text-[9px] sm:text-[10px] md:text-xs'>Less</span>
            <div className='flex gap-0.5'>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span className='text-[9px] sm:text-[10px] md:text-xs'>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Github