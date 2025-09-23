import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import type { QuizResponse } from '@/lib/supabase';

// Simple in-memory rate limiting
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT = 3; // requests per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

type Archetype =
  | 'rambler' | 'Rambler'
  | 'overthinker' | 'Overthinker'
  | 'doubter' | 'Self-Doubter'
  | 'pleaser' | 'People Pleaser'
  | 'performer' | 'Performer'
  | 'intense' | 'Intense Speaker'
  | 'rationalist' | 'Rationalist'
  | 'minimalist' | 'Minimalist';

interface QuizSubmission {
  email: string;
  firstName: string;
  archetype: Archetype;
  answers: Record<string, any>; // Updated to support new answer format
  optionalAnswers?: Record<string, string | string[]>;
}

// Archetype descriptions for the AI prompt - normalize to lowercase for lookup
const ARCHETYPE_CONTEXTS: Record<string, string> = {
  'rambler': 'has energy to spare, ideas tumble out fast and furious, but clarity gets lost in the noise - needs to focus on one main point and pause purposefully',
  'Rambler': 'has energy to spare, ideas tumble out fast and furious, but clarity gets lost in the noise - needs to focus on one main point and pause purposefully',
  'overthinker': 'has plenty to say but freezes when spotlight is on, runs mental checks instead of speaking freely - needs to trust first thoughts and feel rather than just think',
  'Overthinker': 'has plenty to say but freezes when spotlight is on, runs mental checks instead of speaking freely - needs to trust first thoughts and feel rather than just think',
  'doubter': 'knows their stuff but shrinks back when speaking, fear of judgment makes them play small - needs to drop apologies and speak from care not fear',
  'Self-Doubter': 'knows their stuff but shrinks back when speaking, fear of judgment makes them play small - needs to drop apologies and speak from care not fear',
  'pleaser': 'cares about people but slips into performance mode to keep everyone comfortable instead of saying what they think - needs to risk the truth and stop trying to please everyone',
  'People Pleaser': 'cares about people but slips into performance mode to keep everyone comfortable instead of saying what they think - needs to risk the truth and stop trying to please everyone',
  'performer': 'knows how to put on a show with strong delivery and polish, but this gets in the way of real connection - needs to bring feeling and drop the act',
  'Performer': 'knows how to put on a show with strong delivery and polish, but this gets in the way of real connection - needs to bring feeling and drop the act',
  'intense': 'speaks with power and conviction but sometimes overwhelms with intensity - needs to play with contrast and add lightness',
  'Intense Speaker': 'speaks with power and conviction but sometimes overwhelms with intensity - needs to play with contrast and add lightness',
  'rationalist': 'likes clear structure and solid logic which gives credibility, but can sound flat and miss human connection - needs to add feeling and switch off lecture mode',
  'Rationalist': 'likes clear structure and solid logic which gives credibility, but can sound flat and miss human connection - needs to add feeling and switch off lecture mode',
  'minimalist': 'doesn\'t say more than needed, gets to the point but holds back messy human details that would connect - needs to add one more layer and share more truth',
  'Minimalist': 'doesn\'t say more than needed, gets to the point but holds back messy human details that would connect - needs to add one more layer and share more truth'
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
  answers: Record<string, any>,
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

// Calculate sliding scale metrics (simplified version of frontend logic)
function calculateSlidingScales(answers: Record<string, any>): Record<string, number> {
  // Extract rating answers with defaults
  const q1 = Array.isArray(answers.q1) ? answers.q1 : [];
  const q2 = answers.q2;
  const q3 = typeof answers.q3 === 'number' ? answers.q3 : 5;
  const q4 = answers.q4;
  const q5 = typeof answers.q5 === 'number' ? answers.q5 : 5;
  const q6 = typeof answers.q6 === 'number' ? answers.q6 : 5;
  const q7 = typeof answers.q7 === 'number' ? answers.q7 : 5;
  const q8 = answers.q8;
  const q9 = Array.isArray(answers.q9) ? answers.q9 : [];

  // Enhanced archetype scoring for sliding scales
  const archetypeBoosts = {
    rambler: (q1.includes('rambler') ? 3 : 0) + (q9.includes('improv') ? 2 : 0) + (q9.includes('loose') ? 2 : 0),
    overthinker: (q1.includes('overthinker') ? 3 : 0) + (q9.includes('overprepare') ? 2 : 0),
    doubter: (q1.includes('doubter') ? 3 : 0) + (q9.includes('overprepare') ? 1 : 0),
    pleaser: (q1.includes('pleaser') ? 3 : 0) + (q9.includes('loose') ? 1 : 0) + (q9.includes('polish') ? 1 : 0),
    performer: (q1.includes('performer') ? 3 : 0) + (q9.includes('polish') ? 2 : 0),
    intense: (q1.includes('intense') ? 3 : 0) + (q9.includes('improv') ? 2 : 0),
    rationalist: (q1.includes('rationalist') ? 3 : 0) + (q9.includes('structure') ? 2 : 0) + (q9.includes('overprepare') ? 1 : 0) + (q9.includes('minimal') ? 1 : 0),
    minimalist: (q1.includes('minimalist') ? 3 : 0) + (q9.includes('minimal') ? 2 : 0) + (q9.includes('structure') ? 1 : 0)
  };

  const isLow = (val: number) => val <= 4;
  const isHigh = (val: number) => val >= 7;

  return {
    clearness: Math.min(100, Math.max(0, 
      (q6 * 8) + 
      (archetypeBoosts.rationalist + archetypeBoosts.minimalist) * 3 -
      archetypeBoosts.rambler * 2 +
      (isHigh(q6) ? 10 : 0)
    )),
    spontaneity: Math.min(100, Math.max(0,
      (q5 * 8) + 
      (archetypeBoosts.rambler + archetypeBoosts.intense) * 2.5 -
      (archetypeBoosts.overthinker + archetypeBoosts.doubter) * 3 +
      (q2 === 'dive_in' ? 15 : q2 === 'stall_time' ? -15 : q2 === 'apologize_first' ? -10 : 0)
    )),
    expressiveness: Math.min(100, Math.max(0,
      (q2 === 'dive_in' || q2 === 'speak_forcefully' ? 65 : q2 === 'perform_anyway' ? 60 : q2 === 'say_less' ? 25 : 40) +
      (archetypeBoosts.intense + archetypeBoosts.performer) * 3 -
      (archetypeBoosts.minimalist + archetypeBoosts.rationalist) * 2.5 +
      (q8 === 'made_impact' ? 10 : q8 === 'job_done' ? -10 : 0)
    )),
    authenticity: Math.min(100, Math.max(0,
      ((11 - q7) * 8) + 
      (archetypeBoosts.doubter + archetypeBoosts.minimalist + archetypeBoosts.overthinker) * 2.5 -
      archetypeBoosts.performer * 4 +
      (isLow(q7) ? 15 : isHigh(q7) ? -10 : 0)
    )),
    energy: Math.min(100, Math.max(0,
      (q3 * 9) + 
      (archetypeBoosts.intense + archetypeBoosts.performer + archetypeBoosts.rambler) * 2.5 -
      (archetypeBoosts.minimalist + archetypeBoosts.rationalist + archetypeBoosts.overthinker) * 2 +
      (q2 === 'speak_forcefully' || q2 === 'dive_in' ? 10 : q2 === 'stall_time' || q2 === 'say_less' ? -10 : 0)
    ))
  };
}

// Generate personalized speaking plan using OpenAI
// Speaker type summaries based on the provided documentation
const SPEAKER_SUMMARIES: Partial<Record<Archetype, {
  description: string;
  strengths: string[];
  whereItShowsUp: string[];
  whereToGrow: string[];
  finalThought: string;
}>> = {
  'Rambler': {
    description: `You've got energy to spare. When you talk, ideas tumble out fast and furious, and people can feel the spark. The trouble is, that spark sometimes sets everything on fire at once — words rush out, sentences spiral, and clarity gets lost in the noise.

At its heart, rambling isn't a flaw. It's usually a response to pressure — the silence feels heavy, so you fill it. You hope clarity will appear halfway through the sentence. And sometimes it does. Other times, your audience is left spinning or disengaged.`,
    strengths: [
      "You have momentum — you never get stuck for long.",
      "You're spontaneous — quick to grab ideas and run with them.",
      "You're courageous — you're not afraid to open your mouth even when you're unsure."
    ],
    whereItShowsUp: [
      "Work presentation: You've got loads of ideas, so you throw them all in at once. Colleagues are left nodding politely but not really sure what the main point was.",
      "Q&A session: Someone asks a tricky question, and instead of pausing, you launch into a stream of half-answers, hoping clarity will appear along the way - people start to zone out.",
      "Casual conversation: You get excited telling a story but keep looping back, adding side details, until the punchline gets buried."
    ],
    whereToGrow: [
      "Pause on purpose. Treat silence as a tool, not a failure. It makes your words hit harder.",
      "Pick one arrow. Before you speak, ask: what's the one thing I want them to take away? Aim for that and return to that.",
      "Wrap it up cleanly. End with a clear prompt — something like 'And that's what matters most.' No trailing off."
    ],
    finalThought: "Your energy is infectious, but people need clarity and space to follow you. When you learn to land your ideas as powerfully as you generate them, you stop being 'the one who talks a lot' — and start being the one everyone remembers."
  },
  'Overthinker': {
    description: `You've got plenty to say — but when the spotlight's on, you tend to freeze. Instead of speaking freely, you start running mental checks: Is this the right answer? Am I saying it perfectly? Before you know it, the moment has passed.

Overthinking doesn't mean you lack ideas. Quite the opposite. You've got depth and clarity when you relax. The problem is the inner critic — that little voice that treats every word like it's being marked in an exam.`,
    strengths: [
      "You're thoughtful — your answers carry weight when you let them out.",
      "You're authentic — people trust you when you drop the perfection filter.",
      "You're sharp — your ability to analyse and organise makes you credible and clear."
    ],
    whereItShowsUp: [
      "A Job interview: You pause too long before answering because you're trying to craft the 'perfect' reply. You never get into the flow so your answers are stilted and stiff.",
      "Team meeting: Someone asks your opinion. You've got a clear idea, but you hesitate, edit yourself, then finally share something watered down.",
      "Social gathering: You want to contribute to a lively chat, but by the time you've figured out how to phrase it, the conversation has already moved on."
    ],
    whereToGrow: [
      "Trust the first thought. Don't wait for the perfect answer — speak, then refine if needed. Not everything you say has to be super valuable.",
      "Let silence breathe. Pauses aren't proof you're stuck. They make you look thoughtful and confident.",
      "Feel it, don't just think it. Bring emotion into your words. People remember what you make them feel more than what you make them think."
    ],
    finalThought: "Your thoughtfulness is a strength, if used wisely. When you stop trying to get it 'right' and start letting it flow, people will see the real you — intelligent, flowing, and worth listening to."
  },
  'Self-Doubter': {
    description: `You know your stuff, but when it's time to speak, you tend to shrink back. Maybe you start with an implied or a real apology ("I might not explain this well…") or trail off before finishing strong. It's not that you don't have ideas — it's that fear of judgment makes you play small.

Self-doubt doesn't mean you're weak. It just means you care. You want to get it right, you want people to value what you say. But the more you worry about how you come across, and how others are reacting, the harder it is to fully commit and actually trust yourself.`,
    strengths: [
      "You're empathetic — tuned in to how others feel.",
      "You're authentic — people relate to your honesty and humility.",
      "You're resilient — the fear of slipping up makes you better at bouncing back."
    ],
    whereItShowsUp: [
      "Starting a presentation: You open with, 'I'm not sure if this makes sense…' which lowers the energy and sets expectations before you've even begun.",
      "Sharing an idea: You give a good point but trail off at the end, so you sound less confident than you really are.",
      "One-to-one chat: You downplay your opinion, worried it might sound silly, even though it's often the thing people need to hear."
    ],
    whereToGrow: [
      "Drop the apology and bring conviction. Swap 'Sorry if this doesn't make sense…' with 'Here's why this matters.'",
      "Commit to a strong end. End every point with conviction and hold the silence. Don't let the doubt show at the end.",
      "Speak from care, not fear. Instead of worrying about judgment, talk about why the subject matters to you. Be brave enough to be vulnerable and show yourself."
    ],
    finalThought: "Your voice is more powerful than you think. When you stop apologising for it and start owning it, people won't just hear your words — they'll feel your calm and confident conviction."
  },
  'People Pleaser': {
    description: `You care about people. You want them to like you, to feel they've got value from listening. That's a gift — but it can also trap you. Instead of saying what you really think, you slip into "expert mode" or soften your opinions to keep everyone comfortable.

On the surface, you look polished and professional. Underneath, it can feel a little hollow — like you're performing a role instead of expressing your actual feelings and thoughts.`,
    strengths: [
      "You're relatable — people lean in because you care.",
      "You've got conviction — when you speak honestly, it resonates.",
      "You're adaptable — you listen well and respond in the moment."
    ],
    whereItShowsUp: [
      "Client pitch: You present polished, well-rehearsed points, but avoid sharing what you really think about their flawed idea — just to keep them happy.",
      "Panel discussion: You stick to 'safe' answers and skip anything that might spark disagreement, even though stronger opinions would make you stand out.",
      "Everyday chat: A friend asks what you want to do, and you immediately answer, 'I don't mind — whatever you prefer,' even when you do have a preference."
    ],
    whereToGrow: [
      "Drop 'expert mode.' Imagine you're talking to a friend, not delivering a lecture.",
      "Ask yourself why. Keep digging: why does this really matter to me? Speak from there.",
      "Risk the truth. Don't just say what people want to hear. Say what you actually believe — even if it feels riskier."
    ],
    finalThought: "People have a sixth sense for inauthenticity. So stop trying to please everyone and start thinking more about pleasing yourself. When you stop trying to please everyone and start speaking from your real convictions, you'll unlock a superpower. Some people won't like it - and that's completely ok."
  },
  'Performer': {
    description: `You know how to put on a show. Strong delivery, polished presence, maybe even a few tricks and hacks up your sleeve. The trouble is, all that polish can sometimes get in the way. Instead of connection, people feel the performance. It looks good, but it doesn't always feel real.

Performers often treat speaking like a test — something to ace with flawless execution. That works up to a point, but it misses what people actually want: to feel like they're talking to a real human who they can relate to.`,
    strengths: [
      "You've got range — you already know how to use voice and body.",
      "You've got presence — people notice when you walk into a room.",
      "You've got work ethic — preparation is second nature."
    ],
    whereItShowsUp: [
      "Conference talk: You deliver with polish — big gestures, perfect pacing — but the audience feels like they're watching a show, not meeting the real you.",
      "Networking event: You tell the same rehearsed joke or story, but it comes out a little mechanical instead of natural.",
      "Team meeting: You're great when prepared, but if someone throws you a curveball, you stumble because you're relying on your script or rigid routine."
    ],
    whereToGrow: [
      "Flip the switch. Exaggerate 'stage mode,' then relax into how you'd tell the same thing to a friend.",
      "Bring the feeling. Instead of focusing on technique, ask: what do I actually feel about this? Speak from there.",
      "Stay in character. If you slip up, keep going. Don't apologise — own the moment."
    ],
    finalThought: "Your polish is impressive, but your presence is what people remember. When you drop the act and let yourself be real, you stop being just 'good on stage' - and start connecting and communicating authentically. A truly powerful combo."
  },
  'Intense Speaker': {
    description: `When you speak, people feel it. There's power in your voice, conviction in your delivery, and no one's left wondering where you stand. But sometimes that intensity comes on so strong it can be overwhelming. Everything feels high-stakes, all the time — leaving little space for lightness, contrast, or play.

At its root, intensity often comes from fear of losing control. If you ease up, will people still take you seriously? The truth: yes. In fact, they'll connect more deeply when you show range and are able to be human.`,
    strengths: [
      "You've got conviction — people know you mean what you say.",
      "You've got momentum — your energy carries you into flow quickly.",
      "You've got creativity — your force shakes up stale thinking."
    ],
    whereItShowsUp: [
      "Boardroom presentation: You go full throttle from the start — serious tone, rapid delivery — leaving no breathing room for the audience.",
      "Debate or discussion: Even on light topics, you come across as forceful, which can make others back down rather than engage.",
      "Casual chat: Someone cracks a joke, but you respond with heavy seriousness, missing the chance to show your lighter side."
    ],
    whereToGrow: [
      "Play with contrast. Try saying something at full volume and energy, then again in a quiet, calm tone. Notice how both land.",
      "Pause on purpose. A few seconds of silence can be more powerful than charging ahead.",
      "Add lightness. Not everything has to be serious. A moment of humour or curiosity makes your intensity even sharper when you bring it back. Experiment with being playful."
    ],
    finalThought: "Your passion is undeniable. But passion with contrast — highs and lows — is what keeps people hooked. When you balance your fire with calm, you don't lose power. You gain contrast and impact."
  },
  'Rationalist': {
    description: `You like things to make sense. Clear structure, solid logic, everything in order. That gives you credibility — people trust that you've done your thinking. But it can also make you sound a little flat. Too many summaries, too much abstraction, and not enough of you.

Rationalists often believe that showing emotion risks losing authority. So you keep things safe, factual, tidy. The result: people nod along, but they don't always feel it. And with that you miss the chance to make changes happen.`,
    strengths: [
      "You're clear — people understand complex ideas when you explain them.",
      "You're credible — accuracy makes you trustworthy.",
      "You've got conviction — when you care, your clarity of thought becomes persuasive."
    ],
    whereItShowsUp: [
      "Work update: You summarise everything neatly, but colleagues feel disconnected because you left out the human story behind it.",
      "Conference Q&A: You give a technically correct, detailed answer that's hard to follow — people get lost in the detail instead of the message.",
      "Everyday story: A friend asks about your holiday. You list facts — 'We went to three cities, saw these sights' — but skip the funny or emotional moments and little details that would bring it to life."
    ],
    whereToGrow: [
      "Tell it like it happened. Share stories in the present tense with detail and feeling, not just the summary.",
      "Add musicality. Play with tone — calm, joyful, frustrated — instead of staying monotone.",
      "Switch off 'lecture mode.' Imagine you're exploring an idea with a peer, not delivering a report."
    ],
    finalThought: "Your clarity makes you reliable and trustworthy. But clarity with emotion can make you compelling and more impactful. When you let people feel your ideas as well as understand them, you move from being listened to — to being able to influence and persuade others."
  },
  'Minimalist': {
    description: `You probably already know this about yourself: you don't say more than you need to. You get to the point, keep it short, maybe even cut things off before they're fully formed. On the surface, that can look calm and collected — but if you're honest, it often comes from holding back.

Minimalists keep their cards close to their chests. Instead of sharing the messy, human details — the real story, the real feeling, the vulnerabilities — you summarise at a safe distance. It's not that you don't have things to say. It's that saying less feels safer than saying too much.`,
    strengths: [
      "You naturally bring focus. People listen when you speak because you're not wasting words. Everything you say has gone through a (usually far too strict) value filter.",
      "You hold composure under pressure — you don't panic, you don't overshare. That's rare. You deliver more value in ten words than others do in ten minutes.",
      "And when you do add emotion or detail, it lands harder, because people aren't expecting it."
    ],
    whereItShowsUp: [
      "Team discussion: You make one short comment and stop, even though you had more to say. The group moves on, missing your insight. Or you wait your turn, which never comes.",
      "Presentation close: You make your point then finish with a half-sentence or trail off, so the ending feels flat instead of strong.",
      "Casual storytelling: A friend asks how your weekend was. You answer, 'Yeah, it was good thanks, how was yours,' when you actually have some stories or moments you could share."
    ],
    whereToGrow: [
      "Add one more layer. When you tell a story, don't stop at the headline. Add the detail that feels a little too personal, or the feeling you'd normally skip.",
      "Trust the first idea. You don't need to perfect or edit in your head before speaking. Try blurting it out and having fun finding the meaning or fleshing out the idea.",
      "Finish with strength. Instead of trailing off, choose a clear closing line and let the silence do the work. People remember how you end."
    ],
    finalThought: "Minimalists often worry about saying too much, which if we're honest, is simply not a danger for you. That gives you the freedom to push it and say more. When you open up and let people see what's underneath, let people see more of you, and you'll get so much more back in return."
  }
};

function generateCoachResponse(curiosityAnswer: string, archetype: Archetype): string {
  if (!curiosityAnswer || curiosityAnswer.trim() === '') {
    return '';
  }

  // Normalize archetype for lookup
  const normalizedArchetype = archetype.charAt(0).toUpperCase() + archetype.slice(1).toLowerCase();
  const archetypeMap: Record<string, string> = {
    'doubter': 'Self-Doubter',
    'pleaser': 'People Pleaser',
    'intense': 'Intense Speaker'
  };
  const lookupKey = archetypeMap[archetype.toLowerCase()] || normalizedArchetype;

  // Base coaching response framework that will be personalized per archetype
  const responses: Record<string, string> = {
    'Rambler': `That's such a thoughtful question: "${curiosityAnswer}" - and it shows you're already thinking deeply about speaking, which is great. Here's what I've learned from working with many speakers like you: often what we wonder about most is actually pointing us toward our biggest growth area. For Ramblers, this curiosity usually stems from wanting to harness all that energy and spontaneity more effectively. The answer often lies in learning to channel your natural momentum rather than fighting it.`,
    
    'Overthinker': `I love that you're wondering about "${curiosityAnswer}" - that kind of thoughtful curiosity is exactly what makes you such a valuable speaker when you let yourself relax into it. What I've noticed with Overthinkers is that your questions often reveal how much you actually understand about speaking - you're not lacking knowledge, you're just being hard on yourself. The thing you're wondering about? You probably already have more insight into it than you realize.`,
    
    'Self-Doubter': `Thank you for sharing "${curiosityAnswer}" - that takes courage, and courage is exactly what great speaking is built on. Here's something I want you to know: the fact that you're wondering about this shows you care deeply about connecting with people, which is your superpower. Self-Doubters often ask the most important questions because you're tuned into what really matters to your audience. Trust that curiosity - it's leading you in the right direction.`,
    
    'People Pleaser': `That's a really insightful question: "${curiosityAnswer}" - and I can hear how much you care about doing right by your audience. What I've learned from coaching many People Pleasers is that your curiosity often reveals where you're trying to be perfect instead of just being real. The answer to what you're wondering about usually involves giving yourself permission to be more authentically you, even if it feels riskier.`,
    
    'Performer': `I'm intrigued by your question: "${curiosityAnswer}" - it shows you're thinking beyond just technique, which is exactly where the best speakers go. For Performers, curiosity like this often points toward the difference between delivering a message and truly connecting with people. What you're wondering about probably has less to do with adding more skills to your toolkit and more to do with letting your real self show up.`,
    
    'Intense Speaker': `That's a powerful question: "${curiosityAnswer}" - and I can feel the genuine curiosity behind it. Here's what I've observed with Intense Speakers: your questions often reveal a desire to connect even more deeply with people. The intensity that makes you so compelling can sometimes make you wonder if you're overwhelming your audience. What you're curious about is probably pointing you toward finding that sweet spot between passion and accessibility.`,
    
    'Rationalist': `That's a very thoughtful question: "${curiosityAnswer}" - and it shows the analytical mind that makes you such a credible speaker. What I've noticed with Rationalists is that your curiosity often centers around the human elements of speaking - the parts that can't be easily systematized. The answer to what you're wondering about usually involves trusting that your logical foundation gives you the safety to be more emotionally expressive.`,
    
    'Minimalist': `I appreciate you sharing "${curiosityAnswer}" - and I love that you took the space to elaborate on what you're curious about. For Minimalists, questions like this often reveal that you have so much more to say than you typically let yourself express. What you're wondering about is probably pointing toward an area where you could trust yourself to say more, to go deeper, to let people see more of what's really going on in that thoughtful mind of yours.`
  };

  return responses[lookupKey] || `That's a fascinating question: "${curiosityAnswer}" - your curiosity shows how thoughtfully you approach speaking, which is already a huge strength.`;
}

function generateStruggleResponse(struggleAnswer: string, archetype: Archetype): string {
  if (!struggleAnswer || struggleAnswer.trim() === '') {
    return '';
  }

  // Normalize archetype for lookup
  const normalizedArchetype = archetype.charAt(0).toUpperCase() + archetype.slice(1).toLowerCase();
  const archetypeMap: Record<string, string> = {
    'doubter': 'Self-Doubter',
    'pleaser': 'People Pleaser',
    'intense': 'Intense Speaker'
  };
  const lookupKey = archetypeMap[archetype.toLowerCase()] || normalizedArchetype;

  // Coaching responses for struggles, tailored by archetype
  const responses: Record<string, string> = {
    'Rambler': `I hear you when you say you struggle with "${struggleAnswer}" - this is so common for Ramblers, and the good news is it's completely workable. Your challenge likely stems from having so many ideas that they all want to come out at once. The key is learning to be selective with your momentum. Before you speak, try this: pick one main point you want to land, then use your natural energy to drive that home. Everything else can be supporting detail. Your spontaneity is a strength - we just need to give it some direction.`,
    
    'Overthinker': `Thank you for sharing that you struggle with "${struggleAnswer}" - what you're describing is the classic Overthinker pattern, and you're definitely not alone in this. The irony is that your thoughtfulness, which creates this struggle, is also what makes you so valuable when you do speak. Try this reframe: instead of waiting for the perfect thought, start with "I'm thinking..." or "What comes to mind is..." This gives you permission to think out loud rather than having it all figured out first. Your audience wants to see your thinking process - it's actually more engaging than polished perfection.`,
    
    'Self-Doubter': `I really appreciate you being honest about struggling with "${struggleAnswer}" - that vulnerability is actually one of your superpowers as a Self-Doubter. What you're describing often comes from caring so much about doing right by others that you second-guess yourself. Here's what I want you to remember: your instincts are better than you think. Try this experiment - next time you catch yourself doubting, ask "What would I say if I was talking to my best friend about this?" That voice you use with people you trust? That's your real voice, and it's exactly what people want to hear.`,
    
    'People Pleaser': `I can really relate to your struggle with "${struggleAnswer}" - it's the People Pleaser's dilemma of wanting to serve everyone while losing track of your own authentic voice. The thing is, when you try to please everyone, you often end up connecting with no one. Here's a different approach: before you speak, ask yourself "What do I actually believe about this?" rather than "What do they want to hear?" Your real opinions, even if they're a bit edgy, are far more interesting and valuable than perfectly safe answers. People can sense authenticity, and they're drawn to it.`,
    
    'Performer': `Your struggle with "${struggleAnswer}" makes total sense for a Performer - you've likely gotten so good at the technical side that you've lost touch with the human connection. The beautiful thing is that all your performance skills are still assets; we just need to put them in service of your real message rather than the show. Try this: before your next speaking opportunity, spend less time rehearsing your delivery and more time connecting with why this message matters to you personally. When you speak from that place, your performance skills become tools for authenticity rather than barriers to it.`,
    
    'Intense Speaker': `I completely understand your struggle with "${struggleAnswer}" - Intense Speakers often feel like they have two settings: full-throttle or nothing. But here's what I've learned: your intensity is actually your superpower when you learn to modulate it. Think of it like music - the powerful moments only land because there are quieter moments too. Try this: in your next conversation, intentionally include some pauses, some softer moments, maybe even some curiosity or playfulness. You're not dimming your fire - you're giving it contrast so it burns even brighter when you need it to.`,
    
    'Rationalist': `Your struggle with "${struggleAnswer}" is so common among Rationalists - you've mastered the logical side but feel like something's missing in the human connection. The truth is, people need both your clarity AND your humanity. Here's the thing: showing emotion or personal connection doesn't undermine your credibility - it actually enhances it because people trust speakers who are both smart and relatable. Try this: next time you present facts or data, include one sentence about why it matters to you personally or how it makes you feel. That small addition can transform the entire experience for your audience.`,
    
    'Minimalist': `Thank you for sharing your struggle with "${struggleAnswer}" - what you're describing is the Minimalist's classic tension between safety and connection. Your instinct to keep things brief is actually a strength, but it becomes a limitation when it stops you from sharing the human details that help people connect with you. Here's an experiment: next time you tell a story or share an idea, add just one more layer - one detail, one feeling, one moment of vulnerability. You're not becoming a rambler; you're just letting people see a bit more of what's behind that thoughtful, focused exterior.`
  };

  return responses[lookupKey] || `I hear you struggling with "${struggleAnswer}" - this is exactly the kind of challenge that, once addressed, can unlock significant growth in your speaking. Let's work on some specific strategies for this.`;
}

async function generateSpeakingPlan(archetype: Archetype, answers: Record<string, any>, optionalAnswers?: Record<string, string | string[]>): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback to static content if OpenAI is not available
    return generateStaticSpeakingPlan(archetype, answers, optionalAnswers);
  }

  // Normalize archetype to capitalized version for lookup
  const normalizedArchetype = archetype.charAt(0).toUpperCase() + archetype.slice(1).toLowerCase();
  // Handle special cases
  const archetypeMap: Record<string, string> = {
    'doubter': 'Self-Doubter',
    'pleaser': 'People Pleaser',
    'intense': 'Intense Speaker'
  };
  const lookupKey = archetypeMap[archetype.toLowerCase()] || normalizedArchetype;
  
  const summary = SPEAKER_SUMMARIES[lookupKey as keyof typeof SPEAKER_SUMMARIES];
  const slidingScales = calculateSlidingScales(answers);
  
  // Get the specific questions for personalized coaching
  const curiosityAnswer = optionalAnswers?.curiosity as string || '';
  const struggleAnswer = optionalAnswers?.struggle as string || '';
  
  const prompt = `You are Alistair Webster, a speaking coach writing a personalized growth plan. Write in Alistair's conversational, authentic style - like you're talking to an intelligent friend.

WRITING STYLE:
- Use simple words, short varied sentences, natural flow
- Include personal anecdotes, metaphors, or vivid examples  
- Make advice actionable and memorable with clear takeaways
- Add very subtle dry humor - just a touch of wit that feels natural, not forced
- Avoid AI clichés, hype, or trying to sound smart
- Be direct, honest, and human
- End with a clear wrap-up or takeaway

The user is a "${archetype}" - someone who is ${ARCHETYPE_CONTEXTS[archetype]}.

THEIR SPEAKING PROFILE:
- Clearness: ${Math.round(slidingScales.clearness)}/100 (${slidingScales.clearness > 50 ? 'more clear' : 'tends toward confusing'})
- Spontaneity: ${Math.round(slidingScales.spontaneity)}/100 (${slidingScales.spontaneity > 50 ? 'more spontaneous' : 'more cautious'}) 
- Expressiveness: ${Math.round(slidingScales.expressiveness)}/100 (${slidingScales.expressiveness > 50 ? 'more expressive' : 'more reserved'})
- Authenticity: ${Math.round(slidingScales.authenticity)}/100 (${slidingScales.authenticity > 50 ? 'more authentic' : 'more performance-oriented'})
- Energy: ${Math.round(slidingScales.energy)}/100 (${slidingScales.energy > 50 ? 'higher energy' : 'more calm'})

CORE CONTENT TO WORK WITH:
**Description:** ${summary?.description || 'A speaker working on their communication skills'}
**Strengths:** ${summary?.strengths?.map(strength => `- ${strength}`).join('\n') || '- Eager to improve communication skills'}
**Where It Shows Up:** ${summary?.whereItShowsUp?.map(example => `- ${example}`).join('\n') || '- Various speaking situations'}
**Growth Areas:** ${summary?.whereToGrow?.map(tip => `- ${tip}`).join('\n') || '- Continue developing speaking confidence'}
**Final Thought:** ${summary?.finalThought || 'Every speaker has room to grow and improve'}

${optionalAnswers && Object.keys(optionalAnswers).length > 0 ? `
WHAT THEY SHARED:
${Object.entries(optionalAnswers)
  .filter(([_, answer]) => {
    if (Array.isArray(answer)) return answer.length > 0;
    return answer && typeof answer === 'string' && answer.trim();
  })
  .map(([key, answer]) => {
    const questionMap: Record<string, string> = {
      'situations': 'Focus areas',
      'struggle': 'Main challenge', 
      'authentic': 'When they feel most themselves',
      'world_class': 'Their vision of world-class speaking',
      'confidence_moment': 'Key confidence goal',
      'life_change': 'Desired impact',
      'curiosity': 'Something they wonder about'
    };
    const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
    return `- ${questionMap[key] || key}: ${formattedAnswer}`;
  })
  .join('\n')}
