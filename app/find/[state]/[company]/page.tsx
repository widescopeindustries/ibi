import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RepCard from '@/components/RepCard'
import { defaultSEO, US_STATES } from '@/lib/seo'
import { generateBreadcrumbSchema, StructuredDataScript } from '@/lib/structured-data'

// Convert state name to URL slug
function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Find state by slug
function findStateBySlug(slug: string) {
  return US_STATES.find(s => stateNameToSlug(s.name) === slug.toLowerCase())
}

interface CompanyStatePageProps {
  params: { state: string; company: string }
}

// Generate metadata
export async function generateMetadata({ params }: CompanyStatePageProps): Promise<Metadata> {
  const state = findStateBySlug(params.state)
  const supabase = await createClient()

  const { data: company } = await supabase
    .from('companies')
    .select('name, description, category')
    .eq('slug', params.company)
    .single()

  if (!state || !company) {
    return { title: 'Not Found' }
  }

  const title = `Find ${company.name} Representatives in ${state.name}`
  const description = `Connect with local ${company.name} consultants in ${state.name}. Browse verified ${company.name} direct sales representatives near you. ${company.category} products and personalized service.`

  return {
    title,
    description,
    alternates: {
      canonical: `${defaultSEO.siteUrl}/find/${params.state}/${params.company}`,
    },
    openGraph: {
      title,
      description,
      url: `${defaultSEO.siteUrl}/find/${params.state}/${params.company}`,
      type: 'website',
    },
    keywords: [
      `${company.name} ${state.name}`,
      `${company.name} rep ${state.name}`,
      `${company.name} consultant ${state.name}`,
      `find ${company.name} near me`,
      `${company.name} representative`,
      company.category?.toLowerCase(),
    ].filter(Boolean),
  }
}

export default async function CompanyStatePage({ params }: CompanyStatePageProps) {
  const state = findStateBySlug(params.state)

  if (!state) {
    notFound()
  }

  const supabase = await createClient()

  // Fetch company details
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.company)
    .single()

  if (!company) {
    notFound()
  }

  // Fetch reps for this company in this state
  const { data: reps } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies!inner (
        companies!inner (
          id,
          name,
          slug
        )
      )
    `)
    .eq('rep_companies.companies.slug', params.company)
    .ilike('state', state.code)
    .order('is_pro_subscriber', { ascending: false })
    .order('created_at', { ascending: false })

  // Fetch other companies for linking
  const { data: otherCompanies } = await supabase
    .from('companies')
    .select('*')
    .neq('slug', params.company)
    .order('name')

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: 'Find Representatives', url: `${defaultSEO.siteUrl}/find` },
    { name: state.name, url: `${defaultSEO.siteUrl}/find/${params.state}` },
    { name: company.name, url: `${defaultSEO.siteUrl}/find/${params.state}/${params.company}` },
  ])

  return (
    <>
      <StructuredDataScript data={breadcrumbSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="text-sm mb-4 text-primary-100">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/find" className="hover:text-white">Find Representatives</Link>
              <span className="mx-2">/</span>
              <Link href={`/find/${params.state}`} className="hover:text-white">{state.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{company.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {company.name} Representatives in {state.name}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl">
              Find and connect with verified {company.name} consultants in {state.name}.
              {company.description && ` ${company.description}`}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {reps?.length || 0} {company.name} Rep{reps?.length !== 1 ? 's' : ''}
              </span>
              {company.category && (
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {company.category}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Other Companies in State */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Other Companies in {state.name}</h2>
                <div className="space-y-2">
                  {otherCompanies?.map((c) => (
                    <Link
                      key={c.id}
                      href={`/find/${params.state}/${c.slug}`}
                      className="block text-sm py-2 px-3 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-700 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Same Company, Other States */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">{company.name} in Other States</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {US_STATES.filter(s => s.code !== state.code).slice(0, 10).map((s) => (
                    <Link
                      key={s.code}
                      href={`/find/${stateNameToSlug(s.name)}/${params.company}`}
                      className="block text-sm py-1 text-gray-600 hover:text-primary-600"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Reps in State */}
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <Link
                  href={`/find/${params.state}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← All Representatives in {state.name}
                </Link>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {reps?.length || 0} {company.name} Representative{reps?.length !== 1 ? 's' : ''} in {state.name}
                </h2>
              </div>

              {reps && reps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No {company.name} representatives yet in {state.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first {company.name} consultant to list in {state.name}!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/signup" className="btn btn-primary">
                      Join as a Representative
                    </Link>
                    <Link href={`/find/${params.state}`} className="btn btn-outline">
                      Browse All Reps in {state.name}
                    </Link>
                  </div>
                </div>
              )}

              {/* SEO Content Section */}
              <div className="mt-12 bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {company.name} in {state.name}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    Looking for a {company.name} consultant in {state.name}? Our directory connects you with
                    verified {company.name} representatives who can help you discover amazing
                    {company.category && ` ${company.category.toLowerCase()}`} products with personalized service.
                  </p>
                  <p>
                    {company.description}
                  </p>
                  <h3>Why Choose a Local {company.name} Representative?</h3>
                  <ul>
                    <li>Expert product knowledge and recommendations</li>
                    <li>Host parties and earn free {company.name} products</li>
                    <li>Support local {company.name} entrepreneurs in {state.name}</li>
                    <li>Exclusive deals and promotions from your local rep</li>
                    <li>Personalized shopping experience</li>
                  </ul>
                  <h3>Find More Representatives</h3>
                  <p>
                    Can't find a {company.name} rep in {state.name}?{' '}
                    <Link href={`/companies/${company.slug}`} className="text-primary-600 hover:text-primary-700">
                      Browse all {company.name} representatives
                    </Link>{' '}
                    or{' '}
                    <Link href={`/find/${params.state}`} className="text-primary-600 hover:text-primary-700">
                      view all direct sales reps in {state.name}
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
