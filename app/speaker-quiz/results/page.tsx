&apos;use client&apos;;

import { useState, useEffect } from &apos;react&apos;;
import { useRouter, useSearchParams } from &apos;next/navigation&apos;;

export default function QuizResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(&apos;&apos;);
  const [firstName, setFirstName] = useState(&apos;&apos;);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(&apos;&apos;);

  // Get data from URL params
  const archetype = searchParams.get(&apos;archetype&apos;);
  const mainAnswers = searchParams.get(&apos;answers&apos;);
  const optionalAnswers = searchParams.get(&apos;optionalAnswers&apos;);

  useEffect(() => {
    // Redirect if missing required data
    if (!archetype || !mainAnswers) {
      console.log(&apos;Missing data, redirecting to quiz:&apos;, { archetype, mainAnswers });
      router.push(&apos;/speaker-quiz&apos;);
    } else {
      console.log(&apos;Results page loaded with data:&apos;, { archetype, mainAnswers, optionalAnswers });
    }
  }, [archetype, mainAnswers, optionalAnswers, router]);

  async function handleGetPlan() {
    if (!archetype || !email || !firstName) return;

    setLoading(true);
    try {
      const response = await fetch(&apos;/api/speaker-quiz&apos;, {
        method: &apos;POST&apos;,
        headers: { &apos;Content-Type&apos;: &apos;application/json&apos; },
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
        setSuccessMessage(data.message || &apos;Check your email for your personalised Speaker Growth Plan!&apos;);
      } else {
        console.error(&apos;Failed to submit answers&apos;);
        alert(&apos;There was an error submitting your answers. Please try again.&apos;);
      }
    } catch (error) {
      console.error(&apos;Error submitting answers:&apos;, error);
      alert(&apos;There was an error submitting your answers. Please try again.&apos;);
    } finally {
      setLoading(false);
    }
  }

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === &apos;Enter&apos; && email && firstName && !loading) {
      handleGetPlan();
    }
  };

  // Calculate sliding scale metrics from answers (simplified archetype calculation)
  function calculateSlidingScales(answers: Record<string, any>): Record<string, number> {
    const q1 = Array.isArray(answers.q1) ? answers.q1 : [];
    const q2 = answers.q2 || &apos;relax&apos;;
    const q3 = typeof answers.q3 === &apos;number&apos; ? answers.q3 : 5;
    const q4 = typeof answers.q4 === &apos;number&apos; ? answers.q4 : 5;
    const q5 = typeof answers.q5 === &apos;number&apos; ? answers.q5 : 5;
    const q6 = typeof answers.q6 === &apos;number&apos; ? answers.q6 : 5;
    const q7 = typeof answers.q7 === &apos;number&apos; ? answers.q7 : 5;
    const q8 = typeof answers.q8 === &apos;number&apos; ? answers.q8 : 5;
    const q9 = Array.isArray(answers.q9) ? answers.q9 : [];

    // Simple archetype scoring for sliding scales
    const archhetypeBoosts = {
      rambler: (q1.includes(&apos;rambler&apos;) ? 3 : 0) + (q9.includes(&apos;improv&apos;) ? 2 : 0),
      overthinker: (q1.includes(&apos;overthinker&apos;) ? 3 : 0) + (q9.includes(&apos;overprepare&apos;) ? 2 : 0),
      doubter: q1.includes(&apos;doubter&apos;) ? 3 : 0,
      pleaser: q1.includes(&apos;pleaser&apos;) ? 3 : 0,
      performer: (q1.includes(&apos;performer&apos;) ? 3 : 0) + (q9.includes(&apos;polish&apos;) ? 2 : 0),
      intense: (q1.includes(&apos;intense&apos;) ? 3 : 0) + (q9.includes(&apos;improv&apos;) ? 1 : 0),
      rationalist: (q1.includes(&apos;rationalist&apos;) ? 3 : 0) + (q9.includes(&apos;structure&apos;) ? 2 : 0),
      minimalist: q1.includes(&apos;minimalist&apos;) ? 3 : 0
    };

    const isLow = (val: number) => val <= 4;
    const isHigh = (val: number) => val >= 7;

    return {
      clearness: Math.min(100, Math.max(0, 
        (q6 * 8) + 
        (archhetypeBoosts.rationalist + archhetypeBoosts.minimalist) * 3 -
        archhetypeBoosts.rambler * 2 +
        (isHigh(q6) ? 10 : 0)
      )),
      spontaneity: Math.min(100, Math.max(0,
        (q5 * 8) + 
        (archhetypeBoosts.rambler + archhetypeBoosts.intense) * 2.5 -
        (archhetypeBoosts.overthinker + archhetypeBoosts.doubter) * 3 +
        (q2 === &apos;speed&apos; ? 15 : q2 === &apos;freeze&apos; ? -15 : 0)
      )),
      expressiveness: Math.min(100, Math.max(0,
        (q2 === &apos;speed&apos; || q2 === &apos;jitter&apos; ? 65 : q2 === &apos;relax&apos; ? 45 : q2 === &apos;freeze&apos; ? 25 : 35) +
        (archhetypeBoosts.intense + archhetypeBoosts.performer) * 3 -
        (archhetypeBoosts.minimalist + archhetypeBoosts.rationalist) * 2.5 +
        (isLow(q4) ? 10 : isHigh(q4) ? -5 : 0)
      )),
      authenticity: Math.min(100, Math.max(0,
        ((11 - q7) * 8) + 
        (archhetypeBoosts.doubter + archhetypeBoosts.minimalist + archhetypeBoosts.overthinker) * 2.5 -
        archhetypeBoosts.performer * 4 +
        (isLow(q7) ? 15 : isHigh(q7) ? -10 : 0)
      )),
      energy: Math.min(100, Math.max(0,
        (q3 * 9) + 
        (archhetypeBoosts.intense + archhetypeBoosts.performer + archhetypeBoosts.rambler) * 2.5 -
        (archhetypeBoosts.minimalist + archhetypeBoosts.rationalist + archhetypeBoosts.overthinker) * 2 +
        (q2 === &apos;speed&apos; || q2 === &apos;jitter&apos; ? 10 : q2 === &apos;freeze&apos; ? -10 : 0)
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
    &apos;rambler&apos;: {
      title: &apos;The Rambler&apos;,
      description: &apos;You\&apos;ve got energy to spare. When you talk, ideas tumble out fast and furious, and people can feel the spark. The trouble is, that spark sometimes sets everything on fire at once — words rush out, sentences spiral, and clarity gets lost in the noise.&apos;,
      introText: &apos;At its heart, rambling isn\&apos;t a flaw. It\&apos;s usually a response to pressure — the silence feels heavy, so you fill it. You hope clarity will appear halfway through the sentence. And sometimes it does. Other times, your audience is left spinning or disengaged.&apos;,
      strengths: [
        &apos;You have momentum — you never get stuck for long.&apos;,
        &apos;You\&apos;re spontaneous — quick to grab ideas and run with them.&apos;,
        &apos;You\&apos;re courageous — you\&apos;re not afraid to open your mouth even when you\&apos;re unsure.&apos;
      ],
      growthAreas: [
        &apos;Pause on purpose. Treat silence as a tool, not a failure. It makes your words hit harder.&apos;,
        &apos;Pick one arrow. Before you speak, ask: what\&apos;s the one thing I want them to take away? Aim for that and return to that.&apos;,
        &apos;Wrap it up cleanly. End with a clear prompt — something like &quot;And that\&apos;s what matters most.&quot; No trailing off.&apos;
      ],
      whereItShowsUp: [
        &apos;Work presentation: You\&apos;ve got loads of ideas, so you throw them all in at once. Colleagues are left nodding politely but not really sure what the main point was.&apos;,
        &apos;Q&A session: Someone asks a tricky question, and instead of pausing, you launch into a stream of half-answers, hoping clarity will appear along the way - people start to zone out.&apos;,
        &apos;Casual conversation: You get excited telling a story but keep looping back, adding side details, until the punchline gets buried.&apos;
      ],
      finalThought: &apos;Your energy is infectious, but people need clarity and space to follow you. When you learn to land your ideas as powerfully as you generate them, you stop being &quot;the one who talks a lot&quot; — and start being the one everyone remembers.&apos;
    },
    &apos;overthinker&apos;: {
      title: &apos;The Overthinker&apos;,
      description: &apos;You\&apos;ve got plenty to say — but when the spotlight\&apos;s on, you tend to freeze. Instead of speaking freely, you start running mental checks: Is this the right answer? Am I saying it perfectly? Before you know it, the moment has passed.&apos;,
      introText: &apos;Overthinking doesn\&apos;t mean you lack ideas. Quite the opposite. You\&apos;ve got depth and clarity when you relax. The problem is the inner critic — that little voice that treats every word like it\&apos;s being marked in an exam.&apos;,
      strengths: [
        &apos;You\&apos;re thoughtful — your answers carry weight when you let them out.&apos;,
        &apos;You\&apos;re authentic — people trust you when you drop the perfection filter.&apos;,
        &apos;You\&apos;re sharp — your ability to analyse and organise makes you credible and clear.&apos;
      ],
      growthAreas: [
        &apos;Trust the first thought. Don\&apos;t wait for the perfect answer — speak, then refine if needed. Not everything you say has to be super valuable.&apos;,
        &apos;Let silence breathe. Pauses aren\&apos;t proof you\&apos;re stuck. They make you look thoughtful and confident.&apos;,
        &apos;Feel it, don\&apos;t just think it. Bring emotion into your words. People remember what you make them feel more than what you make them think.&apos;
      ],
      whereItShowsUp: [
        &apos;A Job interview: You pause too long before answering because you\&apos;re trying to craft the &quot;perfect&quot; reply. You never get into the flow so your answers are stilted and stiff.&apos;,
        &apos;Team meeting: Someone asks your opinion. You\&apos;ve got a clear idea, but you hesitate, edit yourself, then finally share something watered down.&apos;,
        &apos;Social gathering: You want to contribute to a lively chat, but by the time you\&apos;ve figured out how to phrase it, the conversation has already moved on.&apos;
      ],
      finalThought: &apos;Your thoughtfulness is a strength, if used wisely. When you stop trying to get it &quot;right&quot; and start letting it flow, people will see the real you — intelligent, flowing, and worth listening to.&apos;
    },
    &apos;doubter&apos;: {
      title: &apos;The Self-Doubter&apos;,
      description: &apos;You know your stuff, but when it\&apos;s time to speak, you tend to shrink back. Maybe you start with an implied or a real apology (&quot;I might not explain this well…&quot;) or trail off before finishing strong. It\&apos;s not that you don\&apos;t have ideas — it\&apos;s that fear of judgment makes you play small.&apos;,
      introText: &apos;Self-doubt doesn\&apos;t mean you\&apos;re weak. It just means you care. You want to get it right, you want people to value what you say. But the more you worry about how you come across, and how others are reacting, the harder it is to fully commit and actually trust yourself.&apos;,
      strengths: [
        &apos;You\&apos;re empathetic — tuned in to how others feel.&apos;,
        &apos;You\&apos;re authentic — people relate to your honesty and humility.&apos;,
        &apos;You\&apos;re resilient — the fear of slipping up makes you better at bouncing back.&apos;
      ],
      growthAreas: [
        &apos;Drop the apology and bring conviction. Swap &quot;Sorry if this doesn\&apos;t make sense…&quot; with &quot;Here\&apos;s why this matters.&quot;&apos;,
        &apos;Commit to a strong end. End every point with conviction and hold the silence. Don\&apos;t let the doubt show at the end.&apos;,
        &apos;Speak from care, not fear. Instead of worrying about judgment, talk about why the subject matters to you. Be brave enough to be vulnerable and show yourself.&apos;
      ],
      whereItShowsUp: [
        &apos;Starting a presentation: You open with, &quot;I\&apos;m not sure if this makes sense…&quot; which lowers the energy and sets expectations before you\&apos;ve even begun.&apos;,
        &apos;Sharing an idea: You give a good point but trail off at the end, so you sound less confident than you really are.&apos;,
        &apos;One-to-one chat: You downplay your opinion, worried it might sound silly, even though it\&apos;s often the thing people need to hear.&apos;
      ],
      finalThought: &apos;Your voice is more powerful than you think. When you stop apologising for it and start owning it, people won\&apos;t just hear your words — they\&apos;ll feel your calm and confident conviction.&apos;
    },
    &apos;pleaser&apos;: {
      title: &apos;The People Pleaser&apos;,
      description: &apos;You care about people. You want them to like you, to feel they\&apos;ve got value from listening. That\&apos;s a gift — but it can also trap you. Instead of saying what you really think, you slip into &quot;expert mode&quot; or soften your opinions to keep everyone comfortable.&apos;,
      introText: &apos;On the surface, you look polished and professional. Underneath, it can feel a little hollow — like you\&apos;re performing a role instead of expressing your actual feelings and thoughts.&apos;,
      strengths: [
        &apos;You\&apos;re relatable — people lean in because you care.&apos;,
        &apos;You\&apos;ve got conviction — when you speak honestly, it resonates.&apos;,
        &apos;You\&apos;re adaptable — you listen well and respond in the moment.&apos;
      ],
      growthAreas: [
        &apos;Drop &quot;expert mode.&quot; Imagine you\&apos;re talking to a friend, not delivering a lecture.&apos;,
        &apos;Ask yourself why. Keep digging: why does this really matter to me? Speak from there.&apos;,
        &apos;Risk the truth. Don\&apos;t just say what people want to hear. Say what you actually believe — even if it feels riskier.&apos;
      ],
      whereItShowsUp: [
        &apos;Client pitch: You present polished, well-rehearsed points, but avoid sharing what you really think about their flawed idea — just to keep them happy.&apos;,
        &apos;Panel discussion: You stick to &quot;safe&quot; answers and skip anything that might spark disagreement, even though stronger opinions would make you stand out.&apos;,
        &apos;Everyday chat: A friend asks what you want to do, and you immediately answer, &quot;I don\&apos;t mind — whatever you prefer,&quot; even when you do have a preference.&apos;
      ],
      finalThought: &apos;People have a sixth sense for inauthenticity. So stop trying to please everyone and start thinking more about pleasing yourself. When you stop trying to please everyone and start speaking from your real convictions, you\&apos;ll unlock a superpower. Some people won\&apos;t like it - and that\&apos;s completely ok.&apos;
    },
    &apos;performer&apos;: {
      title: &apos;The Performer&apos;,
      description: &apos;You know how to put on a show. Strong delivery, polished presence, maybe even a few tricks and hacks up your sleeve. The trouble is, all that polish can sometimes get in the way. Instead of connection, people feel the performance. It looks good, but it doesn\&apos;t always feel real.&apos;,
      introText: &apos;Performers often treat speaking like a test — something to ace with flawless execution. That works up to a point, but it misses what people actually want: to feel like they\&apos;re talking to a real human who they can relate to.&apos;,
      strengths: [
        &apos;You\&apos;ve got range — you already know how to use voice and body.&apos;,
        &apos;You\&apos;ve got presence — people notice when you walk into a room.&apos;,
        &apos;You\&apos;ve got work ethic — preparation is second nature.&apos;
      ],
      growthAreas: [
        &apos;Flip the switch. Exaggerate &quot;stage mode,&quot; then relax into how you\&apos;d tell the same thing to a friend.&apos;,
        &apos;Bring the feeling. Instead of focusing on technique, ask: what do I actually feel about this? Speak from there.&apos;,
        &apos;Stay in character. If you slip up, keep going. Don\&apos;t apologise — own the moment.&apos;
      ],
      whereItShowsUp: [
        &apos;Conference talk: You deliver with polish — big gestures, perfect pacing — but the audience feels like they\&apos;re watching a show, not meeting the real you.&apos;,
        &apos;Networking event: You tell the same rehearsed joke or story, but it comes out a little mechanical instead of natural.&apos;,
        &apos;Team meeting: You\&apos;re great when prepared, but if someone throws you a curveball, you stumble because you\&apos;re relying on your script or rigid routine.&apos;
      ],
      finalThought: &apos;Your polish is impressive, but your presence is what people remember. When you drop the act and let yourself be real, you stop being just &quot;good on stage&quot; - and start connecting and communicating authentically. A truly powerful combo.&apos;
    },
    &apos;intense&apos;: {
      title: &apos;The Intense Speaker&apos;,
      description: &apos;When you speak, people feel it. There\&apos;s power in your voice, conviction in your delivery, and no one\&apos;s left wondering where you stand. But sometimes that intensity comes on so strong it can be overwhelming. Everything feels high-stakes, all the time — leaving little space for lightness, contrast, or play.&apos;,
      introText: &apos;At its root, intensity often comes from fear of losing control. If you ease up, will people still take you seriously? The truth: yes. In fact, they\&apos;ll connect more deeply when you show range and are able to be human.&apos;,
      strengths: [
        &apos;You\&apos;ve got conviction — people know you mean what you say.&apos;,
        &apos;You\&apos;ve got momentum — your energy carries you into flow quickly.&apos;,
        &apos;You\&apos;ve got creativity — your force shakes up stale thinking.&apos;
      ],
      growthAreas: [
        &apos;Play with contrast. Try saying something at full volume and energy, then again in a quiet, calm tone. Notice how both land.&apos;,
        &apos;Pause on purpose. A few seconds of silence can be more powerful than charging ahead.&apos;,
        &apos;Add lightness. Not everything has to be serious. A moment of humour or curiosity makes your intensity even sharper when you bring it back. Experiment with being playful.&apos;
      ],
      whereItShowsUp: [
        &apos;Boardroom presentation: You go full throttle from the start — serious tone, rapid delivery — leaving no breathing room for the audience.&apos;,
        &apos;Debate or discussion: Even on light topics, you come across as forceful, which can make others back down rather than engage.&apos;,
        &apos;Casual chat: Someone cracks a joke, but you respond with heavy seriousness, missing the chance to show your lighter side.&apos;
      ],
      finalThought: &apos;Your passion is undeniable. But passion with contrast — highs and lows — is what keeps people hooked. When you balance your fire with calm, you don\&apos;t lose power. You gain contrast and impact.&apos;
    },
    &apos;rationalist&apos;: {
      title: &apos;The Rationalist&apos;,
      description: &apos;You like things to make sense. Clear structure, solid logic, everything in order. That gives you credibility — people trust that you\&apos;ve done your thinking. But it can also make you sound a little flat. Too many summaries, too much abstraction, and not enough of you.&apos;,
      introText: &apos;Rationalists often believe that showing emotion risks losing authority. So you keep things safe, factual, tidy. The result: people nod along, but they don\&apos;t always feel it. And with that you miss the chance to make changes happen.&apos;,
      strengths: [
        &apos;You\&apos;re clear — people understand complex ideas when you explain them.&apos;,
        &apos;You\&apos;re credible — accuracy makes you trustworthy.&apos;,
        &apos;You\&apos;ve got conviction — when you care, your clarity of thought becomes persuasive.&apos;
      ],
      growthAreas: [
        &apos;Tell it like it happened. Share stories in the present tense with detail and feeling, not just the summary.&apos;,
        &apos;Add musicality. Play with tone — calm, joyful, frustrated — instead of staying monotone.&apos;,
        &apos;Switch off &quot;lecture mode.&quot; Imagine you\&apos;re exploring an idea with a peer, not delivering a report.&apos;
      ],
      whereItShowsUp: [
        &apos;Work update: You summarise everything neatly, but colleagues feel disconnected because you left out the human story behind it.&apos;,
        &apos;Conference Q&A: You give a technically correct, detailed answer that\&apos;s hard to follow — people get lost in the detail instead of the message.&apos;,
        &apos;Everyday story: A friend asks about your holiday. You list facts — &quot;We went to three cities, saw these sights&quot; — but skip the funny or emotional moments and little details that would bring it to life.&apos;
      ],
      finalThought: &apos;Your clarity makes you reliable and trustworthy. But clarity with emotion can make you compelling and more impactful. When you let people feel your ideas as well as understand them, you move from being listened to — to being able to influence and persuade others.&apos;
    },
    &apos;minimalist&apos;: {
      title: &apos;The Minimalist&apos;,
      description: &apos;You probably already know this about yourself: you don\&apos;t say more than you need to. You get to the point, keep it short, maybe even cut things off before they\&apos;re fully formed. On the surface, that can look calm and collected — but if you\&apos;re honest, it often comes from holding back.&apos;,
      introText: &apos;Minimalists keep their cards close to their chests. Instead of sharing the messy, human details — the real story, the real feeling, the vulnerabilities — you summarise at a safe distance. It\&apos;s not that you don\&apos;t have things to say. It\&apos;s that saying less feels safer than saying too much.&apos;,
      strengths: [
        &apos;You naturally bring focus. People listen when you speak because you\&apos;re not wasting words. Everything you say has gone through a (usually far too strict) value filter.&apos;,
        &apos;You hold composure under pressure — you don\&apos;t panic, you don\&apos;t overshare. That\&apos;s rare. You deliver more value in ten words than others do in ten minutes.&apos;,
        &apos;And when you do add emotion or detail, it lands harder, because people aren\&apos;t expecting it.&apos;
      ],
      growthAreas: [
        &apos;Add one more layer. When you tell a story, don\&apos;t stop at the headline. Add the detail that feels a little too personal, or the feeling you\&apos;d normally skip.&apos;,
        &apos;Trust the first idea. You don\&apos;t need to perfect or edit in your head before speaking. Try blurting it out and having fun finding the meaning or fleshing out the idea.&apos;,
        &apos;Finish with strength. Instead of trailing off, choose a clear closing line and let the silence do the work. People remember how you end.&apos;
      ],
      whereItShowsUp: [
        &apos;Team discussion: You make one short comment and stop, even though you had more to say. The group moves on, missing your insight. Or you wait your turn, which never comes.&apos;,
        &apos;Presentation close: You make your point then finish with a half-sentence or trail off, so the ending feels flat instead of strong.&apos;,
        &apos;Casual storytelling: A friend asks how your weekend was. You answer, &quot;Yeah, it was good thanks, how was yours,&quot; when you actually have some stories or moments you could share.&apos;
      ],
      finalThought: &apos;Minimalists often worry about saying too much, which if we\&apos;re honest, is simply not a danger for you. That gives you the freedom to push it and say more. When you open up and let people see what\&apos;s underneath, let people see more of you, and you\&apos;ll get so much more back in return.&apos;
    },
    // Legacy capitalized format for backward compatibility - reference new rich content
    &apos;Rambler&apos;: {
      title: &apos;The Rambler&apos;,
      description: &apos;You\&apos;ve got energy to spare. When you talk, ideas tumble out fast and furious, and people can feel the spark. The trouble is, that spark sometimes sets everything on fire at once — words rush out, sentences spiral, and clarity gets lost in the noise.&apos;,
      introText: &apos;At its heart, rambling isn\&apos;t a flaw. It\&apos;s usually a response to pressure — the silence feels heavy, so you fill it. You hope clarity will appear halfway through the sentence. And sometimes it does. Other times, your audience is left spinning or disengaged.&apos;,
      strengths: [
        &apos;You have momentum — you never get stuck for long.&apos;,
        &apos;You\&apos;re spontaneous — quick to grab ideas and run with them.&apos;,
        &apos;You\&apos;re courageous — you\&apos;re not afraid to open your mouth even when you\&apos;re unsure.&apos;
      ],
      growthAreas: [
        &apos;Pause on purpose. Treat silence as a tool, not a failure. It makes your words hit harder.&apos;,
        &apos;Pick one arrow. Before you speak, ask: what\&apos;s the one thing I want them to take away? Aim for that and return to that.&apos;,
        &apos;Wrap it up cleanly. End with a clear prompt — something like &quot;And that\&apos;s what matters most.&quot; No trailing off.&apos;
      ],
      whereItShowsUp: [
        &apos;Work presentation: You\&apos;ve got loads of ideas, so you throw them all in at once. Colleagues are left nodding politely but not really sure what the main point was.&apos;,
        &apos;Q&A session: Someone asks a tricky question, and instead of pausing, you launch into a stream of half-answers, hoping clarity will appear along the way - people start to zone out.&apos;,
        &apos;Casual conversation: You get excited telling a story but keep looping back, adding side details, until the punchline gets buried.&apos;
      ],
      finalThought: &apos;Your energy is infectious, but people need clarity and space to follow you. When you learn to land your ideas as powerfully as you generate them, you stop being &quot;the one who talks a lot&quot; — and start being the one everyone remembers.&apos;
    },
    &apos;Overthinker&apos;: {
      title: &apos;The Overthinker&apos;,
      description: &apos;You\&apos;re thorough and thoughtful, but can get stuck in analysis paralysis.&apos;,
      strengths: [&apos;Well-prepared and detailed&apos;, &apos;Thoughtful and precise&apos;, &apos;Credible and reliable&apos;],
      growthAreas: [&apos;Moving from preparation to action&apos;, &apos;Trusting your instincts&apos;, &apos;Speaking spontaneously&apos;]
    },
    &apos;Self-Doubter&apos;: {
      title: &apos;The Self-Doubter&apos;,
      description: &apos;You have valuable insights but tend to undervalue your expertise.&apos;,
      strengths: [&apos;Humble and relatable&apos;, &apos;Thoughtful listener&apos;, &apos;Authentic and genuine&apos;],
      growthAreas: [&apos;Building confidence&apos;, &apos;Owning your expertise&apos;, &apos;Speaking with authority&apos;]
    },
    &apos;People Pleaser&apos;: {
      title: &apos;The People Pleaser&apos;,
      description: &apos;You\&apos;re collaborative and warm, but sometimes dilute your message to avoid conflict.&apos;,
      strengths: [&apos;Empathetic and inclusive&apos;, &apos;Good at building consensus&apos;, &apos;Creates safe spaces&apos;],
      growthAreas: [&apos;Standing firm on important points&apos;, &apos;Healthy conflict navigation&apos;, &apos;Clear boundaries&apos;]
    },
    &apos;Performer&apos;: {
      title: &apos;The Performer&apos;,
      description: &apos;You\&apos;re charismatic and polished, but sometimes prioritize style over substance.&apos;,
      strengths: [&apos;Confident and engaging&apos;, &apos;Natural stage presence&apos;, &apos;Memorable delivery&apos;],
      growthAreas: [&apos;Balancing style with substance&apos;, &apos;Authentic vulnerability&apos;, &apos;Deep connection&apos;]
    },
    &apos;Intense Speaker&apos;: {
      title: &apos;The Intense Speaker&apos;,
      description: &apos;You have powerful presence and strong convictions, but can sometimes overwhelm others.&apos;,
      strengths: [&apos;Passionate and compelling&apos;, &apos;Strong leadership presence&apos;, &apos;Drives action&apos;],
      growthAreas: [&apos;Moderating intensity&apos;, &apos;Reading audience energy&apos;, &apos;Creating space for others&apos;]
    },
    &apos;Rationalist&apos;: {
      title: &apos;The Rationalist&apos;,
      description: &apos;You\&apos;re highly credible and logical, but can feel dry without human connection.&apos;,
      strengths: [&apos;Data-driven and credible&apos;, &apos;Clear and logical&apos;, &apos;Trustworthy expert&apos;],
      growthAreas: [&apos;Adding emotional connection&apos;, &apos;Storytelling and examples&apos;, &apos;Engaging delivery&apos;]
    },
    &apos;Minimalist&apos;: {
      title: &apos;The Minimalist&apos;,
      description: &apos;You\&apos;re precise and purposeful — you say exactly what needs to be said without excess.&apos;,
      strengths: [&apos;Clear and direct&apos;, &apos;Efficient communication&apos;, &apos;Purposeful delivery&apos;],
      growthAreas: [&apos;Adding warmth and connection&apos;, &apos;Engaging through stories&apos;, &apos;Reading audience needs&apos;]
    }
  };

  const currentArchetype = archetypeDescriptions[archetype || &apos;&apos;];

  if (!archetype || !currentArchetype) {
    return (
      <div className=&quot;min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center&quot;>
        <div className=&quot;text-center&quot;>
          <div className=&quot;text-xl text-gray-600&quot;>Loading your results...</div>
        </div>
      </div>
    );
  }

  return (
    <main className=&quot;min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100&quot;>
      <div className=&quot;container mx-auto px-4 py-8&quot;>
        {!successMessage ? (
          <>
            {/* Results Display */}
            <div className=&quot;max-w-4xl mx-auto&quot;>
              <div className=&quot;text-center mb-12&quot;>
                <h1 className=&quot;text-5xl font-bold text-gray-900 mb-8&quot;>
                  Your Speaker Archetype
                </h1>
                <div className=&quot;bg-white rounded-xl shadow-lg p-10 mb-8&quot;>
                  <div className=&quot;text-center mb-10&quot;>
                    <h2 className=&quot;text-3xl font-bold text-indigo-600 mb-8&quot;>
                      {currentArchetype.title}
                    </h2>
                    <div className=&quot;space-y-4 max-w-3xl mx-auto&quot;>
                      <p className=&quot;text-xl text-gray-700 leading-relaxed&quot;>
                        {currentArchetype.description}
                      </p>
                      {(currentArchetype as any).introText && (
                        <p className=&quot;text-lg text-gray-600 leading-relaxed&quot;>
                          {(currentArchetype as any).introText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Where it shows up section */}
                  {(currentArchetype as any).whereItShowsUp && (
                    <div className=&quot;mb-8&quot;>
                      <h3 className=&quot;text-2xl font-semibold text-gray-800 mb-6 text-center&quot;>Where you might recognize this</h3>
                      <div className=&quot;bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100&quot;>
                        <div className=&quot;space-y-6 text-left&quot;>
                          {(currentArchetype as any).whereItShowsUp.map((example: string, index: number) => (
                            <div key={index} className=&quot;flex items-start space-x-4&quot;>
                              <div className=&quot;flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1&quot;>
                                <span className=&quot;text-indigo-600 font-semibold text-sm&quot;>{index + 1}</span>
                              </div>
                              <p className=&quot;text-gray-700 leading-relaxed text-left&quot;>{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className=&quot;grid md:grid-cols-2 gap-8&quot;>
                    <div className=&quot;bg-green-50 rounded-xl p-6 border border-green-100&quot;>
                      <h3 className=&quot;text-xl font-bold text-green-800 mb-6 text-center&quot;>✨ Your Strengths</h3>
                      <ul className=&quot;space-y-4 text-left&quot;>
                        {currentArchetype.strengths.map((strength, index) => (
                          <li key={index} className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;flex-shrink-0 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5&quot;>
                              <span className=&quot;text-green-700 text-sm font-bold&quot;>✓</span>
                            </div>
                            <span className=&quot;text-gray-700 leading-relaxed text-left&quot;>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className=&quot;bg-blue-50 rounded-xl p-6 border border-blue-100&quot;>
                      <h3 className=&quot;text-xl font-bold text-blue-800 mb-6 text-center&quot;>🎯 Where to Grow</h3>
                      <ul className=&quot;space-y-4 text-left&quot;>
                        {currentArchetype.growthAreas.map((area, index) => (
                          <li key={index} className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mt-0.5&quot;>
                              <span className=&quot;text-blue-700 text-sm font-bold&quot;>→</span>
                            </div>
                            <span className=&quot;text-gray-700 leading-relaxed text-left&quot;>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Final thought */}
                  {(currentArchetype as any).finalThought && (
                    <div className=&quot;mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200&quot;>
                      <div className=&quot;text-center&quot;>
                        <div className=&quot;inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4&quot;>
                          <span className=&quot;text-2xl&quot;>💡</span>
                        </div>
                        <h3 className=&quot;text-xl font-bold text-amber-800 mb-4&quot;>Key Insight</h3>
                        <p className=&quot;text-gray-700 leading-relaxed text-lg italic max-w-2xl mx-auto&quot;>
                          &quot;{(currentArchetype as any).finalThought}&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Speaking Style Profile */}
                {mainAnswers && (
                  <div className=&quot;bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto&quot;>
                    <h3 className=&quot;text-2xl font-bold text-gray-900 mb-6 text-center&quot;>Your Speaking Style Profile</h3>
                    <p className=&quot;text-gray-600 mb-6 text-center max-w-2xl mx-auto&quot;>
                      Based on your quiz responses, here&apos;s how you lean on key speaking dimensions:
                    </p>
                    <div className=&quot;space-y-6 max-w-2xl mx-auto&quot;>
                      {(() => {
                        const parsedAnswers = JSON.parse(mainAnswers);
                        const slidingScales = calculateSlidingScales(parsedAnswers);
                        const scales = [
                          { key: &apos;clearness&apos;, leftLabel: &apos;Confusing&apos;, rightLabel: &apos;Clear&apos;, description: &apos;How directly you communicate your ideas&apos; },
                          { key: &apos;spontaneity&apos;, leftLabel: &apos;Cautious&apos;, rightLabel: &apos;Spontaneous&apos;, description: &apos;How quickly you speak without editing&apos; },
                          { key: &apos;expressiveness&apos;, leftLabel: &apos;Expressive&apos;, rightLabel: &apos;Reserved&apos;, description: &apos;Your emotional range and vividness&apos; },
                          { key: &apos;authenticity&apos;, leftLabel: &apos;Authentic&apos;, rightLabel: &apos;Performance&apos;, description: &apos;How &quot;real&quot; vs polished you feel when speaking&apos; },
                          { key: &apos;energy&apos;, leftLabel: &apos;High Energy&apos;, rightLabel: &apos;Calm&apos;, description: &apos;Your overall intensity and presence&apos; }
                        ];

                        return scales.map((scale) => {
                          const value = slidingScales[scale.key as keyof typeof slidingScales];
                          const isLeftSide = value > 50;
                          return (
                            <div key={scale.key} className=&quot;bg-gray-50 rounded-lg p-4&quot;>
                              <div className=&quot;flex justify-between text-sm font-medium text-gray-700 mb-2&quot;>
                                <span className={isLeftSide ? &apos;text-indigo-600 font-semibold&apos; : &apos;&apos;}>{scale.leftLabel}</span>
                                <span className={!isLeftSide ? &apos;text-indigo-600 font-semibold&apos; : &apos;&apos;}>{scale.rightLabel}</span>
                              </div>
                              <div className=&quot;relative mb-3&quot;>
                                <div className=&quot;w-full bg-gray-200 rounded-full h-3&quot;>
                                  <div 
                                    className=&quot;bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out&quot;
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                                <div 
                                  className=&quot;absolute top-0 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full transform -translate-y-0.5 transition-all duration-1000 ease-out&quot;
                                  style={{ left: `calc(${value}% - 8px)` }}
                                ></div>
                              </div>
                              <div className=&quot;flex justify-between items-center&quot;>
                                <p className=&quot;text-xs text-gray-600&quot;>{scale.description}</p>
                                <span className=&quot;text-sm font-medium text-indigo-600&quot;>
                                  {Math.round(value)}% {isLeftSide ? scale.leftLabel.toLowerCase() : scale.rightLabel.toLowerCase()}
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
              <div className=&quot;bg-white rounded-xl shadow-lg p-8 text-center&quot;>
                <h3 className=&quot;text-2xl font-bold text-gray-900 mb-4&quot;>
                  Get Your Personalized Growth Plan
                </h3>
                <p className=&quot;text-gray-600 mb-6 max-w-2xl mx-auto&quot;>
                  I&apos;ll send you a detailed action plan with specific exercises and strategies 
                  tailored to your {currentArchetype.title} speaking style.
                </p>

                <div className=&quot;max-w-lg mx-auto space-y-4&quot;>
                  <div className=&quot;flex gap-3&quot;>
                    <input
                      type=&quot;text&quot;
                      placeholder=&quot;First name&quot;
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className=&quot;flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none&quot;
                    />
                    <input
                      type=&quot;email&quot;
                      placeholder=&quot;Email address&quot;
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className=&quot;flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none&quot;
                    />
                  </div>
                  <button
                    onClick={handleGetPlan}
                    disabled={!email || !firstName || loading}
                    className=&quot;w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200&quot;
                  >
                    {loading ? &apos;Sending Your Plan...&apos; : &apos;Get My Personalized Growth Plan&apos;}
                  </button>
                </div>

                <p className=&quot;text-xs text-center text-gray-500 mt-4&quot;>
                  You&apos;ll also join the Speak Up For Good newsletter with weekly speaking tips. Unsubscribe anytime.
                </p>

                {/* Secondary CTA - Subtle coaching option */}
                <div className=&quot;text-center mt-6&quot;>
                  <p className=&quot;text-sm text-gray-600 mb-3&quot;>
                    Want to discuss your results personally?
                  </p>
                  <button
                    onClick={() => window.open(&apos;https://calendly.com/alistair-webster/speaker-type-chat&apos;, &apos;_blank&apos;)}
                    className=&quot;text-indigo-600 hover:text-indigo-700 font-medium text-sm underline transition-colors duration-200&quot;
                  >
                    Book a free consultation call to discuss your results
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className=&quot;max-w-2xl mx-auto text-center&quot;>
            <div className=&quot;bg-white rounded-xl shadow-lg p-8&quot;>
              <div className=&quot;text-green-600 text-6xl mb-4&quot;>✨</div>
              <h2 className=&quot;text-2xl font-bold text-gray-900 mb-4&quot;>Plan Sent!</h2>
              <p className=&quot;text-gray-600 mb-6&quot;>{successMessage}</p>
              <button
                onClick={() => router.push(&apos;/&apos;)}
                className=&quot;bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200&quot;
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
