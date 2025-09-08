# 🎯 Coaching Hub Setup

This guide helps you set up your expanded coaching CRM system.

## 📋 What's New

Your dashboard has been transformed into a comprehensive coaching hub with:

### ✨ New Features
- **Authentication system** - Secure login for admin access
- **Enhanced contact management** - Track leads through client journey
- **Inline editing** - Update contact information directly in the table
- **Manual contact entry** - Add contacts from sources beyond the quiz
- **Status tracking** - Lead → Call Booked → Client → Lapsed Client
- **Coaching notes** - Track focus areas, session notes, and next goals

### 🆕 New Database Columns
- **signup_source** - Quiz, LinkedIn, Calendly, Referral, Manual Entry
- **status** - Lead / Call Booked / Client / Lapsed Client  
- **focus_area** - Main coaching theme (e.g., Confidence, Storytelling)
- **last_session_focus** - What you worked on in the last session
- **next_session_goal** - Homework or next session goals
- **notes** - General coaching notes
- **updated_at** - Automatic timestamp when records are modified

## 🔐 Environment Setup

Add this to your `.env.local` file:

```bash
# Admin Authentication
ADMIN_PASSWORD=your_secure_password_here

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET=your_nextauth_secret_here

# Base URL for authentication
NEXTAUTH_URL=http://localhost:3000
```

**Generate a NextAuth secret:**
```bash
openssl rand -base64 32
```

## 🗄️ Database Migration

1. Run the updated schema in your Supabase SQL Editor
2. Copy the contents of `supabase-schema.sql` 
3. Execute in SQL Editor to add new columns and triggers

This migration is **backward compatible** - existing quiz responses will work with default values.

## 🚀 Accessing Your Coaching Hub

### Login
- Visit: `/admin/login`
- Enter your admin password
- You'll be redirected to the coaching hub

### Coaching Hub Features
- Visit: `/admin/coaching-hub`
- **Dashboard overview** with lead/client counts
- **Advanced filtering** by status and archetype  
- **Inline editing** - click any field to update
- **Add contacts** manually from any source
- **Real-time updates** with automatic timestamps

## 📊 New Analytics

The system now tracks:
- **Conversion rates** from leads to clients by source
- **Client retention** and status changes
- **Focus area patterns** across your coaching practice
- **Session tracking** for active clients

## 🔄 Migration Notes

- **Existing quiz responses** automatically get `signup_source: 'Quiz'` and `status: 'Lead'`
- **All fields are optional** except name and email
- **Archetype becomes optional** for manual entries
- **Timestamps track** both creation and modification

## 💡 Usage Tips

1. **Status Flow**: Move contacts through Lead → Call Booked → Client as they progress
2. **Focus Areas**: Use consistent terminology (e.g., "Confidence", "Storytelling", "Pausing")  
3. **Session Notes**: Keep last session and next goal brief but specific
4. **Sources**: Tag referrals and LinkedIn connections for tracking
5. **Filters**: Use status filters to focus on active clients vs leads

## 🔒 Security

- Simple password-based authentication (expandable to Google/email login)
- Session-based access control
- Database Row Level Security enabled
- Admin-only access to coaching hub

Your coaching practice now has a lightweight but powerful CRM! 🎉
