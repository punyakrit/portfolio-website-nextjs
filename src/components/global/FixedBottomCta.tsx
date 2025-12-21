'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { socials } from '@/lib/socials'
import { env } from '@/lib/env'

function FixedBottomCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const profileImage = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"

  useEffect(() => {
    const dismissed = sessionStorage.getItem('cta-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            delay: 0.1
          }}
        >
          <motion.div 
            className="max-w-sm mx-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              delay: 0.2
            }}
          >
            <motion.a
              href={socials.cal}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-black/10 via-black/5 to-black/10 dark:from-white/15 dark:via-white/5 dark:to-white/15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0a0a0a] shadow-lg dark:shadow-none backdrop-blur-xl border border-gray-200 dark:border-transparent">
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(110deg, transparent 20%, rgba(0,0,0,0.02) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0%', '-200% 0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="relative p-4">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="relative flex-shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            src={profileImage}
                          />
                        </motion.div>
                        <motion.div 
                          className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                        >
                          <span className="relative flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0a0a0a]" />
                          </span>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex-1 min-w-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                      >
                        <p className="text-gray-900 dark:text-white/90 font-medium text-[15px] leading-tight">
                          Let&apos;s build together
                        </p>
                        <p className="text-gray-500 dark:text-white/40 text-xs mt-0.5">
                          Open for new projects
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        whileHover={{ 
                          gap: '12px',
                        }}
                      >
                        <motion.div
                          animate={{ rotate: isHovered ? 15 : 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Calendar className="w-4 h-4" />
                        </motion.div>
                        <span>Book</span>
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ 
                            width: isHovered ? 'auto' : 0, 
                            opacity: isHovered ? 1 : 0 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FixedBottomCta
