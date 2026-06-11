import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Public endpoint backing the speaking-drills email gate. This is the only
// client-reachable write path to quiz_responses now that the anon key has no
// database privileges.

// Simple in-memory rate limiting (same shape as the intake route — per
// serverless instance, best-effort)
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     '127.0.0.1';

    const now = Date.now();
    const userRequests = rateLimit.get(clientIP) || [];
    const recentRequests = userRequests.filter((time: number) => now - time < RATE_WINDOW);

    if (recentRequests.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimit.set(clientIP, recentRequests);

    const { firstName, email } = await request.json();

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (String(firstName).length > 100 || String(email).length > 200) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const normalisedEmail = String(email).trim().toLowerCase();

    // Existing contact: just touch updated_at on the latest row.
    // New contact: create a Lead sourced from the drills gate.
    const { data: existing, error: lookupError } = await getSupabaseAdmin()
      .from('quiz_responses')
      .select('id')
      .eq('email', normalisedEmail)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error('Drills access lookup error:', lookupError);
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    if (existing) {
      await getSupabaseAdmin()
        .from('quiz_responses')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      const { error: insertError } = await getSupabaseAdmin()
        .from('quiz_responses')
        .insert({
          email: normalisedEmail,
          first_name: String(firstName).trim(),
          signup_source: 'Speaking Drills',
          status: 'Lead',
          ip_address: clientIP,
        });

      if (insertError) {
        console.error('Drills access insert error:', insertError);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Drills access API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
