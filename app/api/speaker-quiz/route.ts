import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import type { QuizResponse } from '@/lib/supabase';

type Archetype =
  | 'Rambler'
  | 'Overthinker'
  | 'Self-Doubter'
  | 'People Pleaser'
  | 'Performer'
  | 'Intense Speaker'
  | 'Rationalist';

interface QuizSubmission {
  email: string;
  firstName: string;
  archetype: Archetype;
  answers: Record<string, number>;
  optionalAnswers?: Record<string, string | string[]>;
}

// Archetype descriptions for the AI prompt
const ARCHETYPE_CONTEXTS: Record<Archetype, string> = {
  'Rambler': 'energetic and full of ideas but tends to go long and lose focus',
  'Overthinker': 'reflective and precise but gets stuck in analysis paralysis',
  'Self-Doubter': 'thoughtful and empathetic but undervalues their expertise and backs off too quickly',
  'People Pleaser': 'collaborative and warm but dilutes their message to avoid conflict',
  'Performer': 'charismatic and polished but sometimes prioritizes style over authenticity',
  'Intense Speaker': 'powerful presence with strong convictions but can overwhelm others',
  'Rationalist': 'highly credible and logical but can feel dry without human connection'
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Save quiz response to database
async function saveQuizResponse(
  email: string, 
  firstName: string, 
  archetype: Archetype, 
  answers: Record<string, number>,
  optionalAnswers?: Record<string, string | string[]>,
  ipAddress?: string
): Promise<string | null> {
  try {
    const quizResponse: Omit<QuizResponse, 'id' | 'created_at' | 'updated_at'> = {
      email,
      first_name: firstName,
      archetype,
      main_answers: answers,
      optional_answers: optionalAnswers || {},
      ip_address: ipAddress,
      calendly_booked: false,
      follow_up_sent: false,
      mailerlite_added: false,
      email_sent: false,
      // Set default CRM values for quiz responses
      signup_source: 'Quiz',
      status: 'Lead'
    };

    const { data, error } = await supabase
      .from('quiz_responses')
      .insert(quizResponse)
      .select('id')
      .single();

    if (error) {
      console.error('Error saving quiz response to database:', error);
      return null;
    }

    console.log('Quiz response saved to database with ID:', data.id);
    return data.id;
  } catch (error) {
    console.error('Error saving quiz response to database:', error);
    return null;
  }
}

// Update database when email is sent
async function markEmailSent(email: string): Promise<void> {
  try {
    await supabase
      .from('quiz_responses')
      .update({ email_sent: true })
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);
  } catch (error) {
    console.error('Error updating email_sent status:', error);
  }
}

// Update database when MailerLite is updated
async function markMailerLiteAdded(email: string): Promise<void> {
  try {
    await supabase
      .from('quiz_responses')
      .update({ mailerlite_added: true })
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);
  } catch (error) {
    console.error('Error updating mailerlite_added status:', error);
  }
}

// Generate personalized speaking plan using OpenAI
async function generateSpeakingPlan(archetype: Archetype, answers: Record<string, number>, optionalAnswers?: Record<string, string | string[]>): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `You are a professional speaking coach creating a personalized growth plan. 

The user has been identified as "${archetype}" - someone who is ${ARCHETYPE_CONTEXTS[archetype]}.

${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? `
ADDITIONAL CONTEXT FROM USER:
${Object.entries(optionalAnswers)
  .filter(([_, answer]) => {
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer && typeof answer === 'string' && answer.trim();
  })
  .map(([key, answer]) => {
    const questionMap: Record<string, string> = {
      'situations': 'Situations they want to improve in',
      'struggle': 'What they struggle most with',
      'authentic': 'When they feel most like themselves speaking',
      'world_class': 'How they\'d know if they were world-class',
      'confidence_moment': 'Moment they\'d love to feel more confident in',
      'life_change': 'How being a stronger speaker would change things',
      'curiosity': 'Something they\'ve always wondered about speaking'
    };
    const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
    return `- ${questionMap[key] || key}: ${formattedAnswer}`;
  })
  .join('\n')}