` : ''}

TASK:
Write a growth plan that feels like a conversation with Alistair. Use the core content as your foundation, but make it personal based on their scores and what they shared. Include specific advice for their challenges and questions.

Structure it simply:
# Your Speaker Growth Plan

## What I noticed about you
[Use the description but make it conversational and reference their specific scores/context]

## Your natural strengths  
[Use the strengths but add personal insights]

## Where this probably shows up
[Use the examples but make them relatable and specific to their context]

## What to work on
[Use the growth tips but make them actionable and memorable]

${struggleAnswer ? `## Let's talk about your main challenge
[Address their specific struggle: "${struggleAnswer}" - give real, actionable advice]

` : ''}${curiosityAnswer ? `## About that question you asked
[Respond to their curiosity: "${curiosityAnswer}" - be thoughtful and helpful]

` : ''}## Three things to try this week
[Give 3 specific, doable actions based on everything above]

## Bottom line
[Use the final thought but make it personal and memorable]

Write like you're having a real conversation - no corporate speak, no filler. Just honest, helpful advice that sticks. Only add humor if it comes naturally - don't force it.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert speaking coach who creates personalized, actionable growth plans by combining structured archetype content with personalized insights.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || generateStaticSpeakingPlan(archetype, answers, optionalAnswers);
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to static content if OpenAI fails
    return generateStaticSpeakingPlan(archetype, answers, optionalAnswers);
  }
}

function generateStaticSpeakingPlan(archetype: Archetype, answers: Record<string, any>, optionalAnswers?: Record<string, string | string[]>): string {
  // Normalize archetype to capitalized version for lookup
  const normalizedArchetype = archetype.charAt(0).toUpperCase() + archetype.slice(1).toLowerCase();
  // Handle special cases
  const archetypeMap: Record<string, string> = {
    'doubter': 'Self-Doubter',
    'pleaser': 'People Pleaser',
    'intense': 'Intense Speaker'
  };
  const lookupKey = archetypeMap[archetype.toLowerCase()] || normalizedArchetype;
  
  const summary = SPEAKER_SUMMARIES[lookupKey as keyof typeof SPEAKER_SUMMARIES];
  
  // Get the specific questions for personalized coaching
  const curiosityAnswer = optionalAnswers?.curiosity as string || '';
  const struggleAnswer = optionalAnswers?.struggle as string || '';
  const coachResponse = generateCoachResponse(curiosityAnswer, archetype);
  const struggleResponse = generateStruggleResponse(struggleAnswer, archetype);

  let plan = `# Your Speaker Growth Plan - ${archetype}

