'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Mic, RefreshCcw, Zap, Target } from 'lucide-react'

const faqs = [
  {
    question: "Is this therapy?",
    answer: "No. This is practical skills training. We work on what happens in your body and your delivery, not your childhood. If you need therapy, get therapy. This is for the performance piece."
  },
  {
    question: "I'm new - is this only for pros?",
    answer: "Works for anyone who performs. The nervous system doesn't care about your credit count. If you get up in front of people and words come out of your mouth, we can work on it."
  },
  {
    question: "Can you help me be more spontaneous on stage?",
    answer: "Yes - this is a big one. We train the skill of being present and trusting what comes out, rather than clinging to your script. It's about building comfort with improv so you actually enjoy riffing instead of dreading it."
  },
  {
    question: "Online or in-person?",
    answer: "Sessions are online via Zoom - works from anywhere. If you're in Edinburgh and prefer in-person, we can arrange that too."
  },
  {
    question: "Can we work on hecklers and tough rooms?",
    answer: "Yes. Recovery is one of the three core areas. We practice responding to disruption, silence, and weird energy without losing yourself or your set."
  },
  {
    question: "How soon will it help?",
    answer: "The nervous system piece often shifts in one session - you'll feel different on stage that week. Deeper pattern changes (like stopping the post-gig spiral) take a few weeks of practice."
  }
]

const testimonials = [
  {
    quote: "The way you stayed at ease and heard my questions inspired me to do the same - to take my time and own my speaking. This was one of the most impactful coaching sessions I've had.",
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
]

const painPoints = [
  "You're funny in your head - then adrenaline wipes your timing.",
  "You replay every set like it's evidence in court.",
  "One weird crowd and suddenly you're rewriting your whole identity.",
  "You know the pause would land better. You just can't make yourself wait.",
  "You over-prepare because going off-script feels terrifying.",
  "In conversation you're loose and quick. On stage you're locked to your notes."
]

export default function ComediansContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleBooking = () => {
    window.open('https://calendly.com/alistair-webster/intro-call', '_blank')
  }

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
              For Comedians
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03] backdrop-blur-[0.5px]"></div>

        <div className="container-max section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-400/30">
              <Mic className="w-4 h-4" />
              <span>For Stand-Up Comedians & Live Performers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Get Out of Your Head. Get Into the Room.
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                Coaching for comedians - from finding the idea to landing it on stage. Get Edinburgh-ready.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Not therapy. Not &quot;be more confident&quot; fluff. Help with material, nerves, delivery, and actually enjoying the process. Based in Edinburgh, working with performers worldwide.
              </p>
            </div>

            {/* Four pillars */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-400">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Shaping ideas into material
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Confidence under pressure
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Presence in the moment
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Recovery after rough gigs
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleBooking}
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Book a Free 20-Minute Taster
            </button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sound Familiar?
              </h2>
              <p className="text-slate-400 text-lg">
                The gap between knowing you&apos;re funny and feeling it on stage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-blue-400/30 transition-colors"
                >
                  <p className="text-slate-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Work On */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Work On
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From shaping ideas into material, to handling nerves, to actually enjoying the unscripted moments. Practical stuff you can feel the difference in within days.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Material & Ideas */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-8 border border-amber-400/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Material & Ideas</h3>
              <p className="text-slate-300 leading-relaxed">
                Shaping raw ideas into bits that actually work. Finding the angle, the punchline, the structure. Getting it out of your head and onto a stage where it lands.
              </p>
            </div>

            {/* Confidence */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Confidence Under Pressure</h3>
              <p className="text-slate-300 leading-relaxed">
                Nerves, adrenaline, freeze response - the stuff that makes you rush, go blank, or feel like an imposter. We train your nervous system, not just your mindset.
              </p>
            </div>

            {/* Presence & Spontaneity */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <Mic className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Presence & Spontaneity</h3>
              <p className="text-slate-300 leading-relaxed">
                Being in the moment instead of reciting. Riffing without panic. Enjoying the improv instead of dreading it. Talking with less prep and trusting what comes out.
              </p>
            </div>

            {/* Recovery */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-8 border border-purple-400/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <RefreshCcw className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Recovery</h3>
              <p className="text-slate-300 leading-relaxed">
                After a bad gig, a heckle, silence, or a wobble. How to stop the spiral, get back to yourself, and not let one rough night rewrite your whole story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What the Free 20 Minutes Is For */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What the Free 20 Minutes Is For
              </h2>
              <p className="text-slate-400 text-lg">
                Not a sales call. A useful conversation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">You bring a real situation - a gig coming up, a set that&apos;s not landing, a moment that keeps derailing you.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">You leave with 1-2 specific drills and a simple plan for the week.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">No hard sell. If it&apos;s a fit, I&apos;ll tell you the options. If it&apos;s not, no drama.</span>
                </li>
              </ul>
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
                <h3 className="text-xl font-semibold text-white mb-4">Book the Taster</h3>
                <p className="text-slate-400">20 minutes. Bring something real you&apos;re working on. Free, no strings.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Find the Bottleneck</h3>
                <p className="text-slate-400">Is it your body, your attention, your pacing, your story about yourself? We figure out what&apos;s actually in the way.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Get a Practice Loop</h3>
                <p className="text-slate-400">Small reps, not vague mindset work. Things you can actually do before your next gig.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I&apos;m Alistair. I coach speakers and performers using rep-based training methods - less theory, more practice. Calm feedback, direct observations, no fluff. I work with people who want to feel different on stage, not just think different thoughts about it.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Based in Edinburgh. Sessions online worldwide. In-person available locally.
            </p>
            <p className="text-sm text-blue-300">Ultraspeaking-certified coach</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-extra-wide text-blue-300 mb-6 font-medium">
              From Past Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What People Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-8 rounded-xl border border-blue-400/20 hover:border-blue-400/30 transition-all duration-300">
                <blockquote className="text-slate-300 leading-relaxed mb-6 text-lg">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="text-sm text-blue-300">
                  <span className="font-medium">- {testimonial.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Out of Your Head?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Free 20-minute taster. Bring an idea, a set, or just a question. Online from anywhere - Edinburgh in-person if you prefer.
            </p>
            <button
              onClick={handleBooking}
              className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            >
              Book a Free 20-Minute Taster
            </button>
            <p className="text-sm text-slate-400 mt-4">
              No pressure. No sales pitch. Just a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container-max section-padding">
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2025 Speak Up For Good</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
