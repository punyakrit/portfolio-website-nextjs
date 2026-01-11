"use client";

import React from 'react'
import { env } from '@/lib/env'
import RedirectButtons from './RedirectButtons'
import MultiSocials from './MultiSocials'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function About() {
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="-mt-20 z-10 relative px-4 sm:px-6 md:px-8"
    >
      <div className="relative inline-block">
        <img 
          src={image} 
          alt="Punyakrit Singh Makhni - Freelance Full-Stack Developer India" 
          className='h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full object-cover border shadow-lg border-white/20 dark:shadow-white/20'
        />
      </div>

      <motion.h1
        variants={itemVariants}
        className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-4 mt-6 sm:mt-8 font-[family-name:var(--font-inter)] leading-tight'
      >
        Hi, I&apos;m Punyakrit -{' '}
        <motion.span
          className='font-bold bg-gradient-to-r from-black/80 to-black/50 dark:from-white/80 dark:to-white/50 bg-clip-text text-transparent inline-block'
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        >
          Full-Stack Developer
        </motion.span>
      </motion.h1>
      
      <motion.p
        variants={itemVariants}
        className='text-base sm:text-lg md:text-xl leading-relaxed dark:text-white/80 text-black/80 max-w-3xl mt-4 sm:mt-6'
      >
        I build{' '}
        <motion.strong
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        >
          production-grade web applications
        </motion.strong>
        {' '}for startups and businesses globally. My expertise spans{' '}
        <motion.span
          className='font-semibold dark:text-white text-black dark:bg-white/10 bg-black/5 px-2 py-0.5 rounded inline-block cursor-default'
          whileHover={{
            scale: 1.05,
            backgroundColor: "hsl(var(--primary) / 0.1)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          transition={{
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          }}
        >
          Next.js, React, TypeScript, FastAPI & PostgreSQL
        </motion.span>
        . From MVPs to full-scale products, I deliver clean code, clear UX, and fast shipping.{' '}
        <motion.span
          className='block mt-2 text-sm sm:text-base opacity-80'
          variants={itemVariants}
        >
          Remote-friendly • Available for hire • Serving clients worldwide
        </motion.span>
      </motion.p>

      <motion.div
        variants={itemVariants}
        className='flex flex-col sm:flex-row gap-4 sm:gap-4 my-6 justify-between items-start sm:items-center'
      >
        <RedirectButtons />
        <MultiSocials showAll={false} />
      </motion.div>
    </motion.div>
  )
}

export default About
