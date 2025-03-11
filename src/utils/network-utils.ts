/**
 * Shared network utilities for API requests
 * 
 * This module provides common network-related functionality that can be used
 * across different services in the application to ensure consistent behavior
 * and avoid code duplication.
 */

/**
 * Fetch with timeout to prevent hanging requests
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @param timeout - Timeout in milliseconds
 * @returns Promise with fetch response
 */
export const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  // Create an AbortController to be able to cancel the fetch request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  // Add the signal to the fetch options
  const enhancedOptions = {
    ...options,
    signal: controller.signal
  };
  
  return fetch(url, enhancedOptions)
    .then(response => {
      clearTimeout(timeoutId); // Clear the timeout if fetch completes successfully
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId); // Clear the timeout if fetch fails
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeout/1000} seconds`);
      }
      throw error; // Re-throw other errors
    });
};

/**
 * Implements exponential backoff for retrying failed API requests
 * @param fn - The async function to retry
 * @param maxAttempts - Maximum number of retry attempts
 * @param baseDelay - Base delay in milliseconds
 * @param maxDelay - Maximum delay in milliseconds
 * @returns Promise with the result of the function
 */
export const retryWithExponentialBackoff = async<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 2000,
  maxDelay: number = 30000
): Promise<T> => {
  let lastError: Error | unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        break;
      }
      
      // Calculate backoff time with exponential increase and jitter
      const backoffTime = Math.min(
        baseDelay * Math.pow(2, attempt - 1) * (0.9 + Math.random() * 0.2), // Add small jitter (±10%)
        maxDelay
      );
      
      console.log(`Retry attempt ${attempt}/${maxAttempts}. Waiting ${backoffTime/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
  
  throw lastError;
};

/**
 * Implements retry with consistent timeout for each attempt
 * This is useful for API calls where we want to give the same amount of time
 * for each retry attempt, making it seem like the first attempt gets extended time
 * 
 * @param fn - The async function to retry
 * @param maxAttempts - Maximum number of retry attempts
 * @param retryDelay - Delay between retry attempts in milliseconds
 * @returns Promise with the result of the function
 */
export const retryWithConsistentTimeout = async<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  retryDelay: number = 1000
): Promise<T> => {
  let lastError: Error | unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        break;
      }
      
      // Use consistent delay between attempts
      console.log(`Retry attempt ${attempt}/${maxAttempts} with consistent timeout. Waiting ${retryDelay/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  throw lastError;
};