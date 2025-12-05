import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface RepPageProps {
    params: {
        id: string
    }
}

// ISR - Regenerate every hour
export const revalidate = 3600

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: RepPageProps): Promise<Metadata> {
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select(`
      *,
      rep_companies (
        companies (
          name
        )
      )
    `)
        .eq('id', params.id)
        .single()

    if (!profile) {
        return {
            title: 'Rep Not Found',
        }
    }

    const companies = profile.rep_companies?.map((rc: any) => rc.companies.name).join(', ') || ''
    const location = [profile.city, profile.state].filter(Boolean).join(', ')

    return {
        title: `${profile.first_name} ${profile.last_name} - ${companies} Consultant ${location ? `in ${location}` : ''} | A Rep Near Me`,
        description: profile.bio || `Connect with ${profile.first_name} ${profile.last_name}, an independent ${companies} consultant ${location ? `serving ${location}` : ''}. View profile, read reviews, and get in touch.`,
        openGraph: {
            title: `${profile.first_name} ${profile.last_name} - ${companies} Consultant`,
            description: profile.bio || `Independent ${companies} consultant`,
            type: 'profile',
            images: profile.profile_picture_url ? [profile.profile_picture_url] : [],
        },
    }
}

export default async function RepPage({ params }: RepPageProps) {
    const supabase = await createClient()

    const { data: profile } = await supabase
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
        .eq('id', params.id)
        .single()

    if (!profile) {
        notFound()
    }

    const companies = profile.rep_companies || []
    const location = [profile.city, profile.state].filter(Boolean).join(', ')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-start gap-6">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            {profile.profile_picture_url ? (
                                <Image
                                    src={profile.profile_picture_url}
                                    alt={`${profile.first_name} ${profile.last_name}`}
                                    width={120}
                                    height={120}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-30 h-30 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <span className="text-3xl font-semibold text-indigo-600">
                                        {profile.first_name?.[0]}{profile.last_name?.[0]}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {profile.first_name} {profile.last_name}
                                </h1>
                                {profile.is_pro_subscriber && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                        PRO
                                    </span>
                                )}
                            </div>

                            {/* Companies */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {companies.map((rc: any) => (
                                    <Link
                                        key={rc.companies.id}
                                        href={`/companies/${rc.companies.slug}`}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    >
                                        {rc.companies.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Location */}
                            {location && (
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{location}</span>
                                </div>
                            )}

                            {/* Bio */}
                            {profile.bio && (
                                <p className="text-gray-700 mb-6">{profile.bio}</p>
                            )}

                            {/* Contact Options */}
                            <div className="flex flex-wrap gap-3">
                                {profile.personal_website_url && (
                                    <a
                                        href={profile.personal_website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        Visit Website
                                    </a>
                                )}

                                {profile.email && (
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Email
                                    </a>
                                )}

                                {profile.phone && (
                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                    <div className="space-y-4">
                        {profile.years_of_experience && (
                            <div>
                                <span className="font-medium text-gray-900">Experience:</span>{' '}
                                <span className="text-gray-700">{profile.years_of_experience} years</span>
                            </div>
                        )}

                        {profile.specialties && profile.specialties.length > 0 && (
                            <div>
                                <span className="font-medium text-gray-900">Specialties:</span>{' '}
                                <span className="text-gray-700">{profile.specialties.join(', ')}</span>
                            </div>
                        )}

                        {profile.languages_spoken && profile.languages_spoken.length > 0 && (
                            <div>
                                <span className="font-medium text-gray-900">Languages:</span>{' '}
                                <span className="text-gray-700">{profile.languages_spoken.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back to Directory */}
                <div className="mt-8 text-center">
                    <Link
                        href="/search"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        ← Back to Directory
                    </Link>
                </div>
            </div>
        </div>
    )
}
