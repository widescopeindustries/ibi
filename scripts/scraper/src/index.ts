#!/usr/bin/env npx tsx
/**
 * IBI Sales Rep Email Scraper
 *
 * A comprehensive web scraping agent to find direct sales representative
 * emails for outreach purposes.
 *
 * Usage:
 *   npm run scrape                    # Run full scrape
 *   npm run scrape -- --test          # Test mode (limited)
 *   npm run scrape -- --company scentsy  # Single company
 *   npm run scrape -- --companies "scentsy,mary-kay"  # Multiple companies
 *   npm run scrape -- --max-reps 50   # Limit reps per company
 */

import { COMPANIES, getEnabledCompanies, getCompanyBySlug } from './companies.js';
import { scrapeWithMultipleMethods, createScraper } from './scrapers/index.js';
import { closeBrowser } from './utils/browser.js';
import {
  saveAsJson,
  saveAsCsv,
  mergeReps,
  loadExistingData,
  saveSummaryReport,
  exportEmailsOnly,
} from './utils/storage.js';
import { ScraperResult, SalesRep, ScraperOptions } from './types.js';

// Parse command line arguments
function parseArgs(): ScraperOptions {
  const args = process.argv.slice(2);
  const options: ScraperOptions = {
    companies: undefined,
    maxRepsPerCompany: 100,
    outputFormat: 'both',
    outputDir: './output',
    testMode: false,
    concurrency: 1,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--test':
        options.testMode = true;
        options.maxRepsPerCompany = 10;
        break;

      case '--company':
        if (args[i + 1]) {
          options.companies = [args[i + 1]];
          i++;
        }
        break;

      case '--companies':
        if (args[i + 1]) {
          options.companies = args[i + 1].split(',').map(c => c.trim());
          i++;
        }
        break;

      case '--max-reps':
        if (args[i + 1]) {
          options.maxRepsPerCompany = parseInt(args[i + 1], 10);
          i++;
        }
        break;

      case '--output':
        if (args[i + 1]) {
          options.outputDir = args[i + 1];
          i++;
        }
        break;

      case '--format':
        if (args[i + 1] === 'json' || args[i + 1] === 'csv' || args[i + 1] === 'both') {
          options.outputFormat = args[i + 1];
          i++;
        }
        break;

      case '--states':
        if (args[i + 1]) {
          options.states = args[i + 1].split(',').map(s => s.trim().toUpperCase());
          i++;
        }
        break;

      case '--help':
        printHelp();
        process.exit(0);

      case '--list':
        listCompanies();
        process.exit(0);
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
IBI Sales Rep Email Scraper
============================

A comprehensive web scraping agent to find direct sales representative
emails from major direct sales companies.

USAGE:
  npm run scrape [options]

OPTIONS:
  --test              Run in test mode (limited scraping)
  --company <slug>    Scrape only one company
  --companies <list>  Scrape multiple companies (comma-separated)
  --max-reps <n>      Maximum reps per company (default: 100)
  --output <dir>      Output directory (default: ./output)
  --format <type>     Output format: json, csv, or both (default: both)
  --states <list>     Only search in these states (comma-separated)
  --list              List all available companies
  --help              Show this help message

EXAMPLES:
  npm run scrape                              # Full scrape all companies
  npm run scrape -- --test                    # Test mode
  npm run scrape -- --company scentsy         # Single company
  npm run scrape -- --companies "scentsy,mary-kay,tupperware"
  npm run scrape -- --max-reps 50 --states "CA,TX,FL"

OUTPUT:
  Results are saved to the output directory as:
  - sales-reps-TIMESTAMP.json      (all data)
  - sales-reps-TIMESTAMP.csv       (spreadsheet format)
  - sales-reps-emails-TIMESTAMP.csv (email list only)
  - report-TIMESTAMP.md            (summary report)

NOTES:
  - Scraping is rate-limited to be respectful to websites
  - Use --test mode first to verify everything works
  - Results are deduplicated by email address
  - Run times vary based on number of companies and reps

For more information, see the README.md file.
`);
}

function listCompanies(): void {
  console.log('\nAvailable Direct Sales Companies:\n');
  console.log('=' .repeat(60));

  const categories = [...new Set(COMPANIES.map(c => c.category))];

  for (const category of categories) {
    console.log(`\n${category}:`);
    console.log('-'.repeat(40));

    const companiesInCategory = COMPANIES.filter(c => c.category === category);
    for (const company of companiesInCategory) {
      const status = company.enabled ? '✓' : '✗';
      const locator = company.repLocatorUrl ? '📍' : '';
      console.log(`  ${status} ${company.slug.padEnd(25)} ${locator} ${company.name}`);
    }
  }

  console.log('\n');
  console.log('Legend:');
  console.log('  ✓ = Enabled');
  console.log('  ✗ = Disabled');
  console.log('  📍 = Has Rep Locator URL');
  console.log(`\nTotal: ${COMPANIES.length} companies`);
}

async function main(): Promise<void> {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║           IBI Sales Rep Email Scraper                     ║
║                                                           ║
║   Finding direct sales representatives for IBI outreach   ║
╚═══════════════════════════════════════════════════════════╝
`);

  const options = parseArgs();
  const startTime = Date.now();

  // Determine which companies to scrape
  let companiesToScrape = getEnabledCompanies();

  if (options.companies && options.companies.length > 0) {
    companiesToScrape = options.companies
      .map(slug => getCompanyBySlug(slug))
      .filter((c): c is typeof companiesToScrape[0] => c !== undefined);

    if (companiesToScrape.length === 0) {
      console.error('Error: No valid companies found. Use --list to see available companies.');
      process.exit(1);
    }
  }

  // Test mode limits
  if (options.testMode) {
    console.log('🧪 Running in TEST MODE (limited scraping)\n');
    companiesToScrape = companiesToScrape.slice(0, 2);
  }

  console.log(`📋 Companies to scrape: ${companiesToScrape.length}`);
  console.log(`   ${companiesToScrape.map(c => c.name).join(', ')}`);
  console.log(`📊 Max reps per company: ${options.maxRepsPerCompany}`);
  console.log(`📁 Output directory: ${options.outputDir}`);
  console.log('');

  const results: ScraperResult[] = [];
  let allReps: SalesRep[] = [];

  // Load existing data for incremental scraping
  try {
    const existing = loadExistingData('sales-reps-latest', options.outputDir);
    if (existing.length > 0) {
      console.log(`📥 Loaded ${existing.length} existing reps\n`);
      allReps = existing;
    }
  } catch {
    // No existing data
  }

  // Scrape each company
  for (const company of companiesToScrape) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`🏢 Scraping: ${company.name} (${company.category})`);
    console.log(`${'─'.repeat(60)}`);

    try {
      const result = await scrapeWithMultipleMethods(company, {
        maxReps: options.maxRepsPerCompany,
        states: options.states,
        testMode: options.testMode,
      });

      results.push(result);

      // Merge new reps
      allReps = mergeReps(allReps, result.reps);

      console.log(`\n  ✅ ${result.company}: ${result.repsFound} reps, ${result.emailsFound} emails`);

    } catch (error) {
      console.error(`\n  ❌ Failed to scrape ${company.name}: ${error}`);
      results.push({
        company: company.name,
        success: false,
        repsFound: 0,
        emailsFound: 0,
        errors: [`${error}`],
        duration: 0,
        reps: [],
      });
    }
  }

  // Clean up browser
  await closeBrowser();

  // Generate timestamp for filenames
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

  // Save results
  console.log(`\n${'═'.repeat(60)}`);
  console.log('💾 Saving results...');
  console.log(`${'═'.repeat(60)}\n`);

  // Save JSON
  if (options.outputFormat === 'json' || options.outputFormat === 'both') {
    saveAsJson(allReps, `sales-reps-${timestamp}`, options.outputDir);
    saveAsJson(allReps, 'sales-reps-latest', options.outputDir);
  }

  // Save CSV
  if (options.outputFormat === 'csv' || options.outputFormat === 'both') {
    saveAsCsv(allReps, `sales-reps-${timestamp}`, options.outputDir);
    saveAsCsv(allReps, 'sales-reps-latest', options.outputDir);
  }

  // Export emails only
  exportEmailsOnly(allReps, `sales-reps-${timestamp}`, options.outputDir);

  // Save summary report
  saveSummaryReport(results, options.outputDir);

  // Print summary
  const duration = Math.round((Date.now() - startTime) / 1000);
  const totalEmails = allReps.filter(r => r.email).length;

  console.log(`\n${'═'.repeat(60)}`);
  console.log('📊 SCRAPING COMPLETE');
  console.log(`${'═'.repeat(60)}`);
  console.log(`\n  Total Representatives: ${allReps.length}`);
  console.log(`  Total Emails Found:    ${totalEmails}`);
  console.log(`  Duration:              ${Math.floor(duration / 60)}m ${duration % 60}s`);
  console.log(`  Output:                ${options.outputDir}/`);

  console.log('\n  Results by Company:');
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    console.log(`    ${status} ${result.company}: ${result.emailsFound} emails`);
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log('🎉 Done! Check the output directory for your results.');
  console.log(`${'═'.repeat(60)}\n`);
}

// Run the scraper
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
