'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Sparkles, Target, MessageCircle, Heart, Zap } from 'lucide-react'

const faqs = [
  {
    question: "What if I'm not sure this is right for me?",
    answer: "That's what the satisfaction guarantee is for. After two sessions, if you're not feeling it, you get a full refund. No awkwardness, no questions. I only want to work with people who are genuinely benefiting."
  },
  {
    question: "How is this different from other public speaking courses?",
    answer: "Most courses focus on techniques and tips. We focus on reducing the performance load — the gap between who you are and who you feel you need to be professionally. That's where the real shift happens."
  },
  {
    question: "What if I have a specific event coming up?",
    answer: "We can absolutely weave that in. The curriculum is flexible — if you've got a big presentation or pitch coming up, we'll adapt the programme to make sure you're ready."
  },
  {
    question: "I'm already a decent speaker — is this for me?",
    answer: "Yes. This programme works well for people who already communicate reasonably well but want to level up. Often the biggest gains come from working with people who have a solid foundation but feel something's holding them back."
  },
  {
    question: "What's the format?",
    answer: "Sessions are online via Zoom, 60 minutes each, once a week. You'll also get access to speaking drills to practise between sessions. If you're in Edinburgh, in-person can be arranged."
  },
  {
    question: "What are the 'memory reconsolidation techniques' you mention?",
    answer: "Sometimes the thing stopping someone from speaking freely isn't skill — it's an old story about who they are or what's safe to express. Memory reconsolidation is a way of working with those limiting beliefs so they stop running the show. It's not therapy — it's targeted work on specific blockers."
  }
]

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    weeks: "Weeks 1-3",
    description: "Building stability and awareness — staying present, composed, and expressive in the moment.",
    topics: ["Assessment & fundamentals", "Breath, pausing & presence", "Expression & emotional range"],
    color: "blue"
  },
  {
    phase: "Phase 2",
    title: "Clarity & Story",
    weeks: "Weeks 4-5",
    description: "Precision, simplicity, and the power of narrative.",
    topics: ["Storytelling that connects", "Clarity & conciseness"],
    color: "green"
  },
  {
    phase: "Phase 3",
    title: "Fluency & Authenticity",
    weeks: "Weeks 6-7",
    description: "Trusting instinct, bringing your full self, reducing the performance load.",
    topics: ["Fluency & spontaneity", "Authenticity & identity"],
    color: "purple"
  },
  {
    phase: "Phase 4",
    title: "Integration",
    weeks: "Week 8",
    description: "Putting it all together in high-stakes, real-world contexts.",
    topics: ["Influence, adaptability & ease"],
    color: "amber"
  }
]

const outcomes = [
  "More flow, less inner noise",
  "Stronger clarity and conciseness",
  "Greater emotional connection with audiences",
  "Confidence that feels natural, not performed",
  "Reduced drain from 'being professional'"
]

