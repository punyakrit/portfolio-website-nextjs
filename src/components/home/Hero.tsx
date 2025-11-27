"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { bannerImages } from "@/lib/image"
import { env } from "@/lib/env"

export default function Hero() {
  const devMode = env.NEXT_PUBLIC_DEV_MODE === "true"
  const images = bannerImages

  const initial =
    devMode || images.length === 0
      ? images[0]
      : images[Math.floor(Math.random() * images.length)]

  const [currentImage, setCurrentImage] = useState(initial)
  const [opacity, setOpacity] = useState(1)

  const containerRef = useRef(null)
  const visibleRef = useRef(false)

  // Preload exactly ONE next image
  const preload = (src: string) => {
    if (!src) return
    const img = new window.Image()
    img.src = src
  }

  // Observe visibility so we don't rotate when off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Rotate every 10s
  useEffect(() => {
    if (devMode) return

    const rotate = () => {
      if (!visibleRef.current) return

      setOpacity(0)

      setTimeout(() => {
        const next = pickRandomDifferent(currentImage)
        setCurrentImage(next)
        preload(pickRandomDifferent(next))
        setOpacity(1)
      }, 600)
    }

    const interval = setInterval(rotate, 10000)
    return () => clearInterval(interval)
  }, [currentImage, devMode])

  // Pick a different image
  function pickRandomDifferent(current: string) {
    if (images.length <= 1) return current
    let next = images[Math.floor(Math.random() * images.length)]
    if (next === current) {
      next = images[(images.indexOf(current) + 1) % images.length]
    }
    return next
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className="rounded-xl w-full h-[200px] sm:h-[270px] overflow-hidden transition-opacity duration-[600ms] ease-in-out"
        style={{ opacity }}
      >
        <Image
          key={currentImage} // ensures fade works
          src={currentImage}
          alt="Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover rounded-xl"
        />
      </div>

      {/* Top, bottom, left, right gradients */}
      <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b dark:from-[#121212] from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t dark:from-[#121212] from-white to-transparent" />
      <div className="absolute top-0 left-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-r dark:from-[#121212]/20 from-white/20 sm:from-white to-transparent" />
      <div className="absolute top-0 right-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-l dark:from-[#121212]/20 from-white/20 sm:from-white to-transparent" />
    </div>
  )
}
