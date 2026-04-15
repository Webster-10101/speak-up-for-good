-- Consultation intake form migration
-- Adds JSONB storage for post-booking intake form answers + submission timestamp.
-- Non-breaking: existing rows get NULL for both new fields.

ALTER TABLE quiz_responses
  ADD COLUMN IF NOT EXISTS intake_answers JSONB,
  ADD COLUMN IF NOT EXISTS intake_submitted_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_quiz_responses_intake_submitted_at
  ON quiz_responses(intake_submitted_at DESC);
