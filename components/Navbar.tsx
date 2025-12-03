import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              RepFinder
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-700 hover:text-primary-600">
              Find a Rep
            </Link>
            <Link href="/find" className="text-gray-700 hover:text-primary-600">
              Browse by Location
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-primary-600">
              Companies
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
