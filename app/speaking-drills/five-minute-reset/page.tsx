'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const fiveMinuteResetDrill = {
  title: 'The 5-Minute Reset',
  description: 'A pre-speaking reset to regulate your nervous system and meet nervous energy with presence',
  totalDuration: 300, // 5 minutes
  steps: [
    {
      id: 'wake-body',
      title: 'Wake the Body',
      duration: 90,
      type: 'warmup' as const,
      instructions: [
        'Shake out your hands and arms for 10-15 seconds',
        'Roll your shoulders back a few times, then forward',
        'Open your mouth wide, stretch your jaw, scrunch and release your face',
        'Bounce lightly on your feet or do a few small jumps',
        'Let any sounds come out naturally as you move'
      ],
      explanation: 'Light movement releases held tension and brings you into your body before you speak.'
    },
    {
      id: 'breathe-orient',
      title: 'Breathe and Orient',
      duration: 75,
      type: 'warmup' as const,
      instructions: [
        'Stand still. Feel your feet on the ground.',
        'Take 3-4 slow breaths - longer exhale than inhale',
        'Let your shoulders drop. Soften your belly.',
        'Notice the space around you without looking around',
        'Feel the weight of your body settling downward'
      ],
      explanation: 'Slow breathing activates your parasympathetic nervous system and settles scattered attention.'
    },
    {
      id: 'welcome-energy',
      title: 'Welcome the Energy',
      duration: 60,
      type: 'reflection' as const,
      instructions: [
        'Notice where you feel nerves or excitement in your body',
        'It might be your chest, stomach, throat, or hands',
        'Don&apos;t try to change it or make it go away',
        'Just notice it and let it be there',
        'This energy is fuel, not a problem to fix'
      ],
      explanation: 'Resisting nervous energy creates more tension. Allowing it lets it move through you.'
    },
    {
      id: 'clarify-intent',
      title: 'Clarify Intent',
      duration: 45,
      type: 'challenge' as const,
      instructions: [
        'Who are you about to speak to? Picture them briefly.',
        'What&apos;s one thing you want them to walk away with?',
        'What&apos;s your first line? Just the opener, nothing more.',
        'Don&apos;t rehearse - just know how you&apos;ll begin'
      ],
      explanation: 'A clear starting point prevents the freeze that comes from trying to hold everything at once.'
    },
    {
      id: 'commit-step',
      title: 'Commit and Step Forward',
      duration: 30,
      type: 'challenge' as const,
      instructions: [
        'Take one grounding breath',
        'Say to yourself: "I&apos;m ready to begin"',
        'Take a physical step forward or stand taller',
        'Stop here. You&apos;re done preparing.',
        'Go.'
      ],
      explanation: 'A clear internal commitment ends the preparation loop and lets you step into action.'
    }
  ]
}

export default function FiveMinuteResetPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)

  const handleStartSession = () => {
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Reset Complete
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You&apos;re ready. Go speak.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Did:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Woke up your body and released tension</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Settled your breath and attention</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Met your nervous energy without fighting it</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Got clear on your intent and first line</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Use this drill any time you have 5 minutes before speaking.
                  The more you practice, the faster you&apos;ll be able to reset under pressure.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
                    className="bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

  if (!sessionStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  The 5-Minute Reset
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  A hard-stop, 5-minute reset to regulate your nervous system before speaking.
                  This drill helps you shift into your body and meet nervous energy with presence
                  rather than trying to suppress it.
                </p>
              </div>

              {/* Preparation Tips */}
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Before You Start</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">What You&apos;ll Need:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>A space where you can stand and move</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>5 minutes before your speaking moment</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Nothing else - no prep, no notes review</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">How to Use This:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Follow each step physically, not just mentally</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Don&apos;t rush - use the full time for each phase</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>When it&apos;s done, stop. Go speak.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Drill Overview */}
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Reset Structure</h2>
                <div className="space-y-4">
                  {fiveMinuteResetDrill.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{step.title}</h3>
                          <p className="text-gray-400 text-sm capitalize">{step.type}</p>
                        </div>
                      </div>
                      <div className="text-blue-300 font-semibold">
                        {Math.floor(step.duration / 60)}:{(step.duration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Reset
                </button>
                <p className="text-gray-400 mt-4">Stand up. Take a breath. Let&apos;s begin.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={fiveMinuteResetDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
