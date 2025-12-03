# IBI Sales Rep Email Scraper

A comprehensive web scraping agent to find direct sales representative emails from major direct sales companies for IBI outreach.

## Overview

This scraper is designed to help build IBI's database of direct sales representatives by finding their public contact information. It uses multiple scraping strategies:

1. **Locator Scraping** - Scrapes company "Find a Consultant" pages
2. **Search Scraping** - Uses DuckDuckGo to find consultant websites
3. **Social Scraping** - Finds public Facebook business pages and other social profiles

## Supported Companies

The scraper supports **45+ direct sales companies** across categories:

- **Beauty & Cosmetics**: Mary Kay, Avon, Rodan + Fields, Younique, Arbonne, Nu Skin, Beautycounter, Monat, Color Street, LimeLife
- **Wellness & Essential Oils**: Young Living, doTERRA, Herbalife, Plexus, Isagenix, Optavia, Juice Plus+, Shaklee, USANA
- **Home & Kitchen**: Pampered Chef, Tupperware, Norwex, Thirty-One Gifts
- **Home Fragrance**: Scentsy, PartyLite, Gold Canyon, Pink Zebra
- **Fashion & Jewelry**: Stella & Dot, Paparazzi, Premier Designs, Origami Owl, cabi, LuLaRoe
- **Other**: Amway, Primerica, Beachbody, and more

Use `--list` to see all available companies.

## Installation

```bash
# Navigate to the scraper directory
cd scripts/scraper

# Install dependencies
npm install
```

## Usage

### Basic Usage

```bash
# Run full scrape of all companies
npm run scrape

# Test mode (limited scraping, good for testing)
npm run scrape -- --test

# Scrape a specific company
npm run scrape -- --company scentsy

# Scrape multiple companies
npm run scrape -- --companies "scentsy,mary-kay,tupperware"
```

### Advanced Options

```bash
# Limit reps per company
npm run scrape -- --max-reps 50

# Only search specific states
npm run scrape -- --states "CA,TX,FL,NY"

# Custom output directory
npm run scrape -- --output ./my-output

# Output format
npm run scrape -- --format json    # JSON only
npm run scrape -- --format csv     # CSV only
npm run scrape -- --format both    # Both (default)

# List all available companies
npm run scrape -- --list

# Show help
npm run scrape -- --help
```

### Example Workflows

```bash
# Quick test to verify setup
npm run scrape -- --test

# Focus on beauty companies
npm run scrape -- --companies "mary-kay,avon,younique,arbonne" --max-reps 50

# Scrape essential oils companies
npm run scrape -- --companies "young-living,doterra" --states "CA,TX,FL"

# Full production run
npm run scrape -- --max-reps 100
```

## Output

Results are saved to the `output/` directory:

| File | Description |
|------|-------------|
| `sales-reps-TIMESTAMP.json` | Complete data in JSON format |
| `sales-reps-TIMESTAMP.csv` | Full data in CSV format |
| `sales-reps-TIMESTAMP-emails.csv` | Simple email list for import |
| `sales-reps-latest.json/csv` | Most recent scrape (overwritten) |
| `report-TIMESTAMP.md` | Summary report |

### Data Fields

Each scraped rep includes:

```json
{
  "id": "unique-id",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "company": "Mary Kay",
  "city": "Dallas",
  "state": "TX",
  "zipCode": "75001",
  "profileUrl": "https://...",
  "personalWebsite": "https://...",
  "socialLinks": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/..."
  },
  "scrapedAt": "2024-01-15T10:30:00.000Z",
  "source": "https://marykay.com"
}
```

## How It Works

### 1. Locator Scraping

For companies with "Find a Consultant" pages, the scraper:
- Navigates to the locator page
- Searches for consultants in major US cities
- Extracts profile URLs from results
- Visits each profile to extract contact info

### 2. Search Scraping

Uses web search engines to find consultant websites:
- Searches DuckDuckGo for company-specific consultant pages
- Filters results for personal websites
- Extracts emails, phones, and social links from pages

### 3. Social Scraping

Finds public social media profiles:
- Searches Bing for Facebook business pages
- Extracts public contact info from pages

## Rate Limiting

The scraper respects websites by:
- Limiting requests to 10/minute per site
- Adding random delays between requests
- Using realistic browser headers
- Rotating user agents

## Best Practices

1. **Start with --test mode** to verify the scraper works
2. **Focus on a few companies** at first before running full scrapes
3. **Use --states** to target specific geographic areas
4. **Review output** before using for outreach
5. **Respect robots.txt** and terms of service

## Troubleshooting

### Puppeteer Installation Issues

```bash
# On Linux, you may need:
sudo apt-get install -y chromium-browser

# Set the executable path
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

### Low Email Counts

Some companies have strong anti-scraping measures. Try:
- Running at different times
- Using fewer concurrent requests
- Focusing on companies with better locator pages

### Timeout Errors

Increase timeouts or reduce the number of companies being scraped simultaneously.

## Legal Considerations

This scraper is designed to:
- Only collect publicly available information
- Respect rate limits and server resources
- Be used for legitimate business outreach

Users are responsible for:
- Complying with CAN-SPAM and other email laws
- Respecting opt-out requests
- Following each company's terms of service

## Contributing

To add a new company:

1. Add the company config to `src/companies.ts`
2. If needed, add company-specific selectors to `src/scrapers/locator-scraper.ts`
3. Test with `npm run scrape -- --company your-company --test`

## Project Structure

```
scripts/scraper/
├── package.json
├── tsconfig.json
├── README.md
├── output/              # Generated output files
└── src/
    ├── index.ts         # Main entry point
    ├── types.ts         # TypeScript interfaces
    ├── companies.ts     # Company configurations
    ├── scrapers/
    │   ├── index.ts
    │   ├── base-scraper.ts        # Base scraper class
    │   ├── locator-scraper.ts     # Company locator pages
    │   ├── google-search-scraper.ts  # Search-based scraping
    │   └── social-scraper.ts      # Social media scraping
    └── utils/
        ├── index.ts
        ├── browser.ts         # Puppeteer setup
        ├── email-extractor.ts # Email parsing
        ├── rate-limiter.ts    # Rate limiting
        └── storage.ts         # Data storage
```

## License

Internal use only - IBI Sales Rep Directory
