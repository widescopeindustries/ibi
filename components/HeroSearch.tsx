'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const router = useRouter()
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (company) params.set('company', company)
    if (location) params.set('location', location)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="e.g., Pampered Chef"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="City, State or ZIP Code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg"
          >
            Search Representatives
          </button>
        </div>
      </div>
    </form>
  )
}
