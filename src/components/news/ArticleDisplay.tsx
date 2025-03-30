'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BarChart2, FileText, Copy, Sparkles, Share2, Calendar, MapPin, User } from 'lucide-react';

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

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 w-full mx-auto">
      {/* Main Article Card */}
      <Card className="overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="text-center pb-2 border-b border-primary/5 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          
          {/* Article metadata */}
          {(author || location || date) && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-sm text-muted-foreground">
              {author && (
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{author}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(date)}</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6 md:p-8 text-justify">
          <div className="whitespace-pre-wrap prose prose-sm md:prose-base mx-auto leading-relaxed">
            {cleanArticle}
          </div>
          
          {hashtags && (
            <div className="pt-4 mt-4 border-t border-primary/10 mx-auto">
              <p className="text-sm font-medium text-muted-foreground mb-2">Hashtags:</p>
              <div className="text-primary flex flex-wrap gap-2 justify-center">
                {hashtags.split(' ').map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center gap-3 p-4 border-t border-primary/5 bg-muted/30">
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
            className="gap-2 transition-all duration-300 hover:text-primary hover:bg-secondary"
          >
            <Copy className="h-4 w-4" />
            Salin Artikel
          </Button>
          
          <Button 
            variant="outline" 
            className="gap-2 transition-all duration-300 hover:bg-secondary"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: title,
                  text: fullContent,
                }).catch(() => {
                  toast.error('Gagal membagikan artikel');
                });
              } else {
                copyToClipboard();
                toast.success('Artikel disalin ke clipboard untuk dibagikan!');
              }
            }}
          >
            <Share2 className="h-4 w-4" />
            Bagikan
          </Button>
        </CardFooter>
      </Card>

      {/* Statistics Card */}
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/10 bg-gradient-to-br from-background to-muted/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 border-b border-primary/5">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Informasi Konten</CardTitle>
          </div>
          <Badge variant="secondary" className="px-3 py-1 bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Statistik
          </Badge>
        </CardHeader>
        
        <CardDescription className="px-6 pt-3 text-sm text-muted-foreground text-center">
          Statistik artikel lengkap termasuk judul, konten, dan hashtag
        </CardDescription>
        
        <CardContent className="pt-4 pb-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-2xl mx-auto">
            <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/10 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group text-center">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center mx-auto">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <p className="font-medium">Total Karakter</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute right-3" onClick={() => {
                  navigator.clipboard.writeText(totalCharacterCount.toString());
                  toast.success('Jumlah karakter disalin!');
                }}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{totalCharacterCount.toLocaleString()}</p>
            </div>
            
            <div className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/10 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group text-center">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center mx-auto">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <p className="font-medium">Total Kata</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute right-3" onClick={() => {
                  navigator.clipboard.writeText(totalWordCount.toString());
                  toast.success('Jumlah kata disalin!');
                }}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{totalWordCount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}