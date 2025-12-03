# Email Infrastructure Setup Guide

This document explains the complete email infrastructure for the IBI Directory project, including setup instructions, usage examples, and integration points.

## Overview

The email system uses **Resend** (a modern email API perfect for Next.js) with **React Email** templates for beautiful, responsive emails. All email templates are branded with IBI colors and are mobile-friendly.

## Architecture

```
/lib/email.ts                          # Main email utility functions
/lib/emails/                           # Email templates directory
  ├── welcome-email.tsx                # Welcome new representatives
  ├── profile-incomplete-reminder.tsx  # Remind to complete profile
  ├── upgrade-to-pro.tsx               # Encourage Pro upgrade
  ├── subscription-confirmed.tsx       # Subscription confirmation
  ├── new-review-notification.tsx      # New review alerts
  └── trial-ending-soon.tsx            # Trial expiration warnings
/app/api/send-email/route.ts           # Secure API endpoint for sending emails
```

## Setup Instructions

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use their test domain for development
3. Create an API key from the dashboard
4. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM_ADDRESS=IBI Directory <noreply@yourdomain.com>
```

For development, you can use Resend's test domain:
```bash
EMAIL_FROM_ADDRESS=IBI Directory <onboarding@resend.dev>
```

### 3. Domain Verification (Production)

For production, verify your domain in Resend:

1. Go to Resend Dashboard > Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Add the provided DNS records to your domain provider
4. Wait for verification (usually takes a few minutes)
5. Update `EMAIL_FROM_ADDRESS` to use your domain

## Email Templates

### 1. Welcome Email
**When:** User signs up
**Template:** `welcome-email.tsx`
**Purpose:** Welcome new reps and guide next steps

```typescript
import { sendWelcomeEmail } from '@/lib/email';

await sendWelcomeEmail(
  'user@example.com',
  'John Doe'
);
```

### 2. Profile Incomplete Reminder
**When:** 3 days after signup if profile incomplete
**Template:** `profile-incomplete-reminder.tsx`
**Purpose:** Encourage profile completion

```typescript
import { sendProfileIncompleteReminder } from '@/lib/email';

await sendProfileIncompleteReminder(
  'user@example.com',
  'John Doe',
  'https://yourdomain.com/dashboard/profile'
);
```

### 3. Upgrade to Pro
**When:** 7 days after signup (for free users)
**Template:** `upgrade-to-pro.tsx`
**Purpose:** Promote Pro membership benefits

```typescript
import { sendUpgradeEmail } from '@/lib/email';

await sendUpgradeEmail(
  'user@example.com',
  'John Doe',
  'https://yourdomain.com/pricing'
);
```

### 4. Subscription Confirmed
**When:** User subscribes to Pro
**Template:** `subscription-confirmed.tsx`
**Purpose:** Confirm subscription and explain benefits

```typescript
import { sendSubscriptionConfirmation } from '@/lib/email';

await sendSubscriptionConfirmation(
  'user@example.com',
  'John Doe',
  'https://yourdomain.com/dashboard'
);
```

### 5. New Review Notification
**When:** User receives a new review
**Template:** `new-review-notification.tsx`
**Purpose:** Notify rep of new review

```typescript
import { sendReviewNotification } from '@/lib/email';

await sendReviewNotification(
  'user@example.com',
  {
    repName: 'John Doe',
    reviewerName: 'Jane Smith',
    rating: 5,
    comment: 'Excellent service!',
    profileUrl: 'https://yourdomain.com/rep/123'
  }
);
```

### 6. Trial Ending Soon
**When:** 3 days before trial ends
**Template:** `trial-ending-soon.tsx`
**Purpose:** Remind about trial expiration

```typescript
import { sendTrialEndingReminder } from '@/lib/email';

await sendTrialEndingReminder(
  'user@example.com',
  'John Doe',
  3, // days remaining
  'https://yourdomain.com/dashboard/subscription'
);
```

## API Endpoint Usage

### POST /api/send-email

Secure endpoint for sending emails (server-side only).

**Request Body:**
```typescript
{
  type: 'welcome' | 'profile-reminder' | 'upgrade-pro' | 'subscription-confirmed' | 'review-notification' | 'trial-ending',
  to: string,
  data: {
    // Type-specific data
  }
}
```

**Example:**
```typescript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'welcome',
    to: 'user@example.com',
    data: { userName: 'John Doe' }
  })
});

