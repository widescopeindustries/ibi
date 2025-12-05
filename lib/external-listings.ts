import { ExternalListing } from '@/types/database'
import avonListings from '@/data/external-listings/avon.json'
import pamperedChefListings from '@/data/external-listings/pampered-chef.json'

// Map of company slugs to their external listings
const externalListingsByCompany: Record<string, ExternalListing[]> = {
  'avon': avonListings as ExternalListing[],
  'pampered-chef': pamperedChefListings as ExternalListing[],
}

/**
 * Get external listings for a specific company by slug
 */
export function getExternalListingsByCompany(companySlug: string): ExternalListing[] {
  return externalListingsByCompany[companySlug] || []
}

/**
 * Get all external listings
 */
export function getAllExternalListings(): ExternalListing[] {
  return Object.values(externalListingsByCompany).flat()
}

/**
 * Search external listings by location
 */
export function searchExternalListings(options: {
  companySlug?: string
  location?: string
  state?: string
  city?: string
}): ExternalListing[] {
  let listings = options.companySlug
    ? getExternalListingsByCompany(options.companySlug)
    : getAllExternalListings()

  if (options.state) {
    const stateSearch = options.state.toUpperCase()
    listings = listings.filter(l => l.state?.toUpperCase() === stateSearch)
  }

  if (options.city) {
    const citySearch = options.city.toLowerCase()
    listings = listings.filter(l => l.city?.toLowerCase().includes(citySearch))
  }

  if (options.location) {
    const locationSearch = options.location.toLowerCase()
    // Check if it's a state code (2 chars)
    if (locationSearch.length === 2) {
      listings = listings.filter(l => l.state?.toLowerCase() === locationSearch)
    } else {
      // Search by city
      listings = listings.filter(l => l.city?.toLowerCase().includes(locationSearch))
    }
  }

  return listings
}

/**
 * Get count of external listings for a company
 */
export function getExternalListingCount(companySlug: string): number {
  return getExternalListingsByCompany(companySlug).length
}
