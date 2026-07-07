import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Speak Up App Privacy Policy | Speak Up For Good',
  description:
    'The privacy policy for the Speak Up: Speaking Coach app — what happens to your voice recordings, what we store, and how to delete your data.',
  alternates: {
    canonical: 'https://speakupforgood.com/app/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LAST_UPDATED = '7 July 2026'

export default function AppPrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <article className="container-max section-padding py-16 md:py-24 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
          Privacy Policy — Speak Up: Speaking Coach
        </h1>
        <p className="text-slate-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <p>
              Speak Up is a speaking-practice app made by Alistair Webster
              (Speak Up For Good). This policy explains what data the app
              handles, what happens to your voice recordings, and what we keep.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              The short version
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Your recordings are <strong>analysed, then discarded</strong>{' '}
                — we never store your audio.
              </li>
              <li>
                We keep the results of each practice rep (transcript, speaking
                metrics, coaching feedback) in your account history so you can
                track progress. You can delete any rep, at any time, in the
                app.
              </li>
              <li>
                You can use the app without giving us any personal details.
                Adding an email address is optional.
              </li>
              <li>
                We don&apos;t sell your data, we don&apos;t show ads, and we
                don&apos;t use third-party analytics or tracking.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              What happens to a recording
            </h2>
            <p className="mb-4">
              When you finish a practice rep, the app sends your recording to
              our analysis service. Here&apos;s the full journey:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Recording.</strong> Audio is captured on your device.
                Recordings are capped at around 60 seconds.
              </li>
              <li>
                <strong>Transcription.</strong> The audio is sent to
                AssemblyAI, a speech-to-text service, to produce a transcript
                with word timings. We delete the transcript from AssemblyAI as
                soon as our analysis completes, and under AssemblyAI&apos;s
                retention policy the audio itself is automatically deleted from
                their systems within 48 hours.
              </li>
              <li>
                <strong>Analysis.</strong> Our own server computes your
                speaking metrics (pace, filler words, expressiveness, pausing)
                from the transcript and the audio signal. The audio is
                processed in memory and is never written to storage.
              </li>
              <li>
                <strong>Coaching feedback.</strong> The transcript and your
                metrics (not the audio) are sent to Anthropic&apos;s Claude to
                write your coaching read. Anthropic does not use API data to
                train its models.
              </li>
              <li>
                <strong>Saved to your history.</strong> The transcript,
                metrics, and coaching feedback are stored in your account so
                you can revisit past reps and see trends.{' '}
                <strong>We never store the audio</strong> — the in-app playback
                you see straight after a rep plays from your device&apos;s
                memory and is gone once you move on.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              What we collect and store
            </h2>
            <p className="mb-4">
              <strong>Practice history.</strong> For each rep: the transcript,
              your speaking metrics, the coaching feedback, the drill or prompt
              you used, and the date. This is the product — it powers your
              streaks, trends, and progress insights.
            </p>
            <p className="mb-4">
              <strong>Account data.</strong> The app creates an anonymous
              account automatically so your progress is saved — no name, no
              email, just a random identifier. If you choose to save your
              progress across devices, we store the email address you provide.
              That&apos;s the only personal detail we ask for.
            </p>
            <p className="mb-4">
              <strong>Usage counts.</strong> We log how many reps you analyse
              each day to enforce fair-use limits.
            </p>
            <p className="mb-4">
              <strong>Server logs.</strong> Our hosting providers keep
              standard, short-lived technical logs (such as IP addresses) for
              security and reliability, as virtually all web services do.
            </p>
            <p>
              That&apos;s it. No contacts, no location, no advertising
              identifiers, no analytics SDKs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Services we rely on
            </h2>
            <p className="mb-4">
              We use a small number of service providers to run the app. Each
              receives only what it needs:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="py-3 pr-4 font-bold text-slate-900">
                      Service
                    </th>
                    <th className="py-3 pr-4 font-bold text-slate-900">
                      What it does
                    </th>
                    <th className="py-3 font-bold text-slate-900">
                      What it receives
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Supabase</td>
                    <td className="py-3 pr-4">Database and sign-in</td>
                    <td className="py-3">
                      Your practice history and account data
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Vercel</td>
                    <td className="py-3 pr-4">
                      Hosting and the analysis server
                    </td>
                    <td className="py-3">
                      Your audio, in memory, during analysis only
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-semibold">AssemblyAI</td>
                    <td className="py-3 pr-4">Speech-to-text</td>
                    <td className="py-3">
                      Your audio, auto-deleted from their systems within 48
                      hours; transcript deleted after analysis
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Anthropic</td>
                    <td className="py-3 pr-4">Coaching feedback (Claude)</td>
                    <td className="py-3">
                      Transcript and metrics — never audio
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Resend</td>
                    <td className="py-3 pr-4">Sending sign-in emails</td>
                    <td className="py-3">
                      Your email address, if you&apos;ve added one
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Keeping and deleting your data
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Your practice history is kept until you delete it. You can
                delete any individual rep in the app (from the feedback screen
                or your history), and it&apos;s removed from your stats
                immediately.
              </li>
              <li>
                You can delete your account and everything in it directly in
                the app (Settings → Delete account). Or, if you prefer, email
                us at{' '}
                <a
                  href="mailto:hello@speakupforgood.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  hello@speakupforgood.com
                </a>{' '}
                and we&apos;ll do it promptly.
              </li>
              <li>
                If you never add an email address, your data sits under an
                anonymous identifier that isn&apos;t linked to you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Your rights
            </h2>
            <p>
              If you&apos;re in the UK, EU, or somewhere with similar
              data-protection law, you have the right to access, correct,
              export, or delete your personal data. Email{' '}
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                hello@speakupforgood.com
              </a>{' '}
              and we&apos;ll sort it. You also have the right to complain to
              your data-protection authority (in the UK, the ICO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Children</h2>
            <p>
              Speak Up isn&apos;t directed at children under 13, and we
              don&apos;t knowingly collect data from them. If you believe a
              child has used the app and left personal data with us, get in
              touch and we&apos;ll delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Changes to this policy
            </h2>
            <p>
              If we change how the app handles data, we&apos;ll update this
              page and the date at the top. Meaningful changes (like a new
              category of data) will be flagged in the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
            <p>
              Alistair Webster — Speak Up For Good
              <br />
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline font-semibold"
              >
                hello@speakupforgood.com
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200 space-y-2">
            <p>
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Looking for the Speak Up For Good coaching privacy policy?
              </Link>
            </p>
            <p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                ← Back to home
              </Link>
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
