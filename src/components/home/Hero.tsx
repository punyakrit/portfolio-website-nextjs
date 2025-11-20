import React from 'react'
import Image from 'next/image'
import bg from "../../../public/bg.jpeg"
function Hero() {
  return (
    <div className="relative">
      <Image 
        src={bg} 
        alt="Banner" 
        width={1240} 
        height={900} 
        className="rounded-xl w-full h-[200px] sm:h-[270px] object-cover" 
        decoding="async"
        loading="lazy"
      />
      <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b dark:from-[#121212] from-[#fff] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t dark:from-[#121212] from-[#fff] to-transparent"></div>
      <div className="absolute top-0 left-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-r dark:from-[#121212]/20 sm:dark:from-[#121212] from-[#fff]/20 sm:from-[#fff] to-transparent"></div>
      <div className="absolute top-0 right-0 w-[20px] sm:w-[60px] h-full bg-gradient-to-l dark:from-[#121212]/20 sm:dark:from-[#121212] from-[#fff]/20 sm:from-[#fff] to-transparent"></div>
      
    </div>
  )
}

export default Hero