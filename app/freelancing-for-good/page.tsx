'use client'

import Image from 'next/image'
import { CheckCircle, Users, Target, Zap } from 'lucide-react'

export default function FreelancingForGoodOffer() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="py-6 border-b border-white/10">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/speak_up_icon_.svg"
                alt="Speak Up For Good"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400/90 via-blue-300/95 to-blue-400/90 bg-clip-text text-transparent">
                Speak Up For Good
              </span>
            </div>
            <div className="text-sm text-blue-300 font-medium">
              Exclusive Freelancing for Good Offer
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03] backdrop-blur-[0.5px]"></div>
        
        <div className="container-max section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Special Offer Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-400/30">
              <Users className="w-4 h-4" />
              <span>Exclusive Freelancing for Good Offer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Win clients, pitch with impact, and stand out
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
                Do you dread talking money, selling yourself and client calls? You're not alone - I used to be exactly the same.
              </p>
              
              <p className="text-lg text-slate-400 leading-relaxed">
                Public speaking and confidence coaching can be a game changer for your freelancing. Work directly with me - co-founder of Freelancing for Good and a certified Ultraspeaking coach [[memory:6616532]] - to improve your skills quickly so you can win more work and tell the world how you can help.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-16"
            >
              Book Your Free Intro →
            </button>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                What You Get With This Special Offer
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Free Intro Session */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Free 20-Minute Intro Session</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Experience the method and decide whether you want to try the coaching. No pressure, just a taste of what's possible.
                </p>
              </div>

              {/* 50% Off */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">50% Off Your First Booking</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Ready to dive deeper and hone your pitching and communication skills? Get half off your first paid session.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Perfect for Freelancers Who Want To:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Win more clients with confident pitches",
                  "Handle client calls without anxiety", 
                  "Negotiate rates with confidence",
                  "Present your work with impact",
                  "Network effectively at events",
                  "Speak up in team meetings",
                  "Deliver compelling presentations",
                  "Feel comfortable selling yourself"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Book Free Intro</h3>
                <p className="text-slate-400">Start with your free 20-minute session to experience the method</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Decide Next Steps</h3>
                <p className="text-slate-400">If it's a good fit, book your first paid session at 50% off</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Build Confidence</h3>
                <p className="text-slate-400">Get practical tools for interviews, client calls, and presentations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Freelancing Confidence?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Whether it's interviews, client calls, or presentations, these sessions give you practical tools to speak with clarity and confidence.
            </p>
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            >
              Book Your Free Intro →
            </button>
            <p className="text-sm text-slate-400 mt-4">
              No pressure • 20 minutes • Experience the method first
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container-max section-padding">
          <div className="text-center text-slate-400 text-sm">
            <p>© 2024 Speak Up For Good • Exclusive offer for Freelancing for Good community</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
