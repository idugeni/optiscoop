/**
 * News service module index
 * 
 * This file serves as the main entry point for the news service module,
 * exporting all necessary functions and utilities for generating news articles.
 */

// Re-export all components for easier imports elsewhere in the application
export { processNewsResponse, enforceCharacterLimits } from './text-processor';
export { fetchWithTimeout } from './network-utils';
export { generateNewsWithRetry } from './generator';