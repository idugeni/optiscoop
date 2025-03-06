'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BarChart2, FileText, Copy, Sparkles } from 'lucide-react';

interface ArticleDisplayProps {
  title: string;
  article: string;
  author?: string;
  location?: string;
  date?: Date;
}

export default function ArticleDisplay({ title, article }: ArticleDisplayProps) {
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
  
  // Calculate statistics for complete content (title + article + hashtags)
  const fullContent = `${title}\n\n${cleanArticle}\n\n${hashtags}`;
  const totalCharacterCount = fullContent.length;
  const totalWordCount = countWords(fullContent);
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
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/10">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Informasi Konten</CardTitle>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Statistik
          </Badge>
        </CardHeader>
        <CardDescription className="px-6 text-sm text-muted-foreground">
          Statistik artikel lengkap termasuk judul, konten, dan hashtag
        </CardDescription>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/10 transition-all duration-300 hover:shadow-md group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-primary mr-2" />
                  <p className="font-medium">Total Karakter</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                  navigator.clipboard.writeText(totalCharacterCount.toString());
                  toast.success('Jumlah karakter disalin!');
                }}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-2xl font-bold text-primary">{totalCharacterCount.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/10 transition-all duration-300 hover:shadow-md group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-primary mr-2" />
                  <p className="font-medium">Total Kata</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                  navigator.clipboard.writeText(totalWordCount.toString());
                  toast.success('Jumlah kata disalin!');
                }}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-2xl font-bold text-primary">{totalWordCount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}