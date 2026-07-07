import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Speak Up For Good',
  description:
    'How Speak Up For Good collects, uses, and protects your personal data, and the rights you have over it.',
  alternates: {
    canonical: 'https://speakupforgood.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LAST_UPDATED = '13 June 2026'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <article className="container-max section-padding py-16 md:py-24 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <p>
              This policy explains what personal information Speak Up For Good
              collects, why we collect it, who we share it with, and the rights
              you have over it. We&apos;ve tried to write it plainly rather than
              in legalese. If anything is unclear, email{' '}
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                hello@speakupforgood.com
              </a>{' '}
              and we&apos;ll explain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Using the Speak Up app?
            </h2>
            <p>
              This page covers the Speak Up For Good website and coaching
              practice. The Speak Up: Speaking Coach app has its own policy —
              see the{' '}
              <Link
                href="/app/privacy"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                app privacy policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Who we are</h2>
            <p>
              Speak Up For Good is the speaking and confidence coaching practice
              of Alistair Webster, based in the United Kingdom. For the purposes
              of UK data protection law, we are the &ldquo;data
              controller&rdquo; for the information described here. You can reach
              us at{' '}
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                hello@speakupforgood.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              What we collect
            </h2>
            <p className="mb-4">We only collect what you give us directly:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Speaker quiz.</strong> Your first name, email address,
                and your answers to the quiz (including any free-text answers you
                choose to add). We use these to generate and email you a
                personalised speaker growth plan.
              </li>
              <li>
                <strong>Speaking drills.</strong> Your name and email address,
                so we can give you access to the practice drills.
              </li>
              <li>
                <strong>Free consultation.</strong> Your name, email address, and
                the answers you give on the intake form about your speaking, so
                we can prepare for the call.
              </li>
              <li>
                <strong>Email and messages.</strong> If you email us, we keep
                that correspondence so we can reply and keep track of the
                conversation.
              </li>
              <li>
                <strong>Technical data.</strong> Your IP address is processed
                briefly to prevent spam and abuse (rate limiting), and our
                hosting provider keeps standard server logs. We also use the
                privacy-friendly analytics described under{' '}
                <em>Cookies and analytics</em> below.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              How we use it, and our lawful basis
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>To give you what you asked for</strong> — your growth
                plan, drill access, or consultation. Lawful basis: performance of
                a contract or our legitimate interest in responding to your
                request.
              </li>
              <li>
                <strong>To send you our newsletter</strong> — weekly speaking
                tips — <strong>only if you have ticked the box to opt in</strong>
                . Lawful basis: your consent. You can unsubscribe at any time
                using the link in any email, and we&apos;ll stop.
              </li>
              <li>
                <strong>To keep the site secure and working</strong> — preventing
                abuse and diagnosing problems. Lawful basis: our legitimate
                interest in running a safe, functioning service.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal data, and we do not use it for
              advertising profiling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Who we share it with
            </h2>
            <p className="mb-4">
              We use a small set of trusted service providers to run the site.
              They process your data only on our instructions:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Supabase</strong> — secure database hosting for the
                information you submit.
              </li>
              <li>
                <strong>Vercel</strong> — website hosting and server logs.
              </li>
              <li>
                <strong>Resend</strong> — sends transactional emails, such as
                your speaker growth plan.
              </li>
              <li>
                <strong>OpenAI</strong> — your quiz answers are sent to OpenAI&apos;s
                API to generate your personalised plan. They are processed to
                produce your plan and are not used by OpenAI to train its models.
              </li>
              <li>
                <strong>MailerLite</strong> and <strong>Substack</strong> — email
                newsletter delivery, used only if you have opted in.
              </li>
              <li>
                <strong>Calendly</strong> — scheduling, if you book a
                consultation.
              </li>
            </ul>
            <p className="mt-4">
              Some of these providers are based outside the UK and the European
              Economic Area (for example, in the United States). Where data is
              transferred internationally, it is protected by appropriate
              safeguards such as the providers&apos; standard contractual clauses
              or equivalent mechanisms.
            </p>
            <p className="mt-4">
              We may also disclose information if required to by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Cookies and analytics
            </h2>
            <p>
              We use lightweight, privacy-friendly analytics (Fathom Analytics
              and Vercel Analytics) to understand how the site is used. These do
              not use tracking cookies and do not identify you personally. We may
              also use Google Analytics, which sets cookies; if we do, we&apos;ll
              ask for your consent first where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              How long we keep it
            </h2>
            <p>
              We keep your information for as long as we need it for the purpose
              you gave it to us — for example, while you&apos;re a coaching
              contact or a newsletter subscriber. If you unsubscribe or ask us to
              delete your data, we&apos;ll remove it from our active systems. We
              review what we hold periodically and delete what we no longer need.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Your rights
            </h2>
            <p className="mb-4">
              Under UK data protection law you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>ask for a copy of the personal data we hold about you;</li>
              <li>ask us to correct anything that&apos;s wrong;</li>
              <li>ask us to delete your data;</li>
              <li>
                withdraw consent at any time (for example, by unsubscribing from
                the newsletter);
              </li>
              <li>object to or ask us to restrict certain processing.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these, email{' '}
              <a
                href="mailto:hello@speakupforgood.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                hello@speakupforgood.com
              </a>
              . If you&apos;re not happy with how we&apos;ve handled your data,
              you can complain to the UK Information Commissioner&apos;s Office
              (ICO) at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Changes to this policy
            </h2>
            <p>
              If we make material changes, we&apos;ll update this page and the
              &ldquo;last updated&rdquo; date above.
            </p>
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
