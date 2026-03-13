'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const bodyReadyDrill = {
  title: 'Body Ready',
  description: 'A 2-minute physical warm-up to prepare your body and voice for speaking',
  totalDuration: 120, // 2 minutes
  steps: [
    {
      id: 'shake-out',
      title: 'Shake It Out',
      duration: 30,
      type: 'warmup' as const,
      instructions: [
        'Shake out your hands rapidly for 10 seconds',
        'Let the shake travel up your arms to your shoulders',
        'Bounce lightly on your feet',
        'Let your whole body loosen — nothing held tight',
        'Make some noise if it helps — sighs, groans, whatever comes'
      ],
      explanation: 'Physical tension blocks your voice and presence. Shaking releases it fast.'
    },
    {
      id: 'vocal-warmup',
      title: 'Wake Your Voice',
      duration: 45,
      type: 'warmup' as const,
      instructions: [
        'Hum gently, feeling the vibration in your lips and chest',
        'Do a few lip trills (like a motorboat sound)',
        'Slide your voice from low to high and back down (vocal sirens)',
        'Say "mah mah mah" and "bee bee bee" to wake up your articulators',
        'Yawn-sigh a few times to open your throat'
      ],
      explanation: 'Your voice is an instrument. A cold instrument sounds flat. Warm it up.'
    },
    {
      id: 'posture-reset',
      title: 'Stand Ready',
      duration: 30,
      type: 'warmup' as const,
      instructions: [
        'Feel your feet firmly on the ground — weight even',
        'Let your spine lengthen — imagine a string pulling you up from the crown',
        'Roll your shoulders back and let them drop',
        'Soften your jaw. Unclench your teeth.',
        'Find a stance that feels grounded but not stiff'
      ],
      explanation: 'How you stand affects how you sound. Grounded posture = grounded voice.'
    },
    {
      id: 'breath-commit',
      title: 'Breathe and Commit',
      duration: 15,
      type: 'reflection' as const,
      instructions: [
        'Take 3 slow, deep breaths',
        'On each exhale, let go of any remaining tension',
        'Say to yourself: "I\'m ready"',
        'You\'re warmed up. Go speak.'
      ],
      explanation: 'A clear moment of commitment signals to your nervous system: it\'s time.'
    }
  ]
}

export default function BodyReadyPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [returnTo, setReturnTo] = useState<string | null>(null)

  // Check if there's a return URL in the query params
  // (for when other drills link here with ?return=/speaking-drills/the-edit)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const returnUrl = params.get('return')
    if (returnUrl) setReturnTo(returnUrl)
  }, [])

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

  // Completion Screen
  if (sessionComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Body Ready
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You&apos;re warmed up. Time to speak.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You just:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Released physical tension</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Warmed up your voice</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Grounded your posture</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Set your intention</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Do this before every practice session or speaking moment.
                  2 minutes that change how you show up.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {returnTo ? (
                    <Link
                      href={returnTo}
                      className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Continue to Drill
                    </Link>
                  ) : (
                    <Link
                      href="/speaking-drills"
                      className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Choose a Drill
                    </Link>
                  )}
                  <button
                    onClick={handleRestart}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Do Again
                  </button>
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <div className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Start every session here
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Body Ready
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Your body is your instrument. Before you practise speaking, wake it up.
                  This 2-minute routine releases tension, warms your voice, and grounds your posture.
                </p>
              </div>

              {/* Why This Matters */}
              <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Warm Up?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-300 mb-2">Body</h3>
                    <p className="text-gray-300 text-sm">
                      Tension blocks expression. Shaking it out lets your natural presence come through.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-300 mb-2">Voice</h3>
                    <p className="text-gray-300 text-sm">
                      A cold voice sounds flat and strained. Warm up for resonance and range.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-300 mb-2">Mind</h3>
                    <p className="text-gray-300 text-sm">
                      Physical routine settles mental chatter. You arrive in your body, ready to speak.
                    </p>
                  </div>
                </div>
              </div>

              {/* What You'll Do */}
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">The Routine</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Shake It Out</h3>
                        <p className="text-gray-400 text-sm">Release tension through movement</p>
                      </div>
                    </div>
                    <div className="text-green-300 font-semibold">30s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Wake Your Voice</h3>
                        <p className="text-gray-400 text-sm">Humming, lip trills, vocal sirens</p>
                      </div>
                    </div>
                    <div className="text-green-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Stand Ready</h3>
                        <p className="text-gray-400 text-sm">Ground your posture</p>
                      </div>
                    </div>
                    <div className="text-green-300 font-semibold">30s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Breathe and Commit</h3>
                        <p className="text-gray-400 text-sm">3 breaths, then &quot;I&apos;m ready&quot;</p>
                      </div>
                    </div>
                    <div className="text-green-300 font-semibold">15s</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Warm-Up
                </button>
                <p className="text-gray-400 mt-4">2 minutes. Stand up. Let&apos;s go.</p>
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={bodyReadyDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
