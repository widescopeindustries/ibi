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
  let companies: Company[] = []
  let featuredReps: any[] = []

  try {
    const supabase = await createClient()

    // Fetch featured companies
    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(8)

    if (!companiesError && companiesData) {
      companies = companiesData
    }

    // Fetch featured pro reps with their companies
    const { data: repsData, error: repsError } = await supabase
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

    if (!repsError && repsData) {
      featuredReps = repsData
    }
  } catch (error) {
    console.error('Error loading home page data:', error)
    // Page will render with empty arrays if there's an error
  }

  // Generate structured data for homepage
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <>
      {/* Structured Data */}
      <StructuredDataScript data={[organizationSchema, websiteSchema]} />

      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                Find a Direct Sales Rep Near You
              </h1>
              <p className="text-xl text-primary-100">
                Connect with local representatives from top direct sales companies
              </p>
            </div>

            <HeroSearch />
          </div>
        </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companies.length > 0 ? (
              companies.map((company: Company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="card text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  {company.category && (
                    <p className="text-sm text-gray-500 mt-1">{company.category}</p>
                  )}
                </Link>
              ))
            ) : (
              <div className="col-span-2 md:col-span-4 text-center text-gray-500 py-8">
                <p>No companies available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Representatives */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Representatives
              </h2>
              <p className="text-gray-600">
                Meet our premium members ready to serve you
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReps.length > 0 ? (
              featuredReps.map((rep: any) => (
                <RepCard
                  key={rep.id}
                  profile={rep}
                  companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
                />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-8">
                <p>No featured representatives available yet.</p>
              </div>
            )}
          </div>

            <div className="text-center mt-8">
              <Link href="/search" className="btn btn-primary">
                Find More Representatives
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection testimonials={testimonials} />

        {/* CTA Section for Reps */}
        <section className="bg-primary-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Are You a Direct Sales Representative?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join our directory and connect with customers in your area
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/auth/signup" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Get Started Free
              </Link>
              <Link href="/pricing" className="btn btn-outline border-white text-white hover:bg-primary-600">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
