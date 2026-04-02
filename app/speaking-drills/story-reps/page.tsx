'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const STORY_PROMPTS = [
  'A time you were completely wrong about someone',
  'The worst advice you ever followed',
  'A moment that changed how you think about work',
  'Something you almost didn\'t do but are glad you did',
  'A conversation that stuck with you for years',
  'The most awkward first impression you\'ve made',
  'A time you had to improvise because your plan failed',
  'Something small that turned out to matter a lot',
  'A moment you surprised yourself',
  'The hardest "no" you ever had to say',
  'A time someone\'s honesty changed everything',
  'Something you learned from watching someone else fail',
  'A risk that paid off in a way you didn\'t expect',
  'The moment you realised you were wrong about yourself',
  'A time you had to trust a stranger',
  'Something you keep coming back to',
  'The best mistake you ever made',
  'A moment of unexpected kindness',
  'Something that scared you that turned out fine',
  'A time you chose the harder path',
  'The first time you stood up for someone',
  'A moment when silence said more than words',
]

export default function StoryRepsPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])

  const generateSession = () => {
    const shuffled = [...STORY_PROMPTS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 2)
  }

  const drill = useMemo(() => ({
    title: 'Story Reps',
    description: 'Practise telling short, structured stories on random prompts',
    totalDuration: 270,
    steps: [
      {
        id: 'loosen-up',
        title: 'Loosen Up',
        duration: 30,
        type: 'warmup' as const,
        instructions: [
          'Take a breath. Relax your shoulders.',
          'Remind yourself: there\'s no wrong answer',
          'You\'re just going to talk about something that happened',
          'Keep it real. Keep it short. Start with a moment.',
        ],
        explanation: 'Storytelling anxiety comes from trying to plan the whole thing in advance. Just start with a single moment and let it unfold.',
      },
      {
        id: 'structure',
        title: 'Story Structure',
        duration: 30,
        type: 'warmup' as const,
        instructions: [
          'Every good story has four things:',
          '1. A MOMENT — something specific that happened',
          '2. A STAKE — why it mattered',
          '3. A TURN — what changed or surprised you',
          '4. A POINT — what you took from it',
          'Don\'t plan the whole thing. Just start with the moment.',
        ],
        explanation: 'Structure isn\'t a cage — it\'s a runway. Knowing the shape of a story means you can focus on telling it, not figuring out where it goes.',
      },
      {
        id: 'round-1',
        title: 'Story Round 1',
        duration: 90,
        type: 'challenge' as const,
        instructions: [
          `Your prompt: "${selectedPrompts[0] || ''}"`,
          'Start talking. Find a specific moment from your life.',
          'Set the scene briefly — where were you, what was happening?',
          'Get to the turn — the moment things shifted',
          'Land the point — what did you take from it?',
          'Don\'t worry about polish. Just tell the story.',
        ],
        explanation: 'The first story is always the hardest. Once you start, your brain warms up and the connections flow faster.',
      },
      {
        id: 'round-2',
        title: 'Story Round 2',
        duration: 90,
        type: 'challenge' as const,
        instructions: [
          `Your prompt: "${selectedPrompts[1] || ''}"`,
          'New prompt. New story. Go.',
          'This time, try to find the turn faster — get to the interesting bit sooner',
          'Use more specific details — names, places, exact words',
          'End with a single clear sentence that captures the point',
        ],
        explanation: 'Repetition builds the storytelling muscle. Each rep makes the next one smoother.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'Which story came more naturally?',
          'Did you find the "turn" — the moment things shifted?',
          'That\'s the skill. Stories without a turn are anecdotes.',
          'Stories with a turn change how people see the world.',
        ],
        explanation: 'Noticing what worked builds your storytelling instinct. The turn is what separates a good story from a forgettable one.',
      },
    ],
  }), [selectedPrompts])

  const handleStartSession = () => {
    setSelectedPrompts(generateSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 border border-emerald-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Stories Told</h1>
                <p className="text-2xl text-gray-300 mb-8">Two stories, two turns, two points landed.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Finding stories from real life on demand</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Structuring: moment → stake → turn → point</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking without over-planning</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Landing a point that means something</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Everyone has hundreds of stories. The skill is finding them fast and telling
                  them with structure. That&apos;s what makes a speaker magnetic.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    New Prompts
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-emerald-500 to-emerald-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Story Reps</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  A random prompt appears. You tell a story from your life. The goal isn&apos;t
                  perfection — it&apos;s finding stories fast and giving them shape. Two rounds,
                  two stories, six minutes.
                </p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Practise Storytelling?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-300 mb-2">Connection</h3>
                    <p className="text-gray-300 text-sm">Stories are how humans make meaning. A good story lands harder than any argument or data point.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-300 mb-2">Retrieval</h3>
                    <p className="text-gray-300 text-sm">You have hundreds of stories. The skill is finding the right one fast — and that takes practice.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-300 mb-2">Structure</h3>
                    <p className="text-gray-300 text-sm">A story with a turn changes how people think. A story without one is just an anecdote.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Loosen Up', desc: 'Let go of perfection', time: '30 sec' },
                    { n: '2', name: 'Story Structure', desc: 'Moment → Stake → Turn → Point', time: '30 sec' },
                    { n: '3', name: 'Story Round 1', desc: 'Random prompt — tell your story', time: '90 sec' },
                    { n: '4', name: 'Story Round 2', desc: 'New prompt — go deeper', time: '90 sec' },
                    { n: '5', name: 'Reflection', desc: 'What worked?', time: '30 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-emerald-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-emerald-500 to-emerald-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">Two random prompts. Two stories. Ready?</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
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
