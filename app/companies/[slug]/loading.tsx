import RepCardSkeleton from '@/components/RepCardSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-10 bg-white/20 rounded w-64 mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-96"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Info Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-pulse">
          <div className="space-y-3">
            <div className="h-7 bg-gray-200 rounded w-48"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        {/* Representatives Section Skeleton */}
        <div>
          <div className="mb-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <RepCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
