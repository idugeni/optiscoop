'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ArticleDisplayProps {
  title: string;
  article: string;
  author?: string;
  location?: string;
  date?: Date;
}

export default function ArticleDisplay({ title, article, author, location, date }: ArticleDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(article);
    toast.success('Artikel berhasil disalin!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {(location || author || date) && (
          <div className="text-sm text-muted-foreground mt-2 space-y-1">
            {location && <div>Lokasi: {location}</div>}
            {author && <div>Penulis: {author}</div>}
            {date && <div>Tanggal: {format(date, 'dd MMMM yyyy')}</div>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap">{article}</div>
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
  );
}