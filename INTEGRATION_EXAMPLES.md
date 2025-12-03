# Email Integration Examples

This file contains practical examples of how to integrate the email system into your existing IBI Directory codebase.

## Table of Contents

1. [Signup Flow - Welcome Email](#1-signup-flow---welcome-email)
2. [Stripe Webhook - Subscription Confirmed](#2-stripe-webhook---subscription-confirmed)
3. [Review Submission - New Review Notification](#3-review-submission---new-review-notification)
4. [Scheduled Emails - Profile Reminders](#4-scheduled-emails---profile-reminders)
5. [Dashboard Trigger - Upgrade Email](#5-dashboard-trigger---upgrade-email)

---

## 1. Signup Flow - Welcome Email

### Where to Add

Find your signup route or signup server action.

### Example Integration

```typescript
// app/auth/signup/route.ts or actions.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    const supabase = createClient();

    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (authData.user) {
      // Create profile in profiles table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email,
        full_name: fullName,
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // ✅ SEND WELCOME EMAIL (non-blocking)
      // Don't await - let it run in background
      sendWelcomeEmail(email, fullName || 'there').catch((err) =>
        console.error('Failed to send welcome email:', err)
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Alternative: Using Server Action

```typescript
// app/auth/actions.ts

'use server';

import { createClient } from '@/lib/supabase/server';
import { sendWelcomeEmail } from '@/lib/email';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // ✅ SEND WELCOME EMAIL
    sendWelcomeEmail(email, fullName || 'there').catch((err) =>
      console.error('Failed to send welcome email:', err)
    );
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
```

---

## 2. Stripe Webhook - Subscription Confirmed

### Where to Add

In your Stripe webhook handler: `/app/api/webhooks/stripe/route.ts`

### Example Integration

```typescript
// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { sendSubscriptionConfirmation } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createClient();

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Get user info from metadata
    const userId = session.metadata?.userId;
    const userEmail = session.customer_email || session.metadata?.userEmail;

    if (!userId) {
      console.error('No userId in session metadata');
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Update user's subscription status in database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        subscription_status: 'active',
        is_pro: true,
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update profile:', updateError);
    }

    // Get user's name for email
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();

    // ✅ SEND SUBSCRIPTION CONFIRMATION EMAIL
    if (userEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      sendSubscriptionConfirmation(
        userEmail,
        profile?.full_name || 'there',
        `${appUrl}/dashboard`
      ).catch((err) => console.error('Failed to send subscription confirmation:', err));
    }
  }

  // Handle subscription updates
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: subscription.status,
        is_pro: subscription.status === 'active',
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Failed to update subscription status:', error);
    }
  }

  // Handle subscription cancellation
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'canceled',
        is_pro: false,
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Failed to update subscription status:', error);
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## 3. Review Submission - New Review Notification

### Where to Add

In your review submission API route or form action.

### Example: API Route

```typescript
// app/api/reviews/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendReviewNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { repId, reviewerName, rating, comment } = await request.json();

    // Validate input
    if (!repId || !reviewerName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createClient();

    // Insert review into database
    const { data: review, error: insertError } = await supabase
      .from('reviews')
      .insert({
        rep_id: repId,
        reviewer_name: reviewerName,
        rating,
        comment,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create review:', insertError);
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }

    // Get representative's email and details
    const { data: rep, error: repError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', repId)
      .single();

    if (repError || !rep) {
      console.error('Failed to fetch rep details:', repError);
      // Review created but email notification failed
      return NextResponse.json({ success: true, review });
    }

    // ✅ SEND REVIEW NOTIFICATION EMAIL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    sendReviewNotification(rep.email, {
      repName: rep.full_name || 'there',
      reviewerName,
      rating,
      comment: comment || '',
      profileUrl: `${appUrl}/rep/${repId}`,
    }).catch((err) => console.error('Failed to send review notification:', err));

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Example: Server Action

```typescript
// app/rep/[profileId]/actions.ts

'use server';

import { createClient } from '@/lib/supabase/server';
import { sendReviewNotification } from '@/lib/email';
import { revalidatePath } from 'next/cache';

export async function submitReview(formData: FormData) {
  const repId = formData.get('repId') as string;
  const reviewerName = formData.get('reviewerName') as string;
  const rating = parseInt(formData.get('rating') as string);
  const comment = formData.get('comment') as string;

  const supabase = createClient();

  // Insert review
  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      rep_id: repId,
      reviewer_name: reviewerName,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Get rep details for email
  const { data: rep } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', repId)
    .single();

  // ✅ SEND REVIEW NOTIFICATION
  if (rep?.email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    sendReviewNotification(rep.email, {
      repName: rep.full_name,
      reviewerName,
      rating,
      comment,
      profileUrl: `${appUrl}/rep/${repId}`,
    }).catch((err) => console.error('Failed to send review notification:', err));
  }

  revalidatePath(`/rep/${repId}`);
  return { success: true, review };
}
```

---

## 4. Scheduled Emails - Profile Reminders

### Implementation: Vercel Cron Job

Create a new API route for scheduled email jobs:

```typescript
// app/api/cron/send-scheduled-emails/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  sendProfileIncompleteReminder,
  sendTrialEndingReminder,
  sendUpgradeEmail,
} from '@/lib/email';

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  let sentCount = 0;
  const errors: string[] = [];

  // ✅ 1. PROFILE INCOMPLETE REMINDERS (3 days after signup)
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: incompleteProfiles } = await supabase
    .from('profiles')
    .select('id, email, full_name, created_at')
    .is('bio', null)
    .lt('created_at', threeDaysAgo.toISOString())
    .gt('created_at', new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()); // Not more than 4 days old

  for (const profile of incompleteProfiles || []) {
    try {
      await sendProfileIncompleteReminder(
        profile.email,
        profile.full_name || 'there',
        `${appUrl}/dashboard/profile`
      );
      sentCount++;
    } catch (err) {
      errors.push(`Profile reminder failed for ${profile.email}: ${err}`);
    }
  }

  // ✅ 2. TRIAL ENDING REMINDERS (3 days before trial ends)
  // Assuming you have a trial_ends_at field in profiles
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const { data: trialEndingUsers } = await supabase
    .from('profiles')
    .select('id, email, full_name, trial_ends_at')
    .eq('subscription_status', 'trialing')
    .lte('trial_ends_at', threeDaysFromNow.toISOString())
    .gt('trial_ends_at', new Date().toISOString());

  for (const user of trialEndingUsers || []) {
    try {
      const trialEnd = new Date(user.trial_ends_at);
      const daysRemaining = Math.ceil(
        (trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );

      await sendTrialEndingReminder(
        user.email,
        user.full_name || 'there',
        daysRemaining,
        `${appUrl}/dashboard/subscription`
      );
      sentCount++;
    } catch (err) {
      errors.push(`Trial ending reminder failed for ${user.email}: ${err}`);
    }
  }

  // ✅ 3. UPGRADE TO PRO EMAILS (7 days after signup, not Pro)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: upgradeTargets } = await supabase
    .from('profiles')
    .select('id, email, full_name, created_at')
    .eq('is_pro', false)
    .lt('created_at', sevenDaysAgo.toISOString())
    .gt('created_at', new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()); // Not more than 8 days old

  for (const user of upgradeTargets || []) {
    try {
      await sendUpgradeEmail(user.email, user.full_name || 'there', `${appUrl}/pricing`);
      sentCount++;
    } catch (err) {
      errors.push(`Upgrade email failed for ${user.email}: ${err}`);
    }
  }

  return NextResponse.json({
    success: true,
    sentCount,
    errors: errors.length > 0 ? errors : undefined,
  });
}
```

### Configure Vercel Cron

Create or update `vercel.json` in your project root:

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

This runs daily at 9 AM UTC.

### Add Environment Variable

Add to your `.env.local` and Vercel environment variables:

```bash
CRON_SECRET=your-random-secret-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

