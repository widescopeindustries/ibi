import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | RepFinder',
  description: 'RepFinder privacy policy - how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Last Updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                RepFinder (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you
                use our directory platform.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Profile information for representatives (business details, location, bio)</li>
                <li>Account credentials and authentication data</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Communications and correspondence with us</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Process payments and subscriptions</li>
                <li>Display representative profiles in our directory</li>
                <li>Send you important updates and communications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns and improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Service providers who assist in operating our platform (hosting, payment processing, analytics)</li>
                <li>Other users when you choose to make information public in your profile</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access and update your personal information through your account dashboard</li>
                <li>Request deletion of your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to improve your experience, analyze
                platform usage, and provide personalized content. You can control cookies through your
                browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us through our
                contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
