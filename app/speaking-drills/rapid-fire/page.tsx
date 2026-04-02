'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const RAPID_TOPICS = [
  'The best invention of all time',
  'Why dogs are better than cats',
  'What I\'d do with a million pounds',
  'The problem with modern dating',
  'Why everyone should learn to cook',
  'The most overrated thing in life',
  'What I\'d tell my 18-year-old self',
  'Why mornings are the worst',
  'The future of work',
  'My hot take on social media',
  'The perfect weekend',
  'Why I\'d make a terrible politician',
  'Something I\'m unreasonably passionate about',
  'The most useless skill I have',
  'Why boredom is underrated',
  'The greatest meal I\'ve ever had',
  'What aliens would think of humans',
  'The one rule I\'d add to society',
  'Why nostalgia is a trap',
  'If I could master one thing overnight',
  'The most British thing about me',
  'Why I trust strangers more than I should',
  'The thing nobody tells you about growing up',
  'My controversial opinion about exercise',
  'Why being wrong is underrated',
  'The best conversation I\'ve ever had',
  'Something that works but shouldn\'t',
  'The worst trend of the last decade',
  'Why we should all talk to ourselves more',
  'If I ran a school, the first thing I\'d teach',
  'The most overrated piece of advice',
  'Why silence makes people uncomfortable',
]

export default function RapidFirePage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const generateSession = () => {
    const shuffled = [...RAPID_TOPICS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }

  const drill = useMemo(() => ({
    title: 'Rapid Fire Improv',
    description: 'Speak immediately on random topics with zero prep time',
    totalDuration: 265,
    steps: [
      {
        id: 'rules',
        title: 'The Rules',
        duration: 20,
        type: 'warmup' as const,
        instructions: [
          'The rules are simple:',
          'A topic appears. You start talking. Immediately.',
          'No pausing to think. No planning your first sentence.',
          'Just open your mouth and commit to whatever comes out.',
          'The goal isn\'t to be brilliant — it\'s to kill the gap between thinking and speaking.',
        ],
        explanation: 'That gap — the one where you think "what should I say?" — is where anxiety lives. This drill shrinks it.',
      },
      {
        id: 'round-1',
        title: 'Round 1 — 60 Seconds',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[0] || ''}"`,
          'Start talking NOW. Don\'t plan.',
          'Say the first thing that comes to mind and build from there.',
          'If you get stuck, say "and the interesting thing about that is..." and keep going.',
          'Don\'t stop talking until the timer ends.',
        ],
        explanation: 'The first round is the hardest. Your brain wants to plan. Override it.',
      },
      {
        id: 'round-2',
        title: 'Round 2 — 45 Seconds',
        duration: 45,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[1] || ''}"`,
          'Less time. Keep talking.',
          'Don\'t repeat yourself — push for a new thought.',
          'Try to make a point or find an angle, not just ramble.',
        ],
        explanation: 'Less time means less room to hesitate. You\'re training speed and commitment.',
      },
      {
        id: 'round-3',
        title: 'Round 3 — 30 Seconds',
        duration: 30,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[2] || ''}"`,
          'Even less time. Say something meaningful.',
          'Open strong — your first sentence IS the point.',
          'Then support it with one example or reason.',
        ],
        explanation: 'Conciseness under pressure. This is what makes someone quotable.',
      },
      {
        id: 'round-4',
        title: 'Round 4 — 20 Seconds',
        duration: 20,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[3] || ''}"`,
          'Speed round. Say something meaningful in 20 seconds.',
          'One clear thought. Land it.',
        ],
        explanation: 'If you can say something interesting in 20 seconds, you can hold attention in any conversation.',
      },
      {
        id: 'round-5',
        title: 'Round 5 — Eyes Closed',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[4] || ''}"`,
          'Close your eyes this time.',
          'No visual cues. No checking the timer.',
          'Just talk until you hear the bell.',
          'This is where the real confidence lives — speaking from the inside out.',
        ],
        explanation: 'Without visual distraction, you connect more deeply with your thoughts. This round often produces the most authentic speaking.',
      },
      {
        id: 'debrief',
        title: 'Debrief',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'Which round felt most natural?',
          'Which topic surprised you — where did you go with it?',
          'Notice: you CAN speak without preparation.',
          'Your brain knows more than you think.',
          'The gap between "I need to prepare" and "I can just talk" is smaller than it feels.',
        ],
        explanation: 'Every time you prove to yourself that you can speak unprepared, the next time gets easier.',
      },
    ],
  }), [selectedTopics])

  const handleStartSession = () => {
    setSelectedTopics(generateSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-rose-500/20 to-rose-400/20 border border-rose-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Five Rounds Done</h1>
                <p className="text-2xl text-gray-300 mb-8">You spoke on 5 random topics with zero preparation. That&apos;s the skill.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Starting immediately — no planning gap</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking under decreasing time pressure</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Finding something meaningful fast</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking from the inside out (eyes closed)</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  The more you do this, the more you trust your own voice. That&apos;s the real
                  confidence people see when you speak.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-rose-500 hover:bg-rose-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    New Topics
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-rose-500 to-rose-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-rose-400 hover:text-rose-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Rapid Fire Improv</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  A topic appears. You start talking. Immediately. No preparation, no planning,
                  no inner rehearsal. Just speak. Five rounds with decreasing time — the pressure
                  is the point.
                </p>
              </div>
              <div className="bg-rose-500/10 border border-rose-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Zero Prep?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-rose-300 mb-2">Kill the Gap</h3>
                    <p className="text-gray-300 text-sm">The pause between &ldquo;I should speak&rdquo; and actually speaking is where anxiety breeds. This drill eliminates it.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-300 mb-2">Trust Yourself</h3>
                    <p className="text-gray-300 text-sm">You know more than you think. When you can&apos;t plan, you discover that your brain produces interesting things on its own.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-300 mb-2">Real Conversations</h3>
                    <p className="text-gray-300 text-sm">Nobody scripts real life. The people who sound articulate in meetings practise thinking on their feet — this is how.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Five Rounds</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: '60 Seconds', desc: 'Full minute — ease in', time: '60 sec' },
                    { n: '2', name: '45 Seconds', desc: 'Tighter — push for a point', time: '45 sec' },
                    { n: '3', name: '30 Seconds', desc: 'Get to the good stuff fast', time: '30 sec' },
                    { n: '4', name: '20 Seconds', desc: 'Speed round — one clear thought', time: '20 sec' },
                    { n: '5', name: 'Eyes Closed', desc: 'No visual cues — speak from inside', time: '60 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-rose-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-rose-500 to-rose-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">5 random topics. No thinking time. Let&apos;s go.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession drill={drill} onComplete={handleSessionComplete} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
