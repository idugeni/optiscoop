'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ExportButton from '@/components/export/ExportButton';

interface TweetDisplayProps {
  tweets: string[];
  onCopyTweet: (text: string) => void;
}

export default function TweetDisplay({ tweets, onCopyTweet }: TweetDisplayProps) {
  if (tweets.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      <Alert className="bg-primary/10 border-primary/20 text-primary">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Berita telah berhasil diconvert menjadi {tweets.length} thread{tweets.length > 1 ? 's' : ''}.
        </AlertDescription>
      </Alert>
      {tweets.map((tweet, index) => (
        <Card key={index} className="group hover:shadow-md transition-shadow">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">
                {index + 1}/{tweets.length}
              </span>
            </div>
            <div className="whitespace-pre-wrap">{tweet}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {tweet.length}/280 karakter
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyTweet(tweet)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Salin Tweet
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end gap-2 mt-4">
        <ExportButton content={tweets} filename="thread" format="txt" />
        <ExportButton content={tweets} filename="thread" format="json" />
        <ExportButton content={tweets} filename="thread" format="csv" />
        <ExportButton content={tweets} filename="thread" format="md" />
        <ExportButton content={tweets} filename="thread" format="thread" />
      </div>
    </div>
  );
}