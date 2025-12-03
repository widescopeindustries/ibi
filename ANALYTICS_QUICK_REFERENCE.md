# Analytics Quick Reference

## Import Statement
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

## Function Signatures

### 1. Track Rep Profile View
```typescript
trackRepProfileView(
  repId: string,
  companyName: string,
  location?: string
)
```

### 2. Track Search
```typescript
trackSearchPerformed(
  searchTerm: string,
  resultsCount: number,
  filters?: string
)
```

### 3. Track Contact Click
```typescript
trackContactClick(
  repId: string,
  contactMethod: 'email' | 'phone' | 'website' | 'social',
  companyName?: string
)
```

### 4. Track Signup Started
```typescript
trackSignupStarted(
  userType: 'rep' | 'company' | 'user',
  signupMethod?: 'email' | 'google' | 'facebook'
)
```

### 5. Track Subscription Started
```typescript
trackSubscriptionStarted(
  planName: string,
  planPrice: number,
  billingPeriod: 'monthly' | 'yearly'
)
```

### 6. Track Subscription Completed
```typescript
trackSubscriptionCompleted(
  planName: string,
  planPrice: number,
  billingPeriod: 'monthly' | 'yearly',
  transactionId?: string
)
```

## Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

## Key Points

- All functions work client-side only (use in `'use client'` components)
- Page views are tracked automatically
- Safe to call even if analytics isn't configured
- Full TypeScript support included
- Events tracked in both GA4 and Meta Pixel simultaneously
