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

---

## If I Had 60 Minutes

1. **10 min** - Run `npm run dev`, review `/comedians` page and `/speaking-drills` hub
2. **20 min** - Tidy the speaking drills code (user said they're messy)
3. **15 min** - Discuss with user: ready to uncomment drills nav link?
4. **15 min** - If yes, uncomment nav, test, commit, push
