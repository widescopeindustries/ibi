import Link from 'next/link'
import Image from 'next/image'
import { ProfileWithCompanies } from '@/types/database'
import StarRating from './StarRating'

interface RepCardProps {
  profile: ProfileWithCompanies & {
    average_rating?: number
    review_count?: number
    email_verified?: boolean
  }
  companies?: string[]
}

export default function RepCard({ profile, companies = [] }: RepCardProps) {
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous'
  const location = [profile.city, profile.state].filter(Boolean).join(', ') || 'Location not specified'
  const hasLocation = profile.city && profile.state

  return (
    <Link href={`/reps/${profile.id}`} className="block group">
      <div className="relative bg-white rounded-sm border border-gray-100 hover:border-primary-200 transition-all duration-300 cursor-pointer h-full overflow-hidden hover:shadow-md">
        {/* PRO Badge - Elegant style */}
        {profile.is_pro_subscriber && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-accent-100 text-accent-800 text-[10px] uppercase tracking-widest font-medium px-3 py-1 flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-.1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Pro</span>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center text-center p-8">
          {/* Profile Picture - Clean styling */}
          <div className="relative mb-6">
            <div className="relative w-24 h-24">
              {profile.profile_picture_url ? (
                <Image
                  src={profile.profile_picture_url}
                  alt={`${fullName}'s profile picture`}
                  fill
                  className="rounded-full object-cover border-2 border-cream-200"
                />
              ) : (
                <div className="w-full h-full bg-cream-100 rounded-full flex items-center justify-center border-2 border-cream-200">
                  <span className="font-serif text-3xl text-primary-600">
                    {(profile.first_name?.[0] || '?').toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Verified Badge */}
            {profile.email_verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-secondary-500 text-white rounded-full p-1 border-2 border-white"
                title="Email verified"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
            {fullName}
          </h3>

          {/* Location */}
          {hasLocation && (
            <div className="flex items-center gap-1.5 text-gray-500 mb-4">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">{location}</p>
            </div>
          )}

          {/* Rating */}
          {profile.average_rating !== undefined && profile.review_count !== undefined && profile.review_count > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={profile.average_rating} />
              <span className="text-sm text-gray-600">
                {profile.average_rating.toFixed(1)} ({profile.review_count})
              </span>
            </div>
          )}

          {/* Companies */}
          {companies.length > 0 && (
            <div className="w-full mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {companies.slice(0, 3).map((company, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-cream-100 text-gray-700 text-xs px-3 py-1 rounded-sm"
                  >
                    {company}
                  </span>
                ))}
                {companies.length > 3 && (
                  <span className="inline-flex items-center bg-gray-50 text-gray-500 text-xs px-3 py-1 rounded-sm">
                    +{companies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bio Preview */}
          {profile.bio && (
            <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed font-light">
              {profile.bio}
            </p>
          )}

          {/* Divider */}
          <div className="w-full border-t border-gray-100 my-4"></div>

          {/* View Profile Button */}
          <span className="w-full btn btn-outline py-2.5 inline-block text-center">
            View Profile
          </span>

          {/* Pro indicator text */}
          {profile.is_pro_subscriber && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Featured profile</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
