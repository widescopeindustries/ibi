export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture Skeleton */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            </div>

            {/* Info Skeleton */}
            <div className="flex-grow space-y-4">
              <div className="h-9 bg-gray-200 rounded w-48"></div>
              <div className="h-5 bg-gray-200 rounded w-64"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Skeleton */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* About Me Skeleton */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-40 mb-6"></div>

          {/* Review Items Skeleton */}
          <div className="space-y-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-24 mt-2"></div>
              </div>
            ))}
          </div>

          {/* Review Form Skeleton */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
