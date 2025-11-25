'use client'
import React from 'react'
import { socials } from '@/lib/socials'
import { env } from '@/lib/env'
import Image from 'next/image'

function Cta() {
  const profileImage = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"

  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='flex justify-center border-dashed border-2 border-white/5 rounded-2xl'>
        <div className='relative w-full max-w-4xl'>
          <div className='relative rounded-2xl p-12 sm:p-16 text-center'>
            <div className='relative z-10'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-8 leading-relaxed'>
                Hey, you scrolled this far, let&apos;s talk.
              </h2>
              <div className="flex justify-center">
                <div className="gradient bg-gradient-to-b from-[#252525] to-[#3B3B3B] rounded-lg p-[1px] relative overflow-hidden w-auto">
                  <a 
                    href={socials.cal} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="gradient h-full bg-[#1C1C1C] rounded-lg text-white text-sm sm:text-md px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center transition-all group relative overflow-hidden touch-manipulation active:opacity-75"
                    style={{ 
                      '--x': '-90.45457%',
                      '--spread': '90deg',
                      '--shimmer-color': '#ffffff',
                      '--radius': '8px',
                      '--speed': '3s',
                      '--cut': '0.05em',
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    } as React.CSSProperties}
                  >
                    {/* Shimmer Effect Layer */}
                    <div 
                      className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s ease-in-out infinite',
                      }}
                    />

                    <div className="flex items-center gap-2 group-hover:gap-6 sm:group-hover:gap-12 transition-all duration-300 relative z-20">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          alt="Profile" 
                          width={26} 
                          height={26} 
                          className="w-full h-full object-cover" 
                          src={profileImage}
                          style={{ color: 'transparent' }}
                        />
                      </div>
                      <div className="flex items-center gap-0 absolute left-[28px] sm:left-[30px] transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-plus w-2 h-2 sm:w-3 sm:h-3"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center text-[8px] sm:text-[10px]">
                          You
                        </div>
                      </div>
                      <span 
                        className="whitespace-nowrap relative block text-sm sm:text-base"
                        style={{ 
                          maskImage: 'linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), rgba(255,255,255,0.1) calc(var(--x) + 30%), rgba(0,0,0,1) calc(var(--x) + 100%))' 
                        }}
                      >
                        Book a Free Call
                      </span>
                    </div>
                    <span 
                      className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,transparent_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),transparent_calc(var(--x)+100%))] p-px"
                      style={{ 
                        mask: 'linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) content-box exclude, linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0))'
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cta