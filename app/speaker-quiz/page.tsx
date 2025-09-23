'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Archetype =
  | 'rambler'
  | 'overthinker'
  | 'doubter'
  | 'pleaser'
  | 'performer'
  | 'intense'
  | 'rationalist'
  | 'minimalist';

type Question = {
  id: string;
  prompt: string;
  type: 'single' | 'multi' | 'rating';
  options?: {
    id: string;
    label: string;
    flag?: Archetype | 'neutral';
  }[];
  min?: number;  // for rating
  max?: number;  // for rating
  maxSelections?: number; // for multi
};

type ScoringResult = {
  primary: Archetype;
  secondary: Archetype | null;
  scores: Record<Archetype, number>;
  confidence: number;    // 0–100 (Q3*10) - for backward compatibility
  metrics: {
    confidence: number;   // 0–100 (Q3*10)
    clarity: number;      // 0–100 from Q6
    presence: number;     // 0–100 from (Q4+Q8)/20
    spontaneity: number;  // 0–100 from Q5
    authenticity: number; // 0–100 invert Q7
  };
  slidingScales: {
    clearness: number;     // 0-100: Clear ↔ Confusing
    spontaneity: number;   // 0-100: Spontaneous ↔ Cautious
    expressiveness: number; // 0-100: Expressive ↔ Reserved
    authenticity: number;  // 0-100: Authentic ↔ Performance
    energy: number;        // 0-100: Energy ↔ Calm
  };
};


const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'If you put me on stage, my reaction will be to…',
    type: 'multi',
    maxSelections: 3,
    options: [
      { id: 'rambler', label: 'Fill the space with ideas and energy', flag: 'rambler' },
      { id: 'overthinker', label: 'Hold back until I\'m "ready"', flag: 'overthinker' },
      { id: 'doubter', label: 'Want to speak but second-guess myself', flag: 'doubter' },
      { id: 'pleaser', label: 'Say what I think others want to hear', flag: 'pleaser' },
      { id: 'performer', label: 'Turn on polish and performance mode', flag: 'performer' },
      { id: 'intense', label: 'Come in hot and dominate', flag: 'intense' },
      { id: 'rationalist', label: 'Focus on facts and logic', flag: 'rationalist' },
      { id: 'minimalist', label: 'Say exactly what needs to be said', flag: 'minimalist' },
    ],
  },
  {
    id: 'q2',
    prompt: 'When I have to speak without preparation, I typically…',
    type: 'single',
    options: [
      { id: 'dive_in', label: 'Dive in and find my way as I go', flag: 'neutral' },
      { id: 'stall_time', label: 'Ask questions or stall for thinking time', flag: 'neutral' },
      { id: 'apologize_first', label: 'Apologize for not being prepared', flag: 'neutral' },
      { id: 'say_less', label: 'Keep it very brief to minimize risk', flag: 'neutral' },
      { id: 'perform_anyway', label: 'Perform confidently even without content', flag: 'neutral' },
      { id: 'speak_forcefully', label: 'Speak with conviction regardless', flag: 'neutral' },
      { id: 'stick_to_facts', label: 'Stick to what I know for certain', flag: 'neutral' },
    ],
  },
  {
    id: 'q3',
    prompt: 'On a scale of 1–10, how confident do you feel speaking in high-stakes situations?',
    type: 'rating',
    min: 1,
    max: 10,
  },
  {
    id: 'q4',
    prompt: 'When someone disagrees with me publicly, I tend to…',
    type: 'single',
    options: [
      { id: 'explain_more', label: 'Explain my point with more examples and details', flag: 'neutral' },
      { id: 'think_first', label: 'Pause to carefully consider their perspective', flag: 'neutral' },
      { id: 'soften_position', label: 'Soften my position to find middle ground', flag: 'neutral' },
      { id: 'accommodate', label: 'Look for ways to make everyone comfortable', flag: 'neutral' },
      { id: 'defend_polished', label: 'Defend my view with polished confidence', flag: 'neutral' },
      { id: 'push_back', label: 'Push back strongly on what I believe', flag: 'neutral' },
      { id: 'present_evidence', label: 'Present clear evidence for my position', flag: 'neutral' },
      { id: 'state_briefly', label: 'State my view briefly and move on', flag: 'neutral' },
    ],
  },
  {
    id: 'q5',
    prompt: 'I can find words quickly when I\'m put on the spot',
    type: 'rating',
    min: 1,
    max: 10,
  },
  {
    id: 'q6',
    prompt: 'I stay on one idea at a time rather than jumping around',
    type: 'rating',
    min: 1,
    max: 10,
  },
  {
    id: 'q7',
    prompt: 'When speaking, I feel like I\'m performing rather than being myself',
    type: 'rating',
    min: 1,
    max: 10,
  },
  {
    id: 'q8',
    prompt: 'After speaking, I usually think…',
    type: 'single',
    options: [
      { id: 'said_too_much', label: '"I probably said too much, but I covered everything"', flag: 'neutral' },
      { id: 'should_have_said', label: '"I should have said that differently"', flag: 'neutral' },
      { id: 'sounded_dumb', label: '"I hope I didn\'t sound stupid"', flag: 'neutral' },
      { id: 'hope_comfortable', label: '"I hope everyone felt comfortable with that"', flag: 'neutral' },
      { id: 'looked_good', label: '"That came across well and professional"', flag: 'neutral' },
      { id: 'made_impact', label: '"I made my point powerfully"', flag: 'neutral' },
      { id: 'was_accurate', label: '"The information was accurate and clear"', flag: 'neutral' },
      { id: 'job_done', label: '"I said what needed to be said"', flag: 'neutral' },
    ],
  },
  {
    id: 'q9',
    prompt: 'Before speaking, I usually prepare by…',
    type: 'multi',
    maxSelections: 2,
    options: [
      { id: 'overprepare', label: 'Over-preparing every detail and contingency', flag: 'neutral' },
      { id: 'loose', label: 'Making a loose outline with key points', flag: 'neutral' },
      { id: 'improv', label: 'Relying on enthusiasm and improvisation', flag: 'neutral' },
      { id: 'polish', label: 'Practicing delivery and polishing presentation', flag: 'neutral' },
      { id: 'structure', label: 'Researching thoroughly and building logical flow', flag: 'neutral' },
      { id: 'minimal', label: 'Doing minimal prep - just clarifying the core message', flag: 'neutral' },
    ],
  },
  {
    id: 'q10',
    prompt: 'My biggest speaking challenge is usually…',
    type: 'single',
    options: [
      { id: 'staying_focused', label: 'Staying focused and not going off on tangents', flag: 'neutral' },
      { id: 'starting_without_perfect', label: 'Starting to speak before I feel perfectly ready', flag: 'neutral' },
      { id: 'believing_valuable', label: 'Believing I have something valuable to contribute', flag: 'neutral' },
      { id: 'being_direct', label: 'Being direct when it might create tension', flag: 'neutral' },
      { id: 'being_authentic', label: 'Being authentic instead of just polished', flag: 'neutral' },
      { id: 'moderating_energy', label: 'Moderating my energy and reading the room', flag: 'neutral' },
      { id: 'making_engaging', label: 'Making technical content engaging and relatable', flag: 'neutral' },
      { id: 'knowing_when_stop', label: 'Knowing when I\'ve said enough', flag: 'neutral' },
    ],
  },
];


