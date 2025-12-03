import Testimonial, { TestimonialData } from './Testimonial'

interface TestimonialSectionProps {
  testimonials: TestimonialData[]
  title?: string
  subtitle?: string
}

export default function TestimonialSection({
  testimonials,
  title = "What Our Customers Say",
  subtitle = "Real experiences from people who found their perfect representative"
}: TestimonialSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to find your perfect representative?
          </p>
          <a
            href="/search"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Representatives
          </a>
        </div>
      </div>
    </section>
  )
}
