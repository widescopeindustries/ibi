import { createClient } from '@/lib/supabase/server'
import { ExternalListing } from '@/types/database'

/**
 * Get external listings for a specific company by slug
 */
export async function getExternalListingsByCompany(companySlug: string): Promise<ExternalListing[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('external_listings')
    .select('*')
    .eq('company_slug', companySlug)
    .eq('is_active', true)
    .order('total_score', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('Error fetching external listings:', error)
    return []
  }

  return data || []
}

/**
 * Get all external listings
 */
export async function getAllExternalListings(): Promise<ExternalListing[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('external_listings')
    .select('*')
    .eq('is_active', true)
    .order('total_score', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('Error fetching external listings:', error)
    return []
  }

  return data || []
}

/**
 * Search external listings by location and/or company
 */
export async function searchExternalListings(options: {
  companySlug?: string
  location?: string
  state?: string
  city?: string
}): Promise<ExternalListing[]> {
  const supabase = await createClient()

  let query = supabase
    .from('external_listings')
    .select('*')
    .eq('is_active', true)

  if (options.companySlug) {
    query = query.eq('company_slug', options.companySlug)
  }

  if (options.state) {
    query = query.ilike('state', options.state)
  }

  if (options.city) {
    query = query.ilike('city', `%${options.city}%`)
  }

  if (options.location) {
    const locationSearch = options.location.toLowerCase().trim()
    // Check if it's a state code (2 chars)
    if (locationSearch.length === 2) {
      query = query.ilike('state', locationSearch)
    } else {
      // Search by city
      query = query.ilike('city', `%${locationSearch}%`)
    }
  }

  query = query.order('total_score', { ascending: false, nullsFirst: false })

  const { data, error } = await query

  if (error) {
    console.error('Error searching external listings:', error)
    return []
  }

  return data || []
}

/**
 * Get count of external listings for a company
 */
export async function getExternalListingCount(companySlug: string): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('external_listings')
    .select('*', { count: 'exact', head: true })
    .eq('company_slug', companySlug)
    .eq('is_active', true)

  if (error) {
    console.error('Error counting external listings:', error)
    return 0
  }

  return count || 0
}
