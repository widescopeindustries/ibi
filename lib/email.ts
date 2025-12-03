import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { WelcomeEmail } from './emails/welcome-email';
import { ProfileIncompleteReminder } from './emails/profile-incomplete-reminder';
import { UpgradeToProEmail } from './emails/upgrade-to-pro';
import { SubscriptionConfirmedEmail } from './emails/subscription-confirmed';
import { NewReviewNotification } from './emails/new-review-notification';
import { TrialEndingSoonEmail } from './emails/trial-ending-soon';

// Lazy initialization to prevent build-time errors when env vars aren't set
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

// Create Supabase admin client for logging (uses service role key)
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// Default from address for all emails
const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'IBI Directory <noreply@ibidirectory.com>';

// Brand colors for IBI
export const brandColors = {
  primary: '#4F46E5', // Indigo
  secondary: '#06B6D4', // Cyan
  accent: '#F59E0B', // Amber
  success: '#10B981', // Green
  text: '#1F2937', // Gray-800
  textLight: '#6B7280', // Gray-500
  background: '#FFFFFF',
  border: '#E5E7EB', // Gray-200
};

// Email send result type
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface EmailLogOptions {
  type: string;
  recipient: string;
  success: boolean;
  messageId?: string;
  error?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log email activity to console and database
 * Database logging fails silently to not affect email delivery
 */
async function logEmailActivity(options: EmailLogOptions): Promise<void> {
  const { type, recipient, success, messageId, error, userId, metadata } = options;
  const timestamp = new Date().toISOString();

  // Always log to console
  console.log(
    `[${timestamp}] Email ${type} to ${recipient}: ${success ? 'SUCCESS' : 'FAILED'}`,
    messageId ? `(ID: ${messageId})` : '',
    error || ''
  );

  // Attempt to log to database (non-blocking)
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from('email_logs').insert({
        email_type: type,
        recipient,
        success,
        message_id: messageId,
        error_message: error,
        user_id: userId,
        metadata: metadata || {},
      });
    }
  } catch (dbError) {
    // Log database error but don't throw - email delivery is the priority
    console.error('Failed to log email to database:', dbError);
  }
}

/**
 * Send welcome email to new representatives
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Welcome to IBI Directory!',
      react: WelcomeEmail({ userName }),
    });

    if (error) {
      await logEmailActivity({
        type: 'welcome',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
        metadata: { userName },
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'welcome',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
      metadata: { userName },
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'welcome',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
      metadata: { userName },
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Send reminder to complete profile
 */
export async function sendProfileIncompleteReminder(
  userEmail: string,
  userName: string,
  profileUrl: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Complete Your IBI Profile',
      react: ProfileIncompleteReminder({ userName, profileUrl }),
    });

    if (error) {
      await logEmailActivity({
        type: 'profile-reminder',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'profile-reminder',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'profile-reminder',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Send upgrade to Pro email
 */
export async function sendUpgradeEmail(
  userEmail: string,
  userName: string,
  pricingUrl: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Unlock Pro Features and Boost Your Visibility',
      react: UpgradeToProEmail({ userName, pricingUrl }),
    });

    if (error) {
      await logEmailActivity({
        type: 'upgrade-pro',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'upgrade-pro',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'upgrade-pro',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Send subscription confirmation email
 */
export async function sendSubscriptionConfirmation(
  userEmail: string,
  userName: string,
  dashboardUrl: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Welcome to Pro! Your Subscription is Confirmed',
      react: SubscriptionConfirmedEmail({ userName, dashboardUrl }),
    });

    if (error) {
      await logEmailActivity({
        type: 'subscription-confirmed',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'subscription-confirmed',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'subscription-confirmed',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Send new review notification to representative
 */
export async function sendReviewNotification(
  userEmail: string,
  reviewDetails: {
    repName: string;
    reviewerName: string;
    rating: number;
    comment: string;
    profileUrl: string;
  },
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `New Review: ${reviewDetails.rating} Stars!`,
      react: NewReviewNotification(reviewDetails),
    });

    if (error) {
      await logEmailActivity({
        type: 'review-notification',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
        metadata: { rating: reviewDetails.rating, reviewerName: reviewDetails.reviewerName },
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'review-notification',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
      metadata: { rating: reviewDetails.rating, reviewerName: reviewDetails.reviewerName },
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'review-notification',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
      metadata: { rating: reviewDetails.rating, reviewerName: reviewDetails.reviewerName },
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Send trial ending soon reminder
 */
export async function sendTrialEndingReminder(
  userEmail: string,
  userName: string,
  daysRemaining: number,
  subscriptionUrl: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Your Pro Trial Ends in ${daysRemaining} Days`,
      react: TrialEndingSoonEmail({ userName, daysRemaining, subscriptionUrl }),
    });

    if (error) {
      await logEmailActivity({
        type: 'trial-ending',
        recipient: userEmail,
        success: false,
        error: error.message,
        userId,
        metadata: { daysRemaining },
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'trial-ending',
      recipient: userEmail,
      success: true,
      messageId: data?.id,
      userId,
      metadata: { daysRemaining },
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'trial-ending',
      recipient: userEmail,
      success: false,
      error: errorMessage,
      userId,
      metadata: { daysRemaining },
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Generic function to send any custom email
 * Useful for admin notifications or custom use cases
 */
export async function sendCustomEmail(
  to: string,
  subject: string,
  html: string,
  userId?: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      await logEmailActivity({
        type: 'custom',
        recipient: to,
        success: false,
        error: error.message,
        userId,
        metadata: { subject },
      });
      return { success: false, error: error.message };
    }

    await logEmailActivity({
      type: 'custom',
      recipient: to,
      success: true,
      messageId: data?.id,
      userId,
      metadata: { subject },
    });
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailActivity({
      type: 'custom',
      recipient: to,
      success: false,
      error: errorMessage,
      userId,
      metadata: { subject },
    });
    return { success: false, error: errorMessage };
  }
}

// Export Resend getter for advanced use cases
export { getResend };
