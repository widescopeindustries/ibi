# SEO Quick Reference Guide

## Common Tasks

### Adding Metadata to a New Page

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description (max 160 characters)',
}
```

### Adding Dynamic Metadata

```typescript
import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export async function generateMetadata({ params }): Promise<Metadata> {
  // Fetch data if needed
  const data = await fetchData(params.id)

  return generateSEO({
    title: `${data.name} - Page Title`,
    description: data.description,
    canonical: `https://yourdomain.com/path/${params.id}`,
    openGraph: {
      images: [data.imageUrl],
    },
  })
}
```

### Adding Structured Data

```typescript
import { StructuredDataScript, generateOrganizationSchema } from '@/lib/structured-data'

export default function Page() {
  const schema = generateOrganizationSchema()

  return (
    <>
      <StructuredDataScript data={schema} />
      {/* Your page content */}
    </>
  )
}
```

### Adding Multiple Schemas

```typescript
const schemas = [
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateBreadcrumbSchema([
    { name: 'Home', url: 'https://yourdomain.com' },
    { name: 'Page', url: 'https://yourdomain.com/page' },
  ])
]

<StructuredDataScript data={schemas} />
```

## Available SEO Functions

### From `/lib/seo.ts`

```typescript
// General metadata generator
generateSEO({
  title: string
  description: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  openGraph?: {...}
  twitter?: {...}
})

// Specific page generators
generateHomeMetadata()
generateSearchMetadata({ company?, location? })
generateRepMetadata({ firstName, lastName, city, state, companies, bio, ... })
generateCompanyMetadata({ companyName, category, description, repCount, slug })
generateStateMetadata({ stateName, stateCode })
```

### From `/lib/structured-data.ts`

```typescript
// Organization & Website
generateOrganizationSchema()
generateWebSiteSchema()

// Business & People
generateRepProfileSchema({ firstName, lastName, companies, ... })
generatePersonSchema({ firstName, lastName, ... })

// Reviews & Ratings
generateReviewSchema({ reviewerName, rating, comment, ... })

// Navigation
generateBreadcrumbSchema([{ name, url }, ...])

// Collections
generateSearchResultsSchema({ items, totalResults })
generateCompanyCollectionSchema({ companyName, repCount, ... })

// FAQ
generateFAQSchema([{ question, answer }, ...])
```

## Testing Checklist

Before deploying SEO changes:

- [ ] Verify metadata in browser DevTools
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test social sharing previews
- [ ] Validate canonical URLs
- [ ] Check mobile responsiveness
- [ ] Test page load speed

## Common Patterns

### Company Page

```typescript
export async function generateMetadata({ params }) {
  const company = await fetchCompany(params.slug)

  return generateCompanyMetadata({
    companyName: company.name,
    category: company.category,
    description: company.description,
    repCount: company.rep_count,
    slug: params.slug,
  })
}

export default function CompanyPage({ params }) {
  const schema = generateCompanyCollectionSchema({...})
  return (
    <>
      <StructuredDataScript data={schema} />
      {/* Content */}
    </>
  )
}
```

### Location Page

```typescript
export function generateMetadata({ searchParams }) {
  return generateStateMetadata({
    stateName: 'California',
    stateCode: searchParams.location,
  })
}
```

### Profile Page with Reviews

```typescript
export default function ProfilePage() {
  const profileSchema = generateRepProfileSchema({...})
  const reviewSchemas = reviews.map(r => generateReviewSchema({...}))
  const breadcrumb = generateBreadcrumbSchema([...])

  return (
    <>
      <StructuredDataScript data={[profileSchema, breadcrumb, ...reviewSchemas]} />
      {/* Content */}
    </>
  )
}
```

## Environment Setup

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## File Locations

```
/lib/seo.ts                          - SEO utility functions
/lib/structured-data.ts              - JSON-LD schema generators
/app/sitemap.ts                      - Dynamic sitemap
/app/robots.ts                       - Robots.txt configuration
/app/layout.tsx                      - Root metadata
/app/page.tsx                        - Homepage with schemas
/app/search/page.tsx                 - Search with dynamic metadata
/app/rep/[profileId]/page.tsx        - Rep profiles with schemas
```

## Priority Levels for Sitemap

- 1.0 - Homepage
- 0.9 - Main search page
- 0.8 - Company pages
- 0.7 - Rep profiles
- 0.6 - State pages
- 0.5 - Filtered pages

## Change Frequencies

- daily - Homepage, search results
- weekly - Company pages, rep profiles
- monthly - Static pages, auth pages

## Debugging Tips

### View Generated Metadata
```typescript
// Add to page for debugging
console.log('Metadata:', await generateMetadata({ params }))
```

### Validate Structured Data
1. Visit page
2. View source
3. Find `<script type="application/ld+json">`
4. Copy JSON
5. Paste into [Schema.org validator](https://validator.schema.org/)

### Check Sitemap Generation
```bash
# Development
npm run dev
# Visit http://localhost:3000/sitemap.xml
```

### Test Robots.txt
```bash
# Visit http://localhost:3000/robots.txt
```

## Social Media Image Specs

- **Open Graph**: 1200x630px (recommended)
- **Twitter Card**: 1200x600px (recommended)
- **Format**: JPG or PNG
- **Max file size**: 8MB (recommended < 1MB)

## Meta Description Best Practices

- Length: 120-160 characters
- Include primary keyword
- Include location if relevant
- Add call-to-action
- Make it unique for each page
- Be descriptive and compelling

## Title Tag Best Practices

- Length: 50-60 characters
- Include primary keyword
- Include brand name
- Format: "Page Title | Brand Name"
- Make it unique for each page
- Front-load important keywords

## Common Issues & Solutions

### Issue: Duplicate meta descriptions
**Solution**: Use `generateMetadata()` function for dynamic pages

### Issue: Missing structured data
**Solution**: Add `<StructuredDataScript data={schema} />` to page

### Issue: Sitemap not updating
**Solution**: Clear build cache and rebuild

### Issue: Canonical URLs not working
**Solution**: Verify `NEXT_PUBLIC_SITE_URL` is set correctly

### Issue: Open Graph images not showing
**Solution**: Ensure images are absolute URLs, not relative paths

## Performance Tips

- Keep structured data under 100KB per page
- Minimize number of schemas (max 5-7 per page)
- Use server-side rendering for metadata
- Optimize images referenced in Open Graph tags
- Cache sitemap generation in production

## Maintenance Schedule

### Weekly
- Check Google Search Console for errors
- Monitor crawl stats

### Monthly
- Review top pages in search
- Update underperforming meta descriptions
- Check for broken links

### Quarterly
- Full SEO audit
- Competitor analysis
- Update keyword strategy

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
