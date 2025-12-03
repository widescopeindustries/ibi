// Locator-based scraper for companies with Find a Consultant features
// Works with structured rep locator pages

import { Page } from 'puppeteer';
import { CompanyConfig, ScraperResult } from '../types.js';
import { BaseScraper, MAJOR_CITIES } from './base-scraper.js';
import {
  randomDelay,
  extractEmails,
  extractPhones,
  extractSocialLinks,
  getPageContent
} from '../utils/index.js';

// Company-specific configurations for locator pages
interface LocatorConfig {
  searchInputSelector: string;
  searchButtonSelector: string;
  resultsContainerSelector: string;
  repCardSelector: string;
  repLinkSelector: string;
  nameSelector?: string;
  locationSelector?: string;
  waitForResults?: number;
  needsScroll?: boolean;
}

const LOCATOR_CONFIGS: Record<string, LocatorConfig> = {
  'mary-kay': {
    searchInputSelector: 'input[name="location"], input[placeholder*="ZIP"], input[placeholder*="zip"]',
    searchButtonSelector: 'button[type="submit"], .search-btn, [class*="search"]',
    resultsContainerSelector: '.consultant-results, .search-results, [class*="results"]',
    repCardSelector: '.consultant-card, .rep-card, [class*="consultant"]',
    repLinkSelector: 'a[href*="consultant"], a[href*="rep"]',
    nameSelector: '.consultant-name, h3, h4',
    locationSelector: '.location, .city-state',
    waitForResults: 3000,
    needsScroll: true,
  },
  'pampered-chef': {
    searchInputSelector: 'input[id*="search"], input[name*="location"], input[placeholder*="ZIP"]',
    searchButtonSelector: 'button[type="submit"], .search-button',
    resultsContainerSelector: '.consultant-list, .results',
    repCardSelector: '.consultant, .result-item',
    repLinkSelector: 'a[href*="consultant"]',
    nameSelector: '.name, h3',
    locationSelector: '.location',
    waitForResults: 3000,
    needsScroll: true,
  },
  'scentsy': {
    searchInputSelector: 'input[name="zip"], input[placeholder*="zip"]',
    searchButtonSelector: 'button[type="submit"]',
    resultsContainerSelector: '.consultants, .search-results',
    repCardSelector: '.consultant-card',
    repLinkSelector: 'a',
    nameSelector: '.name',
    locationSelector: '.location',
    waitForResults: 3000,
    needsScroll: true,
  },
  'doterra': {
    searchInputSelector: 'input[name="location"], input[type="text"]',
    searchButtonSelector: 'button[type="submit"], .search-btn',
    resultsContainerSelector: '.advocate-results, .results',
    repCardSelector: '.advocate-card, .result',
    repLinkSelector: 'a',
    nameSelector: '.name, h4',
    locationSelector: '.location',
    waitForResults: 3000,
    needsScroll: true,
  },
  // Default config that works for many sites
  'default': {
    searchInputSelector: 'input[type="text"], input[name*="zip"], input[name*="location"], input[placeholder*="zip"]',
    searchButtonSelector: 'button[type="submit"], input[type="submit"], .search-btn, .btn-search',
    resultsContainerSelector: '.results, .search-results, [class*="result"]',
    repCardSelector: '.card, .result, .item, [class*="consultant"], [class*="rep"]',
    repLinkSelector: 'a[href]',
    nameSelector: 'h3, h4, .name, [class*="name"]',
    locationSelector: '.location, .city, [class*="location"]',
    waitForResults: 5000,
    needsScroll: true,
  },
};

export class LocatorScraper extends BaseScraper {
  private locatorConfig: LocatorConfig;

  constructor(config: CompanyConfig) {
    super(config);
    this.locatorConfig = LOCATOR_CONFIGS[config.slug] || LOCATOR_CONFIGS['default'];
  }

  async scrape(options?: {
    maxReps?: number;
    states?: string[];
    testMode?: boolean;
  }): Promise<ScraperResult> {
    const maxReps = options?.maxReps || 100;
    const testMode = options?.testMode || false;

    // If no locator URL, fall back to search-based scraping
    if (!this.config.repLocatorUrl) {
      console.log(`  [${this.config.name}] No locator URL, skipping...`);
      return this.createResult(false);
    }

    console.log(`\n  [${this.config.name}] Starting locator scrape...`);
    console.log(`  Locator: ${this.config.repLocatorUrl}`);
    console.log(`  Target: ${maxReps} reps`);

    this.startTimer();

    try {
      await this.initBrowser();
      const page = await this.newPage();

      // Navigate to the locator page
      const navigated = await this.navigate(page, this.config.repLocatorUrl);
      if (!navigated) {
        this.logError('Failed to load locator page');
        await this.cleanup();
        return this.createResult(false);
      }

      // Wait for page to fully load
      await randomDelay(2000, 3000);

      // Get cities to search
      const citiesToSearch = testMode ? MAJOR_CITIES.slice(0, 3) : MAJOR_CITIES;

      for (const { city, state } of citiesToSearch) {
        if (this.reps.length >= maxReps) break;

        console.log(`  Searching ${city}, ${state}...`);

        try {
          // Search for consultants in this location
          await this.performSearch(page, city, state);

          // Extract consultants from results
          const profileUrls = await this.extractProfileUrls(page);
          console.log(`    Found ${profileUrls.length} consultants`);

          // Visit each profile
          for (const url of profileUrls.slice(0, 10)) {
            if (this.reps.length >= maxReps) break;

            try {
              await this.scrapeProfile(page, url, city, state);
            } catch (err) {
              // Skip failed profiles silently
            }

            await randomDelay(1500, 3000);
          }

          // Go back to locator for next search
          await this.navigate(page, this.config.repLocatorUrl!);
          await randomDelay(1000, 2000);

        } catch (err) {
          this.logError(`Search failed for ${city}, ${state}: ${err}`);
        }
      }

      await this.cleanup();
      const result = this.createResult(true);
      console.log(`  [${this.config.name}] Complete: ${result.repsFound} reps, ${result.emailsFound} emails`);
      return result;

    } catch (error) {
      this.logError(`Scraper failed: ${error}`);
      await this.cleanup();
      return this.createResult(false);
    }
  }

