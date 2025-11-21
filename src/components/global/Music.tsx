"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Play, Pause } from 'lucide-react'

function Music() {
    const [play, setPlay] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const wasPlayingBeforeHiddenRef = useRef(false)
    const hasStartedRef = useRef(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        if (audioRef.current && !hasStartedRef.current) {
          hasStartedRef.current = true
          audioRef.current.play()
            .then(() => {
              setPlay(true)
            })
            .catch(() => {})
        }
      }, 4000)
      
      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (audioRef.current && !audioRef.current.paused) {
            wasPlayingBeforeHiddenRef.current = true
            audioRef.current.pause()
            setPlay(false)
          }
        } else {
          if (wasPlayingBeforeHiddenRef.current && audioRef.current) {
            audioRef.current.play()
              .then(() => {
                setPlay(true)
                wasPlayingBeforeHiddenRef.current = false
              })
              .catch(() => {})
          }
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }, [])

    useEffect(() => {
      if (audioRef.current) {
        if (play) {
          audioRef.current.play().catch(() => {})
        } else {
          audioRef.current.pause()
        }
      }
    }, [play])
    
    return (
      <>
        <audio ref={audioRef} src="/audio.mp3" loop />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setPlay(!play)}>
          {play ? <Pause className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-white" /> : <Play className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-white" />}
        </Button>
      </>
    )
}
export default Music