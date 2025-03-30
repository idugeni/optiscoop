'use client';

import { Sparkles, AlertCircle, CheckCircle, Info, CalendarIcon, Newspaper, MapPin, Quote, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ArticleDisplay from '@/components/news/ArticleDisplay';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import ExportButton from '@/components/export/ExportButton';

interface NewsGeneratorFormProps {
  title: string;
  setTitle: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  quoteAttribution: string;
  setQuoteAttribution: (value: string) => void;
  quotePosition: string;
  setQuotePosition: (value: string) => void;
  institution: string;
  setInstitution: (value: string) => void;
  newsDate: Date | undefined;
  setNewsDate: (date: Date | undefined) => void;
  loading: boolean;
  article: string;
  alertInfo: string;
  alertSuccess: string;
  apiKey: string;
  generateArticle: () => Promise<void>;
  selectedModel: string;
}

export default function NewsGeneratorForm({
  title,
  setTitle,
  location,
  setLocation,
  quoteAttribution,
  setQuoteAttribution,
  quotePosition,
  setQuotePosition,
  institution,
  setInstitution,
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Title Section */}
        <div className="space-y-3">
          <Label htmlFor="title" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Judul Berita
          </Label>
          <Input
            id="title"
            placeholder="Masukkan judul berita yang ingin dibuat artikelnya"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="bg-secondary-foreground/10 border-secondary/20 focus-visible:ring-secondary"
          />
          <p className="text-sm text-muted-foreground">
            Masukkan judul berita yang ingin dibuatkan artikelnya
          </p>
        </div>

        {/* Two Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Institution and Location */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="institution" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Nama Instansi
              </Label>
              <Input
                id="institution"
                placeholder="Masukkan nama instansi"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                disabled={loading}
                className="bg-secondary-foreground/10 border-secondary/20 focus-visible:ring-secondary"
              />
              <p className="text-sm text-muted-foreground">
                Nama instansi atau organisasi terkait
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lokasi Berita
              </Label>
              <Input
                id="location"
                placeholder="Masukkan lokasi berita (contoh: Jakarta)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
                className="bg-secondary-foreground/10 border-secondary/20 focus-visible:ring-secondary"
              />
              <p className="text-sm text-muted-foreground">
                Lokasi tempat berita terjadi
              </p>
            </div>
          </div>

          {/* Right Column - Quote Attribution and Position */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="quoteAttribution" className="flex items-center gap-2">
                <Quote className="h-4 w-4" />
                Nama Pembuat Kutipan
              </Label>
              <Input
                id="quoteAttribution"
                placeholder="Masukkan nama pembuat kutipan"
                value={quoteAttribution}
                onChange={(e) => setQuoteAttribution(e.target.value)}
                disabled={loading}
                className="bg-secondary-foreground/10 border-secondary/20 focus-visible:ring-secondary"
              />
              <p className="text-sm text-muted-foreground">
                Nama orang yang akan dikutip dalam berita (kutipan akan dibuat otomatis oleh AI)
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="quotePosition" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Jabatan Pembuat Kutipan
              </Label>
              <Input
                id="quotePosition"
                placeholder="Masukkan jabatan pembuat kutipan"
                value={quotePosition}
                onChange={(e) => setQuotePosition(e.target.value)}
                disabled={loading}
                className="bg-secondary-foreground/10 border-secondary/20 focus-visible:ring-secondary"
              />
              <p className="text-sm text-muted-foreground">
                Jabatan dari orang yang akan dikutip dalam berita
              </p>
            </div>
          </div>
        </div>

        {/* Date Section */}
        <div className="space-y-3">
          <Label htmlFor="newsDate" className="flex items-center gap-2 font-medium">
            <CalendarIcon className="h-4 w-4" />
            Tanggal Berita
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-muted/50 border-muted/30 hover:bg-muted/70 focus-visible:ring-muted"
                disabled={loading}
              >
                {newsDate ? format(newsDate, 'EEEE, d MMMM yyyy', { locale: id }) : <span>Pilih tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newsDate}
                onSelect={setNewsDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">
            Tanggal pembuatan berita
          </p>
        </div>
      </div>

      <div className="mt-6">
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
              Buat Lagi
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Buat Artikel
            </>
          )}
        </Button>

        {article && (
          <div className="flex flex-wrap justify-evenly gap-2 mt-4">
            <ExportButton content={article} filename="article" format="txt" />
            <ExportButton content={article} filename="article" format="json" />
            <ExportButton content={article} filename="article" format="csv" />
          </div>
        )}
      </div>

      {!apiKey && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            API key diperlukan. Silakan masukkan API key di tab Pengaturan.
          </AlertDescription>
        </Alert>
      )}

      {alertInfo && (
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {alertInfo}
          </AlertDescription>
        </Alert>
      )}

      {alertSuccess && (
        <Alert variant="default" className="mt-4">
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
            location={location}
            date={newsDate}
          />
        </div>
      )}
    </div>
  );
}