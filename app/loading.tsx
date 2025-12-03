import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}
