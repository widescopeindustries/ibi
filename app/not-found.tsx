import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center">
              <span className="text-9xl font-bold text-primary-600">4</span>
              <div className="mx-4 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-primary-600"
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
              </div>
              <span className="text-9xl font-bold text-primary-600">4</span>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Hmm, we couldn&apos;t find what you&apos;re looking for.
          </p>
          <p className="text-gray-500 mb-8">
            The page you&apos;re trying to reach doesn&apos;t exist or may have been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn btn-primary px-8">
              Go to Home
            </Link>
            <Link href="/search" className="btn btn-outline px-8">
              Search Representatives
            </Link>
          </div>

          {/* Popular Links */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Looking for something? Try these popular pages:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <Link
                href="/search"
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  Find a Representative
                </h3>
                <p className="text-sm text-gray-600">
                  Search for local sales reps in your area
                </p>
              </Link>

              <Link
                href="/companies"
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  Browse Companies
                </h3>
                <p className="text-sm text-gray-600">
                  Explore all direct sales companies
                </p>
              </Link>

              <Link
                href="/dashboard"
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  Your Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your profile and settings
                </p>
              </Link>

              <Link
                href="/pricing"
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  Pricing Plans
                </h3>
                <p className="text-sm text-gray-600">
                  View our membership options
                </p>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Still can&apos;t find what you need?{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium underline">
                Contact our support team
              </Link>
              {' '}or{' '}
              <Link href="/search" className="text-primary-600 hover:text-primary-700 font-medium underline">
                try searching
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
