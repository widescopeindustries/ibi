# SEO Implementation Guide

This document outlines the comprehensive SEO infrastructure implemented for the IBI Sales Rep Directory.

## Overview

The SEO implementation follows Next.js 14 App Router best practices and includes:

1. **SEO Utilities** - Centralized functions for generating meta tags
2. **Structured Data** - JSON-LD schemas for rich search results
3. **Dynamic Sitemap** - Automated sitemap generation including all pages
4. **Robots.txt** - Crawler configuration
5. **Page-Level Metadata** - Dynamic metadata for all key pages

## Files Created

### 1. `/lib/seo.ts`

Core SEO utility file containing:

- `generateSEO()` - Main function to generate Next.js Metadata objects
- `generateHomeMetadata()` - Homepage-specific metadata
- `generateSearchMetadata()` - Search page metadata with dynamic params
- `generateRepMetadata()` - Rep profile metadata with rich data
- `generateCompanyMetadata()` - Company page metadata
- `generateStateMetadata()` - State-specific search page metadata
- `defaultSEO` - Global SEO configuration object
- `US_STATES` - Array of all US states for sitemap generation

**Key Features:**
- Title templates for consistent branding
- Open Graph tags for social sharing
- Twitter Card optimization
- Canonical URL management
- Robots meta tag control

### 2. `/lib/structured-data.ts`

JSON-LD structured data generators:

- `generateOrganizationSchema()` - Organization schema for homepage
- `generateWebSiteSchema()` - Website schema with search action
- `generateRepProfileSchema()` - LocalBusiness schema for rep profiles
- `generatePersonSchema()` - Person schema for reps
- `generateReviewSchema()` - Review schema for rep reviews
- `generateBreadcrumbSchema()` - Breadcrumb navigation
- `generateSearchResultsSchema()` - ItemList for search results
- `generateFAQSchema()` - FAQ structured data
- `generateCompanyCollectionSchema()` - Company listings
- `StructuredDataScript` - React component to inject schemas

**Benefits:**
- Enhanced search result appearance
- Rich snippets in Google
- Better understanding of content by search engines
- Star ratings display in search results

### 3. `/app/sitemap.ts`

Dynamic sitemap generation including:

- Static pages (home, search, companies, pricing, auth)
- All company pages (`/companies/[slug]`)
- All rep profile pages (`/rep/[profileId]`)
- State search pages (`/search?location=[state]`)
- Company + State combinations (`/search?company=[slug]&location=[state]`)

**Features:**
- Automatic updates when new content is added
- Proper priority and change frequency settings
- Optimized for search engine crawling

**Priority Levels:**
- Homepage: 1.0
- Search: 0.9
- Companies: 0.8
- Rep Profiles: 0.7
- State Pages: 0.6
- Company+State Combos: 0.5

### 4. `/app/robots.ts`

Dynamic robots.txt configuration:

- Allows all major search engines
- Blocks AI crawlers (GPTBot, Claude-Web, CCBot, etc.)
- Disallows dashboard and auth pages
- References sitemap location
- Prevents API endpoint indexing

### 5. Updated Pages

#### `/app/layout.tsx`
- Enhanced default metadata with metadataBase
- Comprehensive Open Graph tags
- Twitter Card configuration
- Keywords array for SEO
- Verification placeholders for Google/Bing
- Proper favicon and manifest links

#### `/app/page.tsx`
- Homepage metadata with `generateHomeMetadata()`
- Organization structured data
- Website structured data with search action
- Optimized for "find direct sales rep" queries

#### `/app/search/page.tsx`
- Dynamic metadata based on search parameters
- Company and location-specific titles
- Breadcrumb structured data
- Optimized for local search queries

#### `/app/rep/[profileId]/page.tsx`
- Dynamic metadata using `generateMetadata()`
- LocalBusiness structured data
- Person structured data
- Individual review schemas
- Breadcrumb navigation
- Profile picture in Open Graph
- Rating display in meta description

## Configuration

### Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

This is used throughout the SEO implementation for canonical URLs and structured data.

### Customization

To customize SEO settings, edit `/lib/seo.ts`:

```typescript
export const defaultSEO = {
  siteName: 'IBI Sales Rep Directory',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ibidirectory.com',
  titleTemplate: '%s | IBI Sales Rep Directory',
  description: '...',
  twitter: {
    site: '@IBIDirectory', // Update with your Twitter handle
    cardType: 'summary_large_image' as const,
  },
  // ...
}
```

## Testing

### 1. Verify Metadata

Use browser dev tools to inspect `<head>` tags:

```bash
npm run dev
```

Then visit pages and check:
- Title tags
- Meta descriptions
- Open Graph tags
- Structured data scripts

