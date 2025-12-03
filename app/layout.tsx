import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { defaultSEO } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(defaultSEO.siteUrl),
  title: {
    default: 'IBI Sales Rep Directory - Find Direct Sales Representatives Near You',
    template: '%s | IBI Sales Rep Directory',
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
  ],
  authors: [{ name: 'IBI Directory' }],
  creator: 'IBI Directory',
  publisher: 'IBI Directory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: defaultSEO.siteUrl,
    siteName: defaultSEO.siteName,
    title: 'IBI Sales Rep Directory - Find Direct Sales Representatives Near You',
    description: defaultSEO.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultSEO.twitter.site,
    creator: defaultSEO.twitter.site,
    title: 'IBI Sales Rep Directory - Find Direct Sales Representatives Near You',
    description: defaultSEO.description,
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
      </head>
      <body className="font-sans antialiased">
        <Analytics />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
