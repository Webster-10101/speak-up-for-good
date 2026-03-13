'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

interface TopicPair {
  id: string
  topicA: string
  topicB: string
}

const TOPIC_PAIRS: TopicPair[] = [
  // Serious + Silly
  { id: 'tax-dance', topicA: 'Tax returns', topicB: 'Interpretive dance' },
  { id: 'climate-cereal', topicA: 'Climate change', topicB: 'Breakfast cereals' },
  { id: 'interview-knights', topicA: 'Job interviews', topicB: 'Medieval knights' },
  { id: 'meditation-trucks', topicA: 'Meditation apps', topicB: 'Monster trucks' },
  { id: 'meetings-puppies', topicA: 'Board meetings', topicB: 'Puppies' },

  // Professional + Random
  { id: 'spreadsheets-magic', topicA: 'Spreadsheets', topicB: 'Stage magic' },
  { id: 'linkedin-dinosaurs', topicA: 'LinkedIn profiles', topicB: 'Dinosaurs' },
  { id: 'deadlines-cheese', topicA: 'Project deadlines', topicB: 'Artisan cheese' },
  { id: 'emails-pirates', topicA: 'Email inbox', topicB: 'Pirates' },
  { id: 'performance-karaoke', topicA: 'Performance reviews', topicB: 'Karaoke night' },

  // Abstract + Concrete
  { id: 'ambition-houseplants', topicA: 'Ambition', topicB: 'Houseplants' },
  { id: 'trust-furniture', topicA: 'Trust', topicB: 'IKEA furniture' },
  { id: 'failure-cooking', topicA: 'Failure', topicB: 'Cooking disasters' },
  { id: 'success-pets', topicA: 'Success', topicB: 'Unusual pets' },
  { id: 'anxiety-weather', topicA: 'Anxiety', topicB: 'British weather' },

  // Tech + Old-fashioned
  { id: 'ai-grandma', topicA: 'Artificial intelligence', topicB: 'Your grandmother' },
  { id: 'blockchain-knitting', topicA: 'Blockchain', topicB: 'Knitting circles' },
  { id: 'social-farming', topicA: 'Social media', topicB: 'Victorian farming' },
  { id: 'zoom-carrier', topicA: 'Zoom calls', topicB: 'Carrier pigeons' },
  { id: 'startup-medieval', topicA: 'Startup culture', topicB: 'Medieval peasants' },

  // Unexpected combinations
  { id: 'therapy-sports', topicA: 'Therapy', topicB: 'Extreme sports' },
  { id: 'networking-wildlife', topicA: 'Networking events', topicB: 'Wildlife documentaries' },
  { id: 'retirement-festivals', topicA: 'Retirement planning', topicB: 'Music festivals' },
  { id: 'public-speaking-cats', topicA: 'Public speaking', topicB: 'Cat behaviour' },
  { id: 'leadership-reality', topicA: 'Leadership', topicB: 'Reality TV shows' },
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function FindTheAbsurdPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPairs, setSelectedPairs] = useState<TopicPair[]>([])

  // Generate random subset of topic pairs
  const generateRandomSession = (): TopicPair[] => {
    const shuffled = [...TOPIC_PAIRS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }

  // Generate dynamic drill configuration
  const generateAbsurdDrill = (pairs: TopicPair[]) => {
    const steps: DrillStep[] = [
      // Warmup step
      {
        id: 'loosen-up',
        title: 'Loosen Up',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'Shake out your body - hands, arms, shoulders',
          'Make some silly sounds - sighs, groans, high-pitched noises',
          'Pull some ridiculous faces - exaggerate everything',
          'Say "blah blah blah" in different voices and emotions',
          'Let yourself feel a bit stupid - that\'s the point'
        ],
        explanation: 'Comedy requires physical looseness. Tension kills humour. Getting silly first makes the absurd connections flow easier.'
      },

      // Dynamic topic pair steps
      ...pairs.map((pair, index) => ({
        id: `round-${index + 1}`,
        title: `${pair.topicA} + ${pair.topicB}`,
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Your topics: "${pair.topicA}" and "${pair.topicB}"`,
          'Find the absurd connection between these two things',
          'Say it out loud - make it a bit, a joke, a ridiculous observation',
          'Commit to it fully, even if it\'s not that funny',
          'The goal is speed and playfulness, not perfection'
        ],
        explanation: 'Finding unexpected connections is the heart of humour. The more you practice, the faster your brain makes these leaps.'
      })),

      // Reflection step
      {
        id: 'reflection',
        title: 'What Made It Click?',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'Which connection came easiest?',
          'Which one made you actually laugh?',
          'What helped - exaggeration? Specificity? Absurd logic?',
          'Notice: you CAN do this. Your brain found the funny.'
        ],
        explanation: 'Reflecting on what worked builds your comedy instincts for when it matters.'
      }
    ]

    return {
      title: 'Find the Absurd',
      description: 'Train your brain to find lightness and unexpected connections',
      totalDuration: 60 + (pairs.length * 60) + 30, // warmup + rounds + reflection
      steps
    }
  }

  // Generate drill with useMemo for performance
  const absurdDrill = useMemo(
    () => generateAbsurdDrill(selectedPairs),
    [selectedPairs]
  )

  const handleStartSession = () => {
    setSelectedPairs(generateRandomSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-400/20 border border-amber-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Nice Work!
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You found the absurd in 5 random combinations.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Practiced:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Finding unexpected connections fast</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Committing to an idea without overthinking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Adding lightness and playfulness</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Getting comfortable being silly</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Lightness is a superpower in speaking. When you can find the funny,
                  you can connect with any audience. Each session trains your brain to
                  make these leaps faster.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Play Again
                  </button>
                  <Link
                    href="/speaking-drills"
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    More Drills
                  </Link>
                  <Link
                    href="/"
                    className="bg-gradient-to-r from-amber-500 to-orange-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Find the Absurd
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Two completely unrelated topics appear. Your job: find the absurd connection
                  and make it funny. This drill trains you to think on your feet and bring
                  lightness to any situation.
                </p>
              </div>

              {/* Why This Matters */}
              <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Lightness Matters</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-300 mb-2">The Problem:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">-</span>
                        <span>Too serious = audience disconnects</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">-</span>
                        <span>Intensity without relief is exhausting</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">-</span>
                        <span>Overthinking kills spontaneity</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-300 mb-2">The Solution:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">+</span>
                        <span>Train your brain to find the funny fast</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">+</span>
                        <span>Build comfort with playfulness</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1">+</span>
                        <span>Make unexpected connections instinctive</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Loosen Up</h3>
                        <p className="text-gray-400 text-sm">Get physically silly first</p>
                      </div>
                    </div>
                    <div className="text-amber-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        2-6
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">5 Random Rounds</h3>
                        <p className="text-gray-400 text-sm">Two topics appear - find the absurd link</p>
                      </div>
                    </div>
                    <div className="text-amber-300 font-semibold">5 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        7
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Reflection</h3>
                        <p className="text-gray-400 text-sm">What made the connections click?</p>
                      </div>
                    </div>
                    <div className="text-amber-300 font-semibold">30 sec</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-amber-500 to-orange-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">Ready to get silly? 5 random topic pairs await.</p>
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={absurdDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
