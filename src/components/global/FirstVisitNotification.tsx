"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { triggerConfetti } from "./ConfettiSideCannons"
import { useFirstVisit } from "@/hooks/useUsername"

export default function FirstVisitNotification() {
  const { isFirstVisit } = useFirstVisit()
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isFirstVisit === true) {
      setShouldRender(true)
      setTimeout(() => setIsVisible(true), 500)
      triggerConfetti()

      autoCloseTimerRef.current = setTimeout(() => {
        handleClose()
      }, 5000)
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current)
      }
    }
  }, [isFirstVisit])

  const handleClose = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current)
      autoCloseTimerRef.current = null
    }
    setIsVisible(false)
    setTimeout(() => {
      setShouldRender(false)
    }, 300)
  }

  if (!shouldRender || isFirstVisit !== true) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-[10000] transition-all duration-500 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white dark:bg-[#1b1b1b] border border-gray-200 dark:border-[#1b1b1b] rounded-lg shadow-lg px-5 py-4 max-w-sm backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <h3 className="text-foreground font-semibold text-base">
                Welcome!
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You&apos;re visiting this website for the first time. Thanks for stopping by!
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6 rounded-full shrink-0 hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