export default function ProgrammeContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleBookProgramme = () => {
    window.open('https://calendly.com/alistair-webster/speaking-transformation', '_blank')
  }

  const handleBookIntro = () => {
    window.open('https://calendly.com/alistair-webster/intro-call', '_blank')
  }

  const handleBookSingle = () => {
    window.open('https://calendly.com/alistair-webster/single-session', '_blank')
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
              8-Week Programme
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
              <Sparkles className="w-4 h-4" />
              <span>8-Week Transformation Programme</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Close the Gap Between Who You Are and How You Show Up
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                This isn&apos;t just about technique. It&apos;s about reducing the performance load — the gap between who you are and who you feel you need to be professionally — by working on both your speaking skills and the deeper patterns underneath.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Over 8 weeks, we&apos;ll build presence, clarity, storytelling, and authenticity — while addressing the root causes of what holds you back. Walk away speaking with ease, conviction, and confidence that feels natural.
              </p>
            </div>

            {/* Key benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-400">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                8 weekly sessions (60 mins)
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Flexible curriculum
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Progress self-assessments
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Satisfaction guarantee
              </span>
            </div>

            {/* Price & CTA */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-white mb-2">£850</div>
              <p className="text-slate-400 mb-6">One-time payment for the full programme</p>
              <button
                onClick={handleBookProgramme}
                className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
              >
                Book Your Programme
              </button>
              <p className="text-sm text-slate-500 mt-4">
                or <button onClick={handleBookIntro} className="text-blue-400 hover:text-blue-300 underline">book a free 20-min intro call</button> first
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Insight */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              The Real Problem Isn&apos;t Technique
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Most people who struggle with speaking don&apos;t have a skill problem — they have a performance load problem. They&apos;re spending mental energy trying to be someone else in professional settings.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              The gap between who you are naturally and who you think you need to be is exhausting. It makes you self-conscious, stilted, and drained after every meeting or presentation.
            </p>
            <p className="text-xl text-blue-300 font-medium">
              We close that gap. So speaking feels like you — just clearer, calmer, and more compelling.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What&apos;s Included
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">8 x 60-min Coaching Sessions</h3>
              <p className="text-slate-300 leading-relaxed">
                Weekly 1:1 sessions via Zoom. Mix of exercises, discussion, and reflection. We work on what matters most for you — not a rigid script.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Progress Self-Assessments</h3>
              <p className="text-slate-300 leading-relaxed">
                Start and end assessments so you can see real, measurable progress. Previous clients have gone from 5/10 to 9/10 on clarity over similar programmes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-8 border border-purple-400/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Online Speaking Drills</h3>
              <p className="text-slate-300 leading-relaxed">
                Access to practical drills you can use between sessions to build lasting habits. Small reps that make a big difference.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-8 border border-amber-400/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Satisfaction Guarantee</h3>
              <p className="text-slate-300 leading-relaxed">
                After the first two sessions, if you&apos;re not feeling it, you get a full refund. No questions, no awkwardness. I only want clients who are genuinely benefiting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Structure */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Programme Structure
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A framework, not a formula. We&apos;ll quickly identify what matters most for you and adapt accordingly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {phases.map((phase, index) => {
              const colorClasses = {
                blue: "from-blue-500/10 to-blue-600/5 border-blue-400/20",
                green: "from-green-500/10 to-green-600/5 border-green-400/20",
                purple: "from-purple-500/10 to-purple-600/5 border-purple-400/20",
                amber: "from-amber-500/10 to-amber-600/5 border-amber-400/20"
              }[phase.color]

              const badgeClasses = {
                blue: "bg-blue-500/20 text-blue-300 border-blue-400/30",
                green: "bg-green-500/20 text-green-300 border-green-400/30",
                purple: "bg-purple-500/20 text-purple-300 border-purple-400/30",
                amber: "bg-amber-500/20 text-amber-300 border-amber-400/30"
              }[phase.color]

              return (
                <div key={index} className={`bg-gradient-to-br ${colorClasses} rounded-xl p-8 border`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mb-3 ${badgeClasses}`}>
                        {phase.phase}: {phase.weeks}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="bg-white/5 text-slate-400 px-3 py-1 rounded-lg text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What You Can Expect
              </h2>
              <p className="text-slate-400 text-lg">
                By the end of the programme, most clients notice:
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20">
              <ul className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-300 text-lg">{outcome}</span>
                  </li>
                ))}
              </ul>
              <p className="text-blue-300 font-medium mt-6 text-center">
                The end goal: speak with clarity, conviction, and ease — whatever the context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              How I Work
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              This programme works on two levels. On the surface, we build practical speaking skill — presence, clarity, storytelling, and delivery — through rep-based training rooted in the Ultraspeaking methodology.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              But for many people, the real barrier isn&apos;t technique. It&apos;s deeper patterns — old stories about who they are, what&apos;s safe to express, or what happens when they&apos;re seen. That&apos;s where Memory Reconsolidation comes in. It&apos;s a targeted way of working with the root causes of speaking anxiety and limiting beliefs, so they stop running the show. Not therapy — just precise work on the specific blocks holding you back.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Most programmes only address one of these layers. We address both — so the shift is deeper and more lasting.
            </p>
            <p className="text-sm text-blue-300">Ultraspeaking-certified coach</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pricing Options
            </h2>
            <p className="text-slate-400 text-lg">
              Choose what works for your situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Single Session */}
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Single Session</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">£150</span>
                  <span className="text-slate-400 ml-2">/ 60 mins</span>
                </div>
                <p className="text-slate-400 leading-relaxed">Try a session and see how it feels. No commitment.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">60-minute coaching session</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Practical exercises & feedback</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Can apply to 8-week programme</span>
                </li>
              </ul>
              <button
                onClick={handleBookSingle}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors border-2 border-white/20 text-white hover:bg-white/10"
              >
                Book Session
              </button>
            </div>

            {/* 8-Week Programme - Featured */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border-2 border-blue-400/40 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Best Value
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">8-Week Programme</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-300">£850</span>
                  <span className="text-slate-400 ml-2">/ 8 sessions</span>
                </div>
                <p className="text-slate-300 leading-relaxed">Full transformation programme with satisfaction guarantee.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">8 x 60-minute sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Progress self-assessments</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Online speaking drills access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Satisfaction guarantee</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-300">Save £350 vs individual sessions</span>
                </li>
              </ul>
              <button
                onClick={handleBookProgramme}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors bg-blue-500 hover:bg-blue-400 text-white"
              >
                Book Programme
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Who This Is For
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "You already communicate reasonably well but want to level up",
                "You feel drained by 'performing' a professional version of yourself",
                "You want to think more clearly on your feet",
                "You have something important to say but struggle to land it",
                "You sense there's a blocker (confidence, old stories, imposter feelings) getting in the way"
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-blue-400/30 transition-colors"
                >
                  <p className="text-slate-300 leading-relaxed flex items-start">
                    <CheckCircle className="text-blue-400 w-5 h-5 flex-shrink-0 mr-3 mt-0.5" />
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
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

      {/* Continue Practising CTA */}
      <section className="py-10">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/speaking-drills"
              className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium"
            >
              Continue your practice between sessions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform How You Show Up?
            </h2>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed">
              8 weeks. Real progress. Satisfaction guaranteed.
            </p>
            <p className="text-slate-400 mb-8">
              Not sure yet? Book a free 20-minute intro call to see if it&apos;s right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookProgramme}
                className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
              >
                Book 8-Week Programme — £850
              </button>
              <button
                onClick={handleBookIntro}
                className="border-2 border-blue-400/50 text-blue-300 hover:bg-blue-500/10 px-8 py-5 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Free Intro Call First
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container-max section-padding">
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2026 Speak Up For Good</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
