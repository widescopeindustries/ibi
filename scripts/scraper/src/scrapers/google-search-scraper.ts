// Google Search based scraper - fallback method for finding rep emails
// This scrapes public consultant websites found via Google

import { Page } from 'puppeteer';
import { CompanyConfig, ScraperResult } from '../types.js';
import { BaseScraper, MAJOR_CITIES, US_STATES } from './base-scraper.js';
import {
  randomDelay,
  extractEmails,
  extractPhones,
  extractSocialLinks,
  getPageContent
} from '../utils/index.js';

export class GoogleSearchScraper extends BaseScraper {
  constructor(config: CompanyConfig) {
    super(config);
  }

  async scrape(options?: {
    maxReps?: number;
    states?: string[];
    testMode?: boolean;
  }): Promise<ScraperResult> {
    const maxReps = options?.maxReps || 100;
    const states = options?.states || US_STATES.slice(0, options?.testMode ? 2 : 10);
    const testMode = options?.testMode || false;

    console.log(`\n  [${this.config.name}] Starting Google search scrape...`);
    console.log(`  Target: ${maxReps} reps, States: ${states.join(', ')}`);

    this.startTimer();

    try {
      await this.initBrowser();
      const page = await this.newPage();

      // Search for consultant sites
      const searchQueries = this.buildSearchQueries(states, testMode);

      for (const query of searchQueries) {
        if (this.reps.length >= maxReps) break;

        console.log(`  Searching: "${query}"...`);

        try {
          // Navigate to DuckDuckGo (more scraping-friendly than Google)
          await this.searchDuckDuckGo(query, page);
          await randomDelay(2000, 4000);

          // Get consultant website links from results
          const profileLinks = await this.extractSearchResults(page);
          console.log(`    Found ${profileLinks.length} potential profiles`);

          // Visit each profile to extract info
          for (const link of profileLinks.slice(0, 5)) { // Limit per search
            if (this.reps.length >= maxReps) break;

            try {
              await this.scrapeProfilePage(page, link);
            } catch (err) {
              this.logError(`Failed to scrape ${link}: ${err}`);
            }

            await randomDelay(1500, 3000);
          }
        } catch (err) {
          this.logError(`Search failed for "${query}": ${err}`);
        }

        await randomDelay(3000, 5000);
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

  private buildSearchQueries(states: string[], testMode: boolean): string[] {
    const queries: string[] = [];
    const companyName = this.config.name;
    const slug = this.config.slug;

    // Build various search queries
    const queryTemplates = [
      `"${companyName}" consultant email contact`,
      `"${companyName}" independent sales rep contact`,
      `"${companyName}" consultant site:.com email`,
      `"${companyName}" independent beauty consultant`,
      `${slug} consultant personal website`,
    ];

    // Add location-based queries for major cities
    const cities = testMode ? MAJOR_CITIES.slice(0, 3) : MAJOR_CITIES.slice(0, 10);

    for (const { city, state } of cities) {
      if (states.includes(state)) {
        queries.push(`"${companyName}" consultant ${city} ${state}`);
      }
    }

    // Add general queries
    queries.push(...queryTemplates);

    return queries;
  }

  private async searchDuckDuckGo(query: string, page: Page): Promise<void> {
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://duckduckgo.com/?q=${encodedQuery}&t=h_&ia=web`;

    await this.navigate(page, searchUrl);

    // Wait for results to load
    await this.waitForElement(page, '.results', 5000);
    await randomDelay(1000, 2000);
  }

  private async extractSearchResults(page: Page): Promise<string[]> {
    const links = await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll('a[data-testid="result-title-a"], .result__a, a.result__url'));
      return results
        .map(a => a.getAttribute('href'))
        .filter((href): href is string => {
          if (!href) return false;
          // Filter to actual websites, not search engine links
          return href.startsWith('http') &&
            !href.includes('duckduckgo.com') &&
            !href.includes('google.com') &&
            !href.includes('bing.com') &&
            !href.includes('facebook.com/login') &&
            !href.includes('instagram.com/accounts');
        });
    });

    // Also try to filter for personal consultant sites
    const consultantPatterns = [
      /\.my[a-z]+\.com/i,        // mymarykay.com, myscentsy.com, etc
      /consultant/i,
      /rep\//i,
      /independent/i,
      /personal/i,
    ];

    // Prioritize links that look like personal sites
    const prioritized = links.sort((a, b) => {
      const aMatch = consultantPatterns.some(p => p.test(a)) ? 1 : 0;
      const bMatch = consultantPatterns.some(p => p.test(b)) ? 1 : 0;
      return bMatch - aMatch;
    });

    return prioritized;
  }

