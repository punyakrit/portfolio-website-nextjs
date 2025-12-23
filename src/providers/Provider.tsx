"use client"
import React from 'react'
import Snowfall from 'react-snowfall'

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Snowfall style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 , opacity: 0.5}} />
        {children}
    </div>
  )
}

export default Provider