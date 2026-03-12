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
      title: "Single Session",
      price: "£125",
      duration: "60 minutes",
      description: "Try a session and see how it feels. Practical exercises, real-time feedback, no commitment.",
      features: [
        "1:1 personalised coaching",
        "Practical exercises & feedback",
        "Safe, supportive environment"
      ],
      buttonText: "Book Session",
      calendlyUrl: "https://calendly.com/alistair-webster/single-session",
      popular: false,
      subdued: false
    },
    {
      title: "8-Week Speaking Transformation",
      price: "£800",
      duration: "8 sessions",
      description: "Full programme to transform how you show up. Reduce performance load, build lasting confidence.",
      features: [
        "8 × 60-minute sessions",
        "Progress self-assessments",
        "Online speaking drills access",
        "Satisfaction guarantee"
      ],
      buttonText: "Book Programme",
      calendlyUrl: "https://calendly.com/alistair-webster/speaking-transformation",
      popular: true,
      subdued: false,
      link: "/8-week-programme"
    },
    {
      title: "High-Stakes Intensive",
      price: "£200",
      duration: "120 minutes",
      description: "Got a big moment coming up? Polish your delivery and rehearse until you're ready.",
      features: [
        "120 minutes of focused support",
        "Tailored for specific events",
        "Leave ready to perform"
      ],
      buttonText: "Book Intensive",
      calendlyUrl: "https://calendly.com/alistair-webster/high-stakes",
      popular: false,
      subdued: false
    },
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
          {offers.filter(o => !o.subdued).map((offer, index) => (
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

              {offer.link && (
                <a
                  href={offer.link}
                  className="block text-center text-sm text-primary hover:text-primary/80 mb-3 underline"
                >
                  Learn more
                </a>
              )}

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