## Who You Are as a Speaker

${summary?.description || 'A dedicated speaker working on improving their communication skills'}

## Your Unique Strengths

${summary?.strengths?.map(strength => `• ${strength}`).join('\n') || '• Committed to improving speaking skills'}

## Where It Might Show Up

${summary?.whereItShowsUp?.map(example => `**${example.split(':')[0]}:** ${example.split(':')[1]}`).join('\n\n') || 'In various speaking situations where growth opportunities arise'}

## Where to Grow

The real shift for ${archetype}s is moving from ${archetype === 'Rambler' ? 'rushed and scattered to clear, concise and confident' : 
archetype === 'Overthinker' ? 'controlled and self-conscious to free and connected' :
archetype === 'Self-Doubter' ? 'holding back to putting it out there for yourself' :
archetype === 'People Pleaser' ? 'performing for approval to speaking with authenticity' :
archetype === 'Performer' ? 'performance mode to authentic presence' :
archetype === 'Intense Speaker' ? 'always full-throttle to intentional range' :
archetype === 'Rationalist' ? 'purely logical to logical and human' :
'contained to expressive'}.

Here are three things that help:

${summary?.whereToGrow?.map(tip => `• ${tip}`).join('\n\n') || '• Continue developing confidence and clarity in communication'}

${struggleResponse ? `## Addressing Your Speaking Challenge\n\n${struggleResponse}\n\n` : ''}${coachResponse ? `## A Coach's Response to Your Question\n\n${coachResponse}\n\n` : ''}

