import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function CompaniesPage() {
  const supabase = await createClient()

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  // Group companies by category
  const groupedCompanies = companies?.reduce((acc: any, company) => {
    const category = company.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(company)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Companies
          </h1>
          <p className="text-lg text-gray-600">
            Find representatives from your favorite direct sales companies
          </p>
        </div>
      </div>

      {/* Companies List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {groupedCompanies && Object.entries(groupedCompanies).map(([category, categoryCompanies]: [string, any]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCompanies.map((company: any) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {company.name}
                  </h3>
                  {company.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {company.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
