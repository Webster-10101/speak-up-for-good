-- Migration script to add CRM columns to existing quiz_responses table
-- Run this in your Supabase SQL Editor (FIXED VERSION)

-- Add new columns to existing table
ALTER TABLE quiz_responses 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS signup_source VARCHAR(50) DEFAULT 'Quiz',
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Lead',
ADD COLUMN IF NOT EXISTS focus_area TEXT,
ADD COLUMN IF NOT EXISTS last_session_focus TEXT,
ADD COLUMN IF NOT EXISTS next_session_goal TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Make archetype and main_answers nullable for manual entries
ALTER TABLE quiz_responses 
ALTER COLUMN archetype DROP NOT NULL,
ALTER COLUMN main_answers DROP NOT NULL;

-- Set updated_at for existing records
UPDATE quiz_responses 
SET updated_at = created_at 
WHERE updated_at IS NULL;

-- Create new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_updated_at ON quiz_responses(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_signup_source ON quiz_responses(signup_source);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_status ON quiz_responses(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_quiz_responses_updated_at ON quiz_responses;
CREATE TRIGGER update_quiz_responses_updated_at 
    BEFORE UPDATE ON quiz_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Drop existing views that might conflict
DROP VIEW IF EXISTS quiz_analytics;
DROP VIEW IF EXISTS crm_summary;

-- Create new analytics view
CREATE VIEW quiz_analytics AS
SELECT 
  archetype,
  signup_source,
  status,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'Lead') as leads,
  COUNT(*) FILTER (WHERE status = 'Call Booked') as calls_booked,
  COUNT(*) FILTER (WHERE status = 'Client') as clients,
  COUNT(*) FILTER (WHERE status = 'Lapsed Client') as lapsed_clients,
  COUNT(*) FILTER (WHERE calendly_booked = true) as booked_calls,
  COUNT(*) FILTER (WHERE optional_answers IS NOT NULL AND optional_answers != '{}') as completed_optional,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'Client')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 
    2
  ) as client_conversion_rate,
  DATE_TRUNC('day', created_at) as date
FROM quiz_responses
GROUP BY archetype, signup_source, status, DATE_TRUNC('day', created_at)
ORDER BY date DESC, total_contacts DESC;

-- Create CRM summary view
CREATE VIEW crm_summary AS
SELECT 
  signup_source,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'Lead') as leads,
  COUNT(*) FILTER (WHERE status = 'Call Booked') as calls_booked,
  COUNT(*) FILTER (WHERE status = 'Client') as clients,
  COUNT(*) FILTER (WHERE status = 'Lapsed Client') as lapsed_clients,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'Client')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 
    2
  ) as client_conversion_rate
FROM quiz_responses
GROUP BY signup_source
ORDER BY total_contacts DESC;
