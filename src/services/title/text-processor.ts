/**
 * Text processing utilities for title generation
 */

/**
 * Process and validate the raw response from the AI model
 * @param responseText - Raw text response from the AI model
 * @param expectedCount - Expected number of titles
 * @returns Array of processed titles
 */
export const processTitleResponse = (responseText: string, expectedCount: number): string[] => {
  // Remove any introductory text before the first numbered item
  const cleanedResponse = responseText.replace(/^[\s\S]*?(\d+\s*\.)/m, '$1');
  
  // Split response into lines and filter out empty lines
  const lines = cleanedResponse
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Remove any numbering or bullet points if present
  const cleanedTitles = lines.map(line => {
    // Remove numbers, dots, dashes at the start of the line
    return line.replace(/^[\d\.\-\s]+/, '').trim();
  });

  // Remove periods at the end of each title
  const titlesWithoutEndingPeriods = cleanedTitles.map(title => {
    return title.replace(/\.$/, '').trim();
  });

  // Filter out any remaining empty lines and duplicates
  const uniqueTitles = Array.from(new Set(titlesWithoutEndingPeriods));

  // If we got fewer titles than expected but at least one valid title,
  // return what we have instead of throwing an error
  if (uniqueTitles.length === 0) {
    throw new Error('Tidak ada judul yang berhasil dihasilkan. Mohon coba lagi dengan deskripsi yang berbeda.');
  }

  // In production mode, we silently accept fewer titles than requested

  // Return up to the number of titles requested, but accept fewer if that's all we got
  return uniqueTitles.slice(0, Math.min(expectedCount, uniqueTitles.length));
};