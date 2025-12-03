// Browser utilities for Puppeteer-based scraping

import puppeteer, { Browser, Page } from 'puppeteer';

// Rotating user agents for variety
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
];

let browserInstance: Browser | null = null;

export function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export async function createBrowser(): Promise<Browser> {
  if (browserInstance) {
    return browserInstance;
  }

  browserInstance = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-blink-features=AutomationControlled',
    ],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  return browserInstance;
}

export async function createPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();

  // Set random user agent
  await page.setUserAgent(getRandomUserAgent());

  // Set extra headers to appear more human
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
  });

  // Mask webdriver detection
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });

    // Mask chrome
    Object.defineProperty(window, 'chrome', {
      get: () => ({
        runtime: {},
      }),
    });

    // Mask plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });

    // Mask languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  });

  // Set reasonable timeout
  page.setDefaultTimeout(30000);

  return page;
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

// Helper to safely get text content
export async function getTextContent(page: Page, selector: string): Promise<string | null> {
  try {
    const element = await page.$(selector);
    if (!element) return null;

    const text = await page.evaluate(el => el.textContent, element);
    return text?.trim() || null;
  } catch {
    return null;
  }
}

// Helper to safely get attribute
export async function getAttribute(page: Page, selector: string, attribute: string): Promise<string | null> {
  try {
    const element = await page.$(selector);
    if (!element) return null;

    const value = await page.evaluate((el, attr) => el.getAttribute(attr), element, attribute);
    return value?.trim() || null;
  } catch {
    return null;
  }
}

// Helper to wait for navigation with timeout
export async function safeNavigate(page: Page, url: string, timeout: number = 30000): Promise<boolean> {
  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout,
    });
    return true;
  } catch (error) {
    console.error(`Navigation failed for ${url}:`, error);
    return false;
  }
}

// Helper to scroll page to load dynamic content
export async function scrollPage(page: Page, scrolls: number = 3, delayMs: number = 1000): Promise<void> {
  for (let i = 0; i < scrolls; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
}

// Get all links from page
export async function getAllLinks(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links
      .map(a => a.getAttribute('href'))
      .filter((href): href is string => href !== null);
  });
}

// Get page HTML content
export async function getPageContent(page: Page): Promise<string> {
  return page.content();
}