Use this additional context to make the plan even more personalized and relevant to their specific situation.
` : ''}

Based on their quiz responses${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? ' and additional context' : ''}, create a comprehensive but concise Speaker Growth Plan that includes:

1. **Your Speaking Archetype Summary** (2-3 sentences about their type)
2. **Your Unique Strengths** (3-4 key strengths to leverage)
3. **Growth Opportunities** (3-4 specific areas to develop)
4. **Immediate Action Steps** (3-4 practical things they can do this week)
5. **Practice Exercises** (2-3 specific exercises tailored to their archetype)
6. **Long-term Development Path** (recommended next steps for ongoing growth)

Make it personal, actionable, and encouraging. Use "you" throughout. Keep the tone warm but professional. Focus on practical advice they can implement immediately.

Format the response in clean markdown with clear headings and bullet points.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert speaking coach who creates personalized, actionable growth plans for speakers.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate plan at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate speaking plan');
  }
}

// Get MailerLite group IDs based on speaker archetype
function getMailerLiteGroups(archetype: Archetype): string[] {
  // MailerLite Group IDs mapping
  const groupIds = {
    'Rambler': ['164508817941333197'],
    'Overthinker': ['164508824256907051'], 
    'Self-Doubter': ['164508829277488166'],
    'People Pleaser': ['164508833936311822'],
    'Performer': ['164508838844695656'],
    'Intense Speaker': ['164508843953358407'],
    'Rationalist': ['164508850141005543']
  };

  // Always add to the "All Quiz Participants" group + their specific archetype group
  const allParticipantsGroupId = '164508855856793381';
  const archetypeGroups = groupIds[archetype] || [];
  
  return [allParticipantsGroupId, ...archetypeGroups];
}

// Add email to MailerLite with archetype group
async function addToMailerLite(email: string, firstName: string, archetype: Archetype): Promise<void> {
  const mailerLiteApiKey = process.env.MAILERLITE_API_KEY;
  
  if (!mailerLiteApiKey) {
    console.warn('MailerLite API key not configured - skipping email signup');
    return;
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mailerLiteApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: firstName,
          last_name: '', // Keep empty for now
          speaker_archetype: archetype,
          lead_source: 'Speaker Quiz'
        },
        // Add subscribers to appropriate groups based on their archetype
        groups: getMailerLiteGroups(archetype)
      }),
    });

    if (!response.ok) {
      console.error('MailerLite API error:', response.status, await response.text());
      // Don't throw - we don't want email signup failures to break the user experience
    } else {
      console.log('Successfully added to MailerLite:', email);
      // Mark as successfully added to MailerLite in database
      markMailerLiteAdded(email).catch(console.error);
    }
  } catch (error) {
    console.error('MailerLite error:', error);
    // Don't throw - we don't want email signup failures to break the user experience
  }
}

// Send email with the generated plan using Resend
async function sendEmail(email: string, firstName: string, archetype: Archetype, plan: string, optionalAnswers?: Record<string, string | string[]>): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('Resend API key not configured - logging email content instead');
    console.log('Email to send:', `Subject: Your Personal Speaker Growth Plan - ${archetype}\n\n${plan}`);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alistair Webster from Speak Up For Good <hello@speakupforgood.com>',
      to: [email],
      subject: `🎯 Your Personal Speaker Growth Plan - ${archetype}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header with Logo/Branding -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px; display: inline-block;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700;">SPEAK UP FOR GOOD</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; letter-spacing: 1px;">COACHING • WORKSHOPS • CONFIDENCE</p>
            </div>
            <h2 style="margin: 0; font-size: 28px; font-weight: 600;">🎯 Your Personal Speaker Growth Plan</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 18px;">Tailored for <strong>${archetype}</strong></p>
          </div>
          
          <div style="padding: 40px 30px; background: #ffffff;">
            <p style="font-size: 18px; margin-bottom: 25px; color: #4a5568;">Hi ${firstName}! 👋</p>
            
            <p style="margin-bottom: 25px; font-size: 16px; line-height: 1.7;">Thank you for taking the Speaker Archetype Quiz! Based on your responses, you've been identified as <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; font-size: 18px;">"${archetype}"</span>.</p>
            
            ${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? `
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">✨ I've personalized your plan based on your specific goals:</h3>
              <div style="font-size: 14px; color: #1e40af; line-height: 1.6;">
                ${Object.entries(optionalAnswers)
                  .filter(([_, answer]) => {
                    if (Array.isArray(answer)) return answer.length > 0;
                    return answer && typeof answer === 'string' && answer.trim();
                  })
                  .map(([key, answer]) => {
                    const questionLabels: Record<string, string> = {
                      'situations': 'Focus areas',
                      'struggle': 'Main challenge',
                      'confidence_moment': 'Key confidence goal',
                      'life_change': 'Desired impact'
                    };
                    if (['situations', 'struggle', 'confidence_moment', 'life_change'].includes(key)) {
                      const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
                      return `<strong>${questionLabels[key]}:</strong> ${formattedAnswer}`;
                    }
                    return null;
                  })
                  .filter(Boolean)
                  .join('<br><br>')}
              </div>
            </div>
            ` : ''}
            
            <p style="margin-bottom: 30px; font-size: 16px; line-height: 1.7;">Here's your ${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? 'fully customized' : 'personalized'} roadmap to speaking success:</p>
            
            <!-- Plan Content with Better Formatting -->
            <div style="background: linear-gradient(145deg, #f8fafc 0%, #ffffff 100%); padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #2d3748;">
                ${plan.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #667eea; font-weight: 700;">$1</strong>')
                      .replace(/^# (.*$)/gm, '<h2 style="color: #667eea; margin: 25px 0 15px 0; font-size: 22px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">$1</h2>')
                      .replace(/^## (.*$)/gm, '<h3 style="color: #4a5568; margin: 20px 0 12px 0; font-size: 18px; font-weight: 600;">$1</h3>')
                      .replace(/^- (.*$)/gm, '<div style="margin: 10px 0; padding-left: 15px; position: relative;"><span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">•</span>$1</div>')
                      .replace(/^\d+\. (.*$)/gm, '<div style="margin: 10px 0; padding-left: 20px; position: relative; counter-increment: step-counter;"><span style="position: absolute; left: 0; color: #667eea; font-weight: bold;">$1</span></div>')
                      .replace(/\n\n/g, '</div><div style="margin: 15px 0;">')
                      .replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin: 30px 0; color: white; text-align: center;">
              <h3 style="margin: 0 0 15px 0; font-size: 20px;">🎯 READY TO ACCELERATE YOUR PROGRESS?</h3>
              <p style="margin: 15px 0; opacity: 0.95;">Your growth plan gives you the roadmap, but sometimes it helps to have a guide.</p>
              
              <p style="margin: 15px 0; opacity: 0.95;">I'm offering free 30-minute consultation calls where we can:</p>
              <ul style="text-align: left; margin: 15px 0; padding-left: 20px; opacity: 0.95;">
                <li>✓ Dive deeper into your ${archetype} results</li>
                <li>✓ Identify your biggest speaking opportunities right now</li>
                <li>✓ Create a personalized roadmap for your specific goals</li>
                <li>✓ Get answers to any questions about your plan</li>
              </ul>
              
              <p style="margin: 15px 0; opacity: 0.95;">This is completely free with no obligation - just my way of helping fellow speakers grow.</p>
              
              <a href="https://calendly.com/alistair-webster/speaker-type-chat" 
                 style="display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; font-size: 16px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: all 0.3s ease;">
                📅 Book Your Free Consultation
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <p style="margin-bottom: 15px;">Best regards,<br><strong>Alistair Webster</strong><br>Speak Up For Good</p>
              
              <p style="font-size: 14px; color: #718096; margin: 15px 0;">
                P.S. You'll receive weekly speaking tips in your inbox. If you ever want to unsubscribe, just click the link at the bottom of any email.
              </p>
            </div>
          </div>
          
          <div style="background: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096;">
            <p style="margin: 0;">This email was sent because you completed the Speaker Archetype Quiz at Speak Up For Good.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email via Resend');
    }

    console.log('Email sent successfully via Resend:', data?.id);
    // Mark as successfully sent in database
    markEmailSent(email).catch(console.error);
  } catch (error) {
    console.error('Email sending error:', error);
    // Fall back to logging the content
    console.log('Email content (fallback):', plan);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: QuizSubmission = await request.json();
    const { email, firstName, archetype, answers, optionalAnswers } = body;

    // Validate input
    if (!email || !firstName || !archetype || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get client IP address for analytics
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1';

    // Save quiz response to database first
    const responseId = await saveQuizResponse(
      email, 
      firstName, 
      archetype, 
      answers, 
      optionalAnswers,
      clientIP
    );

    // Generate personalized speaking plan
    const speakingPlan = await generateSpeakingPlan(archetype, answers, optionalAnswers);

    // Add to email list (don't await to avoid blocking)
    addToMailerLite(email, firstName, archetype).catch(console.error);

    // Send email with plan (don't await to avoid blocking)
    sendEmail(email, firstName, archetype, speakingPlan, optionalAnswers).catch(console.error);

    return NextResponse.json({
      message: 'Success! Check your email for your personalized Speaking Growth Plan.',
      archetype,
      preview: speakingPlan.substring(0, 200) + '...' // Give a preview
    });

  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'Unable to generate your plan right now. Please try again in a moment.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
