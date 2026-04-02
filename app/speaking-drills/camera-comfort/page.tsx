'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const cameraComfortDrill = {
  title: 'Camera Comfort',
  description: 'Exposure therapy for camera cringe — record, watch, breathe, improve, repeat',
  totalDuration: 395,
  steps: [
    {
      id: 'why-this-works',
      title: 'Why This Works',
      duration: 20,
      type: 'warmup' as const,
      instructions: [
        'Camera cringe is normal. Almost everyone hates watching themselves on video at first.',
        'The cringe isn\'t a sign that you\'re bad — it\'s your brain reacting to seeing yourself from the outside.',
        'The only way past it is through it.',
        'This drill uses the same principle as exposure therapy: controlled, repeated exposure reduces the emotional charge.',
      ],
      explanation: 'Research shows that repeated exposure to uncomfortable stimuli reduces anxiety over time. Same principle therapists use for phobias — and it works for camera cringe too.',
    },
    {
      id: 'setup',
      title: 'Set Up Your Camera',
      duration: 30,
      type: 'warmup' as const,
      instructions: [
        'Grab your phone or open your laptop camera',
        'Prop it up so you can see yourself — head and shoulders in frame',
        'Don\'t fiddle with lighting or angles — good enough is good enough',
        'You\'ll be recording yourself in a moment. Not for anyone else. Just for you.',
      ],
      explanation: 'Perfectionism about setup is a procrastination strategy. The point is practice, not production.',
    },
    {
      id: 'record-1',
      title: 'Round 1: Record',
      duration: 30,
      type: 'challenge' as const,
      instructions: [
        'Hit record on your phone NOW',
        'Talk about what you had for breakfast, your weekend, anything mundane',
        'Don\'t try to be interesting or polished',
        'Just talk naturally, like you\'re telling a friend',
        'Look at the camera lens, not the screen',
      ],
      explanation: 'Starting with a low-stakes topic removes performance pressure. Nobody\'s grading this.',
    },
    {
      id: 'watch-1',
      title: 'Round 1: Watch It Back',
      duration: 45,
      type: 'challenge' as const,
      instructions: [
        'Stop recording and hit play',
        'Watch the whole thing. Don\'t skip ahead.',
        'Breathe. Notice the urge to cringe — let it be there without acting on it.',
        'Don\'t judge yourself — just observe. Watch it like you\'d watch a friend.',
        'Your voice sounds different to you than to others. That\'s normal — you hear it without bone conduction for the first time.',
      ],
      explanation: 'The cringe peaks in the first few seconds then fades. Each time you push through it, your nervous system recalibrates.',
    },
    {
      id: 'review-1',
      title: 'Round 1: Self-Review',
      duration: 60,
      type: 'reflection' as const,
      instructions: [
        'Give yourself balanced feedback — three categories:',
        '2 things to IMPROVE — specific and actionable ("I looked down twice", "I rushed the opening"), not vague judgement',
        '2 things that were FINE — acceptable, not terrible. Building neutral self-assessment.',
        '2 things you LIKED — actually good. Force yourself to find them. A phrase, your energy, a moment of naturalness.',
        'This is coaching yourself. Be constructive, not cruel.',
      ],
      explanation: 'Most people only see what\'s wrong. Training yourself to also see what\'s fine and what\'s good is how you build a healthy relationship with self-assessment. Balanced feedback is a skill.',
    },
    {
      id: 'record-2',
      title: 'Round 2: Record Again',
      duration: 30,
      type: 'challenge' as const,
      instructions: [
        'Same topic or a new one — your choice',
        'This time, apply your two improvement notes from the last round',
        'Hit record and go',
        'Everything else can be imperfect. Two things better is the goal.',
      ],
      explanation: 'Directed practice with specific targets is how skills actually improve. Vague "be better" never works.',
    },
    {
      id: 'watch-review-2',
      title: 'Round 2: Watch + Review',
      duration: 60,
      type: 'challenge' as const,
      instructions: [
        'Watch it back again. The whole thing.',
        'Notice: is the cringe as strong as the first time? For most people, it\'s already less.',
        'Check your improvement notes — did you get better on those two things?',
        'Quick self-review again: 2 to improve, 2 that were fine, 2 you liked.',
        'Find ONE thing that was actually good. Allow yourself to notice what works.',
      ],
      explanation: 'Noticing improvement builds positive association with self-review. You\'re rewiring from "watching myself = pain" to "watching myself = useful feedback".',
    },
    {
      id: 'record-3',
      title: 'Round 3: One More Take',
      duration: 30,
      type: 'challenge' as const,
      instructions: [
        'Last round. Hit record.',
        'This time, forget the notes. Just be yourself.',
        'Talk about something you actually care about — even 30 seconds of it.',
        'Let it be imperfect. Let it be real.',
        'This is what content looks like before editing. It\'s enough.',
      ],
      explanation: 'The final take without notes tests whether improvements have become natural. Speaking about something you care about adds genuine energy.',
    },
    {
      id: 'final-reflect',
      title: 'Final Watch + Reflect',
      duration: 60,
      type: 'reflection' as const,
      instructions: [
        'Watch this last one back.',
        'Compare how you feel NOW watching yourself vs the first take.',
        'The cringe has a volume knob. Today you turned it down a notch.',
        'If you do this for a week, you\'ll watch yourself back without flinching.',
        'If you do this for a month, you\'ll start to enjoy it — because you\'ll see yourself getting better.',
        'The people who make great content aren\'t the ones with no cringe. They\'re the ones who learned to work through it.',
      ],
      explanation: 'Consistent exposure is the key. One session helps. Daily sessions transform your relationship with the camera.',
    },
  ],
}

