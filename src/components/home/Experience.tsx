"use client"
import { experience } from '@/lib/experience'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

const formatDate = (dateString: string) => {
  if (dateString === "Present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

function Experience({completeView}: {completeView: boolean}) {
  const router = useRouter();
  const displayedExperiences = completeView ? experience : experience.slice(0, 1);
  const remainingExperiences = completeView ? [] : experience.slice(1);

  const renderExperienceHeader = (exp: typeof experience[0], isClickable: boolean = false) => (
    <div 
      className={`flex items-start justify-between gap-4 ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={isClickable ? () => router.push('/work') : undefined}
    >
      <div className='flex items-start gap-3 flex-1'>
        <Image 
          src={exp.links.image} 
          alt={exp.company} 
          width={40} 
          height={40} 
          className='rounded-full object-cover w-10 h-10 flex-shrink-0'
        />    
        <div className='flex-1'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='font-semibold text-lg'>{exp.company}</span>
            {exp.links.companyUrl.icon && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={exp.links.companyUrl.url} 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    className='hover:opacity-70 transition-opacity inline-flex'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <exp.links.companyUrl.icon className='w-4 h-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit company website</p>
                </TooltipContent>
              </Tooltip>
            )}
            {exp.links.githubUrl.icon && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={exp.links.githubUrl.url} 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    className='hover:opacity-70 transition-opacity inline-flex'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <exp.links.githubUrl.icon className='w-4 h-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View GitHub</p>
                </TooltipContent>
              </Tooltip>
            )}
            {exp.links.linkedinUrl.icon && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={exp.links.linkedinUrl.url} 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    className='hover:opacity-70 transition-opacity inline-flex'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <exp.links.linkedinUrl.icon className='w-4 h-4' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            )}
            {exp.endDate === "Present" && (
              <span className='px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-500 rounded-md'>
                Working
              </span>
            )}
          </div>
          <div className='text-sm text-muted-foreground mt-1'>
            {exp.position}
          </div>
        </div>
      </div>
      <div className='text-right text-sm text-muted-foreground flex-shrink-0'>
        <div>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
        <div className='mt-1'>{exp.location}</div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className='px-6'>
        <h2 className='text-3xl font-bold mb-6'>Experience</h2>
        <div className='space-y-8'>
          {displayedExperiences.map((exp) => (
            <div key={exp.company} className='space-y-4'>
              {renderExperienceHeader(exp)}
              
              {exp.tech && exp.tech.length > 0 && (
                <div className='space-y-2'>
                  <h3 className='text-sm font-semibold'>Technologies & Tools</h3>
                  <div className='flex flex-wrap gap-2'>
                    {exp.tech.map((skill, index) => {
                      if (!skill) return null;
                      const Icon = skill.icon;
                      return (
                        <div key={index}>
                          <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-md text-sm cursor-default'>
                            {Icon && <Icon className='w-4 h-4' />}
                            <span>{skill.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {exp.bullets && exp.bullets.length > 0 && (
                <ul className='space-y-2 list-disc list-inside text-sm text-muted-foreground'>
                  {exp.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {remainingExperiences.length > 0 && (
            <>
              {remainingExperiences.map((exp) => (
                <div key={exp.company}>
                  {renderExperienceHeader(exp, true)}
                </div>
              ))}
              <div className='flex justify-center pt-4'>
                <button
                  onClick={() => router.push('/work')}
                  className='px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors'
                >
                  Show all work experiences
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default Experience