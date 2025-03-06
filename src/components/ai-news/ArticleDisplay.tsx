'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';

interface ArticleDisplayProps {
  title: string;
  article: string;
  author?: string;
  location?: string;
  date?: Date;
}

export default function ArticleDisplay({ title, article, author, location, date }: ArticleDisplayProps) {
  // Function to count words in the article
  const countWords = (text: string) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  // Function to extract hashtags from the article
  const extractHashtags = (text: string) => {
    const hashtagRegex = /#[\w\u0080-\uFFFF]+/g;
    const matches = text.match(hashtagRegex) || [];
    return matches.join(' ');
  };

  // Function to remove hashtags from the article text
  const removeHashtags = (text: string) => {
    return text.replace(/#[\w\u0080-\uFFFF]+/g, '').trim();
  };

  // Extract hashtags and clean article text
  const hashtags = extractHashtags(article);
  const cleanArticle = removeHashtags(article);
  
  // Calculate statistics for both clean article and full content
  const characterCount = cleanArticle.length;
  const wordCount = countWords(cleanArticle);

  const copyToClipboard = () => {
    // Format content with proper spacing without metadata
    let fullContent = `${title}\n\n${cleanArticle}`;
    
    // Add hashtags if available
    if (hashtags) {
      fullContent += `\n\n${hashtags}`;
    }
    
    navigator.clipboard.writeText(fullContent);
    toast.success('Artikel berhasil disalin!');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="whitespace-pre-wrap">{cleanArticle}</div>
          
          {hashtags && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium text-muted-foreground mb-1">Hashtags:</p>
              <div className="text-primary">{hashtags}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
          >
            Salin Artikel
          </Button>
        </CardFooter>
      </Card>

      {/* Separate card for statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Konten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-muted rounded-md">
              <p className="font-medium">Total Karakter (Berita):</p>
              <p className="text-lg font-bold">{characterCount}</p>
            </div>
            <div className="p-2 bg-muted rounded-md">
              <p className="font-medium">Total Kata (Berita):</p>
              <p className="text-lg font-bold">{wordCount}</p>
            </div>
            {author && (
              <div className="p-2 bg-muted rounded-md">
                <p className="font-medium">Penulis:</p>
                <p className="text-lg font-bold">{author}</p>
              </div>
            )}
            {location && (
              <div className="p-2 bg-muted rounded-md">
                <p className="font-medium">Lokasi:</p>
                <p className="text-lg font-bold">{location}</p>
              </div>
            )}
            {date && (
              <div className="p-2 bg-muted rounded-md">
                <p className="font-medium">Tanggal:</p>
                <p className="text-lg font-bold">{format(date, 'dd MMMM yyyy', { locale: id })}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}