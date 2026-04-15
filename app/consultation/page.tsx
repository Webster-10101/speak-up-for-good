'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, MessageCircle, Compass } from 'lucide-react';

// PLACEHOLDER: replace with the actual free consultation Calendly URL
const calendlyUrl = 'https://calendly.com/alistair-webster/free-consultation';

const painPoints = [
  'You know something\u2019s holding your speaking back but can\u2019t quite name what it is.',
  'You\u2019ve tried the tips, the reframes, the deep breaths \u2014 and the same pattern keeps showing up.',
  'You want a clearer sense of what to focus on next, not another generic course or framework.',
  'You\u2019re weighing whether coaching is worth it and want an honest read before deciding.',
];

const whatYouGet = [
  {
    icon: Target,
    title: 'Clarity on what\u2019s actually blocking you',
    body: 'We\u2019ll get underneath the surface symptom to the real pattern driving it \u2014 the thing you probably half-sense but haven\u2019t been able to name.',
  },
  {
    icon: Compass,
    title: 'Concrete steps you can take',
    body: 'You\u2019ll leave with specific things to try in the next two weeks \u2014 a drill, a reframe, or a situation to practise in. Not generic advice.',
  },
  {
    icon: MessageCircle,
    title: 'An honest read on fit',
    body: 'If coaching with me makes sense, I\u2019ll say so. If it doesn\u2019t, I\u2019ll point you where I think you\u2019ll get the most leverage. The clarity is yours to keep either way.',
  },
];

const testimonials = [
  {
    quote:
      'The way you stayed at ease and heard my questions inspired me to do the same \u2014 to take my time and own my speaking. This was one of the most impactful coaching sessions I\u2019ve had.',
    author: 'Evelyn Q',
  },
  {
    quote:
      'You gave me personalised feedback that really helped. I actually spoke for the entire hour, which I\u2019m not used to, and it felt great. You helped me believe more in my own skills as a speaker.',
    author: 'Liudmila',
  },
];

const faqs = [
  {
    q: 'Is this a sales call?',
    a: 'No. The 30 minutes are yours. We use them to get a clear read on what\u2019s going on and what useful next steps look like. If coaching fits, I\u2019ll say so at the end \u2014 but the clarity you leave with is the same either way.',
  },
  {
    q: 'Who is this for?',
    a: 'Anyone who wants a clearer sense of what\u2019s holding their speaking back. You don\u2019t need to be a "speaker" or have any prior framework knowledge. If words come out of your mouth and you\u2019d like it to feel easier, this applies.',
  },
  {
    q: 'What should I prepare?',
    a: 'Nothing to prep beforehand. After you book, I\u2019ll ask a few short questions via a form \u2014 takes under five minutes. That lets me come in ready so we can use the call for actual diagnosis, not small-talk discovery.',
  },
  {
    q: 'What happens after the call?',
    a: 'You\u2019ll have concrete next steps to work on. If we decide to continue together, I\u2019ll share options (single session or 8-week programme). If not, no pressure \u2014 you have what you need to move forward on your own.',
  },
];

export default function ConsultationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="py-6 border-b border-white/10">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
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
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03]" />
        <div className="container-max section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-400/30">
              <Compass className="w-4 h-4" />
              <span>Free 30-minute consultation</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-8">
              <span className="bg-gradient-to-r from-blue-400/80 via-blue-300/90 to-blue-400/80 bg-clip-text text-transparent">
                Know what&rsquo;s blocking your speaking &mdash; and what to do about it.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6">
                A free 30-minute call. Bring a specific situation or a pattern you&rsquo;re tired of.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                You&rsquo;ll leave with clarity on what&rsquo;s actually going on and concrete steps you can take to improve and feel more confident &mdash; whether that&rsquo;s working with me or not.
              </p>
            </div>

            <Link
              href={calendlyUrl}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Book a free consultation &rarr;
            </Link>
            <p className="text-sm text-slate-500 mt-4">Free &bull; 30 minutes &bull; No pitch, no pressure</p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Book this if&hellip;
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {painPoints.map((point, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-blue-400/30 transition-colors"
                >
                  <p className="text-slate-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What you&rsquo;ll walk away with
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whatYouGet.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-8 border border-blue-400/20"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <p className="text-slate-200 italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="text-sm text-blue-300">&mdash; {t.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Common questions
            </h2>
            <div className="space-y-4">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium text-white">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-300 leading-relaxed">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Book a free consultation
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            No pitch. No pressure. Just a clearer sense of what&rsquo;s going on and what to do next.
          </p>
          <Link
            href={calendlyUrl}
            className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Book a call &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
