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
              {/* First Drill */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">5-Minute Speaking Workout</h3>
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

              {/* Coming Soon Drills */}
              <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-8 opacity-60">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Storytelling Mastery</h3>
                    <p className="text-gray-300 text-lg">Craft compelling narratives that captivate your audience</p>
                  </div>
                  <div className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-8 opacity-60">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Presence & Body Language</h3>
                    <p className="text-gray-300 text-lg">Command attention through powerful non-verbal communication</p>
                  </div>
                  <div className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
