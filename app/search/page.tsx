import { createClient } from '@/lib/supabase/server'
import RepCard from '@/components/RepCard'
import ExternalListingCard from '@/components/ExternalListingCard'
import Link from 'next/link'
import { generateSearchMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, StructuredDataScript } from '@/lib/structured-data'
import { defaultSEO } from '@/lib/seo'
import { searchExternalListings, getAllExternalListings } from '@/lib/external-listings'

interface SearchPageProps {
  searchParams: {
    company?: string
    location?: string
  }
}

// Generate dynamic metadata
export async function generateMetadata({ searchParams }: SearchPageProps) {
  return generateSearchMetadata({
    company: searchParams.company,
    location: searchParams.location,
  })
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const supabase = await createClient()

  // Build the query
  let query = supabase
    .from('profiles')
    .select(`
      *,
      rep_companies (
        companies (
          id,
          name,
          slug
        )
      )
    `)

  // Filter by location (ZIP, city, or state)
  if (searchParams.location) {
    const location = searchParams.location.toLowerCase().trim()

    // Check if it's a ZIP code (5 digits)
    if (/^\d{5}$/.test(location)) {
      query = query.eq('zip_code', location)
    } else if (location.length === 2) {
      // State code
      query = query.ilike('state', location)
    } else {
      // City name
      query = query.ilike('city', `%${location}%`)
    }
  }

  // Order by pro subscribers first
  query = query.order('is_pro_subscriber', { ascending: false })
  query = query.order('created_at', { ascending: false })

  const { data: allReps } = await query

  // Filter by company if specified (client-side since it's a join table)
  let filteredReps = allReps || []
  if (searchParams.company) {
    const companySearch = searchParams.company.toLowerCase()
    filteredReps = filteredReps.filter((rep: any) =>
      rep.rep_companies?.some((rc: any) =>
        rc.companies.name.toLowerCase().includes(companySearch) ||
        rc.companies.slug.includes(companySearch)
      )
    )
  }

  // Get external listings based on filters
  let externalListings = searchParams.company
    ? searchExternalListings({ companySlug: searchParams.company, location: searchParams.location })
    : searchParams.location
      ? searchExternalListings({ location: searchParams.location })
      : getAllExternalListings()

  const totalResults = filteredReps.length + externalListings.length

  // Get all companies for the filter sidebar
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  // Generate breadcrumb structured data
  const breadcrumbItems = [
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: 'Search Representatives', url: `${defaultSEO.siteUrl}/search` },
  ]
  
  if (searchParams.company) {
    breadcrumbItems.push({
      name: searchParams.company,
      url: `${defaultSEO.siteUrl}/search?company=${searchParams.company}`,
    })
  }
  
  if (searchParams.location) {
    breadcrumbItems.push({
      name: searchParams.location,
      url: `${defaultSEO.siteUrl}/search?location=${searchParams.location}`,
    })
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      {/* Structured Data */}
      <StructuredDataScript data={breadcrumbSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Find a Sales Representative
            </h1>
            <p className="text-gray-600 mt-2">
              Showing {totalResults} representative{totalResults !== 1 ? 's' : ''}
              {searchParams.company && ` for ${searchParams.company}`}
              {searchParams.location && ` near ${searchParams.location}`}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Filter Results</h2>

                {/* Company Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">By Company</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {companies?.map((company) => (
                      <Link
                        key={company.id}
                        href={`/search?company=${company.slug}${searchParams.location ? `&location=${searchParams.location}` : ''}`}
                        className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                          searchParams.company === company.slug
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        {company.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchParams.company || searchParams.location) && (
                  <Link
                    href="/search"
                    className="btn btn-secondary w-full text-sm"
                  >
                    Clear All Filters
                  </Link>
                )}
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              {totalResults > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Database profiles first (pro subscribers prioritized) */}
                  {filteredReps.map((rep: any) => (
                    <RepCard
                      key={rep.id}
                      profile={rep}
                      companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
                    />
                  ))}
                  {/* External listings */}
                  {externalListings.map((listing) => (
                    <ExternalListingCard
                      key={listing.id}
                      listing={listing}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No representatives found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search filters or location
                  </p>
                  <Link href="/search" className="btn btn-primary">
                    Clear Filters
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
