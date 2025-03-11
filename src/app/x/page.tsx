'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMetadata } from '@/hooks/useMetadata';
import { Settings } from 'lucide-react';
import Link from 'next/link';

// Import custom components
import ThreadGeneratorForm from '@/components/x/ThreadGeneratorForm';
import TweetDisplay from '@/components/x/TweetDisplay';

export default function AiX() {
  useMetadata('Konversi Berita ke X/Twitter', 'Konversi artikel berita menjadi thread X/Twitter yang optimal');

  const [newsContent, setNewsContent] = useState('');
  const [tweetThreads, setTweetThreads] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateTweets = () => {
    if (!newsContent.trim()) {
      toast.error('Masukkan konten berita terlebih dahulu');
      return;
    }

    setLoading(true);
    try {
      // Extract hashtags from the content
      const hashtagRegex = /#[\w\u0080-\uFFFF]+/g;
      const hashtags = (newsContent.match(hashtagRegex) || []).join(' ');
      const cleanContent = newsContent.replace(hashtagRegex, '').trim();

      // Split content into words
      const words = cleanContent.split(/\s+/);
      const tweets: string[] = [];
      let currentTweet = '';

      // Process words and build tweets
      words.forEach((word, index) => {
        const wordWithSpace = index === 0 ? word : ' ' + word;
        const potentialTweet = currentTweet + wordWithSpace;

        // Check if adding hashtags would exceed limit
        const withHashtags = tweets.length === words.length - 1 
          ? potentialTweet + '\n\n' + hashtags 
          : potentialTweet;

        if (withHashtags.length <= 280) {
          currentTweet = potentialTweet;
        } else {
          // Add current tweet to array and start new one
          tweets.push(currentTweet);
          currentTweet = word;
        }
      });

      // Add the last tweet with hashtags
      if (currentTweet) {
        const finalTweet = currentTweet + '\n\n' + hashtags;
        if (finalTweet.length <= 280) {
          tweets.push(finalTweet);
        } else {
          tweets.push(currentTweet);
          if (hashtags.length <= 280) {
            tweets.push(hashtags);
          }
        }
      }

      setTweetThreads(tweets);
      toast.success('Thread berhasil dibuat!');
    } catch {
      toast.error('Terjadi kesalahan saat membuat thread');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Tweet berhasil disalin!');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Konversi Berita ke X/Twitter</h1>
          <p className="text-muted-foreground">Ubah artikel berita menjadi thread X/Twitter yang optimal</p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan API
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generator Thread</CardTitle>
            <CardDescription>
              Masukkan konten berita untuk diubah menjadi thread X/Twitter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThreadGeneratorForm
              newsContent={newsContent}
              setNewsContent={setNewsContent}
              loading={loading}
              onGenerate={generateTweets}
            />

            {tweetThreads.length > 0 && (
              <TweetDisplay 
                tweets={tweetThreads} 
                onCopyTweet={copyToClipboard} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}