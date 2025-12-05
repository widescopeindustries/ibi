import React from 'react'
import { defaultSEO } from './seo'

/**
 * Base structured data interface
 */
export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

/**
 * Generate Organization schema for homepage
 */
export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/logo.png`,
    description: defaultSEO.description,
    sameAs: [
      // Add social media URLs here when available
      // 'https://www.facebook.com/arepnearme',
      // 'https://twitter.com/arepnearme',
      // 'https://www.linkedin.com/company/arepnearme',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  }
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    description: defaultSEO.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.siteUrl}/search?location={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate LocalBusiness schema for rep profiles
 */
export function generateRepProfileSchema(params: {
  firstName: string
  lastName: string
  bio?: string
  city?: string
  state?: string
  zipCode?: string
  profilePictureUrl?: string
  personalWebsiteUrl?: string
  companies: string[]
  averageRating?: number
  reviewCount?: number
  profileId: string
}): StructuredData {
  const {
    firstName,
    lastName,
    bio,
    city,
    state,
    zipCode,
    profilePictureUrl,
    personalWebsiteUrl,
    companies,
    averageRating,
    reviewCount,
    profileId,
  } = params

  const fullName = `${firstName} ${lastName}`.trim()
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${defaultSEO.siteUrl}/rep/${profileId}`,
    name: fullName,
    description: bio || `Direct sales representative for ${companies.join(', ')}`,
    url: `${defaultSEO.siteUrl}/rep/${profileId}`,
  }

  if (profilePictureUrl) {
    schema.image = profilePictureUrl
  }

  if (personalWebsiteUrl) {
    schema.url = personalWebsiteUrl
  }

  // Address information
  if (city || state || zipCode) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: state,
      postalCode: zipCode,
      addressCountry: 'US',
    }
  }

  // Aggregate rating
  if (averageRating && reviewCount && reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviewCount,
      bestRating: '5',
      worstRating: '1',
    }
  }

  return schema
}

/**
 * Generate Person schema for rep profiles (alternative to LocalBusiness)
 */
export function generatePersonSchema(params: {
  firstName: string
  lastName: string
  bio?: string
  city?: string
  state?: string
  profilePictureUrl?: string
  personalWebsiteUrl?: string
  companies: string[]
  profileId: string
}): StructuredData {
  const {
    firstName,
    lastName,
    bio,
    city,
    state,
    profilePictureUrl,
    personalWebsiteUrl,
    companies,
    profileId,
  } = params

  const fullName = `${firstName} ${lastName}`.trim()
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${defaultSEO.siteUrl}/rep/${profileId}`,
    name: fullName,
    givenName: firstName,
    familyName: lastName,
    url: `${defaultSEO.siteUrl}/rep/${profileId}`,
  }

  if (bio) {
    schema.description = bio
  }

  if (profilePictureUrl) {
    schema.image = profilePictureUrl
  }

  if (personalWebsiteUrl) {
    schema.sameAs = [personalWebsiteUrl]
  }

  if (city || state) {
    schema.homeLocation = {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: state,
        addressCountry: 'US',
      },
    }
  }

  // Job title
  if (companies.length > 0) {
    schema.jobTitle = `Direct Sales Representative`
    schema.worksFor = companies.map(company => ({
      '@type': 'Organization',
      name: company,
    }))
  }

  return schema
}

/**
 * Generate Review schema
 */
export function generateReviewSchema(params: {
  reviewerName: string
  rating: number
  comment?: string
  createdAt: string
  repFirstName: string
  repLastName: string
  profileId: string
}): StructuredData {
  const {
    reviewerName,
    rating,
    comment,
    createdAt,
    repFirstName,
    repLastName,
    profileId,
  } = params

  const repFullName = `${repFirstName} ${repLastName}`.trim()

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: repFullName,
      url: `${defaultSEO.siteUrl}/rep/${profileId}`,
    },
    author: {
      '@type': 'Person',
      name: reviewerName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: comment || undefined,
    datePublished: createdAt,
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string
  url: string
}>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate ItemList schema for search results
 */
export function generateSearchResultsSchema(params: {
  items: Array<{
    name: string
    url: string
    description?: string
    image?: string
  }>
  totalResults: number
}): StructuredData {
  const { items, totalResults } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: totalResults,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: item.name,
        url: item.url,
        description: item.description,
        image: item.image,
      },
    })),
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{
    question: string
    answer: string
  }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate CollectionPage schema for company listings
 */
export function generateCompanyCollectionSchema(params: {
  companyName: string
  description?: string
  repCount: number
  slug: string
}): StructuredData {
  const { companyName, description, repCount, slug } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${companyName} Representatives`,
    description: description || `Find ${companyName} direct sales representatives in your area`,
    url: `${defaultSEO.siteUrl}/companies/${slug}`,
    numberOfItems: repCount,
  }
}

/**
 * Helper function to render structured data as script tag
 */
export function renderStructuredData(data: StructuredData | StructuredData[]): string {
  const schemaArray = Array.isArray(data) ? data : [data]
  return JSON.stringify(schemaArray.length === 1 ? schemaArray[0] : schemaArray)
}

/**
 * Component to inject structured data into page
 */
export function StructuredDataScript({ data }: { data: StructuredData | StructuredData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: renderStructuredData(data) }}
    />
  )
}
