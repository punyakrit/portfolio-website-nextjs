"use client";

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'
import { socials } from '@/lib/socials'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'

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
            {socialLinks.map((social, index) => (
              <SocialLinkWithMagnetic
                key={social.name}
                social={social}
                index={index}
              />
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
        </div>
      </div>
    </motion.footer>
  )
}

function SocialLinkWithMagnetic({
  social,
  index,
}: {
  social: { name: string; url: string; icon: React.ElementType };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const IconComponent = social.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ 
          scale: 1.1, 
          y: -3,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring" as const,
          stiffness: 400,
          damping: 17,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <Link
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex items-center gap-2 px-3 py-2 rounded-lg relative overflow-hidden'
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 opacity-0 group-hover:opacity-100 rounded-lg"
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-lg"
            transition={{ duration: 0.4 }}
          />
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-primary/30 via-primary/10 to-transparent rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{
              rotate: [0, -12, 12, -12, 0],
              scale: 1.2,
            }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 15,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative z-10"
          >
            <IconComponent className='w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300' />
          </motion.div>
          <motion.span
            className='text-sm text-gray-400 group-hover:text-white transition-colors duration-300 hidden sm:inline relative z-10'
            whileHover={{ x: 2 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 17,
            }}
          >
            {social.name}
          </motion.span>
          <motion.div
            className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-lg"
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -inset-1 bg-primary/0 group-hover:bg-primary/10 rounded-lg blur-md opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.4 }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Footer