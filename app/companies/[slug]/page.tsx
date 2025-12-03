import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import RepCard from '@/components/RepCard'

interface CompanyPageProps {
  params: {
    slug: string
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  let company: any = null
  let reps: any[] = []

  try {
    const supabase = await createClient()

    // Fetch company info
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (companyError || !companyData) {
      notFound()
    }

    company = companyData

    // Fetch all reps for this company
    const { data: repCompanies, error: repsError } = await supabase
      .from('rep_companies')
      .select(`
        profiles (
          *,
          rep_companies (
            companies (
              name
            )
          )
        )
      `)
      .eq('company_id', company.id)

    if (!repsError && repCompanies) {
      reps = repCompanies.map((rc: any) => rc.profiles).filter(Boolean)

      // Sort by pro subscribers first
      reps.sort((a: any, b: any) => {
        if (a.is_pro_subscriber && !b.is_pro_subscriber) return -1
        if (!a.is_pro_subscriber && b.is_pro_subscriber) return 1
        return 0
      })
    }
  } catch (error) {
    console.error('Error loading company page:', error)
    notFound()
  }

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
            {reps.length} representative{reps.length !== 1 ? 's' : ''} in our directory
          </p>
        </div>

        {reps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reps.map((rep: any) => (
              <RepCard
                key={rep.id}
                profile={rep}
                companies={rep.rep_companies?.map((rc: any) => rc.companies.name) || []}
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
