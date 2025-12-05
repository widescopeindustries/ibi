import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | A Rep Near Me',
  description: 'Get in touch with the A Rep Near Me team. We are here to help with any questions or concerns.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
            Contact Us
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-8">
              Have questions or feedback? We would love to hear from you. Our team is here to help
              with any inquiries about our platform, your account, or general questions.
            </p>

            <div className="bg-cream-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Get in Touch
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-900">For General Inquiries:</strong><br />
                  Email us and we will get back to you within 24-48 hours.
                </p>

                <p>
                  <strong className="text-gray-900">For Representatives:</strong><br />
                  If you need help with your profile or account, please log in to your dashboard
                  and use the support options available there.
                </p>

                <p>
                  <strong className="text-gray-900">For Customers:</strong><br />
                  Questions about a specific representative? Please contact them directly through
                  their profile page.
                </p>
              </div>
            </div>

            <h2 className="font-serif text-2xl text-gray-900 mt-8 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Before reaching out, you may find the answer to your question in our FAQs section
              on each page. We cover common topics about finding representatives, creating profiles,
              and using our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
