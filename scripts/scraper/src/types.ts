// Types for the sales rep scraping agent

export interface SalesRep {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  company: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  profileUrl: string | null;
  personalWebsite: string | null;
  socialLinks: SocialLinks;
  scrapedAt: string;
  source: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  pinterest?: string;
  youtube?: string;
}

export interface CompanyConfig {
  name: string;
  slug: string;
  baseUrl: string;
  repLocatorUrl: string | null;
  category: string;
  enabled: boolean;
  scrapeMethod: 'api' | 'html' | 'puppeteer';
  rateLimit: number; // requests per minute
  notes?: string;
}

export interface ScraperResult {
  company: string;
  success: boolean;
  repsFound: number;
  emailsFound: number;
  errors: string[];
  duration: number;
  reps: SalesRep[];
}

export interface ScraperOptions {
  companies?: string[];
  maxRepsPerCompany?: number;
  outputFormat?: 'json' | 'csv' | 'both';
  outputDir?: string;
  testMode?: boolean;
  states?: string[];
  concurrency?: number;
}

export interface EmailPattern {
  pattern: RegExp;
  confidence: 'high' | 'medium' | 'low';
}
