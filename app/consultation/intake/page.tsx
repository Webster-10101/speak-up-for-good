'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface IntakeAnswers {
  prompting: string;
  example: string;
  currentRating: number | '';
  strength: string;
  oneThing: string;
  newsletterOptIn: boolean;
}

const INITIAL_ANSWERS: IntakeAnswers = {
  prompting: '',
  example: '',
  currentRating: '',
  strength: '',
  oneThing: '',
  newsletterOptIn: false,
};

function IntakeFormInner() {
  const searchParams = useSearchParams();
  // Accept both the short param names we'd use manually and the param names
  // Calendly sends when "Pass event details" is enabled on the event's redirect.
  const initialEmail =
    searchParams.get('invitee_email') ?? searchParams.get('email') ?? '';
  const initialName =
    searchParams.get('invitee_full_name') ??
    searchParams.get('invitee_first_name') ??
    searchParams.get('name') ??
    '';

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [answers, setAnswers] = useState<IntakeAnswers>(INITIAL_ANSWERS);
  const [prefilledLocked, setPrefilledLocked] = useState(
    Boolean(initialEmail && initialName)
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(initialEmail);
    setName(initialName);
    setPrefilledLocked(Boolean(initialEmail && initialName));
  }, [initialEmail, initialName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !name.trim()) {
      setError('Please fill in your name and email.');
      return;
    }

    if (answers.currentRating === '') {
      setError('Please rate your current public speaking (0-10).');
      return;
    }

    setSubmitting(true);

    try {
      const { newsletterOptIn, ...rest } = answers;
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          intakeAnswers: rest,
          newsletterOptIn,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Navigation />
        <main className="container-max section-padding pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Thanks — you&rsquo;re all set
            </h1>
            <p className="text-lg text-slate-300 mb-4">
              Your answers are in. I&rsquo;ll read them before we meet so we can make the most of our 30 minutes together.
            </p>
            <p className="text-slate-400">
              You&rsquo;ll receive a calendar confirmation from Calendly shortly if you haven&rsquo;t already.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />
      <main className="container-max section-padding pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <header className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Before we meet
            </h1>
            <p className="text-lg text-slate-300">
              A few quick questions so I can come into our call prepared. The more specific you can be, the sharper the diagnosis I can give you.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              {prefilledLocked ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-400">Booked as</div>
                      <div className="font-medium">{name}</div>
                      <div className="text-slate-300 text-sm">{email}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrefilledLocked(false)}
                      className="text-sm text-blue-300 hover:text-blue-200 underline"
                    >
                      Not you? Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm text-slate-300 mb-1">Name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm text-slate-300 mb-1">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </label>
                </div>
              )}
            </section>

            <label className="block">
              <span className="block font-medium mb-2">
                What&rsquo;s prompting you to book this call right now?
              </span>
              <span className="block text-sm text-slate-400 mb-2">
                A specific situation coming up? A pattern you&rsquo;re tired of?
              </span>
              <textarea
                value={answers.prompting}
                onChange={(e) => setAnswers({ ...answers, prompting: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              />
            </label>

            <label className="block">
              <span className="block font-medium mb-2">
                Can you remember a specific recent example?
              </span>
              <textarea
                value={answers.example}
                onChange={(e) => setAnswers({ ...answers, example: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              />
            </label>

            <div>
              <span className="block font-medium mb-2">
                How would you rate your public speaking currently? (0&ndash;10)
              </span>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAnswers({ ...answers, currentRating: i })}
                    className={`w-10 h-10 rounded-lg border text-sm font-medium transition ${
                      answers.currentRating === i
                        ? 'bg-blue-500 border-blue-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    }`}
                    aria-label={`Rate ${i}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="block font-medium mb-2">
                What do you think your greatest strength is when it comes to speaking?
              </span>
              <textarea
                value={answers.strength}
                onChange={(e) => setAnswers({ ...answers, strength: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              />
            </label>

            <label className="block">
              <span className="block font-medium mb-2">
                If we could solve just one thing in the next 3 months, what would it be?
              </span>
              <textarea
                value={answers.oneThing}
                onChange={(e) => setAnswers({ ...answers, oneThing: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              />
            </label>

            <label className="flex items-start gap-3 text-slate-300">
              <input
                type="checkbox"
                checked={answers.newsletterOptIn}
                onChange={(e) =>
                  setAnswers({ ...answers, newsletterOptIn: e.target.checked })
                }
                className="mt-1"
              />
              <span className="text-sm">
                Send me occasional emails with speaking tips and new drills (optional).
              </span>
            </label>

            {error && (
              <div className="text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition rounded-lg px-6 py-3 font-medium"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ConsultationIntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <IntakeFormInner />
    </Suspense>
  );
}
