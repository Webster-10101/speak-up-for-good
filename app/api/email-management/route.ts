import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Types for the archetype system
type Archetype = 'Rambler' | 'Overthinker' | 'Self-Doubter' | 'People Pleaser' | 'Performer' | 'Intense Speaker' | 'Rationalist';

// Generate email HTML content (same as in speaker-quiz route)
function generateEmailHTML(firstName: string, archetype: Archetype, plan: string, optionalAnswers?: Record<string, string | string[]>): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #667eea; margin: 0; font-size: 24px;">Speak Up For Good</h1>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">Hi ${firstName},</p>
      
      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
        Thanks for taking the speaker quiz! Based on your answers, you're a <strong>${archetype}</strong>. 
        ${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? 'I\'ve personalized this plan based on what you shared.' : 'Here\'s your personalized growth plan.'}
      </p>
      
      <div style="background: #f8fafc; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0;">
        <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #2d3748;">
          ${plan.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #667eea;">$1</strong>')
                .replace(/^# (.*$)/gm, '<h2 style="color: #667eea; margin: 15px 0 10px 0; font-size: 18px;">$1</h2>')
                .replace(/^## (.*$)/gm, '<h3 style="color: #4a5568; margin: 12px 0 8px 0; font-size: 16px;">$1</h3>')
                .replace(/^\* (.*$)/gm, '<li style="margin: 5px 0;">$1</li>')
                .replace(/(<li.*<\/li>)/s, '<ul style="margin: 10px 0; padding-left: 20px;">$1</ul>')}
        </div>
      </div>
      
      <div style="border: 2px solid #667eea; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #667eea;">Want to dive deeper?</h3>
        <p style="margin: 10px 0; color: #4a5568; font-size: 15px;">I offer free 30-minute calls to discuss your results and create a roadmap for your specific goals.</p>
        <a href="https://calendly.com/alistair-webster/speaker-type-chat" 
           style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 10px 0;">
          Book a free call
        </a>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        Best,<br>
        <strong>Alistair</strong>
      </p>
      
      <p style="font-size: 12px; color: #999; margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
        You'll receive weekly speaking tips. Unsubscribe anytime.
      </p>
      
    </div>
  `;
}

// Send email using Resend
async function sendEmailWithResend(
  email: string, 
  firstName: string, 
  archetype: Archetype, 
  plan: string, 
  optionalAnswers?: Record<string, string | string[]>
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    const subject = `Your Speaker Growth Plan - ${archetype}`;
    const html = generateEmailHTML(firstName, archetype, plan, optionalAnswers);

    const { data, error } = await resend.emails.send({
      from: 'Alistair Webster <hello@speakupforgood.com>',
      to: [email],
      subject,
      html
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message || 'Failed to send email via Resend' };
    }

    console.log('Email sent successfully via Resend:', data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update email status in database
async function updateEmailStatus(
  contactId: string, 
  status: 'pending' | 'sent' | 'failed' | 'retrying',
  emailId?: string,
  error?: string
): Promise<void> {
  const updateData: any = {
    email_status: status,
    email_retry_count: status === 'retrying' ? 
      await getRetryCount(contactId) + 1 : 
      await getRetryCount(contactId)
  };

  if (status === 'sent') {
    updateData.email_sent = true;
    updateData.email_sent_at = new Date().toISOString();
    if (emailId) updateData.resend_email_id = emailId;
  }

  if (error) {
    updateData.email_error = error;
  }

  await supabase
    .from('quiz_responses')
    .update(updateData)
    .eq('id', contactId);
}

// Get current retry count
async function getRetryCount(contactId: string): Promise<number> {
  const { data } = await supabase
    .from('quiz_responses')
    .select('email_retry_count')
    .eq('id', contactId)
    .single();
  
  return data?.email_retry_count || 0;
}

export async function POST(request: NextRequest) {
  try {
    const { action, contactId } = await request.json();

    if (!contactId) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    // Get contact details
    const { data: contact, error: fetchError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', contactId)
      .single();

    if (fetchError || !contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    switch (action) {
      case 'preview': {
        // Generate email content for preview
        if (!contact.email_content) {
          return NextResponse.json({ 
            error: 'No email content available. This contact may not have completed the quiz properly.' 
          }, { status: 400 });
        }

        return NextResponse.json({
          subject: contact.email_subject || `Your Speaker Growth Plan - ${contact.archetype}`,
          content: contact.email_content,
          status: contact.email_status,
          sentAt: contact.email_sent_at,
          error: contact.email_error,
          retryCount: contact.email_retry_count || 0
        });
      }

      case 'retry': {
        // Retry sending the email
        if (!contact.email_content) {
          return NextResponse.json({ 
            error: 'No email content available to retry. This contact may not have completed the quiz properly.' 
          }, { status: 400 });
        }

        // Update status to retrying
        await updateEmailStatus(contactId, 'retrying');

        // Extract plan from stored email content (simple extraction)
        const planMatch = contact.email_content.match(/<div style="white-space: pre-wrap[^>]*>(.*?)<\/div>/s);
        const plan = planMatch ? planMatch[1].replace(/<[^>]*>/g, '').trim() : 'Your personalized speaking plan';

        // Attempt to send email
        const result = await sendEmailWithResend(
          contact.email,
          contact.first_name,
          contact.archetype as Archetype,
          plan,
          contact.optional_answers
        );

        if (result.success) {
          await updateEmailStatus(contactId, 'sent', result.emailId);
          return NextResponse.json({ 
            success: true, 
            message: 'Email sent successfully',
            emailId: result.emailId
          });
        } else {
          await updateEmailStatus(contactId, 'failed', undefined, result.error);
          return NextResponse.json({ 
            success: false, 
            error: result.error 
          }, { status: 500 });
        }
      }

      case 'mark_sent': {
        // Manually mark as sent (for cases where email was sent outside the system)
        await updateEmailStatus(contactId, 'sent');
        return NextResponse.json({ success: true, message: 'Email marked as sent' });
      }

      case 'reset': {
        // Reset email status to pending
        await supabase
          .from('quiz_responses')
          .update({
            email_status: 'pending',
            email_sent: false,
            email_error: null,
            email_sent_at: null,
            email_retry_count: 0,
            resend_email_id: null
          })
          .eq('id', contactId);

        return NextResponse.json({ success: true, message: 'Email status reset' });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Email management API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Get email status summary
    let query = supabase
      .from('quiz_responses')
      .select('id, email, first_name, email_status, email_sent_at, email_error, email_retry_count, created_at');

    if (status && status !== 'all') {
      query = query.eq('email_status', status);
    }

    const { data: contacts, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get summary stats
    const stats = {
      total: contacts?.length || 0,
      pending: contacts?.filter(c => c.email_status === 'pending').length || 0,
      sent: contacts?.filter(c => c.email_status === 'sent').length || 0,
      failed: contacts?.filter(c => c.email_status === 'failed').length || 0,
      retrying: contacts?.filter(c => c.email_status === 'retrying').length || 0
    };

    return NextResponse.json({ contacts, stats });

  } catch (error) {
    console.error('Email management GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
