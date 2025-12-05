export interface Company {
  id: number;
  created_at: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  category: string | null;
  slug: string;
}

export interface Profile {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  bio: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  personal_website_url: string | null;
  is_pro_subscriber: boolean;
  stripe_customer_id: string | null;
}

export interface RepCompany {
  id: number;
  rep_id: string;
  company_id: number;
  created_at: string;
}

export interface Review {
  id: number;
  created_at: string;
  rep_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
}

// Extended types with joined data
export interface ProfileWithCompanies extends Profile {
  companies?: Company[];
  rep_companies?: (RepCompany & { companies: Company })[];
}

export interface ProfileWithReviews extends Profile {
  reviews?: Review[];
  average_rating?: number;
  review_count?: number;
}

export interface CompanyWithReps extends Company {
  rep_count?: number;
}

export interface SearchParams {
  company?: string;
  location?: string;
  state?: string;
  zipCode?: string;
}

// External listing from scraped data (Google Maps, etc.)
// Matches Supabase table schema (snake_case)
export interface ExternalListing {
  id: string;
  created_at?: string;
  title: string;
  first_name: string | null;
  last_name: string | null;
  total_score: number | null;
  reviews_count: number;
  street: string | null;
  city: string | null;
  state: string | null;
  country_code: string;
  website: string | null;
  phone: string | null;
  category_name: string | null;
  google_maps_url: string | null;
  company_slug: string | null;
  source: string;
  is_active?: boolean;
}
