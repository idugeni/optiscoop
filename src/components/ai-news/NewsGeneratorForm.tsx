'use client';

import { Sparkles, AlertCircle, CheckCircle, Info, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ArticleDisplay from '@/components/ai-news/ArticleDisplay';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NewsGeneratorFormProps {
  title: string;
  setTitle: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  quoteAttribution: string;
  setQuoteAttribution: (value: string) => void;
  newsDate: Date | undefined;
  setNewsDate: (date: Date | undefined) => void;
  loading: boolean;
  article: string;
  alertInfo: string;
  alertSuccess: string;
  apiKey: string;
  generateArticle: () => Promise<void>;
}

export default function NewsGeneratorForm({
  title,
  setTitle,
  location,
  setLocation,
  author,
  setAuthor,
  quoteAttribution,
  setQuoteAttribution,
  newsDate,
  setNewsDate,
  loading,
  article,
  alertInfo,
  alertSuccess,
  apiKey,
  generateArticle,
}: NewsGeneratorFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateArticle();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Berita</Label>
        <Input
          id="title"
          placeholder="Masukkan judul berita yang ingin dibuat artikelnya"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Masukkan judul berita yang ingin dibuatkan artikelnya
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokasi Berita</Label>
        <Input
          id="location"
          placeholder="Masukkan lokasi berita (contoh: Jakarta)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Lokasi tempat berita terjadi
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Pembuat Berita</Label>
        <Input
          id="author"
          placeholder="Masukkan nama pembuat berita"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Nama penulis atau pembuat berita
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quoteAttribution">Nama Pembuat Kutipan</Label>
        <Input
          id="quoteAttribution"
          placeholder="Masukkan nama pembuat kutipan"
          value={quoteAttribution}
          onChange={(e) => setQuoteAttribution(e.target.value)}
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Nama orang yang akan dikutip dalam berita (kutipan akan dibuat otomatis oleh AI)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsDate" className="font-medium">Tanggal Berita</Label>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              id="newsDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !newsDate && "text-muted-foreground"
              )}
              disabled={loading}
              onClick={() => setIsOpen(true)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newsDate ? format(newsDate, "PPP", { locale: id }) : <span>Pilih tanggal berita</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={newsDate}
              onSelect={(date) => {
                setNewsDate(date);
                setIsOpen(false);
              }}
              initialFocus
            />
            <div className="p-2 border-t flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setNewsDate(undefined)}
              >
                Reset
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
              >
                Tutup
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">
          Tanggal pembuatan berita
        </p>
      </div>
      
      <Button
        className="w-full"
        onClick={generateArticle}
        disabled={loading || !apiKey}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
            Sedang membuat artikel...
          </>
        ) : article ? (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Hasilkan Lagi
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Buat Artikel
          </>
        )}
      </Button>
      
      {!apiKey && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            API key diperlukan. Silakan masukkan API key di tab Pengaturan.
          </AlertDescription>
        </Alert>
      )}
      
      {alertInfo && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            {alertInfo}
          </AlertDescription>
        </Alert>
      )}
      
      {alertSuccess && (
        <Alert variant="default">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {alertSuccess}
          </AlertDescription>
        </Alert>
      )}
      
      {article && (
        <div className="mt-6">
          <ArticleDisplay 
            title={title} 
            article={article} 
            author={author}
            location={location}
            date={newsDate}
          />
        </div>
      )}
    </div>
  );
}