import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import RepCard from '@/components/RepCard'
import LazyMap from '@/components/LazyMap'
import { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

interface LocationPageProps {
    params: {
        company: string
        location: string
    }
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
    const { company, location } = params

    // Convert slugs to display names
    const companyName = company.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const cityParts = location.split('-')
    const state = cityParts.pop()?.toUpperCase() || ''
    const cityName = cityParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    const title = `${companyName} Reps in ${cityName}, ${state} | Find Local Consultants`
    const description = `Find verified ${companyName} representatives serving ${cityName}, ${state}. Connect with local consultants for products, parties, and personalized service.`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    }
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { company: companySlug, location: locationSlug } = params

    // Parse city and state from slug (e.g., "dallas-tx")
    const cityParts = locationSlug.split('-')
    const state = cityParts.pop()?.toUpperCase()
    const city = cityParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    if (!state || !city) {
        notFound()
    }

    const supabase = await createClient()

    // Get company
    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id, name, slug, description')
        .eq('slug', companySlug)
        .single()

    if (companyError || !company) {
        notFound()
    }

    // Get all reps in this city for this company
    const { data: reps, error: repsError } = await supabase
        .from('profiles')
        .select(`
      *,
      rep_companies!inner(
        company:companies(id, name, slug)
      )
    `)
        .eq('city', city)
        .eq('state', state)
        .eq('rep_companies.company_id', company.id)

    if (repsError) {
        console.error('Error fetching reps:', repsError)
    }

    const repsList = reps || []

    // If no reps in this city, show message but don't 404
    if (repsList.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        {company.name} in {city}, {state}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        We don't currently have any {company.name} representatives listed in {city}, {state}.
                    </p>
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                        <p className="text-gray-700 mb-4">
                            Are you a {company.name} consultant serving {city}? Join our directory!
                        </p>
                        <Link
                            href="/sign-up"
                            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
                        >
                            Create Your Profile
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary-600">Home</Link>
                    {' / '}
                    <Link href={`/${companySlug}`} className="hover:text-primary-600">{company.name}</Link>
                    {' / '}
                    <span className="text-gray-900">{city}, {state}</span>
                </nav>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {company.name} Representatives in {city}, {state}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Find verified {company.name} consultants serving {city} and surrounding areas.
                        Connect with local representatives for personalized service, products, and parties.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{repsList.length} Local {repsList.length === 1 ? 'Rep' : 'Reps'}</span>
                        </div>
                        <div className="text-gray-300">|</div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>Serving {city} & nearby</span>
                        </div>
                    </div>
                </div>

                {/* Interactive Map */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Representative Locations</h2>
                    <LazyMap reps={repsList} city={city} state={state} />
                </div>

                {/* Rep Grid */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        All {company.name} Representatives in {city}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repsList.map((rep) => (
                            <RepCard key={rep.id} profile={rep} />
                        ))}
                    </div>
                </div>

                {/* Local Content Section */}
                <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
                    <h2>Why Choose a Local {company.name} Rep in {city}?</h2>
                    <p>
                        Working with a local {company.name} consultant in {city}, {state} offers personalized service
                        you won't find shopping online. Your local representative can:
                    </p>
                    <ul>
                        <li>Provide free product consultations and demonstrations</li>
                        <li>Offer same-day or next-day delivery in the {city} area</li>
                        <li>Host fun parties and events for you and your friends</li>
                        <li>Share local tips and recommendations</li>
                        <li>Provide ongoing customer support and product advice</li>
                    </ul>

                    <h3>Frequently Asked Questions</h3>

                    <h4>Do I need to buy from a local {company.name} rep?</h4>
                    <p>
                        While you can purchase {company.name} products online, buying from a local {city}
                        representative provides personalized service, faster delivery, and the opportunity to try
                        products before you buy.
                    </p>

                    <h4>How do I choose the right consultant?</h4>
                    <p>
                        Browse the profiles above to find a {company.name} rep whose location and services match
                        your needs. Many consultants offer free consultations, so don't hesitate to reach out!
                    </p>

                    <h4>Can my rep deliver to surrounding areas?</h4>
                    <p>
                        Most {company.name} representatives in {city} also serve nearby cities and suburbs.
                        Check individual rep profiles for their specific service areas.
                    </p>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto mt-16 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Are You a {company.name} Consultant?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Join our directory and connect with customers in {city} looking for local representatives!
                    </p>
                    <Link
                        href="/sign-up"
                        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
                    >
                        Create Your Free Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}
