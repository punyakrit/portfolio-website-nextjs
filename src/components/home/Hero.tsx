"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { bannerImages } from '@/lib/image'
import { env } from '@/lib/env'
function Hero() {
  const devMode = env.NEXT_PUBLIC_DEV_MODE
  const backgroundImages = bannerImages
  const [backgroundImage, setBackgroundImage] = useState(
    devMode === "true" ? backgroundImages[0] : backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
  )
  const [opacity, setOpacity] = useState(1)
  
  useEffect(() => {
    if (devMode !== "true") {
      const preloadImages = () => {
        backgroundImages.forEach((src) => {
          const img = new window.Image()
          img.src = src
        })
      }
      preloadImages()
    }
  }, [devMode, backgroundImages])
  
  useEffect(() => {
    if (devMode === "true") {
      return
    }
    
    const interval = setInterval(() => {
      setOpacity(0)
      setTimeout(() => {
        setBackgroundImage(backgroundImages[Math.floor(Math.random() * backgroundImages.length)])
        setOpacity(1)
      }, 600)
    }, 10000)
    return () => clearInterval(interval)
  }, [devMode, backgroundImages])
  
  return (
    <div className="relative">
      <Image 
        src={backgroundImage} 
        alt="Banner" 
        width={1240} 
        height={900} 
        className="rounded-xl w-full h-[200px] sm:h-[270px] object-cover transition-opacity duration-[600ms] ease-in-out" 
        style={{ opacity }}
      />
      <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b dark:from-[#121212] from-[#fff] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t dark:from-[#121212] from-[#fff] to-transparent"></div>
      <div className="absolute top-0 left-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-r dark:from-[#121212]/20 sm:dark:from-[#121212] from-[#fff]/20 sm:from-[#fff] to-transparent"></div>
      <div className="absolute top-0 right-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-l dark:from-[#121212]/20 sm:dark:from-[#121212] from-[#fff]/20 sm:from-[#fff] to-transparent"></div>
      
    </div>
  )
}

export default Hero