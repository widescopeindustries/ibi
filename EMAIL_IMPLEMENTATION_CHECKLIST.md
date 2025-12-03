# Email Implementation Checklist

Use this checklist to track your email infrastructure implementation progress.

## Setup (Required)

- [ ] Sign up for Resend account at [resend.com](https://resend.com)
- [ ] Create API key in Resend dashboard
- [ ] Add `RESEND_API_KEY` to `.env.local`
- [ ] Add `EMAIL_FROM_ADDRESS` to `.env.local`
- [ ] Test email sending with test script
- [ ] Verify emails appear in Resend dashboard

## Integration - Priority 1 (Essential)

### Welcome Email
- [ ] Read Section 1 of `INTEGRATION_EXAMPLES.md`
- [ ] Locate signup route/action in your codebase
- [ ] Add `import { sendWelcomeEmail } from '@/lib/email'`
- [ ] Call `sendWelcomeEmail()` after user creation
- [ ] Test by creating a new user account
- [ ] Verify welcome email received

### Subscription Confirmation
- [ ] Read Section 2 of `INTEGRATION_EXAMPLES.md`
- [ ] Open `/app/api/webhooks/stripe/route.ts`
- [ ] Add `import { sendSubscriptionConfirmation } from '@/lib/email'`
- [ ] Add email send in `checkout.session.completed` handler
- [ ] Test with Stripe test checkout
- [ ] Verify confirmation email received

## Integration - Priority 2 (User Engagement)

### Review Notifications
- [ ] Read Section 3 of `INTEGRATION_EXAMPLES.md`
- [ ] Locate review submission code
- [ ] Add `import { sendReviewNotification } from '@/lib/email'`
- [ ] Call `sendReviewNotification()` after review creation
- [ ] Test by submitting a review
- [ ] Verify notification email received

## Integration - Priority 3 (Scheduled Emails)

### Profile Incomplete Reminders
- [ ] Read Section 4 of `INTEGRATION_EXAMPLES.md`
- [ ] Create `/app/api/cron/send-scheduled-emails/route.ts`
- [ ] Implement profile reminder logic
- [ ] Generate `CRON_SECRET` with `openssl rand -base64 32`
- [ ] Add `CRON_SECRET` to environment variables
- [ ] Create/update `vercel.json` with cron config
- [ ] Test cron endpoint manually
- [ ] Deploy and verify cron runs

### Upgrade to Pro Emails
- [ ] Implement in same cron job as profile reminders
- [ ] Query for users 7+ days old, not Pro
- [ ] Send upgrade emails
- [ ] Test and verify

### Trial Ending Reminders
- [ ] Implement in same cron job
- [ ] Query for trials ending in 3 days
- [ ] Send trial ending emails
- [ ] Test and verify

## Production Preparation

### Domain Verification
- [ ] Add your domain in Resend dashboard
- [ ] Add DNS records to your domain provider
- [ ] Wait for verification (5-30 minutes)
- [ ] Update `EMAIL_FROM_ADDRESS` to use your domain
- [ ] Test sending from verified domain

### Security
- [ ] Implement rate limiting on `/api/send-email`
- [ ] Review authentication checks in API route
- [ ] Secure cron endpoint with `CRON_SECRET`
- [ ] Add CSRF protection if needed

### Monitoring
- [ ] Create `email_logs` table in database
- [ ] Update `logEmailActivity()` to save to database
- [ ] Set up alerts for email failures
- [ ] Create dashboard to view email logs

### Environment Variables (Production)
- [ ] Add `RESEND_API_KEY` to production environment
- [ ] Add `EMAIL_FROM_ADDRESS` to production environment
- [ ] Add `CRON_SECRET` to production environment
- [ ] Verify `NEXT_PUBLIC_APP_URL` is set correctly

## Testing

### Development Testing
- [ ] Test each email template in Resend dashboard
- [ ] Verify mobile responsiveness
- [ ] Test all email links work
- [ ] Check spam score with mail-tester.com

### Production Testing
- [ ] Send test welcome email in production
- [ ] Complete test subscription
- [ ] Submit test review
- [ ] Verify scheduled emails run
- [ ] Monitor for failures

## Optional Enhancements

### Email Preferences
- [ ] Create email preferences table
- [ ] Add preferences UI in dashboard
- [ ] Check preferences before sending
- [ ] Add unsubscribe links

### Email Analytics
- [ ] Implement open tracking
- [ ] Implement click tracking
- [ ] Create analytics dashboard
- [ ] A/B test email variations

### Advanced Features
- [ ] Add email templates in database
- [ ] Create email template editor
- [ ] Implement email queue with retries
- [ ] Add batch sending for newsletters

## Documentation Review

- [ ] Read `EMAIL_QUICKSTART.md` completely
- [ ] Read `EMAIL_SETUP.md` completely
- [ ] Read `INTEGRATION_EXAMPLES.md` completely
- [ ] Review `EMAIL_INFRASTRUCTURE_SUMMARY.md`
- [ ] Bookmark Resend documentation

## Post-Launch Monitoring

### Week 1
- [ ] Check email delivery rate daily
- [ ] Monitor for spam complaints
- [ ] Review error logs
- [ ] Adjust sending volume if needed

### Week 2-4
- [ ] Analyze email open rates
- [ ] Check click-through rates
- [ ] Gather user feedback
- [ ] Optimize subject lines

### Monthly
- [ ] Review email metrics
- [ ] Check Resend usage/costs
- [ ] Update templates based on feedback
- [ ] Test new email variations

## Success Metrics

Track these metrics to measure success:

- [ ] Email delivery rate > 99%
- [ ] Open rate > 20%
- [ ] Click-through rate > 5%
- [ ] Spam complaint rate < 0.1%
- [ ] Welcome email sent to 100% of new signups
- [ ] Subscription confirmations sent to 100% of Pro upgrades
- [ ] Review notifications sent to 100% of new reviews

## Troubleshooting Checklist

If emails aren't sending:

- [ ] Check API key is correct
- [ ] Verify environment variables loaded
- [ ] Check Resend dashboard for errors
- [ ] Review application logs
- [ ] Test with curl to Resend API directly
- [ ] Verify domain DNS records
- [ ] Check rate limits not exceeded

If emails go to spam:

- [ ] Verify domain authentication
- [ ] Check sender reputation
- [ ] Review email content for spam triggers
- [ ] Test with mail-tester.com
- [ ] Warm up domain gradually
- [ ] Add SPF/DKIM/DMARC records

## Resources

- Resend Dashboard: https://resend.com/emails
- Resend Docs: https://resend.com/docs
- React Email Docs: https://react.email/docs
- Email Testing: https://www.mail-tester.com
- Email Client Support: https://www.caniemail.com

## Notes

Use this space for implementation notes:

```
Date Started: _______________
Date Completed: _____________

Issues Encountered:
-
-
-

Solutions Found:
-
-
-

Customizations Made:
-
-
-
```

---

**Current Status:**
- [ ] Not Started
- [ ] In Progress
- [ ] Completed
- [ ] In Production

**Last Updated:** _______________
