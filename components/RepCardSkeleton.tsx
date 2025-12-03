export default function RepCardSkeleton() {
  return (
    <div className="card h-full animate-pulse">
      <div className="flex flex-col items-center text-center">
        {/* Profile picture skeleton */}
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>

        {/* Name skeleton */}
        <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>

        {/* Location skeleton */}
        <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>

        {/* Company badges skeleton */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Bio skeleton */}
        <div className="w-full space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
