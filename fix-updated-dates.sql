-- Fix the updated_at timestamps that were incorrectly modified by the migration
-- This will restore the updated_at to match created_at for records that were only updated for email_status

-- Temporarily disable the trigger to prevent further updates
DROP TRIGGER IF EXISTS update_quiz_responses_updated_at ON quiz_responses;

-- Reset updated_at to created_at for records where they should be the same
-- (This assumes most records haven't been manually updated since creation)
UPDATE quiz_responses 
SET updated_at = created_at 
WHERE updated_at::date = CURRENT_DATE 
  AND created_at::date != CURRENT_DATE
  AND (email_content IS NULL OR email_content = '');

-- Re-enable the trigger
CREATE TRIGGER update_quiz_responses_updated_at 
    BEFORE UPDATE ON quiz_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

