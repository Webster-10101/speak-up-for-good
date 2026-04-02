'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const CONTENT_TOPICS = [
  'The one thing most people get wrong about confidence',
  'Why "just be yourself" is terrible advice',
  'What I learned from my worst speaking moment',
  'The skill nobody teaches you but everyone needs',
  'Why most people are afraid of silence',
  'Something I changed my mind about recently',
  'The difference between performing and being present',
  'Why preparation isn\'t what you think it is',
  'A lesson I keep having to relearn',
  'The most underrated communication skill',
  'What happens when you stop trying to sound smart',
  'Why vulnerability isn\'t weakness',
  'The thing that actually fixed my filler words',
  'What coaches know that most people don\'t',
  'Something I wish someone had told me 5 years ago',
  'Why the best speakers don\'t sound like speakers',
  'The connection between fear and growth',
  'A moment that made me rethink success',
  'The real reason people don\'t speak up',
  'What "finding your voice" actually means',
  'Why the hardest conversations are the most important ones',
  'The one question that changes everything',
]

export default function ContentWarmupPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')

  const generateSession = () => {
    const shuffled = [...CONTENT_TOPICS].sort(() => Math.random() - 0.5)
    return shuffled[0]
  }

  const drill = useMemo(() => ({
    title: 'Content Warmup',
    description: 'Warm up, practise, then record — turn daily practice into content',
    totalDuration: 375,
    steps: [
      {
        id: 'body-reset',
        title: 'Quick Body Reset',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'Shake out your hands and shoulders',
          'Roll your neck gently — both directions',
          '3 deep belly breaths — in for 4, out for 6',
          'Hum gently to wake your voice — feel the vibration in your lips',
          'You don\'t need a full warm-up — just enough to arrive in your body',
        ],
        explanation: 'A quick physical reset gets you out of your head and into your voice. You can\'t create compelling content from a tense body.',
      },
      {
        id: 'vocal',
        title: 'Vocal Activation',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          '3 tongue twisters at speed: "Red lorry yellow lorry", "She sells seashells", "Unique New York you know you need unique New York"',
          'Vocal sirens — slide from low to high and back, smooth and easy',
          'Say your name and what you do, out loud, like you mean it. Twice.',
          'That last bit is important — hear yourself claim your expertise out loud.',
        ],
        explanation: 'Articulation + projection + owning your identity. Three things that make content sound confident rather than tentative.',
      },
      {
        id: 'topic',
        title: 'Topic Reveal',
        duration: 15,
        type: 'warmup' as const,
        instructions: [
          `Today's topic: "${selectedTopic}"`,
          'This is what you\'re going to talk about.',
          'What\'s YOUR take on this? Not the generic answer — your real, honest perspective.',
        ],
        explanation: 'The best content comes from a genuine point of view. Not what you think people want to hear — what you actually believe.',
      },
      {
        id: 'practice',
        title: 'Practice Run',
        duration: 120,
        type: 'challenge' as const,
        instructions: [
          `Topic: "${selectedTopic}"`,
          'Talk about this for 2 minutes. Don\'t try to be polished.',
          'Just be honest and clear. Find your angle.',
          'What\'s the story behind it? What would you want someone to hear?',
          'Think of one person you\'d say this to over coffee.',
          'That\'s your audience. Talk to them.',
        ],
        explanation: 'This is your rehearsal. You\'re finding the shape of what you want to say. The real take comes next.',
      },
      {
        id: 'record',
        title: 'Now Record It',
        duration: 120,
        type: 'challenge' as const,
        instructions: [
          'Hit record on your phone. Do it again.',
          'Same topic — but this time you\'re filming.',
          'One take. Don\'t aim for perfect, aim for real.',
          'If you stumble, keep going. The best content isn\'t polished — it\'s honest.',
          'You\'ve already practised. Now just be yourself on camera.',
          'Look at the lens. Speak like you mean it.',
        ],
        explanation: 'The practice run warmed up your thoughts. This take has your genuine energy AND the clarity of having already said it once. That combination is what makes content compelling.',
      },
      {
        id: 'done',
        title: 'Done',
        duration: 15,
        type: 'reflection' as const,
        instructions: [
          'Nice work.',
          'If that take was good — great, you\'ve got content.',
          'If it wasn\'t — no worries, you got 10 minutes of practice.',
          'Either way, you win.',
          'Consistency beats perfection. Do this every day and watch what happens.',
        ],
        explanation: 'The secret to great content isn\'t talent — it\'s volume. The more you create, the better you get, and the more good stuff you produce.',
      },
    ],
  }), [selectedTopic])

  const handleStartSession = () => {
    setSelectedTopic(generateSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-sky-500/20 to-sky-400/20 border border-sky-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Content Created</h1>
                <p className="text-2xl text-gray-300 mb-8">10 minutes: warmed up, practised, and recorded.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You just:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Reset your body and warmed your voice</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Found your angle on a real topic</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Practised once, then recorded for real</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Built the daily content habit</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Got a good take? Run it through your content pipeline — extract the best bits for
                  LinkedIn, newsletter, or short-form video. Not every take becomes content. But every
                  take makes you better.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    New Topic
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-sky-500 to-sky-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Content Warmup</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  The daily drill for content creators. Warm up your body and voice, practise
                  talking about a random topic, then record it for real. Turn 10 minutes of
                  practice into content you can actually use.
                </p>
              </div>
              <div className="bg-sky-500/10 border border-sky-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why This Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-sky-300 mb-2">Practice + Content</h3>
                    <p className="text-gray-300 text-sm">You&apos;re not choosing between getting better and creating content. This drill does both at once.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sky-300 mb-2">Rehearsal Effect</h3>
                    <p className="text-gray-300 text-sm">You practise the topic once, then record. The second take is always better — clearer, more confident, more natural.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sky-300 mb-2">Daily Habit</h3>
                    <p className="text-gray-300 text-sm">10 minutes a day. Over a month, that&apos;s 30 takes. You only need to publish the best ones.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">The Routine</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Quick Body Reset', desc: 'Shake, breathe, hum', time: '1 min' },
                    { n: '2', name: 'Vocal Activation', desc: 'Twisters, sirens, claim your name', time: '1 min' },
                    { n: '3', name: 'Topic Reveal', desc: 'Your random content topic', time: '15 sec' },
                    { n: '4', name: 'Practice Run', desc: 'Talk it through — find your angle', time: '2 min' },
                    { n: '5', name: 'Record It', desc: 'One take, for real', time: '2 min' },
                    { n: '6', name: 'Done', desc: 'Content or practice — either way you win', time: '15 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-sky-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-sky-500 to-sky-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Warmup
                </button>
                <p className="text-gray-400 mt-4">10 minutes. Practise, record, done.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
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
