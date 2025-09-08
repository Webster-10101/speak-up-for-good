'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const convictionWorkoutDrill = {
  title: '5-Minute Speaking Workout',
  description: 'Build conviction and authenticity in your speaking through progressive challenges',
  totalDuration: 300, // 5 minutes
  steps: [
    {
      id: 'warmup',
      title: 'Vocal Warm-Up',
      duration: 60,
      type: 'warmup' as const,
      instructions: [
        'Hum gently, sliding your pitch up and down like a siren 🚨',
        'Start low, glide high, then back down',
        'Keep your breath steady and your throat relaxed',
        'Focus on warming up your vocal cords'
      ],
      explanation: 'Warms up your vocal cords and gets you breathing deeply.'
    },
    {
      id: 'challenge1',
      title: 'Speak from the Heart',
      duration: 60,
      type: 'challenge' as const,
      instructions: [
        'Pick something you genuinely care about',
        'Speak about why you care about it - don&apos;t overthink, just let the words flow',
        'Imagine you&apos;re explaining it to a close friend',
        'Focus on authenticity over perfection'
      ],
      explanation: 'This builds your ability to speak naturally about topics that matter to you.'
    },
    {
      id: 'challenge2',
      title: 'Add Personal Story',
      duration: 60,
      type: 'challenge' as const,
      instructions: [
        'Continue with the same topic from the previous round',
        'This time, weave in a personal anecdote',
        'Share a story, memory, or moment that shows why it matters to you',
        'Make it personal and real'
      ],
      explanation: 'Personal stories create emotional connection and make your message memorable.'
    },
    {
      id: 'challenge3',
      title: 'Dial Up Conviction',
      duration: 90,
      type: 'challenge' as const,
      instructions: [
        'Stay with the same topic',
        'This time, dial your conviction up to 100%',
        'Speak as if you need to persuade a crowd who doubts you',
        'Use your voice, your energy, and your presence',
        'Don&apos;t hold back - let your passion show'
      ],
      explanation: 'Learning to speak with genuine conviction is what separates good speakers from great ones.'
    },
    {
      id: 'reflection',
      title: 'Reflection',
      duration: 30,
      type: 'reflection' as const,
      instructions: [
        'How did your energy shift between the three speaking rounds?',
        'Where did you feel most authentic?',
        'Did you notice your voice or body changing when you spoke with conviction?',
        'What did you learn about your speaking style?'
      ],
      explanation: 'Reflection helps you internalize what you learned and build self-awareness.'
    }
  ]
}

export default function ConvictionWorkoutPage() {
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
                  🎉 Congratulations!
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You&apos;ve completed the 5-Minute Speaking Workout
                </p>
                
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Accomplished:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Warmed up your voice properly</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Practiced authentic self-expression</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Integrated personal storytelling</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Developed persuasive conviction</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Regular practice builds lasting confidence. The more you practice speaking with conviction, 
                  the more natural it becomes. Consider doing this drill 2-3 times per week for maximum impact.
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
                  5-Minute Speaking Workout
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  This progressive workout builds your ability to speak with authenticity and conviction. 
                  You&apos;ll start with vocal warm-ups, then practice speaking about something you care about, 
                  adding personal stories, and finally dialing up your conviction to maximum impact.
                </p>
              </div>

              {/* Preparation Tips */}
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">🎯 Before You Start</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">What You&apos;ll Need:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>A quiet space where you can speak aloud</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>5 minutes of uninterrupted time</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>A topic you genuinely care about (think about this now!)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Pro Tips:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Speak as if talking to a real person</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Don&apos;t overthink - let your passion guide you</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Use gestures and body language naturally</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Drill Overview */}
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Workout Structure</h2>
                <div className="space-y-4">
                  {convictionWorkoutDrill.steps.map((step, index) => (
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
                  Start Workout
                </button>
                <p className="text-gray-400 mt-4">Ready when you are. Take a deep breath and let&apos;s begin!</p>
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
            drill={convictionWorkoutDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
