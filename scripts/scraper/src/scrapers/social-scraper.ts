// Social Media based scraper - finds reps through public social profiles
// Scrapes public Facebook pages, Instagram bios, etc.

import { Page } from 'puppeteer';
import { CompanyConfig, ScraperResult } from '../types.js';
import { BaseScraper, MAJOR_CITIES } from './base-scraper.js';
import {
  randomDelay,
  extractEmails,
  extractPhones,
  getPageContent
} from '../utils/index.js';

export class SocialScraper extends BaseScraper {
  constructor(config: CompanyConfig) {
    super(config);
  }

  async scrape(options?: {
    maxReps?: number;
    states?: string[];
    testMode?: boolean;
  }): Promise<ScraperResult> {
    const maxReps = options?.maxReps || 50;
    const testMode = options?.testMode || false;

    console.log(`\n  [${this.config.name}] Starting social media scrape...`);
    console.log(`  Target: ${maxReps} reps`);

    this.startTimer();

    try {
      await this.initBrowser();
      const page = await this.newPage();

      // Search for reps on various platforms
      const cities = testMode ? MAJOR_CITIES.slice(0, 2) : MAJOR_CITIES.slice(0, 8);

      for (const { city, state } of cities) {
        if (this.reps.length >= maxReps) break;

        // Search Facebook pages
        await this.searchFacebookPages(page, city, state);
        await randomDelay(3000, 5000);

        // Search using Bing (allows social media results)
        await this.searchBing(page, city, state);
        await randomDelay(3000, 5000);
      }

      await this.cleanup();
      const result = this.createResult(true);
      console.log(`  [${this.config.name}] Complete: ${result.repsFound} reps, ${result.emailsFound} emails`);
      return result;

    } catch (error) {
      this.logError(`Social scraper failed: ${error}`);
      await this.cleanup();
      return this.createResult(false);
    }
  }

  private async searchFacebookPages(page: Page, city: string, state: string): Promise<void> {
    console.log(`  Searching Facebook for ${city}, ${state}...`);

    // Use Bing to find Facebook business pages
    const query = `site:facebook.com "${this.config.name}" consultant ${city} ${state}`;
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://www.bing.com/search?q=${encodedQuery}`;

    try {
      const navigated = await this.navigate(page, searchUrl);
      if (!navigated) return;

      await randomDelay(2000, 3000);

      // Get Facebook page links
      const fbLinks = await page.evaluate(() => {
        const results = Array.from(document.querySelectorAll('a[href*="facebook.com"]'));
        return results
          .map(a => a.getAttribute('href'))
          .filter((href): href is string =>
            href !== null &&
            href.includes('facebook.com') &&
            !href.includes('/login') &&
            !href.includes('/help')
          );
      });

      console.log(`    Found ${fbLinks.length} Facebook pages`);

      // Visit each page (limit to avoid rate limiting)
      for (const link of fbLinks.slice(0, 3)) {
        try {
          await this.scrapeFacebookPage(page, link, city, state);
        } catch (err) {
          // Skip failed pages
        }
        await randomDelay(2000, 4000);
      }

    } catch (err) {
      this.logError(`Facebook search failed: ${err}`);
    }
  }

  private async scrapeFacebookPage(page: Page, url: string, city: string, state: string): Promise<void> {
    console.log(`    Scraping FB: ${url.substring(0, 50)}...`);

    // Clean up the URL (remove Bing tracking)
    const cleanUrl = this.cleanBingUrl(url);
    if (!cleanUrl.includes('facebook.com')) return;

    const navigated = await this.navigate(page, cleanUrl);
    if (!navigated) return;

    await randomDelay(2000, 3000);

    const content = await getPageContent(page);

    // Facebook pages often have email in the About section
    const emails = extractEmails(content, url);
    const phones = extractPhones(content);

    if (emails.length === 0) {
      console.log(`      No email found`);
      return;
    }

    // Try to extract name from page title
    const title = await page.title();
    const { firstName, lastName } = this.parseNameFromTitle(title);

    this.addRep({
      firstName,
      lastName,
      email: emails[0].email,
      phone: phones.length > 0 ? phones[0] : null,
      city,
      state,
      profileUrl: cleanUrl,
      socialLinks: { facebook: cleanUrl },
    });

    console.log(`      Found: ${firstName} ${lastName} - ${emails[0].email}`);
  }

  private async searchBing(page: Page, city: string, state: string): Promise<void> {
    console.log(`  Bing search for ${city}, ${state}...`);

    const queries = [
      `"${this.config.name}" independent consultant ${city} ${state} email`,
      `"${this.config.name}" sales rep ${city} ${state} contact`,
    ];

    for (const query of queries) {
      if (this.reps.length >= 50) break;

      const encodedQuery = encodeURIComponent(query);
      const searchUrl = `https://www.bing.com/search?q=${encodedQuery}`;

      try {
        const navigated = await this.navigate(page, searchUrl);
        if (!navigated) continue;

        await randomDelay(2000, 3000);

        // Get result links
        const links = await page.evaluate(() => {
          const results = Array.from(document.querySelectorAll('.b_algo a'));
          return results
            .map(a => a.getAttribute('href'))
            .filter((href): href is string =>
              href !== null &&
              href.startsWith('http') &&
              !href.includes('bing.com') &&
              !href.includes('microsoft.com')
            );
        });

        // Visit promising links
        for (const link of links.slice(0, 3)) {
          try {
            await this.scrapeGenericPage(page, link, city, state);
          } catch {
            // Skip
          }
          await randomDelay(1500, 3000);
        }

      } catch (err) {
        this.logError(`Bing search failed: ${err}`);
      }

      await randomDelay(2000, 4000);
    }
  }

  private async scrapeGenericPage(page: Page, url: string, city: string, state: string): Promise<void> {
    const cleanUrl = this.cleanBingUrl(url);
    console.log(`    Checking: ${cleanUrl.substring(0, 50)}...`);

    const navigated = await this.navigate(page, cleanUrl);
    if (!navigated) return;

    await this.scrollToLoad(page, 2);

    const content = await getPageContent(page);
    const emails = extractEmails(content, url);

    if (emails.length === 0) return;

    const phones = extractPhones(content);
    const title = await page.title();
    const { firstName, lastName } = this.parseNameFromTitle(title);

    this.addRep({
      firstName,
      lastName,
      email: emails[0].email,
      phone: phones.length > 0 ? phones[0] : null,
      city,
      state,
      profileUrl: cleanUrl,
      personalWebsite: cleanUrl,
      socialLinks: {},
    });

    console.log(`      Found: ${firstName} ${lastName} - ${emails[0].email}`);
  }

  private cleanBingUrl(url: string): string {
    // Remove Bing's tracking redirect
    if (url.includes('bing.com/ck')) {
      const match = url.match(/u=a1([^&]+)/);
      if (match) {
        try {
          return decodeURIComponent(match[1]);
        } catch {
          return url;
        }
      }
    }
    return url;
  }

  private parseNameFromTitle(title: string): { firstName: string; lastName: string } {
    // Remove common suffixes and the company name
    const cleaned = title
      .replace(/\s*[-|–]\s*.*/g, '') // Remove everything after dash
      .replace(/facebook/i, '')
      .replace(this.config.name, '')
      .replace(/independent (beauty )?consultant/i, '')
      .replace(/consultant/i, '')
      .replace(/\'s?\s*(page|website|site)?/i, '')
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

    return { firstName: 'Unknown', lastName: '' };
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
