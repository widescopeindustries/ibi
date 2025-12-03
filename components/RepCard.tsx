import Link from 'next/link'
import Image from 'next/image'
import { ProfileWithCompanies } from '@/types/database'
import StarRating from './StarRating'

interface RepCardProps {
  profile: ProfileWithCompanies & {
    average_rating?: number
    review_count?: number
    email_verified?: boolean
    avg_response_hours?: number
    distance_miles?: number
  }
  companies?: string[]
  showDistance?: boolean
}

// Helper to format response time
function formatResponseTime(hours: number): string {
  if (hours < 1) return 'Under 1 hour'
  if (hours < 24) return `${Math.round(hours)} hour${hours >= 2 ? 's' : ''}`
  const days = Math.round(hours / 24)
  return `${days} day${days > 1 ? 's' : ''}`
}

// Helper to format distance
function formatDistance(miles: number): string {
  if (miles < 1) return 'Less than 1 mile'
  if (miles < 10) return `${miles.toFixed(1)} miles`
  return `${Math.round(miles)} miles`
}

export default function RepCard({ profile, companies = [], showDistance = false }: RepCardProps) {
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous'
  const location = [profile.city, profile.state].filter(Boolean).join(', ') || 'Location not specified'
  const hasLocation = profile.city && profile.state

  return (
    <Link href={`/rep/${profile.id}`} className="block group">
      <div className="relative card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full overflow-hidden border border-gray-200 hover:border-primary-300">
        {/* PRO Badge - Top Right Corner */}
        {profile.is_pro_subscriber && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 transform group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>PRO</span>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center text-center p-6">
          {/* Profile Picture with Enhanced Styling */}
          <div className="relative mb-4">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              {profile.profile_picture_url ? (
                <Image
                  src={profile.profile_picture_url}
                  alt={`${fullName}'s profile picture`}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-4xl sm:text-5xl font-bold text-primary-600">
                    {(profile.first_name?.[0] || '?').toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Verified Badge on Profile Picture */}
            {profile.email_verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1.5 shadow-md border-2 border-white"
                title="Email verified"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Name with Clear Hierarchy */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {fullName}
          </h3>

          {/* Location with Icon and Distance */}
          {hasLocation && (
            <div className="flex items-center gap-1.5 text-gray-600 mb-3">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-base font-medium">{location}</p>
              {showDistance && profile.distance_miles !== undefined && (
                <span className="text-sm text-primary-600 font-medium">
                  ({formatDistance(profile.distance_miles)} away)
                </span>
              )}
            </div>
          )}

          {/* Response Time Badge */}
          {profile.avg_response_hours !== undefined && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Typically responds in {formatResponseTime(profile.avg_response_hours)}</span>
            </div>
          )}

          {/* Rating Display with Reviews Count */}
          {profile.average_rating !== undefined && profile.review_count !== undefined && profile.review_count > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={profile.average_rating} />
              <span className="text-sm font-semibold text-gray-700">
                {profile.average_rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({profile.review_count} {profile.review_count === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Companies as Pills */}
          {companies.length > 0 && (
            <div className="w-full mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {companies.slice(0, 3).map((company, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 text-xs font-medium px-3 py-1.5 rounded-full border border-primary-200 shadow-sm"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    {company}
                  </span>
                ))}
                {companies.length > 3 && (
                  <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
                    +{companies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bio Preview */}
          {profile.bio && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Divider */}
          <div className="w-full border-t border-gray-200 my-4"></div>

          {/* Contact Rep Button */}
          <button
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform group-hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            onClick={(e) => {
              // Prevent navigation when clicking the button
              e.preventDefault()
              // Navigate to the rep's profile page
              window.location.href = `/rep/${profile.id}`
            }}
            aria-label={`View ${fullName}'s profile and contact information`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>View Profile</span>
          </button>

          {/* Additional Info for Pro Users */}
          {profile.is_pro_subscriber && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Enhanced profile with priority placement</span>
            </div>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400 rounded-lg pointer-events-none transition-colors duration-300"></div>
      </div>
    </Link>
  )
}
