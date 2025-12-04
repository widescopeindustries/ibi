import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { defaultSEO, US_STATES } from '@/lib/seo'
import { generateBreadcrumbSchema, StructuredDataScript } from '@/lib/structured-data'

// Convert state name to URL slug
function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export const metadata: Metadata = {
  title: 'Find Direct Sales Representatives by Location',
  description: 'Find direct sales representatives in your state. Browse Mary Kay, Pampered Chef, Avon, Tupperware, Scentsy, doTERRA consultants and more across all 50 US states.',
  alternates: {
    canonical: `${defaultSEO.siteUrl}/find`,
  },
  openGraph: {
    title: 'Find Direct Sales Representatives by Location',
    description: 'Find direct sales representatives in your state. Browse consultants from top companies across all 50 US states.',
    url: `${defaultSEO.siteUrl}/find`,
    type: 'website',
  },
}

// Group states by region for better UX
const statesByRegion = {
  'Northeast': ['CT', 'DE', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT'],
  'Southeast': ['AL', 'FL', 'GA', 'KY', 'NC', 'SC', 'TN', 'VA', 'WV'],
  'Midwest': ['IA', 'IL', 'IN', 'KS', 'MI', 'MN', 'MO', 'ND', 'NE', 'OH', 'SD', 'WI'],
  'Southwest': ['AZ', 'NM', 'OK', 'TX'],
  'West': ['AK', 'CA', 'CO', 'HI', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
  'South': ['AR', 'LA', 'MS'],
}

export default async function FindPage() {
  const supabase = await createClient()

  // Fetch all companies
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  // Get state counts
  const { data: stateCounts } = await supabase
    .from('profiles')
    .select('state')

  // Calculate rep count per state
  const repCountByState: Record<string, number> = {}
  stateCounts?.forEach((profile) => {
    if (profile.state) {
      const stateCode = profile.state.toUpperCase()
      repCountByState[stateCode] = (repCountByState[stateCode] || 0) + 1
    }
  })

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: 'Find Representatives', url: `${defaultSEO.siteUrl}/find` },
  ])

  return (
    <>
      <StructuredDataScript data={breadcrumbSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Direct Sales Representatives
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl">
              Browse our directory of verified direct sales representatives across all 50 US states.
              Connect with local consultants from Mary Kay, Pampered Chef, Avon, and more.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Companies Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Company</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {companies?.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.category}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* States by Region */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by State</h2>

            {Object.entries(statesByRegion).map(([region, stateCodes]) => {
              const regionStates = US_STATES.filter(s => stateCodes.includes(s.code))

              return (
                <div key={region} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    {region}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {regionStates.map((state) => (
                      <Link
                        key={state.code}
                        href={`/find/${stateNameToSlug(state.name)}`}
                        className="bg-white rounded-lg shadow px-4 py-3 hover:shadow-md hover:bg-primary-50 transition-all flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-800">{state.name}</span>
                        {repCountByState[state.code] > 0 && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                            {repCountByState[state.code]}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          {/* Popular Searches */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Searches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies?.slice(0, 6).map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{company.name} by State</h3>
                  <div className="flex flex-wrap gap-2">
                    {['CA', 'TX', 'FL', 'NY', 'IL'].map((stateCode) => {
                      const state = US_STATES.find(s => s.code === stateCode)
                      if (!state) return null
                      return (
                        <Link
                          key={stateCode}
                          href={`/find/${stateNameToSlug(state.name)}/${company.slug}`}
                          className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {state.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Company + State Links (SEO) */}
          <section className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Find Representatives by Company & Location
            </h2>
            <div className="space-y-6">
              {companies?.map((company) => (
                <div key={company.id}>
                  <h3 className="font-semibold text-gray-800 mb-2">{company.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {US_STATES.map((state) => (
                      <Link
                        key={state.code}
                        href={`/find/${stateNameToSlug(state.name)}/${company.slug}`}
                        className="text-gray-600 hover:text-primary-600"
                      >
                        {state.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
