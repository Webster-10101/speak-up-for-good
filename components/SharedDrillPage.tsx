'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from './Navigation'
import Footer from './Footer'
import DrillSession from './DrillSession'
import { sharedDrills, drillDuration, drillSeconds } from '@/lib/shared-drills'

export default function SharedDrillPage({ slug }: { slug: string }) {
  const content = sharedDrills[slug]
  const [phase, setPhase] = useState<'intro' | 'practice' | 'done'>('intro')
  const [prompt, setPrompt] = useState('')
  const [returnTo, setReturnTo] = useState<string | null>(null)
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get('return')
    if (target && /^\/speaking-drills\/[a-z0-9-]+$/.test(target)) setReturnTo(target)
  }, [])
  function start() {
    const prompts = content.prompts ?? []
    setPrompt(prompts.length ? prompts[Math.floor(Math.random() * prompts.length)] : '')
    setPhase('practice')
    window.scrollTo(0, 0)
  }
  const steps = content.steps?.map(step => ({ ...step, duration: step.durationSec, explanation: step.why })) ?? [
    { id: 'speak', title: 'Give it a go', duration: 60, type: 'challenge' as const,
      instructions: [prompt, content.cue ?? '', 'Speak out loud. This website practice is unrecorded; there is no AI feedback or score.'].filter(Boolean) },
    { id: 'reflect', title: 'Take one thing with you', duration: 30, type: 'reflection' as const,
      instructions: ['What did you notice?', 'Choose one thing to carry into your next conversation—or explore next time.', 'You can repeat the drill with another prompt.'] },
  ]
  const button = 'rounded-lg bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 font-semibold'
  return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
    <Navigation />
    <section className="pt-32 pb-20"><div className="container-max section-padding"><div className="max-w-4xl mx-auto">
      <Link href="/speaking-drills" className="inline-block text-blue-300 mb-8">← Back to Drills</Link>
      {phase === 'intro' && <>
        <p className="text-blue-300 mb-3">{drillDuration(content)} · Guided, unrecorded practice</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{content.name}</h1>
        <p className="text-xl text-gray-300 mb-8">{content.blurb}</p>
        {content.cue && <p className="text-gray-300 leading-relaxed mb-8">{content.cue}</p>}
        <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">How it works</h2>
          <ol className="space-y-5">{steps.map((step, i) => <li key={step.id} className="flex gap-4">
            <span className="text-blue-300 font-semibold">{i + 1}</span><div className="flex-1"><h3 className="text-white font-semibold">{step.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{'explanation' in step ? step.explanation : i === 0 ? 'Try the speaking prompt for a minute, using the focus above.' : 'Notice what happened and choose what to try next.'}</p></div>
            <span className="text-gray-400 whitespace-nowrap">{Math.floor(step.duration / 60)}:{String(step.duration % 60).padStart(2, '0')}</span>
          </li>)}</ol>
        </div>
        <p className="text-gray-400 mb-6">Read each step, then press Start when you are ready. You can move on early or stop whenever you need to. No recording or score here—just practice.</p>
        <button className={button} onClick={start}>Start Drill</button>
      </>}
      {phase === 'practice' && <>
        <DrillSession drill={{title:content.name, description:content.blurb, totalDuration:drillSeconds(content), steps}} onComplete={() => { setPhase('done'); window.scrollTo(0, 0) }} />
        <button className="text-gray-300 underline" onClick={() => setPhase('intro')}>Back to introduction</button>
      </>}
      {phase === 'done' && <div className="bg-slate-800/50 border border-gray-600/30 rounded-xl p-8 md:p-12">
        <p className="text-blue-300 mb-3">{content.name}</p><h1 className="text-4xl font-bold text-white mb-6">A moment to take it in.</h1>
        <p className="text-xl text-gray-300 mb-6">That’s the end of this practice. Take a breath before you move on.</p>
        <p className="text-gray-300 mb-8">What did you notice? Choose one thing you’d like to carry into your next conversation—or explore next time. No need to get it all right.</p>
        <div className="flex flex-wrap gap-4"><button className={button} onClick={start}>Practise again</button><Link className={button} href={returnTo ?? '/speaking-drills'}>{returnTo ? 'Continue to Drill' : 'Back to drills'}</Link></div>
      </div>}
    </div></div></section><Footer />
  </main>
}
