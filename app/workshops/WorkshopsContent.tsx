'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Users, Clock, Zap, MessageCircle, Target, Sparkles, Quote } from 'lucide-react'

const formats = [
  {
    title: "Lunch & Learn",
    duration: "60–90 minutes",
    participants: "Up to 20",
    description: "A focused, high-energy session that fits into a working day. Perfect for introducing your team to practical speaking techniques they can use immediately.",
    includes: [
      "Interactive warm-up exercises",
      "1–2 core speaking drills",
      "Group practice with live feedback",
      "Takeaway techniques for everyday use",
    ],
    bestFor: "Teams wanting an introduction to better communication without a big time commitment.",
    color: "blue",
  },
  {
    title: "Half-Day Workshop",
    duration: "3–4 hours",
    participants: "6–15",
    description: "The sweet spot. Enough time to build real skills and address specific team challenges — whether that's pitching, presenting, or speaking up in meetings.",
    includes: [
      "Diagnostic: where your team is now",
      "Targeted drills for your team's challenges",
      "Individual and group practice rounds",
      "Techniques for managing nerves and blockers",
      "Action plan for continued development",
    ],
    bestFor: "Teams preparing for conferences, fundraising, client work, or leadership development.",
    color: "green",
    featured: true,
  },
  {
    title: "Full-Day Intensive",
    duration: "6–7 hours",
    participants: "6–15",
    description: "A deep, transformative day. Covers everything from presence and clarity to storytelling and high-stakes delivery. Your team leaves with a completely different relationship to speaking.",
    includes: [
      "Everything in the half-day workshop",
      "Storytelling and narrative structure",
      "High-stakes simulation exercises",
      "Individual blocker identification",
      "Personalised feedback for each participant",
      "Follow-up resources and drill access",
    ],
    bestFor: "Organisations investing seriously in their team's communication and presence.",
    color: "purple",
  },
]

const testimonials = [
  {
    quote: "This session was kind, supportive, and generous in its content — I learned a lot. Public speaking can be so scary, but Alistair shared tangible techniques to feel more confident and be a more impactful speaker.",
    name: "Nicky",
    context: "Workshop attendee",
  },
  {
    quote: "I love the environment and energy everyone brought in! It makes me hopeful that I've found the right place for me to grow professionally and maybe even personally as well.",
    name: "Workshop attendee",
    context: "Workshop attendee",
  },
]

const useCases = [
  {
    title: "Conference Preparation",
    description: "Get your team ready to represent your organisation on stage. Work on clarity, presence, and managing nerves.",
    icon: Target,
  },
  {
    title: "Fundraising & Pitching",
    description: "Sharpen how your team communicates impact. Practise telling compelling stories under pressure.",
    icon: Zap,
  },
  {
    title: "Leadership Development",
    description: "Help emerging leaders find their voice. Build the confidence to speak with conviction in any room.",
    icon: Users,
  },
  {
    title: "Team Development & Bonding",
    description: "One of the best investments a team can make. Learn together, support each other, and raise the communication baseline across your organisation.",
    icon: MessageCircle,
  },
]

const faqs = [
  {
    question: "How do you tailor workshops to our team?",
    answer: "Every workshop starts with a conversation about what your team needs. I'll ask about your context, challenges, and goals — then design the session around that. No two workshops are the same."
  },
  {
    question: "Can you run workshops remotely?",
    answer: "Yes. Online workshops work well, especially for distributed teams. The exercises are designed to be interactive and engaging over video. In-person is also available, depending on location."
  },
  {
    question: "What size groups work best?",
    answer: "For the half-day and full-day formats, 6–15 people is ideal — small enough for individual attention, large enough for group energy. Lunch & learns can go up to 20."
  },
  {
    question: "What's your approach?",
    answer: "I use Ultraspeaking methodology — rep-based training that builds instinctive confidence under pressure. It's active and practical, not lecture-based. People speak within the first 10 minutes. I also draw on memory reconsolidation techniques for deeper blockers."
  },
  {
    question: "Can participants follow up with 1:1 coaching?",
    answer: "Absolutely. Workshop participants get access to discounted 1:1 coaching packages if they want to go deeper on specific areas. This is often where the biggest individual breakthroughs happen."
  },
  {
    question: "What's the investment?",
    answer: "Pricing depends on the format, group size, and level of customisation. Get in touch and I'll put together a proposal that fits your needs and budget."
  },
]

