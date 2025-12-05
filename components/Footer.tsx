import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="font-serif text-xl tracking-wider text-gray-900">
                A REP NEAR ME
              </span>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-0.5">
                Inspired By Independence
              </span>
            </Link>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Connecting you with trusted direct sales representatives in your area.
            </p>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">
              For Customers
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Find a Rep
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* For Reps */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">
              For Representatives
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Join Now
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center tracking-wide">
            &copy; {new Date().getFullYear()} A Rep Near Me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
