'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const CONVICTION_PROMPTS = [
  'Why your work matters',
  'Something you believe that others might disagree with',
  'Why someone should hire you',
  'A change you think needs to happen in your industry',
  'Why your approach is the right one',
  'Something you\'ve learned that everyone should know',
  'Why your product or service is worth paying for',
  'A decision you made that you stand behind',
  'Why your perspective is valuable',
  'Something you\'re certain about',
  'Why people should listen to you on this topic',
  'A hill you\'re willing to die on',
]

const CONVICTION_STARTERS = [
  'This is absolutely critical because...',
  'I\'m certain about this because...',
  'Here\'s what I know for sure...',
  'This matters more than people realise because...',
  'I\'ve seen this enough to know that...',
  'The truth is...',
  'What most people miss is...',
  'I\'m completely convinced that...',
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function ConvictionRepsPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])
  const [selectedStarters, setSelectedStarters] = useState<string[]>([])

  const generateRandomSession = () => {
    const shuffledPrompts = [...CONVICTION_PROMPTS].sort(() => Math.random() - 0.5)
    const shuffledStarters = [...CONVICTION_STARTERS].sort(() => Math.random() - 0.5)
    setSelectedPrompts(shuffledPrompts.slice(0, 4))
    setSelectedStarters(shuffledStarters.slice(0, 4))
  }

  const generateConvictionDrill = (prompts: string[], starters: string[]) => {
    const steps: DrillStep[] = [
      {
        id: 'warmup',
        title: 'Find Your Voice',
        duration: 45,
        type: 'warmup' as const,
        instructions: [
          'Stand tall. Feet grounded. Shoulders back.',
          'Take a deep breath and say "YES" out loud — with conviction',
          'Say it again, louder: "YES."',
          'Now say "I believe this." Like you mean it.',
          'That\'s the energy we\'re practising.'
        ],
        explanation: 'Conviction starts in your body. When you stand and speak with certainty, your words carry more weight.'
      },
      ...prompts.map((prompt, index) => ({
        id: `rep-${index + 1}`,
        title: `Rep ${index + 1}: ${prompt}`,
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompt}"`,
          `Start with: "${starters[index]}"`,
          'Speak with full conviction — no hedging, no "I think", no "maybe"',
          'Use declarative statements. Own your position.',
          'If you catch yourself softening, restart stronger.'
        ],
        explanation: 'Repetition with forced conviction language rewires your default speaking patterns.'
      })),
      {
        id: 'reflection',
        title: 'Notice the Shift',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'How did it feel to speak without hedging?',
          'Which statement felt most natural? Most uncomfortable?',
          'Notice: you CAN speak with conviction. You just did.',
          'The discomfort is the growth.'
        ],
        explanation: 'Self-doubt often hides behind "reasonable" language. Noticing this is the first step to changing it.'
      }
    ]

    return {
      title: 'Conviction Reps',
      description: 'Train yourself to speak with certainty and stop undermining your own points',
      totalDuration: 315, // ~5 min
      steps
    }
  }

  const convictionDrill = useMemo(
    () => generateConvictionDrill(selectedPrompts, selectedStarters),
    [selectedPrompts, selectedStarters]
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-red-500/20 to-orange-400/20 border border-red-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Conviction Built</h1>
                <p className="text-2xl text-gray-300 mb-8">You spoke without hedging. That&apos;s the skill.</p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking with declarative certainty</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Eliminating hedge words</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Owning your perspective</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Starting strong with conviction starters</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  The more you practise conviction, the more natural it becomes.
                  Your ideas deserve to be stated clearly.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Conviction Reps</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Self-doubters hedge. They say &quot;I think&quot; and &quot;maybe&quot; and &quot;sort of.&quot;
                  This drill forces you to speak with certainty — no qualifiers, no softening.
                  Conviction is a muscle. Let&apos;s build it.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">For the Self-Doubter</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">You might recognise:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">-</span>
                        <span>&quot;I think maybe...&quot; &quot;Sort of...&quot; &quot;I guess...&quot;</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">-</span>
                        <span>Undermining your point before you finish</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">-</span>
                        <span>Ending with &quot;...but I could be wrong&quot;</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">After this drill:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">+</span>
                        <span>You&apos;ll feel what conviction sounds like</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">+</span>
                        <span>You&apos;ll have starter phrases to use</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">+</span>
                        <span>You&apos;ll catch yourself hedging faster</span>
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
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <h3 className="text-white font-semibold">Find Your Voice</h3>
                        <p className="text-gray-400 text-sm">Warm up with bold statements</p>
                      </div>
                    </div>
                    <div className="text-red-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2-5</div>
                      <div>
                        <h3 className="text-white font-semibold">4 Conviction Reps</h3>
                        <p className="text-gray-400 text-sm">Speak on topics with forced conviction starters</p>
                      </div>
                    </div>
                    <div className="text-red-300 font-semibold">4 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">6</div>
                      <div>
                        <h3 className="text-white font-semibold">Notice the Shift</h3>
                        <p className="text-gray-400 text-sm">Reflect on how conviction felt</p>
                      </div>
                    </div>
                    <div className="text-red-300 font-semibold">30s</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-red-500 to-orange-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">5 minutes. No hedging allowed.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={convictionDrill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