  private async scrapeProfilePage(page: Page, url: string): Promise<void> {
    console.log(`    Scraping: ${url.substring(0, 60)}...`);

    try {
      const navigated = await this.navigate(page, url);
      if (!navigated) return;

      // Scroll to load all content
      await this.scrollToLoad(page, 2);

      const content = await getPageContent(page);

      // Extract emails
      const emails = extractEmails(content, url);
      if (emails.length === 0) {
        console.log(`      No emails found`);
        return;
      }

      // Extract other info
      const phones = extractPhones(content);
      const socialLinks = extractSocialLinks(content);

      // Try to extract name from page title or content
      const { firstName, lastName } = await this.extractName(page, content);

      // Try to extract location
      const location = await this.extractLocation(page, content);

      // Add the rep
      this.addRep({
        firstName,
        lastName,
        email: emails[0].email,
        phone: phones.length > 0 ? phones[0] : null,
        city: location.city,
        state: location.state,
        zipCode: location.zipCode,
        profileUrl: url,
        personalWebsite: url,
        socialLinks,
      });

      console.log(`      Found: ${firstName} ${lastName} - ${emails[0].email}`);

    } catch (err) {
      // Silently skip failed pages
    }
  }

  private async extractName(page: Page, content: string): Promise<{ firstName: string; lastName: string }> {
    // Try common name selectors
    const nameSelectors = [
      'h1',
      '.consultant-name',
      '.rep-name',
      '.profile-name',
      '[class*="name"]',
      'title',
    ];

    for (const selector of nameSelectors) {
      const text = await this.getTextContent(page, selector);
      if (text) {
        // Parse the name
        const cleaned = text
          .replace(/independent (beauty )?consultant/i, '')
          .replace(this.config.name, '')
          .replace(/['"]s?\s*(website|site|page)/i, '')
          .trim();

        const parts = cleaned.split(/\s+/).filter(p => p.length > 1 && p.length < 20);
        if (parts.length >= 2) {
          return {
            firstName: this.capitalize(parts[0]),
            lastName: this.capitalize(parts.slice(1).join(' ')),
          };
        } else if (parts.length === 1) {
          return { firstName: this.capitalize(parts[0]), lastName: '' };
        }
      }
    }

    // Try to extract from email
    const emails = extractEmails(content, '');
    if (emails.length > 0) {
      const localPart = emails[0].email.split('@')[0];
      const nameParts = localPart.split(/[._-]/).filter(p => p.length > 1);
      if (nameParts.length >= 2) {
        return {
          firstName: this.capitalize(nameParts[0]),
          lastName: this.capitalize(nameParts[1]),
        };
      }
    }

    return { firstName: 'Unknown', lastName: '' };
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private async extractLocation(
    page: Page,
    content: string
  ): Promise<{ city: string | null; state: string | null; zipCode: string | null }> {
    // Look for location patterns
    const statePattern = /\b([A-Z]{2})\s+(\d{5})\b/;
    const cityStatePattern = /\b([A-Za-z\s]+),\s*([A-Z]{2})\b/;

    const stateMatch = content.match(statePattern);
    if (stateMatch) {
      return {
        city: null,
        state: stateMatch[1],
        zipCode: stateMatch[2],
      };
    }

    const cityMatch = content.match(cityStatePattern);
    if (cityMatch) {
      return {
        city: cityMatch[1].trim(),
        state: cityMatch[2],
        zipCode: null,
      };
    }

    return { city: null, state: null, zipCode: null };
  }
}
