-- Migration to add session tracking system
-- Run this in your Supabase SQL Editor

-- Create sessions table for tracking multiple coaching sessions
CREATE TABLE IF NOT EXISTS coaching_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES quiz_responses(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  session_focus TEXT,
  session_notes TEXT,
  homework_assigned TEXT,
  next_session_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coaching_sessions_contact_id ON coaching_sessions(contact_id);
CREATE INDEX IF NOT EXISTS idx_coaching_sessions_session_date ON coaching_sessions(session_date DESC);
CREATE INDEX IF NOT EXISTS idx_coaching_sessions_created_at ON coaching_sessions(created_at DESC);

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_coaching_sessions_updated_at 
    BEFORE UPDATE ON coaching_sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for sessions
CREATE POLICY "Allow all operations on coaching_sessions" ON coaching_sessions
  FOR ALL USING (true);

-- Create view for latest session per contact
CREATE OR REPLACE VIEW latest_sessions AS
SELECT DISTINCT ON (contact_id)
  contact_id,
  session_date,
  session_focus,
  next_session_goal,
  homework_assigned
FROM coaching_sessions
ORDER BY contact_id, session_date DESC, created_at DESC;

-- Migrate existing session data from quiz_responses to sessions table
-- Only migrate if there's actual session data
INSERT INTO coaching_sessions (contact_id, session_date, session_focus, next_session_goal, session_notes)
SELECT 
  id as contact_id,
  CURRENT_DATE as session_date,
  last_session_focus as session_focus,
  next_session_goal,
  'Migrated from previous system' as session_notes
FROM quiz_responses 
WHERE (last_session_focus IS NOT NULL AND last_session_focus != '') 
   OR (next_session_goal IS NOT NULL AND next_session_goal != '');
