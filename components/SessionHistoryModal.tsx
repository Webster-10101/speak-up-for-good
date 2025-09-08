'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { QuizResponse, CoachingSession } from '@/lib/supabase';

interface SessionHistoryModalProps {
  contact: QuizResponse;
  onClose: () => void;
}

// Quiz questions mapping for better display
const QUIZ_QUESTIONS = {
  1: "How do you typically feel before giving a presentation or speaking up in a meeting?",
  2: "When you're explaining something complex, what usually happens?",
  3: "How do you handle it when someone disagrees with you during a discussion?",
  4: "What's your biggest challenge when trying to persuade someone?",
  5: "How do you typically prepare for important conversations?",
  6: "When you're passionate about a topic, how do others usually respond?",
  7: "What happens when you're put on the spot to give your opinion?",
  8: "How do you usually wrap up your key points?"
};

const ANSWER_OPTIONS = {
  1: [
    "Excited and energized - I love having the floor",
    "Nervous but determined - I know I have something valuable to say",
    "Worried I'll ramble or go off track",
    "Anxious about being judged or criticized",
    "Focused on making sure everyone likes what I have to say",
    "Concerned I'll be too intense or overwhelming"
  ],
  2: [
    "I get animated and passionate, sometimes losing my audience",
    "I overthink every detail and worry I'm not being clear enough",
    "I second-guess myself and back down from my main points",
    "I try to cover all angles to avoid any conflict",
    "I focus on being polished and impressive",
    "I dive deep into the logic but may lose the human connection"
  ],
  3: [
    "I get more passionate and might come across as pushy",
    "I worry I haven't explained myself well enough",
    "I start to doubt my position and may give in too easily",
    "I try to find middle ground, even if it dilutes my message",
    "I focus on maintaining my credibility and composure",
    "I present more evidence, but may miss the emotional side"
  ],
  4: [
    "I can be too forceful and overwhelming",
    "I get stuck in analysis paralysis",
    "I don't believe strongly enough in my own ideas",
    "I'm too worried about hurting feelings or creating conflict",
    "I focus too much on style over substance",
    "I rely too heavily on facts and miss the emotional appeal"
  ],
  5: [
    "I brainstorm all my ideas but struggle to organize them",
    "I research extensively and plan every detail",
    "I rehearse but still doubt I'm ready",
    "I think about how to make everyone comfortable",
    "I practice until my delivery is smooth and polished",
    "I gather all my facts and data points"
  ],
  6: [
    "They get caught up in my energy, but sometimes tune out",
    "They appreciate my thoroughness but may get overwhelmed",
    "They sense my expertise but wish I had more confidence",
    "They feel comfortable but may not remember my key points",
    "They're impressed by my presentation but may not feel connected",
    "They respect my knowledge but may not feel emotionally engaged"
  ],
  7: [
    "I jump right in with whatever comes to mind",
    "I take time to think but worry I'm taking too long",
    "I give a quick answer and wish I'd said more",
    "I check the room and try to say what people want to hear",
    "I give a confident response, even if I'm unsure inside",
    "I provide a logical answer but may miss the bigger picture"
  ],
  8: [
    "I summarize quickly and move on",
    "I repeat my points to make sure they're clear",
    "I end softly and hope my message landed",
    "I ask if everyone's on board and comfortable",
    "I end with a strong, memorable statement",
    "I state my conclusion and expect people to understand"
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

  useEffect(() => {
    fetchSessions();
  }, [contact.id]);

  async function fetchSessions() {
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
  }

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
                onClick={() => setShowQuizAnswers(!showQuizAnswers)}
                className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200"
              >
                {showQuizAnswers ? 'Hide' : 'View'} Quiz Answers
              </button>
              <button
                onClick={() => setShowInitialNotes(!showInitialNotes)}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
              >
                {showInitialNotes ? 'Hide' : 'View'} Additional Notes
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

        {/* Quiz Answers */}
        {showQuizAnswers && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-purple-900 mb-4">Original Quiz Responses</h3>
            {contact.main_answers && Object.keys(contact.main_answers).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(contact.main_answers).map(([questionNum, answerIndex]) => {
                  const qNum = parseInt(questionNum);
                  const aIndex = typeof answerIndex === 'number' ? answerIndex : parseInt(answerIndex as string);
                  const question = QUIZ_QUESTIONS[qNum as keyof typeof QUIZ_QUESTIONS];
                  const options = ANSWER_OPTIONS[qNum as keyof typeof ANSWER_OPTIONS];
                  const selectedAnswer = options && options[aIndex];
                  
                  return (
                    <div key={questionNum} className="border-b border-purple-200 pb-3 last:border-b-0">
                      <h4 className="font-medium text-purple-800 text-sm mb-2">
                        Q{questionNum}: {question}
                      </h4>
                      <p className="text-purple-700 text-sm pl-4 italic">
                        "{selectedAnswer || `Answer ${aIndex + 1}`}"
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

        {/* Initial Quiz Notes */}
        {showInitialNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-3">Initial Quiz Responses</h3>
            {contact.optional_answers && Object.keys(contact.optional_answers).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(contact.optional_answers).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium text-blue-800">{key}:</span>{' '}
                    <span className="text-blue-700">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-blue-700 text-sm">No additional quiz responses recorded.</p>
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
                Click "Add Session" to record your first coaching session
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
