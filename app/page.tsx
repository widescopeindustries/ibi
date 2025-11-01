import { createClient } from '@/lib/supabase/server'
import HeroSearch from '@/components/HeroSearch'
import RepCard from '@/components/RepCard'
import Link from 'next/link'
import { ProfileWithCompanies, Company } from '@/types/database'

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

  return (
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

      {/* Featured Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Companies
            </h2>
            <p className="text-gray-600">
              Browse representatives from leading direct sales companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companies?.map((company: Company) => (
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
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/companies" className="btn btn-outline">
              View All Companies
            </Link>
          </div>
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
            {featuredReps?.map((rep: any) => (
              <RepCard
                key={rep.id}
                profile={rep}
                companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/search" className="btn btn-primary">
              Find More Representatives
            </Link>
          </div>
        </div>
      </section>

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
  )
}
