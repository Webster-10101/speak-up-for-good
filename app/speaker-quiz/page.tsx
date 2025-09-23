&apos;use client&apos;;

import { useMemo, useState, useEffect } from &apos;react&apos;;
import Link from &apos;next/link&apos;;
import Image from &apos;next/image&apos;;

type Archetype =
  | &apos;rambler&apos;
  | &apos;overthinker&apos;
  | &apos;doubter&apos;
  | &apos;pleaser&apos;
  | &apos;performer&apos;
  | &apos;intense&apos;
  | &apos;rationalist&apos;
  | &apos;minimalist&apos;;

type Question = {
  id: string;
  prompt: string;
  type: &apos;single&apos; | &apos;multi&apos; | &apos;rating&apos;;
  options?: {
    id: string;
    label: string;
    flag?: Archetype | &apos;neutral&apos;;
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
    id: &apos;q1&apos;,
    prompt: &apos;If you put me on stage, my reaction will be to…&apos;,
    type: &apos;multi&apos;,
    maxSelections: 3,
    options: [
      { id: &apos;rambler&apos;, label: &apos;Fill the space with ideas and energy&apos;, flag: &apos;rambler&apos; },
      { id: &apos;overthinker&apos;, label: &apos;Hold back until I\&apos;m "ready"&apos;, flag: &apos;overthinker&apos; },
      { id: &apos;doubter&apos;, label: &apos;Want to speak but second-guess myself&apos;, flag: &apos;doubter&apos; },
      { id: &apos;pleaser&apos;, label: &apos;Say what I think others want to hear&apos;, flag: &apos;pleaser&apos; },
      { id: &apos;performer&apos;, label: &apos;Turn on polish and performance mode&apos;, flag: &apos;performer&apos; },
      { id: &apos;intense&apos;, label: &apos;Come in hot and dominate&apos;, flag: &apos;intense&apos; },
      { id: &apos;rationalist&apos;, label: &apos;Focus on facts and logic&apos;, flag: &apos;rationalist&apos; },
      { id: &apos;minimalist&apos;, label: &apos;Say exactly what needs to be said&apos;, flag: &apos;minimalist&apos; },
    ],
  },
  {
    id: &apos;q2&apos;,
    prompt: &apos;When I have to speak without preparation, I typically…&apos;,
    type: &apos;single&apos;,
    options: [
      { id: &apos;dive_in&apos;, label: &apos;Dive in and find my way as I go&apos;, flag: &apos;neutral&apos; },
      { id: &apos;stall_time&apos;, label: &apos;Ask questions or stall for thinking time&apos;, flag: &apos;neutral&apos; },
      { id: &apos;apologize_first&apos;, label: &apos;Apologize for not being prepared&apos;, flag: &apos;neutral&apos; },
      { id: &apos;say_less&apos;, label: &apos;Keep it very brief to minimize risk&apos;, flag: &apos;neutral&apos; },
      { id: &apos;perform_anyway&apos;, label: &apos;Perform confidently even without content&apos;, flag: &apos;neutral&apos; },
      { id: &apos;speak_forcefully&apos;, label: &apos;Speak with conviction regardless&apos;, flag: &apos;neutral&apos; },
      { id: &apos;stick_to_facts&apos;, label: &apos;Stick to what I know for certain&apos;, flag: &apos;neutral&apos; },
    ],
  },
  {
    id: &apos;q3&apos;,
    prompt: &apos;On a scale of 1–10, how confident do you feel speaking in high-stakes situations?&apos;,
    type: &apos;rating&apos;,
    min: 1,
    max: 10,
  },
  {
    id: &apos;q4&apos;,
    prompt: &apos;When someone disagrees with me publicly, I tend to…&apos;,
    type: &apos;single&apos;,
    options: [
      { id: &apos;explain_more&apos;, label: &apos;Explain my point with more examples and details&apos;, flag: &apos;neutral&apos; },
      { id: &apos;think_first&apos;, label: &apos;Pause to carefully consider their perspective&apos;, flag: &apos;neutral&apos; },
      { id: &apos;soften_position&apos;, label: &apos;Soften my position to find middle ground&apos;, flag: &apos;neutral&apos; },
      { id: &apos;accommodate&apos;, label: &apos;Look for ways to make everyone comfortable&apos;, flag: &apos;neutral&apos; },
      { id: &apos;defend_polished&apos;, label: &apos;Defend my view with polished confidence&apos;, flag: &apos;neutral&apos; },
      { id: &apos;push_back&apos;, label: &apos;Push back strongly on what I believe&apos;, flag: &apos;neutral&apos; },
      { id: &apos;present_evidence&apos;, label: &apos;Present clear evidence for my position&apos;, flag: &apos;neutral&apos; },
      { id: &apos;state_briefly&apos;, label: &apos;State my view briefly and move on&apos;, flag: &apos;neutral&apos; },
    ],
  },
  {
    id: &apos;q5&apos;,
    prompt: &apos;I can find words quickly when I\&apos;m put on the spot&apos;,
    type: &apos;rating&apos;,
    min: 1,
    max: 10,
  },
  {
    id: &apos;q6&apos;,
    prompt: &apos;I stay on one idea at a time rather than jumping around&apos;,
    type: &apos;rating&apos;,
    min: 1,
    max: 10,
  },
  {
    id: &apos;q7&apos;,
    prompt: &apos;When speaking, I feel like I\&apos;m performing rather than being myself&apos;,
    type: &apos;rating&apos;,
    min: 1,
    max: 10,
  },
  {
    id: &apos;q8&apos;,
    prompt: &apos;After speaking, I usually think…&apos;,
    type: &apos;single&apos;,
    options: [
      { id: &apos;said_too_much&apos;, label: &apos;"I probably said too much, but I covered everything"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;should_have_said&apos;, label: &apos;"I should have said that differently"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;sounded_dumb&apos;, label: &apos;"I hope I didn\&apos;t sound stupid"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;hope_comfortable&apos;, label: &apos;"I hope everyone felt comfortable with that"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;looked_good&apos;, label: &apos;"That came across well and professional"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;made_impact&apos;, label: &apos;"I made my point powerfully"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;was_accurate&apos;, label: &apos;"The information was accurate and clear"&apos;, flag: &apos;neutral&apos; },
      { id: &apos;job_done&apos;, label: &apos;"I said what needed to be said"&apos;, flag: &apos;neutral&apos; },
    ],
  },
  {
    id: &apos;q9&apos;,
    prompt: &apos;Before speaking, I usually prepare by…&apos;,
    type: &apos;multi&apos;,
    maxSelections: 2,
    options: [
      { id: &apos;overprepare&apos;, label: &apos;Over-preparing every detail and contingency&apos;, flag: &apos;neutral&apos; },
      { id: &apos;loose&apos;, label: &apos;Making a loose outline with key points&apos;, flag: &apos;neutral&apos; },
      { id: &apos;improv&apos;, label: &apos;Relying on enthusiasm and improvisation&apos;, flag: &apos;neutral&apos; },
      { id: &apos;polish&apos;, label: &apos;Practicing delivery and polishing presentation&apos;, flag: &apos;neutral&apos; },
      { id: &apos;structure&apos;, label: &apos;Researching thoroughly and building logical flow&apos;, flag: &apos;neutral&apos; },
      { id: &apos;minimal&apos;, label: &apos;Doing minimal prep - just clarifying the core message&apos;, flag: &apos;neutral&apos; },
    ],
  },
  {
    id: &apos;q10&apos;,
    prompt: &apos;My biggest speaking challenge is usually…&apos;,
    type: &apos;single&apos;,
    options: [
      { id: &apos;staying_focused&apos;, label: &apos;Staying focused and not going off on tangents&apos;, flag: &apos;neutral&apos; },
      { id: &apos;starting_without_perfect&apos;, label: &apos;Starting to speak before I feel perfectly ready&apos;, flag: &apos;neutral&apos; },
      { id: &apos;believing_valuable&apos;, label: &apos;Believing I have something valuable to contribute&apos;, flag: &apos;neutral&apos; },
      { id: &apos;being_direct&apos;, label: &apos;Being direct when it might create tension&apos;, flag: &apos;neutral&apos; },
      { id: &apos;being_authentic&apos;, label: &apos;Being authentic instead of just polished&apos;, flag: &apos;neutral&apos; },
      { id: &apos;moderating_energy&apos;, label: &apos;Moderating my energy and reading the room&apos;, flag: &apos;neutral&apos; },
      { id: &apos;making_engaging&apos;, label: &apos;Making technical content engaging and relatable&apos;, flag: &apos;neutral&apos; },
      { id: &apos;knowing_when_stop&apos;, label: &apos;Knowing when I\&apos;ve said enough&apos;, flag: &apos;neutral&apos; },
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
  const q3 = typeof answers.q3 === &apos;number&apos; ? answers.q3 : 5; // default to mid if missing
  const q4 = typeof answers.q4 === &apos;number&apos; ? answers.q4 : 5;
  const q5 = typeof answers.q5 === &apos;number&apos; ? answers.q5 : 5;
  const q6 = typeof answers.q6 === &apos;number&apos; ? answers.q6 : 5;
  const q7 = typeof answers.q7 === &apos;number&apos; ? answers.q7 : 5;
  const q8 = typeof answers.q8 === &apos;number&apos; ? answers.q8 : 5;
  const q9 = Array.isArray(answers.q9) ? answers.q9 : [];
  const q10 = Array.isArray(answers.q10) ? answers.q10 : [];

  // Base flags from Q1
  for (const selection of q1) {
    if (typeof selection === &apos;string&apos; && selection in scores) {
      scores[selection as Archetype] += 3;
    }
  }

  // Q9 preparation style - Enhanced scoring
  for (const prep of q9) {
    switch (prep) {
      case &apos;overprepare&apos;:
        scores.overthinker += 2;
        scores.doubter += 1;
        scores.rationalist += 1; // Thorough preparation
        break;
      case &apos;loose&apos;:
        scores.rambler += 2; // Flexible, go-with-flow approach
        scores.pleaser += 1;
        break;
      case &apos;improv&apos;:
        scores.rambler += 2;
        scores.intense += 2; // Comfort with uncertainty
        break;
      case &apos;polish&apos;:
        scores.performer += 2;
        scores.pleaser += 1; // Wants to look good
        break;
      case &apos;structure&apos;:
        scores.rationalist += 2;
        scores.minimalist += 1; // Clear, organized approach
        break;
      case &apos;minimal&apos;:
        scores.minimalist += 2;
        scores.rationalist += 1; // Efficient preparation
        break;
    }
  }

  // Q2 unprepared speaking behavior  
  switch (q2) {
    case &apos;dive_in&apos;:
      scores.rambler += 2;
      scores.intense += 1;
      break;
    case &apos;stall_time&apos;:
      scores.overthinker += 2;
      scores.rationalist += 1;
      break;
    case &apos;apologize_first&apos;:
      scores.doubter += 2;
      scores.pleaser += 1;
      break;
    case &apos;say_less&apos;:
      scores.minimalist += 2;
      scores.doubter += 1;
      break;
    case &apos;perform_anyway&apos;:
      scores.performer += 2;
      break;
    case &apos;speak_forcefully&apos;:
      scores.intense += 2;
      break;
    case &apos;stick_to_facts&apos;:
      scores.rationalist += 2;
      break;
  }


  // Q8 post-speaking thoughts
  const q8Response = answers.q8;
  switch (q8Response) {
    case &apos;said_too_much&apos;:
      scores.rambler += 2;
      break;
    case &apos;should_have_said&apos;:
      scores.overthinker += 2;
      break;
    case &apos;sounded_dumb&apos;:
      scores.doubter += 2;
      break;
    case &apos;hope_comfortable&apos;:
      scores.pleaser += 2;
      break;
    case &apos;looked_good&apos;:
      scores.performer += 2;
      break;
    case &apos;made_impact&apos;:
      scores.intense += 2;
      break;
    case &apos;was_accurate&apos;:
      scores.rationalist += 2;
      break;
    case &apos;job_done&apos;:
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

  // Q7: Performance feeling - "When speaking, I feel like I&apos;m performing rather than being myself"
  if (isHigh(q7)) {
    scores.performer += 2;   // High performance feeling
    scores.pleaser += 1;     // Trying to manage impression
  } else if (isLow(q7)) {
    scores.minimalist += 2;  // Authentic/natural
    scores.doubter += 1;     // Honest self-assessment
    scores.rationalist += 1; // Straightforward approach
  }

  // Q5: Word-finding speed - "I can find words quickly when I&apos;m put on the spot"
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
    case &apos;explain_more&apos;:
      scores.rambler += 2;
      break;
    case &apos;think_first&apos;:
      scores.overthinker += 2;
      break;
    case &apos;soften_position&apos;:
      scores.doubter += 1;
      scores.pleaser += 1;
      break;
    case &apos;accommodate&apos;:
      scores.pleaser += 2;
      break;
    case &apos;defend_polished&apos;:
      scores.performer += 2;
      break;
    case &apos;push_back&apos;:
      scores.intense += 2;
      break;
    case &apos;present_evidence&apos;:
      scores.rationalist += 2;
      break;
    case &apos;state_briefly&apos;:
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
    case &apos;staying_focused&apos;:
      scores.rambler += 2;
      break;
    case &apos;starting_without_perfect&apos;:
      scores.overthinker += 2;
      break;
    case &apos;believing_valuable&apos;:
      scores.doubter += 2;
      break;
    case &apos;being_direct&apos;:
      scores.pleaser += 2;
      break;
    case &apos;being_authentic&apos;:
      scores.performer += 2;
      break;
    case &apos;moderating_energy&apos;:
      scores.intense += 2;
      break;
    case &apos;making_engaging&apos;:
      scores.rationalist += 2;
      break;
    case &apos;knowing_when_stop&apos;:
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
      if ((prep === &apos;overprepare&apos; && a[0] === &apos;overthinker&apos;) ||
          (prep === &apos;improv&apos; && a[0] === &apos;rambler&apos;) ||
          (prep === &apos;polish&apos; && a[0] === &apos;performer&apos;) ||
          (prep === &apos;structure&apos; && a[0] === &apos;rationalist&apos;)) {
        q9ContribA += 2;
      }
      if ((prep === &apos;overprepare&apos; && b[0] === &apos;overthinker&apos;) ||
          (prep === &apos;improv&apos; && b[0] === &apos;rambler&apos;) ||
          (prep === &apos;polish&apos; && b[0] === &apos;performer&apos;) ||
          (prep === &apos;structure&apos; && b[0] === &apos;rationalist&apos;)) {
        q9ContribB += 2;
      }
    }
    if (q9ContribB !== q9ContribA) return q9ContribB - q9ContribA;
    
    // 3. Confidence tie-break
    if (q3 >= 8) {
      if ((b[0] === &apos;performer&apos; || b[0] === &apos;intense&apos;) && !(a[0] === &apos;performer&apos; || a[0] === &apos;intense&apos;)) return 1;
      if ((a[0] === &apos;performer&apos; || a[0] === &apos;intense&apos;) && !(b[0] === &apos;performer&apos; || b[0] === &apos;intense&apos;)) return -1;
    }
    if (q3 <= 4) {
      if ((b[0] === &apos;doubter&apos; || b[0] === &apos;overthinker&apos;) && !(a[0] === &apos;doubter&apos; || a[0] === &apos;overthinker&apos;)) return 1;
      if ((a[0] === &apos;doubter&apos; || a[0] === &apos;overthinker&apos;) && !(b[0] === &apos;doubter&apos; || b[0] === &apos;overthinker&apos;)) return -1;
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
      (q2 === &apos;dive_in&apos; ? 15 : q2 === &apos;stall_time&apos; ? -15 : q2 === &apos;apologize_first&apos; ? -10 : 0)
    )),
    
    // Expressive ↔ Reserved: Speaking behavior + archetype energy
    expressiveness: Math.min(100, Math.max(0,
      (q2 === &apos;dive_in&apos; || q2 === &apos;speak_forcefully&apos; ? 65 : q2 === &apos;perform_anyway&apos; ? 60 : q2 === &apos;say_less&apos; ? 25 : 40) +
      ((scores.intense + scores.performer) / totalArchetypeScore * 25) -
      ((scores.minimalist + scores.rationalist) / totalArchetypeScore * 20) +
      (answers.q8 === &apos;made_impact&apos; ? 10 : answers.q8 === &apos;job_done&apos; ? -10 : 0)
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
      (q2 === &apos;speak_forcefully&apos; || q2 === &apos;dive_in&apos; ? 10 : q2 === &apos;stall_time&apos; || q2 === &apos;say_less&apos; ? -10 : 0)
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
    title: &apos;The Rambler&apos;,
    blurb: "You&apos;ve got energy to spare. Ideas tumble out fast and furious — that spark sometimes sets everything on fire at once, and clarity gets lost in the noise.",
    tip: &apos;Pick one arrow. Before you speak, ask: what\&apos;s the one thing I want them to take away?&apos;,
    strengths: [&apos;You have momentum — never stuck for long&apos;, &apos;Spontaneous — quick to grab ideas and run&apos;, &apos;Courageous — not afraid to open your mouth&apos;],
    growthAreas: [&apos;Pause on purpose — treat silence as a tool&apos;, &apos;Focus on one main point&apos;, &apos;Wrap up cleanly with conviction&apos;],
  },
  overthinker: {
    title: &apos;The Overthinker&apos;,
    blurb: "You&apos;ve got plenty to say, but when the spotlight&apos;s on, you freeze. Instead of speaking freely, you run mental checks and the moment passes.",
    tip: &apos;Trust the first thought. Don\&apos;t wait for the perfect answer — speak, then refine if needed.&apos;,
    strengths: [&apos;Thoughtful — your answers carry weight&apos;, &apos;Authentic — people trust you when you drop the filter&apos;, &apos;Sharp — your analysis makes you credible&apos;],
    growthAreas: [&apos;Let silence breathe — pauses make you look confident&apos;, &apos;Feel it, don\&apos;t just think it&apos;, &apos;Stop trying to get it "right"&apos;],
  },
  doubter: {
    title: &apos;The Self-Doubter&apos;,
    blurb: "You know your stuff, but when it&apos;s time to speak, you shrink back. Fear of judgment makes you play small and trail off before finishing strong.",
    tip: &apos;Drop the apology and bring conviction. Swap "Sorry if this doesn\&apos;t make sense…" with "Here\&apos;s why this matters."&apos;,
    strengths: [&apos;Empathetic — tuned in to how others feel&apos;, &apos;Authentic — people relate to your honesty&apos;, &apos;Resilient — fear makes you better at bouncing back&apos;],
    growthAreas: [&apos;Commit to a strong end — hold the silence&apos;, &apos;Speak from care, not fear&apos;, &apos;Stop apologising for your voice&apos;],
  },
  pleaser: {
    title: &apos;The People Pleaser&apos;,
    blurb: "You care about people and want them to feel valued. But instead of saying what you really think, you slip into performance mode to keep everyone comfortable.",
    tip: &apos;Risk the truth. Don\&apos;t just say what people want to hear — say what you actually believe.&apos;,
    strengths: [&apos;Relatable — people lean in because you care&apos;, &apos;Conviction — when you speak honestly, it resonates&apos;, &apos;Adaptable — you listen well and respond&apos;],
    growthAreas: [&apos;Drop "expert mode" — talk like a friend&apos;, &apos;Ask yourself why this matters to you&apos;, &apos;Stop trying to please everyone&apos;],
  },
  performer: {
    title: &apos;The Performer&apos;,
    blurb: "You know how to put on a show — strong delivery, polished presence. But all that polish can get in the way of real connection.",
    tip: &apos;Bring the feeling. Instead of focusing on technique, ask: what do I actually feel about this?&apos;,
    strengths: [&apos;Range — you know how to use voice and body&apos;, &apos;Presence — people notice when you enter&apos;, &apos;Work ethic — preparation is second nature&apos;],
    growthAreas: [&apos;Drop the act and let yourself be real&apos;, &apos;Stay authentic when you slip up&apos;, &apos;Focus on connection over perfection&apos;],
  },
  intense: {
    title: &apos;The Intense Speaker&apos;,
    blurb: "When you speak, people feel it. Power in your voice, conviction in delivery. But sometimes that intensity comes on so strong it can overwhelm.",
    tip: &apos;Play with contrast. A few seconds of quiet calm can be more powerful than charging ahead.&apos;,
    strengths: [&apos;Conviction — people know you mean it&apos;, &apos;Momentum — your energy carries you into flow&apos;, &apos;Creativity — your force shakes up stale thinking&apos;],
    growthAreas: [&apos;Add lightness — not everything is serious&apos;, &apos;Pause on purpose for breathing room&apos;, &apos;Balance fire with calm for impact&apos;],
  },
  rationalist: {
    title: &apos;The Rationalist&apos;,
    blurb: "You like things to make sense — clear structure, solid logic. That gives you credibility, but can make you sound flat and miss the human connection.",
    tip: &apos;Tell it like it happened. Share stories with detail and feeling, not just the summary.&apos;,
    strengths: [&apos;Clear — people understand complex ideas&apos;, &apos;Credible — accuracy makes you trustworthy&apos;, &apos;Conviction — your clarity becomes persuasive&apos;],
    growthAreas: [&apos;Add musicality — play with tone and emotion&apos;, &apos;Switch off "lecture mode"&apos;, &apos;Let people feel your ideas, not just understand them&apos;],
  },
  minimalist: {
    title: &apos;The Minimalist&apos;,
    blurb: "You don&apos;t say more than you need to. You get to the point, keep it short — but often hold back the messy, human details that would connect.",
    tip: &apos;Add one more layer. When you tell a story, add the detail that feels a little too personal.&apos;,
    strengths: [&apos;Natural focus — people listen when you speak&apos;, &apos;Composure under pressure — you don\&apos;t panic&apos;, &apos;High impact — your words land harder&apos;],
    growthAreas: [&apos;Trust the first idea — don\&apos;t edit in your head&apos;, &apos;Share more of what\&apos;s true&apos;, &apos;Finish with strength, not trailing off&apos;],
  },
};

// Test fixtures for archetype scoring validation
const TEST_FIXTURES = [
  {
    name: &apos;Rambler&apos;,
    answers: { 
      q1: [&apos;rambler&apos;], 
      q2: &apos;dive_in&apos;,
      q3: 6,
      q4: &apos;explain_more&apos;,
      q5: 7, // Higher word-finding speed for rambler
      q6: 3, 
      q7: 5,
      q8: &apos;said_too_much&apos;,
      q9: [&apos;improv&apos;],
      q10: &apos;staying_focused&apos;
    },
    expectedPrimary: &apos;rambler&apos;
  },
  {
    name: &apos;Overthinker&apos;, 
    answers: { 
      q1: [&apos;overthinker&apos;], 
      q2: &apos;stall_time&apos;,
      q3: 4,
      q4: &apos;think_first&apos;,
      q5: 3,
      q6: 7,
      q7: 4,
      q8: &apos;should_have_said&apos;,
      q9: [&apos;overprepare&apos;],
      q10: &apos;starting_without_perfect&apos;
    },
    expectedPrimary: &apos;overthinker&apos;
  },
  {
    name: &apos;Doubter&apos;,
    answers: { 
      q1: [&apos;doubter&apos;], 
      q2: &apos;apologize_first&apos;,
      q3: 2,
      q4: &apos;soften_position&apos;,
      q5: 3,
      q6: 6,
      q7: 6,
      q8: &apos;sounded_dumb&apos;,
      q9: [&apos;loose&apos;],
      q10: &apos;believing_valuable&apos;
    },
    expectedPrimary: &apos;doubter&apos;
  },
  {
    name: &apos;Pleaser&apos;,
    answers: { 
      q1: [&apos;pleaser&apos;], 
      q2: &apos;apologize_first&apos;,
      q3: 5,
      q4: &apos;accommodate&apos;,
      q5: 6,
      q6: 6,
      q7: 7,
      q8: &apos;hope_comfortable&apos;,
      q9: [&apos;loose&apos;],
      q10: &apos;being_direct&apos;
    },
    expectedPrimary: &apos;pleaser&apos;
  },
  {
    name: &apos;Performer&apos;,
    answers: { 
      q1: [&apos;performer&apos;], 
      q2: &apos;perform_anyway&apos;,
      q3: 8,
      q4: &apos;defend_polished&apos;,
      q5: 8, // High confidence in word-finding
      q6: 8,
      q7: 8, // High performance feeling
      q8: &apos;looked_good&apos;,
      q9: [&apos;polish&apos;],
      q10: &apos;being_authentic&apos;
    },
    expectedPrimary: &apos;performer&apos;
  },
  {
    name: &apos;Intense&apos;,
    answers: { 
      q1: [&apos;intense&apos;], 
      q2: &apos;speak_forcefully&apos;,
      q3: 9, // Very high confidence
      q4: &apos;push_back&apos;,
      q5: 8,
      q6: 6,
      q7: 3, // Low performance feeling (authentic)
      q8: &apos;made_impact&apos;,
      q9: [&apos;improv&apos;],
      q10: &apos;moderating_energy&apos;
    },
    expectedPrimary: &apos;intense&apos;
  },
  {
    name: &apos;Rationalist&apos;,
    answers: { 
      q1: [&apos;rationalist&apos;], 
      q2: &apos;stick_to_facts&apos;,
      q3: 7,
      q4: &apos;present_evidence&apos;,
      q5: 6,
      q6: 9,
      q7: 4,
      q8: &apos;was_accurate&apos;,
      q9: [&apos;structure&apos;],
      q10: &apos;making_engaging&apos;
    },
    expectedPrimary: &apos;rationalist&apos;
  },
  {
    name: &apos;Minimalist&apos;,
    answers: { 
      q1: [&apos;minimalist&apos;], 
      q2: &apos;say_less&apos;,
      q3: 6,
      q4: &apos;state_briefly&apos;,
      q5: 7,
      q6: 8,
      q7: 3,
      q8: &apos;job_done&apos;,
      q9: [&apos;minimal&apos;],
      q10: &apos;knowing_when_stop&apos;
    },
    expectedPrimary: &apos;minimalist&apos;
  }
];

// Function to run tests and log results
function runArchetypeTests() {
  console.log(&apos;🧪 Running Archetype Scoring Tests...\n&apos;);
  
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
      if (&apos;note&apos; in test) console.log(`   Note: ${(test as any).note}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  if (failed === 0) {
    console.log(&apos;🎉 All tests passed!&apos;);
  }
}

// Auto-run tests in development
if (typeof window !== &apos;undefined&apos; && process.env.NODE_ENV === &apos;development&apos;) {
  // Run tests after a short delay to ensure component is mounted
  setTimeout(() => {
    runArchetypeTests();
    
    // Test enhanced scoring specifically
    console.log(&apos;\n🔬 Testing Enhanced Scoring Features...\n&apos;);
    
    // Test a rambler with enhanced Q5 scoring
    const enhancedRamblerTest = {
      q1: [&apos;rambler&apos;], 
      q2: &apos;dive_in&apos;,
      q3: 6,
      q4: &apos;explain_more&apos;,
      q5: 8, // High spontaneity should boost rambler
      q6: 3, 
      q7: 4,
      q8: &apos;said_too_much&apos;,
      q9: [&apos;improv&apos;, &apos;loose&apos;], // Multiple prep styles
      q10: &apos;staying_focused&apos;
    };
    
    const result = scoreArchetype(enhancedRamblerTest);
    console.log(&apos;Enhanced Rambler Test:&apos;);
    console.log(&apos;Primary:&apos;, result?.primary);
    console.log(&apos;Scores:&apos;, result?.scores);
    console.log(&apos;Sliding Scales:&apos;, result?.slidingScales);
    
    // Verify Q4 scoring is working
    const q4TestAnswers = {
      q1: [&apos;minimalist&apos;], 
      q2: &apos;say_less&apos;,
      q3: 6,
      q4: &apos;state_briefly&apos;, // Should boost minimalist
      q5: 6,
      q6: 8,
      q7: 3,
      q8: &apos;job_done&apos;,
      q9: [&apos;minimal&apos;],
      q10: &apos;knowing_when_stop&apos;
    };
    
    const q4Result = scoreArchetype(q4TestAnswers);
    console.log(&apos;\nQ4 Integration Test (Minimalist):&apos;);
    console.log(&apos;Primary:&apos;, q4Result?.primary);
    console.log(&apos;Minimalist Score:&apos;, q4Result?.scores.minimalist);
    
  }, 1000);
}

function QuizNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener(&apos;scroll&apos;, handleScroll);
    return () => window.removeEventListener(&apos;scroll&apos;, handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? &apos;bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10&apos; : &apos;bg-slate-900/70 backdrop-blur-sm&apos;
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
              onClick={() => window.open(&apos;https://calendly.com/alistair-webster/intro-call&apos;, &apos;_blank&apos;)}
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
    &apos;Analyzing your responses...&apos;,
    &apos;Identifying patterns in your speaking style...&apos;,
    &apos;Matching you with your speaker archetype...&apos;,
    &apos;Preparing your personalized insights...&apos;
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-indigo-400 border-r-transparent animate-spin" style={{animationDuration: &apos;1.5s&apos;, animationDirection: &apos;reverse&apos;}}></div>
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
                  index === currentMessage ? &apos;bg-indigo-600&apos; : &apos;bg-gray-300&apos;
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
  const [email, setEmail] = useState(&apos;&apos;);
  const [firstName, setFirstName] = useState(&apos;&apos;);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(&apos;&apos;);
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
    if (q.type === &apos;rating&apos;) return typeof answer === &apos;number&apos;;
    if (q.type === &apos;single&apos;) return typeof answer === &apos;string&apos;;
    if (q.type === &apos;multi&apos;) return Array.isArray(answer) && answer.length > 0;
    return false;
  }).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;
  const allQuestionsAnswered = answeredCount === QUESTIONS.length;
  const unansweredCount = QUESTIONS.length - answeredCount;

  // Navigate directly to additional questions without analysis screen
  function handleContinueToAdditional() {
    const result = scoreArchetype(answers);
    if (!result) {
      console.log(&apos;No archetype result found, cannot continue&apos;);
      return;
    }

    // Use consistent parameter names that match what additional-questions page expects
    const params = new URLSearchParams();
    params.set(&apos;archetype&apos;, result.primary); // Use &apos;archetype&apos; instead of &apos;primary&apos;
    params.set(&apos;answers&apos;, JSON.stringify(answers)); // Use &apos;answers&apos; instead of &apos;mainAnswers&apos;
    
    // Also include additional data for results page
    if (result.secondary) params.set(&apos;secondary&apos;, result.secondary);
    params.set(&apos;scores&apos;, JSON.stringify(result.scores));
    params.set(&apos;metrics&apos;, JSON.stringify(result.metrics));
    params.set(&apos;confidence&apos;, result.confidence.toString());

    console.log(&apos;handleContinueToAdditional called with result:&apos;, result);
    console.log(&apos;Navigating to additional questions:&apos;, `/speaker-quiz/additional-questions?${params.toString()}`);
    
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  async function handleAnalyzeAnswers() {
    setAnalyzing(true);
    
    const messages = [
      &apos;Analyzing your responses...&apos;,
      &apos;Identifying patterns in your speaking style...&apos;,
      &apos;Matching you with your speaker archetype...&apos;,
      &apos;Preparing your personalized insights...&apos;
    ];
    
    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setAnalyzing(false);
    
    // This function is used for final analysis going to results
    const result = scoreArchetype(answers);
    if (!result) return;

    const params = new URLSearchParams();
    params.set(&apos;primary&apos;, result.primary);
    if (result.secondary) params.set(&apos;secondary&apos;, result.secondary);
    params.set(&apos;scores&apos;, JSON.stringify(result.scores));
    params.set(&apos;metrics&apos;, JSON.stringify(result.metrics));
    params.set(&apos;confidence&apos;, result.confidence.toString());
    params.set(&apos;mainAnswers&apos;, JSON.stringify(answers));

    window.location.href = `/speaker-quiz/results?${params.toString()}`;
  }

  function handleGetPersonalizedResults() {
    if (!archetype) return;
    
    // Navigate directly to additional questions page
    const params = new URLSearchParams({
      archetype,
      answers: JSON.stringify(answers)
    });
    
    console.log(&apos;Navigating to additional questions:&apos;, `/speaker-quiz/additional-questions?${params.toString()}`);
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  async function handleSkipToBasic() {
    if (!archetype || !email || !firstName) return;
    setLoading(true);
    
    try {
      const res = await fetch(&apos;/api/speaker-quiz&apos;, {
        method: &apos;POST&apos;,
        headers: { &apos;Content-Type&apos;: &apos;application/json&apos; },
        body: JSON.stringify({ email, firstName, archetype, answers, optionalAnswers: {} }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Show success message with better styling
        setSuccessMessage(data.message || &apos;Check your email for your personalised Speaker Growth Plan!&apos;);
      } else {
        alert(data?.error ?? &apos;Something went wrong. Please try again.&apos;);
      }
    } catch (error) {
      alert(&apos;Something went wrong. Please try again.&apos;);
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
    
    console.log(&apos;handleGetPlan called with:&apos;, { archetype, email, firstName, answersCount: Object.keys(answers).length });
    console.log(&apos;Navigating to:&apos;, `/speaker-quiz/additional-questions?${params.toString()}`);
    
    // Use Next.js router for better navigation
    window.location.href = `/speaker-quiz/additional-questions?${params.toString()}`;
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === &apos;Enter&apos; && email && firstName && !loading) {
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
    
    if (question.type === &apos;rating&apos;) {
      return typeof answer === &apos;number&apos; && answer >= (question.min || 1) && answer <= (question.max || 10);
    }
    if (question.type === &apos;single&apos;) {
      return typeof answer === &apos;string&apos; && answer.length > 0;
    }
    if (question.type === &apos;multi&apos;) {
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
                          I&apos;d recommend booking a free consultation to discuss your speaking goals.
                        </p>
                        <p className="mb-2">
                          Based on Ultraspeaking ideas but my own interpretations and coaching approaches.
                        </p>
                        <p className="mb-2">
                          <strong>Fair warning:</strong> Results may not be 100% accurate (but they&apos;re usually pretty good! 😄)
                        </p>
                        <p>
                          <strong>Beta version:</strong> I&apos;d love any feedback! Email me at <a href="mailto:hello@speakupforgood.com" className="text-indigo-600 hover:text-indigo-700 underline">hello@speakupforgood.com</a>
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
                <p className="text-sm text-gray-600">Discover whether you&apos;re a Rambler, Overthinker, People Pleaser, or one of 4 other types</p>
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
                    { key: &apos;clearness&apos;, label: &apos;Clear ↔ Confusing&apos;, leftLabel: &apos;Clear&apos;, rightLabel: &apos;Confusing&apos; },
                    { key: &apos;spontaneity&apos;, label: &apos;Spontaneous ↔ Cautious&apos;, leftLabel: &apos;Spontaneous&apos;, rightLabel: &apos;Cautious&apos; },
                    { key: &apos;expressiveness&apos;, label: &apos;Expressive ↔ Reserved&apos;, leftLabel: &apos;Expressive&apos;, rightLabel: &apos;Reserved&apos; },
                    { key: &apos;authenticity&apos;, label: &apos;Authentic ↔ Performance&apos;, leftLabel: &apos;Authentic&apos;, rightLabel: &apos;Performance&apos; },
                    { key: &apos;energy&apos;, label: &apos;Energy ↔ Calm&apos;, leftLabel: &apos;Energy&apos;, rightLabel: &apos;Calm&apos; }
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 What&apos;s Next?</h3>
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
                    You&apos;ll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
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
                            onClick={() => setSuccessMessage(&apos;&apos;)}
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
                    onClick={() => window.open(&apos;https://calendly.com/alistair-webster/speaker-type-chat&apos;, &apos;_blank&apos;)}
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
                      index === currentQuestion ? &apos;ring-2 ring-indigo-500 ring-opacity-50&apos; : &apos;&apos;
                      } ${isAnswered ? &apos;border-green-200&apos; : &apos;&apos;}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isAnswered
                          ? &apos;bg-green-100 text-green-800&apos; 
                          : index === currentQuestion 
                            ? &apos;bg-indigo-100 text-indigo-800&apos; 
                            : &apos;bg-gray-100 text-gray-600&apos;
                      }`}>
                          {isAnswered ? &apos;✓&apos; : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-4">{q.prompt}</p>
                          
                          {/* Rating Questions */}
                          {q.type === &apos;rating&apos; && (
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
                                          ? &apos;bg-indigo-600 border-indigo-600 text-white&apos;
                                          : &apos;border-gray-300 hover:border-indigo-400 text-gray-700&apos;
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
                          {q.type === &apos;single&apos; && q.options && (
                            <div className="space-y-3">
                              {q.options.map((opt) => (
                            <label 
                                  key={opt.id} 
                              className={`flex cursor-pointer items-start gap-3 p-3 rounded-lg transition-colors duration-200 ${
                                    currentAnswer === opt.id
                                  ? &apos;bg-indigo-50 border-2 border-indigo-200&apos; 
                                  : &apos;hover:bg-gray-50 border-2 border-transparent&apos;
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                    checked={currentAnswer === opt.id}
                                    onChange={() => handleAnswerSelect(q.id, opt.id)}
                              />
                                  <span className={`text-sm ${currentAnswer === opt.id ? &apos;text-indigo-900 font-medium&apos; : &apos;text-gray-700&apos;}`}>
                                {opt.label}
                              </span>
                            </label>
                          ))}
                        </div>
                          )}

                          {/* Multi-Select Questions */}
                          {q.type === &apos;multi&apos; && q.options && (
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
                                        ? &apos;bg-indigo-50 border-2 border-indigo-200&apos; 
                                        : canSelect
                                          ? &apos;hover:bg-gray-50 border-2 border-transparent&apos;
                                          : &apos;opacity-50 cursor-not-allowed border-2 border-transparent&apos;
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                                      checked={isSelected}
                                      disabled={!canSelect}
                                      onChange={(e) => handleMultiSelect(q.id, opt.id, e.target.checked)}
                                    />
                                    <span className={`text-sm ${isSelected ? &apos;text-indigo-900 font-medium&apos; : &apos;text-gray-700&apos;}`}>
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
                      Please answer {unansweredCount} more question{unansweredCount > 1 ? &apos;s&apos; : &apos;&apos;} to discover your speaker type.
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
                        Great job completing the core assessment! Now let&apos;s gather some additional details to create my personalized growth plan.
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
              <p className="text-sm text-gray-600 mb-4">Here&apos;s a quick overview of how you answered the assessment:</p>
              <div className="grid gap-3">
                {QUESTIONS.map((q, index) => {
                  const answer = answers[q.id];
                  let answerText = &apos;No answer selected&apos;;
                  
                  if (q.type === &apos;rating&apos; && typeof answer === &apos;number&apos;) {
                    answerText = `${answer}/10`;
                  } else if (q.type === &apos;single&apos; && typeof answer === &apos;string&apos; && q.options) {
                    const option = q.options.find(opt => opt.id === answer);
                    answerText = option?.label || answer;
                  } else if (q.type === &apos;multi&apos; && Array.isArray(answer) && q.options) {
                    const selectedOptions = answer.map(id => {
                      const option = q.options!.find(opt => opt.id === id);
                      return option?.label || id;
                    });
                    answerText = selectedOptions.join(&apos;, &apos;);
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