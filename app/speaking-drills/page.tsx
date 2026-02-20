import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SpeakingDrillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                Speaking Drills
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Interactive practice sessions to strengthen your speaking skills. 
              Each drill is designed to build confidence, clarity, and presence.
            </p>
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6 mb-12">
              <p className="text-blue-200 text-lg">
                💡 <strong>Pro tip:</strong> Practice these drills regularly to develop muscle memory for confident speaking. 
                Each session takes just 5 minutes but builds lasting skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Drills */}
      <section className="pb-20">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Available Drills</h2>

            <div className="grid gap-8">
              {/* Body Ready - Start Here */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-800/30 backdrop-blur-sm border-2 border-green-400/40 rounded-xl p-8 hover:border-green-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium mb-2">
                      Start every session here
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Body Ready</h3>
                    <p className="text-gray-300 text-lg">Wake up your body and voice before you practise</p>
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    2 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">The warm-up routine:</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Shake out tension</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Vocal warm-up</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Ground posture</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Breathe &amp; commit</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/body-ready"
                  className="inline-flex items-center bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Warm-Up
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Ride the Spike - Pre-Performance */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-orange-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium mb-2">
                      Use before any talk
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Ride the Spike</h3>
                    <p className="text-orange-300 text-sm mb-2">For Pre-Performance Nerves</p>
                    <p className="text-gray-300 text-lg">Metabolise the adrenaline spike and own your first 90 seconds</p>
                  </div>
                  <div className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium">
                    5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Physical adrenaline burn-off</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Physiological sigh technique</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Locking your opening on autopilot</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Performing through elevated heart rate</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg p-4">
                    <p className="text-orange-200 text-sm">
                      <strong>For anyone who gets shaky at the start:</strong> You can&apos;t stop the adrenaline spike, but you can
                      metabolise it faster and have a bulletproof first minute that doesn&apos;t need thinking.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/ride-the-spike"
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Routine
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* First Drill */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">5-Minute Speaking Workout</h3>
                    <p className="text-blue-300 text-sm mb-2">For everyone</p>
                    <p className="text-gray-300 text-lg">Build conviction and authenticity in your speaking</p>
                  </div>
                  <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    5 min
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Vocal warm-up techniques</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking with genuine passion</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Personal storytelling</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Persuasive conviction</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Drill Structure:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 1: Vocal Warm-up</span>
                      <span className="text-blue-300 text-sm">1 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 2: Speak from the heart</span>
                      <span className="text-blue-300 text-sm">1 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 3: Add personal story</span>
                      <span className="text-blue-300 text-sm">1 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 4: Dial up conviction</span>
                      <span className="text-blue-300 text-sm">1.5 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 5: Reflection</span>
                      <span className="text-blue-300 text-sm">30 sec</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/speaking-drills/conviction-workout"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Second Drill - The 5-Minute Reset */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">The 5-Minute Reset</h3>
                    <p className="text-blue-300 text-sm mb-2">For Overthinkers</p>
                    <p className="text-gray-300 text-lg">A pre-speaking reset to regulate your nervous system and meet nervous energy with presence</p>
                  </div>
                  <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Physical activation and release</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Breath and body awareness</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Working with nervous energy</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Clear intention before speaking</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Drill Structure:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 1: Wake the Body</span>
                      <span className="text-blue-300 text-sm">1.5 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 2: Breathe and Orient</span>
                      <span className="text-blue-300 text-sm">1.25 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 3: Welcome the Energy</span>
                      <span className="text-blue-300 text-sm">1 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 4: Clarify Intent</span>
                      <span className="text-blue-300 text-sm">45 sec</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-slate-700/30 rounded">
                      <span className="text-gray-300">Step 5: Commit and Step Forward</span>
                      <span className="text-blue-300 text-sm">30 sec</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/five-minute-reset"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Third Drill - Metaphor Practice */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-purple-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Metaphor Practice</h3>
                    <p className="text-purple-300 text-sm mb-2">For Rationalists</p>
                    <p className="text-gray-300 text-lg">
                      Train your brain to speak in vivid metaphors that make abstract ideas tangible
                    </p>
                  </div>
                  <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    6-12 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Spontaneous metaphorical thinking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Exploring complex situations through imagery</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Making abstract concepts concrete</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Building metaphor fluency</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4">
                    <p className="text-purple-200 text-sm">
                      <strong>Customizable:</strong> Choose 5, 7, or 10 situations per session.
                      Random selection from 28+ scenarios ensures fresh practice every time.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/metaphor-practice"
                  className="inline-flex items-center bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Fourth Drill - Find the Absurd */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Find the Absurd</h3>
                    <p className="text-amber-300 text-sm mb-2">For Intense Speakers</p>
                    <p className="text-gray-300 text-lg">Train your brain to find lightness and unexpected connections</p>
                  </div>
                  <div className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                    6 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Spontaneous humour</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Unexpected connections</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Lightness under pressure</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Playful thinking</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-4">
                    <p className="text-amber-200 text-sm">
                      <strong>How it works:</strong> Two random topics appear. Find the absurd connection and make it funny.
                      5 rounds of improv-style comedy training.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/find-the-absurd"
                  className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Fifth Drill - The Edit */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">The Edit</h3>
                    <p className="text-cyan-300 text-sm mb-2">For Ramblers</p>
                    <p className="text-gray-300 text-lg">Say more with less — train yourself to land the point</p>
                  </div>
                  <div className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                    5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Cutting the fluff</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Clear endings</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">One-breath answers</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Landing the plane</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-lg p-4">
                    <p className="text-cyan-200 text-sm">
                      <strong>For ramblers:</strong> Practice saying the same thing in half the words,
                      then one sentence, then one breath. Train your brain to edit in real-time.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/the-edit"
                  className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Sixth Drill - Conviction Reps */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-red-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Conviction Reps</h3>
                    <p className="text-red-300 text-sm mb-2">For Self-Doubters</p>
                    <p className="text-gray-300 text-lg">Stop hedging and speak with certainty</p>
                  </div>
                  <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                    5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Eliminating hedge words</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Declarative statements</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Conviction starters</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Owning your perspective</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
                    <p className="text-red-200 text-sm">
                      <strong>For self-doubters:</strong> Forced conviction language like &quot;This is critical because...&quot;
                      rewires your default speaking patterns.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/conviction-reps"
                  className="inline-flex items-center bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Seventh Drill - Hold the Space */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-indigo-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Hold the Space</h3>
                    <p className="text-indigo-300 text-sm mb-2">For People Pleasers</p>
                    <p className="text-gray-300 text-lg">Use silence with confidence instead of rushing to fill it</p>
                  </div>
                  <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                    4 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Pausing before speaking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Letting words land</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Comfortable silence</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Clean endings</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-lg p-4">
                    <p className="text-indigo-200 text-sm">
                      <strong>For people pleasers:</strong> Train yourself to pause for 3-5 seconds without
                      filling the silence. Presence, not performance.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/hold-the-space"
                  className="inline-flex items-center bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Eighth Drill - Ground & Land */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-stone-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-stone-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Ground &amp; Land</h3>
                    <p className="text-stone-300 text-sm mb-2">For Performers</p>
                    <p className="text-gray-300 text-lg">Slow down, drop the performance, speak with genuine presence</p>
                  </div>
                  <div className="bg-stone-500/20 text-stone-300 px-3 py-1 rounded-full text-sm font-medium">
                    4.5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Speaking at half speed</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Connection over broadcast</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Meaning every word</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Presence without performance</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-stone-500/10 border border-stone-400/20 rounded-lg p-4">
                    <p className="text-stone-200 text-sm">
                      <strong>For performers:</strong> Energy is a tool, not a crutch. Learn to speak slowly,
                      mean it, and let the truth carry your message.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/ground-and-land"
                  className="inline-flex items-center bg-stone-600 hover:bg-stone-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Ninth Drill - Dial It Up */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-pink-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Dial It Up</h3>
                    <p className="text-pink-300 text-sm mb-2">For Minimalists</p>
                    <p className="text-gray-300 text-lg">Expand, add colour, and fill the space with energy</p>
                  </div>
                  <div className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm font-medium">
                    4.5 min
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What you&apos;ll practice:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Filling the full time</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Adding sensory details</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Emotional texture</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Choosing expansion</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-pink-500/10 border border-pink-400/20 rounded-lg p-4">
                    <p className="text-pink-200 text-sm">
                      <strong>For minimalists:</strong> You have more to say than you think. Practice adding
                      colour, detail, and feeling to fill the space.
                    </p>
                  </div>
                </div>

                <Link
                  href="/speaking-drills/dial-it-up"
                  className="inline-flex items-center bg-pink-500 hover:bg-pink-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Drill
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