const result = await response.json();
// { success: true, message: 'welcome email sent successfully', messageId: '...' }
```

## Integration Points

### 1. User Signup (Welcome Email)

Add to your signup route after user creation:

**File:** `/app/auth/signup/route.ts` or signup action

```typescript
import { sendWelcomeEmail } from '@/lib/email';

// After successful user creation
const { data: user, error } = await supabase.auth.signUp({
  email,
  password,
});

if (user && !error) {
  // Send welcome email (don't await to avoid blocking)
  sendWelcomeEmail(email, user.user_metadata?.full_name || 'there')
    .catch(err => console.error('Failed to send welcome email:', err));
}
```

### 2. Stripe Subscription (Confirmation Email)

Add to your Stripe webhook handler:

**File:** `/app/api/webhooks/stripe/route.ts`

```typescript
import { sendSubscriptionConfirmation } from '@/lib/email';

// In your checkout.session.completed handler
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  // Get user email and name from session
  const email = session.customer_email;
  const userId = session.metadata?.userId;

  // Update user subscription in database
  // ... your existing code ...

  // Send confirmation email
  if (email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    sendSubscriptionConfirmation(
      email,
      session.metadata?.userName || 'there',
      `${appUrl}/dashboard`
    ).catch(err => console.error('Failed to send subscription confirmation:', err));
  }
}
```

### 3. New Review Submission

Add to your review submission handler:

**File:** Your review submission API route or action

```typescript
import { sendReviewNotification } from '@/lib/email';

// After review is saved to database
const { data: review, error } = await supabase
  .from('reviews')
  .insert({ ... })
  .select()
  .single();

