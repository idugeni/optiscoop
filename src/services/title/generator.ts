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

  // Validate title count to ensure it's within reasonable limits
  if (titleCount < 1 || titleCount > 10) {
    titleCount = 5;
  }

  // Use the retryWithConsistentTimeout utility to maintain the same timeout for each attempt
  // This makes it seem like the first attempt gets extended time
  return retryWithConsistentTimeout(
    async () => {
      // Get the recommended timeout for each attempt based on the model and operation type
      const timeout = getRecommendedTimeout(selectedModel, 'TITLE_GENERATION');
      
      // Use the prompt template from instructions.ts
      const filledPrompt = getPromptTemplate(titleCount, description);
      
      // Production mode - no debug logging
      
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
              temperature: 1.8, // Increased temperature for more unique and creative outputs
              topP: 0.98, // Increased topP for more diverse generation
              topK: 60, // Increased topK for better diversity
              maxOutputTokens: 8192, // Reasonable size for title generation
              candidateCount: 1, // Keep at 1 to avoid split responses
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
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
      
      // Production mode - no debug logging
      
      // Check if the response has the expected structure
      if (!result.candidates || result.candidates.length === 0) {
        // Check for safety filter or other specific error conditions
        if (result.promptFeedback && result.promptFeedback.blockReason) {
          throw new Error(`Konten diblokir oleh filter keamanan: ${result.promptFeedback.blockReason}. Mohon ubah deskripsi Anda.`);
        } else if (result.error) {
          // Handle API-specific error messages
          throw new Error(`Error API: ${result.error.message || result.error.code || 'Unknown error'}`);
        } else if (result.usageMetadata && !result.candidates) {
          // Handle case where API returns only usage metadata without content
          // This can happen when the model processes the request but doesn't generate any output
          throw new Error('API memproses permintaan tetapi tidak menghasilkan konten. Coba gunakan deskripsi yang lebih jelas, spesifik, dan hindari konten yang mungkin diblokir oleh filter keamanan.');
        } else {
          // Generic error for invalid response structure
          throw new Error('Respons API tidak valid atau tidak lengkap. Coba gunakan deskripsi yang lebih spesifik.');
        }
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
    3000  // 3 second delay between retry attempts to give API more time to recover
  );
};