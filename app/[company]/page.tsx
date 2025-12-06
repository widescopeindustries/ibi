import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import RepCard from '@/components/RepCard'
import ExternalListingCard from '@/components/ExternalListingCard'
import { getExternalListingsByCompany } from '@/lib/external-listings'
import { Metadata } from 'next'

interface CompanyPageProps {
    params: {
        company: string
    }
}

// ISR - Regenerate every hour
export const revalidate = 3600

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
    const supabase = await createClient()

    const { data: company } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', params.company)
        .single()

    if (!company) {
        return {
            title: 'Company Not Found',
        }
    }

    return {
        title: `Find ${company.name} Consultants Near You | A Rep Near Me`,
        description: company.description || `Connect with verified ${company.name} independent consultants in your area. Browse profiles, read reviews, and shop with confidence.`,
        openGraph: {
            title: `${company.name} Consultants Directory`,
            description: company.description || `Find local ${company.name} representatives`,
            type: 'website',
        },
    }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
    const supabase = await createClient()

    // Fetch company info
    const { data: company } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', params.company)
        .single()

    if (!company) {
        notFound()
    }

    // Fetch all reps for this company from database
    const { data: repCompanies } = await supabase
        .from('rep_companies')
        .select(`
      profiles (
        *,
        rep_companies (
          companies (
            name,
            slug
          )
        )
      )
    `)
        .eq('company_id', company.id)

    const reps = repCompanies?.map((rc: any) => rc.profiles).filter(Boolean) || []

    // Get external listings for this company
    const externalListings = getExternalListingsByCompany(params.company)

    // Sort database reps by pro subscribers first
    reps.sort((a: any, b: any) => {
        if (a.is_pro_subscriber && !b.is_pro_subscriber) return -1
        if (!a.is_pro_subscriber && b.is_pro_subscriber) return 1
        return 0
    })

    const totalReps = reps.length + externalListings.length

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {company.name}
                        </h1>
                        {company.category && (
                            <p className="text-lg text-gray-600 mb-4">{company.category}</p>
                        )}
                        {company.description && (
                            <p className="text-gray-700 max-w-3xl mx-auto">
                                {company.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Representatives */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Find a {company.name} Representative
                    </h2>
                    <p className="text-gray-600">
                        {totalReps} representative{totalReps !== 1 ? 's' : ''} in our directory
                    </p>
                </div>

                {totalReps > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Database profiles first (pro subscribers prioritized) */}
                        {reps.map((rep: any) => (
                            <RepCard
                                key={rep.id}
                                profile={rep}
                                companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
                            />
                        ))}
                        {/* External listings */}
                        {externalListings.map((listing: any) => (
                            <ExternalListingCard
                                key={listing.id}
                                listing={listing}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No representatives yet
                        </h3>
                        <p className="text-gray-600">
                            Be the first {company.name} representative in our directory!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
