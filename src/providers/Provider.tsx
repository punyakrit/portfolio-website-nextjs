"use client"
import React from 'react'
import Snowfall from 'react-snowfall'

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
        {children}
    </div>
  )
}

export default Provider