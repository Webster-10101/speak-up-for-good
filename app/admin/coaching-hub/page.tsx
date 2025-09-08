'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { QuizResponse } from '@/lib/supabase';
import AddContactForm from '@/components/AddContactForm';

export default function CoachingHub() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'updated_at' | 'first_name' | 'status'>('updated_at');
  const [editingCell, setEditingCell] = useState<{contactId: string, field: string} | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchContacts();
  }, [session, status, router, filter, statusFilter, sortBy]);

  async function fetchContacts() {
    try {
      let query = supabase
        .from('quiz_responses')
        .select('*');

      // Apply archetype filter
      if (filter !== 'all') {
        query = query.eq('archetype', filter);
      }

      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching contacts:', error);
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateContact(contactId: string, field: string, value: string) {
    try {
      const { error } = await supabase
        .from('quiz_responses')
        .update({ [field]: value })
        .eq('id', contactId);

      if (error) {
        console.error('Error updating contact:', error);
        return;
      }

      // Update local state
      setContacts(prev => prev.map(contact => 
        contact.id === contactId ? { ...contact, [field]: value } : contact
      ));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  const archetypes = [
    'Rambler', 'Overthinker', 'Self-Doubter', 'People Pleaser', 
    'Performer', 'Intense Speaker', 'Rationalist'
  ];

  const signupSources = ['Quiz', 'LinkedIn', 'Calendly', 'Referral', 'Manual Entry'];
  const statuses = ['Lead', 'Call Booked', 'Client', 'Lapsed Client'];

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'Lead': return 'bg-blue-100 text-blue-800';
      case 'Call Booked': return 'bg-yellow-100 text-yellow-800';
      case 'Client': return 'bg-green-100 text-green-800';
      case 'Lapsed Client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading coaching hub...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Coaching Hub</h1>
              <p className="text-gray-600">Total contacts: {contacts.length}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Add Contact
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium text-gray-500">Leads</h3>
            <p className="text-2xl font-bold text-blue-600">
              {contacts.filter(c => c.status === 'Lead').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium text-gray-500">Calls Booked</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {contacts.filter(c => c.status === 'Call Booked').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium text-gray-500">Active Clients</h3>
            <p className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'Client').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium text-gray-500">Lapsed Clients</h3>
            <p className="text-2xl font-bold text-gray-600">
              {contacts.filter(c => c.status === 'Lapsed Client').length}
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Archetype:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Archetypes</option>
                {archetypes.map(archetype => (
                  <option key={archetype} value={archetype}>{archetype}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="updated_at">Last Updated</option>
                <option value="created_at">Date Added</option>
                <option value="first_name">Name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archetype</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Area</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Session</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Goal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.first_name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={contact.status || 'Lead'}
                        onChange={(e) => updateContact(contact.id!, 'status', e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-none ${getStatusBadgeColor(contact.status)}`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={contact.signup_source || 'Quiz'}
                        onChange={(e) => updateContact(contact.id!, 'signup_source', e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-gray-300"
                      >
                        {signupSources.map(source => (
                          <option key={source} value={source}>{source}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {contact.archetype || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <input
                        type="text"
                        value={contact.focus_area || ''}
                        onChange={(e) => updateContact(contact.id!, 'focus_area', e.target.value)}
                        placeholder="e.g. Confidence, Storytelling..."
                        className="w-full text-sm p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <input
                        type="text"
                        value={contact.last_session_focus || ''}
                        onChange={(e) => updateContact(contact.id!, 'last_session_focus', e.target.value)}
                        placeholder="What did you work on last?"
                        className="w-full text-sm p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <input
                        type="text"
                        value={contact.next_session_goal || ''}
                        onChange={(e) => updateContact(contact.id!, 'next_session_goal', e.target.value)}
                        placeholder="Next goal or homework..."
                        className="w-full text-sm p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(contact.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {contacts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-lg">No contacts found</div>
            <p className="text-gray-500 mt-2">Contacts will appear here once users complete the quiz or you add them manually</p>
          </div>
        )}

        {/* Add Contact Form Modal */}
        {showAddForm && (
          <AddContactForm
            onClose={() => setShowAddForm(false)}
            onAdd={(newContact) => {
              setContacts(prev => [newContact, ...prev]);
            }}
          />
        )}
      </div>
    </div>
  );
}
