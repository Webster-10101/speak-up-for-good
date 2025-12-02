'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { QuizResponse, CoachingSession } from '@/lib/supabase';

interface SessionHistoryModalProps {
  contact: QuizResponse;
  onClose: () => void;
}

// Current quiz structure - matches the actual quiz questions
const QUIZ_QUESTIONS = {
  q1: "If you put me on stage, my reaction will be to…",
  q2: "When I have to speak without preparation, I typically…",
  q3: "On a scale of 1–10, how confident do you feel speaking in high-stakes situations?",
  q4: "When someone disagrees with me publicly, I tend to…",
  q5: "I can find words quickly when I'm put on the spot",
  q6: "I stay on one idea at a time rather than jumping around",
  q7: "When speaking, I feel like I'm performing rather than being myself",
  q8: "After speaking, I usually think…",
  q9: "Before speaking, I usually prepare by…",
  q10: "My biggest speaking challenge is usually…"
};

// Optional questions from additional-questions page
const OPTIONAL_QUESTIONS = {
  situations: "The situations I most want to improve in are...",
  struggle: "When it comes to speaking, I struggle most with...",
  authentic: "I feel most like myself when I'm speaking...",
  world_class: "If I woke up tomorrow as a world-class speaker, I'd know because...",
  confidence_moment: "The moment I'd love to feel more confident in is...",
  life_change: "Being a stronger speaker would change things for me by...",
  curiosity: "Something I've always wondered about speaking is..."
};

const ANSWER_OPTIONS = {
  q1: [
    'Fill the space with ideas and energy',
    'Hold back until I\'m "ready"',
    'Want to speak but second-guess myself',
    'Say what I think others want to hear',
    'Turn on polish and performance mode',
    'Come in hot and dominate',
    'Focus on facts and logic',
    'Say exactly what needs to be said'
  ],
  q2: [
    'Dive in and find my way as I go',
    'Ask questions or stall for thinking time',
    'Apologize for not being prepared',
    'Keep it very brief to minimize risk',
    'Perform confidently even without content',
    'Speak with conviction regardless',
    'Stick to what I know for certain'
  ],
  q4: [
    'Explain my point with more examples and details',
    'Pause to carefully consider their perspective',
    'Soften my position to find middle ground',
    'Look for ways to make everyone comfortable',
    'Defend my view with polished confidence',
    'Push back strongly on what I believe',
    'Present clear evidence for my position',
    'State my view briefly and move on'
  ],
  q8: [
    '"I probably said too much, but I covered everything"',
    '"I should have said that differently"',
    '"I hope I didn\'t sound stupid"',
    '"I hope everyone felt comfortable with that"',
    '"That came across well and professional"',
    '"I made my point powerfully"',
    '"The information was accurate and clear"',
    '"I said what needed to be said"'
  ],
  q9: [
    'Over-preparing every detail and contingency',
    'Making a loose outline with key points',
    'Relying on enthusiasm and improvisation',
    'Practicing delivery and polishing presentation',
    'Researching thoroughly and building logical flow',
    'Doing minimal prep - just clarifying the core message'
  ],
  q10: [
    'Staying focused and not going off on tangents',
    'Starting to speak before I feel perfectly ready',
    'Believing I have something valuable to contribute',
    'Being direct when it might create tension',
    'Being authentic instead of just polished',
    'Moderating my energy and reading the room',
    'Making technical content engaging and relatable',
    'Knowing when I\'ve said enough'
  ]
};

