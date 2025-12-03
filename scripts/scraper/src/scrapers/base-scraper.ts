// Base scraper class that all company scrapers extend

import { Browser, Page } from 'puppeteer';
import { CompanyConfig, SalesRep, ScraperResult, SocialLinks } from '../types.js';
import {
  RateLimiter,
  randomDelay,
  createBrowser,
  createPage,
  closeBrowser,
  safeNavigate,
  scrollPage,
  getPageContent,
  extractEmails,
  extractPhones,
  extractSocialLinks,
  generateRepId
} from '../utils/index.js';

// US States for location-based scraping
export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

// Major cities for searches
export const MAJOR_CITIES = [
  { city: 'New York', state: 'NY' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Houston', state: 'TX' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Austin', state: 'TX' },
  { city: 'Jacksonville', state: 'FL' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Columbus', state: 'OH' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Indianapolis', state: 'IN' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Boston', state: 'MA' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Detroit', state: 'MI' },
  { city: 'Portland', state: 'OR' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Miami', state: 'FL' },
  { city: 'Minneapolis', state: 'MN' },
];

export abstract class BaseScraper {
  protected config: CompanyConfig;
  protected rateLimiter: RateLimiter;
  protected browser: Browser | null = null;
  protected reps: SalesRep[] = [];
  protected errors: string[] = [];
  protected startTime: number = 0;

  constructor(config: CompanyConfig) {
    this.config = config;
    this.rateLimiter = new RateLimiter(config.rateLimit);
  }

  // Abstract method - each company scraper must implement this
  abstract scrape(options?: {
    maxReps?: number;
    states?: string[];
    testMode?: boolean;
  }): Promise<ScraperResult>;

  // Initialize browser
  protected async initBrowser(): Promise<Browser> {
    this.browser = await createBrowser();
    return this.browser;
  }

  // Create new page with anti-detection
  protected async newPage(): Promise<Page> {
    if (!this.browser) {
      await this.initBrowser();
    }
    return createPage(this.browser!);
  }

  // Close browser
  protected async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  // Safe navigation with rate limiting
  protected async navigate(page: Page, url: string): Promise<boolean> {
    await this.rateLimiter.waitForSlot();
    const success = await safeNavigate(page, url);
    await randomDelay(1000, 2000);
    return success;
  }

  // Extract rep info from a profile page
  protected async extractRepFromPage(
    page: Page,
    url: string,
    selectors: {
      name?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      bio?: string;
      website?: string;
    }
  ): Promise<Partial<SalesRep>> {
    const content = await getPageContent(page);

    // Extract emails from page content
    const emails = extractEmails(content, url);
    const email = emails.length > 0 ? emails[0].email : null;

    // Extract phones
    const phones = extractPhones(content);
    const phone = phones.length > 0 ? phones[0] : null;

    // Extract social links
    const socialLinks = extractSocialLinks(content);

    // Try to get structured data from selectors
    let firstName = '';
    let lastName = '';
    let city = null;
    let state = null;
    let zipCode = null;
    let website = null;

    if (selectors.name) {
      const fullName = await this.getTextContent(page, selectors.name);
      if (fullName) {
        const nameParts = fullName.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
    }

    if (selectors.firstName) {
      firstName = await this.getTextContent(page, selectors.firstName) || firstName;
    }
    if (selectors.lastName) {
      lastName = await this.getTextContent(page, selectors.lastName) || lastName;
    }
    if (selectors.city) {
      city = await this.getTextContent(page, selectors.city);
    }
    if (selectors.state) {
      state = await this.getTextContent(page, selectors.state);
    }
    if (selectors.zipCode) {
      zipCode = await this.getTextContent(page, selectors.zipCode);
    }
    if (selectors.website) {
      website = await this.getAttribute(page, selectors.website, 'href');
    }

    return {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      zipCode,
      profileUrl: url,
      personalWebsite: website,
      socialLinks: socialLinks as SocialLinks,
    };
  }

  // Helper to get text content
  protected async getTextContent(page: Page, selector: string): Promise<string | null> {
    try {
      const element = await page.$(selector);
      if (!element) return null;
      const text = await page.evaluate(el => el.textContent, element);
      return text?.trim() || null;
    } catch {
      return null;
    }
  }

  // Helper to get attribute
  protected async getAttribute(page: Page, selector: string, attr: string): Promise<string | null> {
    try {
      const element = await page.$(selector);
      if (!element) return null;
      const value = await page.evaluate((el, a) => el.getAttribute(a), element, attr);
      return value?.trim() || null;
    } catch {
      return null;
    }
  }

  // Add rep to collection with deduplication
  protected addRep(rep: Partial<SalesRep>): void {
    // Skip if no name
    if (!rep.firstName && !rep.lastName) return;

    // Check for duplicates by email
    if (rep.email) {
      const exists = this.reps.some(r => r.email?.toLowerCase() === rep.email?.toLowerCase());
      if (exists) return;
    }

    const fullRep: SalesRep = {
      id: generateRepId(this.config.name, rep.firstName || '', rep.lastName || ''),
      firstName: rep.firstName || '',
      lastName: rep.lastName || '',
      email: rep.email || null,
      phone: rep.phone || null,
      company: this.config.name,
      city: rep.city || null,
      state: rep.state || null,
      zipCode: rep.zipCode || null,
      profileUrl: rep.profileUrl || null,
      personalWebsite: rep.personalWebsite || null,
      socialLinks: rep.socialLinks || {},
      scrapedAt: new Date().toISOString(),
      source: this.config.baseUrl,
    };

    this.reps.push(fullRep);
  }

  // Log error
  protected logError(message: string): void {
    const error = `[${this.config.name}] ${message}`;
    console.error(`  Error: ${message}`);
    this.errors.push(error);
  }

  // Create result object
  protected createResult(success: boolean): ScraperResult {
    const duration = Date.now() - this.startTime;
    const emailsFound = this.reps.filter(r => r.email).length;

    return {
      company: this.config.name,
      success,
      repsFound: this.reps.length,
      emailsFound,
      errors: this.errors,
      duration,
      reps: this.reps,
    };
  }

  // Start timing
  protected startTimer(): void {
    this.startTime = Date.now();
  }

  // Scroll to load lazy content
  protected async scrollToLoad(page: Page, scrolls: number = 3): Promise<void> {
    await scrollPage(page, scrolls);
  }

  // Wait for specific element
  protected async waitForElement(page: Page, selector: string, timeout: number = 10000): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  // Get all links matching pattern
  protected async getLinks(page: Page, pattern?: RegExp): Promise<string[]> {
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href'))
        .filter((h): h is string => h !== null);
    });

    if (pattern) {
      return links.filter(l => pattern.test(l));
    }
    return links;
  }

  // Extract from Google search results (fallback method)
  protected async searchGoogle(query: string, page: Page): Promise<string[]> {
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;

    await this.navigate(page, searchUrl);
    await randomDelay(2000, 4000);

    // Get search result links
    const links = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll('a[href]'));
      return results
        .map(a => a.getAttribute('href'))
        .filter((h): h is string =>
          h !== null &&
          h.startsWith('http') &&
          !h.includes('google.com') &&
          !h.includes('youtube.com')
        );
    });

    return links.slice(0, 10); // Return top 10 results
  }
}
