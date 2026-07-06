
import React from 'react'
import { skills } from '@/lib/skills'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

// Core technologies shown prominently. Everything else in skills.ts falls into
// the smaller "also work with" line below so the signal isn't diluted.
const CORE_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'AWS',
  'Docker',
]

function Stack() {
  const core = CORE_STACK
    .map((name) => skills.find((s) => s.name === name))
    .filter((s): s is (typeof skills)[number] => Boolean(s))
  const secondary = skills.filter((s) => !CORE_STACK.includes(s.name))

  return (
    <TooltipProvider>
      <div className='px-4 sm:px-6 md:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Stack I Use</h2>

        {/* Core - prominent */}
        <div className='flex flex-wrap gap-2 sm:gap-2.5'>
          {core.map((skill) => {
            const IconComponent = skill.icon
            return (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <div className='flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-muted rounded-lg text-sm font-medium cursor-default hover:bg-muted/80 transition-colors'>
                    <IconComponent className='w-4 h-4 sm:w-[1.1rem] sm:h-[1.1rem]' />
                    <span>{skill.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{skill.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Long tail - smaller, muted */}
        {secondary.length > 0 && (
          <div className='mt-5 sm:mt-6'>
            <p className='mb-2.5 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-wide text-muted-foreground/70'>
              Also work with
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {secondary.map((skill) => {
                const IconComponent = skill.icon
                return (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-1 px-2 py-1 rounded-md border border-border/50 text-xs text-muted-foreground cursor-default hover:text-foreground hover:border-border transition-colors'>
                        <IconComponent className='w-3 h-3 opacity-70' />
                        <span>{skill.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default Stack
