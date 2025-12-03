export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-9 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-64"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 bg-gray-200 rounded w-36"></div>
                <div className="h-10 bg-gray-200 rounded w-28"></div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-grow space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-5 bg-gray-200 rounded w-64"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>

            {/* Companies Skeleton */}
            <div className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-7 bg-gray-200 rounded w-36"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            {/* Quick Links Skeleton */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-28 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {/* Subscription Skeleton */}
            <div className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-28 mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
