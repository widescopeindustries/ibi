import Link from 'next/link'
import Image from 'next/image'
import { ProfileWithCompanies } from '@/types/database'

interface RepCardProps {
  profile: ProfileWithCompanies
  companies?: string[]
}

export default function RepCard({ profile, companies = [] }: RepCardProps) {
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous'
  const location = [profile.city, profile.state].filter(Boolean).join(', ') || 'Location not specified'

  return (
    <Link href={`/rep/${profile.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-4">
            {profile.profile_picture_url ? (
              <Image
                src={profile.profile_picture_url}
                alt={fullName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl text-gray-400">
                  {(profile.first_name?.[0] || '?').toUpperCase()}
                </span>
              </div>
            )}
            {profile.is_pro_subscriber && (
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                PRO
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {fullName}
          </h3>

          <p className="text-sm text-gray-600 mb-3">{location}</p>

          {companies.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {companies.slice(0, 2).map((company, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
                >
                  {company}
                </span>
              ))}
              {companies.length > 2 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{companies.length - 2} more
                </span>
              )}
            </div>
          )}

          {profile.bio && (
            <p className="text-sm text-gray-500 mt-3 line-clamp-2">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
