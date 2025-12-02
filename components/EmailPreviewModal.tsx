'use client';

import { useState } from 'react';
import { X, Mail, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface EmailPreviewModalProps {
  contactId: string;
  contactName: string;
  contactEmail: string;
  onClose: () => void;
  onEmailStatusChange?: () => void;
}

interface EmailData {
  subject: string;
  content: string;
  status: 'pending' | 'sent' | 'failed' | 'retrying';
  sentAt?: string;
  error?: string;
  retryCount: number;
}

export default function EmailPreviewModal({ 
  contactId, 
  contactName, 
  contactEmail, 
  onClose, 
  onEmailStatusChange 
}: EmailPreviewModalProps) {
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load email data on mount
  useState(() => {
    loadEmailData();
  });

  const loadEmailData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/email-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview', contactId })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load email data');
      }

      setEmailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load email data');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: 'retry' | 'mark_sent' | 'reset') => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await fetch('/api/email-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, contactId })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${action} email`);
      }

      // Reload email data to get updated status
      await loadEmailData();
      
      // Notify parent component of status change
      if (onEmailStatusChange) {
        onEmailStatusChange();
      }

      // Show success message
      alert(data.message || `Email ${action} successful`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} email`);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'retrying':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'retrying':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
              <p className="text-sm text-gray-600">{contactName} ({contactEmail})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Left Panel - Email Status & Controls */}
          <div className="lg:w-1/3 p-6 border-r border-gray-200 bg-gray-50">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                  <AlertCircle className="w-5 h-5" />
                  Error
                </div>
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={loadEmailData}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try again
                </button>
              </div>
            ) : emailData ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Email Status</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(emailData.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(emailData.status)}`}>
                      {emailData.status.charAt(0).toUpperCase() + emailData.status.slice(1)}
                    </span>
                  </div>
                  
                  {emailData.sentAt && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Sent:</strong> {formatDate(emailData.sentAt)}
                    </p>
                  )}
                  
                  {emailData.retryCount > 0 && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Retry attempts:</strong> {emailData.retryCount}
                    </p>
                  )}
                  
                  {emailData.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      <strong>Error:</strong> {emailData.error}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Actions</h3>
                  <div className="space-y-2">
                    {emailData.status !== 'sent' && (
                      <button
                        onClick={() => handleAction('retry')}
                        disabled={actionLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <RefreshCw className={`w-4 h-4 ${actionLoading ? 'animate-spin' : ''}`} />
                        {actionLoading ? 'Sending...' : 'Retry Send'}
                      </button>
                    )}
                    
                    {emailData.status !== 'sent' && (
                      <button
                        onClick={() => handleAction('mark_sent')}
                        disabled={actionLoading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Sent
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleAction('reset')}
                      disabled={actionLoading}
                      className="w-full bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reset Status
                    </button>
                  </div>
                </div>

                {/* Email Details */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Email Details</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Subject:</strong> {emailData.subject}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>To:</strong> {contactEmail}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Panel - Email Preview */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-900">Email Preview</h3>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : emailData?.content ? (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: emailData.content }}
                />
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No email content available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
