// Rate limiter utility for respectful scraping

export class RateLimiter {
  private requestTimes: number[] = [];
  private readonly requestsPerMinute: number;
  private readonly minDelayMs: number;

  constructor(requestsPerMinute: number = 10) {
    this.requestsPerMinute = requestsPerMinute;
    this.minDelayMs = (60 * 1000) / requestsPerMinute;
  }

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Remove old request times
    this.requestTimes = this.requestTimes.filter(t => t > oneMinuteAgo);

    if (this.requestTimes.length >= this.requestsPerMinute) {
      // Calculate wait time until the oldest request expires
      const oldestRequest = this.requestTimes[0];
      const waitTime = oldestRequest + 60000 - now + 100; // +100ms buffer
      await this.delay(waitTime);
    } else if (this.requestTimes.length > 0) {
      // Ensure minimum delay between requests
      const lastRequest = this.requestTimes[this.requestTimes.length - 1];
      const timeSinceLastRequest = now - lastRequest;
      if (timeSinceLastRequest < this.minDelayMs) {
        await this.delay(this.minDelayMs - timeSinceLastRequest);
      }
    }

    this.requestTimes.push(Date.now());
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getRemainingRequests(): number {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    this.requestTimes = this.requestTimes.filter(t => t > oneMinuteAgo);
    return Math.max(0, this.requestsPerMinute - this.requestTimes.length);
  }
}

// Add random delay to avoid detection patterns
export function randomDelay(minMs: number = 1000, maxMs: number = 3000): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Exponential backoff for retries
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        console.log(`  Retry ${attempt + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
