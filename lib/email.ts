import { Resend } from 'resend';
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

// Default from address for all emails
const FROM_EMAIL = process.env.EMAIL_FROM_ADDRESS || 'A Rep Near Me <noreply@arepnearme.com>';

// Brand colors for A Rep Near Me
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

// Log email activity (in production, you'd save this to database)
function logEmailActivity(
  type: string,
  recipient: string,
  success: boolean,
  error?: string
) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Email ${type} to ${recipient}: ${success ? 'SUCCESS' : 'FAILED'}`, error || '');

  // TODO: In production, save to database for tracking and debugging
  // Example: await supabase.from('email_logs').insert({
  //   email_type: type,
  //   recipient,
  //   success,
  //   error_message: error,
  //   sent_at: timestamp
  // });
}

/**
 * Send welcome email to new representatives
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Welcome to A Rep Near Me!',
      react: WelcomeEmail({ userName }),
    });

    if (error) {
      logEmailActivity('welcome', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('welcome', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('welcome', userEmail, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send reminder to complete profile
 */
export async function sendProfileIncompleteReminder(
  userEmail: string,
  userName: string,
  profileUrl: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Complete Your A Rep Near Me Profile',
      react: ProfileIncompleteReminder({ userName, profileUrl }),
    });

    if (error) {
      logEmailActivity('profile-reminder', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('profile-reminder', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('profile-reminder', userEmail, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send upgrade to Pro email
 */
export async function sendUpgradeEmail(
  userEmail: string,
  userName: string,
  pricingUrl: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Unlock Pro Features and Boost Your Visibility',
      react: UpgradeToProEmail({ userName, pricingUrl }),
    });

    if (error) {
      logEmailActivity('upgrade-pro', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('upgrade-pro', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('upgrade-pro', userEmail, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send subscription confirmation email
 */
export async function sendSubscriptionConfirmation(
  userEmail: string,
  userName: string,
  dashboardUrl: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Welcome to Pro! Your Subscription is Confirmed',
      react: SubscriptionConfirmedEmail({ userName, dashboardUrl }),
    });

    if (error) {
      logEmailActivity('subscription-confirmed', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('subscription-confirmed', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('subscription-confirmed', userEmail, false, errorMessage);
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
  }
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `New Review: ${reviewDetails.rating} Stars!`,
      react: NewReviewNotification(reviewDetails),
    });

    if (error) {
      logEmailActivity('review-notification', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('review-notification', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('review-notification', userEmail, false, errorMessage);
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
  subscriptionUrl: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Your Pro Trial Ends in ${daysRemaining} Days`,
      react: TrialEndingSoonEmail({ userName, daysRemaining, subscriptionUrl }),
    });

    if (error) {
      logEmailActivity('trial-ending', userEmail, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('trial-ending', userEmail, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('trial-ending', userEmail, false, errorMessage);
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
  html: string
): Promise<EmailResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      logEmailActivity('custom', to, false, error.message);
      return { success: false, error: error.message };
    }

    logEmailActivity('custom', to, true);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logEmailActivity('custom', to, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Export Resend getter for advanced use cases
export { getResend };
