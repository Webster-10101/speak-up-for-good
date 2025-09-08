import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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


