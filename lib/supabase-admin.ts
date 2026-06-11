import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Server-only Supabase client using the service role key, which bypasses RLS.
// NEVER import this from client components — the service role key must not
// reach the browser bundle. API routes only.
//
// Lazily initialised so a missing env var fails at request time with a clear
// message rather than crashing the whole build.

let cached: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceRoleKey) {
    cached = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
    return cached
  }

  // Transition fallback: until SUPABASE_SERVICE_ROLE_KEY is configured, fall
  // back to the anon key. This only works while the permissive RLS policies
  // are still in place — once RLS is locked down, the key must be set.
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!anonKey) {
    throw new Error('Neither SUPABASE_SERVICE_ROLE_KEY nor NEXT_PUBLIC_SUPABASE_ANON_KEY is set')
  }
  console.warn(
    'SUPABASE_SERVICE_ROLE_KEY not set — falling back to anon key. ' +
    'Database writes will fail once RLS is locked down. Add the service role key to the environment.'
  )
  cached = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
  return cached
}
