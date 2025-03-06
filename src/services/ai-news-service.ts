import instructionsData from '@/data/ai-news/instructions.json';

/**
 * Process the raw response text from the AI model and format it as a news article
 * @param responseText - Raw text response from the AI model
 * @returns Formatted news article text
 */
export const processNewsResponse = (responseText: string, metadata?: { location?: string, author?: string, date?: Date }): string => {
  // Remove any potential numbering or formatting that might come from the AI
  let processedText = responseText
    .trim()
    .replace(/^\s*\d+\.\s*/gm, '') // Remove any numbering at the start of lines
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold formatting
    .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines to double newlines
    .replace(/\n+#/g, '\n#') // Ensure hashtags are immediately after content
    .replace(/\s+#/g, '\n#'); // Ensure hashtags start on new line with no extra spaces
  
  // Format the text with location, date, and author as requested
  if (metadata) {
    const paragraphs = processedText.split('\n\n');
    
    // Add location at the beginning of the first paragraph if provided
    if (metadata.location && paragraphs.length > 0) {
      // First remove any existing location patterns to prevent duplication
      paragraphs[0] = paragraphs[0]
        .replace(/^\[([^\]]+)\]\s*-\s*/gi, '') // Remove [Location] - pattern
        .replace(/^([^-\n]+)\s*-\s*/gi, ''); // Remove any existing location prefix
      
      // Add the location in the correct format
      paragraphs[0] = `${metadata.location} - ${paragraphs[0]}`;
    }
    
    // Add date at the end of the first paragraph if provided
    if (metadata.date && paragraphs.length > 0) {
      const day = metadata.date.getDate().toString().padStart(2, '0');
      const month = (metadata.date.getMonth() + 1).toString().padStart(2, '0');
      
      // First remove any existing date patterns to prevent duplication
      paragraphs[0] = paragraphs[0]
        .replace(/\s*\(\d{1,2}\/\d{1,2}\)\s*\.?$/gi, '') // Remove (DD/MM) pattern
        .replace(/\s*\([^\)]+\)\s*\.?$/gi, ''); // Remove any other parenthetical at the end
      
      // Ensure the paragraph ends with a period before adding the date
      if (!paragraphs[0].endsWith('.')) {
        paragraphs[0] = `${paragraphs[0]}.`;
      }
      
      // Add date in format (DD/MM)
      paragraphs[0] = `${paragraphs[0]} (${day}/${month})`;
    }
    
    // Author metadata is already handled in the prompt template
    // No need to add author initials at the end of the last paragraph
    
    // Join paragraphs and clean up any trailing periods or extra newlines before hashtags
    processedText = paragraphs.join('\n\n');
    
    // Fix the issue with excessive line breaks and extra periods before hashtags
    processedText = processedText
      .replace(/\.\s*\n+\s*#/g, '\n#') // Replace period followed by newlines and hashtag with just newline and hashtag
      .replace(/\.+\s*#/g, '\n#') // Replace multiple periods before hashtag with newline and hashtag
      .replace(/\n{2,}\s*#/g, '\n#') // Replace multiple newlines before hashtag with single newline
      .trim();
  }
  
  return processedText;
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

      // Prepare metadata for the news article including location, author, and date
      const metadata = {
        title: newsTitle,
        quoteAttribution: quoteAttribution || '',
        location: location || '',
        author: author || '',
        date: newsDate ? newsDate.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : ''
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
              temperature: 2,
              topP: 1,
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
      
      // Check if the response has the expected structure
      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || 
          !result.candidates[0].content.parts || !result.candidates[0].content.parts[0] || 
          !result.candidates[0].content.parts[0].text) {
        console.error('Unexpected API response structure:', JSON.stringify(result));
        throw new Error('Model tidak mengembalikan respons dalam format yang diharapkan.');
      }
      
      const responseText = result.candidates[0].content.parts[0].text;

      if (!responseText) {
        throw new Error('Model tidak mengembalikan respons.');
      }

      // Pass metadata to processNewsResponse for proper formatting
      const processedNews = processNewsResponse(responseText, {
        location: location,
        author: author,
        date: newsDate
      });
      
      // Log the processed news length for debugging
      console.log(`Processed news length: ${processedNews.length} characters`);
      
      // Check if the article meets the character limits (min 2000, max 2200)
      // But return the content anyway, just log warnings instead of throwing errors
      if (processedNews.length < 2000) {
        console.warn(`Artikel terlalu pendek (${processedNews.length} karakter). Minimal seharusnya 2000 karakter.`);
      } else if (processedNews.length > 2200) {
        console.warn(`Artikel terlalu panjang (${processedNews.length} karakter). Maksimal seharusnya 2200 karakter.`);
      }
      
      // Return the processed news regardless of length
      return processedNews;
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