  private async performSearch(page: Page, city: string, state: string): Promise<void> {
    const config = this.locatorConfig;

    // Try to find and fill the search input
    const searchInput = await page.$(config.searchInputSelector);
    if (searchInput) {
      await searchInput.click({ clickCount: 3 }); // Select all
      await searchInput.type(`${city}, ${state}`, { delay: 50 });
      await randomDelay(500, 1000);

      // Try to click search button
      const searchButton = await page.$(config.searchButtonSelector);
      if (searchButton) {
        await searchButton.click();
      } else {
        // Try pressing enter
        await page.keyboard.press('Enter');
      }

      // Wait for results
      await randomDelay(config.waitForResults || 3000, (config.waitForResults || 3000) + 2000);

      // Scroll to load more results if needed
      if (config.needsScroll) {
        await this.scrollToLoad(page, 2);
      }
    }
  }

  private async extractProfileUrls(page: Page): Promise<string[]> {
    const config = this.locatorConfig;

    try {
      const urls = await page.evaluate((cardSel, linkSel, baseUrl) => {
        const cards = document.querySelectorAll(cardSel);
        const links: string[] = [];

        cards.forEach(card => {
          const link = card.querySelector(linkSel);
          if (link) {
            const href = link.getAttribute('href');
            if (href) {
              // Make absolute URL if needed
              if (href.startsWith('/')) {
                links.push(new URL(href, baseUrl).href);
              } else if (href.startsWith('http')) {
                links.push(href);
              }
            }
          }
        });

        return links;
      }, config.repCardSelector, config.repLinkSelector, this.config.baseUrl);

      return [...new Set(urls)]; // Deduplicate
    } catch {
      return [];
    }
  }

  private async scrapeProfile(page: Page, url: string, city: string, state: string): Promise<void> {
    console.log(`    Visiting: ${url.substring(0, 50)}...`);

    const navigated = await this.navigate(page, url);
    if (!navigated) return;

    await this.scrollToLoad(page, 2);

    const content = await getPageContent(page);

    // Extract info
    const emails = extractEmails(content, url);
    const phones = extractPhones(content);
    const socialLinks = extractSocialLinks(content);

    // Get name
    const { firstName, lastName } = await this.extractNameFromProfile(page);

    // Get website link if available
    const website = await this.getAttribute(page, 'a[href*="website"], a[rel="external"]', 'href');

    if (emails.length === 0 && !firstName) {
      console.log(`      No data found`);
      return;
    }

    this.addRep({
      firstName,
      lastName,
      email: emails.length > 0 ? emails[0].email : null,
      phone: phones.length > 0 ? phones[0] : null,
      city,
      state,
      profileUrl: url,
      personalWebsite: website,
      socialLinks,
    });

    if (emails.length > 0) {
      console.log(`      Found: ${firstName} ${lastName} - ${emails[0].email}`);
    }
  }

  private async extractNameFromProfile(page: Page): Promise<{ firstName: string; lastName: string }> {
    // Try common name patterns
    const nameSelectors = [
      'h1',
      '.consultant-name',
      '.profile-name',
      '.rep-name',
      '[class*="name"]',
      'h2',
    ];

    for (const selector of nameSelectors) {
      const text = await this.getTextContent(page, selector);
      if (text && text.length > 2 && text.length < 50) {
        const cleaned = text
          .replace(/independent (beauty )?consultant/i, '')
          .replace(/consultant/i, '')
          .replace(this.config.name, '')
          .trim();

        const parts = cleaned.split(/\s+/).filter(p => p.length > 1);
        if (parts.length >= 2) {
          return {
            firstName: this.capitalize(parts[0]),
            lastName: this.capitalize(parts.slice(1).join(' ')),
          };
        } else if (parts.length === 1 && parts[0].length > 2) {
          return { firstName: this.capitalize(parts[0]), lastName: '' };
        }
      }
    }

    return { firstName: '', lastName: '' };
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
