# Analytics Integration Guide

This guide explains how to use the Google Analytics 4 (GA4) and Meta Pixel tracking that has been integrated into the IBI project.

## Overview

The analytics implementation includes:
- **Google Analytics 4 (GA4)**: Track user behavior, page views, and custom events
- **Meta Pixel (Facebook Pixel)**: Track conversions and user actions for advertising

## Setup Instructions

### 1. Configure Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

**How to get your IDs:**
- **GA4 Measurement ID**: Go to [Google Analytics](https://analytics.google.com) → Admin → Data Streams → Select your stream → Copy the Measurement ID (format: G-XXXXXXXXXX)
- **Meta Pixel ID**: Go to [Meta Events Manager](https://business.facebook.com/events_manager) → Select your pixel → Copy the Pixel ID (numeric)

### 2. Automatic Page View Tracking

Page views are tracked automatically when users navigate between pages. No additional code is required!

The `Analytics` component in `app/layout.tsx` handles this automatically using Next.js App Router navigation events.

## Using Custom Event Tracking

Import the tracking functions from `lib/analytics.ts` in your components:

```typescript
import {
  trackRepProfileView,
  trackSearchPerformed,
  trackContactClick,
  trackSignupStarted,
  trackSubscriptionStarted,
  trackSubscriptionCompleted,
} from '@/lib/analytics';
```

### Event 1: Rep Profile View

Track when a user views a sales representative's profile.

```typescript
// Example: In your rep profile page component
'use client';

import { useEffect } from 'react';
import { trackRepProfileView } from '@/lib/analytics';

export default function RepProfilePage({ rep }) {
  useEffect(() => {
    // Track the profile view when the page loads
    trackRepProfileView(
      rep.id,              // Rep ID
      rep.company.name,    // Company name (e.g., "Mary Kay")
      rep.location         // Optional: Location (e.g., "New York, NY")
    );
  }, [rep.id]);

  return (
    <div>
      {/* Your profile content */}
    </div>
  );
}
```

### Event 2: Search Performed

Track when a user performs a search for sales representatives.

```typescript
// Example: In your search component
'use client';

import { trackSearchPerformed } from '@/lib/analytics';

export default function SearchComponent() {
  const handleSearch = async (searchTerm: string, filters: any) => {
    const results = await performSearch(searchTerm, filters);

    // Track the search event
    trackSearchPerformed(
      searchTerm,           // Search term (e.g., "Mary Kay")
      results.length,       // Number of results
      JSON.stringify(filters) // Optional: Applied filters
    );

    return results;
  };

  return (
    <div>
      {/* Your search UI */}
    </div>
  );
}
```

### Event 3: Contact Button Click

Track when a user clicks a contact button on a rep's profile.

```typescript
// Example: In your contact button component
'use client';

import { trackContactClick } from '@/lib/analytics';

export default function ContactButtons({ repId, companyName }) {
  const handleEmailClick = () => {
    trackContactClick(repId, 'email', companyName);
    // Open email client or show email form
  };

  const handlePhoneClick = () => {
    trackContactClick(repId, 'phone', companyName);
    // Initiate phone call or show phone number
  };

  const handleWebsiteClick = () => {
    trackContactClick(repId, 'website', companyName);
    // Open website in new tab
  };

  return (
    <div>
      <button onClick={handleEmailClick}>Email</button>
      <button onClick={handlePhoneClick}>Call</button>
      <button onClick={handleWebsiteClick}>Visit Website</button>
    </div>
  );
}
```

### Event 4: Signup Started

Track when a user begins the signup process.

```typescript
// Example: In your signup form component
'use client';

import { trackSignupStarted } from '@/lib/analytics';

export default function SignupForm() {
  const handleSignupStart = (userType: 'rep' | 'company' | 'user') => {
    // Track when user clicks "Sign Up" or enters the signup flow
    trackSignupStarted(
      userType,      // User type: 'rep', 'company', or 'user'
      'email'        // Optional: signup method (e.g., 'email', 'google', 'facebook')
    );
  };

  return (
    <form>
      <button onClick={() => handleSignupStart('rep')}>
        Sign Up as Rep
      </button>
      {/* Your signup form */}
    </form>
  );
}
```

### Event 5: Subscription Started

Track when a user begins the subscription checkout process.

```typescript
// Example: In your pricing/checkout component
'use client';

import { trackSubscriptionStarted } from '@/lib/analytics';

export default function PricingPage() {
  const handleSubscribe = (plan: any) => {
    // Track when user clicks "Subscribe" button
    trackSubscriptionStarted(
      plan.name,           // Plan name (e.g., "Pro Monthly")
      plan.price,          // Plan price (e.g., 19.99)
      plan.billingPeriod   // 'monthly' or 'yearly'
    );

    // Redirect to checkout
    redirectToCheckout(plan.priceId);
  };

  return (
    <div>
      <button onClick={() => handleSubscribe({
        name: 'Pro Monthly',
        price: 19.99,
        billingPeriod: 'monthly',
        priceId: 'price_xxx'
      })}>
        Subscribe
      </button>
    </div>
  );
}
```

### Event 6: Subscription Completed

Track when a user successfully completes a subscription purchase.

```typescript
// Example: In your Stripe webhook handler or success page
import { trackSubscriptionCompleted } from '@/lib/analytics';

// Server-side (webhook handler)
export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(/* ... */);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Note: Server-side tracking won't work with window.gtag
    // Instead, send event data to the client or use GA4 Measurement Protocol

    // Return success response
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  }
}

// Client-side (success page)
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackSubscriptionCompleted } from '@/lib/analytics';

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Fetch session details and track completion
      fetchSessionDetails(sessionId).then((session) => {
        trackSubscriptionCompleted(
          session.plan_name,      // Plan name
          session.amount / 100,   // Amount in dollars (Stripe returns cents)
          session.billing_period, // 'monthly' or 'yearly'
          session.id              // Optional: transaction/session ID
        );
      });
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Subscription Successful!</h1>
    </div>
  );
}
```

## Utility Functions

### Check if Analytics is Enabled

```typescript
import { isAnalyticsEnabled } from '@/lib/analytics';

if (isAnalyticsEnabled()) {
  console.log('Analytics tracking is enabled');
}
```

### Get Analytics Configuration

```typescript
import { getAnalyticsConfig } from '@/lib/analytics';

const config = getAnalyticsConfig();
console.log('GA4 Enabled:', config.ga4Enabled);
console.log('Meta Pixel Enabled:', config.metaPixelEnabled);
```

## Event Mapping

Here's how custom events are mapped between GA4 and Meta Pixel:

| Custom Event Name | GA4 Event | Meta Pixel Event |
|-------------------|-----------|------------------|
| `rep_profile_view` | `rep_profile_view` | `ViewContent` |
| `search_performed` | `search_performed` | `Search` |
| `contact_button_click` | `contact_button_click` | `Contact` |
| `signup_started` | `signup_started` | `Lead` |
| `subscription_started` | `subscription_started` | `InitiateCheckout` |
| `subscription_completed` | `subscription_completed` | `Purchase` + `CompleteRegistration` |

## Best Practices

1. **Client-Side Only**: All tracking functions must be called from client components (`'use client'`) since they interact with the browser's `window` object.

2. **Privacy Compliance**: Ensure you have proper privacy policies and cookie consent in place before tracking users.

3. **Development vs Production**: Analytics scripts only load when environment variables are set. This allows you to test without tracking development activity.

4. **Error Handling**: All tracking functions check if analytics is available before executing, so they won't throw errors if scripts fail to load.

5. **TypeScript Support**: All functions have full TypeScript type definitions for better IDE support and type safety.

## Testing

To test the implementation:

1. Add your analytics IDs to `.env.local`
2. Start the development server: `npm run dev`
3. Open your browser's developer console
4. Navigate through your app and trigger events
5. Check the Network tab for requests to:
   - `google-analytics.com/g/collect` (GA4)
   - `facebook.com/tr` (Meta Pixel)

You can also use browser extensions:
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper)

## Files Created

- `/lib/analytics.ts` - Core analytics utility functions with TypeScript types
- `/components/Analytics.tsx` - Analytics component that loads tracking scripts
- `/app/layout.tsx` - Updated to include the Analytics component
- `/.env.example` - Updated with analytics environment variables

## Support

For more information:
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
