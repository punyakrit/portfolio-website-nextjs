"use client";

import React, { useRef } from 'react'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'
import { socials } from '@/lib/socials'
import { motion, useInView } from 'framer-motion'

function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className='px-4 sm:px-6 md:px-8 pb-32'
    >
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col items-center space-y-6'>
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'
          >
            {socialLinks.map((social) => (
              <SocialLink key={social.name} social={social} />
            ))}
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className='flex items-center space-x-2 text-sm text-gray-500'
          >
            <span>Designed and developed by</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 17,
              }}
            >
              <Link
                href='https://github.com/punyakrit'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium dark:text-white text-black hover:text-gray-300 transition-colors duration-200 relative inline-block'
              >
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 25,
                  }}
                  style={{ transformOrigin: "left" }}
                />
                <span className="relative z-10">Punyakrit</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className='flex items-center space-x-2 text-sm text-gray-500'
          >
            <span>Founder of</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 17,
              }}
            >
              <Link
                href='https://launchcraft.studio'
                target='_blank'
                rel='noopener'
                className='font-medium dark:text-white text-black hover:text-gray-300 transition-colors duration-200 relative inline-block'
              >
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 25,
                  }}
                  style={{ transformOrigin: "left" }}
                />
                <span className="relative z-10">LaunchCraft Studio</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

function SocialLink({
  social,
}: {
  social: { name: string; url: string; icon: React.ElementType };
}) {
  const IconComponent = social.icon;

  return (
    <Link
      href={social.url}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200'
    >
      <IconComponent className='w-4 h-4' />
      <span className='text-sm hidden sm:inline'>{social.name}</span>
    </Link>
  );
}

export default Footer