function scoreArchetype(answers: Record<string, any>): ScoringResult | null {
  // Initialize scores
  const scores: Record<Archetype, number> = {
    rambler: 0,
    overthinker: 0,
    doubter: 0,
    pleaser: 0,
    performer: 0,
    intense: 0,
    rationalist: 0,
    minimalist: 0,
  };

  // Helper function to check if value is in range
  const inRange = (val: number, min: number, max: number) => val >= min && val <= max;
  const isLow = (val: number) => val <= 4;
  const isMid = (val: number) => inRange(val, 5, 6);
  const isHigh = (val: number) => val >= 7;

  // Extract answers - handle both new format (arrays/numbers) and legacy format
  const q1 = Array.isArray(answers.q1) ? answers.q1 : [];
  const q2 = answers.q2;
  const q3 = typeof answers.q3 === 'number' ? answers.q3 : 5; // default to mid if missing
  const q4 = typeof answers.q4 === 'number' ? answers.q4 : 5;
  const q5 = typeof answers.q5 === 'number' ? answers.q5 : 5;
  const q6 = typeof answers.q6 === 'number' ? answers.q6 : 5;
  const q7 = typeof answers.q7 === 'number' ? answers.q7 : 5;
  const q8 = typeof answers.q8 === 'number' ? answers.q8 : 5;
  const q9 = Array.isArray(answers.q9) ? answers.q9 : [];
  const q10 = Array.isArray(answers.q10) ? answers.q10 : [];

  // Base flags from Q1
  for (const selection of q1) {
    if (typeof selection === 'string' && selection in scores) {
      scores[selection as Archetype] += 3;
    }
  }

  // Q9 preparation style - Enhanced scoring
  for (const prep of q9) {
    switch (prep) {
      case 'overprepare':
        scores.overthinker += 2;
        scores.doubter += 1;
        scores.rationalist += 1; // Thorough preparation
        break;
      case 'loose':
        scores.rambler += 2; // Flexible, go-with-flow approach
        scores.pleaser += 1;
        break;
      case 'improv':
        scores.rambler += 2;
        scores.intense += 2; // Comfort with uncertainty
        break;
      case 'polish':
        scores.performer += 2;
        scores.pleaser += 1; // Wants to look good
        break;
      case 'structure':
        scores.rationalist += 2;
        scores.minimalist += 1; // Clear, organized approach
        break;
      case 'minimal':
        scores.minimalist += 2;
        scores.rationalist += 1; // Efficient preparation
        break;
    }
  }

  // Q2 unprepared speaking behavior  
  switch (q2) {
    case 'dive_in':
      scores.rambler += 2;
      scores.intense += 1;
      break;
    case 'stall_time':
      scores.overthinker += 2;
      scores.rationalist += 1;
      break;
    case 'apologize_first':
      scores.doubter += 2;
      scores.pleaser += 1;
      break;
    case 'say_less':
      scores.minimalist += 2;
      scores.doubter += 1;
      break;
    case 'perform_anyway':
      scores.performer += 2;
      break;
    case 'speak_forcefully':
      scores.intense += 2;
      break;
    case 'stick_to_facts':
      scores.rationalist += 2;
      break;
  }


  // Q8 post-speaking thoughts
  const q8Response = answers.q8;
  switch (q8Response) {
    case 'said_too_much':
      scores.rambler += 2;
      break;
    case 'should_have_said':
      scores.overthinker += 2;
      break;
    case 'sounded_dumb':
      scores.doubter += 2;
      break;
    case 'hope_comfortable':
      scores.pleaser += 2;
      break;
    case 'looked_good':
      scores.performer += 2;
      break;
    case 'made_impact':
      scores.intense += 2;
      break;
    case 'was_accurate':
      scores.rationalist += 2;
      break;
    case 'job_done':
      scores.minimalist += 2;
      break;
  }

  // Enhanced micro-skills from ratings
  
  // Q6: Clarity/Focus - "I stay on one idea at a time rather than jumping around"
  if (isLow(q6)) {
    scores.rambler += 2; // Low clarity = rambling tendency
  } else if (isHigh(q6)) {
    scores.rationalist += 2; // High clarity = structured thinking
    scores.performer += 1;   // Polished delivery
    scores.minimalist += 2;  // Focused communication
  }

  // Q7: Performance feeling - "When speaking, I feel like I'm performing rather than being myself"
  if (isHigh(q7)) {
    scores.performer += 2;   // High performance feeling
    scores.pleaser += 1;     // Trying to manage impression
  } else if (isLow(q7)) {
    scores.minimalist += 2;  // Authentic/natural
    scores.doubter += 1;     // Honest self-assessment
    scores.rationalist += 1; // Straightforward approach
  }

  // Q5: Word-finding speed - "I can find words quickly when I'm put on the spot"
  if (isLow(q5)) {
    scores.overthinker += 2; // Struggles with quick responses
    scores.doubter += 1;     // Self-doubt affects speed
  } else if (isHigh(q5)) {
    scores.rambler += 2;     // Quick to speak
    scores.intense += 2;     // Fast, forceful responses
    scores.performer += 1;   // Confident delivery
  }

  // Q4: This was missing from scoring! Adding it based on the question options
  const q4Response = answers.q4;
  switch (q4Response) {
    case 'explain_more':
      scores.rambler += 2;
      break;
    case 'think_first':
      scores.overthinker += 2;
      break;
    case 'soften_position':
      scores.doubter += 1;
      scores.pleaser += 1;
      break;
    case 'accommodate':
      scores.pleaser += 2;
      break;
    case 'defend_polished':
      scores.performer += 2;
      break;
    case 'push_back':
      scores.intense += 2;
      break;
    case 'present_evidence':
      scores.rationalist += 2;
      break;
    case 'state_briefly':
      scores.minimalist += 2;
      break;
  }

  // Q3: Confidence in high-stakes situations - Enhanced scoring
  if (q3 <= 3) {
    // Very low confidence
    scores.doubter += 2;
    scores.overthinker += 2;
    scores.pleaser += 1; // Seeks approval when uncertain
  } else if (q3 <= 4) {
    // Low confidence
    scores.doubter += 1;
    scores.overthinker += 1;
  } else if (q3 >= 9) {
    // Very high confidence
    scores.intense += 2;
    scores.performer += 2;
    scores.rationalist += 1; // Confident in expertise
  } else if (q3 >= 7) {
    // High confidence
    scores.performer += 1;
    scores.intense += 1;
    scores.rationalist += 1;
  }

  // Q10 biggest challenge
  const q10Response = answers.q10;
  switch (q10Response) {
    case 'staying_focused':
      scores.rambler += 2;
      break;
    case 'starting_without_perfect':
      scores.overthinker += 2;
      break;
    case 'believing_valuable':
      scores.doubter += 2;
      break;
    case 'being_direct':
      scores.pleaser += 2;
      break;
    case 'being_authentic':
      scores.performer += 2;
      break;
    case 'moderating_energy':
      scores.intense += 2;
      break;
    case 'making_engaging':
      scores.rationalist += 2;
      break;
    case 'knowing_when_stop':
      scores.minimalist += 2;
      break;
  }

  // Ensure no negative scores
  Object.keys(scores).forEach(key => {
    if (scores[key as Archetype] < 0) scores[key as Archetype] = 0;
  });

  // Find primary and secondary
  const entries = Object.entries(scores) as [Archetype, number][];
  const sorted = entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    
    // Tie-break logic
    // 1. Prefer highest contribution from Q1
    const q1ContribA = q1.includes(a[0]) ? 3 : 0;
    const q1ContribB = q1.includes(b[0]) ? 3 : 0;
    if (q1ContribB !== q1ContribA) return q1ContribB - q1ContribA;
    
    // 2. Then Q9 contribution
    let q9ContribA = 0, q9ContribB = 0;
    for (const prep of q9) {
      if ((prep === 'overprepare' && a[0] === 'overthinker') ||
          (prep === 'improv' && a[0] === 'rambler') ||
          (prep === 'polish' && a[0] === 'performer') ||
          (prep === 'structure' && a[0] === 'rationalist')) {
        q9ContribA += 2;
      }
      if ((prep === 'overprepare' && b[0] === 'overthinker') ||
          (prep === 'improv' && b[0] === 'rambler') ||
          (prep === 'polish' && b[0] === 'performer') ||
          (prep === 'structure' && b[0] === 'rationalist')) {
        q9ContribB += 2;
      }
    }
    if (q9ContribB !== q9ContribA) return q9ContribB - q9ContribA;
    
    // 3. Confidence tie-break
    if (q3 >= 8) {
      if ((b[0] === 'performer' || b[0] === 'intense') && !(a[0] === 'performer' || a[0] === 'intense')) return 1;
      if ((a[0] === 'performer' || a[0] === 'intense') && !(b[0] === 'performer' || b[0] === 'intense')) return -1;
    }
    if (q3 <= 4) {
      if ((b[0] === 'doubter' || b[0] === 'overthinker') && !(a[0] === 'doubter' || a[0] === 'overthinker')) return 1;
      if ((a[0] === 'doubter' || a[0] === 'overthinker') && !(b[0] === 'doubter' || b[0] === 'overthinker')) return -1;
    }
    
    return 0;
  });

  const totalArchetypeScore = Math.max(1, Object.values(scores).reduce((sum, score) => sum + score, 0));

  const primary = sorted[0][0];
  const secondary = sorted.length > 1 && sorted[1][1] > 0 && (sorted[0][1] - sorted[1][1] <= 1) ? sorted[1][0] : null;

  // Calculate metrics
  const metrics = {
    confidence: q3 * 10,
    clarity: q6 * 10,
    presence: ((scores.performer + scores.intense) / totalArchetypeScore * 100), // Based on archetype confidence
    spontaneity: q5 * 10,
    authenticity: (11 - q7) * 10,
  };

  // Calculate sliding scales based on archetype scores and specific indicators
  // Note: q8Response is already defined above in the scoring section
  const slidingScales = {
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

  return {
    primary,
    secondary,
    scores,
    confidence: q3 * 10, // Backward compatibility
    metrics,
    slidingScales,
  };
}

