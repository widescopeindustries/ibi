import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { defaultSEO, US_STATES } from '@/lib/seo'

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

  // State search pages
  const stateRoutes: MetadataRoute.Sitemap = US_STATES.map(state => ({
    url: `${baseUrl}/search?location=${state.code}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  // Company + State combination pages (high-value SEO pages)
  const companyStateRoutes: MetadataRoute.Sitemap = []
  if (companies && companies.length > 0) {
    for (const company of companies) {
      for (const state of US_STATES) {
        companyStateRoutes.push({
          url: `${baseUrl}/search?company=${company.slug}&location=${state.code}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.5,
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
