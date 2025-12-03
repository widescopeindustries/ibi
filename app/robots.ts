import { MetadataRoute } from 'next'
import { defaultSEO } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = defaultSEO.siteUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/dashboard',
          '/api/*',
          '/auth/callback',
          '/auth/confirm',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'Claude-Web',
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
