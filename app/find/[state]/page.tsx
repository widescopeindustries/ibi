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

// Generate static params for all states
export async function generateStaticParams() {
  return US_STATES.map(state => ({
    state: stateNameToSlug(state.name),
  }))
}

interface StatePageProps {
  params: { state: string }
}

// Generate metadata
export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const state = findStateBySlug(params.state)

  if (!state) {
    return { title: 'State Not Found' }
  }

  const title = `Find Direct Sales Representatives in ${state.name}`
  const description = `Connect with local direct sales representatives in ${state.name}. Browse verified Mary Kay, Pampered Chef, Avon, Tupperware, Scentsy, doTERRA consultants and more in ${state.name}.`

  return {
    title,
    description,
    alternates: {
      canonical: `${defaultSEO.siteUrl}/find/${params.state}`,
    },
    openGraph: {
      title,
      description,
      url: `${defaultSEO.siteUrl}/find/${params.state}`,
      type: 'website',
    },
  }
}

export default async function StatePage({ params }: StatePageProps) {
  const state = findStateBySlug(params.state)

  if (!state) {
    notFound()
  }

  const supabase = await createClient()

  // Fetch reps in this state
  const { data: reps } = await supabase
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
    .ilike('state', state.code)
    .order('is_pro_subscriber', { ascending: false })
    .order('created_at', { ascending: false })

  // Fetch all companies for linking
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: 'Find Representatives', url: `${defaultSEO.siteUrl}/find` },
    { name: state.name, url: `${defaultSEO.siteUrl}/find/${params.state}` },
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
              <span className="text-white">{state.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Direct Sales Representatives in {state.name}
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl">
              Find and connect with verified direct sales consultants in {state.name}.
              Browse representatives from top companies like Mary Kay, Pampered Chef, Avon, and more.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {reps?.length || 0} Representatives
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {companies?.length || 0} Companies
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Company Filter */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Browse by Company</h2>
                <div className="space-y-2">
                  {companies?.map((company) => (
                    <Link
                      key={company.id}
                      href={`/find/${params.state}/${company.slug}`}
                      className="block text-sm py-2 px-3 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-700 transition-colors"
                    >
                      {company.name} in {state.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other States */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Other States</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {US_STATES.filter(s => s.code !== state.code).slice(0, 10).map((s) => (
                    <Link
                      key={s.code}
                      href={`/find/${stateNameToSlug(s.name)}`}
                      className="block text-sm py-1 text-gray-600 hover:text-primary-600"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link href="/find" className="block text-sm py-1 text-primary-600 font-medium mt-2">
                    View all states →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {reps?.length || 0} Representative{reps?.length !== 1 ? 's' : ''} in {state.name}
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
                    No representatives yet in {state.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first direct sales representative to list in {state.name}!
                  </p>
                  <Link href="/auth/signup" className="btn btn-primary">
                    Join as a Representative
                  </Link>
                </div>
              )}

              {/* SEO Content Section */}
              <div className="mt-12 bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Find Your Local Sales Representative in {state.name}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    Looking for a direct sales consultant in {state.name}? Our directory connects you with
                    verified representatives from the top direct sales companies including Mary Kay,
                    Pampered Chef, Avon, Tupperware, Scentsy, doTERRA, Young Living, Norwex, Rodan + Fields,
                    and Arbonne.
                  </p>
                  <p>
                    Whether you're searching for cosmetics, kitchenware, home fragrance products, essential oils,
                    or wellness products, our {state.name} representatives are ready to help you find exactly
                    what you need with personalized service.
                  </p>
                  <h3>Why Shop with a Local Representative?</h3>
                  <ul>
                    <li>Personalized product recommendations</li>
                    <li>Host parties and earn free products</li>
                    <li>Support local entrepreneurs in {state.name}</li>
                    <li>Get exclusive deals and promotions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
