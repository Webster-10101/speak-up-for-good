'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const PROMPTS = [
  'Why you chose your current job or career',
  'What you did last weekend',
  'A project you\'re working on right now',
  'Why a book or film you like is worth experiencing',
  'How to make your favourite meal',
  'What your company or team does',
  'A decision you\'re currently weighing',
  'Why you live where you live',
  'What you\'re most excited about right now',
  'A skill you\'ve been learning lately',
  'Why you started your business or side project',
  'What makes a good leader',
  'Your morning routine',
  'A challenge you recently overcame',
  'What you\'d do with an extra hour each day',
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function TheEditPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  // Generate random subset of prompts
  const generateRandomPrompts = (): string[] => {
    const shuffled = [...PROMPTS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }

  // Generate dynamic drill configuration
  const generateEditDrill = (prompts: string[]) => {
    const steps: DrillStep[] = [
      // Warmup step
      {
        id: 'warmup',
        title: 'Quick Check-In',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'Speak about your day so far - just 30 seconds',
          'Don\'t think, just talk',
          'Now... summarise that in ONE sentence',
          'Notice: you CAN say it shorter. You just did.'
        ],
        explanation: 'This warm-up proves you can compress. The rest of the drill builds on this.'
      },

      // Half It challenge
      {
        id: 'half-it',
        title: 'Half It',
        duration: 90,
        type: 'challenge' as const,
        instructions: [
          `Your topic: "${prompts[0]}"`,
          'First: speak on this topic for 30 seconds (full version)',
          'Then: say the SAME thing in 15 seconds (edited version)',
          'Finally: say it in ONE sentence (headline version)',
          'The constraint forces clarity - trust it'
        ],
        explanation: 'Halving forces you to identify what actually matters. Most content is filler.'
      },

      // One Breath challenge
      {
        id: 'one-breath',
        title: 'One Breath',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Your topic: "${prompts[1]}"`,
          'Take one deep breath',
          'Answer in a single breath - when you run out of air, you\'re done',
          'No cheating with quick inhales',
          'The breath is your editor - it decides when you stop'
        ],
        explanation: 'Physical constraint creates natural editing. Your body knows when enough is enough.'
      },

      // Land the Plane challenge
      {
        id: 'land-the-plane',
        title: 'Land the Plane',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Your topic: "${prompts[2]}"`,
          'Speak for 45 seconds on this topic',
          'But you MUST end with a clear, punchy final sentence',
          'No trailing off. No "so yeah..." No fading out.',
          'Practise the ending - it\'s the part people remember'
        ],
        explanation: 'Ramblers often can\'t end. This trains you to land with intention.'
      },

      // Reflection step
      {
        id: 'reflection',
        title: 'What Did You Cut?',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'What did you cut in the "Half It" exercise?',
          'Was the short version worse, or actually better?',
          'What makes ending hard for you?',
          'Notice: you CAN be brief. You just proved it.'
        ],
        explanation: 'Reflection builds awareness of your rambling patterns so you can catch them.'
      }
    ]

    return {
      title: 'The Edit',
      description: 'Train yourself to say more with less and land the point clearly',
      totalDuration: 300, // 5 minutes
      steps
    }
  }

  // Generate drill with useMemo for performance
  const editDrill = useMemo(
    () => generateEditDrill(selectedPrompts),
    [selectedPrompts]
  )

  const handleStartSession = () => {
    setSelectedPrompts(generateRandomPrompts())
    setSessionStarted(true)
  }

  const handleSessionComplete = () => {
    setSessionComplete(true)
  }

  const handleRestart = () => {
    setSessionStarted(false)
    setSessionComplete(false)
  }

  // Completion Screen
  if (sessionComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-cyan-500/20 to-teal-400/20 border border-cyan-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Edit Complete
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You practised saying more with less.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Compressing ideas to their essence</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Using breath as an editing tool</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Ending with intention, not trailing off</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Identifying what actually matters</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Brevity is power. Every time you cut, you make room for what matters.
                  Do this drill regularly and watch your rambling dissolve.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Practice Again
                  </button>
                  <Link
                    href="/speaking-drills"
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    More Drills
                  </Link>
                  <Link
                    href="/"
                    className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Book Coaching
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  // Intro Screen
  if (!sessionStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  The Edit
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  You know more than you need to say. This drill trains you to find the signal
                  in your noise — to say the same thing in half the words, then one sentence,
                  then one breath. Brevity is a skill. Let&apos;s build it.
                </p>
              </div>

              {/* Who This Is For */}
              <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">For the Rambler</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">You might recognise:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">-</span>
                        <span>Starting answers with too much context</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">-</span>
                        <span>Trailing off instead of ending cleanly</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">-</span>
                        <span>People&apos;s eyes glazing over mid-story</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">After this drill:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">+</span>
                        <span>You&apos;ll know you CAN be brief</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">+</span>
                        <span>You&apos;ll have tools to self-edit in real-time</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">+</span>
                        <span>You&apos;ll end with intention, not apology</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Drill Structure</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Quick Check-In</h3>
                        <p className="text-gray-400 text-sm">Speak freely, then compress to one sentence</p>
                      </div>
                    </div>
                    <div className="text-cyan-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Half It</h3>
                        <p className="text-gray-400 text-sm">30 seconds → 15 seconds → one sentence</p>
                      </div>
                    </div>
                    <div className="text-cyan-300 font-semibold">1.5 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">One Breath</h3>
                        <p className="text-gray-400 text-sm">When you run out of air, you&apos;re done</p>
                      </div>
                    </div>
                    <div className="text-cyan-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Land the Plane</h3>
                        <p className="text-gray-400 text-sm">End with a punchy final sentence</p>
                      </div>
                    </div>
                    <div className="text-cyan-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        5
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Reflection</h3>
                        <p className="text-gray-400 text-sm">What did you cut? Was it better?</p>
                      </div>
                    </div>
                    <div className="text-cyan-300 font-semibold">30 sec</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">5 minutes to sharper, cleaner speaking.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  // Active Session
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={editDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
