import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Admin coaching-session operations, used by the Session History modal.

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('contact_id');

    if (!contactId) {
      return NextResponse.json({ error: 'contact_id is required' }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from('coaching_sessions')
      .select('*')
      .eq('contact_id', contactId)
      .order('session_date', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
    }

    return NextResponse.json({ sessions: data || [] });
  } catch (error) {
    console.error('Sessions GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.contact_id || !body.session_date) {
      return NextResponse.json({ error: 'contact_id and session_date are required' }, { status: 400 });
    }

    const newSession = {
      contact_id: body.contact_id,
      session_date: body.session_date,
      session_focus: body.session_focus || null,
      session_notes: body.session_notes || null,
      homework_assigned: body.homework_assigned || null,
      next_session_goal: body.next_session_goal || null,
    };

    const { data, error } = await getSupabaseAdmin()
      .from('coaching_sessions')
      .insert([newSession])
      .select()
      .single();

    if (error) {
      console.error('Error adding session:', error);
      return NextResponse.json({ error: 'Failed to add session' }, { status: 500 });
    }

    return NextResponse.json({ session: data });
  } catch (error) {
    console.error('Sessions POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from('coaching_sessions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting session:', error);
      return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sessions DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
