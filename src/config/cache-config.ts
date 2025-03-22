// Cache configuration for optimizing application performance

export const CACHE_CONFIG = {
  // Browser caching duration for static assets
  staticAssetsDuration: 60 * 60 * 24 * 30, // 30 days

  // API response caching duration
  apiResponseDuration: 60 * 5, // 5 minutes

  // Maximum number of cached items per category
  maxItems: {
    api: 100,
    assets: 200,
    generated: 50,
    aiModels: 20
  },

  // Cache version for cache busting
  version: '1.0.1',

  // Cache key prefix
  keyPrefix: 'optiscoop:',

  // Cache strategies
  strategies: {
    // Strategy for API responses
    api: {
      networkFirst: true, // Try network first, fall back to cache
      maxAge: 60 * 5, // 5 minutes
    },
    
    // Strategy for static assets
    assets: {
      cacheFirst: true, // Try cache first, fall back to network
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },

    // Strategy for generated content
    generated: {
      staleWhileRevalidate: true, // Serve stale content while fetching new
      maxAge: 60 * 60, // 1 hour
      revalidateOnError: true
    },

    // Strategy for AI model responses
    aiModels: {
      networkFirst: true,
      maxAge: 60 * 30, // 30 minutes
      revalidateOnError: true,
      errorRetryCount: 3,
      errorRetryDelay: 1000 // 1 second delay between retries
    }
  }
};

// Cache helper functions
export const getCacheKey = (key: string): string => {
  return `${CACHE_CONFIG.keyPrefix}${key}`;
};

export const getCacheVersion = (): string => {
  return CACHE_CONFIG.version;
};