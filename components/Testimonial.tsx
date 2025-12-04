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
    <div className="bg-white rounded-sm border border-gray-100 p-8 h-full flex flex-col">
      {/* Quote Icon - Elegant */}
      <div className="mb-6">
        <svg
          className="w-8 h-8 text-primary-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Testimonial Quote */}
      <blockquote className="flex-grow mb-6">
        <p className="text-gray-700 leading-relaxed font-light italic">
          "{quote}"
        </p>
      </blockquote>

      {/* Results Highlight */}
      {results && (
        <div className="mb-6 bg-cream-100 border-l-2 border-primary-400 p-4">
          <p className="text-sm font-medium text-gray-800">
            {results}
          </p>
        </div>
      )}

      {/* Rating */}
      <div className="mb-6">
        <StarRating rating={rating} />
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-100 mb-6"></div>

      {/* Rep Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={repName}
              fill
              className="rounded-full object-cover border border-cream-200"
            />
          ) : (
            <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center border border-cream-200">
              <span className="font-serif text-lg text-primary-600">
                {repName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-medium text-gray-900">{repName}</p>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {company} Representative
          </p>
        </div>
      </div>
    </div>
  )
}
