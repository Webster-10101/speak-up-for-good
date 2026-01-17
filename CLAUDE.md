# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture Overview

This is a Next.js 14 App Router application for a speaking coach platform. It combines a marketing landing page with an interactive speaker archetype quiz and admin CRM functionality.

### Tech Stack
- **Framework**: Next.js 14 (App Router with server/client components)
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o-mini for personalized growth plans
- **Email**: Resend (transactional) + MailerLite (list management)
- **Auth**: NextAuth.js with credentials provider (admin-only)
- **Styling**: Tailwind CSS with custom colors (primary: `#0C6173`, accent: `#2A8CA3`)

### Key Routes

- `/` - Landing page (composed of section components)
- `/speaker-quiz` - 10-question archetype quiz with scoring logic
- `/speaker-quiz/additional-questions` - Optional personalization survey
- `/speaker-quiz/results` - AI-generated results with growth plan
- `/speaking-drills` - Hub page listing available speaking drills
- `/speaking-drills/conviction-workout` - 5-minute drill for building conviction and authenticity
- `/speaking-drills/five-minute-reset` - 5-minute pre-speaking nervous system reset
- `/admin/login` - Password-protected admin login
- `/admin/coaching-hub` - CRM for managing contacts and sessions
- `/admin/quiz-responses` - Analytics and quiz response viewer

### Data Flow

**Quiz Submission** (`app/api/speaker-quiz/route.ts`):
1. Form submission with 10 questions → scoring algorithm determines archetype
2. Optional 6 additional personalization questions
3. OpenAI generates personalized growth plan (falls back to static plan on failure)
4. Resend sends email to user
5. MailerLite adds subscriber to archetype-specific group
6. Response stored in Supabase `quiz_responses` table

**Admin Panel**:
- NextAuth JWT authentication via `ADMIN_PASSWORD` env var
- Supabase queries for contacts, sessions, email management
- CRM fields: status, focus_area, notes, session history

### Speaker Archetypes (8 types)

Rambler, Overthinker, Self-Doubter, People Pleaser, Performer, Intense Speaker, Rationalist, Minimalist

Scoring in `app/speaker-quiz/page.tsx` uses Q1 for direct archetype flags (3 pts), Q2-10 for behavioral patterns, and tie-breaking logic.

### Database Schema

**quiz_responses**: email, first_name, archetype, main_answers (JSONB), optional_answers (JSONB), CRM fields (status, focus_area, notes), email tracking fields (email_status, email_sent_at, resend_email_id)

**coaching_sessions**: contact_id, session_date, session_focus, session_notes, homework_assigned, next_session_goal

### Speaking Drills

Interactive timed practice sessions at `/speaking-drills`. Each drill:
- Defines steps inline with `id`, `title`, `duration`, `type`, `instructions`, `explanation`
- Step types: `warmup` (green), `challenge` (blue), `reflection` (purple)
- Uses shared `DrillSession` and `DrillTimer` components
- To add a new drill: create page at `/app/speaking-drills/[drill-name]/page.tsx` and add card to hub

### Key Files

- `lib/supabase.ts` - Database client and TypeScript interfaces
- `app/speaker-quiz/page.tsx` - Quiz questions, scoring logic, archetype definitions
- `app/api/speaker-quiz/route.ts` - Quiz API with OpenAI integration, email sending, rate limiting
- `components/SessionWrapper.tsx` - NextAuth SessionProvider
- `components/DrillSession.tsx` - Interactive drill execution with timer and step navigation
- `components/DrillTimer.tsx` - Countdown timer component for drill steps

## Environment Variables Required

```
OPENAI_API_KEY
RESEND_API_KEY
MAILERLITE_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ADMIN_PASSWORD
NEXTAUTH_SECRET
NEXTAUTH_URL
```

## TypeScript Notes

- Target: ES5 (for browser compatibility)
- Strict mode enabled
- Path alias: `@/*` maps to project root

## Pending Work (as of Jan 2025)

**Uncommitted changes ready to push:**
- `app/speaking-drills/five-minute-reset/` - New "5-Minute Reset" drill (complete, tested)
- `app/speaking-drills/page.tsx` - Updated hub with new drill card
- `CLAUDE.md` - This documentation file

**Note:** Speaking Drills link is currently **commented out** in `components/Navigation.tsx` (lines 80-86). Drills work but aren't discoverable from the main nav yet.

**Other uncommitted files (unrelated to drills):**
- `EMAIL_MANAGEMENT_SETUP.md` - modified
- `supabase-email-tracking-migration.sql` - modified
- `fix-updated-dates.sql` - new
- `supabase-email-tracking-migration-fixed.sql` - new
