import Image from 'next/image'
import StarRating from './StarRating'

export interface TestimonialData {
  id: string
  quote: string
  repName: string
  company: string
  rating: number
  photoUrl?: string
  results?: string
}

interface TestimonialProps {
  testimonial: TestimonialData
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  const { quote, repName, company, rating, photoUrl, results } = testimonial

  return (
    <div className="card h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <svg
          className="w-10 h-10 text-primary-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Testimonial Quote */}
      <blockquote className="flex-grow mb-6">
        <p className="text-gray-700 leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Results Highlight (if provided) */}
      {results && (
        <div className="mb-4 bg-primary-50 border-l-4 border-primary-500 p-3 rounded">
          <p className="text-sm font-semibold text-primary-900">
            {results}
          </p>
        </div>
      )}

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>

      {/* Rep Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <div className="relative w-12 h-12 flex-shrink-0">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={repName}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {repName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-gray-900">{repName}</p>
          <p className="text-sm text-gray-600">{company} Representative</p>
        </div>
      </div>
    </div>
  )
}
