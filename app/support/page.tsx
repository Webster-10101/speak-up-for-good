import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Support | Speak Up For Good',
  description:
    'Support for the Speak Up: Speaking Coach app — questions, problems, and feedback all go to hello@speakupforgood.com.',
  alternates: {
    canonical: 'https://speakupforgood.com/support',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <article className="container-max section-padding py-16 md:py-24 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
          Speak Up — Support
        </h1>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <p>
              Questions, problems, or feedback about the Speak Up app? Email{' '}
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline font-semibold"
              >
                hello@speakupforgood.com
              </a>
              . I&apos;m Alistair, the person who makes the app — I read
              everything and reply personally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Common questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Where do my recordings go?
                </h3>
                <p>
                  Your audio is analysed, then discarded — it&apos;s never
                  stored. What we keep is the useful output: your transcript,
                  speaking metrics, and coaching feedback, so you can track
                  progress over time. The full detail is in the{' '}
                  <Link
                    href="/app/privacy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    app privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  How do I delete a practice rep, or my whole account?
                </h3>
                <p>
                  You can delete any rep from its feedback screen or from your
                  history — it&apos;s removed from your stats immediately. To
                  delete your whole account and everything in it, use Settings
                  → Delete account in the app, or email{' '}
                  <a
                    href="mailto:hello@speakupforgood.com"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    hello@speakupforgood.com
                  </a>{' '}
                  and I&apos;ll sort it promptly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  How do free reps work?
                </h3>
                <p>
                  You get 3 analysed reps per day, free. That&apos;s enough for
                  a genuinely useful daily practice habit — no card details
                  needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Does the app work on the web?
                </h3>
                <p>
                  Yes — you can practise in your browser at{' '}
                  <a
                    href="https://speak-up-app.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    the Speak Up web app
                  </a>
                  . Your progress syncs with the iOS app if you&apos;ve added
                  an email address to your account.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              ← Back to home
            </Link>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
