'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { QuizResponse } from '@/lib/supabase';

interface AddContactFormProps {
  onClose: () => void;
  onAdd: (contact: QuizResponse) => void;
}

export default function AddContactForm({ onClose, onAdd }: AddContactFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    signup_source: 'Manual Entry',
    status: 'Lead',
    archetype: '',
    focus_area: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .insert([formData])
        .select()
        .single();

      if (error) {
        console.error('Error adding contact:', error);
        alert('Error adding contact. Please try again.');
        return;
      }

      onAdd(data);
      onClose();
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Error adding contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const archetypes = [
    '', 'Rambler', 'Overthinker', 'Self-Doubter', 'People Pleaser', 
    'Performer', 'Intense Speaker', 'Rationalist'
  ];

  const signupSources = ['Manual Entry', 'Quiz', 'LinkedIn', 'Calendly', 'Referral'];
  const statuses = ['Lead', 'Call Booked', 'Client', 'Lapsed Client'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Contact</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signup Source
            </label>
            <select
              value={formData.signup_source}
              onChange={(e) => setFormData({ ...formData, signup_source: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {signupSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archetype (Optional)
            </label>
            <select
              value={formData.archetype}
              onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {archetypes.map(archetype => (
                <option key={archetype} value={archetype}>
                  {archetype || 'None'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Focus Area
            </label>
            <input
              type="text"
              value={formData.focus_area}
              onChange={(e) => setFormData({ ...formData, focus_area: e.target.value })}
              placeholder="e.g. Confidence, Storytelling, Pausing..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Initial notes about this contact..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
