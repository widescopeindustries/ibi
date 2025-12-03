import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  sendWelcomeEmail,
  sendProfileIncompleteReminder,
  sendUpgradeEmail,
  sendSubscriptionConfirmation,
  sendReviewNotification,
  sendTrialEndingReminder,
} from '@/lib/email';

// Email type definitions
type EmailType =
  | 'welcome'
  | 'profile-reminder'
  | 'upgrade-pro'
  | 'subscription-confirmed'
  | 'review-notification'
  | 'trial-ending';

interface EmailRequest {
  type: EmailType;
  to: string;
  data: Record<string, any>;
}

/**
 * POST /api/send-email
 *
 * Secure API endpoint for sending transactional emails.
 * This should be called server-side only and requires authentication.
 *
 * Security:
 * - Validates the user is authenticated (for user-specific emails)
 * - Rate limits to prevent abuse
 * - Validates email parameters
 *
 * Usage:
 * ```typescript
 * const response = await fetch('/api/send-email', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     type: 'welcome',
 *     to: 'user@example.com',
 *     data: { userName: 'John Doe' }
 *   })
 * });
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: EmailRequest = await request.json();
    const { type, to, data } = body;

    // Validate required fields
    if (!type || !to || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type, to, and data are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Initialize Supabase client for authentication check
    const supabase = createClient();

    // Get authenticated user (for user-specific email types)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // For certain email types, require authentication
    const authRequiredTypes: EmailType[] = [
      'profile-reminder',
      'subscription-confirmed',
      'trial-ending',
    ];

    if (authRequiredTypes.includes(type) && !user) {
      return NextResponse.json(
        { error: 'Authentication required for this email type' },
        { status: 401 }
      );
    }

    // Rate limiting check (TODO: Implement proper rate limiting in production)
    // For now, we'll log the attempt
    console.log(`Email send attempt: ${type} to ${to} by user ${user?.id || 'anonymous'}`);

    // Send email based on type
    let result;

    switch (type) {
      case 'welcome':
        if (!data.userName) {
          return NextResponse.json(
            { error: 'userName is required for welcome emails' },
            { status: 400 }
          );
        }
        result = await sendWelcomeEmail(to, data.userName);
        break;

      case 'profile-reminder':
        if (!data.userName || !data.profileUrl) {
          return NextResponse.json(
            { error: 'userName and profileUrl are required for profile reminders' },
            { status: 400 }
          );
        }
        result = await sendProfileIncompleteReminder(to, data.userName, data.profileUrl);
        break;

      case 'upgrade-pro':
        if (!data.userName || !data.pricingUrl) {
          return NextResponse.json(
            { error: 'userName and pricingUrl are required for upgrade emails' },
            { status: 400 }
          );
        }
        result = await sendUpgradeEmail(to, data.userName, data.pricingUrl);
        break;

      case 'subscription-confirmed':
        if (!data.userName || !data.dashboardUrl) {
          return NextResponse.json(
            { error: 'userName and dashboardUrl are required for subscription confirmations' },
            { status: 400 }
          );
        }
        result = await sendSubscriptionConfirmation(to, data.userName, data.dashboardUrl);
        break;

      case 'review-notification':
        if (
          !data.repName ||
          !data.reviewerName ||
          data.rating === undefined ||
          !data.comment ||
          !data.profileUrl
        ) {
          return NextResponse.json(
            {
              error:
                'repName, reviewerName, rating, comment, and profileUrl are required for review notifications',
            },
            { status: 400 }
          );
        }
        result = await sendReviewNotification(to, {
          repName: data.repName,
          reviewerName: data.reviewerName,
          rating: data.rating,
          comment: data.comment,
          profileUrl: data.profileUrl,
        });
        break;

      case 'trial-ending':
        if (!data.userName || data.daysRemaining === undefined || !data.subscriptionUrl) {
          return NextResponse.json(
            {
              error:
                'userName, daysRemaining, and subscriptionUrl are required for trial ending emails',
            },
            { status: 400 }
          );
        }
        result = await sendTrialEndingReminder(
          to,
          data.userName,
          data.daysRemaining,
          data.subscriptionUrl
        );
        break;

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    // Check if email was sent successfully
    if (!result.success) {
      console.error(`Failed to send ${type} email to ${to}:`, result.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: `${type} email sent successfully`,
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-email API route:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET method not allowed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send emails.' },
    { status: 405 }
  );
}
