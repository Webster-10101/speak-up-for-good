'use client'

import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
        <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
      {/* Subtle frosted glass texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03] backdrop-blur-[0.5px]"></div>
      
      <div className="container-max section-padding h-full flex items-center py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          {/* Left Content */}
          <div className="lg:pl-8">
            {/* Service Type */}
            <div className="mb-12 mt-8">
              <p className="text-lg md:text-xl text-blue-300 font-semibold tracking-wide uppercase">
                Public Speaking & Self-Confidence Coaching
              </p>
            </div>
            
            {/* Main Headline */}
            <div className="mb-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black leading-[0.8] tracking-tighter">
                <span className="block bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">SPEAK UP</span>
                <span className="block bg-gradient-to-r from-blue-300/80 via-blue-200/90 to-blue-300/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">FOR GOOD</span>
              </h1>
            </div>
            
            {/* Subheadline */}
            <div className="max-w-2xl mb-10">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                Build real confidence — and speak up for what you care about. Coaching to help you speak with clarity and presence, so you can persuade, inspire, and influence.
              </p>
            </div>
            
            {/* Quiz CTA */}
            <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
              <p className="text-blue-300 text-sm font-medium mb-2">🎯 Not sure where to start?</p>
              <Link
                href="/speaker-quiz"
                className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <span className="font-semibold">Take my 2-minute Speaker Quiz</span>
                <span className="ml-2">→</span>
              </Link>
              <p className="text-slate-400 text-xs mt-1">Discover your speaker archetype and get a personalized growth plan</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
                className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105"
              >
                Book Intro Call
              </button>
              <button
                onClick={() => scrollToSection('offers')}
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105"
              >
                Coaching Packages
              </button>
            </div>
          </div>
          
          {/* Right - Portrait */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-300/30 shadow-2xl">
                <Image
                  src="/alistair webster circle-01.webp"
                  alt="Alistair Webster - Speaking Coach"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-4 border border-blue-400/20 rounded-full"></div>
              <div className="absolute -inset-8 border border-blue-400/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 