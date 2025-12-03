// Email extraction utilities

import { EmailPattern } from '../types.js';

// Common email patterns to look for
const EMAIL_PATTERNS: EmailPattern[] = [
  // Standard email regex - high confidence
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    confidence: 'high'
  },
  // Email with spaces around @ (sometimes obfuscated)
  {
    pattern: /\b[A-Za-z0-9._%+-]+\s*@\s*[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    confidence: 'medium'
  },
  // Email with [at] or (at) obfuscation
  {
    pattern: /\b[A-Za-z0-9._%+-]+\s*[\[\(]at[\]\)]\s*[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
    confidence: 'medium'
  },
  // Email with [dot] obfuscation
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\s*[\[\(]dot[\]\)]\s*[A-Z|a-z]{2,}\b/gi,
    confidence: 'medium'
  }
];

// Common invalid email patterns to filter out
const INVALID_EMAIL_PATTERNS = [
  /^(noreply|no-reply|donotreply|support|info|admin|webmaster|contact|sales|help)@/i,
  /\.(png|jpg|jpeg|gif|svg|css|js)$/i,
  /@(example|test|localhost|sentry)\./i,
  /^[a-f0-9]{32,}@/i, // Hash-like addresses
];

// Company domains to exclude (we want personal emails, not company emails)
const COMPANY_DOMAINS_TO_EXCLUDE = [
  'marykay.com',
  'avon.com',
  'tupperware.com',
  'pamperedchef.com',
  'scentsy.com',
  'youngliving.com',
  'doterra.com',
  'herbalife.com',
  'amway.com',
  // Add more as needed
];

export interface ExtractedEmail {
  email: string;
  confidence: 'high' | 'medium' | 'low';
  source: string;
  context?: string;
}

export function extractEmails(text: string, source: string = 'unknown'): ExtractedEmail[] {
  const emails: ExtractedEmail[] = [];
  const seenEmails = new Set<string>();

  for (const { pattern, confidence } of EMAIL_PATTERNS) {
    const matches = text.match(pattern) || [];

    for (const match of matches) {
      // Clean up the email
      let email = match
        .toLowerCase()
        .trim()
        .replace(/\s*[\[\(]at[\]\)]\s*/gi, '@')
        .replace(/\s*[\[\(]dot[\]\)]\s*/gi, '.')
        .replace(/\s+/g, '');

      // Skip if already seen
      if (seenEmails.has(email)) continue;

      // Validate the email
      if (!isValidEmail(email)) continue;

      seenEmails.add(email);

      // Extract context (text around the email)
      const context = extractContext(text, match);

      emails.push({
        email,
        confidence,
        source,
        context
      });
    }
  }

  return emails;
}

export function isValidEmail(email: string): boolean {
  // Basic format check
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i;
  if (!emailRegex.test(email)) return false;

  // Check against invalid patterns
  for (const pattern of INVALID_EMAIL_PATTERNS) {
    if (pattern.test(email)) return false;
  }

  // Check for company domains (we prefer personal emails)
  const domain = email.split('@')[1];
  if (COMPANY_DOMAINS_TO_EXCLUDE.includes(domain)) {
    return false;
  }

  // Check for suspicious TLDs
  const suspiciousTLDs = ['.test', '.local', '.invalid', '.example'];
  if (suspiciousTLDs.some(tld => email.endsWith(tld))) {
    return false;
  }

  return true;
}

export function isPersonalEmail(email: string): boolean {
  const personalDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'me.com',
    'mail.com',
    'protonmail.com',
    'zoho.com',
    'ymail.com',
    'live.com',
    'msn.com',
    'comcast.net',
    'verizon.net',
    'att.net',
    'sbcglobal.net',
    'cox.net',
    'charter.net',
  ];

  const domain = email.split('@')[1];
  return personalDomains.includes(domain);
}

function extractContext(text: string, match: string): string {
  const index = text.indexOf(match);
  if (index === -1) return '';

  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + match.length + 50);

  let context = text.substring(start, end).trim();

  // Clean up the context
  context = context.replace(/\s+/g, ' ');

  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';

  return context;
}

// Extract phone numbers
export function extractPhones(text: string): string[] {
  const phonePatterns = [
    // US format: (xxx) xxx-xxxx or xxx-xxx-xxxx
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    // With country code
    /\+1[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ];

  const phones: string[] = [];
  const seen = new Set<string>();

  for (const pattern of phonePatterns) {
    const matches = text.match(pattern) || [];
    for (const match of matches) {
      const cleaned = match.replace(/[^\d]/g, '');
      // Only valid 10 or 11 digit US numbers
      if ((cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))) && !seen.has(cleaned)) {
        seen.add(cleaned);
        phones.push(formatPhone(cleaned));
      }
    }
  }

  return phones;
}

function formatPhone(digits: string): string {
  // Remove leading 1 if present
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.substring(1);
  }
  return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
}

// Extract social media links
export function extractSocialLinks(html: string): Record<string, string> {
  const socialPatterns: Record<string, RegExp> = {
    facebook: /https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi,
    instagram: /https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+/gi,
    linkedin: /https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9._-]+/gi,
    twitter: /https?:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+/gi,
    pinterest: /https?:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9._-]+/gi,
    youtube: /https?:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[a-zA-Z0-9._-]+/gi,
    tiktok: /https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._-]+/gi,
  };

  const links: Record<string, string> = {};

  for (const [platform, pattern] of Object.entries(socialPatterns)) {
    const matches = html.match(pattern);
    if (matches && matches.length > 0) {
      // Take the first match
      links[platform] = matches[0];
    }
  }

  return links;
}