const SUMMARIES: Record<Archetype, { title: string; blurb: string; tip: string; strengths: string[]; growthAreas: string[] }> = {
  rambler: {
    title: 'The Rambler',
    blurb: "You've got energy to spare. Ideas tumble out fast and furious — that spark sometimes sets everything on fire at once, and clarity gets lost in the noise.",
    tip: 'Pick one arrow. Before you speak, ask: what\'s the one thing I want them to take away?',
    strengths: ['You have momentum — never stuck for long', 'Spontaneous — quick to grab ideas and run', 'Courageous — not afraid to open your mouth'],
    growthAreas: ['Pause on purpose — treat silence as a tool', 'Focus on one main point', 'Wrap up cleanly with conviction'],
  },
  overthinker: {
    title: 'The Overthinker',
    blurb: "You've got plenty to say, but when the spotlight's on, you freeze. Instead of speaking freely, you run mental checks and the moment passes.",
    tip: 'Trust the first thought. Don\'t wait for the perfect answer — speak, then refine if needed.',
    strengths: ['Thoughtful — your answers carry weight', 'Authentic — people trust you when you drop the filter', 'Sharp — your analysis makes you credible'],
    growthAreas: ['Let silence breathe — pauses make you look confident', 'Feel it, don\'t just think it', 'Stop trying to get it "right"'],
  },
  doubter: {
    title: 'The Self-Doubter',
    blurb: "You know your stuff, but when it's time to speak, you shrink back. Fear of judgment makes you play small and trail off before finishing strong.",
    tip: 'Drop the apology and bring conviction. Swap "Sorry if this doesn\'t make sense…" with "Here\'s why this matters."',
    strengths: ['Empathetic — tuned in to how others feel', 'Authentic — people relate to your honesty', 'Resilient — fear makes you better at bouncing back'],
    growthAreas: ['Commit to a strong end — hold the silence', 'Speak from care, not fear', 'Stop apologising for your voice'],
  },
  pleaser: {
    title: 'The People Pleaser',
    blurb: "You care about people and want them to feel valued. But instead of saying what you really think, you slip into performance mode to keep everyone comfortable.",
    tip: 'Risk the truth. Don\'t just say what people want to hear — say what you actually believe.',
    strengths: ['Relatable — people lean in because you care', 'Conviction — when you speak honestly, it resonates', 'Adaptable — you listen well and respond'],
    growthAreas: ['Drop "expert mode" — talk like a friend', 'Ask yourself why this matters to you', 'Stop trying to please everyone'],
  },
  performer: {
    title: 'The Performer',
    blurb: "You know how to put on a show — strong delivery, polished presence. But all that polish can get in the way of real connection.",
    tip: 'Bring the feeling. Instead of focusing on technique, ask: what do I actually feel about this?',
    strengths: ['Range — you know how to use voice and body', 'Presence — people notice when you enter', 'Work ethic — preparation is second nature'],
    growthAreas: ['Drop the act and let yourself be real', 'Stay authentic when you slip up', 'Focus on connection over perfection'],
  },
  intense: {
    title: 'The Intense Speaker',
    blurb: "When you speak, people feel it. Power in your voice, conviction in delivery. But sometimes that intensity comes on so strong it can overwhelm.",
    tip: 'Play with contrast. A few seconds of quiet calm can be more powerful than charging ahead.',
    strengths: ['Conviction — people know you mean it', 'Momentum — your energy carries you into flow', 'Creativity — your force shakes up stale thinking'],
    growthAreas: ['Add lightness — not everything is serious', 'Pause on purpose for breathing room', 'Balance fire with calm for impact'],
  },
  rationalist: {
    title: 'The Rationalist',
    blurb: "You like things to make sense — clear structure, solid logic. That gives you credibility, but can make you sound flat and miss the human connection.",
    tip: 'Tell it like it happened. Share stories with detail and feeling, not just the summary.',
    strengths: ['Clear — people understand complex ideas', 'Credible — accuracy makes you trustworthy', 'Conviction — your clarity becomes persuasive'],
    growthAreas: ['Add musicality — play with tone and emotion', 'Switch off "lecture mode"', 'Let people feel your ideas, not just understand them'],
  },
  minimalist: {
    title: 'The Minimalist',
    blurb: "You don't say more than you need to. You get to the point, keep it short — but often hold back the messy, human details that would connect.",
    tip: 'Add one more layer. When you tell a story, add the detail that feels a little too personal.',
    strengths: ['Natural focus — people listen when you speak', 'Composure under pressure — you don\'t panic', 'High impact — your words land harder'],
    growthAreas: ['Trust the first idea — don\'t edit in your head', 'Share more of what\'s true', 'Finish with strength, not trailing off'],
  },
};

