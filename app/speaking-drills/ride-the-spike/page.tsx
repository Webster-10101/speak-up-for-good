'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const rideTheSpikeDrill = {
  title: 'Ride the Spike',
  description: 'A pre-performance routine to metabolise adrenaline and own your first 90 seconds',
  totalDuration: 315, // ~5.25 min
  steps: [
    {
      id: 'burn-it-off',
      title: 'Burn It Off',
      duration: 60,
      type: 'warmup' as const,
      instructions: [
        'Do jumping jacks, push-ups, wall sits, or shake your hands vigorously',
        'The adrenaline is there for movement — give it somewhere to go',
        'Bounce on your feet, roll your shoulders, pace the room',
        'Let your body use up the chemical energy',
        'Don\'t hold still — that\'s where the shaking lives'
      ],
      explanation: 'Adrenaline prepares your body for physical action. If you don\'t move, it has nowhere to go — that\'s what causes the shaking. Burn it off before you speak.'
    },
    {
      id: 'physiological-sigh',
      title: 'Physiological Sigh',
      duration: 45,
      type: 'warmup' as const,
      instructions: [
        'Double inhale through your nose — two short sniffs in',
        'Then one long, slow exhale through your mouth',
        'Repeat this pattern 4-5 times',
        'Feel your heart rate come down with each cycle',
        'This is the fastest known way to activate your parasympathetic nervous system'
      ],
      explanation: 'The double inhale maximally inflates the air sacs in your lungs, and the long exhale slows your heart rate. This isn\'t meditation — it\'s a physiological off-switch for the stress response.'
    },
    {
      id: 'squeeze-and-release',
      title: 'Squeeze and Release',
      duration: 45,
      type: 'warmup' as const,
      instructions: [
        'Clench your fists, arms, shoulders, and legs — everything tight for 5 seconds',
        'Then release completely. Let everything drop',
        'Notice the contrast between tension and release',
        'Repeat 3 times',
        'On the final release, let your jaw drop open and your shoulders fall'
      ],
      explanation: 'Progressive muscle tension and release burns off residual adrenaline and resets your baseline. The release phase is where your body learns what "calm" actually feels like.'
    },
    {
      id: 'lock-your-opening',
      title: 'Lock Your Opening',
      duration: 90,
      type: 'challenge' as const,
      instructions: [
        'Say your first 3 sentences out loud — exactly as you\'ll deliver them',
        'Not improvised. Not paraphrased. The exact words',
        'Say them LOUDLY and CLEARLY — project to the back of the room',
        'Keep your body relaxed while you do it — shoulders down, jaw soft, breath low',
        'Repeat them 3 times. Make them automatic',
        'Speak 20% slower than feels natural — adrenaline speeds you up'
      ],
      explanation: 'The shakiness hits hardest when you\'re also figuring out what to say. A locked opening means your mouth knows what to do while your body catches up. Autopilot for the first 30 seconds.'
    },
    {
      id: 'simulated-spike',
      title: 'Simulated Spike',
      duration: 60,
      type: 'challenge' as const,
      instructions: [
        'Do 10 jumping jacks right now — get your heart rate up',
        'Immediately deliver your opening with elevated heart rate',
        'Notice: the shakiness is less visible than it feels',
        'Find one spot on the wall (your anchor point) and talk to it',
        'Ride the wave — don\'t fight it, perform through it'
      ],
      explanation: 'This is the isolation drill. By deliberately simulating the physical state of a spike, you practise performing through it. Do this enough times and the spike stops scaring you — because you know you can handle it.'
    },
    {
      id: 'commit',
      title: 'Commit',
      duration: 15,
      type: 'reflection' as const,
      instructions: [
        'Feel your feet on the floor. One slow breath.',
        'The spike will come. You know how to ride it.',
        'Your opening is locked. Your body is ready.',
        'Go speak.'
      ],
      explanation: 'A clear moment of commitment tells your nervous system: we\'ve prepared, we\'re ready, it\'s time. The spike isn\'t the enemy — the fear of the spike is.'
    }
  ]
}

export default function RideTheSpikePage() {
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

  // Completion Screen
  if (sessionComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Ready to Ride
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  The spike will come. Now you know how to handle it.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You just:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Burned off excess adrenaline</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Activated your parasympathetic system</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Locked your opening on autopilot</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Practised performing through the spike</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  The goal isn&apos;t to eliminate adrenaline — it&apos;s to have practised
                  performing through it enough that it stops scaring you.
                  Do this before every talk.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/speaking-drills"
                    className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    More Drills
                  </Link>
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Use before any talk or presentation
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Ride the Spike
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Adrenaline spikes hard in the first 60-90 seconds of speaking. Your body dumps
                  cortisol, your hands shake, your voice tightens. You can&apos;t stop the spike —
                  but you can metabolise it faster and have a bulletproof first minute.
                </p>
              </div>

              {/* Why This Matters */}
              <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">The Science</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">The Problem</h3>
                    <p className="text-gray-300 text-sm">
                      Adrenaline is designed for physical action. When you stand still and try to
                      speak, it has nowhere to go — that&apos;s the shaking.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">The Fix</h3>
                    <p className="text-gray-300 text-sm">
                      Move first, breathe second, lock your opening third. Give the adrenaline
                      somewhere to go, then bring yourself down.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">The Training</h3>
                    <p className="text-gray-300 text-sm">
                      Simulate the spike deliberately and practise performing through it. Enough
                      reps and it stops scaring you.
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
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Burn It Off</h3>
                        <p className="text-gray-400 text-sm">Physical movement to use up the adrenaline</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Physiological Sigh</h3>
                        <p className="text-gray-400 text-sm">Double inhale, long exhale — calm the system</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Squeeze and Release</h3>
                        <p className="text-gray-400 text-sm">Tense everything, then let go completely</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">45s</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Lock Your Opening</h3>
                        <p className="text-gray-400 text-sm">Rehearse your first 3 sentences until automatic</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">1.5 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        5
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Simulated Spike</h3>
                        <p className="text-gray-400 text-sm">Elevate heart rate, then deliver — train the real thing</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">1 min</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        6
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Commit</h3>
                        <p className="text-gray-400 text-sm">Ground, breathe, go</p>
                      </div>
                    </div>
                    <div className="text-orange-300 font-semibold">15s</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Routine
                </button>
                <p className="text-gray-400 mt-4">5 minutes. Stand up. Move first.</p>
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={rideTheSpikeDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
