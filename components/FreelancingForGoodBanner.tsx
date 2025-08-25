'use client'

import Link from 'next/link'
import { Mic } from 'lucide-react'

export default function FreelancingForGoodBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 w-full">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03] backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10 px-6 md:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-5xl mx-auto">
          
          {/* Left side - Headline and Subline */}
          <div className="flex-1 text-center md:text-left">
            {/* Headline with icon */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                <Mic className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight">
                👉 Freelancers Who Speak Up, Win More Work
              </h2>
            </div>
            
            {/* Subline */}
            <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-lg mx-auto md:mx-0">
              Special coaching offer for FFG job board users — free intro + 50% off your first session.
            </p>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex-shrink-0">
            <Link 
              href="/freelancing-for-good"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Book Free Intro →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


