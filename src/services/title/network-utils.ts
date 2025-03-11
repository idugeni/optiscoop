/**
 * Network utilities for title generation
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