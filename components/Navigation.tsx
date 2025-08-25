'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/speak_up_icon_.svg"
              alt="Speak Up For Good"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className={`font-bold text-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-400/90 via-blue-300/95 to-blue-400/90 bg-clip-text text-transparent drop-shadow-lg' 
                : 'text-white'
            }`}>Speak Up For Good</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-blue-300 transition-colors font-medium text-base"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="text-white hover:text-blue-300 transition-colors font-medium text-base"
            >
              Coaching
            </button>
            <button
              onClick={() => scrollToSection('newsletter')}
              className="text-white hover:text-blue-300 transition-colors font-medium text-base"
            >
              Newsletter
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ml-4"
            >
              Book Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 