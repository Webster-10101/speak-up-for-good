'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

const CONSONANT_SETS = [
  {
    label: 'P / B',
    focus: 'Lips (plosives)',
    drill: [
      'Puh-puh-puh-puh — sharp, percussive, explosive release from the lips',
      'Buh-buh-buh-buh — same release, now with voice',
      'Blend: "puh-buh-puh-buh" — keep the lip closure crisp',
      'Phrase: "Perfect pink pebbles bobbed past Brenda\'s boat"',
    ],
  },
  {
    label: 'T / D',
    focus: 'Tongue tip (plosives)',
    drill: [
      'Tuh-tuh-tuh-tuh — tongue tip taps the ridge behind your top teeth',
      'Duh-duh-duh-duh — same contact, now voiced',
      'Blend: "tuh-duh-tuh-duh" — fast, clean taps',
      'Phrase: "Ted told Todd that Dan\'s dog dug daintily"',
    ],
  },
  {
    label: 'K / G',
    focus: 'Back of tongue (plosives)',
    drill: [
      'Kuh-kuh-kuh-kuh — back of tongue lifts and releases cleanly',
      'Guh-guh-guh-guh — same release, voiced',
      'Blend: "kuh-guh-kuh-guh" — keep the back release snappy',
      'Phrase: "Kate kicked Greg\'s good grey cricket cap"',
    ],
  },
  {
    label: 'S / Z',
    focus: 'Tongue groove (sibilants)',
    drill: [
      'Ssssss — steady airstream, tongue grooved behind the teeth',
      'Zzzzzz — same stream, now voiced — feel the buzz',
      'Blend: "sa-za-sa-za" — alternate without sloppiness',
      'Phrase: "Seven zebras zigzagged past the silent sea"',
    ],
  },
  {
    label: 'F / V',
    focus: 'Lip-teeth (fricatives)',
    drill: [
      'Ffffff — top teeth lightly on lower lip, steady airflow',
      'Vvvvvv — same contact, now voiced',
      'Blend: "fa-va-fa-va" — keep each sound distinct',
      'Phrase: "Five frantic friends favoured velvet over fleece"',
    ],
  },
  {
    label: 'SH / ZH',
    focus: 'Palatal fricatives',
    drill: [
      'Shhhhh — tongue pulled back, lips slightly rounded',
      'Zhhhhh — as in "measure" or "beige" — now voiced',
      'Blend: "sha-zha-sha-zha" — clear difference between the two',
      'Phrase: "She shared a generous measure of luscious pleasure"',
    ],
  },
  {
    label: 'CH / J',
    focus: 'Affricates',
    drill: [
      'Ch-ch-ch-ch — a quick T blending into SH',
      'J-j-j-j — a quick D blending into ZH, voiced',
      'Blend: "cha-ja-cha-ja" — land both sounds cleanly',
      'Phrase: "Jane\'s cheerful children chose jumbo jellybeans"',
    ],
  },
]

const ENUNCIATION_TWISTERS = [
  'Toy boat, toy boat, toy boat',
  'Red leather, yellow leather, red leather, yellow leather',
  'The lips, the teeth, the tip of the tongue',
  'Rubber baby buggy bumpers',
  'A big black bug bit a big black bear',
  'Three free throws through the thicket',
  'Truly rural, truly rural, truly rural',
  'Eleven benevolent elephants',
  'Mixed biscuits, mixed biscuits, mixed biscuits',
  'Freshly fried fish, freshly fried flesh',
  'Irish wristwatch, Irish wristwatch',
  'Which witch wished which wicked wish',
]

const READING_PASSAGES = [
  {
    focus: 'Word endings',
    text: 'Asked. Walked. Locked. Blocked. Running, pushing, pulling, fighting. Every ending matters — every D, every T, every NG. When you drop the ending of a word, the listener has to guess. When you land every ending, you sound certain and in control.',
  },
  {
    focus: 'Plosives',
    text: 'Brad\'s black book brought back big, bad business. Perhaps Paul preferred plastic to paper. Ken kept kicking curiously until Gary grabbed the green gate and gave it a good, gentle tug.',
  },
  {
    focus: 'Sibilants',
    text: 'She said she sold seven ships, but the sixth ship\'s captain said she sold six. Slippery subjects spoken swiftly seldom sound smooth. Sharp speech separates the serious from the sloppy.',
  },
  {
    focus: 'Real-world speaking',
    text: 'When I stand up to speak, I want every word to land. Not some of the words. Every word. The crispness of a T at the end of "want." The snap of a K in "speak." The full, resonant ending of "land." Clarity is a choice. Make it.',
  },
]

export default function EnunciationPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedConsonants, setSelectedConsonants] = useState<typeof CONSONANT_SETS>([])
  const [selectedTwisters, setSelectedTwisters] = useState<string[]>([])
  const [selectedPassage, setSelectedPassage] = useState<typeof READING_PASSAGES[number] | null>(null)

  const generateSession = () => {
    const shuffledConsonants = [...CONSONANT_SETS].sort(() => Math.random() - 0.5).slice(0, 2)
    const shuffledTwisters = [...ENUNCIATION_TWISTERS].sort(() => Math.random() - 0.5).slice(0, 2)
    const passage = READING_PASSAGES[Math.floor(Math.random() * READING_PASSAGES.length)]
    return { shuffledConsonants, shuffledTwisters, passage }
  }

  const drill = useMemo(() => ({
    title: 'Enunciation',
    description: 'Sharpen articulation — drill consonants, ladder twisters, and record-and-review',
    totalDuration: 510,
    steps: [
      {
        id: 'articulator-activation',
        title: 'Articulator Activation',
        duration: 60,
        type: 'warmup' as const,
        instructions: [
          'Lip trill for 10 seconds — blow air through closed lips, let them buzz',
          'Tongue stretch for 10 seconds — stick it out, down, up, side to side',
          'Jaw roll for 10 seconds — drop the jaw, circle it gently both ways',
          'Face wake-up for 10 seconds — big exaggerated O, E, A shapes with the mouth',
          'Final 20 seconds — free-mix lip trills, tongue stretches, and jaw drops',
        ],
        explanation: 'Your articulators are muscles. Cold muscles make sloppy sounds. This loosens lips, tongue, and jaw so they can move precisely in the next steps.',
      },
      {
        id: 'consonant-drills',
        title: 'Consonant Drills',
        duration: 120,
        type: 'challenge' as const,
        instructions: [
          `Set 1 — ${selectedConsonants[0]?.label || ''} (${selectedConsonants[0]?.focus || ''})`,
          ...(selectedConsonants[0]?.drill || []).map((line) => `  • ${line}`),
          '',
          `Set 2 — ${selectedConsonants[1]?.label || ''} (${selectedConsonants[1]?.focus || ''})`,
          ...(selectedConsonants[1]?.drill || []).map((line) => `  • ${line}`),
          '',
          '60 seconds per set — work through all 4 lines',
          'Exaggerate every contact. Over-articulation in drill = normal articulation on stage',
        ],
        explanation: 'Consonants carry meaning. Vowels carry feeling. Most unclear speech is a consonant problem — dropped plosives, sloppy sibilants, mushy affricates. Drilling specific sounds in isolation builds muscle memory you can lean on under pressure.',
      },
      {
        id: 'twister-ladder',
        title: 'Tongue Twister Ladder',
        duration: 120,
        type: 'challenge' as const,
        instructions: [
          `Twister 1: "${selectedTwisters[0] || ''}"`,
          `Twister 2: "${selectedTwisters[1] || ''}"`,
          '',
          'For each twister, run the ladder (about 30 seconds each):',
          '  ↓ SLOW: every sound perfectly formed. No rush.',
          '  ↑ FAST: push the speed until it breaks.',
          '  ↓ SLOW: reclaim the accuracy. Clarity wins.',
          '',
          'The goal is not speed. The goal is conscious control at any speed.',
        ],
        explanation: 'The slow → fast → slow ladder teaches the clarity-vs-speed tradeoff explicitly. Most speakers only ever practise one speed — their default. Forcing the ladder reveals where you sacrifice articulation for pace, so you can choose it instead of defaulting to it.',
      },
      {
        id: 'read-aloud',
        title: 'Read-Aloud + Playback',
        duration: 180,
        type: 'challenge' as const,
        instructions: [
          `Today\'s passage — focus: ${selectedPassage?.focus || ''}`,
          `"${selectedPassage?.text || ''}"`,
          '',
          'Open Voice Memos (or any recorder) on your phone',
          '1. Record yourself reading the passage once (about 30 sec)',
          '2. Listen back — mark where you dropped endings, rushed consonants, or mushed syllables',
          '3. Record it a second time — fix what you just heard',
          '4. Listen back to the second take — notice the difference',
        ],
        explanation: 'You cannot fix what you cannot hear. Most speakers never listen to themselves speak — so their blind spots stay blind. A 30-second recording + playback loop will teach you more about your articulation than an hour of abstract practice.',
      },
      {
        id: 'check-in',
        title: 'Check In',
        duration: 30,
        type: 'reflection' as const,
        instructions: [
          'Say a normal sentence out loud — anything you might say today',
          'Notice the crispness of the word endings',
          'Notice which consonants feel fuller than usual',
          'Pocket that feeling. That\'s the baseline when clarity matters.',
        ],
        explanation: 'The point of drilling is not to sound drilled. It is to shift your everyday baseline upward, so ordinary speech is clearer without effort.',
      },
    ],
  }), [selectedConsonants, selectedTwisters, selectedPassage])

  const handleStartSession = () => {
    const { shuffledConsonants, shuffledTwisters, passage } = generateSession()
    setSelectedConsonants(shuffledConsonants)
    setSelectedTwisters(shuffledTwisters)
    setSelectedPassage(passage)
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-cyan-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">Enunciation Sharpened</h1>
                <p className="text-2xl text-gray-300 mb-8">Every sound landed on purpose. Take that with you.</p>
                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">You just:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Activated the articulators</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Drilled target consonants</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Ran the slow-fast-slow ladder</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Recorded and reviewed your own voice</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Do this daily for two weeks and your baseline articulation will shift.
                  Clarity is a trained habit, not a fixed trait.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleRestart} className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Do Again
                  </button>
                  <Link href="/speaking-drills" className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    More Drills
                  </Link>
                  <Link href="/" className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              <Link href="/speaking-drills" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">Enunciation</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Sharpen your instrument before every practice or performance. An 8-minute drill that
                  wakes the articulators, targets specific consonants, runs the slow-fast-slow twister
                  ladder, and closes with a record-and-review loop so you hear what your listener hears.
                </p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why Train Enunciation?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">Clarity</h3>
                    <p className="text-gray-300 text-sm">Most unclear speech is a consonant problem. Dropped endings and mushy plosives make listeners guess.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">Authority</h3>
                    <p className="text-gray-300 text-sm">Crisp articulation signals care and control. Slurred speech signals rush, nerves, or indifference.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">Self-awareness</h3>
                    <p className="text-gray-300 text-sm">Recording + playback reveals blind spots no coach has to point out. Your ears do the work.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">The Routine</h2>
                <div className="space-y-4">
                  {[
                    { n: '1', name: 'Articulator Activation', desc: 'Wake lips, tongue, and jaw', time: '1 min' },
                    { n: '2', name: 'Consonant Drills', desc: 'Two random target sets, exaggerated', time: '2 min' },
                    { n: '3', name: 'Tongue Twister Ladder', desc: 'Slow → fast → slow on two twisters', time: '2 min' },
                    { n: '4', name: 'Read-Aloud + Playback', desc: 'Record, listen back, re-record — use your phone', time: '3 min' },
                    { n: '5', name: 'Check In', desc: 'Feel the new baseline', time: '30 sec' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">{step.n}</div>
                        <div>
                          <h3 className="text-white font-semibold">{step.name}</h3>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </div>
                      <div className="text-cyan-300 font-semibold">{step.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/40 border border-cyan-400/20 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-2">Before you start</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Have your phone within reach with a voice recorder ready (Voice Memos on iPhone, any recorder on Android).
                  Step 4 needs you to record yourself and listen back — that&apos;s where most of the learning happens.
                </p>
              </div>
              <div className="text-center">
                <button onClick={handleStartSession} className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105">
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">8 minutes. Stand up. Land every sound.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
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
