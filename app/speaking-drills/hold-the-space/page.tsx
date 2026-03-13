'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const PAUSE_PROMPTS = [
  'Something you\'re proud of',
  'A belief you hold strongly',
  'What you want from your career',
  'A moment that changed you',
  'Why your work matters',
  'Something you\'ve learned recently',
  'What you stand for',
  'A challenge you overcame',
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function HoldTheSpacePage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  const generateRandomSession = () => {
    const shuffled = [...PAUSE_PROMPTS].sort(() => Math.random() - 0.5)
    setSelectedPrompts(shuffled.slice(0, 3))
  }

  const generatePauseDrill = (prompts: string[]) => {
    const steps: DrillStep[] = [
      {
        id: 'silence-intro',
        title: 'Meet the Silence',
        duration: 45,
        type: 'warmup' as const,
        instructions: [
          'Stand still. Say nothing.',
          'Notice the urge to fill the silence.',
          'Don\'t. Just breathe.',
          'This discomfort is what we\'re training.',
          'Silence is not empty — it\'s full of presence.'
        ],
        explanation: 'People pleasers rush to fill silence because it feels awkward. Learning to hold space changes everything.'
      },
      {
        id: 'pause-before',
        title: 'Pause Before You Speak',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[0]}"`,
          'Before you say anything, pause for 3 full seconds.',
          'Count in your head: one... two... three...',
          'THEN speak. One clear sentence.',
          'Pause again. Then continue.',
          'Every sentence gets a pause before it.'
        ],
        explanation: 'The pause before speaking signals confidence and gives weight to your words.'
      },
      {
        id: 'pause-after',
        title: 'Pause After You Speak',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[1]}"`,
          'Say one sentence. Then STOP.',
          'Hold the silence for 3 seconds after.',
          'Don\'t explain. Don\'t add. Don\'t soften.',
          'Let your words land.',
          'Then — and only then — continue.'
        ],
        explanation: 'Trailing off or over-explaining weakens your message. Clean endings with silence let your point land.'
      },
      {
        id: 'the-long-pause',
        title: 'The Long Pause',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${prompts[2]}"`,
          'Speak for 15 seconds on this topic.',
          'Then pause for 5 FULL seconds. (Count them.)',
          'Feel the discomfort. Stay in it.',
          'Then deliver your final sentence with conviction.',
          'The pause is the power move.'
        ],
        explanation: '5 seconds of silence feels like an eternity when you\'re not used to it. That\'s exactly why you need to practise it.'
      },
      {
        id: 'reflection',
        title: 'What Did You Notice?',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'How did the silence feel?',
          'Did you want to fill it? Explain? Soften?',
          'Notice: you held the space. You can do this.',
          'Silence is not weakness — it\'s presence.'
        ],
        explanation: 'Awareness of your urge to fill silence is the first step to controlling it.'
      }
    ]

    return {
      title: 'Hold the Space',
      description: 'Train yourself to use silence with confidence instead of rushing to fill it',
      totalDuration: 255, // ~4 min
      steps
    }
  }

  const pauseDrill = useMemo(
    () => generatePauseDrill(selectedPrompts),
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-indigo-500/20 to-violet-400/20 border border-indigo-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Space Held</h1>
                <p className="text-2xl text-gray-300 mb-8">You sat in the silence. That takes courage.</p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Pausing before speaking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Letting words land without explaining</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Holding uncomfortable silence</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Using pause as a power tool</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Silence is presence. The more you practise holding space,
                  the more confident and grounded you&apos;ll appear.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Hold the Space</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  People pleasers rush to fill silence. They over-explain, soften, and trail off
                  because quiet feels uncomfortable. This drill trains you to pause with purpose
                  and let your words land.
                </p>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">For the People Pleaser</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">You might recognise:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">-</span>
                        <span>Rushing to fill any silence</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">-</span>
                        <span>Adding &quot;does that make sense?&quot; after every point</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">-</span>
                        <span>Trailing off or softening at the end</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">After this drill:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">+</span>
                        <span>Silence will feel less uncomfortable</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">+</span>
                        <span>Your endings will be cleaner</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400 mt-1">+</span>
                        <span>You&apos;ll use pause as a tool, not avoid it</span>
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
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <h3 className="text-white font-semibold">Meet the Silence</h3>
                        <p className="text-gray-400 text-sm">Sit with discomfort</p>
                      </div>
                    </div>
                    <div className="text-indigo-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <h3 className="text-white font-semibold">Pause Before</h3>
                        <p className="text-gray-400 text-sm">3 seconds before each sentence</p>
                      </div>
                    </div>
                    <div className="text-indigo-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <h3 className="text-white font-semibold">Pause After</h3>
                        <p className="text-gray-400 text-sm">Let words land without explaining</p>
                      </div>
                    </div>
                    <div className="text-indigo-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <h3 className="text-white font-semibold">The Long Pause</h3>
                        <p className="text-gray-400 text-sm">5 seconds of silence mid-speech</p>
                      </div>
                    </div>
                    <div className="text-indigo-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <h3 className="text-white font-semibold">Reflection</h3>
                        <p className="text-gray-400 text-sm">Notice what you felt</p>
                      </div>
                    </div>
                    <div className="text-indigo-300 font-semibold">30s</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-indigo-500 to-violet-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">4 minutes. Embrace the silence.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={pauseDrill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
