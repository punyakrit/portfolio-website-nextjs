"use client"
import { socials } from '@/lib/socials'
import React from 'react'
import Link from 'next/link'
import { X, Github, Linkedin, Mail, FileText, Calendar } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

function MultiSocials({showAll}:{showAll: boolean}) {
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
        }
    ]
  return (
    <TooltipProvider>
        <div className="flex flex-wrap gap-3 my-6">
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
                                className="flex items-center gap-2 px-1 py-2 rounded-lg hover:scale-110 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Visit my {social.name}</p>
                        </TooltipContent>
                    </Tooltip>
                )
            })}
        </div>
    </TooltipProvider>
  )
}

export default MultiSocials