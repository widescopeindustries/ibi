// Export all scrapers
export * from './base-scraper.js';
export * from './google-search-scraper.js';
export * from './locator-scraper.js';
export * from './social-scraper.js';

import { CompanyConfig, ScraperResult } from '../types.js';
import { BaseScraper } from './base-scraper.js';
import { GoogleSearchScraper } from './google-search-scraper.js';
import { LocatorScraper } from './locator-scraper.js';
import { SocialScraper } from './social-scraper.js';

// Factory function to create the appropriate scraper for a company
export function createScraper(config: CompanyConfig): BaseScraper {
  // If the company has a locator URL, use the locator scraper first
  if (config.repLocatorUrl) {
    return new LocatorScraper(config);
  }

  // Otherwise use the Google search scraper
  return new GoogleSearchScraper(config);
}

// Multi-method scraper that tries multiple approaches
export async function scrapeWithMultipleMethods(
  config: CompanyConfig,
  options?: {
    maxReps?: number;
    states?: string[];
    testMode?: boolean;
  }
): Promise<ScraperResult> {
  const results: ScraperResult[] = [];
  const allReps = new Map<string, any>(); // Deduplicate by email

  // Method 1: Try locator if available
  if (config.repLocatorUrl) {
    console.log(`\n  Trying locator method for ${config.name}...`);
    const locatorScraper = new LocatorScraper(config);
    const locatorResult = await locatorScraper.scrape(options);
    results.push(locatorResult);

    for (const rep of locatorResult.reps) {
      if (rep.email && !allReps.has(rep.email.toLowerCase())) {
        allReps.set(rep.email.toLowerCase(), rep);
      }
    }
  }

  // Method 2: Google/DuckDuckGo search
  if (allReps.size < (options?.maxReps || 100)) {
    console.log(`\n  Trying search method for ${config.name}...`);
    const searchScraper = new GoogleSearchScraper(config);
    const searchResult = await searchScraper.scrape({
      ...options,
      maxReps: (options?.maxReps || 100) - allReps.size,
    });
    results.push(searchResult);

    for (const rep of searchResult.reps) {
      if (rep.email && !allReps.has(rep.email.toLowerCase())) {
        allReps.set(rep.email.toLowerCase(), rep);
      }
    }
  }

  // Method 3: Social media search
  if (allReps.size < (options?.maxReps || 100)) {
    console.log(`\n  Trying social method for ${config.name}...`);
    const socialScraper = new SocialScraper(config);
    const socialResult = await socialScraper.scrape({
      ...options,
      maxReps: (options?.maxReps || 100) - allReps.size,
    });
    results.push(socialResult);

    for (const rep of socialResult.reps) {
      if (rep.email && !allReps.has(rep.email.toLowerCase())) {
        allReps.set(rep.email.toLowerCase(), rep);
      }
    }
  }

  // Combine results
  const combinedResult: ScraperResult = {
    company: config.name,
    success: results.some(r => r.success),
    repsFound: allReps.size,
    emailsFound: allReps.size,
    errors: results.flatMap(r => r.errors),
    duration: results.reduce((sum, r) => sum + r.duration, 0),
    reps: Array.from(allReps.values()),
  };

  return combinedResult;
}
