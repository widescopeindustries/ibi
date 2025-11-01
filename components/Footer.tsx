import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">RepFinder</h3>
            <p className="text-sm">
              Find trusted direct sales representatives in your area.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Customers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="hover:text-white">
                  Find a Rep
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white">
                  Browse Companies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Reps</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/signup" className="hover:text-white">
                  Join Now
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} RepFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
