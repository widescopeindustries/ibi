import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors"
            >
              Find a Rep
            </Link>
            <Link
              href="/companies"
              className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/pricing"
              className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif text-2xl tracking-wider text-gray-900">
                REPFINDER
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-0.5">
                Directory
              </span>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors hidden md:block"
                >
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors hidden sm:block"
                >
                  Log In
                </Link>
                <span className="text-gray-300 hidden sm:block">|</span>
                <Link
                  href="/auth/signup"
                  className="text-xs uppercase tracking-widest text-gray-700 hover:text-primary-600 transition-colors hidden sm:block"
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
