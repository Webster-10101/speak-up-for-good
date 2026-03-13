'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Mic, Users, Target, Zap, MessageCircle, TrendingUp, Shield } from 'lucide-react'

const quizUrl = '/speaker-quiz?utm_source=ffg&utm_medium=job_board&utm_campaign=speaker_quiz&utm_content=landing_page'

const painPoints = [
  "You know your work is good — but you stumble when you have to explain it on a call.",
  "You undercharge because the money conversation makes you freeze up.",
  "You avoid networking events, video content, or anything that puts you on the spot.",
  "You over-prepare for pitches and still feel like you're winging it.",
  "You lose energy halfway through long presentations and can feel the room drifting.",
  "You're great one-to-one but something changes when there's an audience."
]

const faqs = [
  {
    question: "What is the speaker quiz?",
    answer: "A short quiz (under 3 minutes) that identifies your speaker archetype — your default patterns when you speak under pressure. You'll get a personalised profile with your strengths, blind spots, and specific drills to practise. It's free, no sign-up required."
  },
  {
    question: "Is this therapy?",
    answer: "No. This is practical skills training. We work on what happens in your body and your delivery — not your childhood. If you need therapy, get therapy. This is for the performance piece: pitches, calls, presentations, networking."
  },
  {
    question: "I'm not a 'speaker' — I just need to be better on client calls. Is this for me?",
    answer: "Yes. Most of the freelancers I work with aren't doing keynotes — they're on discovery calls, pitching to clients, negotiating rates, or presenting work. If words come out of your mouth and money depends on it, this applies."
  },
  {
    question: "How is this different from generic confidence advice?",
    answer: "We don't do affirmations or mindset pep talks. The method is rep-based — you practise specific drills that train your nervous system to stay calm under pressure. Think gym reps for speaking, not a self-help book."
  },
  {
    question: "What's the coaching like?",
    answer: "Sessions are online via Zoom — typically 60 minutes. We work on real situations: an upcoming pitch, a client conversation you're dreading, a presentation you need to nail. You leave with specific drills and a plan, not vague advice."
  },
  {
    question: "How much does coaching cost?",
    answer: "Single sessions are £150. The 8-week programme (which includes deeper pattern work using Memory Reconsolidation) is £850. There's a free 20-minute intro call if you want to try the method first."
  },
  {
    question: "Online or in-person?",
    answer: "Sessions are online — works from anywhere. If you're in Edinburgh and prefer in-person, we can arrange that too."
  },
  {
    question: "How quickly will I notice a difference?",
    answer: "The nervous system piece often shifts in one or two sessions — you'll feel different on your next call. Deeper patterns (like the instinct to undercharge or avoid difficult conversations) take a few weeks of practice."
  }
]

const testimonials = [
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
]

export default function FreelancingForGoodContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

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
              For Freelancers
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
              <Users className="w-4 h-4" />
              <span>For Freelancing for Good Members</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Your Work Is Good. Does Your Voice Match?
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                Most freelancers lose work not because of skill — but because they can&apos;t pitch it, price it, or present it with confidence.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Take a 2-minute quiz to discover your speaker type — and get a personalised plan to speak with more clarity, calm, and conviction in every client conversation.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href={quizUrl}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Discover Your Speaker Type →
            </Link>
            <p className="text-sm text-slate-500 mt-4">Free • 2 minutes • No sign-up required</p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sound Familiar?
              </h2>
              <p className="text-slate-400 text-lg">
                The gap between being good at your work and being good at talking about it.
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

      {/* What You Get */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Get
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A personalised approach to speaking — starting with understanding your patterns, then building real skills you can use immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Quiz */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Your Speaker Profile</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                The quiz identifies your archetype — your default patterns under pressure. Are you an overthinker? A people-pleaser? A rambler? Each type has specific strengths and blind spots.
              </p>
              <p className="text-sm text-blue-300">Free • Personalised results</p>
            </div>

            {/* Drills */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Speaking Drills</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Targeted exercises you can do in 5 minutes before a client call or pitch. Not theory — actual reps that train your nervous system to stay calm and clear.
              </p>
              <p className="text-sm text-green-300">11 drills • 2–12 minutes each</p>
            </div>

            {/* Coaching */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-8 border border-purple-400/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">1:1 Coaching</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Work on your specific situations — an upcoming pitch, a tricky client, a presentation. Sessions are practical: you leave with a plan and drills, not just encouragement.
              </p>
              <p className="text-sm text-purple-300">£150/session • Free intro call</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems We Work On */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Freelancers Work On With Me
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real situations, practical skills. Not &quot;be more confident&quot; — actual tools for the moments that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Client Calls */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Client Calls & Discovery Sessions</h3>
              <p className="text-slate-300 leading-relaxed">
                Sounding credible without a script. Handling silence. Asking good questions instead of filling every gap. Feeling like a peer, not a supplicant.
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pricing & Negotiation</h3>
              <p className="text-slate-300 leading-relaxed">
                Saying your rate without apologising. Holding firm when they push back. The money conversation doesn&apos;t have to be the worst part of freelancing.
              </p>
            </div>

            {/* Presenting */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-8 border border-amber-400/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                <Mic className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Presentations & Pitches</h3>
              <p className="text-slate-300 leading-relaxed">
                Keeping a room&apos;s attention. Handling nerves when the stakes are high. Speaking clearly without over-preparing or going blank halfway through.
              </p>
            </div>

            {/* Visibility */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-8 border border-purple-400/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Visibility & Self-Promotion</h3>
              <p className="text-slate-300 leading-relaxed">
                Networking without dreading it. Creating video content without cringing. Talking about your work in a way that feels honest, not salesy.
              </p>
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
                <h3 className="text-xl font-semibold text-white mb-4">Take the Quiz</h3>
                <p className="text-slate-400">2 minutes. Discover your speaker type — the patterns that help you and the ones that hold you back.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Get Your Plan</h3>
                <p className="text-slate-400">Personalised results with your strengths, blind spots, and specific drills matched to your type.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Practise & Grow</h3>
                <p className="text-slate-400">Use the drills before your next call. Book coaching if you want to go deeper. Feel the difference within days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
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
                  <span className="font-medium">— {testimonial.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I&apos;m Alistair — a speaking coach and co-founder of Freelancing for Good. I use rep-based training methods (not mindset fluff) to help freelancers and professionals speak with more clarity and less stress. Calm feedback, direct observations, practical tools.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Based in Edinburgh. Sessions online worldwide.
            </p>
            <p className="text-sm text-blue-300">Ultraspeaking-certified coach</p>
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
              Ready to Find Out Your Speaker Type?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              2-minute quiz. Personalised results. Specific drills you can use before your next client call.
            </p>
            <Link
              href={quizUrl}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            >
              Take the Quiz →
            </Link>
            <p className="text-sm text-slate-400 mt-4">
              Free • No sign-up • Get your results instantly
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
