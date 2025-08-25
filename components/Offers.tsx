'use client'

import { CheckCircle } from 'lucide-react'

const Offers = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const offers = [
    {
      title: "60 Min Coaching — Speak Up For Good",
      price: "£100",
      duration: "60 minutes",
      description: "Build lasting confidence and clarity in your speaking. Dive straight into improving how you speak and feel when the pressure is on.",
      features: [
        "1:1 personalised coaching",
        "Practical exercises & mindset shifts",
        "Real-time feedback",
        "Safe, supportive environment"
      ],
      buttonText: "Book Session",
      calendlyUrl: "https://calendly.com/alistair-webster/single-session",
      popular: false
    },
    {
      title: "4× 60 Mins Coaching Package",
      price: "£300",
      duration: "4 sessions (1 free)",
      description: "Make a real shift in your confidence. We'll dig deep into your challenges and build lasting tools so you enjoy speaking moments.",
      features: [
        "Four 60-minute sessions",
        "One session completely free",
        "Deep dive into challenges",
        "Save £100"
      ],
      buttonText: "Start Today",
      calendlyUrl: "https://calendly.com/alistair-webster/1-1-package",
      popular: true
    },
    {
      title: "High-Stakes Coaching — One-Off Intensive",
      price: "£200",
      duration: "120 minutes",
      description: "Got a big moment coming up? Polish your delivery, strengthen your presence, and rehearse until you feel confident and ready to perform.",
      features: [
        "120 minutes of focused support",
        "Immediate feedback & rehearsal",
        "Tailored for specific events",
        "Leave ready to perform"
      ],
      buttonText: "Book Intensive",
      calendlyUrl: "https://calendly.com/alistair-webster/high-stakes",
      popular: false
    }
  ]

  return (
    <section id="offers" className="py-20 bg-white/50">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-extra-wide text-slate-500 mb-6 font-medium">
            Coaching
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
              Let&apos;s Get<br />Started
            </span>
          </h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Sessions are generally conducted online via Zoom to suit your schedule
          </p>
          
          {/* Free Intro Call CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-8 mb-16 max-w-3xl mx-auto border border-blue-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Let&apos;s chat and see if coaching&apos;s right for you</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Start with a free 20-minute intro call. Experience the Ultraspeaking method, get a feel for my coaching, and see if it&apos;s the right fit — with no pressure.
              </p>
              <button
                onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
                className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Book Free 20-Minute Intro Call
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <div key={index} className={`bg-white rounded-xl p-8 border-2 relative ${
              offer.popular ? 'border-primary shadow-lg' : 'border-slate-100'
            }`}>
              {offer.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{offer.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">{offer.price}</span>
                  <span className="text-slate-600 ml-2">/ {offer.duration}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{offer.description}</p>
              </div>
              
              <div className="space-y-3 mb-8">
                {offer.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => window.open(offer.calendlyUrl, '_blank')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  offer.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {offer.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        {/* Custom packages note */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Need something different? Teams or custom packages and in-person workshops can be arranged. Just 
            <a href="mailto:alistair@speakupforgood.com" className="text-primary hover:text-primary/80 transition-colors ml-1">
              contact me via email to discuss
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Offers






