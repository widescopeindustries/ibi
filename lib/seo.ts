import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  openGraph?: {
    title?: string
    description?: string
    type?: string
    images?: string[]
    locale?: string
    siteName?: string
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
    site?: string
    creator?: string
    title?: string
    description?: string
    images?: string[]
  }
  additionalMetaTags?: Array<{
    name?: string
    property?: string
    content: string
  }>
}

// Default SEO configuration
export const defaultSEO = {
  siteName: 'A Rep Near Me',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://arepnearme.com',
  titleTemplate: '%s | A Rep Near Me',
  description: 'Find direct sales representatives for Mary Kay, Pampered Chef, Avon, and more. Connect with local reps in your area.',
  twitter: {
    site: '@ARepNearMe',
    cardType: 'summary_large_image' as const,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'A Rep Near Me',
  },
}

/**
 * Generate metadata for Next.js pages
 */
export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    canonical,
    noindex = false,
    nofollow = false,
    openGraph,
    twitter,
    additionalMetaTags = [],
  } = config

  const fullTitle = title.includes('|') ? title : `${title} | ${defaultSEO.siteName}`
  const url = canonical || defaultSEO.siteUrl

  const metadata: Metadata = {
    title,
    description,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      url: url,
      siteName: openGraph?.siteName || defaultSEO.openGraph.siteName,
      locale: openGraph?.locale || defaultSEO.openGraph.locale,
      type: (openGraph?.type as any) || defaultSEO.openGraph.type,
      images: openGraph?.images || [
        {
          url: `${defaultSEO.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: defaultSEO.siteName,
        },
      ],
    },
    twitter: {
      card: twitter?.card || defaultSEO.twitter.cardType,
      site: twitter?.site || defaultSEO.twitter.site,
      creator: twitter?.creator || defaultSEO.twitter.site,
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      images: twitter?.images || openGraph?.images || [`${defaultSEO.siteUrl}/og-image.jpg`],
    },
  }

  return metadata
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return generateSEO({
    title: 'Find Direct Sales Representatives Near You',
    description: 'Connect with local direct sales representatives from top companies like Mary Kay, Pampered Chef, Avon, Tupperware, Scentsy, and more. Search by company, location, or ZIP code.',
    canonical: defaultSEO.siteUrl,
    openGraph: {
      title: 'Find Direct Sales Representatives Near You',
      description: 'Connect with local direct sales representatives from top companies like Mary Kay, Pampered Chef, Avon, Tupperware, and more.',
      type: 'website',
    },
  })
}

/**
 * Generate metadata for search page
 */
export function generateSearchMetadata(params: {
  company?: string
  location?: string
}): Metadata {
  const { company, location } = params

  let title = 'Find a Sales Representative'
  let description = 'Search our directory of direct sales representatives.'

  if (company && location) {
    title = `${company} Representatives in ${location}`
    description = `Find ${company} direct sales representatives in ${location}. Connect with local reps in your area.`
  } else if (company) {
    title = `Find ${company} Representatives`
    description = `Connect with ${company} direct sales representatives. Browse our directory of verified reps.`
  } else if (location) {
    title = `Sales Representatives in ${location}`
    description = `Find direct sales representatives in ${location}. Browse reps from Mary Kay, Pampered Chef, Avon, and more.`
  }

  return generateSEO({
    title,
    description,
    canonical: `${defaultSEO.siteUrl}/search`,
  })
}

/**
 * Generate metadata for rep profile page
 */
export function generateRepMetadata(params: {
  firstName: string
  lastName: string
  city?: string
  state?: string
  companies: string[]
  bio?: string
  averageRating?: number
  reviewCount?: number
  profilePictureUrl?: string
  profileId: string
}): Metadata {
  const {
    firstName,
    lastName,
    city,
    state,
    companies,
    bio,
    averageRating,
    reviewCount,
    profilePictureUrl,
    profileId,
  } = params

  const fullName = `${firstName} ${lastName}`.trim() || 'Sales Representative'
  const location = [city, state].filter(Boolean).join(', ')
  const companiesList = companies.length > 0 ? companies.join(', ') : 'Direct Sales'

  const title = location
    ? `${fullName} - ${companiesList} Representative in ${location}`
    : `${fullName} - ${companiesList} Representative`

  let description = `Connect with ${fullName}, a direct sales representative`
  if (companies.length > 0) {
    description += ` for ${companiesList}`
  }
  if (location) {
    description += ` in ${location}`
  }
  description += '.'

  if (bio) {
    description += ` ${bio.substring(0, 100)}${bio.length > 100 ? '...' : ''}`
  }

  if (averageRating && reviewCount) {
    description += ` Rated ${averageRating.toFixed(1)}/5 stars from ${reviewCount} reviews.`
  }

  const images = profilePictureUrl
    ? [profilePictureUrl]
    : [`${defaultSEO.siteUrl}/og-image.jpg`]

  return generateSEO({
    title,
    description,
    canonical: `${defaultSEO.siteUrl}/rep/${profileId}`,
    openGraph: {
      title,
      description,
      type: 'profile',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  })
}

/**
 * Generate metadata for company page
 */
export function generateCompanyMetadata(params: {
  companyName: string
  category?: string
  description?: string
  repCount?: number
  slug: string
}): Metadata {
  const { companyName, category, description, repCount, slug } = params

  const title = `Find ${companyName} Representatives`
  let desc = `Connect with ${companyName} direct sales representatives in your area.`

  if (category) {
    desc += ` Browse ${category.toLowerCase()} products and services.`
  }

  if (repCount) {
    desc += ` ${repCount} verified representatives available.`
  }

  if (description) {
    desc = description
  }

  return generateSEO({
    title,
    description: desc,
    canonical: `${defaultSEO.siteUrl}/${slug}`,
    openGraph: {
      title,
      description: desc,
      type: 'website',
    },
  })
}

/**
 * Generate metadata for state search pages
 */
export function generateStateMetadata(params: {
  stateName: string
  stateCode: string
}): Metadata {
  const { stateName, stateCode } = params

  const title = `Direct Sales Representatives in ${stateName}`
  const description = `Find local direct sales representatives in ${stateName}. Connect with Mary Kay, Pampered Chef, Avon, Tupperware, Scentsy, and other direct sales reps in your area.`

  return generateSEO({
    title,
    description,
    canonical: `${defaultSEO.siteUrl}/search?location=${stateCode}`,
  })
}

/**
 * US States for sitemap generation
 */
export const US_STATES = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' },
]
