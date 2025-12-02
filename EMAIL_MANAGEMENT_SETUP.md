# Email Management System Setup

This system provides comprehensive email tracking and manual retry capabilities for the speaker quiz emails.

## Features Added

### 1. **Enhanced Email Tracking**
- Email content is now stored in the database when generated
- Email status tracking: `pending`, `sent`, `failed`, `retrying`
- Error message storage for failed emails
- Retry count tracking
- Resend email ID storage for successful sends

### 2. **Email Management API**
- **Preview**: View the exact email content that was/should be sent
- **Retry**: Manually retrigger failed email sends
- **Mark as Sent**: Manually mark emails as sent (for external sends)
- **Reset**: Reset email status back to pending

### 3. **Coaching Hub Enhancements**
- Email status column in the contacts table
- Email status filter dropdown
- Email status overview cards
- "View" button for each contact to see email details
- Email preview modal with management controls

## Setup Instructions

### 1. Run Database Migration

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Run the email tracking migration
-- (Content from supabase-email-tracking-migration.sql)
```

Or simply run:
```bash
# Copy and paste the contents of supabase-email-tracking-migration.sql into Supabase SQL Editor
```

### 2. Deploy the Changes

The following files have been updated/created:
- `lib/supabase.ts` - Updated QuizResponse interface
- `app/api/speaker-quiz/route.ts` - Enhanced email tracking
- `app/api/email-management/route.ts` - New email management API
- `components/EmailPreviewModal.tsx` - New email preview component
- `app/admin/coaching-hub/page.tsx` - Enhanced coaching hub UI

## How to Use

### For Failed Emails

1. **Identify Failed Emails**:
   - Go to the Coaching Hub
   - Look for contacts with "failed" email status (red badge)
   - Use the email status filter to show only failed emails

2. **View Email Details**:
   - Click the "View" button next to any contact's email status
   - This opens the Email Preview Modal showing:
     - Current email status and error details
     - Full email content preview
     - Management controls

3. **Retry Failed Emails**:
   - In the Email Preview Modal, click "Retry Send"
   - The system will attempt to resend the email
   - Status will update automatically

4. **Manual Management**:
   - **Mark as Sent**: If you sent the email manually via another method
   - **Reset Status**: Clear all email tracking data to start fresh

### For Pending Emails

1. **Find Pending Emails**:
   - Filter by email status "pending"
   - These are contacts where email generation/sending was interrupted

2. **Retry Pending Emails**:
   - Use the same "View" → "Retry Send" process
   - The system will attempt to send using stored email content

### Email Status Overview

The coaching hub now shows:
- **Email Status Cards**: Quick overview of sent/pending/failed/retrying counts
- **Email Status Column**: Per-contact email status with quick "View" access
- **Email Status Filter**: Filter contacts by email delivery status

## API Endpoints

### GET `/api/email-management`
- Query parameter: `status` (optional) - filter by email status
- Returns: List of contacts with email status summary

### POST `/api/email-management`
Actions supported:
- `preview`: Get email content and status details
- `retry`: Attempt to resend the email
- `mark_sent`: Manually mark as successfully sent
- `reset`: Reset email status to pending

## Troubleshooting

### Common Issues

1. **"No email content available"**:
   - This contact didn't complete the quiz properly
   - The speaking plan wasn't generated
   - Solution: Contact completed quiz outside normal flow

2. **Resend API Errors**:
   - Check Resend API key configuration
   - Verify email domain authentication
   - Check Resend dashboard for delivery issues

3. **Database Migration Issues**:
   - Ensure all migration SQL commands completed successfully
   - Check that new columns exist in quiz_responses table
   - Verify indexes were created

### Monitoring

- Check the Email Status Overview cards for quick health check
- Use email status filters to identify problematic contacts
- Monitor retry counts to identify persistent issues

## Benefits

1. **Visibility**: You can now see exactly which emails failed and why
2. **Recovery**: Easy retry mechanism for failed emails
3. **Audit Trail**: Complete tracking of email delivery status
4. **Manual Override**: Ability to mark emails as sent when needed
5. **Content Preview**: See exactly what was/should be sent to each contact

This system ensures no leads are lost due to email delivery issues and provides complete visibility into your email communication pipeline.
