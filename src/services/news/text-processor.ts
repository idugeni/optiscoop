/**
 * Text processing utilities for news articles
 * 
 * This module provides functions for processing and formatting news article text
 * from AI-generated content to ensure consistent formatting and readability.
 */

/**
 * Process the raw response text from the AI model and format it as a proper news article
 * @param responseText - Raw text response from the AI model
 * @param metadata - Optional metadata to include in the article
 * @returns Formatted news article text
 */
export const processNewsResponse = (
  responseText: string,
  metadata?: { location?: string; date?: Date }
): string => {
  // Remove any AI-generated prefixes or instructions and code formatting characters
  let processedText = responseText
    .replace(/^(AI:|Assistant:|Berikut adalah|Artikel berita:)\s*/i, '')
    .replace(/```/g, '') // Remove any backticks/code formatting
    .trim();
  
  // Split the text into lines
  const lines = processedText.split('\n');
  
  // Extract hashtags if they exist at the end
  let hashtags = '';
  const hashtagIndex = lines.findIndex(line => 
    line.trim().startsWith('#') && 
    line.trim().split(' ').every(word => word.startsWith('#') || word === '')
  );
  
  if (hashtagIndex !== -1) {
    hashtags = lines[hashtagIndex].trim();
    lines.splice(hashtagIndex, 1); // Remove hashtags line
  }
  
  // Process the main content
  processedText = lines
    // Join all lines
    .join('\n')
    // Replace multiple consecutive newlines with double newlines
    .replace(/\n{3,}/g, '\n\n')
    // Ensure paragraphs are separated by double newlines
    .replace(/([^\n])\n([^\n])/g, '$1\n\n$2')
    // Remove any numbering at the beginning of paragraphs
    .replace(/^\d+\.\s+/gm, '')
    // Remove any markdown formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
  
  // Only add location metadata at the beginning if it's not already present in the text
  if (metadata?.location && !processedText.includes(metadata.location)) {
    // Check if the location appears in the first paragraph
    const firstParagraphEnd = processedText.indexOf('\n\n');
    const firstParagraph = firstParagraphEnd !== -1 ? processedText.substring(0, firstParagraphEnd) : processedText;
    
    if (!firstParagraph.includes(metadata.location)) {
      processedText = `${metadata.location} - ${processedText}`;
    }
  }
  
  // Only add date metadata if it's not already mentioned in the text
  if (metadata?.date) {
    const formattedDate = `${metadata.date.getDate().toString().padStart(2, '0')}/${(metadata.date.getMonth() + 1).toString().padStart(2, '0')}/${metadata.date.getFullYear()}`;
    
    // Check if the date is already mentioned in the first paragraph
    if (!processedText.includes(formattedDate)) {
      // Look for date mentions in various formats in the first paragraph
      const dateYear = metadata.date.getFullYear().toString();
      const dateMonth = (metadata.date.getMonth() + 1).toString();
      const dateDay = metadata.date.getDate().toString();
      
      // If no date format is found in the text, add it at the beginning
      if (!processedText.includes(dateYear) || 
          (!processedText.includes(dateMonth) && !processedText.includes(dateDay))) {
        processedText = `${formattedDate} - ${processedText}`;
      }
    }
  }
  
  // Add hashtags back at the end if they exist
  if (hashtags) {
    processedText += '\n\n' + hashtags;
  }
  
  return processedText;
};

/**
 * Enforce character limits on the article text
 * @param text - The article text to check
 * @param minChars - Minimum character count (default: 2000)
 * @param maxChars - Maximum character count (default: 2200)
 * @returns The article text, possibly with a warning message if limits are not met
 */
export const enforceCharacterLimits = (
  text: string,
  minChars = 2000,
  maxChars = 2200
): string => {
  const charCount = text.length;
  
  // If the text is within limits, return it unchanged
  if (charCount >= minChars && charCount <= maxChars) {
    return text;
  }
  
  // If the text is too short, add a warning
  if (charCount < minChars) {
    return text + `\n\n[Peringatan: Artikel terlalu pendek (${charCount}/${minChars} karakter minimum).]`;
  }
  
  // If the text is too long, truncate it and add a warning
  if (charCount > maxChars) {
    // Find the last complete sentence that fits within the limit
    let truncatedText = text.substring(0, maxChars);
    const lastPeriod = truncatedText.lastIndexOf('.');
    
    if (lastPeriod !== -1) {
      truncatedText = text.substring(0, lastPeriod + 1);
    }
    
    return truncatedText + `\n\n[Peringatan: Artikel terlalu panjang dan telah dipotong (${charCount}/${maxChars} karakter maksimum).]`;
  }
  
  return text;
};