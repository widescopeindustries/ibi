import { createClient } from '@/lib/supabase/server'
import HeroSearch from '@/components/HeroSearch'
import RepCard from '@/components/RepCard'
import TrustSignals from '@/components/TrustSignals'
import TestimonialSection from '@/components/TestimonialSection'
import { testimonials } from '@/data/testimonials'
import Link from 'next/link'
import { ProfileWithCompanies, Company } from '@/types/database'
import { generateHomeMetadata } from '@/lib/seo'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  StructuredDataScript,
} from '@/lib/structured-data'

// Generate metadata for homepage
export const metadata = generateHomeMetadata()

export default async function Home() {
  const supabase = await createClient()

  // Fetch featured companies
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .limit(8)

  // Fetch featured pro reps with their companies
  const { data: featuredReps } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies (
        companies (
          name
        )
      )
    `)
    .eq('is_pro_subscriber', true)
    .limit(6)

  // Generate structured data for homepage
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <>
      {/* Structured Data */}
      <StructuredDataScript data={[organizationSchema, websiteSchema]} />

      <div>
        {/* Hero Section - Elegant minimal style */}
        <section className="bg-cream-50 py-24 md:py-32 relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-100/30 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-600 mb-4">
                Your Connection to Excellence
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                Find Your Perfect
                <br />
                <span className="italic">Sales Representative</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                Connect with trusted local representatives from leading direct sales companies
              </p>
              <div className="elegant-divider mt-8"></div>
            </div>

            <HeroSearch />
          </div>
        </section>

        {/* Value Propositions - Minimal strip */}
        <section className="bg-white py-6 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 text-xs uppercase tracking-widest text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full"></span>
                Verified Profiles
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full"></span>
                Trusted Reviews
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full"></span>
                Local Representatives
              </span>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <TrustSignals />

        {/* Featured Companies */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-600 mb-3">
                Browse By Brand
              </p>
              <h2 className="section-title mb-4">
                Popular Companies
              </h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Discover representatives from leading direct sales brands
              </p>
              <div className="elegant-divider"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {companies?.map((company: Company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="group p-6 bg-cream-50 hover:bg-white border border-gray-100 hover:border-primary-200 rounded-sm text-center transition-all duration-300 hover:shadow-md"
                >
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                    {company.name}
                  </h3>
                  {company.category && (
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                      {company.category}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/companies" className="btn btn-outline">
                View All Companies
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Representatives */}
        <section className="py-20 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-600 mb-3">
                Premium Members
              </p>
              <h2 className="section-title mb-4">
                Featured Representatives
              </h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Meet our top-rated professionals ready to serve you
              </p>
              <div className="elegant-divider"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReps?.map((rep: any) => (
                <RepCard
                  key={rep.id}
                  profile={rep}
                  companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/search" className="btn btn-primary">
                Find More Representatives
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection testimonials={testimonials} />

        {/* CTA Section for Reps - Elegant dark section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-300 mb-4">
              Join Our Community
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Are You a Direct Sales
              <br />
              <span className="italic">Representative?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
              Showcase your expertise and connect with customers in your area
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="btn bg-white text-gray-900 hover:bg-gray-100 border border-white"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="btn border border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
