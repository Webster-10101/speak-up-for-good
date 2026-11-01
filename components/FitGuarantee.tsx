export default function FitGuarantee({ dark = false }: { dark?: boolean }) {
  return (
    <section aria-label="Two-session fit guarantee" className={`border-t pt-4 text-left ${dark ? 'border-white/15 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
      <h3 className={`text-sm font-semibold mb-1 ${dark ? 'text-slate-200' : 'text-slate-700'}`}><span aria-hidden="true" className={`mr-1 text-base ${dark ? 'text-amber-300/80' : 'text-[#a37c29]'}`}>✓</span> Two-session fit guarantee</h3>
      <p className="text-sm leading-relaxed">If the coaching isn&rsquo;t right for you after two sessions, I&rsquo;ll refund everything you&rsquo;ve paid and cancel any remaining payment. Just let me know within seven days of session two, before session three. <a href="https://alistairwebster.com/terms#guarantee" className="underline underline-offset-4">Read the guarantee</a>.</p>
    </section>
  )
}
