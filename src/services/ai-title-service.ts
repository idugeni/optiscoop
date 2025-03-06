import instructionsData from '@/data/ai-title/instructions.json';

/**
 * Process the raw response text from the AI model and extract properly formatted titles
 * @param responseText - Raw text response from the AI model
 * @returns Array of processed title strings
 */
export const processTitlesResponse = (responseText: string): string[] => {
  return responseText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^\d+\./.test(line))
    .map((line) =>
      line
        .replace(/^\d+\.\s*/, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/[_~]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\.$/, '')
        // Remove special characters except parentheses (for abbreviations)
        // We want complete sentences with proper connecting words
        .replace(/[^\w\s.,()]/g, '') // Allow alphanumeric, spaces, periods, commas, and parentheses
        .trim()
    )
    .filter((title) => title.length > 5);
};

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
 * Generate titles with retry mechanism
 * @param userInput - User's input description
 * @param apiKey - API key for the AI service
 * @param selectedModel - Selected AI model ID
 * @param maxAttempts - Maximum number of retry attempts
 * @returns Promise with array of generated titles
 */
export const generateTitlesWithRetry = async (
  userInput: string,
  apiKey: string,
  selectedModel: string,
  titleCount = 10,
  maxAttempts = 3
): Promise<string[]> => {
  const timeout = 60000;
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Replace placeholders in the prompt template
      const filledPrompt = instructionsData.promptTemplate
        .replace('${systemInstruction}', instructionsData.systemInstruction)
        .replace('${userInput}', userInput)
        .replace('${titleCount}', titleCount.toString());

      const response = await fetchWithTimeout(
        `${API_ENDPOINT}?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: filledPrompt }],
              },
            ],
            generationConfig: {
              temperature: 1.2, // Increased temperature for more creativity and uniqueness
              topP: 0.98, // Increased topP for more diverse outputs
              topK: 64, // Increased topK for more variety
              maxOutputTokens: 8192,
            },
          }),
        },
        timeout
      );

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      const responseText = result.candidates[0].content.parts[0].text;

      if (!responseText) {
        throw new Error('Model tidak mengembalikan respons.');
      }

      const processedTitles = processTitlesResponse(responseText);
      
      // Ensure we have enough titles and they're unique
      if (processedTitles.length >= titleCount) {
        // Get unique titles, ensuring they're different from each other
        const uniqueTitles = Array.from(new Set(processedTitles));
        
        // If we have at least the requested number of unique titles, return them
        if (uniqueTitles.length >= titleCount) {
          return uniqueTitles.slice(0, titleCount);
        }
      }

      throw new Error('Invalid number of titles generated');
    } catch (error: unknown) {
      let errorMessage = 'Terjadi kesalahan yang tidak diketahui';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      if (attempt === maxAttempts) {
        throw new Error(errorMessage);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error('Gagal setelah semua percobaan ulang.');
};