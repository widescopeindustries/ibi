/**
 * EXAMPLE INTEGRATION FILE
 *
 * This file shows practical examples of how to integrate analytics tracking
 * into your existing components. DO NOT import this file directly - instead,
 * copy the relevant patterns into your actual components.
 */

// ============================================================================
// EXAMPLE 1: Rep Profile Page
// ============================================================================

'use client';

import { useEffect } from 'react';
import { trackRepProfileView } from '@/lib/analytics';

interface RepProfilePageProps {
  rep: {
    id: string;
    name: string;
    company: {
      name: string;
    };
    location: string;
  };
}

export function RepProfilePageExample({ rep }: RepProfilePageProps) {
  // Track profile view when component mounts
  useEffect(() => {
    trackRepProfileView(rep.id, rep.company.name, rep.location);
  }, [rep.id, rep.company.name, rep.location]);

  return (
    <div>
      <h1>{rep.name}</h1>
      <p>{rep.company.name}</p>
      <p>{rep.location}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Search Component
// ============================================================================

'use client';

import { useState } from 'react';
import { trackSearchPerformed } from '@/lib/analytics';

export function SearchComponentExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Perform the search
    const searchResults = await fetch(`/api/search?q=${searchTerm}`);
    const data = await searchResults.json();

    setResults(data.results);

    // Track the search event
    trackSearchPerformed(searchTerm, data.results.length);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for reps..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Contact Buttons Component
// ============================================================================

'use client';

import { trackContactClick } from '@/lib/analytics';

interface ContactButtonsProps {
  repId: string;
  companyName: string;
  email?: string;
  phone?: string;
  website?: string;
}

export function ContactButtonsExample({
  repId,
  companyName,
  email,
  phone,
  website,
}: ContactButtonsProps) {
  const handleEmailClick = () => {
    trackContactClick(repId, 'email', companyName);
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handlePhoneClick = () => {
    trackContactClick(repId, 'phone', companyName);
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWebsiteClick = () => {
    trackContactClick(repId, 'website', companyName);
    if (website) {
      window.open(website, '_blank');
    }
  };

  return (
    <div className="flex gap-4">
      {email && (
        <button
          onClick={handleEmailClick}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Email
        </button>
      )}
      {phone && (
        <button
          onClick={handlePhoneClick}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Call
        </button>
      )}
      {website && (
        <button
          onClick={handleWebsiteClick}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Visit Website
        </button>
      )}
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Signup Form Component
// ============================================================================

'use client';

import { useState } from 'react';
import { trackSignupStarted } from '@/lib/analytics';

export function SignupFormExample() {
  const [userType, setUserType] = useState<'rep' | 'company' | 'user'>('rep');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track signup started
    trackSignupStarted(userType, 'email');

    // Proceed with signup logic
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value as any)}
      >
        <option value="rep">Sales Rep</option>
        <option value="company">Company</option>
        <option value="user">User</option>
      </select>

      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />

      <button type="submit">Sign Up</button>
    </form>
  );
}

// ============================================================================
// EXAMPLE 5: Pricing/Subscription Component
// ============================================================================

'use client';

import { trackSubscriptionStarted } from '@/lib/analytics';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  stripePriceId: string;
}

export function PricingCardExample({ plan }: { plan: PricingPlan }) {
  const handleSubscribe = async () => {
    // Track subscription started
    trackSubscriptionStarted(plan.name, plan.price, plan.billingPeriod);

    // Redirect to Stripe checkout
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: plan.stripePriceId }),
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="text-3xl font-bold mt-4">
        ${plan.price}
        <span className="text-sm font-normal">/{plan.billingPeriod}</span>
      </p>
      <button
        onClick={handleSubscribe}
        className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        Subscribe Now
      </button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Subscription Success Page
// ============================================================================

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackSubscriptionCompleted } from '@/lib/analytics';

export function SubscriptionSuccessPageExample() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams?.get('session_id');

    if (sessionId) {
      // Fetch session details from your backend
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((session) => {
          // Track subscription completed
          trackSubscriptionCompleted(
            session.plan_name,
            session.amount_total / 100, // Convert cents to dollars
            session.billing_period,
            session.id
          );
        })
        .catch((error) => {
          console.error('Error fetching session:', error);
        });
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Subscription Successful!
      </h1>
      <p className="text-lg text-gray-600">
        Thank you for subscribing. Your account is now active.
      </p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Advanced Search with Filters
// ============================================================================

'use client';

import { useState } from 'react';
import { trackSearchPerformed } from '@/lib/analytics';

interface SearchFilters {
  location?: string;
  company?: string;
  radius?: number;
}

export function AdvancedSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Build query parameters
    const params = new URLSearchParams({
      q: searchTerm,
      ...filters,
    });

    // Perform search
    const response = await fetch(`/api/search?${params}`);
    const data = await response.json();

    setResults(data.results);

    // Track search with filters
    trackSearchPerformed(
      searchTerm,
      data.results.length,
      JSON.stringify(filters) // Serialize filters for tracking
    );
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <div className="filters">
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        >
          <option value="">All Companies</option>
          <option value="mary-kay">Mary Kay</option>
          <option value="avon">Avon</option>
        </select>
      </div>

      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Social Media Contact Links
// ============================================================================

'use client';

import { trackContactClick } from '@/lib/analytics';

interface SocialLinksProps {
  repId: string;
  companyName: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export function SocialLinksExample({
  repId,
  companyName,
  facebook,
  instagram,
  linkedin,
}: SocialLinksProps) {
  const handleSocialClick = (platform: string, url: string) => {
    trackContactClick(repId, 'social', companyName);
    window.open(url, '_blank');
  };

  return (
    <div className="flex gap-3">
      {facebook && (
        <button onClick={() => handleSocialClick('facebook', facebook)}>
          Facebook
        </button>
      )}
      {instagram && (
        <button onClick={() => handleSocialClick('instagram', instagram)}>
          Instagram
        </button>
      )}
      {linkedin && (
        <button onClick={() => handleSocialClick('linkedin', linkedin)}>
          LinkedIn
        </button>
      )}
    </div>
  );
}

// ============================================================================
// NOTES:
//
// 1. All these examples use 'use client' because tracking functions need
//    access to the browser's window object.
//
// 2. Always track events AFTER the user action has been initiated but
//    BEFORE any redirects or navigation.
//
// 3. For form submissions, track the event in the onSubmit handler before
//    the form is actually submitted.
//
// 4. For link clicks that navigate away, track before the navigation.
//
// 5. For API calls, track after receiving the response to ensure you have
//    accurate data (like results count).
//
// 6. Consider error handling - you may want to track failed actions too
//    for better insights into user experience.
// ============================================================================
