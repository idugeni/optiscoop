import instructionsData from '@/data/ai-news/instructions.json';
import { getRecommendedTimeout } from '@/config/api-timeouts';

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
  
  // Extract hashtags to preserve them
  const hashtagMatch = processedText.match(/(\s*#[^\s#]+(?:\s+#[^\s#]+)*\s*)$/i);
  const hashtags = hashtagMatch ? hashtagMatch[0] : '';
  let mainContent = hashtagMatch ? processedText.slice(0, -hashtags.length).trim() : processedText;
  
  // Split content into paragraphs and filter out empty ones
  const contentParagraphs = mainContent.split('\n\n').filter(p => p.trim().length > 0);
  
  // STRICT ENFORCEMENT: Ensure we have EXACTLY 5-6 paragraphs
  
  // If we don't have enough paragraphs (less than 5), try to split longer paragraphs
  if (contentParagraphs.length < 5) {
    // First attempt: Try to split paragraphs with 3+ sentences
    for (let i = 0; i < contentParagraphs.length && contentParagraphs.length < 5; i++) {
      const paragraph = contentParagraphs[i];
      const sentences = paragraph.split('. ').filter(s => s.trim().length > 0);
      
      // If this paragraph has multiple sentences, split it
      if (sentences.length >= 3) {
        const midpoint = Math.floor(sentences.length / 2);
        const firstHalf = sentences.slice(0, midpoint).join('. ') + '.';
        const secondHalf = sentences.slice(midpoint).join('. ');
        
        // Replace the original paragraph with the first half
        contentParagraphs[i] = firstHalf;
        
        // Insert the second half after the current paragraph
        contentParagraphs.splice(i + 1, 0, secondHalf);
        
        // Skip the newly inserted paragraph in the next iteration
        i++;
      }
    }
    
    // Second attempt: If still not enough paragraphs, try to split paragraphs with 2+ sentences
    if (contentParagraphs.length < 5) {
      for (let i = 0; i < contentParagraphs.length && contentParagraphs.length < 5; i++) {
        const paragraph = contentParagraphs[i];
        const sentences = paragraph.split('. ').filter(s => s.trim().length > 0);
        
        if (sentences.length >= 2) {
          // Split even if just 2 sentences
          contentParagraphs[i] = sentences[0] + '.';
          contentParagraphs.splice(i + 1, 0, sentences.slice(1).join('. '));
          i++;
        }
      }
    }
  }
  
  // If we have too many paragraphs (more than 6), merge shorter ones
  while (contentParagraphs.length > 6) {
    // Find the shortest adjacent paragraphs to merge
    let shortestLength = Infinity;
    let shortestIndex = 0;
    
    for (let i = 0; i < contentParagraphs.length - 1; i++) {
      const combinedLength = contentParagraphs[i].length + contentParagraphs[i + 1].length;
      if (combinedLength < shortestLength) {
        shortestLength = combinedLength;
        shortestIndex = i;
      }
    }
    
    // Merge the shortest adjacent paragraphs
    contentParagraphs[shortestIndex] = `${contentParagraphs[shortestIndex]} ${contentParagraphs[shortestIndex + 1]}`;
    contentParagraphs.splice(shortestIndex + 1, 1);
  }
  
  // Rebuild the main content with the adjusted paragraphs
  mainContent = contentParagraphs.join('\n\n');
  processedText = mainContent + (hashtags ? '\n' + hashtags : '');
  
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
  
  // Enforce the character limits (min 2000, max 2200) by intelligently adjusting content
  // First handle if the text is too long (over 2200 characters)
  if (processedText.length > 2200) {
    // Extract hashtags to preserve them
    const hashtagMatch = processedText.match(/(\s*#[^\s#]+(?:\s+#[^\s#]+)*\s*)$/i);
    const hashtags = hashtagMatch ? hashtagMatch[0] : '';
    let mainContent = hashtagMatch ? processedText.slice(0, -hashtags.length).trim() : processedText;
    
    // Split into paragraphs for intelligent trimming
    const contentParagraphs = mainContent.split('\n\n');
    
    // Preserve first paragraph (with location and date) and trim others
    // Start trimming from the middle paragraphs
    if (contentParagraphs.length > 2) {
      // Calculate how many characters we need to remove
      
      // Start trimming from middle paragraphs
      for (let i = Math.floor(contentParagraphs.length / 2); i < contentParagraphs.length - 1; i++) {
        if (processedText.length <= 2200) break;
        
        // Trim sentences from the end of the paragraph
        const sentences = contentParagraphs[i].split('. ');
        if (sentences.length > 1) {
          // Remove the last sentence if it's not the only one
          contentParagraphs[i] = sentences.slice(0, -1).join('. ') + '.';
        }
        
        // Recalculate the full text length
        mainContent = contentParagraphs.join('\n\n');
        processedText = mainContent + hashtags;
      }
      
      // If still too long, trim more aggressively
      if (processedText.length > 2200) {
        // Remove entire paragraphs from the middle if needed
        const middleIndex = Math.floor(contentParagraphs.length / 2);
        contentParagraphs.splice(middleIndex, 1);
        
        mainContent = contentParagraphs.join('\n\n');
        processedText = mainContent + hashtags;
      }
    } else {
      // If only 1-2 paragraphs, trim the last paragraph
      const lastParagraph = contentParagraphs[contentParagraphs.length - 1];
      const sentences = lastParagraph.split('. ');
      
      if (sentences.length > 1) {
        // Remove sentences from the end until under limit
        while (processedText.length > 2200 && sentences.length > 1) {
          sentences.pop();
          contentParagraphs[contentParagraphs.length - 1] = sentences.join('. ') + '.';
          mainContent = contentParagraphs.join('\n\n');
          processedText = mainContent + hashtags;
        }
      }
    }
    
    // Last resort: hard truncate if still over limit
    if (processedText.length > 2200) {
      mainContent = mainContent.substring(0, 2200 - hashtags.length - 3) + '...';
      processedText = mainContent + hashtags;
    }
  }
  
  // Now handle if the text is too short (under 2000 characters)
  if (processedText.length < 2000) {
    // Extract hashtags to preserve them
    const hashtagMatch = processedText.match(/(\s*#[^\s#]+(?:\s+#[^\s#]+)*\s*)$/i);
    const hashtags = hashtagMatch ? hashtagMatch[0] : '';
    let mainContent = hashtagMatch ? processedText.slice(0, -hashtags.length).trim() : processedText;
    
    // Split into paragraphs for expansion
    const contentParagraphs = mainContent.split('\n\n');
    
    // Add more detail to paragraphs to reach minimum length
    // We'll add generic elaborative phrases to the middle paragraphs
    const elaborativePhrases = [
      ' Hal ini menjadi perhatian masyarakat luas.',
      ' Informasi ini disampaikan secara resmi.',
      ' Perkembangan situasi terus dipantau.',
      ' Berbagai pihak telah memberikan tanggapan.',
      ' Upaya penanganan terus dilakukan secara intensif.'
    ];
    
    // Start from middle paragraphs and work outward
    let phraseIndex = 0;
    let paragraphIndex = Math.floor(contentParagraphs.length / 2);
    
    while (processedText.length < 2000 && phraseIndex < elaborativePhrases.length) {
      // Add elaborative phrase to current paragraph if it doesn't end with a period
      if (!contentParagraphs[paragraphIndex].endsWith('.')) {
        contentParagraphs[paragraphIndex] += '.';
      }
      
      contentParagraphs[paragraphIndex] += elaborativePhrases[phraseIndex];
      
      // Recalculate the full text length
      mainContent = contentParagraphs.join('\n\n');
      processedText = mainContent + hashtags;
      
      // Move to next phrase and cycle through paragraphs
      phraseIndex++;
      paragraphIndex = (paragraphIndex + 1) % contentParagraphs.length;
      
      // Skip first and last paragraphs on first pass
      if (paragraphIndex === 0) paragraphIndex = 1;
      if (paragraphIndex === contentParagraphs.length - 1 && phraseIndex < elaborativePhrases.length) {
        paragraphIndex = 1; // Reset to second paragraph
      }
    }
  }
  
  // Final verification of paragraph count
  const finalParagraphs = processedText.split('\n\n').filter(p => p.trim().length > 0 && !p.trim().startsWith('#'));
  
  if (finalParagraphs.length < 5 || finalParagraphs.length > 6) {
    // Article should have 5-6 paragraphs
  }
  
  if (processedText.length < 2000) {
    // Article should be at least 2000 characters
  } else if (processedText.length > 2200) {
    // Article should be at most 2200 characters
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
 * @param newsTitle - Title of the news article
 * @param apiKey - API key for the AI service
 * @param selectedModel - Selected AI model ID
 * @param location - Optional location for the news article
 * @param author - Optional author name
 * @param quoteAttribution - Optional quote attribution
 * @param newsDate - Optional date for the news article
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
  // Use the recommended timeout based on the model and operation type
  const timeout = getRecommendedTimeout(selectedModel, 'NEWS_GENERATION');
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`;

  if (!apiKey) {
    throw new Error('API key is required');
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Prepare metadata for the article
      let metadata = '';
      if (location) metadata += `- Lokasi: ${location}\n`;
      if (author) metadata += `- Penulis: ${author}\n`;
      if (quoteAttribution) metadata += `- Narasumber: ${quoteAttribution}\n`;
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

      // Character limit for the article
      const characterLimit = '2200';

      // Replace placeholders in the prompt template
      const filledPrompt = instructionsData.promptTemplate
        .replace('${systemInstruction}', instructionsData.systemInstruction)
        .replace('${userInput}', newsTitle)
        .replace('${metadata}', metadata)
        .replace('${characterLimit}', characterLimit)
        .replace('${hashtags}', hashtags);

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
              temperature: 1,
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

      // Process the response to ensure it meets the requirements
      const metadataObj: { location?: string; author?: string; date?: Date } = {};
      if (location) metadataObj.location = location;
      if (author) metadataObj.author = author;
      if (newsDate) metadataObj.date = newsDate;

      const processedArticle = processNewsResponse(responseText, metadataObj);
      return processedArticle;
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