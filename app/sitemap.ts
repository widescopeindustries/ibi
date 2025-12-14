import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { defaultSEO } from '@/lib/seo'

// Revalidate every hour to ensure fresh sitemap without impacting performance
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = defaultSEO.siteUrl

  // Static routes (always include these)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  let companyRoutes: MetadataRoute.Sitemap = []
  let repRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()

    // Fetch companies with timeout protection
    const companiesPromise = supabase
      .from('companies')
      .select('slug, created_at')
      .order('name')

    const { data: companies, error: companiesError } = await Promise.race([
      companiesPromise,
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error('Timeout') }), 5000)
      ),
    ])

    if (!companiesError && companies) {
      companyRoutes = companies.map((company) => ({
        url: `${baseUrl}/${company.slug}`,
        lastModified: new Date(company.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }

    // Fetch profiles with timeout protection
    const profilesPromise = supabase
      .from('profiles')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(1000) // Limit to prevent excessive sitemap size

    const { data: profiles, error: profilesError } = await Promise.race([
      profilesPromise,
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error('Timeout') }), 5000)
      ),
    ])

    if (!profilesError && profiles) {
      repRoutes = profiles.map((profile) => ({
        url: `${baseUrl}/rep/${profile.id}`,
        lastModified: new Date(profile.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    // Log error but don't fail the entire sitemap
    console.error('Sitemap generation error:', error)
    // Return static routes at minimum to prevent redirect errors
  }

  // Note: Removed state and company+state search URLs with query parameters
  // Google Search Console has issues parsing sitemaps with query parameter URLs
  // This was causing the \"Parsing error\" at line 400
  //
  // Query parameter URLs that were removed:
  //   - /search?location=CA (50 state URLs)
  //   - /search?company=slug&location=STATE (potentially thousands of URLs)
  //
  // If you need these URLs for SEO, create dedicated static routes instead:
  //   - /states/[code] for state pages
  //   - /companies/[slug]/states/[code] for company+state pages

  // Combine all routes
  return [
    ...staticRoutes,
    ...companyRoutes,
    ...repRoutes,
  ]
}
