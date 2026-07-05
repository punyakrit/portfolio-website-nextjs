"use client"
import { socials } from '@/lib/socials'
import React from 'react'
import Link from 'next/link'
import { X, Github, Linkedin, Mail, FileText, Calendar } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

function MultiSocials({ showAll }: { showAll: boolean }) {
  const socialLinks = [
    {
      name: 'X',
      url: socials.x,
      icon: X,
    },
    {
      name: 'GitHub',
      url: socials.github,
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: socials.linkedin,
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: `mailto:${socials.email}`,
      icon: Mail,
    },
    {
      name: 'Resume',
      url: socials.resume,
      icon: FileText,
      show: !showAll,
    },
    {
      name: 'Cal',
      url: socials.cal,
      icon: Calendar,
      show: !showAll,
    },
  ]
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-wrap items-center gap-1">
        {socialLinks.map((social) => {
          const Icon = social.icon
          if (social.show && !showAll) return null
          return (
            <Tooltip key={social.name}>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  target={social.name === 'Email' ? undefined : '_blank'}
                  rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-black/50 dark:text-white/50 transition-colors duration-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

export default MultiSocials
