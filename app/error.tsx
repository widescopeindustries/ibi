'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-2">
            We encountered an unexpected error while loading this page.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Don't worry, it's not your fault. Our team has been notified.
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
              Try Again
            </button>
            <Link href="/" className="btn btn-outline px-6">
              Go to Home
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Need help? Here are some things you can try:
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Refresh the page</li>
              <li>Clear your browser cache and cookies</li>
              <li>Check your internet connection</li>
              <li>Try again in a few minutes</li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              If the problem persists,{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
