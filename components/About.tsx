import { CheckCircle } from 'lucide-react'

const About = () => {
  const credentials = [
    "Ultraspeaking-certified coach",
    "Co-founder of Freelancing For Good",
    "Dozens of clients coached",
    "Specialist in confidence, presence, and high-stakes prep"
  ]

  return (
    <section id="about" className="py-20">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-extra-wide text-slate-500 mb-6 font-medium">
              My Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
                If I Could Learn This, So Can You
              </span>
            </h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-slate-700 leading-relaxed mb-12">
            <p className="text-xl leading-relaxed">
              I was always the quiet kid — I actually quit my first online speaking lessons mid-lesson. I dreaded public speaking of any kind, from giving a speech to ordering a coffee in a busy café. The Ultraspeaking method gave me practical tools and techniques to build my confidence, reduce my nerves and find my voice in the situations where it used to abandon me. Now, as an Ultraspeaking-certified coach, I help others do the same: move past blocks, speak authentically, and make a difference to what they care about.
            </p>
          </div>
          
          <div className="bg-white/70 rounded-xl p-8 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Why Work With Me</h3>
            <div className="space-y-4">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-700">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 