// Test fixtures for archetype scoring validation
const TEST_FIXTURES = [
  {
    name: 'Rambler',
    answers: { 
      q1: ['rambler'], 
      q2: 'dive_in',
      q3: 6,
      q4: 'explain_more',
      q5: 7, // Higher word-finding speed for rambler
      q6: 3, 
      q7: 5,
      q8: 'said_too_much',
      q9: ['improv'],
      q10: 'staying_focused'
    },
    expectedPrimary: 'rambler'
  },
  {
    name: 'Overthinker', 
    answers: { 
      q1: ['overthinker'], 
      q2: 'stall_time',
      q3: 4,
      q4: 'think_first',
      q5: 3,
      q6: 7,
      q7: 4,
      q8: 'should_have_said',
      q9: ['overprepare'],
      q10: 'starting_without_perfect'
    },
    expectedPrimary: 'overthinker'
  },
  {
    name: 'Doubter',
    answers: { 
      q1: ['doubter'], 
      q2: 'apologize_first',
      q3: 2,
      q4: 'soften_position',
      q5: 3,
      q6: 6,
      q7: 6,
      q8: 'sounded_dumb',
      q9: ['loose'],
      q10: 'believing_valuable'
    },
    expectedPrimary: 'doubter'
  },
  {
    name: 'Pleaser',
    answers: { 
      q1: ['pleaser'], 
      q2: 'apologize_first',
      q3: 5,
      q4: 'accommodate',
      q5: 6,
      q6: 6,
      q7: 7,
      q8: 'hope_comfortable',
      q9: ['loose'],
      q10: 'being_direct'
    },
    expectedPrimary: 'pleaser'
  },
  {
    name: 'Performer',
    answers: { 
      q1: ['performer'], 
      q2: 'perform_anyway',
      q3: 8,
      q4: 'defend_polished',
      q5: 8, // High confidence in word-finding
      q6: 8,
      q7: 8, // High performance feeling
      q8: 'looked_good',
      q9: ['polish'],
      q10: 'being_authentic'
    },
    expectedPrimary: 'performer'
  },
  {
    name: 'Intense',
    answers: { 
      q1: ['intense'], 
      q2: 'speak_forcefully',
      q3: 9, // Very high confidence
      q4: 'push_back',
      q5: 8,
      q6: 6,
      q7: 3, // Low performance feeling (authentic)
      q8: 'made_impact',
      q9: ['improv'],
      q10: 'moderating_energy'
    },
    expectedPrimary: 'intense'
  },
  {
    name: 'Rationalist',
    answers: { 
      q1: ['rationalist'], 
      q2: 'stick_to_facts',
      q3: 7,
      q4: 'present_evidence',
      q5: 6,
      q6: 9,
      q7: 4,
      q8: 'was_accurate',
      q9: ['structure'],
      q10: 'making_engaging'
    },
    expectedPrimary: 'rationalist'
  },
  {
    name: 'Minimalist',
    answers: { 
      q1: ['minimalist'], 
      q2: 'say_less',
      q3: 6,
      q4: 'state_briefly',
      q5: 7,
      q6: 8,
      q7: 3,
      q8: 'job_done',
      q9: ['minimal'],
      q10: 'knowing_when_stop'
    },
    expectedPrimary: 'minimalist'
  }
];

