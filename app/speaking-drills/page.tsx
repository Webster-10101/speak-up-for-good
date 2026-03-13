'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmailGate from '@/components/EmailGate'

const essentialDrills = [
  {
    name: 'Body Ready',
    slug: 'body-ready',
    duration: '2 min',
    tag: 'Start every session here',
    tagColor: 'green',
    description: 'Wake up your body and voice before you practise',
    points: ['Shake out tension', 'Vocal warm-up', 'Ground posture', 'Breathe & commit'],
  },
  {
    name: 'Ride the Spike',
    slug: 'ride-the-spike',
    duration: '5 min',
    tag: 'Use before any talk',
    tagColor: 'orange',
    description: 'Metabolise the adrenaline spike and own your first 90 seconds',
    points: ['Physical adrenaline burn-off', 'Physiological sigh technique', 'Lock your opening on autopilot', 'Performing through elevated heart rate'],
  },
]

const coreDrills = [
  {
    name: '5-Minute Speaking Workout',
    slug: 'conviction-workout',
    duration: '5 min',
    forWho: 'Everyone',
    description: 'Build conviction and authenticity in your speaking',
    color: 'blue',
  },
  {
    name: 'The 5-Minute Reset',
    slug: 'five-minute-reset',
    duration: '5 min',
    forWho: 'Overthinkers',
    description: 'Regulate your nervous system and meet nervous energy with presence',
    color: 'blue',
  },
  {
    name: 'Conviction Reps',
    slug: 'conviction-reps',
    duration: '5 min',
    forWho: 'Self-Doubters',
    description: 'Stop hedging and speak with certainty',
    color: 'red',
  },
]

const targetedDrills = [
  {
    name: 'The Edit',
    slug: 'the-edit',
    duration: '5 min',
    forWho: 'Ramblers',
    description: 'Say more with less — train yourself to land the point',
    color: 'cyan',
  },
  {
    name: 'Hold the Space',
    slug: 'hold-the-space',
    duration: '4 min',
    forWho: 'People Pleasers',
    description: 'Use silence with confidence instead of rushing to fill it',
    color: 'indigo',
  },
  {
    name: 'Ground & Land',
    slug: 'ground-and-land',
    duration: '4.5 min',
    forWho: 'Performers',
    description: 'Slow down, drop the performance, speak with genuine presence',
    color: 'stone',
  },
  {
    name: 'Dial It Up',
    slug: 'dial-it-up',
    duration: '4.5 min',
    forWho: 'Minimalists',
    description: 'Expand, add colour, and fill the space with energy',
    color: 'pink',
  },
  {
    name: 'Metaphor Practice',
    slug: 'metaphor-practice',
    duration: '6-12 min',
    forWho: 'Rationalists',
    description: 'Speak in vivid metaphors that make abstract ideas tangible',
    color: 'purple',
  },
  {
    name: 'Find the Absurd',
    slug: 'find-the-absurd',
    duration: '6 min',
    forWho: 'Intense Speakers',
    description: 'Train your brain to find lightness and unexpected connections',
    color: 'amber',
  },
]

