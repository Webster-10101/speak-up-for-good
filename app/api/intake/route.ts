import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { QuizResponse } from '@/lib/supabase';

// Simple in-memory rate limiting (same shape as speaker-quiz route)
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

// Undocumented Substack subscribe endpoint. Fire-and-forget: we don't block the
// intake response on this succeeding, and we never surface a failure to the user.
async function subscribeToSubstack(email: string): Promise<void> {
  try {
    const res = await fetch('https://speakupforgood.substack.com/api/v1/free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, first_url: 'https://speakupforgood.com/consultation' }),
    });
    if (!res.ok) {
      console.error('Substack subscribe non-OK:', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('Substack subscribe failed:', err);
  }
}

interface IntakeSubmission {
  email: string;
  name: string;
  intakeAnswers: Record<string, string | number | string[]>;
  newsletterOptIn?: boolean;
}

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

    const body: IntakeSubmission = await request.json();
    const { email, name, intakeAnswers, newsletterOptIn } = body;

    if (!email || !name || !intakeAnswers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const intakeAnswersStr = JSON.stringify(intakeAnswers);
    if (intakeAnswersStr.length > 10000) {
      return NextResponse.json(
        { error: 'Input too large. Please keep your answers concise.' },
        { status: 400 }
      );
    }

    const normalisedEmail = email.trim().toLowerCase();
    const nowIso = new Date().toISOString();

    // Find latest existing row by email (same pattern as markEmailSent in speaker-quiz)
    const { data: existing, error: lookupError } = await supabase
      .from('quiz_responses')
      .select('id, signup_source, status')
      .eq('email', normalisedEmail)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      console.error('Error looking up existing contact:', lookupError);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    if (existing) {
      // UPDATE existing contact — enrich with intake data, bump status only if still a Lead,
      // only overwrite signup_source if it's currently Quiz or null (preserve manual entries).
      const updatePayload: Partial<QuizResponse> = {
        intake_answers: intakeAnswers,
        intake_submitted_at: nowIso,
      };

      if (!existing.signup_source || existing.signup_source === 'Quiz') {
        updatePayload.signup_source = 'Consultation Intake';
      }

      if (!existing.status || existing.status === 'Lead') {
        updatePayload.status = 'Call Booked';
      }

      const { error: updateError } = await supabase
        .from('quiz_responses')
        .update(updatePayload)
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error updating existing contact:', updateError);
        return NextResponse.json(
          { error: 'Something went wrong. Please try again.' },
          { status: 500 }
        );
      }

      if (newsletterOptIn) {
        void subscribeToSubstack(normalisedEmail);
      }

      return NextResponse.json({ success: true, mode: 'updated' });
    }

    // INSERT new contact
    const newContact: Omit<QuizResponse, 'id' | 'created_at' | 'updated_at'> = {
      email: normalisedEmail,
      first_name: name.trim(),
      signup_source: 'Consultation Intake',
      status: 'Call Booked',
      intake_answers: intakeAnswers,
      intake_submitted_at: nowIso,
      ip_address: clientIP,
      calendly_booked: true,
      follow_up_sent: false,
      mailerlite_added: false,
      email_sent: false,
    };

    const { error: insertError } = await supabase
      .from('quiz_responses')
      .insert(newContact);

    if (insertError) {
      console.error('Error inserting new contact:', insertError);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    if (newsletterOptIn) {
      void subscribeToSubstack(normalisedEmail);
    }

    return NextResponse.json({ success: true, mode: 'created' });
  } catch (error) {
    console.error('Intake API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