export default function SessionHistoryModal({ contact, onClose }: SessionHistoryModalProps) {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInitialNotes, setShowInitialNotes] = useState(false);
  const [showQuizAnswers, setShowQuizAnswers] = useState(false);
  const [newSession, setNewSession] = useState({
    session_date: new Date().toISOString().split('T')[0],
    session_focus: '',
    session_notes: '',
    homework_assigned: '',
    next_session_goal: ''
  });

  const fetchSessions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('coaching_sessions')
        .select('*')
        .eq('contact_id', contact.id)
        .order('session_date', { ascending: false });

      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [contact.id]);

  useEffect(() => {
    fetchSessions();
  }, [contact.id, fetchSessions]);

  async function addSession() {
    try {
      const { data, error } = await supabase
        .from('coaching_sessions')
        .insert([{ ...newSession, contact_id: contact.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding session:', error);
        alert('Error adding session. Please try again.');
        return;
      }

      setSessions(prev => [data, ...prev]);
      setNewSession({
        session_date: new Date().toISOString().split('T')[0],
        session_focus: '',
        session_notes: '',
        homework_assigned: '',
        next_session_goal: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding session:', error);
      alert('Error adding session. Please try again.');
    }
  }

  async function deleteSession(sessionId: string) {
    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      const { error } = await supabase
        .from('coaching_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) {
        console.error('Error deleting session:', error);
        return;
      }

      setSessions(prev => prev.filter(s => s.id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Session History - {contact.first_name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Contact Info Bar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{contact.email}</p>
              <p className="text-sm text-gray-600">
                {contact.archetype && `${contact.archetype} • `}
                {contact.status} • {contact.signup_source}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInitialNotes(!showInitialNotes)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium"
              >
                {showInitialNotes ? 'Hide' : 'View'} Written Responses
              </button>
              <button
                onClick={() => setShowQuizAnswers(!showQuizAnswers)}
                className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200"
              >
                {showQuizAnswers ? 'Hide' : 'View'} Quiz Answers
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Add Session
              </button>
            </div>
          </div>
        </div>

        {/* Written Responses - Most Valuable Insights */}
        {showInitialNotes && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <h3 className="font-semibold text-blue-900 text-lg">Written Responses - Key Insights</h3>
            </div>
            {contact.optional_answers && Object.keys(contact.optional_answers).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(contact.optional_answers).map(([key, value]) => {
                  const question = OPTIONAL_QUESTIONS[key as keyof typeof OPTIONAL_QUESTIONS];
                  const answer = Array.isArray(value) ? value.join(', ') : value;
                  
                  // Skip empty answers
                  if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
                    return null;
                  }
                  
                  return (
                    <div key={key} className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
                      <h4 className="font-medium text-blue-900 text-sm mb-2 uppercase tracking-wide">
                        {question || key}
                      </h4>
                      <p className="text-gray-800 leading-relaxed">
                        &quot;{answer}&quot;
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-blue-600 text-lg mb-2">📝</div>
                <p className="text-blue-700 font-medium">No written responses recorded</p>
                <p className="text-blue-600 text-sm mt-1">This contact may have skipped the additional questions or was added manually.</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Answers */}
        {showQuizAnswers && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-purple-900 mb-4">Quiz Responses (Multiple Choice)</h3>
            {contact.main_answers && Object.keys(contact.main_answers).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(contact.main_answers).map(([questionId, answer]) => {
                  const question = QUIZ_QUESTIONS[questionId as keyof typeof QUIZ_QUESTIONS];
                  const options = ANSWER_OPTIONS[questionId as keyof typeof ANSWER_OPTIONS];
                  
                  const formatAnswer = (answer: any) => {
                    // Handle rating questions (q3, q5, q6, q7)
                    if (['q3', 'q5', 'q6', 'q7'].includes(questionId)) {
                      return `${answer}/10`;
                    }
                    
                    // Handle multi-select questions (q1, q9)
                    if (Array.isArray(answer)) {
                      if (options) {
                        // Map array indices to option labels
                        return answer.map((item: any) => {
                          if (typeof item === 'number' && options[item]) {
                            return options[item];
                          } else if (typeof item === 'string') {
                            // Handle archetype flags for q1
                            const archetypeLabels = {
                              'rambler': 'Fill the space with ideas and energy',
                              'overthinker': 'Hold back until I\'m "ready"',
                              'doubter': 'Want to speak but second-guess myself',
                              'pleaser': 'Say what I think others want to hear',
                              'performer': 'Turn on polish and performance mode',
                              'intense': 'Come in hot and dominate',
                              'rationalist': 'Focus on facts and logic',
                              'minimalist': 'Say exactly what needs to be said'
                            };
                            return archetypeLabels[item as keyof typeof archetypeLabels] || item;
                          }
                          return item;
                        }).join(', ');
                      }
                      return answer.join(', ');
                    }
                    
                    // Handle single-select questions (q2, q4, q8, q10)
                    if (typeof answer === 'string') {
                      // Handle option IDs for single-select questions
                      const singleSelectLabels = {
                        // q2 options
                        'dive_in': 'Dive in and find my way as I go',
                        'stall_time': 'Ask questions or stall for thinking time',
                        'apologize_first': 'Apologize for not being prepared',
                        'say_less': 'Keep it very brief to minimize risk',
                        'perform_anyway': 'Perform confidently even without content',
                        'speak_forcefully': 'Speak with conviction regardless',
                        'stick_to_facts': 'Stick to what I know for certain',
                        
                        // q4 options
                        'explain_more': 'Explain my point with more examples and details',
                        'think_first': 'Pause to carefully consider their perspective',
                        'soften_position': 'Soften my position to find middle ground',
                        'accommodate': 'Look for ways to make everyone comfortable',
                        'defend_polished': 'Defend my view with polished confidence',
                        'push_back': 'Push back strongly on what I believe',
                        'present_evidence': 'Present clear evidence for my position',
                        'state_briefly': 'State my view briefly and move on',
                        
                        // q8 options
                        'said_too_much': '"I probably said too much, but I covered everything"',
                        'should_have_said': '"I should have said that differently"',
                        'sounded_dumb': '"I hope I didn\'t sound stupid"',
                        'hope_comfortable': '"I hope everyone felt comfortable with that"',
                        'looked_good': '"That came across well and professional"',
                        'made_impact': '"I made my point powerfully"',
                        'was_accurate': '"The information was accurate and clear"',
                        'job_done': '"I said what needed to be said"',
                        
                        // q10 options
                        'staying_focused': 'Staying focused and not going off on tangents',
                        'starting_without_perfect': 'Starting to speak before I feel perfectly ready',
                        'believing_valuable': 'Believing I have something valuable to contribute',
                        'being_direct': 'Being direct when it might create tension',
                        'being_authentic': 'Being authentic instead of just polished',
                        'moderating_energy': 'Moderating my energy and reading the room',
                        'making_engaging': 'Making technical content engaging and relatable',
                        'knowing_when_stop': 'Knowing when I\'ve said enough'
                      };
                      
                      return singleSelectLabels[answer as keyof typeof singleSelectLabels] || answer;
                    }
                    
                    // Handle numeric answers for options array
                    if (typeof answer === 'number' && options && options[answer]) {
                      return options[answer];
                    }
                    
                    return String(answer);
                  };
                  
                  return (
                    <div key={questionId} className="border-b border-purple-200 pb-3 last:border-b-0">
                      <h4 className="font-medium text-purple-800 text-sm mb-2">
                        {questionId.toUpperCase()}: {question}
                      </h4>
                      <p className="text-purple-700 text-sm pl-4 italic">
                        &quot;{formatAnswer(answer)}&quot;
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-purple-700 text-sm">
                No quiz responses recorded. This contact may have been added manually.
              </p>
            )}
          </div>
        )}

        {/* Add Session Form */}
        {showAddForm && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Add New Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Date
                </label>
                <input
                  type="date"
                  value={newSession.session_date}
                  onChange={(e) => setNewSession({ ...newSession, session_date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Focus
                </label>
                <input
                  type="text"
                  value={newSession.session_focus}
                  onChange={(e) => setNewSession({ ...newSession, session_focus: e.target.value })}
                  placeholder="What did you work on?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Notes
                </label>
                <textarea
                  value={newSession.session_notes}
                  onChange={(e) => setNewSession({ ...newSession, session_notes: e.target.value })}
                  placeholder="Detailed notes about the session..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Homework Assigned
                </label>
                <input
                  type="text"
                  value={newSession.homework_assigned}
                  onChange={(e) => setNewSession({ ...newSession, homework_assigned: e.target.value })}
                  placeholder="Practice exercises, readings, etc."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Session Goal
                </label>
                <input
                  type="text"
                  value={newSession.next_session_goal}
                  onChange={(e) => setNewSession({ ...newSession, next_session_goal: e.target.value })}
                  placeholder="Goal for next session"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addSession}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Session
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading sessions...</div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">No sessions recorded yet</div>
              <p className="text-sm text-gray-400 mt-2">
                Click &quot;Add Session&quot; to record your first coaching session
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-lg">
                      {new Date(session.session_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h4>
                    {session.session_focus && (
                      <p className="text-blue-600 font-medium">{session.session_focus}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSession(session.id!)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                
                {session.session_notes && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-gray-700 mb-1">Session Notes:</h5>
                    <p className="text-gray-600 text-sm">{session.session_notes}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {session.homework_assigned && (
                    <div>
                      <h5 className="font-medium text-gray-700">Homework Assigned:</h5>
                      <p className="text-gray-600">{session.homework_assigned}</p>
                    </div>
                  )}
                  {session.next_session_goal && (
                    <div>
                      <h5 className="font-medium text-gray-700">Next Session Goal:</h5>
                      <p className="text-gray-600">{session.next_session_goal}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
