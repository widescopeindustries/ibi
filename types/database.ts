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
  email_verified?: boolean;
  avg_response_hours?: number;
  latitude?: number;
  longitude?: number;
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
