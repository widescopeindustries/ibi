import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { defaultSEO, US_STATES } from '@/lib/seo'

// Convert state name to URL slug
function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = defaultSEO.siteUrl
  const supabase = await createClient()

  // Static routes
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
      url: `${baseUrl}/find`,
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

  // Fetch all companies
  const { data: companies } = await supabase
    .from('companies')
    .select('slug, created_at')
    .order('name')

  const companyRoutes: MetadataRoute.Sitemap =
    companies?.map(company => ({
      url: `${baseUrl}/companies/${company.slug}`,
      lastModified: new Date(company.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

  // Fetch all rep profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, created_at')
    .order('created_at', { ascending: false })

  const repRoutes: MetadataRoute.Sitemap =
    profiles?.map(profile => ({
      url: `${baseUrl}/rep/${profile.id}`,
      lastModified: new Date(profile.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || []

  // State landing pages (clean URLs for better SEO)
  const stateRoutes: MetadataRoute.Sitemap = US_STATES.map(state => ({
    url: `${baseUrl}/find/${stateNameToSlug(state.name)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Company + State combination pages (high-value SEO pages with clean URLs)
  // URL structure: /find/[state]/[company] e.g., /find/california/mary-kay
  const companyStateRoutes: MetadataRoute.Sitemap = []
  if (companies && companies.length > 0) {
    for (const state of US_STATES) {
      for (const company of companies) {
        companyStateRoutes.push({
          url: `${baseUrl}/find/${stateNameToSlug(state.name)}/${company.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })
      }
    }
  }

  // Combine all routes
  return [
    ...staticRoutes,
    ...companyRoutes,
    ...repRoutes,
    ...stateRoutes,
    ...companyStateRoutes,
  ]
}