export default function CameraComfortPage() {
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-lime-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-lime-500/20 to-lime-400/20 border border-lime-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Three Takes Down</h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You just watched yourself on camera three times. That&apos;s more than most people do in a month.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What you proved today:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Recorded yourself 3 times</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Watched yourself back 3 times</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Gave yourself balanced, actionable feedback</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Proved the cringe gets quieter</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Do this every day for a week. By day 7, you&apos;ll barely flinch. By day 30,
                  you&apos;ll wonder what the fuss was about. The camera isn&apos;t the enemy — avoidance is.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-lime-500 hover:bg-lime-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Do Again
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-lime-500 to-lime-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-lime-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Camera Comfort</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Exposure therapy for camera cringe. Record yourself, watch it back, breathe through
                  the discomfort, and do it again. Three rounds. Eight minutes. The cringe gets quieter
                  every time.
                </p>
              </div>
              <div className="bg-lime-500/10 border border-lime-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why This Matters</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-lime-300 mb-2">The Problem</h3>
                    <p className="text-gray-300 text-sm">
                      Most people hate watching themselves. So they never record. So they never improve.
                      So they never create content. The cringe wins.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-lime-300 mb-2">The Science</h3>
                    <p className="text-gray-300 text-sm">
                      Exposure therapy works. Repeated, controlled exposure to discomfort reduces the
                      emotional charge over time. Same principle therapists use for phobias.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-lime-300 mb-2">The Shift</h3>
                    <p className="text-gray-300 text-sm">
                      After a week of this, you&apos;ll go from &ldquo;I can&apos;t watch this&rdquo; to
                      &ldquo;What can I learn from this?&rdquo; That shift changes everything.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Three Rounds</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Record → Watch → Review', desc: 'Record 30s, watch it back, give balanced feedback (2 improve, 2 fine, 2 liked)', time: '~3 min' },
                    { n: '2', name: 'Record → Watch → Review', desc: 'Apply your notes, record again, check improvement', time: '~2.5 min' },
                    { n: '3', name: 'Record → Final Reflect', desc: 'Forget the notes, be yourself, compare the cringe', time: '~2 min' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-lime-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-lime-500 to-lime-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">8 minutes. You and the camera. Let&apos;s make peace.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-lime-900">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={cameraComfortDrill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
