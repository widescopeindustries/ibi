'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Company {
  id: number
  name: string
  slug: string
}

interface SearchSuggestion {
  type: 'company' | 'city' | 'state'
  value: string
  display: string
}

interface SearchHistoryItem {
  company?: string
  location?: string
  timestamp: number
}

const SEARCH_HISTORY_KEY = 'ibi-search-history'
const MAX_HISTORY_ITEMS = 5

export default function AdvancedSearch() {
  const router = useRouter()
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [radius, setRadius] = useState<string>('25')
  const [isLocating, setIsLocating] = useState(false)
  const [repCount, setRepCount] = useState<number | null>(null)
  const [isCountLoading, setIsCountLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const companyInputRef = useRef<HTMLInputElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Load companies and search history on mount
  useEffect(() => {
    loadCompanies()
    loadSearchHistory()
  }, [])

  // Debounced rep count update
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      updateRepCount()
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [company, location])

  const loadCompanies = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('companies')
      .select('id, name, slug')
      .order('name')

    if (data) {
      setCompanies(data)
    }
  }

  const loadSearchHistory = () => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
      if (stored) {
        setSearchHistory(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  const saveSearchHistory = (item: SearchHistoryItem) => {
    try {
      const newHistory = [
        item,
        ...searchHistory.filter(
          h => h.company !== item.company || h.location !== item.location
        )
      ].slice(0, MAX_HISTORY_ITEMS)

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
      setSearchHistory(newHistory)
    } catch {
      // Ignore localStorage errors
    }
  }

  const updateRepCount = async () => {
    if (!company && !location) {
      setRepCount(null)
      return
    }

    setIsCountLoading(true)
    try {
      const supabase = createClient()
      let query = supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })

      if (location) {
        const loc = location.toLowerCase().trim()
        if (/^\d{5}$/.test(loc)) {
          query = query.eq('zip_code', loc)
        } else if (loc.length === 2) {
          query = query.ilike('state', loc)
        } else {
          query = query.ilike('city', `%${loc}%`)
        }
      }

      const { count } = await query

      // If company filter is applied, we need to do additional filtering
      if (company && count && count > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select(`
            id,
            rep_companies (
              companies (name, slug)
            )
          `)
          .ilike('city', location ? `%${location}%` : '%')

        const companyLower = company.toLowerCase()
        const filtered = profiles?.filter((p: any) =>
          p.rep_companies?.some((rc: any) =>
            rc.companies?.name?.toLowerCase().includes(companyLower) ||
            rc.companies?.slug?.includes(companyLower)
          )
        )
        setRepCount(filtered?.length || 0)
      } else {
        setRepCount(count || 0)
      }
    } catch {
      setRepCount(null)
    } finally {
      setIsCountLoading(false)
    }
  }

  const handleCompanyChange = (value: string) => {
    setCompany(value)

    if (value.length >= 2) {
      const filtered = companies
        .filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
        .map(c => ({
          type: 'company' as const,
          value: c.slug,
          display: c.name,
        }))
      setSuggestions(filtered.slice(0, 5))
      setShowCompanySuggestions(filtered.length > 0)
    } else {
      setShowCompanySuggestions(false)
    }
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)

    // Basic location suggestions - in production, you'd use a geocoding API
    if (value.length >= 2) {
      const locationSuggestions: SearchSuggestion[] = []

      // Add state codes
      const states = [
        { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
      ]

      const valueLower = value.toLowerCase()
      states
        .filter(s =>
          s.code.toLowerCase().includes(valueLower) ||
          s.name.toLowerCase().includes(valueLower)
        )
        .slice(0, 5)
        .forEach(s => {
          locationSuggestions.push({
            type: 'state',
            value: s.code,
            display: `${s.name} (${s.code})`,
          })
        })

      setSuggestions(locationSuggestions)
      setShowLocationSuggestions(locationSuggestions.length > 0)
    } else {
      setShowLocationSuggestions(false)
    }
  }

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use reverse geocoding to get ZIP code
          // In production, you'd use a proper geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          )
          const data = await response.json()

          if (data.address?.postcode) {
            setLocation(data.address.postcode)
          } else if (data.address?.city) {
            setLocation(data.address.city)
          } else if (data.address?.state) {
            setLocation(data.address.state)
          }
        } catch {
          alert('Could not determine your location. Please enter it manually.')
        } finally {
          setIsLocating(false)
        }
      },
      () => {
        setIsLocating(false)
        alert('Unable to get your location. Please check your browser settings.')
      },
      { timeout: 10000 }
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to history
    if (company || location) {
      saveSearchHistory({
        company: company || undefined,
        location: location || undefined,
        timestamp: Date.now(),
      })
    }

    const params = new URLSearchParams()
    if (company) params.set('company', company)
    if (location) params.set('location', location)
    if (radius !== '25') params.set('radius', radius)

    router.push(`/search?${params.toString()}`)
  }

  const handleHistorySelect = (item: SearchHistoryItem) => {
    if (item.company) setCompany(item.company)
    if (item.location) setLocation(item.location)
    setShowHistory(false)
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'company') {
      setCompany(suggestion.value)
      setShowCompanySuggestions(false)
    } else {
      setLocation(suggestion.value)
      setShowLocationSuggestions(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Input with Autocomplete */}
          <div className="relative">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              ref={companyInputRef}
              id="company"
              type="text"
              placeholder="e.g., Pampered Chef"
              value={company}
              onChange={(e) => handleCompanyChange(e.target.value)}
              onFocus={() => company.length >= 2 && setShowCompanySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
              className="input"
              autoComplete="off"
            />

            {/* Company Suggestions Dropdown */}
            {showCompanySuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => handleSuggestionSelect(s)}
                  >
                    {s.display}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Input with Near Me Button */}
          <div className="relative">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={locationInputRef}
                  id="location"
                  type="text"
                  placeholder="City, State or ZIP Code"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => {
                    if (location.length >= 2) setShowLocationSuggestions(true)
                    if (!location && searchHistory.length > 0) setShowHistory(true)
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowLocationSuggestions(false)
                      setShowHistory(false)
                    }, 200)
                  }}
                  className="input w-full"
                  autoComplete="off"
                />

                {/* Location Suggestions Dropdown */}
                {showLocationSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => handleSuggestionSelect(s)}
                      >
                        {s.display}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search History Dropdown */}
                {showHistory && searchHistory.length > 0 && !location && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">Recent Searches</div>
                    {searchHistory.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => handleHistorySelect(item)}
                      >
                        {item.company && <span className="font-medium">{item.company}</span>}
                        {item.company && item.location && ' in '}
                        {item.location && <span>{item.location}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Near Me Button */}
              <button
                type="button"
                onClick={handleNearMe}
                disabled={isLocating}
                className="btn btn-secondary px-3 flex-shrink-0"
                title="Use my location"
              >
                {isLocating ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Radius Selector */}
        <div className="mt-4">
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius
          </label>
          <select
            id="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="input w-full md:w-48"
          >
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50">Within 50 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="any">Any distance</option>
          </select>
        </div>

        {/* Rep Count Preview */}
        {(company || location) && (
          <div className="mt-4 text-sm text-gray-600">
            {isCountLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </span>
            ) : repCount !== null ? (
              <span>
                <strong>{repCount}</strong> representative{repCount !== 1 ? 's' : ''} found
              </span>
            ) : null}
          </div>
        )}

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
