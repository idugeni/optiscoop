'use client';

import { Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ArticleDisplay from '@/components/ai-news/ArticleDisplay';
import { DatePicker } from '@/components/ui/date-picker';

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
        <Label htmlFor="newsDate">Tanggal Berita</Label>
        <DatePicker
          date={newsDate}
          setDate={setNewsDate}
          disabled={loading}
          placeholder="Pilih tanggal berita"
        />
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