---

## 5. Dashboard Trigger - Upgrade Email

### Manual Trigger from Dashboard

Sometimes you want to manually trigger an email, like when a rep views pricing.

```typescript
// app/dashboard/components/UpgradePrompt.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function UpgradePrompt() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSendInfo = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'upgrade-pro',
          to: 'user@example.com', // Get from session
          data: {
            userName: 'John Doe', // Get from session
            pricingUrl: `${window.location.origin}/pricing`,
          },
        }),
      });

      if (response.ok) {
        setEmailSent(true);
      }
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-indigo-900 mb-2">Upgrade to Pro</h3>
      <p className="text-indigo-700 mb-4">
        Get priority placement, a Pro badge, and 3-5x more visibility!
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <a href="/pricing">View Pricing</a>
        </Button>
        {!emailSent ? (
          <Button variant="outline" onClick={handleSendInfo}>
            Email Me Details
          </Button>
        ) : (
          <span className="text-sm text-green-600 flex items-center">
            ✓ Email sent!
          </span>
        )}
      </div>
    </div>
  );
}
```

---

## Testing Your Integrations

### 1. Test Welcome Email

After implementing signup integration:

```bash
# Sign up a new user through your app
# Check Resend dashboard for sent email
```

### 2. Test Subscription Email

```bash
# Use Stripe test mode
# Complete a test checkout
# Check Resend dashboard
```

### 3. Test Review Notification

```bash
# Submit a test review through your app
# Check Resend dashboard
```

### 4. Test Scheduled Emails

```bash
# Call cron endpoint manually (with auth header)
curl -X GET http://localhost:3000/api/cron/send-scheduled-emails \
  -H "Authorization: Bearer your-cron-secret"
```

---

## Best Practices

1. **Non-Blocking:** Never `await` email sends in user-facing flows
2. **Error Handling:** Always use `.catch()` to handle email failures gracefully
3. **Logging:** Log all email attempts (success and failure) for debugging
4. **Rate Limiting:** Implement rate limits to prevent abuse
5. **Testing:** Test in development with Resend's test domain
6. **Monitoring:** Set up alerts for email failures in production

---

## Checklist

After integration:

- [ ] Welcome email sends on signup
- [ ] Subscription confirmation sends on Stripe checkout
- [ ] Review notifications send when reviews are submitted
- [ ] Scheduled emails cron job is configured
- [ ] All emails tested in Resend dashboard
- [ ] Environment variables configured in production
- [ ] Domain verified for production emails
- [ ] Error logging implemented
- [ ] Rate limiting added to API endpoint

---

**Questions?** Refer to `EMAIL_SETUP.md` for detailed documentation.
