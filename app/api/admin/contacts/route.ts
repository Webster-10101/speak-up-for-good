import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Admin CRM contact operations. Every handler requires an authenticated
// admin session — the database itself denies anonymous access (RLS), so
// these routes are the only path to contact data.

const SORTABLE_COLUMNS = ['created_at', 'updated_at', 'first_name', 'status'] as const;

// Columns the CRM UI is allowed to edit. Everything else (quiz answers,
// email tracking, intake data) is written by the public funnels server-side.
const EDITABLE_COLUMNS = [
  'first_name',
  'email',
  'status',
  'signup_source',
  'archetype',
  'focus_area',
  'last_session_focus',
  'next_session_goal',
  'notes',
] as const;

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const archetype = searchParams.get('archetype');
    const status = searchParams.get('status');
    const emailStatus = searchParams.get('email_status');
    const sortParam = searchParams.get('sort') || 'updated_at';
    const sort = (SORTABLE_COLUMNS as readonly string[]).includes(sortParam)
      ? sortParam
      : 'updated_at';

    let query = getSupabaseAdmin().from('quiz_responses').select('*');

    if (archetype && archetype !== 'all') query = query.eq('archetype', archetype);
    if (status && status !== 'all') query = query.eq('status', status);
    if (emailStatus && emailStatus !== 'all') query = query.eq('email_status', emailStatus);

    const { data, error } = await query.order(sort, { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }

    return NextResponse.json({ contacts: data || [] });
  } catch (error) {
    console.error('Contacts GET error:', error);
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

    if (!body.first_name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const newContact: Record<string, unknown> = {};
    for (const column of EDITABLE_COLUMNS) {
      if (body[column] !== undefined && body[column] !== '') {
        newContact[column] = body[column];
      }
    }
    newContact.email = String(body.email).trim().toLowerCase();
    newContact.first_name = String(body.first_name).trim();

    const { data, error } = await getSupabaseAdmin()
      .from('quiz_responses')
      .insert([newContact])
      .select()
      .single();

    if (error) {
      console.error('Error adding contact:', error);
      return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 });
    }

    return NextResponse.json({ contact: data });
  } catch (error) {
    console.error('Contacts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { id, field, value } = await request.json();

    if (!id || !field) {
      return NextResponse.json({ error: 'id and field are required' }, { status: 400 });
    }
    if (!(EDITABLE_COLUMNS as readonly string[]).includes(field)) {
      return NextResponse.json({ error: `Field "${field}" is not editable` }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from('quiz_responses')
      .update({ [field]: value })
      .eq('id', id);

    if (error) {
      console.error('Error updating contact:', error);
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contacts PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids array is required' }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from('quiz_responses')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error deleting contacts:', error);
      return NextResponse.json({ error: 'Failed to delete contacts' }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error('Contacts DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
