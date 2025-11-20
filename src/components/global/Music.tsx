"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'

function Music() {
    const [play, setPlay] = useState(false)
  return (
    <Button variant="ghost" size="icon"  className="rounded-full">
      {/* <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /> */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default Music