'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Dashboard Error
          </h1>
          <p className="text-gray-600 mb-2">
            We couldn&apos;t load your dashboard data at this time.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            This might be a temporary issue. Please try again.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <p className="text-xs font-mono text-gray-700 break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="btn btn-primary px-6"
            >
              Reload Dashboard
            </button>
            <Link href="/" className="btn btn-outline px-6">
              Go to Home
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Or try accessing these sections directly:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/dashboard/profile"
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Edit Profile
              </Link>
              <Link
                href="/dashboard/companies"
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Manage Companies
              </Link>
              <Link
                href="/dashboard/subscription"
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Subscription
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              If you continue to experience issues,{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                please let us know
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}