// Function to run tests and log results
function runArchetypeTests() {
  console.log('🧪 Running Archetype Scoring Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  TEST_FIXTURES.forEach(test => {
    const result = scoreArchetype(test.answers);
    const actualPrimary = result?.primary;
    const success = actualPrimary === test.expectedPrimary;
    
    if (success) {
      console.log(`✅ ${test.name}: PASS (${actualPrimary})`);
      passed++;
    } else {
      console.log(`❌ ${test.name}: FAIL`);
      console.log(`   Expected: ${test.expectedPrimary}, Got: ${actualPrimary}`);
      console.log(`   Scores:`, result?.scores);
      if ('note' in test) console.log(`   Note: ${(test as any).note}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  }
}

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run tests after a short delay to ensure component is mounted
  setTimeout(() => {
    runArchetypeTests();
    
    // Test enhanced scoring specifically
    console.log('\n🔬 Testing Enhanced Scoring Features...\n');
    
    // Test a rambler with enhanced Q5 scoring
    const enhancedRamblerTest = {
      q1: ['rambler'], 
      q2: 'dive_in',
      q3: 6,
      q4: 'explain_more',
      q5: 8, // High spontaneity should boost rambler
      q6: 3, 
      q7: 4,
      q8: 'said_too_much',
      q9: ['improv', 'loose'], // Multiple prep styles
      q10: 'staying_focused'
    };
    
    const result = scoreArchetype(enhancedRamblerTest);
    console.log('Enhanced Rambler Test:');
    console.log('Primary:', result?.primary);
    console.log('Scores:', result?.scores);
    console.log('Sliding Scales:', result?.slidingScales);
    
    // Verify Q4 scoring is working
    const q4TestAnswers = {
      q1: ['minimalist'], 
      q2: 'say_less',
      q3: 6,
      q4: 'state_briefly', // Should boost minimalist
      q5: 6,
      q6: 8,
      q7: 3,
      q8: 'job_done',
      q9: ['minimal'],
      q10: 'knowing_when_stop'
    };
    
    const q4Result = scoreArchetype(q4TestAnswers);
    console.log('\nQ4 Integration Test (Minimalist):');
    console.log('Primary:', q4Result?.primary);
    console.log('Minimalist Score:', q4Result?.scores.minimalist);
    
  }, 1000);
}

function QuizNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-slate-900/70 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/speak_up_icon_.svg"
              alt="Speak Up For Good"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-lg text-white">
              Speak Up For Good
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-blue-300 transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/#offers"
              className="text-white hover:text-blue-300 transition-colors font-medium text-sm"
            >
              Coaching
            </Link>
            <span className="text-blue-300 font-medium text-sm">
              Speaker Quiz
            </span>
            <button
              onClick={() => window.open('https://calendly.com/alistair-webster/intro-call', '_blank')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
            >
              Book Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AnalysisLoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    'Analyzing your responses...',
    'Identifying patterns in your speaking style...',
    'Matching you with your speaker archetype...',
    'Preparing your personalized insights...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-indigo-400 border-r-transparent animate-spin" style={{animationDuration: '1.5s', animationDirection: 'reverse'}}></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Discovering Your Speaker Type
          </h2>
          <p className="text-lg text-gray-600 mb-8 transition-all duration-500">
            {messages[currentMessage]}
          </p>
          <div className="flex justify-center space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMessage ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SpeakerQuizPage() {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const scoringResult = useMemo(() => scoreArchetype(answers), [answers]);
  const archetype = scoringResult?.primary || null;
  
  // Calculate progress based on answered questions
  const answeredCount = QUESTIONS.filter(q => {
    const answer = answers[q.id];
    if (q.type === 'rating') return typeof answer === 'number';
    if (q.type === 'single') return typeof answer === 'string';
    if (q.type === 'multi') return Array.isArray(answer) && answer.length > 0;
    return false;
  }).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;
  const allQuestionsAnswered = answeredCount === QUESTIONS.length;
  const unansweredCount = QUESTIONS.length - answeredCount;

  // Navigate directly to additional questions without analysis screen
  function handleContinueToAdditional() {
    const result = scoreArchetype(answers);
    if (!result) {
      console.log('No archetype result found, cannot continue');
      return;
    }

    // Use consistent parameter names that match what additional-questions page expects
    const params = new URLSearchParams();
    params.set('archetype', result.primary); // Use 'archetype' instead of 'primary'
    params.set('answers', JSON.stringify(answers)); // Use 'answers' instead of 'mainAnswers'
    
    // Also include additional data for results page
    if (result.secondary) params.set('secondary', result.secondary);
    params.set('scores', JSON.stringify(result.scores));
    params.set('metrics', JSON.stringify(result.metrics));
    params.set('confidence', result.confidence.toString());

    console.log('handleContinueToAdditional called with result:', result);
    console.log('Navigating to additional questions:', `/speaker-quiz/additional-questions?${params.toString()}`);
    
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  async function handleAnalyzeAnswers() {
    setAnalyzing(true);
    
    const messages = [
      'Analyzing your responses...',
      'Identifying patterns in your speaking style...',
      'Matching you with your speaker archetype...',
      'Preparing your personalized insights...'
    ];
    
    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setAnalyzing(false);
    
    // This function is used for final analysis going to results
    const result = scoreArchetype(answers);
    if (!result) return;

    const params = new URLSearchParams();
    params.set('primary', result.primary);
    if (result.secondary) params.set('secondary', result.secondary);
    params.set('scores', JSON.stringify(result.scores));
    params.set('metrics', JSON.stringify(result.metrics));
    params.set('confidence', result.confidence.toString());
    params.set('mainAnswers', JSON.stringify(answers));

    window.location.href = `/speaker-quiz/results?${params.toString()}`;
  }

  function handleGetPersonalizedResults() {
    if (!archetype) return;
    
    // Navigate directly to additional questions page
    const params = new URLSearchParams({
      archetype,
      answers: JSON.stringify(answers)
    });
    
    console.log('Navigating to additional questions:', `/speaker-quiz/additional-questions?${params.toString()}`);
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  async function handleSkipToBasic() {
    if (!archetype || !email || !firstName) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/speaker-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, archetype, answers, optionalAnswers: {} }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Show success message with better styling
        setSuccessMessage(data.message || 'Check your email for your personalised Speaker Growth Plan!');
      } else {
        alert(data?.error ?? 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleGetPlan() {
    if (!archetype || !email || !firstName) return;
    
    // Navigate to additional questions page with collected data
    const params = new URLSearchParams({
      archetype,
      email,
      firstName,
      answers: JSON.stringify(answers)
    });
    
    console.log('handleGetPlan called with:', { archetype, email, firstName, answersCount: Object.keys(answers).length });
    console.log('Navigating to:', `/speaker-quiz/additional-questions?${params.toString()}`);
    
    // Use Next.js router for better navigation
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && firstName && !loading) {
      handleGetPlan();
    }
  };

  const handleAnswerSelect = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    const questionIndex = QUESTIONS.findIndex(q => q.id === questionId);
    if (questionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(questionIndex + 1);
      }, 300);
    }
  };

  const handleMultiSelect = (questionId: string, optionId: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, optionId] };
      } else {
        return { ...prev, [questionId]: currentAnswers.filter((id: string) => id !== optionId) };
      }
    });
  };

  const isValidAnswer = (questionId: string) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    const answer = answers[questionId];
    
    if (!question) return false;
    
    if (question.type === 'rating') {
      return typeof answer === 'number' && answer >= (question.min || 1) && answer <= (question.max || 10);
    }
    if (question.type === 'single') {
      return typeof answer === 'string' && answer.length > 0;
    }
    if (question.type === 'multi') {
      return Array.isArray(answer) && answer.length > 0 && 
             (!question.maxSelections || answer.length <= question.maxSelections);
    }
    return false;
  };

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <QuizNavigation />
        <div className="container mx-auto px-6 pt-24 pb-12">

          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                What Kind of
                <span className="text-indigo-600"> Speaker</span>
                <br />Are You?
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Discover your unique speaker archetype and get a personalised growth plan. 
                Take my 2-minute diagnostic and unlock your speaking potential.
              </p>
              
              {/* Collapsible "What is this?" Box */}
              <div className="max-w-3xl mx-auto mb-8">
                <details className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <summary className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-4 py-3 transition-all duration-200 text-gray-700 hover:text-gray-900 text-sm font-medium">
                    <span>What is this quiz?</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-2">Just for fun! 🎉</p>
                        <p className="mb-2">
                          This quiz uses AI to personalize responses based on your answers, but for best results, 
                          I'd recommend booking a free consultation to discuss your speaking goals.
                        </p>
                        <p className="mb-2">
                          Based on Ultraspeaking ideas but my own interpretations and coaching approaches.
                        </p>
                        <p className="mb-2">
                          <strong>Fair warning:</strong> Results may not be 100% accurate (but they're usually pretty good! 😄)
                        </p>
                        <p>
                          <strong>Beta version:</strong> I'd love any feedback! Email me at <a href="mailto:hello@speakupforgood.com" className="text-indigo-600 hover:text-indigo-700 underline">hello@speakupforgood.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Archetype</h3>
                <p className="text-sm text-gray-600">Discover whether you're a Rambler, Overthinker, People Pleaser, or one of 4 other types</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">My Growth Plan</h3>
                <p className="text-sm text-gray-600">Get AI-generated, personalised strategies tailored to your speaking style</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">My Quick Tips</h3>
                <p className="text-sm text-gray-600">Immediate actionable advice you can use in your very next speaking opportunity</p>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start My Speaker Assessment
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Takes 2 minutes • Instant results • Actionable insights 
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (analyzing) {
    return <AnalysisLoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <QuizNavigation />
      <div className="container mx-auto px-6 pt-24 pb-8">

        <div className="max-w-3xl mx-auto">
          {showResults && archetype && scoringResult && (
            <div className="mb-12 bg-white rounded-2xl border shadow-lg p-8">
              <div className="text-center mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <p className="text-indigo-700 font-semibold text-sm">🎉 Your Speaker Type Revealed! 🎉</p>
              </div>
              
              {/* Primary Archetype */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎭</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{SUMMARIES[archetype].title}</h2>
                <p className="text-lg text-gray-600 mb-4">{SUMMARIES[archetype].blurb}</p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <p className="text-indigo-800">
                    <strong>Quick tip:</strong> {SUMMARIES[archetype].tip}
                  </p>
                </div>
              </div>

              {/* Secondary Archetype */}
              {scoringResult.secondary && (
                <div className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Secondary Type: {SUMMARIES[scoringResult.secondary].title}
                  </h3>
                  <p className="text-gray-600 mb-3">{SUMMARIES[scoringResult.secondary].blurb}</p>
                  <details className="cursor-pointer">
                    <summary className="text-indigo-600 font-medium hover:text-indigo-700">
                      Show more about your secondary type →
                    </summary>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-green-600">✨</span> Strengths
                          </h4>
                          <ul className="space-y-1">
                            {SUMMARIES[scoringResult.secondary].strengths.map((strength, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-blue-600">🎯</span> Growth Areas
                          </h4>
                          <ul className="space-y-1">
                            {SUMMARIES[scoringResult.secondary].growthAreas.map((area, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {area}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              )}

              {/* Sliding Scales */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Your Speaking Style Profile</h3>
                <div className="space-y-4">
                  {[
                    { key: 'clearness', label: 'Clear ↔ Confusing', leftLabel: 'Clear', rightLabel: 'Confusing' },
                    { key: 'spontaneity', label: 'Spontaneous ↔ Cautious', leftLabel: 'Spontaneous', rightLabel: 'Cautious' },
                    { key: 'expressiveness', label: 'Expressive ↔ Reserved', leftLabel: 'Expressive', rightLabel: 'Reserved' },
                    { key: 'authenticity', label: 'Authentic ↔ Performance', leftLabel: 'Authentic', rightLabel: 'Performance' },
                    { key: 'energy', label: 'Energy ↔ Calm', leftLabel: 'Energy', rightLabel: 'Calm' }
                  ].map((scale) => {
                    const value = scoringResult.slidingScales[scale.key as keyof typeof scoringResult.slidingScales];
                    return (
                      <div key={scale.key} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                          <span>{scale.leftLabel}</span>
                          <span>{scale.rightLabel}</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <div 
                            className="absolute top-0 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full transform -translate-y-0.5 transition-all duration-500"
                            style={{ left: `calc(${value}% - 8px)` }}
                          ></div>
                        </div>
                        <div className="text-center text-sm text-gray-600 mt-2">
                          {Math.round(value)}% towards {value > 50 ? scale.rightLabel : scale.leftLabel}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">✨</span> Your Strengths
                  </h3>
                  <ul className="space-y-2">
                    {SUMMARIES[archetype].strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🎯</span> Growth Areas
                  </h3>
                  <ul className="space-y-2">
                    {SUMMARIES[archetype].growthAreas.map((area, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 What's Next?</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Generate my personalised plan to level up my speaking
                  </p>
                  <p className="text-gray-600 mb-6">
                    Get an AI-generated action plan with specific strategies, practice exercises, and next steps tailored to your <strong>{SUMMARIES[archetype].title}</strong> archetype.
                  </p>
                </div>
                
                {/* Primary CTA - Email Capture */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
                  <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
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
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 w-full"
                    >
                      Continue to Additional Questions
                    </button>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    You'll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
                  </p>
                  
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Success! {successMessage}
                          </p>
                        </div>
                        <div className="ml-auto pl-3">
                          <button
                            onClick={() => setSuccessMessage('')}
                            className="inline-flex text-green-400 hover:text-green-600"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary CTA - Subtle coaching option */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Want to discuss your results personally?
                  </p>
                  <button
                    onClick={() => window.open('https://calendly.com/alistair-webster/speaker-type-chat', '_blank')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm underline transition-colors duration-200"
                  >
                    Book a consultation call to discuss my results
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showResults && (
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Question {answeredCount} of {QUESTIONS.length}</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">Speaker Archetype Assessment</h1>
              <p className="text-center text-gray-600 mb-8">
                Choose the response that best describes you in most situations
              </p>

              <div className="space-y-8">
                {QUESTIONS.map((q, index) => {
                  const isAnswered = isValidAnswer(q.id);
                  const currentAnswer = answers[q.id];
                  
                  return (
                  <div 
                    key={q.id} 
                    className={`bg-white rounded-2xl border shadow-sm p-6 transition-all duration-300 ${
                      index === currentQuestion ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
                      } ${isAnswered ? 'border-green-200' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isAnswered
                          ? 'bg-green-100 text-green-800' 
                          : index === currentQuestion 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                          {isAnswered ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-4">{q.prompt}</p>
                          
                          {/* Rating Questions */}
                          {q.type === 'rating' && (
                        <div className="space-y-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Strongly Disagree</span>
                                <span>Strongly Agree</span>
                              </div>
                              <div className="flex space-x-2">
                                {Array.from({ length: (q.max || 10) - (q.min || 1) + 1 }, (_, i) => {
                                  const value = (q.min || 1) + i;
                                  return (
                                    <button
                                      key={value}
                                      onClick={() => handleAnswerSelect(q.id, value)}
                                      className={`w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                                        currentAnswer === value
                                          ? 'bg-indigo-600 border-indigo-600 text-white'
                                          : 'border-gray-300 hover:border-indigo-400 text-gray-700'
                                      }`}
                                    >
                                      {value}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Single Choice Questions */}
                          {q.type === 'single' && q.options && (
                            <div className="space-y-3">
                              {q.options.map((opt) => (
                            <label 
                                  key={opt.id} 
                              className={`flex cursor-pointer items-start gap-3 p-3 rounded-lg transition-colors duration-200 ${
                                    currentAnswer === opt.id
                                  ? 'bg-indigo-50 border-2 border-indigo-200' 
                                  : 'hover:bg-gray-50 border-2 border-transparent'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                    checked={currentAnswer === opt.id}
                                    onChange={() => handleAnswerSelect(q.id, opt.id)}
                              />
                                  <span className={`text-sm ${currentAnswer === opt.id ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                                {opt.label}
                              </span>
                            </label>
                          ))}
                        </div>
                          )}

                          {/* Multi-Select Questions */}
                          {q.type === 'multi' && q.options && (
                            <div className="space-y-3">
                              <div className="text-sm text-gray-600 mb-3">
                                Select up to {q.maxSelections} options
                                {Array.isArray(currentAnswer) && q.maxSelections && (
                                  <span className="ml-2">({currentAnswer.length}/{q.maxSelections})</span>
                                )}
                      </div>
                              {q.options.map((opt) => {
                                const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.id);
                                const canSelect = !Array.isArray(currentAnswer) || 
                                                currentAnswer.length < (q.maxSelections || Infinity) || 
                                                isSelected;
                                
                                return (
                                  <label 
                                    key={opt.id} 
                                    className={`flex cursor-pointer items-start gap-3 p-3 rounded-lg transition-colors duration-200 ${
                                      isSelected
                                        ? 'bg-indigo-50 border-2 border-indigo-200' 
                                        : canSelect
                                          ? 'hover:bg-gray-50 border-2 border-transparent'
                                          : 'opacity-50 cursor-not-allowed border-2 border-transparent'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                      checked={isSelected}
                                      disabled={!canSelect}
                                      onChange={(e) => handleMultiSelect(q.id, opt.id, e.target.checked)}
                                    />
                                    <span className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                                      {opt.label}
                                    </span>
                                  </label>
                                );
                              })}
                    </div>
                          )}
                  </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!allQuestionsAnswered && unansweredCount > 0 && (
                <div className="mt-8 text-center">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-yellow-600">⏳</span>
                      <p className="text-yellow-800 font-medium">Almost there!</p>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Please answer {unansweredCount} more question{unansweredCount > 1 ? 's' : ''} to discover your speaker type.
                    </p>
                  </div>
                </div>
              )}

              {allQuestionsAnswered && !showResults && (
                <div className="mt-12 text-center">
                  <div className="bg-white rounded-2xl border shadow-lg p-8 max-w-md mx-auto">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">🎭</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">All Questions Complete!</h3>
                      <p className="text-gray-600">
                        Great job completing the core assessment! Now let's gather some additional details to create my personalized growth plan.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={handleContinueToAdditional}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Continue to Additional Questions ➡️
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {showResults && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Your Quiz Responses Summary</h3>
              <p className="text-sm text-gray-600 mb-4">Here's a quick overview of how you answered the assessment:</p>
              <div className="grid gap-3">
                {QUESTIONS.map((q, index) => {
                  const answer = answers[q.id];
                  let answerText = 'No answer selected';
                  
                  if (q.type === 'rating' && typeof answer === 'number') {
                    answerText = `${answer}/10`;
                  } else if (q.type === 'single' && typeof answer === 'string' && q.options) {
                    const option = q.options.find(opt => opt.id === answer);
                    answerText = option?.label || answer;
                  } else if (q.type === 'multi' && Array.isArray(answer) && q.options) {
                    const selectedOptions = answer.map(id => {
                      const option = q.options!.find(opt => opt.id === id);
                      return option?.label || id;
                    });
                    answerText = selectedOptions.join(', ');
                  }
                  
                  return (
                  <div key={q.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-800 text-sm mb-2">Q{index + 1}: {q.prompt}</p>
                    <p className="text-gray-600 text-sm">
                        ✓ {answerText}
                    </p>
                  </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}