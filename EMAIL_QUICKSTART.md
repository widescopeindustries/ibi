# Email Infrastructure - Quick Start Guide

Get the IBI Directory email system up and running in 10 minutes.

## Step 1: Install Dependencies (Already Done ✅)

```bash
npm install resend react-email @react-email/components
```

## Step 2: Get Resend API Key (5 minutes)

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Click "API Keys" in dashboard
4. Create new API key
5. Copy the key (starts with `re_`)

## Step 3: Configure Environment Variables (2 minutes)

Add to your `.env.local` file:

```bash
# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM_ADDRESS=IBI Directory <onboarding@resend.dev>
```

**Note:** For development, use `onboarding@resend.dev`. For production, verify your domain and use your own email address.

## Step 4: Test Email Sending (3 minutes)

Create a test file to verify everything works:

```typescript
// test-email.ts (create in root directory)

import { sendWelcomeEmail } from './lib/email';

async function testEmail() {
  console.log('Sending test welcome email...');

  const result = await sendWelcomeEmail('your-email@example.com', 'Test User');

  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
  } else {
    console.error('❌ Email failed:', result.error);
  }
}

testEmail();
```

Run it:

```bash
npx tsx test-email.ts
```

Check your email inbox or Resend dashboard!

## Step 5: Integrate Welcome Email on Signup

Find your signup handler and add:

```typescript
import { sendWelcomeEmail } from '@/lib/email';

// After successful user creation
if (user) {
  sendWelcomeEmail(email, userName).catch(err =>
    console.error('Welcome email failed:', err)
  );
}
```

**That's it!** Your welcome emails are now working.

## Next Steps

### Add More Email Types

Choose what you need:

1. **Subscription Confirmation** → See `INTEGRATION_EXAMPLES.md` Section 2
2. **Review Notifications** → See `INTEGRATION_EXAMPLES.md` Section 3
3. **Profile Reminders** → See `INTEGRATION_EXAMPLES.md` Section 4
4. **Upgrade Emails** → See `INTEGRATION_EXAMPLES.md` Section 5

### Production Setup

Before going live:

1. **Verify your domain** in Resend
2. **Update EMAIL_FROM_ADDRESS** to use your domain
3. **Add rate limiting** to `/api/send-email`
4. **Set up monitoring** for email failures
5. **Configure scheduled emails** if needed

## Quick Reference

### Send Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/email';
await sendWelcomeEmail('user@example.com', 'John Doe');
```

### Send Upgrade Email

```typescript
import { sendUpgradeEmail } from '@/lib/email';
await sendUpgradeEmail(
  'user@example.com',
  'John Doe',
  'https://yourdomain.com/pricing'
);
```

### Send Review Notification

```typescript
import { sendReviewNotification } from '@/lib/email';
await sendReviewNotification('user@example.com', {
  repName: 'John Doe',
  reviewerName: 'Jane Smith',
  rating: 5,
  comment: 'Great service!',
  profileUrl: 'https://yourdomain.com/rep/123',
});
```

### Send Subscription Confirmation

```typescript
import { sendSubscriptionConfirmation } from '@/lib/email';
await sendSubscriptionConfirmation(
  'user@example.com',
  'John Doe',
  'https://yourdomain.com/dashboard'
);
```

## Available Email Templates

All templates are located in `/lib/emails/`:

1. ✅ `welcome-email.tsx` - Welcome new reps
2. ✅ `profile-incomplete-reminder.tsx` - Remind to complete profile
3. ✅ `upgrade-to-pro.tsx` - Encourage Pro upgrade
4. ✅ `subscription-confirmed.tsx` - Confirm subscription
5. ✅ `new-review-notification.tsx` - New review alerts
6. ✅ `trial-ending-soon.tsx` - Trial expiration warnings

## Troubleshooting

### Email Not Sending

1. Check API key: `echo $RESEND_API_KEY`
2. Check logs: `console.log` in `/lib/email.ts`
3. Verify in Resend dashboard

### Invalid API Key

Make sure your `.env.local` has the correct key:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

Restart your dev server after changing env variables.

### Email Going to Spam

For development, this is normal with test domains. For production:
1. Verify your domain in Resend
2. Set up SPF/DKIM records
3. Use a professional from address

## Documentation

- **Full Setup Guide:** `EMAIL_SETUP.md`
- **Integration Examples:** `INTEGRATION_EXAMPLES.md`
- **Resend Docs:** https://resend.com/docs
- **React Email Docs:** https://react.email/docs

## Support

Questions? Check the documentation files or contact the development team.

---

**You're all set! Start sending beautiful emails. 🎉**
