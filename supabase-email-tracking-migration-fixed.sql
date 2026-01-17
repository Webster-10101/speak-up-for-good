-- IMPROVED Migration to add comprehensive email tracking to quiz_responses table
-- This version prevents updating the updated_at timestamp unnecessarily
-- Run this in your Supabase SQL Editor

-- Add email tracking columns (these are safe to run multiple times)
ALTER TABLE quiz_responses 
ADD COLUMN IF NOT EXISTS email_content TEXT,
ADD COLUMN IF NOT EXISTS email_subject VARCHAR(255),
ADD COLUMN IF NOT EXISTS email_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS email_error TEXT,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_retry_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS resend_email_id VARCHAR(255);

-- Create indexes for email status queries
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email_status ON quiz_responses(email_status);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email_sent_at ON quiz_responses(email_sent_at DESC);

-- Temporarily disable the updated_at trigger to prevent timestamp changes
DROP TRIGGER IF EXISTS update_quiz_responses_updated_at ON quiz_responses;

-- Update existing records to have proper email status WITHOUT changing updated_at
UPDATE quiz_responses 
SET email_status = CASE 
  WHEN email_sent = true THEN 'sent'
  ELSE 'pending'
END
WHERE email_status IS NULL OR email_status = 'pending';

-- Re-enable the updated_at trigger
CREATE TRIGGER update_quiz_responses_updated_at 
    BEFORE UPDATE ON quiz_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON COLUMN quiz_responses.email_content IS 'The full HTML content of the email that was/should be sent';
COMMENT ON COLUMN quiz_responses.email_subject IS 'The subject line of the email';
COMMENT ON COLUMN quiz_responses.email_status IS 'Status: pending, sent, failed, retrying';
COMMENT ON COLUMN quiz_responses.email_error IS 'Error message if email failed to send';
COMMENT ON COLUMN quiz_responses.email_sent_at IS 'Timestamp when email was successfully sent';
COMMENT ON COLUMN quiz_responses.email_retry_count IS 'Number of times email sending has been attempted';
COMMENT ON COLUMN quiz_responses.resend_email_id IS 'Resend service email ID for tracking';

