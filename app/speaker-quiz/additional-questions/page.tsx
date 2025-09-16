'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type OptionalQuestion = {
  id: string;
  prompt: string;
  type: 'multiple-choice' | 'multiple-select' | 'text';
  options?: string[];
  placeholder?: string;
};

const OPTIONAL_QUESTIONS: OptionalQuestion[] = [
  {
    id: 'situations',
    prompt: 'The situations I most want to improve in are... (select all that apply)',
    type: 'multiple-select',
    options: ['Work meetings', 'Social settings', 'Presentations', 'Everyday conversations', 'Public speaking events']
  },
  {
    id: 'struggle',
    prompt: 'When it comes to speaking, I struggle most with...',
    type: 'text',
    placeholder: 'e.g., finding the right words, feeling confident, keeping people engaged...'
  },
  {
    id: 'authentic',
    prompt: 'I feel most like myself when I\'m speaking...',
    type: 'text',
    placeholder: 'e.g., with close friends, about topics I\'m passionate about, in small groups...'
  },
  {
    id: 'world_class',
    prompt: 'If I woke up tomorrow as a world-class speaker, I\'d know because...',
    type: 'text',
    placeholder: 'e.g., I\'d feel confident in any room, people would seek my input...'
  },
  {
    id: 'confidence_moment',
    prompt: 'The moment I\'d love to feel more confident in is...',
    type: 'text',
    placeholder: 'e.g., presenting to my boss, speaking up in meetings, giving toasts...'
  },
  {
    id: 'life_change',
    prompt: 'Being a stronger speaker would change things for me by...',
    type: 'text',
    placeholder: 'e.g., advancing my career, building better relationships, sharing my ideas...'
  },
  {
    id: 'curiosity',
    prompt: 'Something I\'ve always wondered about speaking is...',
    type: 'text',
    placeholder: 'e.g., how some people make it look so easy, what makes a speaker memorable...'
  }
];

export default function AdditionalQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optionalAnswers, setOptionalAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get data from URL params
  const archetype = searchParams.get('archetype');
  const email = searchParams.get('email');
  const firstName = searchParams.get('firstName');
  const mainAnswers = searchParams.get('answers');

  useEffect(() => {
    // Redirect if missing required data
    if (!archetype || !email || !firstName || !mainAnswers) {
      console.log('Missing data, redirecting to quiz:', { archetype, email, firstName, mainAnswers });
      router.push('/speaker-quiz');
    } else {
      console.log('Additional questions page loaded with data:', { archetype, email, firstName, mainAnswers });
    }
  }, [archetype, email, firstName, mainAnswers, router]);

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
          optionalAnswers
        }),
      });

      if (response.ok) {
        router.push(`/speaker-quiz/results?archetype=${archetype}&email=${email}&firstName=${firstName}`);
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

  function handleSkipToBasic() {
    if (!archetype || !email || !firstName) return;
    
    // Submit without optional answers
    handleGetPlan();
  }

  function nextQuestion() {
    if (currentQuestion < OPTIONAL_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const progress = ((currentQuestion + 1) / OPTIONAL_QUESTIONS.length) * 100;
  const currentQ = OPTIONAL_QUESTIONS[currentQuestion];

  if (!archetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Even More Personalized Results!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These additional questions help me create a truly customized growth plan that speaks 
            to your <span className="font-semibold text-indigo-600">specific</span> speaking journey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {OPTIONAL_QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Question */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion + 1}. {currentQ.prompt}
            </h2>
            
            {currentQ.type === 'multiple-choice' ? (
              <div className="space-y-3">
                {currentQ.options?.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={option}
                      checked={optionalAnswers[currentQ.id] === option}
                      onChange={(e) => setOptionalAnswers(prev => ({
                        ...prev,
                        [currentQ.id]: e.target.value
                      }))}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            ) : currentQ.type === 'multiple-select' ? (
              <div className="space-y-3">
                {currentQ.options?.map((option, optionIndex) => {
                  const currentAnswers = optionalAnswers[currentQ.id] as string[] || [];
                  return (
                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        value={option}
                        checked={currentAnswers.includes(option)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setOptionalAnswers(prev => {
                            const current = prev[currentQ.id] as string[] || [];
                            return {
                              ...prev,
                              [currentQ.id]: isChecked 
                                ? [...current, option]
                                : current.filter(item => item !== option)
                            };
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <textarea
                value={optionalAnswers[currentQ.id] as string || ''}
                onChange={(e) => setOptionalAnswers(prev => ({
                  ...prev,
                  [currentQ.id]: e.target.value
                }))}
                placeholder={currentQ.placeholder}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleSkipToBasic}
                disabled={loading}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
              >
                Skip to Basic Results
              </button>

              {currentQuestion === OPTIONAL_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleGetPlan}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all font-semibold"
                >
                  {loading ? 'Getting Your Plan...' : 'Get My Personalized Plan →'}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skip Link */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Short on time? You can always{' '}
            <button 
              onClick={handleSkipToBasic}
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              skip to your basic results
            </button>
            {' '}and come back later.
          </p>
        </div>
      </div>
    </main>
  );
}
