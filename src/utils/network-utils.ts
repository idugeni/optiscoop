/**
 * Shared network utilities for API requests
 * 
 * This module provides common network-related functionality that can be used
 * across different services in the application to ensure consistent behavior
 * and avoid code duplication.
 */

/**
 * Interface for fetch options with retry configuration and rate limiting
 */
interface FetchOptions extends RequestInit {
  retryConfig?: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
  };
  rateLimitConfig?: {
    maxRequests?: number;
    timeWindow?: number;
  };
}

/**
 * Circuit breaker states
 */
enum CircuitState {
  CLOSED,
  OPEN,
  HALF_OPEN
}

/**
 * Circuit breaker configuration
 */
interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
}

/**
 * Circuit breaker instance
 */
class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private readonly config: CircuitBreakerConfig = {
    failureThreshold: 5,
    resetTimeout: 60000
  };

  constructor(config?: Partial<CircuitBreakerConfig>) {
    this.config = { ...this.config, ...config };
  }

  public canRequest(): boolean {
    if (this.state === CircuitState.CLOSED) return true;
    if (this.state === CircuitState.OPEN) {
      const now = Date.now();
      if (now - this.lastFailureTime >= this.config.resetTimeout) {
        this.state = CircuitState.HALF_OPEN;
        return true;
      }
      return false;
    }
    return true;
  }

  public recordSuccess(): void {
    this.failures = 0;
    this.state = CircuitState.CLOSED;
  }

  public recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }
}

/**
 * Rate limiter instance
 */
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests: number = 50, timeWindow: number = 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  public canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.requests.length < this.maxRequests;
  }

  public recordRequest(): void {
    this.requests.push(Date.now());
  }
}

/**
 * Default configurations
 */
const DEFAULT_RETRY_CONFIG = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000
};

const DEFAULT_RATE_LIMIT_CONFIG = {
  maxRequests: 50,
  timeWindow: 1000
};

const circuitBreaker = new CircuitBreaker();
let rateLimiter = new RateLimiter();

/**
 * Helper function to delay execution
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay
 */
const calculateBackoff = (attempt: number, baseDelay: number, maxDelay: number): number => {
  const delay = Math.min(
    baseDelay * Math.pow(2, attempt),
    maxDelay
  );
  return delay + (Math.random() * 100); // Add jitter
};

/**
 * Enhanced fetch with timeout and retry capabilities
 * @param url - API endpoint URL
 * @param options - Extended fetch options including retry configuration
 * @param timeout - Timeout in milliseconds
 * @returns Promise with fetch response
 * @throws Error if all retry attempts fail
 */
export const fetchWithTimeout = async (
  url: string,
  options: FetchOptions = {},
  timeout: number
): Promise<Response> => {
  const {
    retryConfig = DEFAULT_RETRY_CONFIG,
    rateLimitConfig = DEFAULT_RATE_LIMIT_CONFIG,
    ...fetchOptions
  } = options;

  const { maxAttempts, baseDelay, maxDelay } = {
    ...DEFAULT_RETRY_CONFIG,
    ...retryConfig
  };

  // Configure rate limiter with provided config
  rateLimiter = new RateLimiter(
    rateLimitConfig.maxRequests,
    rateLimitConfig.timeWindow
  );

  if (!circuitBreaker.canRequest()) {
    throw new Error('Circuit breaker is open - too many recent failures');
  }

  if (!rateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded - too many requests');
  }

  let lastError: Error = new Error('No attempts made yet');
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const enhancedOptions = {
        ...fetchOptions,
        signal: controller.signal
      };
      
      const response = await fetch(url, enhancedOptions);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      circuitBreaker.recordSuccess();
      rateLimiter.recordRequest();
      return response;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        lastError = error;
        circuitBreaker.recordFailure();
        
        const isTimeoutError = error.name === 'AbortError';
        const isNetworkError = error instanceof TypeError && error.message.includes('network');
        const errorMessage = isTimeoutError
          ? `Request timed out after ${timeout/1000} seconds`
          : isNetworkError
          ? 'Network connectivity issue detected'
          : error.message;
        
        // Enhanced error logging with more context
        console.warn(
          `Request attempt ${attempt + 1}/${maxAttempts} failed:`,
          {
            url,
            errorType: isTimeoutError ? 'Timeout' : isNetworkError ? 'Network' : 'API',
            message: errorMessage,
            timestamp: new Date().toISOString(),
            retryAttempt: attempt + 1,
            maxAttempts
          }
        );
      } else {
        lastError = new Error('An unknown error occurred');
        console.warn(
          `Request attempt ${attempt + 1}/${maxAttempts} failed with an unknown error`
        );
      }
      
      if (attempt < maxAttempts - 1) {
        const backoffDelay = calculateBackoff(attempt, baseDelay, maxDelay);
        console.log(`Retrying in ${Math.round(backoffDelay/1000)} seconds...`);
        await wait(backoffDelay);
      }
    }
  }
  
  throw lastError;
}