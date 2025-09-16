'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Archetype =
  | 'Rambler'
  | 'Overthinker'
  | 'Self-Doubter'
  | 'People Pleaser'
  | 'Performer'
  | 'Intense Speaker'
  | 'Rationalist';

type Question = {
  id: string;
  prompt: string;
  options: {
    label: string;
    weights: Partial<Record<Archetype, number>>;
  }[];
};


const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'In a high-stakes meeting, what most often happens?',
    options: [
      { label: 'I share lots of ideas and go long', weights: { Rambler: 2 } },
      { label: "I hold back until I'm \"ready\"", weights: { Overthinker: 2 } },
      { label: 'I want to speak but second-guess myself', weights: { 'Self-Doubter': 2 } },
      { label: 'I soften my view to keep harmony', weights: { 'People Pleaser': 2 } },
      { label: 'I deliver with polish, maybe a bit "showy"', weights: { Performer: 2 } },
      { label: 'I come in hot and can overpower the room', weights: { 'Intense Speaker': 2 } },
      { label: 'I focus on facts — it can feel dry', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q2',
    prompt: 'When asked a tricky question on the spot…',
    options: [
      { label: 'I talk to find the point', weights: { Rambler: 2 } },
      { label: 'I freeze while thinking of the perfect answer', weights: { Overthinker: 2 } },
      { label: 'I rush, voice a bit shaky', weights: { 'Self-Doubter': 2 } },
      { label: 'I cushion my answer to avoid friction', weights: { 'People Pleaser': 2 } },
      { label: 'I perform — strong delivery, less depth', weights: { Performer: 2 } },
      { label: 'I answer forcefully', weights: { 'Intense Speaker': 2 } },
      { label: 'I give a precise, technical reply', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q3',
    prompt: 'Before a big presentation, you typically…',
    options: [
      { label: 'Wing it with enthusiasm and see where it goes', weights: { Rambler: 2, Performer: 1 } },
      { label: 'Over-prepare every detail and contingency', weights: { Overthinker: 2, Rationalist: 1 } },
      { label: 'Worry about forgetting something important', weights: { 'Self-Doubter': 2 } },
      { label: 'Focus on what the audience wants to hear', weights: { 'People Pleaser': 2 } },
      { label: 'Practice until every gesture is perfect', weights: { Performer: 2 } },
      { label: 'Get pumped up and ready to dominate', weights: { 'Intense Speaker': 2 } },
      { label: 'Research extensively and build logical flow', weights: { Rationalist: 2, Overthinker: 1 } },
    ],
  },
  {
    id: 'q4',
    prompt: 'When you disagree with someone publicly…',
    options: [
      { label: 'I explain my view with lots of examples', weights: { Rambler: 2 } },
      { label: 'I carefully consider before responding', weights: { Overthinker: 2 } },
      { label: 'I worry about sounding stupid', weights: { 'Self-Doubter': 2 } },
      { label: 'I find diplomatic ways to express my view', weights: { 'People Pleaser': 2 } },
      { label: 'I make sure my response sounds confident', weights: { Performer: 2 } },
      { label: 'I state my position clearly and directly', weights: { 'Intense Speaker': 2 } },
      { label: 'I present evidence to support my position', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q5',
    prompt: 'After giving a talk, you usually think…',
    options: [
      { label: '"I said too much but covered everything important"', weights: { Rambler: 2 } },
      { label: '"I should have said X differently"', weights: { Overthinker: 2 } },
      { label: '"Did I sound knowledgeable enough?"', weights: { 'Self-Doubter': 2 } },
      { label: '"I hope everyone felt comfortable"', weights: { 'People Pleaser': 2 } },
      { label: '"That looked polished and professional"', weights: { Performer: 2 } },
      { label: '"I made my point crystal clear"', weights: { 'Intense Speaker': 2 } },
      { label: '"The data supported my conclusions well"', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q6',
    prompt: 'Your biggest speaking challenge is usually…',
    options: [
      { label: 'Staying on track and being concise', weights: { Rambler: 2 } },
      { label: 'Getting started without perfect preparation', weights: { Overthinker: 2 } },
      { label: 'Believing I have something valuable to say', weights: { 'Self-Doubter': 2 } },
      { label: 'Being direct when it might upset someone', weights: { 'People Pleaser': 2 } },
      { label: 'Being authentic instead of "performing"', weights: { Performer: 2 } },
      { label: 'Reading the room and moderating my energy', weights: { 'Intense Speaker': 2 } },
      { label: 'Making technical content engaging', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q7',
    prompt: 'When networking at events, you tend to…',
    options: [
      { label: 'Share stories and connect through experiences', weights: { Rambler: 2 } },
      { label: 'Listen more than talk until comfortable', weights: { Overthinker: 2, 'Self-Doubter': 1 } },
      { label: 'Worry about saying the right thing', weights: { 'Self-Doubter': 2 } },
      { label: 'Make sure everyone feels included', weights: { 'People Pleaser': 2 } },
      { label: 'Present your best, most impressive self', weights: { Performer: 2 } },
      { label: 'Take charge of conversations', weights: { 'Intense Speaker': 2 } },
      { label: 'Discuss work, ideas, and expertise', weights: { Rationalist: 2 } },
    ],
  },
  {
    id: 'q8',
    prompt: 'When receiving feedback on your speaking, you…',
    options: [
      { label: 'Appreciate it but struggle to be more concise', weights: { Rambler: 2 } },
      { label: 'Analyze every point thoroughly', weights: { Overthinker: 2 } },
      { label: 'Take it personally and doubt your abilities', weights: { 'Self-Doubter': 2 } },
      { label: 'Focus on how to make everyone happier', weights: { 'People Pleaser': 2 } },
      { label: 'Use it to polish your presentation style', weights: { Performer: 2 } },
      { label: 'Defend your approach if you disagree', weights: { 'Intense Speaker': 2 } },
      { label: 'Evaluate the data and adjust accordingly', weights: { Rationalist: 2 } },
    ],
  },
];


function scoreArchetype(answers: Record<string, number>): Archetype | null {
  const totals: Record<Archetype, number> = {
    Rambler: 0,
    Overthinker: 0,
    'Self-Doubter': 0,
    'People Pleaser': 0,
    Performer: 0,
    'Intense Speaker': 0,
    Rationalist: 0,
  };
  
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null) continue;
    const weights = q.options[idx].weights;
    for (const k in weights) {
      totals[k as Archetype] += weights[k as Archetype] ?? 0;
    }
  }
  
  const entries = Object.entries(totals) as [Archetype, number][];
  const top = entries.sort((a, b) => b[1] - a[1])[0];
  return top?.[1] > 0 ? top[0] : null;
}

const SUMMARIES: Record<Archetype, { title: string; blurb: string; tip: string; strengths: string[]; growthAreas: string[] }> = {
  Rambler: {
    title: 'The Rambler',
    blurb: "You're energetic and full of ideas — the risk is losing the thread and overwhelming your audience.",
    tip: 'Try "Problem → Example → Point" and finish in one clear sentence.',
    strengths: ['Rich with ideas and examples', 'Passionate and engaging', 'Comprehensive coverage of topics'],
    growthAreas: ['Staying focused on key points', 'Respecting time limits', 'Reading audience engagement'],
  },
  Overthinker: {
    title: 'The Overthinker',
    blurb: 'Reflective and precise — you can get stuck in your head waiting for the perfect moment.',
    tip: 'Practice answering in 30 seconds before you feel fully ready.',
    strengths: ['Thoughtful and well-prepared', 'Considers multiple perspectives', 'Values accuracy and depth'],
    growthAreas: ['Speaking before feeling "ready"', 'Embracing imperfection', 'Acting on intuition'],
  },
  'Self-Doubter': {
    title: 'The Self-Doubter',
    blurb: 'Thoughtful and empathetic — but you back off too quickly and undervalue your expertise.',
    tip: 'Use confident openers: "I believe…", then pause and hold the floor.',
    strengths: ['Humble and approachable', "Considers others' viewpoints", 'Authentic and genuine'],
    growthAreas: ['Owning your expertise', 'Speaking with authority', 'Taking up appropriate space'],
  },
  'People Pleaser': {
    title: 'The People Pleaser',
    blurb: 'Collaborative and warm — but your message can get diluted when you avoid difficult truths.',
    tip: 'State your view cleanly, then add empathy rather than caveats.',
    strengths: ['Creates inclusive environments', 'Diplomatic and tactful', 'Builds consensus effectively'],
    growthAreas: ['Expressing strong opinions', 'Comfortable with conflict', 'Prioritizing message clarity'],
  },
  Performer: {
    title: 'The Performer',
    blurb: 'Charismatic and polished — sometimes at the cost of authenticity and genuine connection.',
    tip: 'Share one honest example or setback to deepen connection.',
    strengths: ['Confident and commanding presence', 'Polished delivery style', 'Engaging and memorable'],
    growthAreas: ['Showing vulnerability', 'Connecting authentically', 'Focusing on substance over style'],
  },
  'Intense Speaker': {
    title: 'The Intense Speaker',
    blurb: 'Powerful presence and strong convictions — can overwhelm others without balance.',
    tip: 'Build warmth with questions and intentional pauses.',
    strengths: ['Clear and direct communication', 'Strong leadership presence', 'Passionate about your message'],
    growthAreas: ['Reading social cues', 'Moderating intensity', 'Creating space for others'],
  },
  Rationalist: {
    title: 'The Rationalist',
    blurb: 'Highly credible and logical — can feel dry or robotic without human connection.',
    tip: 'Pair your data with one human story and a vivid image.',
    strengths: ['Data-driven and credible', 'Logical and structured', 'Expert knowledge'],
    growthAreas: ['Adding emotional resonance', 'Using stories and metaphors', 'Connecting personally'],
  },
};

function QuizNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-slate-900/70 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/speak_up_icon_.svg"
              alt="Speak Up For Good"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-lg text-white">
              Speak Up For Good
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-blue-300 transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/#offers"
              className="text-white hover:text-blue-300 transition-colors font-medium text-sm"
            >
              Coaching
            </Link>
            <span className="text-blue-300 font-medium text-sm">
              Speaker Quiz
            </span>
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
            >
              Book Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AnalysisLoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    'Analyzing your responses...',
    'Identifying patterns in your speaking style...',
    'Matching you with your speaker archetype...',
    'Preparing your personalized insights...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-indigo-400 border-r-transparent animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Discovering Your Speaker Type
          </h2>
          <p className="text-lg text-gray-600 mb-8 transition-all duration-500">
            {messages[currentMessage]}
          </p>
          <div className="flex justify-center space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMessage ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SpeakerQuizPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const archetype = useMemo(() => scoreArchetype(answers), [answers]);
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;
  const allQuestionsAnswered = Object.keys(answers).length === QUESTIONS.length;
  const unansweredCount = QUESTIONS.length - Object.keys(answers).length;

  async function handleAnalyzeAnswers() {
    setAnalyzing(true);
    
    const messages = [
      'Analyzing your responses...',
      'Identifying patterns in your speaking style...',
      'Matching you with your speaker archetype...',
      'Preparing your personalized insights...'
    ];
    
    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setAnalyzing(false);
    setAnalysisComplete(true);
    setShowResults(true);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  function handleGetPersonalizedResults() {
    if (!archetype) return;
    
    // If email and firstName are provided, navigate to additional questions
    if (email && firstName) {
      const params = new URLSearchParams({
        archetype,
        email,
        firstName,
        answers: JSON.stringify(answers)
      });
      
      window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
    } else {
      // Otherwise, trigger the analysis to show the email collection form
      handleAnalyzeAnswers();
    }
  }

  async function handleSkipToBasic() {
    if (!archetype || !email || !firstName) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/speaker-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, archetype, answers, optionalAnswers: {} }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Show success message with better styling
        setSuccessMessage(data.message || 'Check your email for your personalised Speaker Growth Plan!');
      } else {
        alert(data?.error ?? 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleGetPlan() {
    if (!archetype || !email || !firstName) return;
    
    // Navigate to additional questions page with collected data
    const params = new URLSearchParams({
      archetype,
      email,
      firstName,
      answers: JSON.stringify(answers)
    });
    
    console.log('Navigating to:', `/speaker-quiz/additional-questions?${params.toString()}`);
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && firstName && !loading) {
      handleGetPlan();
    }
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    
    const questionIndex = QUESTIONS.findIndex(q => q.id === questionId);
    if (questionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(questionIndex + 1);
      }, 300);
    }
  };

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <QuizNavigation />
        <div className="container mx-auto px-6 pt-24 pb-12">

          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                What Kind of
                <span className="text-indigo-600"> Speaker</span>
                <br />Are You?
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover your unique speaker archetype and get a personalised growth plan. 
                Take our 2-minute diagnostic and unlock your speaking potential.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Archetype</h3>
                <p className="text-sm text-gray-600">Discover whether you're a Rambler, Overthinker, People Pleaser, or one of 4 other types</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth Plan</h3>
                <p className="text-sm text-gray-600">Get AI-generated, personalised strategies tailored to your speaking style</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Tips</h3>
                <p className="text-sm text-gray-600">Immediate actionable advice you can use in your very next speaking opportunity</p>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Speaker Assessment
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Takes 2 minutes • No payment required • Get results instantly
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (analyzing) {
    return <AnalysisLoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <QuizNavigation />
      <div className="container mx-auto px-6 pt-24 pb-8">

        <div className="max-w-3xl mx-auto">
          {showResults && archetype && (
            <div className="mb-12 bg-white rounded-2xl border shadow-lg p-8">
              <div className="text-center mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <p className="text-indigo-700 font-semibold text-sm">🎉 Your Speaker Type Revealed! 🎉</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎭</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{SUMMARIES[archetype].title}</h2>
                <p className="text-lg text-gray-600 mb-4">{SUMMARIES[archetype].blurb}</p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <p className="text-indigo-800">
                    <strong>Quick tip:</strong> {SUMMARIES[archetype].tip}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">✨</span> Your Strengths
                  </h3>
                  <ul className="space-y-2">
                    {SUMMARIES[archetype].strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🎯</span> Growth Areas
                  </h3>
                  <ul className="space-y-2">
                    {SUMMARIES[archetype].growthAreas.map((area, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 What's Next?</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Generate your personalised plan to level up your speaking
                  </p>
                  <p className="text-gray-600 mb-6">
                    Get an AI-generated action plan with specific strategies, practice exercises, and next steps tailored to your <strong>{SUMMARIES[archetype].title}</strong> archetype.
                  </p>
                </div>
                
                {/* Primary CTA - Email Capture */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
                  <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
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
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 w-full"
                    >
                      Continue to Additional Questions
                    </button>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    You'll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
                  </p>
                  
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Success! {successMessage}
                          </p>
                        </div>
                        <div className="ml-auto pl-3">
                          <button
                            onClick={() => setSuccessMessage('')}
                            className="inline-flex text-green-400 hover:text-green-600"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary CTA - Subtle coaching option */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Want to discuss your results personally?
                  </p>
                  <button
                    onClick={() => window.open('https://calendly.com/alistair-webster/speaker-type-chat', '_blank')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm underline transition-colors duration-200"
                  >
                    Book a consultation call to discuss your results
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showResults && (
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Question {Object.keys(answers).length} of {QUESTIONS.length}</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">Speaker Archetype Assessment</h1>
              <p className="text-center text-gray-600 mb-8">
                Choose the response that best describes you in most situations
              </p>

              <div className="space-y-8">
                {QUESTIONS.map((q, index) => (
                  <div 
                    key={q.id} 
                    className={`bg-white rounded-2xl border shadow-sm p-6 transition-all duration-300 ${
                      index === currentQuestion ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
                    } ${answers[q.id] !== undefined ? 'border-green-200' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        answers[q.id] !== undefined 
                          ? 'bg-green-100 text-green-800' 
                          : index === currentQuestion 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {answers[q.id] !== undefined ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-4">{q.prompt}</p>
                        <div className="space-y-3">
                          {q.options.map((opt, i) => (
                            <label 
                              key={i} 
                              className={`flex cursor-pointer items-start gap-3 p-3 rounded-lg transition-colors duration-200 ${
                                answers[q.id] === i 
                                  ? 'bg-indigo-50 border-2 border-indigo-200' 
                                  : 'hover:bg-gray-50 border-2 border-transparent'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                checked={answers[q.id] === i}
                                onChange={() => handleAnswerSelect(q.id, i)}
                              />
                              <span className={`text-sm ${answers[q.id] === i ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                                {opt.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!allQuestionsAnswered && unansweredCount > 0 && (
                <div className="mt-8 text-center">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-yellow-600">⏳</span>
                      <p className="text-yellow-800 font-medium">Almost there!</p>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Please answer {unansweredCount} more question{unansweredCount > 1 ? 's' : ''} to discover your speaker type.
                    </p>
                  </div>
                </div>
              )}

              {allQuestionsAnswered && !showResults && (
                <div className="mt-12 text-center">
                  <div className="bg-white rounded-2xl border shadow-lg p-8 max-w-md mx-auto">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">🎭</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">All Questions Complete!</h3>
                      <p className="text-gray-600">
                        Ready to discover your unique speaker archetype? Your personalized insights are waiting.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={handleGetPersonalizedResults}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Next: Get Personalized Results ➡️
                      </button>
                      <button
                        onClick={handleSkipToBasic}
                        disabled={loading}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl text-sm transition-all duration-300"
                      >
                        Skip to Basic Results
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {showResults && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Your Quiz Responses Summary</h3>
              <p className="text-sm text-gray-600 mb-4">Here's a quick overview of how you answered the assessment:</p>
              <div className="grid gap-3">
                {QUESTIONS.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-800 text-sm mb-2">Q{index + 1}: {q.prompt}</p>
                    <p className="text-gray-600 text-sm">
                      ✓ {q.options[answers[q.id]]?.label || 'No answer selected'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}