const colorMap: Record<string, { border: string; hoverBorder: string; bg: string; text: string; dot: string; btn: string; btnHover: string; tag: string; tagText: string }> = {
  green:  { border: 'border-green-400/40',  hoverBorder: 'hover:border-green-400/60',  bg: 'from-green-900/30 to-emerald-800/30', text: 'text-green-300',  dot: 'bg-green-400',  btn: 'bg-green-500',  btnHover: 'hover:bg-green-400',  tag: 'bg-green-500/20',  tagText: 'text-green-300' },
  orange: { border: 'border-orange-400/40', hoverBorder: 'hover:border-orange-400/60', bg: 'from-orange-900/30 to-amber-800/30',  text: 'text-orange-300', dot: 'bg-orange-400', btn: 'bg-orange-500', btnHover: 'hover:bg-orange-400', tag: 'bg-orange-500/20', tagText: 'text-orange-300' },
  blue:   { border: 'border-blue-400/30',   hoverBorder: 'hover:border-blue-400/50',   bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-blue-300',   dot: 'bg-blue-400',   btn: 'bg-blue-500',   btnHover: 'hover:bg-blue-400',   tag: 'bg-blue-500/20',   tagText: 'text-blue-300' },
  red:    { border: 'border-red-400/30',    hoverBorder: 'hover:border-red-400/50',    bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-red-300',    dot: 'bg-red-400',    btn: 'bg-red-500',    btnHover: 'hover:bg-red-400',    tag: 'bg-red-500/20',    tagText: 'text-red-300' },
  cyan:   { border: 'border-cyan-400/30',   hoverBorder: 'hover:border-cyan-400/50',   bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-cyan-300',   dot: 'bg-cyan-400',   btn: 'bg-cyan-500',   btnHover: 'hover:bg-cyan-400',   tag: 'bg-cyan-500/20',   tagText: 'text-cyan-300' },
  indigo: { border: 'border-indigo-400/30', hoverBorder: 'hover:border-indigo-400/50', bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-indigo-300', dot: 'bg-indigo-400', btn: 'bg-indigo-500', btnHover: 'hover:bg-indigo-400', tag: 'bg-indigo-500/20', tagText: 'text-indigo-300' },
  stone:  { border: 'border-stone-400/30',  hoverBorder: 'hover:border-stone-400/50',  bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-stone-300',  dot: 'bg-stone-400',  btn: 'bg-stone-600',  btnHover: 'hover:bg-stone-500',  tag: 'bg-stone-500/20',  tagText: 'text-stone-300' },
  pink:   { border: 'border-pink-400/30',   hoverBorder: 'hover:border-pink-400/50',   bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-pink-300',   dot: 'bg-pink-400',   btn: 'bg-pink-500',   btnHover: 'hover:bg-pink-400',   tag: 'bg-pink-500/20',   tagText: 'text-pink-300' },
  purple: { border: 'border-purple-400/30', hoverBorder: 'hover:border-purple-400/50', bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-purple-300', dot: 'bg-purple-400', btn: 'bg-purple-500', btnHover: 'hover:bg-purple-400', tag: 'bg-purple-500/20', tagText: 'text-purple-300' },
  amber:  { border: 'border-amber-400/30',  hoverBorder: 'hover:border-amber-400/50',  bg: 'from-slate-800/50 to-slate-700/50',   text: 'text-amber-300',  dot: 'bg-amber-400',  btn: 'bg-amber-500',  btnHover: 'hover:bg-amber-400',  tag: 'bg-amber-500/20',  tagText: 'text-amber-300' },
}

function DrillCard({ drill }: { drill: typeof coreDrills[0] }) {
  const c = colorMap[drill.color]
  return (
    <Link
      href={`/speaking-drills/${drill.slug}`}
      className={`group block bg-gradient-to-r ${c.bg} backdrop-blur-sm border ${c.border} ${c.hoverBorder} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">{drill.name}</h3>
          <p className={`text-sm ${c.text} font-medium`}>For {drill.forWho}</p>
        </div>
        <div className={`${c.tag} ${c.tagText} px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 flex-shrink-0`}>
          {drill.duration}
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{drill.description}</p>
      <div className={`mt-4 ${c.text} text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
        Start drill
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

export default function SpeakingDrillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                Speaking Drills
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
              Interactive practice sessions to strengthen your speaking skills.
              Each drill is designed to build confidence, clarity, and presence.
            </p>
            <p className="text-gray-400">
              New here? Start with <strong className="text-green-300">Body Ready</strong> to warm up, then pick a drill that matches your challenge.
            </p>
          </div>
        </div>
      </section>

      {/* Email Gate wraps everything */}
      <section className="pb-20">
        <div className="container-max section-padding">
          <EmailGate>
            <div className="max-w-5xl mx-auto">

              {/* === ESSENTIALS: Start Here === */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-green-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Before You Begin</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {essentialDrills.map((drill) => {
                    const c = colorMap[drill.tagColor]
                    return (
                      <div
                        key={drill.slug}
                        className={`bg-gradient-to-r ${c.bg} backdrop-blur-sm border-2 ${c.border} ${c.hoverBorder} rounded-xl p-6 transition-all duration-300 hover:shadow-xl`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className={`inline-block ${c.tag} ${c.tagText} px-3 py-1 rounded-full text-xs font-medium mb-2`}>
                              {drill.tag}
                            </div>
                            <h3 className="text-xl font-bold text-white">{drill.name}</h3>
                            <p className="text-gray-300 mt-1">{drill.description}</p>
                          </div>
                          <div className={`${c.tag} ${c.tagText} px-2.5 py-0.5 rounded-full text-sm font-medium ml-3 flex-shrink-0`}>
                            {drill.duration}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {drill.points.map((point) => (
                            <div key={point} className="flex items-start space-x-2">
                              <div className={`w-1.5 h-1.5 ${c.dot} rounded-full mt-1.5 flex-shrink-0`}></div>
                              <span className="text-gray-400 text-sm">{point}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={`/speaking-drills/${drill.slug}`}
                          className={`inline-flex items-center ${c.btn} ${c.btnHover} text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm`}
                        >
                          {drill.slug === 'body-ready' ? 'Start Warm-Up' : 'Start Routine'}
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* === CORE DRILLS === */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Build Core Skills</h2>
                </div>
                <p className="text-gray-400 mb-6 ml-5">Fundamental drills that work for any speaker.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {coreDrills.map((drill) => (
                    <DrillCard key={drill.slug} drill={drill} />
                  ))}
                </div>
              </div>

              {/* === TARGETED DRILLS === */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 bg-purple-400 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Target Your Pattern</h2>
                </div>
                <p className="text-gray-400 mb-6 ml-5">Pick the drill that matches your speaking challenge.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {targetedDrills.map((drill) => (
                    <DrillCard key={drill.slug} drill={drill} />
                  ))}
                </div>
              </div>

              {/* === SUGGESTED FIRST SESSION === */}
              <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-3">Not sure where to start?</h3>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                  Try this 10-minute first session: <strong className="text-green-300">Body Ready</strong> (2 min warm-up)
                  followed by <strong className="text-blue-300">5-Minute Speaking Workout</strong> (5 min core practice).
                </p>
                <Link
                  href="/speaking-drills/body-ready"
                  className="inline-flex items-center bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start First Session
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

            </div>
          </EmailGate>
        </div>
      </section>

      <Footer />
    </main>
  )
}
