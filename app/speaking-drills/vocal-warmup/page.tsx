'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const ALL_TONGUE_TWISTERS = [
  'Red lorry, yellow lorry, red lorry, yellow lorry',
  'She sells seashells by the seashore',
  'Unique New York, you know you need unique New York',
  'Peter Piper picked a peck of pickled peppers',
  "The sixth sick sheikh's sixth sheep's sick",
  'How can a clam cram in a clean cream can',
  'Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair',
  'I saw Susie sitting in a shoeshine shop',
  'Whether the weather be fine or whether the weather be not',
  "Betty Botter bought some butter but she said the butter's bitter",
  'Round the rugged rocks the ragged rascal ran',
  'She stood on the balcony inexplicably mimicking him hiccupping',
  'Pad kid poured curd pulled cod',
  'Brisk brave brigadiers brandished broad bright blades',
  'Six sleek swans swam swiftly southwards',
  'A proper copper coffee pot',
  'Imagine an imaginary menagerie manager managing an imaginary menagerie',
]

export default function VocalWarmupPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedTwisters, setSelectedTwisters] = useState<string[]>([])

  const generateSession = () => {
    const shuffled = [...ALL_TONGUE_TWISTERS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }

  const drill = useMemo(() => ({
    title: 'Vocal Warmup',
    description: 'Wake up your voice with breathing, tongue twisters, and resonance exercises',
    totalDuration: 270,
    steps: [
      {
        id: 'breathing',
        title: 'Diaphragmatic Breathing',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'Place one hand on your chest and one on your belly',
          'Inhale deeply for 4 counts — expand your belly, not your chest',
          'Hold for 4 counts',
          'Exhale slowly for 6 counts with a gentle "sssss" sound',
          'Repeat 4-5 times — each exhale longer and more controlled',
        ],
        explanation: 'Diaphragmatic breathing is the foundation of vocal power. Chest breathing creates tension. Belly breathing creates resonance.',
      },
      {
        id: 'tongue-twisters',
        title: 'Tongue Twisters',
        duration: 90,
        type: 'challenge' as const,
        instructions: [
          `Twister 1: "${selectedTwisters[0] || ''}"`,
          `Twister 2: "${selectedTwisters[1] || ''}"`,
          `Twister 3: "${selectedTwisters[2] || ''}"`,
          'Start each one slowly — get every sound right',
          'Then speed up gradually until you trip, then slow down and go again',
          'Exaggerate the mouth movements — really work those articulators',
        ],
        explanation: 'Tongue twisters train your mouth to make precise sounds at speed. Sloppy articulation makes you harder to understand — this fixes it fast.',
      },
      {
        id: 'resonance',
        title: 'Resonance & Projection',
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          'Hum "mmmm" gently — feel the vibration in your lips and chest',
          'Gradually open to "mmmm-ahhh" — keep the vibration going',
          'Try placing the sound in different parts of your face — nose, cheeks, forehead',
          'Project your voice to the far wall — don\'t shout, just aim the sound further',
          'Notice the difference between pushing volume and projecting resonance',
        ],
        explanation: 'Resonance is what makes a voice carry without strain. A resonant voice fills a room. A strained voice fills a throat.',
      },
      {
        id: 'range',
        title: 'Vocal Range Slides',
        duration: 45,
        type: 'warmup' as const,
        instructions: [
          'Slide your voice from your lowest comfortable note to your highest and back — vocal sirens',
          'Try "wee-ooo-wee-ooo" like a siren — smooth, not jumpy',
          'Do staccato "ha-ha-ha" at different pitches — low, mid, high',
          'End with 3 big yawn-sighs to release any remaining tension',
        ],
        explanation: 'Range exercises prevent monotone delivery. The more range you warm up, the more expressive you can be when speaking.',
      },
      {
        id: 'check-in',
        title: 'Check In',
        duration: 15,
        type: 'reflection' as const,
        instructions: [
          'Notice the difference — your voice should feel warmer, more resonant, more alive',
          'Say a sentence out loud — anything — and hear how it sounds now',
          'You\'re ready to speak',
        ],
        explanation: 'A warmed-up voice sounds confident without trying. You\'ve just given yourself that advantage.',
      },
    ],
  }), [selectedTwisters])

  const handleStartSession = () => {
    setSelectedTwisters(generateSession())
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-teal-500/20 to-teal-400/20 border border-teal-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Voice Warmed Up</h1>
                <p className="text-2xl text-gray-300 mb-8">Your instrument is ready. Time to use it.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You just:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Activated your diaphragm</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Sharpened your articulation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Built resonance and projection</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Expanded your vocal range</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Do this before every practice session, presentation, or call.
                  5 minutes that change how you sound.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Do Again
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-teal-500 to-teal-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Vocal Warmup</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Your voice is an instrument. Cold instruments sound flat. This 5-minute routine
                  warms your breathing, articulation, resonance, and range — so you sound confident
                  from the first word.
                </p>
              </div>
              <div className="bg-teal-500/10 border border-teal-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Warm Up Your Voice?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-300 mb-2">Breathing</h3>
                    <p className="text-gray-300 text-sm">Deep diaphragmatic breathing supports a steady, powerful voice — no strain, no running out of air.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-300 mb-2">Clarity</h3>
                    <p className="text-gray-300 text-sm">Tongue twisters sharpen articulation so every word lands clearly, even under pressure.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-300 mb-2">Resonance</h3>
                    <p className="text-gray-300 text-sm">A resonant voice carries without shouting. It fills a room and holds attention naturally.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">The Routine</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Diaphragmatic Breathing', desc: 'Deep belly breaths with controlled exhale', time: '1 min' },
                    { n: '2', name: 'Tongue Twisters', desc: '3 random twisters — slow then fast', time: '1.5 min' },
                    { n: '3', name: 'Resonance & Projection', desc: 'Humming, placement, and projection', time: '1 min' },
                    { n: '4', name: 'Vocal Range Slides', desc: 'Sirens, staccato, and yawn-sighs', time: '45 sec' },
                    { n: '5', name: 'Check In', desc: 'Notice the difference', time: '15 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-teal-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-teal-500 to-teal-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Warmup
                </button>
                <p className="text-gray-400 mt-4">5 minutes. Stand up. Use your voice.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
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