if (review && !error) {
  // Get rep email and details
  const { data: rep } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', review.rep_id)
    .single();

  if (rep?.email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    sendReviewNotification(rep.email, {
      repName: rep.full_name,
      reviewerName: review.reviewer_name,
      rating: review.rating,
      comment: review.comment,
      profileUrl: `${appUrl}/rep/${review.rep_id}`
    }).catch(err => console.error('Failed to send review notification:', err));
  }
}
```

## Scheduled Emails (Future Implementation)

For scheduled emails like profile reminders and trial endings, you'll need to set up cron jobs or use a service like:

### Option 1: Vercel Cron Jobs

**File:** `/app/api/cron/send-scheduled-emails/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendProfileIncompleteReminder, sendTrialEndingReminder } from '@/lib/email';

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Find users with incomplete profiles (3+ days old)
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: incompleteProfiles } = await supabase
    .from('profiles')
    .select('email, full_name, id, created_at')
    .is('bio', null)
    .lt('created_at', threeDaysAgo.toISOString());

  // Send reminders
  for (const profile of incompleteProfiles || []) {
    await sendProfileIncompleteReminder(
      profile.email,
      profile.full_name,
      `${appUrl}/dashboard/profile`
    );
  }

  // Find users with trials ending in 3 days
  // ... similar logic for trial ending emails ...

  return NextResponse.json({ success: true });
}
```

**vercel.json:**
```json
{
  "crons": [
    {
      "path": "/api/cron/send-scheduled-emails",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### Option 2: GitHub Actions

Create `.github/workflows/scheduled-emails.yml`

### Option 3: External Services

Use services like:
- **Inngest** - Serverless event-driven workflows
- **Trigger.dev** - Background jobs for Next.js
- **Upstash QStash** - Serverless message queue

## Testing Emails

### Development Testing

1. Use Resend's test domain (onboarding@resend.dev)
2. All emails will be caught and visible in Resend dashboard
3. No actual emails sent to users

```bash
EMAIL_FROM_ADDRESS=IBI Directory <onboarding@resend.dev>
```

### Preview Email Templates

Create a preview route (development only):

**File:** `/app/email-preview/page.tsx`

```typescript
import { WelcomeEmail } from '@/lib/emails/welcome-email';
import { UpgradeToProEmail } from '@/lib/emails/upgrade-to-pro';

export default function EmailPreview() {
  return (
    <div>
      <h1>Email Previews</h1>
      <hr />
      <h2>Welcome Email</h2>
      <WelcomeEmail userName="John Doe" />
      <hr />
      <h2>Upgrade to Pro</h2>
      <UpgradeToProEmail userName="John Doe" pricingUrl="http://localhost:3000/pricing" />
    </div>
  );
}
```

### Test Sending

Create a test route (development only):

**File:** `/app/api/test-email/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const result = await sendWelcomeEmail('test@example.com', 'Test User');
  return NextResponse.json(result);
}
```

Visit `http://localhost:3000/api/test-email` to test.

## Error Handling

All email functions return a result object:

```typescript
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
```

Best practices:
1. Don't block user operations waiting for emails
2. Use `.catch()` to handle failures gracefully
3. Log failures for debugging
4. Consider retry logic for critical emails

```typescript
// Good: Non-blocking
sendWelcomeEmail(email, name)
  .catch(err => console.error('Welcome email failed:', err));

// Bad: Blocking
await sendWelcomeEmail(email, name); // User has to wait
```

## Email Logs

Currently, emails are logged to console. For production, implement database logging:

**Recommended table schema:**

```sql
create table email_logs (
  id uuid primary key default uuid_generate_v4(),
  email_type text not null,
  recipient text not null,
  success boolean not null,
  error_message text,
  message_id text,
  sent_at timestamp with time zone default now()
);

create index idx_email_logs_recipient on email_logs(recipient);
create index idx_email_logs_sent_at on email_logs(sent_at);
```

Update `logEmailActivity()` in `/lib/email.ts` to save to database.

## Rate Limiting

To prevent abuse, implement rate limiting on the `/api/send-email` endpoint:

```typescript
// TODO: Implement using Upstash Redis or similar
// Example: Max 10 emails per user per hour
```

## Customization

### Brand Colors

Colors are defined in `/lib/email.ts`:

```typescript
export const brandColors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#06B6D4',   // Cyan
  accent: '#F59E0B',      // Amber
  success: '#10B981',     // Green
  text: '#1F2937',        // Gray-800
  textLight: '#6B7280',   // Gray-500
  background: '#FFFFFF',
  border: '#E5E7EB',      // Gray-200
};
```

### Adding New Templates

1. Create new template in `/lib/emails/your-template.tsx`
2. Add utility function in `/lib/email.ts`
3. Add route handler case in `/app/api/send-email/route.ts`
4. Document usage in this file

## Troubleshooting

### Emails Not Sending

1. Check API key is correct: `echo $RESEND_API_KEY`
2. Verify domain is verified in Resend dashboard
3. Check logs: Look for errors in console
4. Test API directly: Use Resend dashboard to send test email

### Emails Going to Spam

1. Verify your domain with SPF/DKIM
2. Use a professional from address
3. Avoid spam trigger words
4. Warm up your domain gradually
5. Monitor sender reputation

### Template Rendering Issues

1. Check React Email syntax
2. Ensure all required props are passed
3. Test with preview route
4. Validate inline styles (email clients don't support all CSS)

## Resources

- **Resend Documentation:** https://resend.com/docs
- **React Email Documentation:** https://react.email/docs
- **Email Client Support:** https://www.caniemail.com/
- **Email Testing:** https://www.emailonacid.com/

## Next Steps

1. ✅ Set up Resend account and get API key
2. ✅ Configure environment variables
3. ✅ Test welcome email on signup
4. ⏳ Integrate subscription confirmation with Stripe webhook
5. ⏳ Integrate review notifications
6. ⏳ Set up scheduled emails (profile reminders, trial endings)
7. ⏳ Implement email logging to database
8. ⏳ Add rate limiting
9. ⏳ Verify domain for production
10. ⏳ Set up monitoring and alerts

## Support

For issues or questions about the email infrastructure, contact the development team or refer to the Resend documentation.

---

**Last Updated:** December 2025
