import { ExternalListing } from '@/types/database'
import StarRating from './StarRating'

interface ExternalListingCardProps {
  listing: ExternalListing
}

export default function ExternalListingCard({ listing }: ExternalListingCardProps) {
  const fullName = `${listing.first_name || ''} ${listing.last_name || ''}`.trim() || listing.title
  const location = [listing.city, listing.state].filter(Boolean).join(', ') || 'Location not specified'
  const hasLocation = listing.city || listing.state

  // Format company name from slug
  const companyName = listing.company_slug
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Independent'

  return (
    <div className="block group">
      <div className="relative bg-white rounded-sm border border-gray-100 hover:border-primary-200 transition-all duration-300 h-full overflow-hidden hover:shadow-md">
        {/* External Source Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest font-medium px-3 py-1 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.706 2.142-.766 3.556h3.936c-.06-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.06 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.706-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
            </svg>
            <span>Verified</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center p-8">
          {/* Profile Picture Placeholder */}
          <div className="relative mb-6">
            <div className="relative w-24 h-24">
              <div className="w-full h-full bg-cream-100 rounded-full flex items-center justify-center border-2 border-cream-200">
                <span className="font-serif text-3xl text-primary-600">
                  {(listing.first_name?.[0] || listing.title?.[0] || '?').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-serif text-xl text-gray-900 mb-2">
            {fullName}
          </h3>

          {/* Title if different from name */}
          {fullName !== listing.title && (
            <p className="text-sm text-gray-500 mb-2">{listing.title}</p>
          )}

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
          {listing.total_score !== null && listing.reviews_count > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={listing.total_score} />
              <span className="text-sm text-gray-600">
                {listing.total_score.toFixed(1)} ({listing.reviews_count})
              </span>
            </div>
          )}

          {/* Company Badge */}
          <div className="w-full mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-flex items-center bg-cream-100 text-gray-700 text-xs px-3 py-1 rounded-sm">
                {companyName}
              </span>
            </div>
          </div>

          {/* Phone */}
          {listing.phone && (
            <div className="flex items-center gap-1.5 text-gray-600 mb-4">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm">{listing.phone}</span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full border-t border-gray-100 my-4"></div>

          {/* Action Buttons */}
          <div className="w-full flex gap-2">
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn btn-primary py-2.5 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website
              </a>
            )}
            {listing.google_maps_url && (
              <a
                href={listing.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${listing.website ? 'flex-1' : 'w-full'} btn btn-outline py-2.5 text-sm`}
                onClick={(e) => e.stopPropagation()}
              >
                View on Maps
              </a>
            )}
          </div>

          {/* Source indicator */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Independent representative</span>
          </div>
        </div>
      </div>
    </div>
  )
}
