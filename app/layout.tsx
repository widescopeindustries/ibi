import './globals.css'
import 'leaflet/dist/leaflet.css'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'A Rep Near Me - Find Local Direct Sales Representatives',
    template: '%s | A Rep Near Me'
  },
  description: 'Connect with verified local representatives from Mary Kay, Scentsy, Pampered Chef, and more. Find trusted consultants in your area.',
  keywords: ['direct sales', 'MLM', 'Mary Kay', 'Scentsy', 'Pampered Chef', 'Avon', 'local representatives'],
  authors: [{ name: 'A Rep Near Me' }],
  creator: 'A Rep Near Me',
  publisher: 'A Rep Near Me',
  metadataBase: new URL('https://arepnearme.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arepnearme.com',
    siteName: 'A Rep Near Me',
    title: 'A Rep Near Me - Find Local Direct Sales Representatives',
    description: 'Connect with verified local representatives from Mary Kay, Scentsy, Pampered Chef, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Rep Near Me - Find Local Direct Sales Representatives',
    description: 'Connect with verified local representatives from Mary Kay, Scentsy, Pampered Chef, and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
