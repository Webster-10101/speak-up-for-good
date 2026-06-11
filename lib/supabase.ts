// Shared database types. The browser Supabase client that used to live here
// has been retired — all database access now goes through API routes using
// lib/supabase-admin.ts (service role, server-only). Do not re-add a client
// here: the anon key has no database privileges since the RLS lockdown.

// Database types
export interface QuizResponse {
  id?: string
  email: string
  first_name: string
  archetype?: string
  main_answers?: Record<string, number>
  optional_answers?: Record<string, string | string[]>
  created_at?: string
  updated_at?: string
  ip_address?: string
  
  // Original tracking fields
  calendly_booked?: boolean
  follow_up_sent?: boolean
  mailerlite_added?: boolean
  email_sent?: boolean
  
  // New CRM fields
  signup_source?: string
  status?: 'Lead' | 'Call Booked' | 'Client' | 'Lapsed Client'
  focus_area?: string
  last_session_focus?: string
  next_session_goal?: string
  notes?: string
  
  // Email tracking fields
  email_content?: string
  email_subject?: string
  email_status?: 'pending' | 'sent' | 'failed' | 'retrying'
  email_error?: string
  email_sent_at?: string
  email_retry_count?: number
  resend_email_id?: string

  // Consultation intake fields
  intake_answers?: Record<string, string | number | string[]>
  intake_submitted_at?: string
}

// Type for coaching sessions
export interface CoachingSession {
  id?: string
  contact_id: string
  session_date: string
  session_focus?: string
  session_notes?: string
  homework_assigned?: string
  next_session_goal?: string
  created_at?: string
  updated_at?: string
}

// Type for analytics view
export interface CRMSummary {
  signup_source: string
  total_contacts: number
  leads: number
  calls_booked: number
  clients: number
  lapsed_clients: number
  client_conversion_rate: number
}

// Extended contact type with session info
export interface ContactWithSessions extends QuizResponse {
  latest_session?: {
    session_date: string
    session_focus?: string
    next_session_goal?: string
    homework_assigned?: string
  }
  session_count?: number
}


