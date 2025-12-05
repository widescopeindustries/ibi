import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { defaultSEO } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(defaultSEO.siteUrl),
  title: {
    default: 'A Rep Near Me - Finding Agents Inspired by Independence',
    template: '%s | A Rep Near Me',
  },
  description: defaultSEO.description,
  keywords: [
    'direct sales',
    'sales representatives',
    'Mary Kay',
    'Pampered Chef',
    'Avon',
    'Tupperware',
    'Scentsy',
    'doTERRA',
    'Young Living',
    'Norwex',
    'Rodan Fields',
    'Arbonne',
    'find rep near me',
    'local sales rep',
    'direct sales directory',
    'a rep near me',
  ],
  authors: [{ name: 'A Rep Near Me' }],
  creator: 'A Rep Near Me',
  publisher: 'A Rep Near Me',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: defaultSEO.siteUrl,
    siteName: 'A Rep Near Me',
    title: 'A Rep Near Me - Finding Agents Inspired by Independence',
    description: defaultSEO.description,
    images: [
      {
        url: `${defaultSEO.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'A Rep Near Me',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultSEO.twitter.site,
    creator: defaultSEO.twitter.site,
    title: 'A Rep Near Me - Finding Agents Inspired by Independence',
    description: defaultSEO.description,
    images: [`${defaultSEO.siteUrl}/og-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: defaultSEO.siteUrl,
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cream-50">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
