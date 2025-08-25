'use client'

import Image from 'next/image'
import { CheckCircle, Users, Zap, Target } from 'lucide-react'

const UltraSpeaking = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Evidence-Based Method",
      description: "Proven techniques that work in real-world situations"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Focus on Authenticity",
      description: "Find your natural speaking style, not a rehearsed performance"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Practical Games & Exercises",
      description: "Learn through doing, not just theory or lectures"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-max section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-extra-wide text-slate-500 mb-6 font-medium">
              Methodology
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
                Trained in the<br />Ultraspeaking Method
              </span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Content */}
            <div>
              <div className="mb-8">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  I&apos;m an Ultraspeaking-certified coach, trained by some of the best in the business.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Ultraspeaking&apos;s approach — praised by creators like Ali Abdaal, Anne-Laure Le Cunff, and Lucy Simkins — isn&apos;t about memorising scripts or chasing perfect delivery. It&apos;s about finding your authentic voice and building lasting confidence.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Through coaching and speaking games, I help you communicate with impact, overcome imposter syndrome, and inspire others.
                </p>
              </div>
            </div>
            
            {/* Right - Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Why the Ultraspeaking Method Works</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h4>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Certification Display */}
          <div className="mt-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Certified Ultraspeaking Coach</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <Image
                  src="/coach certification.png"
                  alt="Ultraspeaking Coach Certification - Alistair Webster"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-sm transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default UltraSpeaking
