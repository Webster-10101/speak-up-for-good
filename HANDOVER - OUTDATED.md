# Handover - January 17, 2026

## 1. Project Summary

Next.js 14 speaking coach platform with quiz funnel, admin CRM, and interactive speaking drills. Today's session added a `/comedians` landing page targeting stand-up performers for Edinburgh Fringe and beyond.

## 2. Current State

**Complete:**
- `/comedians` landing page (SEO-optimized, 4 service pillars, FAQ, testimonials)
- `/performers` → `/comedians` redirect
- Homepage FAQ linking to comedians page
- All code committed and deployed to Vercel
- Git branches cleaned up (just `main` now)

**In Progress:**
- Speaking drills exist but are messy and need tidying (conviction-workout, five-minute-reset, metaphor-practice)
- Drills nav link still commented out in `Navigation.tsx:80-86`

**Not Started:**
- Drills distribution strategy (free vs gated vs paid)
- Analytics/tracking on drills
- Quiz → drills funnel integration

## 3. Key Decisions & Assumptions

- Comedians page uses wry/straight tone, not warm/earnest
- Material/ideas coaching included (not just nerves/delivery)
- Edinburgh framing but online-first offering
- Reused existing testimonials (no comedian-specific ones yet)
- Single-file page pattern (matches `/freelancing-for-good`)
- Calendly external links, not embeds

## 4. Next Steps (Ordered)

1. [ ] Tidy speaking drills code (user mentioned they're messy)
2. [ ] Decide drills distribution model (see old HANDOVER strategic options)
3. [ ] Uncomment drills nav link when ready to go public
4. [ ] Get comedian-specific testimonials for `/comedians` page
5. [ ] Consider adding comedians page to main nav

## 5. Relevant Context & Files

**Comedians page:**
- `app/comedians/page.tsx` - Server component with SEO metadata
- `app/comedians/ComediansContent.tsx` - Client component with content
- `next.config.js` - Has `/performers` redirect

**Homepage FAQ update:**
- `components/FAQ.tsx` - Last item links to `/comedians`

**Speaking drills:**
- `app/speaking-drills/` - Hub + 3 drills
- `components/DrillSession.tsx`, `components/DrillTimer.tsx` - Shared components
- `components/Navigation.tsx:80-86` - Commented out nav link

**Key commands:**
```bash
npm run dev      # Dev server on :3000
npm run build    # Production build
git push         # Deploys to Vercel automatically
```

**URLs:**
- Production: speakupforgood.com
- Repo: github.com/Webster-10101/speak-up-for-good

## 6. Open Questions / Risks

- Drills need cleanup before public launch
- No comedian-specific testimonials yet
- Drills distribution model undecided (free/gated/paid)

## 7. Quiz Code Quality Notes

The speaker quiz works but has some technical debt worth addressing if time permits:

**Duplicated logic:**
- `calculateSlidingScales` exists in both `app/speaker-quiz/results/page.tsx` and `app/api/speaker-quiz/route.ts` — should be extracted to a shared util

**Duplicated question text:**
- Question labels defined in both `app/speaker-quiz/page.tsx` and `components/SessionHistoryModal.tsx` — changes require updating both files

**Possible type bug:**
- `results/page.tsx:87` treats `q4` as a number, but q4 is a single-select (string) question — may be legacy handling or a bug worth investigating

**Minor cleanup:**
- Debug `console.log` statements left in `results/page.tsx:23,26`
- Uses `alert()` for error handling (`results/page.tsx:62,66`) — not great UX

**Data passing:**
- Answers passed via URL search params — could hit length limits with more data in future

---

## If I Had 60 Minutes

1. **10 min** - Run `npm run dev`, review `/comedians` page and `/speaking-drills` hub
2. **20 min** - Tidy the speaking drills code (user said they're messy)
3. **15 min** - Discuss with user: ready to uncomment drills nav link?
4. **15 min** - If yes, uncomment nav, test, commit, push
