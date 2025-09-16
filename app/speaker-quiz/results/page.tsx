'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QuizResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get data from URL params
  const archetype = searchParams.get('archetype');
  const mainAnswers = searchParams.get('answers');
  const optionalAnswers = searchParams.get('optionalAnswers');

  useEffect(() => {
    // Redirect if missing required data
    if (!archetype || !mainAnswers) {
      console.log('Missing data, redirecting to quiz:', { archetype, mainAnswers });
      router.push('/speaker-quiz');
    } else {
      console.log('Results page loaded with data:', { archetype, mainAnswers, optionalAnswers });
    }
  }, [archetype, mainAnswers, optionalAnswers, router]);

  async function handleGetPlan() {
    if (!archetype || !email || !firstName) return;

    setLoading(true);
    try {
      const response = await fetch('/api/speaker-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          email,
          firstName,
          answers: mainAnswers ? JSON.parse(mainAnswers) : {},
          optionalAnswers: optionalAnswers ? JSON.parse(optionalAnswers) : {}
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Check your email for your personalised Speaker Growth Plan!');
      } else {
        console.error('Failed to submit answers');
        alert('There was an error submitting your answers. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('There was an error submitting your answers. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && firstName && !loading) {
      handleGetPlan();
    }
  };

  // Archetype descriptions
  const archetypeDescriptions: Record<string, { title: string; description: string; strengths: string[]; growthAreas: string[] }> = {
    'Rambler': {
      title: 'The Rambler',
      description: 'You\'re passionate and full of ideas, but sometimes lose focus and go long.',
      strengths: ['Enthusiastic and engaging', 'Rich with ideas and insights', 'Natural storyteller'],
      growthAreas: ['Structure and conciseness', 'Staying on track', 'Reading the room']
    },
    'Overthinker': {
      title: 'The Overthinker',
      description: 'You\'re thorough and thoughtful, but can get stuck in analysis paralysis.',
      strengths: ['Well-prepared and detailed', 'Thoughtful and precise', 'Credible and reliable'],
      growthAreas: ['Moving from preparation to action', 'Trusting your instincts', 'Speaking spontaneously']
    },
    'Self-Doubter': {
      title: 'The Self-Doubter',
      description: 'You have valuable insights but tend to undervalue your expertise.',
      strengths: ['Humble and relatable', 'Thoughtful listener', 'Authentic and genuine'],
      growthAreas: ['Building confidence', 'Owning your expertise', 'Speaking with authority']
    },
    'People Pleaser': {
      title: 'The People Pleaser',
      description: 'You\'re collaborative and warm, but sometimes dilute your message to avoid conflict.',
      strengths: ['Empathetic and inclusive', 'Good at building consensus', 'Creates safe spaces'],
      growthAreas: ['Standing firm on important points', 'Healthy conflict navigation', 'Clear boundaries']
    },
    'Performer': {
      title: 'The Performer',
      description: 'You\'re charismatic and polished, but sometimes prioritize style over substance.',
      strengths: ['Confident and engaging', 'Natural stage presence', 'Memorable delivery'],
      growthAreas: ['Balancing style with substance', 'Authentic vulnerability', 'Deep connection']
    },
    'Intense Speaker': {
      title: 'The Intense Speaker',
      description: 'You have powerful presence and strong convictions, but can sometimes overwhelm others.',
      strengths: ['Passionate and compelling', 'Strong leadership presence', 'Drives action'],
      growthAreas: ['Moderating intensity', 'Reading audience energy', 'Creating space for others']
    },
    'Rationalist': {
      title: 'The Rationalist',
      description: 'You\'re highly credible and logical, but can feel dry without human connection.',
      strengths: ['Data-driven and credible', 'Clear and logical', 'Trustworthy expert'],
      growthAreas: ['Adding emotional connection', 'Storytelling and examples', 'Engaging delivery']
    }
  };

  const currentArchetype = archetypeDescriptions[archetype || ''];

  if (!archetype || !currentArchetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading your results...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {!successMessage ? (
          <>
            {/* Results Display */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Your Speaker Archetype
                </h1>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                      {currentArchetype.title}
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                      {currentArchetype.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-4">Your Strengths</h3>
                      <ul className="space-y-2">
                        {currentArchetype.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-4">Growth Areas</h3>
                      <ul className="space-y-2">
                        {currentArchetype.growthAreas.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">→</span>
                            <span className="text-gray-700">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Collection */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Your Personalized Growth Plan
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  I'll send you a detailed action plan with specific exercises and strategies 
                  tailored to your {currentArchetype.title} speaking style.
                </p>

                <div className="max-w-lg mx-auto space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleGetPlan}
                    disabled={!email || !firstName || loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
                  >
                    {loading ? 'Sending Your Plan...' : 'Get My Personalized Growth Plan'}
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  You'll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
                </p>

                {/* Secondary CTA - Subtle coaching option */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600 mb-3">
                    Want to discuss your results personally?
                  </p>
                  <button
                    onClick={() => window.open('https://calendly.com/alistair-webster/speaker-type-chat', '_blank')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm underline transition-colors duration-200"
                  >
                    Book a free consultation call to discuss your results
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-green-600 text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Sent!</h2>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
