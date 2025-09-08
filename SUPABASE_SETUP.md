# 🗄️ Supabase Database Setup

This guide will help you set up Supabase to store and analyze your quiz responses.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Choose a strong database password

## Step 2: Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql` from your project
3. Paste it into the SQL Editor and click **Run**

This will create:
- ✅ `quiz_responses` table to store all quiz data
- ✅ Indexes for fast queries
- ✅ `quiz_analytics` view for insights
- ✅ Row Level Security (optional)

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:

### Add to your `.env.local` file:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Test the Integration

1. Restart your development server: `npm run dev`
2. Take the quiz at `http://localhost:3000/speaker-quiz`
3. Check your Supabase dashboard → **Table Editor** → `quiz_responses`
4. You should see your test response!

## Step 5: View Your Data

### Option A: Supabase Dashboard
- Go to **Table Editor** → `quiz_responses`
- Filter, sort, and export your data

### Option B: Custom Admin Dashboard
- Visit `http://localhost:3000/admin/quiz-responses`
- Beautiful interface with filters and analytics

## 📊 What You'll Track

Your database will store:
- **Contact Info**: Email, first name
- **Quiz Results**: Archetype, main answers, optional answers
- **Engagement**: Email sent, MailerLite added, Calendly booked
- **Analytics**: IP address, timestamps
- **Follow-up**: Track follow-up emails sent

## 🔍 Useful Queries

### See conversion rates by archetype:
```sql
SELECT * FROM quiz_analytics 
ORDER BY booking_conversion_rate DESC;
```

### Find people who haven't booked yet:
```sql
SELECT first_name, email, archetype, created_at 
FROM quiz_responses 
WHERE calendly_booked = false 
ORDER BY created_at DESC;
```

### Most popular optional questions:
```sql
SELECT 
  jsonb_object_keys(optional_answers) as question,
  COUNT(*) as responses
FROM quiz_responses 
WHERE optional_answers IS NOT NULL
GROUP BY jsonb_object_keys(optional_answers)
ORDER BY responses DESC;
```

## 🚀 You're All Set!

Your quiz now has enterprise-level data tracking. You can:
- ✅ **Prepare for client calls** by reviewing their responses
- ✅ **Track conversion rates** and optimize your funnel  
- ✅ **Follow up** with people who haven't booked
- ✅ **Analyze trends** in your audience's challenges
- ✅ **Export data** for deeper analysis

**Need help?** Check the Supabase docs or the `quiz_responses` table in your dashboard!


