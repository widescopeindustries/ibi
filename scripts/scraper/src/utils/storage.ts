// Data storage and export utilities

import fs from 'fs';
import path from 'path';
import { SalesRep, ScraperResult } from '../types.js';

const DEFAULT_OUTPUT_DIR = './output';

export function ensureOutputDir(outputDir: string = DEFAULT_OUTPUT_DIR): string {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

// Save results as JSON
export function saveAsJson(
  data: SalesRep[] | ScraperResult[],
  filename: string,
  outputDir: string = DEFAULT_OUTPUT_DIR
): string {
  ensureOutputDir(outputDir);
  const filepath = path.join(outputDir, `${filename}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`  Saved JSON: ${filepath}`);
  return filepath;
}

// Save results as CSV
export function saveAsCsv(
  data: SalesRep[],
  filename: string,
  outputDir: string = DEFAULT_OUTPUT_DIR
): string {
  ensureOutputDir(outputDir);
  const filepath = path.join(outputDir, `${filename}.csv`);

  const headers = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'company',
    'city',
    'state',
    'zipCode',
    'profileUrl',
    'personalWebsite',
    'facebook',
    'instagram',
    'linkedin',
    'twitter',
    'scrapedAt',
    'source'
  ];

  const rows = data.map(rep => [
    escapeCsvField(rep.id),
    escapeCsvField(rep.firstName),
    escapeCsvField(rep.lastName),
    escapeCsvField(rep.email || ''),
    escapeCsvField(rep.phone || ''),
    escapeCsvField(rep.company),
    escapeCsvField(rep.city || ''),
    escapeCsvField(rep.state || ''),
    escapeCsvField(rep.zipCode || ''),
    escapeCsvField(rep.profileUrl || ''),
    escapeCsvField(rep.personalWebsite || ''),
    escapeCsvField(rep.socialLinks.facebook || ''),
    escapeCsvField(rep.socialLinks.instagram || ''),
    escapeCsvField(rep.socialLinks.linkedin || ''),
    escapeCsvField(rep.socialLinks.twitter || ''),
    escapeCsvField(rep.scrapedAt),
    escapeCsvField(rep.source)
  ].join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync(filepath, csv);
  console.log(`  Saved CSV: ${filepath}`);
  return filepath;
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

// Load existing data (for incremental scraping)
export function loadExistingData(filename: string, outputDir: string = DEFAULT_OUTPUT_DIR): SalesRep[] {
  const filepath = path.join(outputDir, `${filename}.json`);
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  }
  return [];
}

// Merge new reps with existing, avoiding duplicates
export function mergeReps(existing: SalesRep[], newReps: SalesRep[]): SalesRep[] {
  const emailSet = new Set(existing.map(r => r.email?.toLowerCase()).filter(Boolean));
  const idSet = new Set(existing.map(r => r.id));

  const merged = [...existing];

  for (const rep of newReps) {
    // Skip if we already have this email
    if (rep.email && emailSet.has(rep.email.toLowerCase())) {
      continue;
    }
    // Skip if we already have this ID
    if (idSet.has(rep.id)) {
      continue;
    }

    merged.push(rep);
    if (rep.email) emailSet.add(rep.email.toLowerCase());
    idSet.add(rep.id);
  }

  return merged;
}

// Generate unique ID for rep
export function generateRepId(company: string, firstName: string, lastName: string): string {
  const slug = `${company}-${firstName}-${lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-${Date.now().toString(36)}`;
}

// Summary statistics
export function generateSummary(results: ScraperResult[]): {
  totalReps: number;
  totalEmails: number;
  byCompany: Record<string, { reps: number; emails: number }>;
  successRate: number;
  errors: string[];
} {
  const summary = {
    totalReps: 0,
    totalEmails: 0,
    byCompany: {} as Record<string, { reps: number; emails: number }>,
    successRate: 0,
    errors: [] as string[],
  };

  let successCount = 0;

  for (const result of results) {
    summary.totalReps += result.repsFound;
    summary.totalEmails += result.emailsFound;
    summary.byCompany[result.company] = {
      reps: result.repsFound,
      emails: result.emailsFound,
    };
    if (result.success) successCount++;
    summary.errors.push(...result.errors);
  }

  summary.successRate = results.length > 0 ? successCount / results.length : 0;

  return summary;
}

// Save summary report
export function saveSummaryReport(
  results: ScraperResult[],
  outputDir: string = DEFAULT_OUTPUT_DIR
): string {
  const summary = generateSummary(results);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const report = `
# IBI Sales Rep Scraper Report
Generated: ${new Date().toISOString()}

## Summary
- Total Representatives Found: ${summary.totalReps}
- Total Emails Collected: ${summary.totalEmails}
- Success Rate: ${(summary.successRate * 100).toFixed(1)}%

## Results by Company
${Object.entries(summary.byCompany)
  .sort((a, b) => b[1].emails - a[1].emails)
  .map(([company, stats]) => `- **${company}**: ${stats.reps} reps, ${stats.emails} emails`)
  .join('\n')}

## Errors
${summary.errors.length === 0 ? 'None' : summary.errors.map(e => `- ${e}`).join('\n')}
`;

  ensureOutputDir(outputDir);
  const filepath = path.join(outputDir, `report-${timestamp}.md`);
  fs.writeFileSync(filepath, report);
  console.log(`\n  Summary report saved: ${filepath}`);
  return filepath;
}

// Export emails only (for direct use)
export function exportEmailsOnly(
  reps: SalesRep[],
  filename: string,
  outputDir: string = DEFAULT_OUTPUT_DIR
): string {
  const emails = reps
    .filter(r => r.email)
    .map(r => ({
      email: r.email,
      name: `${r.firstName} ${r.lastName}`.trim(),
      company: r.company,
    }));

  ensureOutputDir(outputDir);
  const filepath = path.join(outputDir, `${filename}-emails.csv`);

  const csv = [
    'email,name,company',
    ...emails.map(e => `${e.email},"${e.name}",${e.company}`)
  ].join('\n');

  fs.writeFileSync(filepath, csv);
  console.log(`  Exported ${emails.length} emails to: ${filepath}`);
  return filepath;
}