## Final Thought

${summary?.finalThought || 'Every speaker has potential to grow and connect more powerfully with their audience'}`;

  // Add personalized context if available
  if (optionalAnswers && Object.keys(optionalAnswers).length > 0) {
    const personalContext = Object.entries(optionalAnswers)
      .filter(([key, answer]) => {
        if (key === 'curiosity') return false; // Already handled above
        if (Array.isArray(answer)) return answer.length > 0;
        return answer && typeof answer === 'string' && answer.trim();
      })
      .map(([key, answer]) => {
        const questionMap: Record<string, string> = {
          'situations': 'Situations you want to improve in',
          'struggle': 'What you struggle most with',
          'authentic': 'When you feel most like yourself speaking',
          'world_class': 'How you\'d know if you were world-class',
          'confidence_moment': 'Moment you\'d love to feel more confident in',
          'life_change': 'How being a stronger speaker would change things'
        };
        const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
        return `**${questionMap[key] || key}:** ${formattedAnswer}`;
      });

    if (personalContext.length > 0) {
      plan += `\n\n## Your Personal Context\n\n${personalContext.join('\n\n')}`;
    }
  }

  return plan;
}

// Get MailerLite group IDs based on speaker archetype
function getMailerLiteGroups(archetype: Archetype): string[] {
  // MailerLite Group IDs mapping - handle both formats
  const groupIds: Record<string, string[]> = {
    'Rambler': ['164508817941333197'],
    'rambler': ['164508817941333197'],
    'Overthinker': ['164508824256907051'], 
    'overthinker': ['164508824256907051'], 
    'Self-Doubter': ['164508829277488166'],
    'doubter': ['164508829277488166'],
    'People Pleaser': ['164508833936311822'],
    'pleaser': ['164508833936311822'],
    'Performer': ['164508838844695656'],
    'performer': ['164508838844695656'],
    'Intense Speaker': ['164508843953358407'],
    'intense': ['164508843953358407'],
    'Rationalist': ['164508850141005543'],
    'rationalist': ['164508850141005543'],
    'Minimalist': ['164508850141005544'],
    'minimalist': ['164508850141005544']
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
    console.log('Email to send:', `Subject: Your Speaker Growth Plan - ${archetype}\n\n${plan}`);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alistair Webster <hello@speakupforgood.com>',
      to: [email],
      subject: `Your Speaker Growth Plan - ${archetype}`,
      html: `
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
                    .replace(/^## (.*$)/gm, '<h3 style="color: #4a5568; margin: 12px 0 8px 0; font-size: 16px; font-weight: 600;">$1</h3>')
                    .replace(/^- (.*$)/gm, '<div style="margin: 5px 0; padding-left: 15px;">• $1</div>')
                    .replace(/^\d+\. (.*$)/gm, '<div style="margin: 5px 0; padding-left: 15px;">$1</div>')
                    .replace(/\n\n/g, '<br>')
                    .replace(/\n/g, '<br>')}
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
    // Get client IP address for rate limiting and analytics
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1';

    // Rate limiting check
    const now = Date.now();
    const userRequests = rateLimit.get(clientIP) || [];
    
    // Clean old requests outside the time window
    const recentRequests = userRequests.filter((time: number) => now - time < RATE_WINDOW);
    
    if (recentRequests.length >= RATE_LIMIT) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }
    
    // Add current request to rate limit
    recentRequests.push(now);
    rateLimit.set(clientIP, recentRequests);

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

    // Validate input size to prevent abuse
    const optionalAnswersStr = JSON.stringify(optionalAnswers || {});
    if (optionalAnswersStr.length > 5000) {
      return NextResponse.json(
        { error: 'Input too large. Please keep your answers concise.' },
        { status: 400 }
      );
    }

    // Validate answers object size
    const answersStr = JSON.stringify(answers);
    if (answersStr.length > 10000) {
      return NextResponse.json(
        { error: 'Quiz data too large. Please try again.' },
        { status: 400 }
      );
    }

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
