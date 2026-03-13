'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const EXPANSION_PROMPTS = [
  'A trip you took',
  'Someone you admire',
  'Your morning today',
  'A meal you loved',
  'A project you worked on',
  'Something that surprised you recently',
  'A place that means something to you',
  'A challenge you faced',
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function DialItUpPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  const generateRandomSession = () => {
    const shuffled = [...EXPANSION_PROMPTS].sort(() => Math.random() - 0.5)
    setSelectedPrompts(shuffled.slice(0, 3))
  }

  const generateExpansionDrill = (prompts: string[]) => {
    const steps: DrillStep[] = [
      {
        id: 'energy-unlock',
        title: 'Unlock Your Energy',
        duration: 45,
        type: 'warmup' as const,
        instructions: [
          'Shake out your body. Big movements.',
          'Make some noise — ahh, ohh, hah!',
          'Say "I have something to say!" — loud and clear.',
          'Say it again, bigger: "I have something to SAY!"',
          'That\'s the energy we\'re building.'
        ],
        explanation: 'Minimalists often hold back physically. Unlocking the body unlocks the voice.'
      },
      {
        id: 'fill-the-minute',
        title: 'Fill the Minute',
        duration: 75,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[0]}"`,
          'You MUST speak for the full 60 seconds.',
          'No stopping. No "that\'s it." No trailing off.',
          'Add details. Add colour. Add tangents.',
          'If you run out of things to say, describe what you see in your mind.',
          'The goal is EXPANSION, not efficiency.'
        ],
        explanation: 'Minimalists stop too early. This forces you to find more, say more, expand more.'
      },
      {
        id: 'double-the-details',
        title: 'Double the Details',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[1]}"`,
          'Describe this with TWICE the detail you normally would.',
          'What did it look like? Sound like? Feel like?',
          'What colour? What texture? What temperature?',
          'Make me see it, hear it, feel it.',
          'Vivid beats brief.'
        ],
        explanation: 'Sensory details make your speaking come alive. Minimalists often skip them.'
      },
      {
        id: 'emotional-expansion',
        title: 'Say How You Felt',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[2]}"`,
          'Tell this story, but focus on how you FELT.',
          'Not just facts — emotions.',
          'Were you excited? Nervous? Relieved? Frustrated?',
          'Say it out loud: "I felt..."',
          'Emotion is information. Share it.'
        ],
        explanation: 'Minimalists often share facts without feelings. Adding emotion creates connection.'
      },
      {
        id: 'reflection',
        title: 'What Opened Up?',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'How did it feel to expand?',
          'What details or feelings surprised you?',
          'Notice: you have more to say than you think.',
          'Expansion is available. You just need to choose it.'
        ],
        explanation: 'Recognising that you CAN expand is the first step to doing it naturally.'
      }
    ]

    return {
      title: 'Dial It Up',
      description: 'Train yourself to expand, add colour, and fill the space with energy',
      totalDuration: 270, // ~4.5 min
      steps
    }
  }

  const expansionDrill = useMemo(
    () => generateExpansionDrill(selectedPrompts),
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-pink-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-pink-500/20 to-rose-400/20 border border-pink-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Expanded</h1>
                <p className="text-2xl text-gray-300 mb-8">You filled the space. You added colour. That&apos;s growth.</p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking for the full time</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Adding sensory details</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Sharing emotions, not just facts</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Choosing expansion over efficiency</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Brevity has its place. But sometimes you need to fill the space.
                  Now you know you can.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-pink-500 hover:bg-pink-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-pink-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Dial It Up</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Minimalists are efficient — sometimes too efficient. They leave out the colour, the detail, the emotion.
                  This drill trains you to expand: fill the space, add texture, and let your voice take up room.
                </p>
              </div>

              <div className="bg-pink-500/10 border border-pink-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">For the Minimalist</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-pink-300 mb-2">You might recognise:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">-</span>
                        <span>Answers that are technically complete but feel flat</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">-</span>
                        <span>Stopping before you need to</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">-</span>
                        <span>People asking &quot;can you tell me more?&quot;</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pink-300 mb-2">After this drill:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">+</span>
                        <span>You&apos;ll know you can fill time when needed</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">+</span>
                        <span>You&apos;ll have tools to add colour and detail</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-pink-400 mt-1">+</span>
                        <span>Expansion will feel more natural</span>
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
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <h3 className="text-white font-semibold">Unlock Your Energy</h3>
                        <p className="text-gray-400 text-sm">Get loud and physical</p>
                      </div>
                    </div>
                    <div className="text-pink-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <h3 className="text-white font-semibold">Fill the Minute</h3>
                        <p className="text-gray-400 text-sm">Speak for 60 seconds — no stopping</p>
                      </div>
                    </div>
                    <div className="text-pink-300 font-semibold">1.25 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <h3 className="text-white font-semibold">Double the Details</h3>
                        <p className="text-gray-400 text-sm">Add sensory colour</p>
                      </div>
                    </div>
                    <div className="text-pink-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <h3 className="text-white font-semibold">Say How You Felt</h3>
                        <p className="text-gray-400 text-sm">Add emotional texture</p>
                      </div>
                    </div>
                    <div className="text-pink-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <h3 className="text-white font-semibold">Reflection</h3>
                        <p className="text-gray-400 text-sm">What opened up?</p>
                      </div>
                    </div>
                    <div className="text-pink-300 font-semibold">30s</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">4.5 minutes. Fill the space.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-pink-900">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={expansionDrill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
