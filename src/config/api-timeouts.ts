/**
 * Configuration file for API timeout settings
 * 
 * This file centralizes timeout configuration for API calls to prevent timeout issues
 * and make timeout values easily configurable across the application.
 */

// Default timeout values in milliseconds
export const DEFAULT_TIMEOUTS = {
  // Standard timeout for title generation (90 seconds)
  // Increased from 60s to provide more buffer for complex requests
  TITLE_GENERATION: 90000,
  
  // Standard timeout for news article generation (120 seconds)
  // Longer timeout as news generation is more complex and requires more tokens
  NEWS_GENERATION: 120000,
  
  // Shorter timeout for simpler API calls
  STANDARD_API_CALL: 30000,
};

/**
 * Recommended timeout values based on model complexity
 * Different models may require different timeout values
 */
export const MODEL_SPECIFIC_TIMEOUTS: Record<string, number> = {
  // Experimental models may need longer timeouts
  'gemini-2.0-pro-exp-02-05': 150000,      // 150 seconds
  'gemini-2.0-flash-thinking-exp-01-21': 120000, // 120 seconds
  
  // Standard models can use shorter timeouts
  'gemini-1.5-pro': 90000,                 // 90 seconds
  'gemini-1.5-flash': 60000,               // 60 seconds
  'gemini-1.5-flash-8b': 45000,            // 45 seconds
};

/**
 * Get the recommended timeout for a specific model
 * Falls back to the default timeout if no specific timeout is defined for the model
 * 
 * @param modelId - The ID of the model being used
 * @param operationType - The type of operation (title or news generation)
 * @returns The recommended timeout in milliseconds
 */
export const getRecommendedTimeout = (
  modelId: string,
  operationType: 'TITLE_GENERATION' | 'NEWS_GENERATION' | 'STANDARD_API_CALL'
): number => {
  // First check if there's a model-specific timeout
  const modelSpecificTimeout = MODEL_SPECIFIC_TIMEOUTS[modelId];
  if (modelSpecificTimeout) {
    return modelSpecificTimeout;
  }
  
  // Otherwise return the default timeout for the operation type
  return DEFAULT_TIMEOUTS[operationType];
};

/**
 * Tips for handling timeout issues:
 * 
 * 1. Increase the timeout value for complex requests or slower models
 * 2. Implement progressive loading UI to show users that processing is happening
 * 3. Consider breaking down large requests into smaller chunks
 * 4. Implement retry logic with exponential backoff (already implemented in the services)
 * 5. Monitor API response times to adjust timeout values accordingly
 * 6. Consider using a more lightweight model for faster responses when appropriate
 */