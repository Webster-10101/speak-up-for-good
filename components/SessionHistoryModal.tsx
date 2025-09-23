'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { QuizResponse, CoachingSession } from '@/lib/supabase';

interface SessionHistoryModalProps {
  contact: QuizResponse;
  onClose: () => void;
}

// Quiz questions mapping for better display
const QUIZ_QUESTIONS = {
  1: &quot;How do you typically feel before giving a presentation or speaking up in a meeting?&quot;,
  2: &quot;When you're explaining something complex, what usually happens?&quot;,
  3: &quot;How do you handle it when someone disagrees with you during a discussion?&quot;,
  4: &quot;What's your biggest challenge when trying to persuade someone?&quot;,
  5: &quot;How do you typically prepare for important conversations?&quot;,
  6: &quot;When you're passionate about a topic, how do others usually respond?&quot;,
  7: &quot;What happens when you're put on the spot to give your opinion?&quot;,
  8: &quot;How do you usually wrap up your key points?&quot;
};

const ANSWER_OPTIONS = {
  1: [
    &quot;Excited and energized - I love having the floor&quot;,
    &quot;Nervous but determined - I know I have something valuable to say&quot;,
    &quot;Worried I'll ramble or go off track&quot;,
    &quot;Anxious about being judged or criticized&quot;,
    &quot;Focused on making sure everyone likes what I have to say&quot;,
    &quot;Concerned I'll be too intense or overwhelming&quot;
  ],
  2: [
    &quot;I get animated and passionate, sometimes losing my audience&quot;,
    &quot;I overthink every detail and worry I'm not being clear enough&quot;,
    &quot;I second-guess myself and back down from my main points&quot;,
    &quot;I try to cover all angles to avoid any conflict&quot;,
    &quot;I focus on being polished and impressive&quot;,
    &quot;I dive deep into the logic but may lose the human connection&quot;
  ],
  3: [
    &quot;I get more passionate and might come across as pushy&quot;,
    &quot;I worry I haven't explained myself well enough&quot;,
    &quot;I start to doubt my position and may give in too easily&quot;,
    &quot;I try to find middle ground, even if it dilutes my message&quot;,
    &quot;I focus on maintaining my credibility and composure&quot;,
    &quot;I present more evidence, but may miss the emotional side&quot;
  ],
  4: [
    &quot;I can be too forceful and overwhelming&quot;,
    &quot;I get stuck in analysis paralysis&quot;,
    &quot;I don't believe strongly enough in my own ideas&quot;,
    &quot;I'm too worried about hurting feelings or creating conflict&quot;,
    &quot;I focus too much on style over substance&quot;,
    &quot;I rely too heavily on facts and miss the emotional appeal&quot;
  ],
  5: [
    &quot;I brainstorm all my ideas but struggle to organize them&quot;,
    &quot;I research extensively and plan every detail&quot;,
    &quot;I rehearse but still doubt I'm ready&quot;,
    &quot;I think about how to make everyone comfortable&quot;,
    &quot;I practice until my delivery is smooth and polished&quot;,
    &quot;I gather all my facts and data points&quot;
  ],
  6: [
    &quot;They get caught up in my energy, but sometimes tune out&quot;,
    &quot;They appreciate my thoroughness but may get overwhelmed&quot;,
    &quot;They sense my expertise but wish I had more confidence&quot;,
    &quot;They feel comfortable but may not remember my key points&quot;,
    &quot;They're impressed by my presentation but may not feel connected&quot;,
    &quot;They respect my knowledge but may not feel emotionally engaged&quot;
  ],
  7: [
    &quot;I jump right in with whatever comes to mind&quot;,
    &quot;I take time to think but worry I'm taking too long&quot;,
    &quot;I give a quick answer and wish I'd said more&quot;,
    &quot;I check the room and try to say what people want to hear&quot;,
    &quot;I give a confident response, even if I'm unsure inside&quot;,
    &quot;I provide a logical answer but may miss the bigger picture&quot;
  ],
  8: [
    &quot;I summarize quickly and move on&quot;,
    &quot;I repeat my points to make sure they're clear&quot;,
    &quot;I end softly and hope my message landed&quot;,
    &quot;I ask if everyone's on board and comfortable&quot;,
    &quot;I end with a strong, memorable statement&quot;,
    &quot;I state my conclusion and expect people to understand&quot;
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
    <div className=&quot;fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50&quot;>
      <div className=&quot;bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto&quot;>
        <div className=&quot;flex justify-between items-center mb-6&quot;>
          <h2 className=&quot;text-2xl font-bold&quot;>
            Session History - {contact.first_name}
          </h2>
          <button
            onClick={onClose}
            className=&quot;text-gray-500 hover:text-gray-700 text-2xl&quot;
          >
            ×
          </button>
        </div>

        {/* Contact Info Bar */}
        <div className=&quot;bg-gray-50 rounded-lg p-4 mb-6&quot;>
          <div className=&quot;flex justify-between items-center&quot;>
            <div>
              <p className=&quot;font-medium&quot;>{contact.email}</p>
              <p className=&quot;text-sm text-gray-600&quot;>
                {contact.archetype && `${contact.archetype} • `}
                {contact.status} • {contact.signup_source}
              </p>
            </div>
            <div className=&quot;flex gap-2&quot;>
              <button
                onClick={() => setShowQuizAnswers(!showQuizAnswers)}
                className=&quot;text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded hover:bg-purple-200&quot;
              >
                {showQuizAnswers ? 'Hide' : 'View'} Quiz Answers
              </button>
              <button
                onClick={() => setShowInitialNotes(!showInitialNotes)}
                className=&quot;text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200&quot;
              >
                {showInitialNotes ? 'Hide' : 'View'} Additional Notes
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className=&quot;text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700&quot;
              >
                Add Session
              </button>
            </div>
          </div>
        </div>

        {/* Quiz Answers */}
        {showQuizAnswers && (
          <div className=&quot;bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6&quot;>
            <h3 className=&quot;font-medium text-purple-900 mb-4&quot;>Original Quiz Responses</h3>
            {contact.main_answers && Object.keys(contact.main_answers).length > 0 ? (
              <div className=&quot;space-y-4&quot;>
                {Object.entries(contact.main_answers).map(([questionNum, answerIndex]) => {
                  const qNum = parseInt(questionNum);
                  const aIndex = typeof answerIndex === 'number' ? answerIndex : parseInt(answerIndex as string);
                  const question = QUIZ_QUESTIONS[qNum as keyof typeof QUIZ_QUESTIONS];
                  const options = ANSWER_OPTIONS[qNum as keyof typeof ANSWER_OPTIONS];
                  const selectedAnswer = options && options[aIndex];
                  
                  return (
                    <div key={questionNum} className=&quot;border-b border-purple-200 pb-3 last:border-b-0&quot;>
                      <h4 className=&quot;font-medium text-purple-800 text-sm mb-2&quot;>
                        Q{questionNum}: {question}
                      </h4>
                      <p className=&quot;text-purple-700 text-sm pl-4 italic&quot;>
                        &quot;{selectedAnswer || `Answer ${aIndex + 1}`}&quot;
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className=&quot;text-purple-700 text-sm&quot;>
                No quiz responses recorded. This contact may have been added manually.
              </p>
            )}
          </div>
        )}

        {/* Initial Quiz Notes */}
        {showInitialNotes && (
          <div className=&quot;bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6&quot;>
            <h3 className=&quot;font-medium text-blue-900 mb-3&quot;>Initial Quiz Responses</h3>
            {contact.optional_answers && Object.keys(contact.optional_answers).length > 0 ? (
              <div className=&quot;space-y-2&quot;>
                {Object.entries(contact.optional_answers).map(([key, value]) => (
                  <div key={key} className=&quot;text-sm&quot;>
                    <span className=&quot;font-medium text-blue-800&quot;>{key}:</span>{' '}
                    <span className=&quot;text-blue-700&quot;>
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className=&quot;text-blue-700 text-sm&quot;>No additional quiz responses recorded.</p>
            )}
          </div>
        )}

        {/* Add Session Form */}
        {showAddForm && (
          <div className=&quot;bg-gray-50 border rounded-lg p-4 mb-6&quot;>
            <h3 className=&quot;font-medium mb-3&quot;>Add New Session</h3>
            <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-4&quot;>
              <div>
                <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                  Session Date
                </label>
                <input
                  type=&quot;date&quot;
                  value={newSession.session_date}
                  onChange={(e) => setNewSession({ ...newSession, session_date: e.target.value })}
                  className=&quot;w-full border border-gray-300 rounded-lg px-3 py-2&quot;
                />
              </div>
              <div>
                <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                  Session Focus
                </label>
                <input
                  type=&quot;text&quot;
                  value={newSession.session_focus}
                  onChange={(e) => setNewSession({ ...newSession, session_focus: e.target.value })}
                  placeholder=&quot;What did you work on?&quot;
                  className=&quot;w-full border border-gray-300 rounded-lg px-3 py-2&quot;
                />
              </div>
              <div className=&quot;md:col-span-2&quot;>
                <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                  Session Notes
                </label>
                <textarea
                  value={newSession.session_notes}
                  onChange={(e) => setNewSession({ ...newSession, session_notes: e.target.value })}
                  placeholder=&quot;Detailed notes about the session...&quot;
                  rows={3}
                  className=&quot;w-full border border-gray-300 rounded-lg px-3 py-2&quot;
                />
              </div>
              <div>
                <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                  Homework Assigned
                </label>
                <input
                  type=&quot;text&quot;
                  value={newSession.homework_assigned}
                  onChange={(e) => setNewSession({ ...newSession, homework_assigned: e.target.value })}
                  placeholder=&quot;Practice exercises, readings, etc.&quot;
                  className=&quot;w-full border border-gray-300 rounded-lg px-3 py-2&quot;
                />
              </div>
              <div>
                <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                  Next Session Goal
                </label>
                <input
                  type=&quot;text&quot;
                  value={newSession.next_session_goal}
                  onChange={(e) => setNewSession({ ...newSession, next_session_goal: e.target.value })}
                  placeholder=&quot;Goal for next session&quot;
                  className=&quot;w-full border border-gray-300 rounded-lg px-3 py-2&quot;
                />
              </div>
            </div>
            <div className=&quot;flex gap-2 mt-4&quot;>
              <button
                onClick={addSession}
                className=&quot;bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700&quot;
              >
                Add Session
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className=&quot;bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400&quot;
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className=&quot;space-y-4&quot;>
          {loading ? (
            <div className=&quot;text-center py-8&quot;>
              <div className=&quot;text-gray-500&quot;>Loading sessions...</div>
            </div>
          ) : sessions.length === 0 ? (
            <div className=&quot;text-center py-8&quot;>
              <div className=&quot;text-gray-500&quot;>No sessions recorded yet</div>
              <p className=&quot;text-sm text-gray-400 mt-2&quot;>
                Click &quot;Add Session&quot; to record your first coaching session
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                <div className=&quot;flex justify-between items-start mb-3&quot;>
                  <div>
                    <h4 className=&quot;font-medium text-lg&quot;>
                      {new Date(session.session_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h4>
                    {session.session_focus && (
                      <p className=&quot;text-blue-600 font-medium&quot;>{session.session_focus}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSession(session.id!)}
                    className=&quot;text-red-500 hover:text-red-700 text-sm&quot;
                  >
                    Delete
                  </button>
                </div>
                
                {session.session_notes && (
                  <div className=&quot;mb-3&quot;>
                    <h5 className=&quot;font-medium text-sm text-gray-700 mb-1&quot;>Session Notes:</h5>
                    <p className=&quot;text-gray-600 text-sm&quot;>{session.session_notes}</p>
                  </div>
                )}
                
                <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-4 text-sm&quot;>
                  {session.homework_assigned && (
                    <div>
                      <h5 className=&quot;font-medium text-gray-700&quot;>Homework Assigned:</h5>
                      <p className=&quot;text-gray-600&quot;>{session.homework_assigned}</p>
                    </div>
                  )}
                  {session.next_session_goal && (
                    <div>
                      <h5 className=&quot;font-medium text-gray-700&quot;>Next Session Goal:</h5>
                      <p className=&quot;text-gray-600&quot;>{session.next_session_goal}</p>
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
