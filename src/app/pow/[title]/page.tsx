import React from 'react'
import { projects } from '@/lib/projectsData'
import { skills } from '@/lib/skills'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Globe, Github, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeSlug(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getProjectBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug)
  
  const exactMatch = projects.find(project => getSlug(project.title) === normalizedSlug)
  if (exactMatch) return exactMatch
  
  const startsWithMatch = projects.find(project => {
    const projectSlug = getSlug(project.title)
    return normalizedSlug.startsWith(projectSlug) || projectSlug.startsWith(normalizedSlug)
  })
  if (startsWithMatch) return startsWithMatch
  
  return null
}

function getTechIcon(techName: string) {
  const normalizedName = techName.toLowerCase().trim()
  const skill = skills.find(s => {
    const skillName = s.name.toLowerCase().trim()
    return (
      skillName === normalizedName ||
      skillName.replace(/[.\s-]/g, '') === normalizedName.replace(/[.\s-]/g, '') ||
      (normalizedName.includes('next') && skillName.includes('next')) ||
      (normalizedName.includes('typescript') && skillName.includes('typescript')) ||
      (normalizedName.includes('react') && skillName.includes('react')) ||
      (normalizedName.includes('postgresql') && skillName.includes('postgresql')) ||
      (normalizedName.includes('mongodb') && skillName.includes('mongodb')) ||
      (normalizedName.includes('redis') && skillName.includes('redis')) ||
      (normalizedName.includes('node') && skillName.includes('node')) ||
      (normalizedName.includes('tailwind') && skillName.includes('tailwind')) ||
      (normalizedName.includes('vercel') && skillName.includes('vercel'))
    )
  })
  return skill?.icon
}

export default async function ProjectPage({ params }: { params: Promise<{ title: string }> }) {
  const { title } = await params
  const project = getProjectBySlug(title)

  if (!project) {
    notFound()
  }

  return (
    <TooltipProvider>
      <div className='px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-5xl mx-auto'>
        <Button
          variant='ghost'
          className='mb-6 -ml-2'
          asChild
        >
          <Link href='/pow'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Projects
          </Link>
        </Button>

        <div className='space-y-8'>
          <div className='space-y-4'>
            <div className='flex items-start justify-between gap-4'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>{project.title}</h1>
              <div className='flex items-center gap-3 flex-shrink-0'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:opacity-70 transition-opacity'
                    >
                      <Globe className='w-5 h-5 sm:w-6 sm:h-6' />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit website</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:opacity-70 transition-opacity'
                    >
                      <Github className='w-5 h-5 sm:w-6 sm:h-6' />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <p className='text-lg sm:text-xl text-muted-foreground'>{project.description}</p>
          </div>

          <div className='relative w-full rounded-lg overflow-hidden bg-muted border border-border'>
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-auto'
            />
          </div>

          <div className='space-y-6'>
            <div>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Summary</h2>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>{project.summary}</p>
            </div>

            <div>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Technologies</h2>
              <div className='flex flex-wrap items-center gap-3'>
                {project.tech.map((tech, index) => {
                  const TechIcon = getTechIcon(tech)
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className='flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm cursor-default hover:bg-muted/80 transition-colors'>
                          {TechIcon ? (
                            <TechIcon className='w-4 h-4 flex-shrink-0' />
                          ) : (
                            <span className='w-4 h-4 flex items-center justify-center text-[10px] font-semibold bg-foreground/10 rounded'>
                              {tech.charAt(0).toUpperCase()}
                            </span>
                          )}
                          <span>{tech}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tech}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>

            <div>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Problem</h2>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>{project.problem}</p>
            </div>

            <div>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Solution</h2>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>{project.solution}</p>
            </div>

            <div>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Why This Project</h2>
              <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>{project.whyThis}</p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

