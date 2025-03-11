/**
 * Title generation service
 */
import { getRecommendedTimeout } from '@/config/api-timeouts';
import { fetchWithTimeout, retryWithConsistentTimeout } from '@/utils/network-utils';
import { processTitleResponse } from './text-processor';
import { getPromptTemplate } from '@/data/title/instructions';

/**
 * Generate titles with retry mechanism
 * @param description - Description to generate titles from
 * @param apiKey - API key for the AI service
 * @param selectedModel - Selected AI model ID
 * @param titleCount - Number of titles to generate
 * @param maxAttempts - Maximum number of retry attempts
 * @returns Promise with array of generated titles
 */
export const generateTitlesWithRetry = async (
  description: string,
  apiKey: string,
  selectedModel: string,
  titleCount: number = 5,
  maxAttempts = 3
): Promise<string[]> => {
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  // Use the retryWithConsistentTimeout utility to maintain the same timeout for each attempt
  // This makes it seem like the first attempt gets extended time
  return retryWithConsistentTimeout(
    async () => {
      // Get the recommended timeout for each attempt based on the model and operation type
      const timeout = getRecommendedTimeout(selectedModel, 'TITLE_GENERATION');
      
      // Use the prompt template from instructions.ts
      const filledPrompt = getPromptTemplate(titleCount, description);
      
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
              temperature: 1.2, // Lower temperature for more focused outputs
              topP: 0.95, // Higher topP for better quality
              topK: 64, // Increased topK for more diverse options
              maxOutputTokens: 65536, // Increased to ensure complete response
              stopSequences: ["\n\n"], // Add stop sequence to better control output
              candidateCount: 1, // Reduced to 1 to avoid split responses
            },
          }),
        },
        timeout
      );

      if (!response.ok) {
        const statusText = response.statusText;
        const status = response.status;
        throw new Error(`Failed to generate titles: ${status} ${statusText}`);
      }

      const result = await response.json();
      
      // Check if the response has the expected structure
      if (!result.candidates || result.candidates.length === 0) {
        throw new Error('Respons API tidak valid atau tidak lengkap.');
      }
      
      // Combine text from all candidates to handle split responses
      let combinedText = '';
      
      for (const candidate of result.candidates) {
        if (candidate.content && 
            candidate.content.parts && 
            candidate.content.parts.length > 0 && 
            candidate.content.parts[0].text) {
          combinedText += candidate.content.parts[0].text + '\n';
        }
      }
      
      if (!combinedText.trim()) {
        throw new Error('Model tidak mengembalikan respons.');
      }

      // Process the response to get clean titles array
      const titles = processTitleResponse(combinedText, titleCount);
      return titles;
    },
    maxAttempts,
    1000  // 1 second delay between retry attempts
  );
};