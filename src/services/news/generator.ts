/**
 * News article generation service
 */
import instructionsData from '@/data/news/instructions';
import { getRecommendedTimeout } from '@/config/api-timeouts';
import { processNewsResponse } from './text-processor';
import { fetchWithTimeout, retryWithConsistentTimeout } from '@/utils/network-utils';

/**
 * Generate news article with retry mechanism
 * @param newsTitle - Title of the news article
 * @param apiKey - API key for the AI service
 * @param selectedModel - Selected AI model ID
 * @param location - Optional location for the news article
 * @param quoteAttribution - Optional quote attribution
 * @param newsDate - Optional date for the news article
 * @param maxAttempts - Maximum number of retry attempts
 * @returns Promise with generated news article text
 */
export const generateNewsWithRetry = async (
newsTitle: string, apiKey: string, selectedModel: string, location?: string, quoteAttribution?: string, newsDate?: Date, quotePosition?: string, institution?: string, maxAttempts = 3): Promise<string> => {
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  // Use the retryWithConsistentTimeout utility to maintain the same timeout for each attempt
  // This makes it seem like the first attempt gets extended time
  return retryWithConsistentTimeout(
    async () => {
      // Prepare metadata for the article
      let metadata = '';
      if (location) metadata += `- ${location}\n`;
      if (institution) metadata += `- Instansi: ${institution}\n`;
      if (quoteAttribution) metadata += `- Pembuat Kutipan: ${quoteAttribution}\n`;
      if (quotePosition) metadata += `- Jabatan Pembuat Kutipan: ${quotePosition}\n`;
      if (newsDate) {
        const formattedDate = `${newsDate.getDate().toString().padStart(2, '0')}/${(newsDate.getMonth() + 1).toString().padStart(2, '0')}/${newsDate.getFullYear()}`;
        metadata += `- Tanggal: ${formattedDate}\n`;
      }
      
      // If no metadata provided, add a note
      if (!metadata) {
        metadata = '- Tidak ada metadata tambahan';
      }

      // Prepare hashtags
      const hashtags = '#kemenimipas #guardandguide #infoimipas #pemasyarakatan';

      // Character limit is defined in the instructions.json file
      // No character limit enforcement in the code

      // Replace placeholders in the prompt template
      const filledPrompt = instructionsData.promptTemplate
        .replace('${systemInstruction}', instructionsData.systemInstruction)
        .replace('${userInput}', newsTitle)
        .replace('${metadata}', metadata)
        .replace('${characterLimit}', '2200') // Keep reference in prompt template but don't enforce in code
        .replace('${hashtags}', hashtags);

      // Get the recommended timeout for each attempt based on the model and operation type
      const timeout = getRecommendedTimeout(selectedModel, 'NEWS_GENERATION');
      
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
              temperature: 2, // Increased temperature for more creativity and uniqueness
              topP: 0.98, // Increased topP for more diverse outputs
              topK: 64,
              maxOutputTokens: 65536, // Increased to ensure complete article generation
              stopSequences: ["##", "---", "###"], // Stop sequences to control generation
              candidateCount: 1, // Generate multiple candidates for better selection
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
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      const responseText = result.candidates[0].content.parts[0].text;

      if (!responseText) {
        throw new Error('Model tidak mengembalikan respons.');
      }

      // Process the response to ensure it meets the requirements
      const metadataObj: { location?: string; date?: Date } = {};
      if (location) metadataObj.location = location;
      // Removed author from metadataObj
      if (newsDate) metadataObj.date = newsDate;

      // Process the text without enforcing character limits
      const processedArticle = processNewsResponse(responseText, metadataObj);
      // No character limit enforcement - display complete article
      
      return processedArticle;
    },
    maxAttempts,
    2000  // 2 second delay between retry attempts
  );
};
