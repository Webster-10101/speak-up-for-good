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
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
            </a>
            <div className="text-sm text-blue-300 font-medium">
              FFG Partnership
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
              <span>Exclusive Freelancing for Good Coaching Offer</span>
            </div>

            {/* Partner Logos */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <Image
                src="/speak_up_icon_.svg"
                alt="Speak Up For Good"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <span className="text-4xl text-slate-400 font-light">×</span>
              <Image
                src="/ffg_logo.png"
                alt="Freelancing for Good"
                width={120}
                height={90}
                className="rounded-lg"
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Public Speaking and Self Confidence Skills for Freelancers
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
                Struggling with client calls, pitching yourself, or asking for money? You&apos;re not alone — most freelancers do. But it&apos;s costing you projects, income, and opportunities.
              </p>
              
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                I know the feeling — I used to dread when client calls turned to money talk, pitching, or tricky conversations. Now, as a certified Ultraspeaking coach and co-founder of Freelancing for Good, I help freelancers turn those stressful moments into opportunities. With my coaching, you&apos;ll walk into calls confident, handle clients without nerves, charge what you&apos;re worth, and win more projects.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-blue-300 mb-2">
                  💡 Exclusive Offer for Freelancing for Good Members
                </p>
                <p className="text-slate-300">
                  Book a free intro chat today — and if it&apos;s a fit, get 50% off your first session.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/ffg-offer-intro-call', '_blank')}
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
                  <h3 className="text-xl font-bold text-white">Free 20-Minute Intro Chat</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  We&apos;ll have a relaxed chat, I&apos;ll introduce you to the Ultraspeaking method, and you&apos;ll get a feel for how it works. No pressure — just an easy way to see if it&apos;s for you.
                </p>
              </div>

              {/* 50% Off */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">50% Off Your First Coaching Session (or Package)</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Ready to build real confidence and actually enjoy speaking? Your first booking — whether a single session or a package — is half price.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                This coaching is for you if you want to:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Win more clients with authentic, confident pitches",
                  "Handle client calls without anxiety — and actually enjoy them", 
                  "Negotiate rates with real confidence (and stop second-guessing yourself)",
                  "Present your work with impact and presence",
                  "Network naturally and make genuine connections at events",
                  "Speak up in team meetings without fear of \"sounding silly\"",
                  "Deliver presentations that feel clear, calm, and compelling",
                  "Feel comfortable promoting yourself — without feeling fake"
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

      {/* Testimonials */}
      <section className="pt-8 pb-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-extra-wide text-blue-300 mb-6 font-medium">
              From Past Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Real Results from Real People
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "The way you stayed at ease and heard my questions inspired me to do the same — to take my time and own my speaking. This was one of the most impactful coaching sessions I've had.",
                author: "Evelyn Q"
              },
              {
                quote: "You gave me personalised feedback that really helped. I actually spoke for the entire hour, which I'm not used to, and it felt great! You helped me believe more in my own skills as a speaker.",
                author: "Liudmila"
              },
              {
                quote: "Through thoughtful questions and a very human approach, I've got a simple plan with steps for what I can do in my situation starting immediately.",
                author: "Nailya B"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-8 rounded-xl border border-blue-400/20 hover:border-blue-400/30 transition-all duration-300">
                <blockquote className="text-slate-300 leading-relaxed mb-6 text-lg">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="text-sm text-blue-300">
                  <span className="font-medium">— {testimonial.author}</span>, Speaking Coaching Client
                </div>
              </div>
            ))}
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
                <h3 className="text-xl font-semibold text-white mb-4">Book Your Free Intro Chat</h3>
                <p className="text-slate-400">Start with a relaxed 20-minute call — get a feel for the Ultraspeaking method and see if it&apos;s right for you.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Choose Your First Session or Package (50% Off)</h3>
                <p className="text-slate-400">If it clicks, dive in with either a single coaching session or a package — your first booking is half price.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Grow Your Confidence, Win More Work</h3>
                <p className="text-slate-400">Learn practical tools you can use straight away in client calls, negotiations, and presentations — so you feel authentic, calm, and in control.</p>
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
              Take the first step today — and start speaking with clarity, confidence, and ease in every client conversation.
            </p>
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/ffg-offer-intro-call', '_blank')}
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
            <p>© 2025 Speak Up For Good • Exclusive offer for Freelancing for Good community</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
