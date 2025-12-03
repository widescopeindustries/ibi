/**
 * Analytics Tracking Utility
 *
 * This module provides utility functions for tracking user interactions with
 * Google Analytics 4 (GA4) and Meta Pixel (Facebook Pixel).
 *
 * Setup:
 * 1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your .env.local file
 * 2. Add NEXT_PUBLIC_META_PIXEL_ID to your .env.local file
 * 3. The Analytics component in components/Analytics.tsx handles script initialization
 *
 * Usage:
 * Import the tracking functions in your components:
 *
 * import { trackRepProfileView, trackSearchPerformed, trackContactClick } from '@/lib/analytics'
 *
 * // Track when a user views a rep profile
 * trackRepProfileView(repId, companyName)
 *
 * // Track when a user performs a search
 * trackSearchPerformed(searchTerm, resultsCount)
 *
 * // Track when a user clicks the contact button
 * trackContactClick(repId, contactMethod)
 */

// Extend the Window interface to include GA4 and Meta Pixel
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    fbq?: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      data?: Record<string, any>
    ) => void;
    _fbq?: any;
  }
}

// Type definitions for event parameters
export interface RepProfileViewParams {
  rep_id: string;
  company_name: string;
  location?: string;
}

export interface SearchPerformedParams {
  search_term: string;
  results_count: number;
  filters?: string;
}

export interface ContactButtonClickParams {
  rep_id: string;
  contact_method: 'email' | 'phone' | 'website' | 'social';
  company_name?: string;
}

export interface SignupStartedParams {
  user_type: 'rep' | 'company' | 'user';
  signup_method?: 'email' | 'google' | 'facebook';
}

export interface SubscriptionStartedParams {
  plan_name: string;
  plan_price: number;
  billing_period: 'monthly' | 'yearly';
}

export interface SubscriptionCompletedParams {
  plan_name: string;
  plan_price: number;
  billing_period: 'monthly' | 'yearly';
  transaction_id?: string;
}

/**
 * Initialize Google Analytics 4
 * This is called automatically by the Analytics component
 */
export const initGA = (measurementId: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
  }
};

/**
 * Initialize Meta Pixel
 * This is called automatically by the Analytics component
 */
export const initMetaPixel = (pixelId: string): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
};

/**
 * Track page views for GA4
 * This is called automatically by the Analytics component on route changes
 */
export const trackPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
    });
  }
};

/**
 * Generic event tracking function for GA4
 */
const trackGAEvent = (eventName: string, params?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Generic event tracking function for Meta Pixel
 */
const trackMetaEvent = (eventName: string, params?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Track when a user views a sales rep profile
 *
 * @example
 * trackRepProfileView('rep-123', 'Mary Kay', 'New York, NY')
 */
export const trackRepProfileView = (
  repId: string,
  companyName: string,
  location?: string
): void => {
  const params: RepProfileViewParams = {
    rep_id: repId,
    company_name: companyName,
    ...(location && { location }),
  };

  // Track in GA4
  trackGAEvent('rep_profile_view', params);

  // Track in Meta Pixel as ViewContent
  trackMetaEvent('ViewContent', {
    content_name: `${companyName} Rep Profile`,
    content_category: 'Rep Profile',
    content_ids: [repId],
  });
};

/**
 * Track when a user performs a search
 *
 * @example
 * trackSearchPerformed('Mary Kay', 15, 'location:New York')
 */
export const trackSearchPerformed = (
  searchTerm: string,
  resultsCount: number,
  filters?: string
): void => {
  const params: SearchPerformedParams = {
    search_term: searchTerm,
    results_count: resultsCount,
    ...(filters && { filters }),
  };

  // Track in GA4
  trackGAEvent('search_performed', params);

  // Track in Meta Pixel as Search
  trackMetaEvent('Search', {
    search_string: searchTerm,
    content_category: 'Rep Search',
  });
};

/**
 * Track when a user clicks a contact button on a rep profile
 *
 * @example
 * trackContactClick('rep-123', 'email', 'Mary Kay')
 */
export const trackContactClick = (
  repId: string,
  contactMethod: 'email' | 'phone' | 'website' | 'social',
  companyName?: string
): void => {
  const params: ContactButtonClickParams = {
    rep_id: repId,
    contact_method: contactMethod,
    ...(companyName && { company_name: companyName }),
  };

  // Track in GA4
  trackGAEvent('contact_button_click', params);

  // Track in Meta Pixel as Contact
  trackMetaEvent('Contact', {
    content_name: `Contact via ${contactMethod}`,
    content_category: 'Rep Contact',
  });
};

/**
 * Track when a user starts the signup process
 *
 * @example
 * trackSignupStarted('rep', 'email')
 */
export const trackSignupStarted = (
  userType: 'rep' | 'company' | 'user',
  signupMethod?: 'email' | 'google' | 'facebook'
): void => {
  const params: SignupStartedParams = {
    user_type: userType,
    ...(signupMethod && { signup_method: signupMethod }),
  };

  // Track in GA4
  trackGAEvent('signup_started', params);

  // Track in Meta Pixel as Lead
  trackMetaEvent('Lead', {
    content_name: `Signup Started - ${userType}`,
    content_category: 'Signup',
  });
};

/**
 * Track when a user starts the subscription checkout process
 *
 * @example
 * trackSubscriptionStarted('Pro Monthly', 19.99, 'monthly')
 */
export const trackSubscriptionStarted = (
  planName: string,
  planPrice: number,
  billingPeriod: 'monthly' | 'yearly'
): void => {
  const params: SubscriptionStartedParams = {
    plan_name: planName,
    plan_price: planPrice,
    billing_period: billingPeriod,
  };

  // Track in GA4
  trackGAEvent('subscription_started', params);

  // Track in Meta Pixel as InitiateCheckout
  trackMetaEvent('InitiateCheckout', {
    content_name: planName,
    content_category: 'Subscription',
    value: planPrice,
    currency: 'USD',
  });
};

/**
 * Track when a user completes a subscription purchase
 *
 * @example
 * trackSubscriptionCompleted('Pro Monthly', 19.99, 'monthly', 'txn_abc123')
 */
export const trackSubscriptionCompleted = (
  planName: string,
  planPrice: number,
  billingPeriod: 'monthly' | 'yearly',
  transactionId?: string
): void => {
  const params: SubscriptionCompletedParams = {
    plan_name: planName,
    plan_price: planPrice,
    billing_period: billingPeriod,
    ...(transactionId && { transaction_id: transactionId }),
  };

  // Track in GA4
  trackGAEvent('subscription_completed', params);

  // Track in Meta Pixel as Purchase and CompleteRegistration
  trackMetaEvent('Purchase', {
    content_name: planName,
    content_category: 'Subscription',
    value: planPrice,
    currency: 'USD',
  });

  trackMetaEvent('CompleteRegistration', {
    content_name: planName,
    status: 'completed',
  });
};

/**
 * Utility function to check if analytics is enabled
 * Useful for development environments
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID
  );
};

/**
 * Utility function to get current analytics configuration
 */
export const getAnalyticsConfig = () => {
  return {
    ga4Enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    metaPixelEnabled: !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
    ga4Id: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  };
};