export default function WorkshopsContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleGetInTouch = () => {
    window.open('https://calendly.com/alistair-webster/intro-call', '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="py-6 border-b border-white/10">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/speak_up_icon_.svg"
                alt="Speak Up For Good"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400/90 via-blue-300/95 to-blue-400/90 bg-clip-text text-transparent">
                Speak Up For Good
              </span>
            </a>
            <div className="text-sm text-green-300 font-medium">
              Team Workshops
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-green-500/[0.03] backdrop-blur-[0.5px]"></div>

        <div className="container-max section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-green-400/30">
              <Users className="w-4 h-4" />
              <span>Team Workshops</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-green-400/80 via-green-300/90 to-green-400/80 bg-clip-text text-transparent backdrop-blur-sm drop-shadow-lg">
                Help Your Team Speak With Clarity and Confidence
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                Interactive speaking workshops that give your team practical techniques they can use immediately — whether they&apos;re presenting, pitching, or speaking up in meetings.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Not a lecture. Not a seminar. Real practice, real feedback, real progress — in a single session.
              </p>
            </div>

            {/* Key benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-slate-400">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Tailored to your team
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                In-person or remote
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Practical and interactive
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Follow-up coaching available
              </span>
            </div>

            {/* CTA */}
            <div className="mb-8">
              <button
                onClick={handleGetInTouch}
                className="bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
              >
                Discuss a Workshop
              </button>
              <p className="text-sm text-slate-500 mt-4">
                Free 20-minute call to discuss your team&apos;s needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-8 border border-green-400/20 relative">
                  <Quote className="w-8 h-8 text-green-400/30 absolute top-6 right-6" />
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="text-green-300 font-medium">
                    — {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Teams Use This For
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every workshop is tailored — but these are the most common reasons teams get in touch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <div key={index} className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-green-400/30 transition-colors">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{useCase.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workshop Formats */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Workshop Formats
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose the format that fits your team and schedule. All workshops are customised to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {formats.map((format, index) => {
              const colorClasses = {
                blue: {
                  card: "bg-white/5 border-white/10",
                  badge: "bg-blue-500/20 text-blue-300 border-blue-400/30",
                  check: "text-blue-400",
                  button: "border-2 border-white/20 text-white hover:bg-white/10",
                },
                green: {
                  card: "bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-400/40",
                  badge: "bg-green-500/20 text-green-300 border-green-400/30",
                  check: "text-green-400",
                  button: "bg-green-500 hover:bg-green-400 text-white",
                },
                purple: {
                  card: "bg-white/5 border-white/10",
                  badge: "bg-purple-500/20 text-purple-300 border-purple-400/30",
                  check: "text-purple-400",
                  button: "border-2 border-white/20 text-white hover:bg-white/10",
                },
              }[format.color]!

              return (
                <div key={index} className={`rounded-xl p-8 border relative ${colorClasses.card}`}>
                  {format.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{format.title}</h3>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="flex items-center text-slate-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {format.duration}
                      </span>
                      <span className="flex items-center text-slate-400 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {format.participants}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">{format.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {format.includes.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colorClasses.check}`} />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-slate-500 text-xs mb-6 italic">
                    Best for: {format.bestFor}
                  </p>

                  <button
                    onClick={handleGetInTouch}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${colorClasses.button}`}
                  >
                    Get in Touch
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "We talk about your team",
                  description: "A short call to understand your context, challenges, and goals. What does your team need? What's the occasion? What would make this a success?",
                },
                {
                  step: "2",
                  title: "I design the workshop",
                  description: "Based on our conversation, I put together a tailored session — the right exercises, the right focus areas, the right level of challenge for your group.",
                },
                {
                  step: "3",
                  title: "Your team practises (a lot)",
                  description: "The workshop itself is hands-on. Everyone speaks within the first 10 minutes. It's supportive, energising, and surprisingly fun — even for the nervous ones.",
                },
                {
                  step: "4",
                  title: "They leave with real tools",
                  description: "Not just inspiration — practical techniques they can use in their next meeting, presentation, or pitch. Plus access to online speaking drills for continued practice.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-green-400/30">
                    <span className="text-green-300 font-bold text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              The Approach
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Workshops use the Ultraspeaking methodology — rep-based training that builds instinctive, confident speaking under pressure. It&apos;s active and practical, not a lecture with slides.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Your team will practise real speaking scenarios in a supportive environment, get honest feedback, and walk away with techniques they can apply immediately.
            </p>
            <p className="text-sm text-green-300">Ultraspeaking-certified coach</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-green-600/5">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let&apos;s Talk About Your Team
            </h2>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed">
              Every workshop is tailored. Book a free call and let&apos;s figure out the right format for your team.
            </p>
            <p className="text-slate-400 mb-8">
              20 minutes. No pitch. Just a conversation about what your team needs.
            </p>
            <button
              onClick={handleGetInTouch}
              className="bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container-max section-padding">
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2026 Speak Up For Good</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
