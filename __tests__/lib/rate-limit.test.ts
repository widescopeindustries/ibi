import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset rate limit store between tests by using unique identifiers
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('checkRateLimit', () => {
    it('should allow requests within the limit', () => {
      const identifier = `test-${Date.now()}`;
      const config = { maxRequests: 5, windowMs: 60000 };

      const result = checkRateLimit(identifier, config);

      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should track remaining requests correctly', () => {
      const identifier = `test-track-${Date.now()}`;
      const config = { maxRequests: 3, windowMs: 60000 };

      const result1 = checkRateLimit(identifier, config);
      expect(result1.remaining).toBe(2);

      const result2 = checkRateLimit(identifier, config);
      expect(result2.remaining).toBe(1);

      const result3 = checkRateLimit(identifier, config);
      expect(result3.remaining).toBe(0);
    });

    it('should block requests when limit is exceeded', () => {
      const identifier = `test-block-${Date.now()}`;
      const config = { maxRequests: 2, windowMs: 60000 };

      checkRateLimit(identifier, config);
      checkRateLimit(identifier, config);
      const result = checkRateLimit(identifier, config);

      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfterMs).toBeDefined();
    });

    it('should reset after window expires', () => {
      const identifier = `test-reset-${Date.now()}`;
      const config = { maxRequests: 1, windowMs: 1000 };

      const result1 = checkRateLimit(identifier, config);
      expect(result1.success).toBe(true);

      const result2 = checkRateLimit(identifier, config);
      expect(result2.success).toBe(false);

      // Advance time past the window
      jest.advanceTimersByTime(1001);

      const result3 = checkRateLimit(identifier, config);
      expect(result3.success).toBe(true);
    });
  });

  describe('getClientIdentifier', () => {
    // Helper to create a mock request with headers
    const createMockRequest = (headers: Record<string, string | null> = {}) => ({
      headers: {
        get: (name: string) => headers[name.toLowerCase()] ?? null,
      },
    } as unknown as Request);

    it('should return x-forwarded-for header when present', () => {
      const request = createMockRequest({
        'x-forwarded-for': '192.168.1.1, 10.0.0.1',
      });

      const identifier = getClientIdentifier(request);

      expect(identifier).toBe('192.168.1.1');
    });

    it('should return x-real-ip when x-forwarded-for is not present', () => {
      const request = createMockRequest({
        'x-real-ip': '192.168.1.2',
      });

      const identifier = getClientIdentifier(request);

      expect(identifier).toBe('192.168.1.2');
    });

    it('should return fallback when no headers are present', () => {
      const request = createMockRequest();

      const identifier = getClientIdentifier(request);

      expect(identifier).toBe('unknown-client');
    });
  });

  describe('RATE_LIMITS presets', () => {
    it('should have correct email rate limit configuration', () => {
      expect(RATE_LIMITS.email.maxRequests).toBe(10);
      expect(RATE_LIMITS.email.windowMs).toBe(60000);
    });

    it('should have correct auth rate limit configuration', () => {
      expect(RATE_LIMITS.auth.maxRequests).toBe(5);
      expect(RATE_LIMITS.auth.windowMs).toBe(60000);
    });

    it('should have correct api rate limit configuration', () => {
      expect(RATE_LIMITS.api.maxRequests).toBe(100);
      expect(RATE_LIMITS.api.windowMs).toBe(60000);
    });

    it('should have correct strict rate limit configuration', () => {
      expect(RATE_LIMITS.strict.maxRequests).toBe(3);
      expect(RATE_LIMITS.strict.windowMs).toBe(60000);
    });
  });
});
