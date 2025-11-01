import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies (
        companies (
          id,
          name,
          slug,
          category
        )
      )
    `)
    .eq('id', user.id)
    .single()

  const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Anonymous'
  const companies = profile?.rep_companies?.map((rc: any) => rc.companies) || []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your profile and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Profile Overview</h2>
                <Link href="/dashboard/profile" className="btn btn-outline text-sm">
                  Edit Profile
                </Link>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24">
                  {profile?.profile_picture_url ? (
                    <Image
                      src={profile.profile_picture_url}
                      alt={fullName}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-3xl text-gray-400">
                        {(profile?.first_name?.[0] || '?').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{fullName}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  {profile?.is_pro_subscriber && (
                    <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mt-2">
                      PRO MEMBER
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium">
                    {[profile?.city, profile?.state, profile?.zip_code].filter(Boolean).join(', ') || 'Not set'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Website:</span>
                  <p className="font-medium">
                    {profile?.personal_website_url ? (
                      <a href={profile.personal_website_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        View Site
                      </a>
                    ) : (
                      'Not set'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Companies */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Companies</h2>
                <Link href="/dashboard/companies" className="btn btn-outline text-sm">
                  Manage
                </Link>
              </div>

              {companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companies.map((company: any) => (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-3">
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No companies added yet. Add companies to appear in search results.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Link
                  href={`/rep/${user.id}`}
                  className="block text-primary-600 hover:text-primary-700"
                >
                  View Public Profile
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block text-primary-600 hover:text-primary-700"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/dashboard/companies"
                  className="block text-primary-600 hover:text-primary-700"
                >
                  Manage Companies
                </Link>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              {profile?.is_pro_subscriber ? (
                <div>
                  <p className="text-green-600 font-medium mb-4">
                    Pro Membership Active
                  </p>
                  <Link href="/dashboard/subscription" className="btn btn-outline w-full text-sm">
                    Manage Subscription
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Upgrade to Pro for enhanced visibility and features
                  </p>
                  <Link href="/dashboard/subscription" className="btn btn-primary w-full text-sm">
                    Upgrade to Pro
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
