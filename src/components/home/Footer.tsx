import React from 'react'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'
import { socials } from '@/lib/socials'

function Footer() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: socials.x,
      icon: FaXTwitter,
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
   
    
  ]

  return (
    <footer className='px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 '>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 hover:scale-105'
                >
                  <IconComponent className='w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300' />
                  <span className='text-sm text-gray-400 group-hover:text-white transition-colors duration-300 hidden sm:inline'>
                    {social.name}
                  </span>
                </Link>
              )
            })}
          </div>
          
          <div className='flex items-center space-x-2 text-sm text-gray-500'>
            <span>Designed and developed by</span>
            <Link
              href='https://github.com/punyakrit'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium dark:text-white text-black hover:text-gray-300 transition-colors duration-200'
            >
              Punyakrit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer