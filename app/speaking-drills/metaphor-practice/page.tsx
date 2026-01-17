'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DrillSession from '@/components/DrillSession'

interface Situation {
  id: string
  text: string
  coachingQuestions: string[]
}

const SITUATION_POOL: Situation[] = [
  // Career & Professional (7)
  {
    id: 'stuck-between-choices',
    text: 'Stuck between two appealing choices',
    coachingQuestions: ['What does each path feel like in your body?', 'If this were a landscape, what do you see?']
  },
  {
    id: 'business-interrupted',
    text: 'Making great progress building the business until the interruption',
    coachingQuestions: ['What kind of interruption was it - a wall, a detour, or something else?', 'Where does the interruption live in your body?']
  },
  {
    id: 'success',
    text: 'Success',
    coachingQuestions: ['If success were a season, which one?', 'What\'s the temperature of this success?']
  },
  {
    id: 'lost-major-client',
    text: 'Just lost a major client or deal',
    coachingQuestions: ['What does this space feel like now?', 'If this were weather, what\'s happening?']
  },
  {
    id: 'too-much-responsibility',
    text: 'Given too much responsibility too quickly',
    coachingQuestions: ['What are you carrying? How heavy is it?', 'If this were a journey, what terrain are you crossing?']
  },
  {
    id: 'burnout',
    text: 'Burnout from working at unsustainable pace',
    coachingQuestions: ['What\'s running out? What needs refilling?', 'If this were a fire, what\'s happening to it?']
  },
  {
    id: 'office-politics',
    text: 'Navigating office politics or team conflict',
    coachingQuestions: ['What kind of terrain is this?', 'If this were a dance, what\'s the rhythm?']
  },

  // Personal Growth & Transformation (7)
  {
    id: 'exciting-unknowns',
    text: 'About to enter an exciting new period with a lot of unknowns',
    coachingQuestions: ['If you were standing at the edge of something, what do you see?', 'What does the unknown feel like physically?']
  },
  {
    id: 'everything-at-once',
    text: 'After a long period of inaction, everything happening at once',
    coachingQuestions: ['How fast is it moving?', 'If this were water, what\'s the current like?']
  },
  {
    id: 'waking-from-denial',
    text: 'Waking up from denial or avoidance',
    coachingQuestions: ['What are you seeing now that you couldn\'t see before?', 'If this were light, how bright is it?']
  },
  {
    id: 'letting-go',
    text: 'Letting go of something that used to define you',
    coachingQuestions: ['What\'s being released?', 'If this were a season, which one are you in?']
  },
  {
    id: 'learning-lesson',
    text: 'Finally learning a lesson you\'ve resisted for years',
    coachingQuestions: ['What finally broke through?', 'Where does this realization live in your body?']
  },
  {
    id: 'starting-over',
    text: 'Starting over after a major life change',
    coachingQuestions: ['What ground are you standing on?', 'If this were a building, what stage of construction?']
  },
  {
    id: 'stuck-pattern',
    text: 'Feeling stuck in the same pattern',
    coachingQuestions: ['What does this loop feel like?', 'If this were a path, what\'s blocking it?']
  },

  // Emotional States (7)
  {
    id: 'sadness',
    text: 'Sadness',
    coachingQuestions: ['If sadness had weight, how heavy is it?', 'Where does it settle in your body?']
  },
  {
    id: 'exhaustion',
    text: 'Exhaustion',
    coachingQuestions: ['What\'s depleted?', 'If this were a battery, what percentage?']
  },
  {
    id: 'anxiety',
    text: 'Anxiety about the future',
    coachingQuestions: ['How fast is your mind moving?', 'If this worry were weather, what\'s brewing?']
  },
  {
    id: 'joy-uncertainty',
    text: 'Joy mixed with uncertainty',
    coachingQuestions: ['What are the two flavors mixing?', 'If this were light and shadow, how are they dancing?']
  },
  {
    id: 'anger-injustice',
    text: 'Anger at injustice',
    coachingQuestions: ['What needs to be said?', 'If this anger were fire, what\'s it burning?']
  },
  {
    id: 'grief',
    text: 'Grief over a loss',
    coachingQuestions: ['What shape does this absence take?', 'If this were a landscape, what\'s missing?']
  },
  {
    id: 'peace',
    text: 'Peace after a long struggle',
    coachingQuestions: ['What\'s finally quiet?', 'If this were temperature, how warm?']
  },

  // Resources & External Forces (7)
  {
    id: 'money-losses',
    text: 'Money losses because of mismanagement',
    coachingQuestions: ['What slipped through your fingers?', 'If this were a container, what happened to it?']
  },
  {
    id: 'windfalls',
    text: 'Series of windfalls or unexpected good fortune',
    coachingQuestions: ['How did these arrive?', 'If this were weather, what kind of wind is blowing?']
  },
  {
    id: 'chaotic-environment',
    text: 'Chaotic work environment',
    coachingQuestions: ['What kind of chaos - storm, traffic jam, or something else?', 'What\'s the loudest noise?']
  },
  {
    id: 'romantic-complexity',
    text: 'Two new romantic relationships creating complexity',
    coachingQuestions: ['What are you juggling?', 'If this were a dance, how many partners?']
  },
  {
    id: 'overdoing-exercise',
    text: 'Going from too little exercise to overdoing it',
    coachingQuestions: ['What swung too far?', 'If this were motion, what\'s the speed?']
  },
  {
    id: 'information-overload',
    text: 'Information overload and decision paralysis',
    coachingQuestions: ['What\'s flooding in?', 'If this were sound, what\'s the volume?']
  },
  {
    id: 'abundance-after-scarcity',
    text: 'Sudden abundance after scarcity',
    coachingQuestions: ['What was empty that\'s now full?', 'If this were a faucet, how strong is the flow?']
  }
]

interface DrillStep {
  id: string
  title: string
  duration: number
  type: 'warmup' | 'challenge' | 'reflection'
  instructions: string[]
  explanation: string
}

export default function MetaphorPracticePage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionSize, setSessionSize] = useState<5 | 7 | 10>(5)
  const [hintsEnabled, setHintsEnabled] = useState(false)
  const [selectedSituations, setSelectedSituations] = useState<Situation[]>([])

  // Generate random subset of situations
  const generateRandomSession = (count: number): Situation[] => {
    const shuffled = [...SITUATION_POOL].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // Generate dynamic drill configuration
  const generateMetaphorDrill = (situations: Situation[], showHints: boolean) => {
    const steps: DrillStep[] = [
      // Warmup step
      {
        id: 'warmup',
        title: 'Find Your Metaphor Voice',
        duration: 30,
        type: 'warmup' as const,
        instructions: [
          'Take a few deep breaths and settle into your space',
          'Metaphors aren\'t about getting it "right" - they\'re about finding what\'s true',
          'You\'ll be given situations to explore through metaphor',
          'Don\'t overthink - let the first image that comes guide you',
          'Speak your metaphors aloud, even if they feel incomplete'
        ],
        explanation: 'Metaphors help us access intuitive knowing that logical language can\'t reach.'
      },

      // Dynamic situation steps
      ...situations.map((situation, index) => ({
        id: `situation-${index}`,
        title: situation.text,
        duration: 60,
        type: 'challenge' as const,
        instructions: [
          'Read the situation above',
          'What metaphor captures this experience?',
          'Speak it aloud: "This is like..."',
          'Explore the metaphor - add details, textures, movement',
          'Don\'t censor yourself - follow where the metaphor wants to go',
          ...(showHints ? situation.coachingQuestions : [])
        ],
        explanation: 'Speaking metaphors aloud strengthens your ability to translate experience into resonant language.'
      })),

      // Reflection step
      {
        id: 'reflection',
        title: 'Reflect on Your Metaphors',
        duration: 60,
        type: 'reflection' as const,
        instructions: [
          'Which metaphor felt most alive?',
          'Did any metaphors surprise you?',
          'Notice how metaphors reveal patterns across different situations',
          'Which metaphor would you want to develop further?'
        ],
        explanation: 'Reflection helps you recognize your unique metaphorical style and strengths.'
      }
    ]

    return {
      title: 'Metaphor Practice',
      description: 'Develop your metaphorical thinking to make abstract experiences tangible and memorable',
      totalDuration: situations.length * 60 + 90, // warmup (30s) + situations + reflection (60s)
      steps
    }
  }

  // Generate drill with useMemo for performance
  const metaphorDrill = useMemo(
    () => generateMetaphorDrill(selectedSituations, hintsEnabled),
    [selectedSituations, hintsEnabled]
  )

  const handleStartSession = () => {
    setSelectedSituations(generateRandomSession(sessionSize))
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-400/30 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  🎉 Congratulations!
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                  You&apos;ve completed the Metaphor Practice drill
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">What You Accomplished:</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Created {selectedSituations.length} unique metaphors</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Practiced spontaneous metaphorical thinking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Explored situations through imagery</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Strengthened metaphor fluency</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-8">
                  Metaphors make your coaching more vivid and memorable. The more you practice,
                  the more naturally powerful metaphors will flow in your conversations.
                  Try different session sizes and turn hints on or off to keep it fresh!
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
                    className="bg-gradient-to-r from-purple-500 to-purple-400 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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

  // Intro Screen
  if (!sessionStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900">
        <Navigation />

        <section className="pt-32 pb-20">
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/speaking-drills"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Drills
              </Link>

              {/* Drill Introduction */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Metaphor Practice
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Train your brain to speak in vivid metaphors that make abstract experiences tangible and memorable.
                  You&apos;ll practice creating spontaneous metaphors for various coaching situations,
                  helping you develop the ability to translate complex emotions and experiences into resonant language.
                </p>
              </div>

              {/* Preparation Tips */}
              <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">🎯 Before You Start</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">What You&apos;ll Need:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>A quiet space where you can speak aloud</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>6-12 minutes of uninterrupted time</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>An open, creative mindset</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Pro Tips:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Don&apos;t overthink - trust your first instinct</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Speak your metaphors aloud to make them real</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>There&apos;s no &quot;right&quot; answer - follow what feels true</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Session Configuration */}
              <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Configure Your Session</h2>

                {/* Session Size Selector */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">How many situations?</h3>
                  <div className="flex gap-4">
                    {[5, 7, 10].map(size => (
                      <button
                        key={size}
                        onClick={() => setSessionSize(size as 5 | 7 | 10)}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          sessionSize === size
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                        }`}
                      >
                        {size} situations
                        <div className="text-sm opacity-75 mt-1">
                          ~{Math.ceil((size * 60 + 90) / 60)} min
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hints Toggle */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Coaching hints</h3>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hintsEnabled}
                      onChange={(e) => setHintsEnabled(e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-700 border-purple-400/30"
                    />
                    <span className="text-gray-300">
                      Show coaching questions to help explore each situation
                    </span>
                  </label>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartSession}
                  className="bg-gradient-to-r from-purple-500 to-purple-400 hover:opacity-90 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                </button>
                <p className="text-gray-400 mt-4">
                  Ready to explore? You&apos;ll practice {sessionSize} random situations with {hintsEnabled ? 'coaching hints' : 'no hints'}.
                </p>
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <DrillSession
            drill={metaphorDrill}
            onComplete={handleSessionComplete}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
