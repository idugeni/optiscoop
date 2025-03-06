import instructionsData from '@/data/ai-news/instructions.json';

/**
 * Process the raw response text from the AI model and format it as a news article
 * @param responseText - Raw text response from the AI model
 * @returns Formatted news article text
 */
export const processNewsResponse = (responseText: string): string => {
  // Remove any potential numbering or formatting that might come from the AI
  return responseText
    .trim()
    .replace(/^\s*\d+\.\s*/gm, '') // Remove any numbering at the start of lines
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold formatting
    .replace(/\n{3,}/g, '\n\n'); // Normalize multiple newlines to double newlines
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
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};

/**
 * Generate news article with retry mechanism
 * @param newsTitle - User's input news title
 * @param apiKey - API key for the AI service
 * @param selectedModel - Selected AI model ID
 * @param maxAttempts - Maximum number of retry attempts
 * @returns Promise with generated news article text
 */
export const generateNewsWithRetry = async (
  newsTitle: string,
  apiKey: string,
  selectedModel: string,
  location?: string,
  author?: string,
  quoteAttribution?: string,
  newsDate?: Date,
  maxAttempts = 3
): Promise<string> => {
  const timeout = 60000;
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Format date if available - for display in metadata
      const formattedDate = newsDate ? new Date(newsDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '';
      
      // Format date in DD/MM format for article first paragraph
      const shortDate = newsDate ? `(${new Date(newsDate).getDate().toString().padStart(2, '0')}/${(new Date(newsDate).getMonth() + 1).toString().padStart(2, '0')})` : '';

      // Prepare metadata for the news article
      const metadata = {
        title: newsTitle,
        location: location || '',
        author: author || '',
        quoteAttribution: quoteAttribution || '',
        date: formattedDate,
        shortDate: shortDate
      };

      // Replace placeholders in the prompt template
      const filledPrompt = instructionsData.promptTemplate
        .replace('${systemInstruction}', instructionsData.systemInstruction)
        .replace('${userInput}', newsTitle)
        .replace('${metadata}', JSON.stringify(metadata))
        .replace('${characterLimit}', '2200')
        .replace('${hashtags}', '#kemenimipas #guardandguide #infoimipas #pemasyarakatan');

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
              temperature: 0.7,
              topP: 0.95,
              topK: 64,
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

      const processedNews = processNewsResponse(responseText);
      if (processedNews.length >= 2000 && processedNews.length <= 2200) { // Ensure article meets character requirements
        return processedNews;
      }

      throw new Error(`Artikel tidak memenuhi persyaratan panjang karakter (${processedNews.length} karakter). Harus antara 2000-2200 karakter.`);
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