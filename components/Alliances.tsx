import { Mail, Users } from 'lucide-react'

const Alliances = () => {
  return (
    <section id="alliances" className="py-20">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Part Of A Coaching Ecosystem
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            I collaborate with fellow EA-aligned coaches and contribute regularly in the EAG Anywhere Public Speaking channel and the Freelancing For Good community. If you coach in adjacent areas — careers, productivity, leadership — let&apos;s build referral pathways that help people grow faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hello@speakupforgood.com"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Say Hello</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center space-x-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>FFG Community</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Alliances 