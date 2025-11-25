
import React from 'react'
import { skills } from '@/lib/skills'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

function Stack() {
  return (
    <TooltipProvider>
      <div className='px-4 sm:px-6 md:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>Stack I Use</h2>
        <div className='flex flex-wrap gap-1.5 sm:gap-2'>
          {skills.map((skill) => {
            const IconComponent = skill.icon
            return (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <div className='flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-muted rounded-md text-xs sm:text-sm cursor-default hover:bg-muted/80 transition-colors'>
                    <IconComponent className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
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
    </TooltipProvider>
  )
}

export default Stack
