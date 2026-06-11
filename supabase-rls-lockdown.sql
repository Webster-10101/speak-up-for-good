-- RLS lockdown — run in Supabase SQL Editor AFTER deploying the code that
-- moves all database access behind API routes (and after adding
-- SUPABASE_SERVICE_ROLE_KEY to Vercel env).
--
-- Before this migration, both tables had "allow all operations" policies,
-- meaning anyone with the public anon key (i.e. anyone) could read, modify,
-- or delete every contact and coaching session. This removes those policies.
--
-- With RLS enabled and NO policies, anon/authenticated roles are denied
-- everything. The service role bypasses RLS, so the API routes keep working.

-- 1. Drop the allow-all policies
DROP POLICY IF EXISTS "Allow all operations on quiz_responses" ON quiz_responses;
DROP POLICY IF EXISTS "Allow all operations on coaching_sessions" ON coaching_sessions;

-- 2. Ensure RLS is enabled (it already was, but belt and braces)
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_sessions ENABLE ROW LEVEL SECURITY;

-- 3. Also revoke direct table grants from the public-facing roles, so even a
--    future "RLS disabled" slip doesn't expose the tables.
REVOKE ALL ON quiz_responses FROM anon, authenticated;
REVOKE ALL ON coaching_sessions FROM anon, authenticated;
REVOKE ALL ON latest_sessions FROM anon, authenticated;

-- 4. Verify (should return zero rows = no policies left on these tables)
SELECT tablename, policyname FROM pg_policies
WHERE tablename IN ('quiz_responses', 'coaching_sessions');

-- Verification from outside (run in a terminal — both should return a
-- permission error or empty result, NOT data):
--   curl "https://<project>.supabase.co/rest/v1/quiz_responses?select=email&limit=5" \
--     -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>"
