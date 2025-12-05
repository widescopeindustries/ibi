import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | RepFinder',
  description: 'Learn about RepFinder - connecting customers with trusted direct sales representatives.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
            About RepFinder
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              RepFinder is your trusted directory for connecting with independent sales representatives
              from top direct sales companies. We make it easy to find local representatives who can
              help you discover amazing products and personalized service.
            </p>

            <h2 className="font-serif text-2xl text-gray-900 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe in empowering both customers and independent sales representatives. Our platform
              provides a seamless way for customers to discover and connect with trusted representatives
              in their area, while helping representatives grow their business and reach new customers.
            </p>

            <h2 className="font-serif text-2xl text-gray-900 mt-8 mb-4">
              For Customers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Browse our directory to find representatives from your favorite direct sales companies.
              Search by location, company, or product category to discover the perfect representative
              for your needs. All representatives in our directory are verified and committed to
              providing excellent service.
            </p>

            <h2 className="font-serif text-2xl text-gray-900 mt-8 mb-4">
              For Representatives
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Join our growing community of independent sales representatives. Create your profile,
              showcase your products and services, and connect with customers actively searching for
              representatives in their area. Our platform helps you build your business and expand
              your customer base.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
