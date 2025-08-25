'use client'

import { Heart, Clock } from 'lucide-react'

const Campaign = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="campaign" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Launch Special</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Pay What You Can<br />For Good
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            To launch Speak Up For Good, I&apos;m raising £1,000 for high-impact charities via Giving What We Can. For a limited time, you can book a session, pay what you can, and 100% goes to charity.
          </p>
          
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            <span>Time-limited — limited spots.</span>
          </div>
          
          <button
            onClick={() => scrollToSection('booking')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Join The Campaign
          </button>
        </div>
      </div>
    </section>
  )
}

export default Campaign 