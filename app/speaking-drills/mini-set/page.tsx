'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const SET_THEMES = [
  'Things that don\'t work the way they\'re supposed to',
  'Lessons I learned the hard way',
  'What nobody warns you about',
  'The gap between expectation and reality',
  'Things I pretend to understand',
  'Moments that changed my mind',
  'The absurdity of everyday life',
  'What I wish I\'d known sooner',
  'Things that are harder than they look',
  'Unwritten rules everyone follows',
  'The things we do to impress people',
  'Small things that matter more than big things',
  'What I\'ve learned from getting it wrong',
  'The art of pretending to be an adult',
  'Things that only make sense in hindsight',
  'What happens when you stop caring what people think',
  'The difference between what we say and what we mean',
  'Rituals that keep me sane',
  'Things I\'ve changed my mind about',
  'The stories we tell ourselves',
  'Rules I\'ve made for myself',
  'What I\'d do differently if I started again',
]

export default function MiniSetPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('')

  const generateSession = () => {
    const shuffled = [...SET_THEMES].sort(() => Math.random() - 0.5)
    return shuffled[0]
  }

  const drill = useMemo(() => ({
    title: 'Mini Set',
    description: 'Deliver a short 2-minute set combining storytelling, humour, and presence',
    totalDuration: 285,
    steps: [
      {
        id: 'theme',
        title: 'Your Theme',
        duration: 15,
        type: 'warmup' as const,
        instructions: [
          `Your theme: "${selectedTheme}"`,
          'This is the thread that ties your set together.',
          'Think of a specific experience, observation, or story that fits.',
        ],
        explanation: 'A theme gives your set a shape. Without one, it\'s just talking. With one, it\'s a performance.',
      },
      {
        id: 'gather',
        title: 'Gather Your Thoughts',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'You have 60 seconds to think. Not to script — to gather.',
          'What\'s one real experience or observation that fits this theme?',
          'What\'s the story? What\'s the funny part? What\'s the point?',
          'Don\'t memorise words. Just know your opening line and your closing line.',
          'The middle will take care of itself.',
        ],
        explanation: 'The best speakers don\'t script — they prepare anchor points. An opening, a closing, and a clear direction. The rest is improvisation.',
      },
      {
        id: 'deliver',
        title: 'Deliver Your Set',
        duration: 120,
        type: 'challenge' as const,
        instructions: [
          'Go. 2 minutes. Talk about your theme.',
          'Tell the story. Find the funny. Land the point.',
          'Imagine you\'re in front of 20 people who want to hear what you have to say.',
          'Speak with conviction. Use pauses. Make eye contact with the wall, your phone, whatever.',
          'This is your set.',
        ],
        explanation: 'Two minutes is the perfect length — long enough to tell a real story, short enough that every second matters.',
      },
      {
        id: 'tag',
        title: 'The Tag',
        duration: 30,
        type: 'challenge' as const,
        instructions: [
          'You\'ve got 30 more seconds.',
          'Add a "tag" — a final thought, callback, or punchline that ties it together.',
          'The best sets end with something unexpected that makes the audience rethink what they just heard.',
          'Circle back to your opening, flip it, or land a new insight.',
        ],
        explanation: 'A strong ending is what people remember. The tag is what turns a good set into a memorable one.',
      },
      {
        id: 'review',
        title: 'Self-Review',
        duration: 60,
        type: 'reflection' as const,
        instructions: [
          'How did that feel?',
          'Rate yourself (no scores, just notice):',
          'ENERGY — were you present, or going through the motions?',
          'STRUCTURE — did it have a shape, or was it a ramble?',
          'HUMOUR — did you find lightness, or was it all serious?',
          'CONVICTION — did you mean what you said, or were you performing?',
          'Each rep builds your stage instincts — even without a stage.',
        ],
        explanation: 'Self-awareness is the fastest path to improvement. Not self-criticism — self-awareness. Notice, don\'t judge.',
      },
    ],
  }), [selectedTheme])

  const handleStartSession = () => {
    setSelectedTheme(generateSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-violet-500/20 to-violet-400/20 border border-violet-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Set Delivered</h1>
                <p className="text-2xl text-gray-300 mb-8">You just performed a 2-minute set with a theme, a story, and a tag.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Performing a complete, structured piece</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Combining storytelling with humour</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Landing a closing tag</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Honest self-assessment without judgement</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  A 2-minute set is the building block of everything — keynotes, podcasts, pitches,
                  conversations. Master this and you can hold attention anywhere.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    New Theme
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-violet-500 to-violet-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-violet-400 hover:text-violet-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Mini Set</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  A random theme appears. You get 60 seconds to gather your thoughts. Then you deliver
                  a 2-minute set — storytelling, humour, and presence, all in one. End with a tag that
                  ties it together.
                </p>
              </div>
              <div className="bg-violet-500/10 border border-violet-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Mini Sets?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-violet-300 mb-2">Integration</h3>
                    <p className="text-gray-300 text-sm">This combines every speaking skill — structure, stories, humour, presence, timing — into one short performance.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-violet-300 mb-2">Stage Feel</h3>
                    <p className="text-gray-300 text-sm">2 minutes is enough to simulate the real experience of performing. You build stage instincts without needing a stage.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-violet-300 mb-2">Content</h3>
                    <p className="text-gray-300 text-sm">A great 2-minute set is also a great LinkedIn post, podcast snippet, or keynote opening. Practice and content creation in one.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">The Format</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Theme Reveal', desc: 'Your random theme appears', time: '15 sec' },
                    { n: '2', name: 'Gather Thoughts', desc: 'Opening line, closing line, direction', time: '1 min' },
                    { n: '3', name: 'Deliver Your Set', desc: 'Story, humour, presence — go', time: '2 min' },
                    { n: '4', name: 'The Tag', desc: 'Close strong — callback or twist', time: '30 sec' },
                    { n: '5', name: 'Self-Review', desc: 'Energy, structure, humour, conviction', time: '1 min' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-violet-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-violet-500 to-violet-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Set
                </button>
                <p className="text-gray-400 mt-4">One theme. Two minutes. Make it count.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900">
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
