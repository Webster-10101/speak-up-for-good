'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function QuizResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get data from URL params
  const archetype = searchParams.get('archetype');
  const mainAnswers = searchParams.get('answers');
  const optionalAnswers = searchParams.get('optionalAnswers');

  useEffect(() => {
    // Redirect if missing required data
    if (!archetype || !mainAnswers) {
      console.log('Missing data, redirecting to quiz:', { archetype, mainAnswers });
      router.push('/speaker-quiz');
    } else {
      console.log('Results page loaded with data:', { archetype, mainAnswers, optionalAnswers });
    }
  }, [archetype, mainAnswers, optionalAnswers, router]);

  async function handleGetPlan() {
    if (!archetype || !email || !firstName) return;

    setLoading(true);
    try {
      const response = await fetch('/api/speaker-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          email,
          firstName,
          answers: mainAnswers ? JSON.parse(mainAnswers) : {},
          optionalAnswers: optionalAnswers ? JSON.parse(optionalAnswers) : {}
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Check your email for your personalised Speaker Growth Plan!');
      } else {
        console.error('Failed to submit answers');
        alert('There was an error submitting your answers. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('There was an error submitting your answers. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && firstName && !loading) {
      handleGetPlan();
    }
  };

  // Calculate sliding scale metrics from answers using the same logic as the quiz page
  function calculateSlidingScales(answers: Record<string, any>): Record<string, number> {
    // Extract answers - handle both new format (arrays/numbers) and legacy format
    const q1 = Array.isArray(answers.q1) ? answers.q1 : [];
    const q2 = answers.q2;
    const q3 = typeof answers.q3 === 'number' ? answers.q3 : 5;
    const q4 = typeof answers.q4 === 'number' ? answers.q4 : 5;
    const q5 = typeof answers.q5 === 'number' ? answers.q5 : 5;
    const q6 = typeof answers.q6 === 'number' ? answers.q6 : 5;
    const q7 = typeof answers.q7 === 'number' ? answers.q7 : 5;
    const q8 = typeof answers.q8 === 'number' ? answers.q8 : 5;
    const q9 = Array.isArray(answers.q9) ? answers.q9 : [];

    // Helper functions
    const isLow = (val: number) => val <= 4;
    const isHigh = (val: number) => val >= 7;

    // Calculate archetype scores using the same logic as the quiz page
    const scores: Record<string, number> = {
      rambler: 0,
      overthinker: 0,
      doubter: 0,
      pleaser: 0,
      performer: 0,
      intense: 0,
      rationalist: 0,
      minimalist: 0,
    };

    // Base flags from Q1
    for (const selection of q1) {
      if (typeof selection === 'string' && selection in scores) {
        scores[selection] += 3;
      }
    }

    // Q9 preparation style scoring
    for (const prep of q9) {
      if (prep === 'overprepare') {
        scores.overthinker += 2;
        scores.doubter += 1;
        scores.rationalist += 1;
      } else if (prep === 'structure') {
        scores.rationalist += 2;
        scores.minimalist += 1;
      } else if (prep === 'improv') {
        scores.rambler += 2;
        scores.intense += 2;
      } else if (prep === 'loose') {
        scores.rambler += 2;
        scores.pleaser += 1;
      } else if (prep === 'polish') {
        scores.performer += 2;
        scores.pleaser += 1;
      } else if (prep === 'minimal') {
        scores.minimalist += 2;
        scores.rationalist += 1;
      }
    }

    // Q2 speaking behavior scoring
    if (q2 === 'dive_in') {
      scores.rambler += 2;
      scores.intense += 1;
    } else if (q2 === 'stall_time') {
      scores.overthinker += 2;
      scores.doubter += 1;
    } else if (q2 === 'apologize_first') {
      scores.doubter += 2;
      scores.pleaser += 1;
    } else if (q2 === 'perform_anyway') {
      scores.performer += 2;
      scores.pleaser += 1;
    } else if (q2 === 'speak_forcefully') {
      scores.intense += 2;
      scores.performer += 1;
    } else if (q2 === 'say_less') {
      scores.minimalist += 2;
      scores.rationalist += 1;
    }

    const totalArchetypeScore = Math.max(1, Object.values(scores).reduce((sum, score) => sum + score, 0));

    return {
      // Clear ↔ Confusing: High clarity from Q6, boosted by Rationalist/Minimalist tendencies
      clearness: Math.min(100, Math.max(0, 
        (q6 * 8) + 
        ((scores.rationalist + scores.minimalist) / totalArchetypeScore * 25) -
        (scores.rambler / totalArchetypeScore * 15) +
        (isHigh(q6) ? 10 : 0) // Extra boost for high clarity
      )),
      
      // Spontaneous ↔ Cautious: Based on Q5 word-finding + archetype tendencies
      spontaneity: Math.min(100, Math.max(0,
        (q5 * 8) + 
        ((scores.rambler + scores.intense) / totalArchetypeScore * 20) -
        ((scores.overthinker + scores.doubter) / totalArchetypeScore * 25) +
        (q2 === 'dive_in' ? 15 : q2 === 'stall_time' ? -15 : q2 === 'apologize_first' ? -10 : 0)
      )),
      
      // Expressive ↔ Reserved: Speaking behavior + archetype energy
      expressiveness: Math.min(100, Math.max(0,
        (q2 === 'dive_in' || q2 === 'speak_forcefully' ? 65 : q2 === 'perform_anyway' ? 60 : q2 === 'say_less' ? 25 : 40) +
        ((scores.intense + scores.performer) / totalArchetypeScore * 25) -
        ((scores.minimalist + scores.rationalist) / totalArchetypeScore * 20) +
        (answers.q8 === 'made_impact' ? 10 : answers.q8 === 'job_done' ? -10 : 0)
      )),
      
      // Authentic ↔ Performance: Inverted Q7 + archetype authenticity patterns
      authenticity: Math.min(100, Math.max(0,
        ((11 - q7) * 8) + 
        ((scores.doubter + scores.minimalist + scores.overthinker) / totalArchetypeScore * 20) -
        (scores.performer / totalArchetypeScore * 30) +
        (isLow(q7) ? 15 : isHigh(q7) ? -10 : 0) // Extra penalty/bonus for extreme scores
      )),
      
      // Energy ↔ Calm: Confidence + archetype energy patterns + speaking behavior
      energy: Math.min(100, Math.max(0,
        (q3 * 9) + 
        ((scores.intense + scores.performer + scores.rambler) / totalArchetypeScore * 20) -
        ((scores.minimalist + scores.rationalist + scores.overthinker) / totalArchetypeScore * 15) +
        (q2 === 'speak_forcefully' || q2 === 'dive_in' ? 10 : q2 === 'stall_time' || q2 === 'say_less' ? -10 : 0)
      ))
    };
  }

  // Archetype descriptions - supporting both old and new formats
  const archetypeDescriptions: Record<string, { 
    title: string; 
    description: string; 
    introText: string;
    strengths: string[]; 
    growthAreas: string[];
    whereItShowsUp: string[];
    finalThought: string;
  }> = {
    // New lowercase format
    'rambler': {
      title: 'The Rambler',
      description: 'You\'ve got energy to spare. When you talk, ideas tumble out fast and furious, and people can feel the spark. The trouble is, that spark sometimes sets everything on fire at once — words rush out, sentences spiral, and clarity gets lost in the noise.',
      introText: 'At its heart, rambling isn\'t a flaw. It\'s usually a response to pressure — the silence feels heavy, so you fill it. You hope clarity will appear halfway through the sentence. And sometimes it does. Other times, your audience is left spinning or disengaged.',
      strengths: [
        'You have momentum — you never get stuck for long.',
        'You\'re spontaneous — quick to grab ideas and run with them.',
        'You\'re courageous — you\'re not afraid to open your mouth even when you\'re unsure.'
      ],
      growthAreas: [
        'Pause on purpose. Treat silence as a tool, not a failure. It makes your words hit harder.',
        'Pick one arrow. Before you speak, ask: what\'s the one thing I want them to take away? Aim for that and return to that.',
        'Wrap it up cleanly. End with a clear prompt — something like "And that\'s what matters most." No trailing off.'
      ],
      whereItShowsUp: [
        'Work presentation: You\'ve got loads of ideas, so you throw them all in at once. Colleagues are left nodding politely but not really sure what the main point was.',
        'Q&A session: Someone asks a tricky question, and instead of pausing, you launch into a stream of half-answers, hoping clarity will appear along the way - people start to zone out.',
        'Casual conversation: You get excited telling a story but keep looping back, adding side details, until the punchline gets buried.'
      ],
      finalThought: 'Your energy is infectious, but people need clarity and space to follow you. When you learn to land your ideas as powerfully as you generate them, you stop being "the one who talks a lot" — and start being the one everyone remembers.'
    },
    'overthinker': {
      title: 'The Overthinker',
      description: 'You\'ve got plenty to say — but when the spotlight\'s on, you tend to freeze. Instead of speaking freely, you start running mental checks: Is this the right answer? Am I saying it perfectly? Before you know it, the moment has passed.',
      introText: 'Overthinking doesn\'t mean you lack ideas. Quite the opposite. You\'ve got depth and clarity when you relax. The problem is the inner critic — that little voice that treats every word like it\'s being marked in an exam.',
      strengths: [
        'You\'re thoughtful — your answers carry weight when you let them out.',
        'You\'re authentic — people trust you when you drop the perfection filter.',
        'You\'re sharp — your ability to analyse and organise makes you credible and clear.'
      ],
      growthAreas: [
        'Trust the first thought. Don\'t wait for the perfect answer — speak, then refine if needed. Not everything you say has to be super valuable.',
        'Let silence breathe. Pauses aren\'t proof you\'re stuck. They make you look thoughtful and confident.',
        'Feel it, don\'t just think it. Bring emotion into your words. People remember what you make them feel more than what you make them think.'
      ],
      whereItShowsUp: [
        'A Job interview: You pause too long before answering because you\'re trying to craft the "perfect" reply. You never get into the flow so your answers are stilted and stiff.',
        'Team meeting: Someone asks your opinion. You\'ve got a clear idea, but you hesitate, edit yourself, then finally share something watered down.',
        'Social gathering: You want to contribute to a lively chat, but by the time you\'ve figured out how to phrase it, the conversation has already moved on.'
      ],
      finalThought: 'Your thoughtfulness is a strength, if used wisely. When you stop trying to get it "right" and start letting it flow, people will see the real you — intelligent, flowing, and worth listening to.'
    },
    'doubter': {
      title: 'The Self-Doubter',
      description: 'You know your stuff, but when it\'s time to speak, you tend to shrink back. Maybe you start with an implied or a real apology ("I might not explain this well…") or trail off before finishing strong. It\'s not that you don\'t have ideas — it\'s that fear of judgment makes you play small.',
      introText: 'Self-doubt doesn\'t mean you\'re weak. It just means you care. You want to get it right, you want people to value what you say. But the more you worry about how you come across, and how others are reacting, the harder it is to fully commit and actually trust yourself.',
      strengths: [
        'You\'re empathetic — tuned in to how others feel.',
        'You\'re authentic — people relate to your honesty and humility.',
        'You\'re resilient — the fear of slipping up makes you better at bouncing back.'
      ],
      growthAreas: [
        'Drop the apology and bring conviction. Swap "Sorry if this doesn\'t make sense…" with "Here\'s why this matters."',
        'Commit to a strong end. End every point with conviction and hold the silence. Don\'t let the doubt show at the end.',
        'Speak from care, not fear. Instead of worrying about judgment, talk about why the subject matters to you. Be brave enough to be vulnerable and show yourself.'
      ],
      whereItShowsUp: [
        'Starting a presentation: You open with, "I\'m not sure if this makes sense…" which lowers the energy and sets expectations before you\'ve even begun.',
        'Sharing an idea: You give a good point but trail off at the end, so you sound less confident than you really are.',
        'One-to-one chat: You downplay your opinion, worried it might sound silly, even though it\'s often the thing people need to hear.'
      ],
      finalThought: 'Your voice is more powerful than you think. When you stop apologising for it and start owning it, people won\'t just hear your words — they\'ll feel your calm and confident conviction.'
    },
    'pleaser': {
      title: 'The People Pleaser',
      description: 'You care about people. You want them to like you, to feel they\'ve got value from listening. That\'s a gift — but it can also trap you. Instead of saying what you really think, you slip into "expert mode" or soften your opinions to keep everyone comfortable.',
      introText: 'On the surface, you look polished and professional. Underneath, it can feel a little hollow — like you\'re performing a role instead of expressing your actual feelings and thoughts.',
      strengths: [
        'You\'re relatable — people lean in because you care.',
        'You\'ve got conviction — when you speak honestly, it resonates.',
        'You\'re adaptable — you listen well and respond in the moment.'
      ],
      growthAreas: [
        'Drop "expert mode." Imagine you\'re talking to a friend, not delivering a lecture.',
        'Ask yourself why. Keep digging: why does this really matter to me? Speak from there.',
        'Risk the truth. Don\'t just say what people want to hear. Say what you actually believe — even if it feels riskier.'
      ],
      whereItShowsUp: [
        'Client pitch: You present polished, well-rehearsed points, but avoid sharing what you really think about their flawed idea — just to keep them happy.',
        'Panel discussion: You stick to "safe" answers and skip anything that might spark disagreement, even though stronger opinions would make you stand out.',
        'Everyday chat: A friend asks what you want to do, and you immediately answer, "I don\'t mind — whatever you prefer," even when you do have a preference.'
      ],
      finalThought: 'People have a sixth sense for inauthenticity. So stop trying to please everyone and start thinking more about pleasing yourself. When you stop trying to please everyone and start speaking from your real convictions, you\'ll unlock a superpower. Some people won\'t like it - and that\'s completely ok.'
    },
    'performer': {
      title: 'The Performer',
      description: 'You know how to put on a show. Strong delivery, polished presence, maybe even a few tricks and hacks up your sleeve. The trouble is, all that polish can sometimes get in the way. Instead of connection, people feel the performance. It looks good, but it doesn\'t always feel real.',
      introText: 'Performers often treat speaking like a test — something to ace with flawless execution. That works up to a point, but it misses what people actually want: to feel like they\'re talking to a real human who they can relate to.',
      strengths: [
        'You\'ve got range — you already know how to use voice and body.',
        'You\'ve got presence — people notice when you walk into a room.',
        'You\'ve got work ethic — preparation is second nature.'
      ],
      growthAreas: [
        'Flip the switch. Exaggerate "stage mode," then relax into how you\'d tell the same thing to a friend.',
        'Bring the feeling. Instead of focusing on technique, ask: what do I actually feel about this? Speak from there.',
        'Stay in character. If you slip up, keep going. Don\'t apologise — own the moment.'
      ],
      whereItShowsUp: [
        'Conference talk: You deliver with polish — big gestures, perfect pacing — but the audience feels like they\'re watching a show, not meeting the real you.',
        'Networking event: You tell the same rehearsed joke or story, but it comes out a little mechanical instead of natural.',
        'Team meeting: You\'re great when prepared, but if someone throws you a curveball, you stumble because you\'re relying on your script or rigid routine.'
      ],
      finalThought: 'Your polish is impressive, but your presence is what people remember. When you drop the act and let yourself be real, you stop being just "good on stage" - and start connecting and communicating authentically. A truly powerful combo.'
    },
    'intense': {
      title: 'The Intense Speaker',
      description: 'When you speak, people feel it. There\'s power in your voice, conviction in your delivery, and no one\'s left wondering where you stand. But sometimes that intensity comes on so strong it can be overwhelming. Everything feels high-stakes, all the time — leaving little space for lightness, contrast, or play.',
      introText: 'At its root, intensity often comes from fear of losing control. If you ease up, will people still take you seriously? The truth: yes. In fact, they\'ll connect more deeply when you show range and are able to be human.',
      strengths: [
        'You\'ve got conviction — people know you mean what you say.',
        'You\'ve got momentum — your energy carries you into flow quickly.',
        'You\'ve got creativity — your force shakes up stale thinking.'
      ],
      growthAreas: [
        'Play with contrast. Try saying something at full volume and energy, then again in a quiet, calm tone. Notice how both land.',
        'Pause on purpose. A few seconds of silence can be more powerful than charging ahead.',
        'Add lightness. Not everything has to be serious. A moment of humour or curiosity makes your intensity even sharper when you bring it back. Experiment with being playful.'
      ],
      whereItShowsUp: [
        'Boardroom presentation: You go full throttle from the start — serious tone, rapid delivery — leaving no breathing room for the audience.',
        'Debate or discussion: Even on light topics, you come across as forceful, which can make others back down rather than engage.',
        'Casual chat: Someone cracks a joke, but you respond with heavy seriousness, missing the chance to show your lighter side.'
      ],
      finalThought: 'Your passion is undeniable. But passion with contrast — highs and lows — is what keeps people hooked. When you balance your fire with calm, you don\'t lose power. You gain contrast and impact.'
    },
    'rationalist': {
      title: 'The Rationalist',
      description: 'You like things to make sense. Clear structure, solid logic, everything in order. That gives you credibility — people trust that you\'ve done your thinking. But it can also make you sound a little flat. Too many summaries, too much abstraction, and not enough of you.',
      introText: 'Rationalists often believe that showing emotion risks losing authority. So you keep things safe, factual, tidy. The result: people nod along, but they don\'t always feel it. And with that you miss the chance to make changes happen.',
      strengths: [
        'You\'re clear — people understand complex ideas when you explain them.',
        'You\'re credible — accuracy makes you trustworthy.',
        'You\'ve got conviction — when you care, your clarity of thought becomes persuasive.'
      ],
      growthAreas: [
        'Tell it like it happened. Share stories in the present tense with detail and feeling, not just the summary.',
        'Add musicality. Play with tone — calm, joyful, frustrated — instead of staying monotone.',
        'Switch off "lecture mode." Imagine you\'re exploring an idea with a peer, not delivering a report.'
      ],
      whereItShowsUp: [
        'Work update: You summarise everything neatly, but colleagues feel disconnected because you left out the human story behind it.',
        'Conference Q&A: You give a technically correct, detailed answer that\'s hard to follow — people get lost in the detail instead of the message.',
        'Everyday story: A friend asks about your holiday. You list facts — "We went to three cities, saw these sights" — but skip the funny or emotional moments and little details that would bring it to life.'
      ],
      finalThought: 'Your clarity makes you reliable and trustworthy. But clarity with emotion can make you compelling and more impactful. When you let people feel your ideas as well as understand them, you move from being listened to — to being able to influence and persuade others.'
    },
    'minimalist': {
      title: 'The Minimalist',
      description: 'You probably already know this about yourself: you don\'t say more than you need to. You get to the point, keep it short, maybe even cut things off before they\'re fully formed. On the surface, that can look calm and collected — but if you\'re honest, it often comes from holding back.',
      introText: 'Minimalists keep their cards close to their chests. Instead of sharing the messy, human details — the real story, the real feeling, the vulnerabilities — you summarise at a safe distance. It\'s not that you don\'t have things to say. It\'s that saying less feels safer than saying too much.',
      strengths: [
        'You naturally bring focus. People listen when you speak because you\'re not wasting words. Everything you say has gone through a (usually far too strict) value filter.',
        'You hold composure under pressure — you don\'t panic, you don\'t overshare. That\'s rare. You deliver more value in ten words than others do in ten minutes.',
        'And when you do add emotion or detail, it lands harder, because people aren\'t expecting it.'
      ],
      growthAreas: [
        'Add one more layer. When you tell a story, don\'t stop at the headline. Add the detail that feels a little too personal, or the feeling you\'d normally skip.',
        'Trust the first idea. You don\'t need to perfect or edit in your head before speaking. Try blurting it out and having fun finding the meaning or fleshing out the idea.',
        'Finish with strength. Instead of trailing off, choose a clear closing line and let the silence do the work. People remember how you end.'
      ],
      whereItShowsUp: [
        'Team discussion: You make one short comment and stop, even though you had more to say. The group moves on, missing your insight. Or you wait your turn, which never comes.',
        'Presentation close: You make your point then finish with a half-sentence or trail off, so the ending feels flat instead of strong.',
        'Casual storytelling: A friend asks how your weekend was. You answer, "Yeah, it was good thanks, how was yours," when you actually have some stories or moments you could share.'
      ],
      finalThought: 'Minimalists often worry about saying too much, which if we\'re honest, is simply not a danger for you. That gives you the freedom to push it and say more. When you open up and let people see what\'s underneath, let people see more of you, and you\'ll get so much more back in return.'
    },
    // Legacy capitalized format for backward compatibility - reference new rich content
    'Rambler': {
      title: 'The Rambler',
      description: 'You\'ve got energy to spare. When you talk, ideas tumble out fast and furious, and people can feel the spark. The trouble is, that spark sometimes sets everything on fire at once — words rush out, sentences spiral, and clarity gets lost in the noise.',
      introText: 'At its heart, rambling isn\'t a flaw. It\'s usually a response to pressure — the silence feels heavy, so you fill it. You hope clarity will appear halfway through the sentence. And sometimes it does. Other times, your audience is left spinning or disengaged.',
      strengths: [
        'You have momentum — you never get stuck for long.',
        'You\'re spontaneous — quick to grab ideas and run with them.',
        'You\'re courageous — you\'re not afraid to open your mouth even when you\'re unsure.'
      ],
      growthAreas: [
        'Pause on purpose. Treat silence as a tool, not a failure. It makes your words hit harder.',
        'Pick one arrow. Before you speak, ask: what\'s the one thing I want them to take away? Aim for that and return to that.',
        'Wrap it up cleanly. End with a clear prompt — something like "And that\'s what matters most." No trailing off.'
      ],
      whereItShowsUp: [
        'Work presentation: You\'ve got loads of ideas, so you throw them all in at once. Colleagues are left nodding politely but not really sure what the main point was.',
        'Q&A session: Someone asks a tricky question, and instead of pausing, you launch into a stream of half-answers, hoping clarity will appear along the way - people start to zone out.',
        'Casual conversation: You get excited telling a story but keep looping back, adding side details, until the punchline gets buried.'
      ],
      finalThought: 'Your energy is infectious, but people need clarity and space to follow you. When you learn to land your ideas as powerfully as you generate them, you stop being "the one who talks a lot" — and start being the one everyone remembers.'
    },
    'Overthinker': {
      title: 'The Overthinker',
      description: 'You\'re thorough and thoughtful, but can get stuck in analysis paralysis.',
      introText: 'Legacy overthinker format - use lowercase for full details.',
      strengths: ['Well-prepared and detailed', 'Thoughtful and precise', 'Credible and reliable'],
      growthAreas: ['Moving from preparation to action', 'Trusting your instincts', 'Speaking spontaneously'],
      whereItShowsUp: ['Analysis paralysis in meetings', 'Over-preparing presentations'],
      finalThought: 'Trust your instincts and speak with confidence.'
    },
    'Self-Doubter': {
      title: 'The Self-Doubter',
      description: 'You have valuable insights but tend to undervalue your expertise.',
      introText: 'Legacy doubter format - use lowercase for full details.',
      strengths: ['Humble and relatable', 'Thoughtful listener', 'Authentic and genuine'],
      growthAreas: ['Building confidence', 'Owning your expertise', 'Speaking with authority'],
      whereItShowsUp: ['Downplaying expertise', 'Hesitating to contribute'],
      finalThought: 'Your voice matters - own your expertise.'
    },
    'People Pleaser': {
      title: 'The People Pleaser',
      description: 'You\'re collaborative and warm, but sometimes dilute your message to avoid conflict.',
      introText: 'Legacy pleaser format - use lowercase for full details.',
      strengths: ['Empathetic and inclusive', 'Good at building consensus', 'Creates safe spaces'],
      growthAreas: ['Standing firm on important points', 'Healthy conflict navigation', 'Clear boundaries'],
      whereItShowsUp: ['Avoiding difficult conversations', 'Softening important messages'],
      finalThought: 'Authentic care includes honest communication.'
    },
    'Performer': {
      title: 'The Performer',
      description: 'You\'re charismatic and polished, but sometimes prioritize style over substance.',
      introText: 'Legacy performer format - use lowercase for full details.',
      strengths: ['Confident and engaging', 'Natural stage presence', 'Memorable delivery'],
      growthAreas: ['Balancing style with substance', 'Authentic vulnerability', 'Deep connection'],
      whereItShowsUp: ['Polished but disconnected presentations', 'Focusing on technique over message'],
      finalThought: 'True performance includes authentic connection.'
    },
    'Intense Speaker': {
      title: 'The Intense Speaker',
      description: 'You have powerful presence and strong convictions, but can sometimes overwhelm others.',
      introText: 'Legacy intense format - use lowercase for full details.',
      strengths: ['Passionate and compelling', 'Strong leadership presence', 'Drives action'],
      growthAreas: ['Moderating intensity', 'Reading audience energy', 'Creating space for others'],
      whereItShowsUp: ['Overwhelming in discussions', 'High-intensity all the time'],
      finalThought: 'Power with restraint creates lasting impact.'
    },
    'Rationalist': {
      title: 'The Rationalist',
      description: 'You\'re highly credible and logical, but can feel dry without human connection.',
      introText: 'Legacy rationalist format - use lowercase for full details.',
      strengths: ['Data-driven and credible', 'Clear and logical', 'Trustworthy expert'],
      growthAreas: ['Adding emotional connection', 'Storytelling and examples', 'Engaging delivery'],
      whereItShowsUp: ['Dry technical presentations', 'Missing emotional connection'],
      finalThought: 'Logic with humanity creates compelling communication.'
    },
    'Minimalist': {
      title: 'The Minimalist',
      description: 'You\'re precise and purposeful — you say exactly what needs to be said without excess.',
      introText: 'Legacy minimalist format - use lowercase for full details.',
      strengths: ['Clear and direct', 'Efficient communication', 'Purposeful delivery'],
      growthAreas: ['Adding warmth and connection', 'Engaging through stories', 'Reading audience needs'],
      whereItShowsUp: ['Brief but disconnected interactions', 'Missing emotional depth'],
      finalThought: 'Precision with warmth creates powerful connections.'
    }
  };

  const currentArchetype = archetypeDescriptions[archetype || ''];

  if (!archetype || !currentArchetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading your results...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {!successMessage ? (
          <>
            {/* Results Display */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-8">
                  Your Speaker Archetype
                </h1>
                <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-8">
                      {currentArchetype.title}
                    </h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                      <p className="text-xl text-gray-700 leading-relaxed">
                        {currentArchetype.description}
                      </p>
                      {(currentArchetype as any).introText && (
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {(currentArchetype as any).introText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Where it shows up section */}
                  {(currentArchetype as any).whereItShowsUp && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Where you might recognize this</h3>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                        <div className="space-y-6 text-left">
                          {(currentArchetype as any).whereItShowsUp.map((example: string, index: number) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                                <span className="text-indigo-600 font-semibold text-sm">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-left">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                      <h3 className="text-xl font-bold text-green-800 mb-6 text-center">✨ Your Strengths</h3>
                      <ul className="space-y-4 text-left">
                        {currentArchetype.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-green-700 text-sm font-bold">✓</span>
                            </div>
                            <span className="text-gray-700 leading-relaxed text-left">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">🎯 Where to Grow</h3>
                      <ul className="space-y-4 text-left">
                        {currentArchetype.growthAreas.map((area, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-blue-700 text-sm font-bold">→</span>
                            </div>
                            <span className="text-gray-700 leading-relaxed text-left">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Final thought */}
                  {(currentArchetype as any).finalThought && (
                    <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                          <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-800 mb-4">Key Insight</h3>
                        <p className="text-gray-700 leading-relaxed text-lg italic max-w-2xl mx-auto">
                          &quot;{(currentArchetype as any).finalThought}&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Speaking Style Profile */}
                {mainAnswers && (
                  <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Speaking Style Profile</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
                      Based on your quiz responses, here&apos;s how you lean on key speaking dimensions:
                    </p>
                    <div className="space-y-6 max-w-2xl mx-auto">
                      {(() => {
                        const parsedAnswers = JSON.parse(mainAnswers);
                        const slidingScales = calculateSlidingScales(parsedAnswers);
                        const scales = [
                          { key: 'clearness', leftLabel: 'Confusing', rightLabel: 'Clear', description: 'How directly you communicate your ideas' },
                          { key: 'spontaneity', leftLabel: 'Cautious', rightLabel: 'Spontaneous', description: 'How quickly you speak without editing' },
                          { key: 'expressiveness', leftLabel: 'Reserved', rightLabel: 'Expressive', description: 'Your emotional range and vividness' },
                          { key: 'authenticity', leftLabel: 'Performance', rightLabel: 'Authentic', description: 'How "real" vs polished you feel when speaking' },
                          { key: 'energy', leftLabel: 'Calm', rightLabel: 'High Energy', description: 'Your overall intensity and presence' }
                        ];

                        return scales.map((scale) => {
                          const value = slidingScales[scale.key as keyof typeof slidingScales];
                          const isLeftSide = value > 50;
                          return (
                            <div key={scale.key} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                <span className={isLeftSide ? 'text-indigo-600 font-semibold' : ''}>{scale.leftLabel}</span>
                                <span className={!isLeftSide ? 'text-indigo-600 font-semibold' : ''}>{scale.rightLabel}</span>
                              </div>
                              <div className="relative mb-3">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                                <div 
                                  className="absolute top-0 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full transform -translate-y-0.5 transition-all duration-1000 ease-out"
                                  style={{ left: `calc(${value}% - 8px)` }}
                                ></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-600">{scale.description}</p>
                                <span className="text-sm font-medium text-indigo-600">
                                  {Math.round(value > 50 ? value : 100 - value)}% {value > 50 ? scale.rightLabel.toLowerCase() : scale.leftLabel.toLowerCase()}
                                </span>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Email Collection */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Your Personalized Growth Plan
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  I&apos;ll send you a detailed action plan with specific exercises and strategies 
                  tailored to your {currentArchetype.title} speaking style.
                </p>

                <div className="max-w-lg mx-auto space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleGetPlan}
                    disabled={!email || !firstName || loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
                  >
                    {loading ? 'Sending Your Plan...' : 'Get My Personalized Growth Plan'}
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  You&apos;ll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
                </p>

                {/* Secondary CTA - Subtle coaching option */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600 mb-3">
                    Want to discuss your results personally?
                  </p>
                  <button
                    onClick={() => window.open('https://calendly.com/alistair-webster/speaker-type-chat', '_blank')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm underline transition-colors duration-200"
                  >
                    Book a free consultation call to discuss your results
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-green-600 text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Sent!</h2>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