### 2. Test Structured Data

Use Google's Rich Results Test:
https://search.google.com/test/rich-results

Test these URLs:
- Homepage (Organization + WebSite schema)
- Rep Profile (LocalBusiness + Person + Review schemas)
- Search Page (Breadcrumb schema)

### 3. Validate Sitemap

Visit `/sitemap.xml` to ensure all URLs are included:
- http://localhost:3000/sitemap.xml

### 4. Check Robots.txt

Visit `/robots.txt`:
- http://localhost:3000/robots.txt

## SEO Best Practices Implemented

### Technical SEO
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Meta descriptions under 160 characters
- ✅ Canonical URLs to prevent duplicate content
- ✅ Mobile-responsive design (inherent in Tailwind)
- ✅ Fast page loads with Next.js optimization
- ✅ XML sitemap for search engines
- ✅ Robots.txt configuration

### On-Page SEO
- ✅ Unique titles for each page
- ✅ Descriptive meta descriptions
- ✅ Keyword-rich content
- ✅ Internal linking structure
- ✅ Alt text for images (implement in Image components)
- ✅ Schema markup for rich results

### Local SEO
- ✅ Location-specific pages for each state
- ✅ City/State in rep profile titles
- ✅ LocalBusiness schema with address
- ✅ Breadcrumb navigation for better UX

### Social Media SEO
- ✅ Open Graph tags for Facebook/LinkedIn
- ✅ Twitter Card tags
- ✅ Social sharing images
- ✅ Proper descriptions for social previews

## Next Steps

### 1. Create Images

Create these images in the `/public` directory:

- `/public/og-image.jpg` (1200x630px) - Default Open Graph image
- `/public/favicon.ico` - Site favicon
- `/public/apple-touch-icon.png` (180x180px) - iOS icon
- `/public/site.webmanifest` - PWA manifest file

### 2. Submit to Search Engines

After deployment:

1. **Google Search Console**
   - Add your domain
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Request indexing for key pages

2. **Bing Webmaster Tools**
   - Add your site
   - Submit sitemap
   - Verify ownership

### 3. Set Up Monitoring

- Google Analytics (already implemented via Analytics component)
- Google Search Console for search performance
- Monitor rankings for key terms:
  - "find [company] rep near me"
  - "[company] representative in [state]"
  - "direct sales rep [city]"

### 4. Content Optimization

Encourage reps to:
- Fill out complete profiles with bio
- Add high-quality profile pictures
- Collect customer reviews
- Link to their personal websites

### 5. Verification Codes

Add verification meta tags in `/app/layout.tsx`:

```typescript
verification: {
  google: 'your-google-verification-code',
  bing: 'your-bing-verification-code',
}
```

## Key SEO Opportunities

### High-Value Pages
1. **State Landing Pages**: Each state has a dedicated search page
2. **Company Pages**: Each company has a dedicated page
3. **Company + State Combos**: e.g., "Mary Kay reps in California"
4. **Rep Profiles**: Individual pages with rich content

### Target Keywords

**Primary:**
- "find [company] rep near me"
- "[company] representative in [state]"
- "direct sales rep directory"

**Secondary:**
- "local [company] consultant"
- "buy from [company] rep"
- "[company] [city] [state]"

**Long-tail:**
- "where to buy [product] near [location]"
- "independent [company] consultant [city]"

## Sitemap Structure

```
Homepage (/)
├── Search (/search)
│   ├── By State (/search?location=CA)
│   ├── By Company (/search?company=mary-kay)
│   └── Company + State (/search?company=mary-kay&location=CA)
├── Companies (/companies)
│   └── Company Detail (/companies/mary-kay)
├── Rep Profiles (/rep/[id])
├── Pricing (/pricing)
└── Auth Pages (/auth/*)
```

## Performance Considerations

- Structured data is generated server-side (no client-side overhead)
- Metadata is static or generated at request time
- Sitemap is generated dynamically but can be cached
- All SEO elements are optimized for Core Web Vitals

## Maintenance

### Monthly Tasks
- Review search console for crawl errors
- Check for broken links
- Update content for seasonal relevance
- Analyze keyword performance

### Quarterly Tasks
- Update company list
- Review and optimize underperforming pages
- Analyze competitor SEO strategies
- Update meta descriptions based on performance

### Annual Tasks
- Comprehensive SEO audit
- Update structured data to latest Schema.org specs
- Review and update target keywords
- Evaluate need for new landing pages

## Support Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/)

## Notes

- All metadata is TypeScript type-safe
- Structured data follows Schema.org standards
- SEO configuration is centralized for easy updates
- Implementation follows Next.js 14 App Router patterns
- Ready for production deployment
