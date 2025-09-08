'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Who is this for?",
      answer: "If you're here, probably you! Basically, it's for anyone who wants to feel more confident and comfortable when they speak. I often work with professionals in charities — researchers, founders, advocates — but the same skills apply whether you're pitching for funding, presenting at work, giving a wedding speech, leading a team, or simply wanting to feel more comfortable in your own skin."
    },
    {
      question: "What makes your approach different?",
      answer: "I strive to create a comfortable, supportive environment — and then push you (gently) out of your comfort zone, because that's where growth happens. Using the proven Ultraspeaking method that has helped thousands of people, we dive straight into practical, high-leverage exercises that can instantly shift how you speak and how you feel.\n\nI also know what it's like to be on the other side. I started out terrified of speaking myself. That means I understand the blocks, not just the techniques."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients notice a shift in confidence and clarity in their very first session. For lasting change, we go deeper over a package of sessions — giving you time to practise, refine, and embed new habits. My coaching balances quick tips and tricks for immediate results with deeper insights to uncover and work on the inner blockages that hold you back."
    },
    {
      question: "Do you work with people outside of charities and the EA community?",
      answer: "Absolutely. While I specialise in helping people communicate complex, mission-driven work, my methods work for anyone who wants to speak with more presence and impact — from nervous best men to boardroom leaders."
    },
    {
      question: "What if I'm extremely nervous about speaking?",
      answer: "Then you're in exactly the right place. Many of my clients arrive with speaking anxiety. We start gently, at your pace, and build confidence step by step. You'll never be thrown in unprepared — the process is supportive, playful, and (surprisingly) fun."
    },
    {
      question: "Isn't this just who I am? I've always been shy/nervous. Can I really change?",
      answer: "Yes. Speaking confidence isn't a fixed trait — it's a skill. If you practise in the right way, your brain and body learn new patterns. I've seen people go from shaking hands and dry mouths to delivering talks they're proud of — and actually enjoying it. It doesn't mean you stop being you. It means you can express yourself more fully and trust yourself to show up when it matters."
    },
    {
      question: "What happens in a session?",
      answer: "We'll usually jump straight into short, practical speaking games to get you talking immediately. They're designed to put you under just enough pressure to learn — but not so much that it feels overwhelming. Each session is tailored to your goals, whether that's nailing a presentation, handling Q&A, speaking up in meetings, or simply feeling comfortable introducing yourself in a room."
    },
    {
      question: "Do you offer free sessions?",
      answer: "Yes — I offer a free 20-minute intro session. This gives us both a chance to see if we're a good fit before you commit. You'll get a taste of the method, and we'll decide together on next steps."
    },
    {
      question: "How do I book?",
      answer: "Just click the link to book through my Calendly. You'll be able to choose a time, confirm details, and pay securely for any paid sessions or packages. If you book a package, you'll schedule the first session right away and then we'll arrange the rest together (usually the same day/time each week)."
    },
    {
      question: "What if I have an urgent deadline (e.g. a wedding speech or big pitch next week)?",
      answer: "I know the feeling! There's no time to waste — we'll do an intensive one-off session focused on your immediate need. I'll share tips, techniques, and targeted practice to help you feel ready for action, even if time is short. If you then want to build longer-term skills, we can talk about a package."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white/50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ










