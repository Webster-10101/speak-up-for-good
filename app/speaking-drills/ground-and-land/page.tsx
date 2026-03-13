'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const GROUNDING_PROMPTS = [
  'Something that genuinely matters to you',
  'A moment you felt truly connected to someone',
  'Why you do what you do',
  'Something you want people to understand about you',
  'A truth you\'ve learned the hard way',
  'What you wish you\'d known earlier',
  'A person who shaped who you are',
  'What you\'re really trying to say',
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function GroundAndLandPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  const generateRandomSession = () => {
    const shuffled = [...GROUNDING_PROMPTS].sort(() => Math.random() - 0.5)
    setSelectedPrompts(shuffled.slice(0, 3))
  }

  const generateGroundingDrill = (prompts: string[]) => {
    const steps: DrillStep[] = [
      {
        id: 'settle',
        title: 'Settle Into Your Body',
        duration: 45,
        type: 'warmup' as const,
        instructions: [
          'Stand still. Feel your feet on the ground.',
          'Take three slow breaths. Longer exhale than inhale.',
          'Drop your shoulders. Soften your face.',
          'You\'re not performing right now. You\'re arriving.',
          'Find the pace of your natural breath.'
        ],
        explanation: 'Performers often live in their energy, not their body. Grounding brings you back to yourself.'
      },
      {
        id: 'slow-truth',
        title: 'Slow Truth',
        duration: 75,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[0]}"`,
          'Speak on this at HALF your normal speed.',
          'Feel each word before you say it.',
          'No performance. No energy tricks.',
          'Just slow, grounded truth.',
          'If it feels boring, you\'re doing it right.'
        ],
        explanation: 'Slowing down forces you to mean what you say. Energy can\'t carry you — only substance can.'
      },
      {
        id: 'eye-contact',
        title: 'Speak to One Person',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[1]}"`,
          'Imagine one specific person in front of you.',
          'Someone you respect. Someone who deserves your honesty.',
          'Speak directly to them. Not a crowd — one person.',
          'Make it land for THEM.',
          'Connection over performance.'
        ],
        explanation: 'Performers often spray energy at "the audience." Speaking to one person creates real connection.'
      },
      {
        id: 'mean-it',
        title: 'Mean Every Word',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[2]}"`,
          'Before each sentence, ask: "Do I mean this?"',
          'If not, don\'t say it. Find what you actually mean.',
          'Cut the filler. Cut the performance.',
          'Only say what\'s true.',
          'Less words, more weight.'
        ],
        explanation: 'When you mean every word, you don\'t need energy to carry the message. The truth carries itself.'
      },
      {
        id: 'reflection',
        title: 'What Shifted?',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'How did that feel compared to your normal speaking?',
          'What did you have to let go of?',
          'Notice: grounded doesn\'t mean boring. It means real.',
          'Energy is a tool. Grounding is the foundation.'
        ],
        explanation: 'Performers need to learn that presence doesn\'t require performance. Grounding is its own power.'
      }
    ]

    return {
      title: 'Ground & Land',
      description: 'Slow down, drop the performance, and speak with genuine presence',
      totalDuration: 270, // ~4.5 min
      steps
    }
  }

  const groundingDrill = useMemo(
    () => generateGroundingDrill(selectedPrompts),
    [selectedPrompts]
  )

  const handleStartSession = () => {
    generateRandomSession()
    setSessionStarted(true)
  }

  const handleSessionComplete = () => {
    setSessionComplete(true)
  }

  const handleRestart = () => {
    setSessionStarted(false)
    setSessionComplete(false)
  }

  if (sessionComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-stone-800">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-stone-500/20 to-amber-700/20 border border-stone-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Grounded</h1>
                <p className="text-2xl text-gray-300 mb-8">You slowed down. You meant it. That&apos;s presence.</p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Slowing down to half speed</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking to one person, not a crowd</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Meaning every word</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Presence without performance</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Grounding isn&apos;t the opposite of energy — it&apos;s the foundation for it.
                  When you&apos;re grounded, your energy becomes a choice, not a crutch.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-stone-600 hover:bg-stone-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Practice Again
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
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

  if (!sessionStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-stone-800">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-stone-400 hover:text-stone-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Ground & Land</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Performers bring energy — sometimes too much. They entertain, but they don&apos;t always land.
                  This drill trains you to slow down, drop the performance, and speak with genuine presence.
                </p>
              </div>

              <div className="bg-stone-500/10 border border-stone-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">For the Performer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-300 mb-2">You might recognise:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">-</span>
                        <span>Using energy to cover uncertainty</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">-</span>
                        <span>Speaking to &quot;the room&quot; instead of individuals</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">-</span>
                        <span>Entertaining but not connecting</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-300 mb-2">After this drill:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">+</span>
                        <span>You&apos;ll know what grounded feels like</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">+</span>
                        <span>You&apos;ll connect more deeply</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1">+</span>
                        <span>Energy becomes a choice, not a default</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Drill Structure</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-stone-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <h3 className="text-white font-semibold">Settle Into Your Body</h3>
                        <p className="text-gray-400 text-sm">Arrive before you perform</p>
                      </div>
                    </div>
                    <div className="text-stone-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-stone-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <h3 className="text-white font-semibold">Slow Truth</h3>
                        <p className="text-gray-400 text-sm">Half speed, no performance</p>
                      </div>
                    </div>
                    <div className="text-stone-300 font-semibold">1.25 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-stone-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <h3 className="text-white font-semibold">Speak to One Person</h3>
                        <p className="text-gray-400 text-sm">Connection over broadcast</p>
                      </div>
                    </div>
                    <div className="text-stone-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-stone-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <h3 className="text-white font-semibold">Mean Every Word</h3>
                        <p className="text-gray-400 text-sm">Only say what&apos;s true</p>
                      </div>
                    </div>
                    <div className="text-stone-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-stone-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <h3 className="text-white font-semibold">Reflection</h3>
                        <p className="text-gray-400 text-sm">What did you let go of?</p>
                      </div>
                    </div>
                    <div className="text-stone-300 font-semibold">30s</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-stone-600 to-stone-500 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">4.5 minutes. Slow down. Mean it.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-stone-800">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={groundingDrill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
