'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const JOKE_TOPICS = [
  'Working from home',
  'First dates',
  'Gym culture',
  'Being British',
  'Technology that doesn\'t work',
  'Online meetings',
  'Cooking for yourself',
  'Public transport',
  'Self-help books',
  'Social media',
  'Getting older',
  'Coffee addiction',
  'Networking events',
  'Sleep habits',
  'Autocorrect',
  'Email etiquette',
  'Trying to be healthy',
  'Monday mornings',
  'Small talk',
  'DIY disasters',
  'Meal prepping',
  'Flatpack furniture',
  'Airport security',
  'New Year\'s resolutions',
]

export default function JokeWorkshopPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const generateSession = () => {
    const shuffled = [...JOKE_TOPICS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4) // 1 main + 3 rapid fire
  }

  const drill = useMemo(() => ({
    title: 'Joke Workshop',
    description: 'Learn joke structure and practise writing and delivering jokes on random topics',
    totalDuration: 270,
    steps: [
      {
        id: 'structure',
        title: 'Joke Structure',
        duration: 30,
        type: 'warmup' as const,
        instructions: [
          'The basic joke formula:',
          'SETUP — create an expectation. Make the audience think one thing.',
          'PUNCHLINE — break it in an unexpected direction.',
          'Misdirection is the engine of comedy.',
          'The bigger the gap between expectation and reality, the bigger the laugh.',
        ],
        explanation: 'Every joke — from one-liners to long stories — uses this formula. Once you see the structure, you can build jokes about anything.',
      },
      {
        id: 'topic-reveal',
        title: 'Topic Reveal',
        duration: 15,
        type: 'warmup' as const,
        instructions: [
          `Your topic: "${selectedTopics[0] || ''}"`,
          'You have 60 seconds to think of a joke about this.',
          'What\'s true about this topic? What\'s relatable?',
          'Now flip it. What\'s the unexpected angle?',
        ],
        explanation: 'The best comedy comes from truth. Start with something everyone recognises, then surprise them.',
      },
      {
        id: 'write-joke',
        title: 'Write Your Joke',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopics[0] || ''}"`,
          'Think of something true or relatable about this topic',
          'What\'s the expectation people have?',
          'Now flip it — what\'s the unexpected angle?',
          'Don\'t aim for perfect — aim for a surprise',
          'Say it out loud when you have something',
        ],
        explanation: 'Saying jokes out loud is completely different from thinking them. Your delivery is half the joke.',
      },
      {
        id: 'different-angle',
        title: 'Try a Different Angle',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          `Same topic: "${selectedTopics[0] || ''}"`,
          'Find a completely different angle — there\'s always more than one funny thing',
          'Try exaggeration — take something true and push it to absurd extremes',
          'Try analogy — "X is like Y" where Y is unexpected',
          'Try the rule of three — two normal things, third one unexpected',
        ],
        explanation: 'The ability to find multiple angles on the same topic is what separates quick-witted people from everyone else. It\'s a trainable skill.',
      },
      {
        id: 'rapid-fire',
        title: 'Rapid Fire Round',
        duration: 90,
        type: 'challenge' as const,
        instructions: [
          '3 topics, 30 seconds each. Don\'t think — just say the first funny thing.',
          `Topic 1: "${selectedTopics[1] || ''}"`,
          `Topic 2: "${selectedTopics[2] || ''}"`,
          `Topic 3: "${selectedTopics[3] || ''}"`,
          'Speed over quality. Commit to whatever comes out.',
          'If nothing comes, say "the funny thing about [topic] is..." and see what your mouth says.',
        ],
        explanation: 'Speed kills the inner critic. When you don\'t have time to judge yourself, you often say funnier things.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        duration: 15,
        type: 'reflection' as const,
        instructions: [
          'Which joke surprised you?',
          'Comedy is a muscle. The more you practise finding the unexpected angle, the faster your brain gets.',
          'Every great comedian started with terrible jokes.',
        ],
        explanation: 'The goal isn\'t to be a comedian — it\'s to add lightness and humour to your speaking. That makes you more engaging and more human.',
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Workshop Done</h1>
                <p className="text-2xl text-gray-300 mb-8">You wrote jokes on 4 random topics. That&apos;s real comedy training.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You practised:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Setup → punchline structure</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Finding multiple angles on the same topic</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speed — saying the funny thing fast</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Committing to an idea out loud</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Humour makes you more engaging, more human, and more memorable.
                  You don&apos;t have to be a comedian. You just have to practise finding the funny.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    New Topics
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Joke Workshop</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Learn the structure behind every joke, then practise writing and delivering
                  your own on random topics. You don&apos;t need to be naturally funny — you need
                  to practise finding the unexpected angle.
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Practise Humour?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">Engagement</h3>
                    <p className="text-gray-300 text-sm">A well-placed joke makes people lean in. Humour is the fastest way to build rapport with any audience.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">Quick Thinking</h3>
                    <p className="text-gray-300 text-sm">Finding the funny angle fast means your brain makes creative connections under pressure — useful everywhere.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">Humanity</h3>
                    <p className="text-gray-300 text-sm">People trust speakers who can be light. It shows confidence, self-awareness, and emotional intelligence.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Joke Structure', desc: 'Setup → punchline formula', time: '30 sec' },
                    { n: '2', name: 'Topic Reveal', desc: 'Your random topic appears', time: '15 sec' },
                    { n: '3', name: 'Write Your Joke', desc: 'Find the funny angle', time: '1 min' },
                    { n: '4', name: 'Different Angle', desc: 'Same topic, new joke', time: '1 min' },
                    { n: '5', name: 'Rapid Fire', desc: '3 topics, 30 seconds each', time: '90 sec' },
                    { n: '6', name: 'Reflection', desc: 'What surprised you?', time: '15 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-yellow-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Workshop
                </button>
                <p className="text-gray-400 mt-4">Random topics. Real jokes. Let&apos;s find the funny.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900">
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
