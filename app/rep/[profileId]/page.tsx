import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SubmitReviewForm from '@/components/SubmitReviewForm'
import StarRating from '@/components/StarRating'
import { generateRepMetadata } from '@/lib/seo'
import {
  generateRepProfileSchema,
  generatePersonSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  StructuredDataScript,
} from '@/lib/structured-data'
import { defaultSEO } from '@/lib/seo'

interface RepProfilePageProps {
  params: {
    profileId: string
  }
}

// Generate dynamic metadata for rep profile
export async function generateMetadata({ params }: RepProfilePageProps) {
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
    .eq('id', params.profileId)
    .single()

  if (!profile) {
    return {
      title: 'Representative Not Found',
      description: 'The requested sales representative profile could not be found.',
    }
  }

  // Fetch reviews for rating
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('rep_id', params.profileId)
    .eq('is_approved', true)

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : undefined

  const companies = profile.rep_companies?.map((rc: any) => rc.companies.name) || []

  return generateRepMetadata({
    firstName: profile.first_name || '',
    lastName: profile.last_name || '',
    city: profile.city || undefined,
    state: profile.state || undefined,
    companies,
    bio: profile.bio || undefined,
    averageRating,
    reviewCount: reviews?.length || 0,
    profilePictureUrl: profile.profile_picture_url || undefined,
    profileId: params.profileId,
  })
}

export default async function RepProfilePage({ params }: RepProfilePageProps) {
  const supabase = await createClient()

  // Fetch rep profile with companies
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies (
        companies (
          id,
          name,
          slug,
          category,
          logo_url
        )
      )
    `)
    .eq('id', params.profileId)
    .single()

  if (!profile) {
    notFound()
  }

  // Fetch approved reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('rep_id', params.profileId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous'
  const location = [profile.city, profile.state, profile.zip_code].filter(Boolean).join(', ')

  // Calculate average rating
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const companies = profile.rep_companies?.map((rc: any) => rc.companies) || []
  const companyNames = companies.map((c: any) => c.name)

  // Generate structured data
  const profileSchema = generateRepProfileSchema({
    firstName: profile.first_name || '',
    lastName: profile.last_name || '',
    bio: profile.bio || undefined,
    city: profile.city || undefined,
    state: profile.state || undefined,
    zipCode: profile.zip_code || undefined,
    profilePictureUrl: profile.profile_picture_url || undefined,
    personalWebsiteUrl: profile.personal_website_url || undefined,
    companies: companyNames,
    averageRating: reviews && reviews.length > 0 ? averageRating : undefined,
    reviewCount: reviews?.length || 0,
    profileId: params.profileId,
  })

  const personSchema = generatePersonSchema({
    firstName: profile.first_name || '',
    lastName: profile.last_name || '',
    bio: profile.bio || undefined,
    city: profile.city || undefined,
    state: profile.state || undefined,
    profilePictureUrl: profile.profile_picture_url || undefined,
    personalWebsiteUrl: profile.personal_website_url || undefined,
    companies: companyNames,
    profileId: params.profileId,
  })

  // Generate breadcrumb
  const breadcrumbItems = [
    { name: 'Home', url: defaultSEO.siteUrl },
    { name: 'Representatives', url: `${defaultSEO.siteUrl}/search` },
    { name: fullName, url: `${defaultSEO.siteUrl}/rep/${params.profileId}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  // Generate review schemas
  const reviewSchemas = reviews?.map((review) =>
    generateReviewSchema({
      reviewerName: review.reviewer_name,
      rating: review.rating,
      comment: review.comment || undefined,
      createdAt: review.created_at,
      repFirstName: profile.first_name || '',
      repLastName: profile.last_name || '',
      profileId: params.profileId,
    })
  ) || []

  const allSchemas = [profileSchema, personSchema, breadcrumbSchema, ...reviewSchemas]

  return (
    <>
      {/* Structured Data */}
      <StructuredDataScript data={allSchemas} />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  {profile.profile_picture_url ? (
                    <Image
                      src={profile.profile_picture_url}
                      alt={fullName}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-5xl text-gray-400">
                        {(profile.first_name?.[0] || '?').toUpperCase()}
                      </span>
                    </div>
                  )}
                  {profile.is_pro_subscriber && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full shadow">
                      PRO
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {fullName}
                </h1>
                {location && (
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location}
                  </p>
                )}

                {/* Rating */}
                {reviews && reviews.length > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={averageRating} />
                    <span className="text-gray-600">
                      {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {profile.personal_website_url && (
                    <a
                      href={profile.personal_website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Shop My Site
                    </a>
                  )}
                  <button className="btn btn-outline">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Companies */}
          {companies.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Representing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companies.map((company: any) => (
                  <Link
                    key={company.id}
                    href={`/companies/${company.slug}`}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
                  >
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      {company.category && (
                        <p className="text-sm text-gray-500">{company.category}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* About Me */}
          {profile.bio && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
            </div>
          )}

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

            {/* Review List */}
            {reviews && reviews.length > 0 ? (
              <div className="space-y-6 mb-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{review.reviewer_name}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    {review.comment && (
                      <p className="text-gray-700">{review.comment}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-8">No reviews yet. Be the first to leave a review!</p>
            )}

            {/* Submit Review Form */}
            <SubmitReviewForm repId={params.profileId} />
          </div>
        </div>
      </div>
    </>
  )
}
