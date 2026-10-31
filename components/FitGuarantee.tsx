export default function FitGuarantee({ dark = false }: { dark?: boolean }) {
  return (
    <section aria-label="Two-session fit guarantee" className={`rounded-xl border p-6 text-left ${dark ? 'border-amber-300/30 bg-amber-100/10' : 'border-teal-200 bg-teal-50'}`}>
      <p className={`text-sm font-semibold mb-3 ${dark ? 'text-amber-200' : 'text-teal-800'}`}>Two-session fit guarantee</p>
      <h3 className={`text-2xl font-bold leading-tight mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>Try two sessions. Feel the fit.</h3>
      <p className={`text-sm leading-relaxed mb-3 ${dark ? 'text-slate-200' : 'text-slate-700'}`}>If the coaching isn&rsquo;t right for you, I&rsquo;ll refund everything you&rsquo;ve paid for the programme and cancel any remaining payment.</p>
      <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Just let me know within seven days of session two, before session three.</p>
      <a href="https://alistairwebster.com/terms#guarantee" className={`text-sm font-semibold underline underline-offset-4 ${dark ? 'text-amber-200' : 'text-teal-800'}`}>Read the guarantee <span aria-hidden="true">↗</span></a>
    </section>
  )
}
