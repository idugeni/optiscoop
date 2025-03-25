'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateNewsWithRetry } from '@/services/news';
import { useMetadata } from '@/hooks/useMetadata';
import Link from 'next/link';
import { Settings } from 'lucide-react';

// Import custom components
import NewsGeneratorForm from '@/components/news/NewsGeneratorForm';

export default function AiNews() {
  useMetadata('Pembuat Berita AI', 'Dapatkan artikel berita yang informatif dengan AI');

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [quoteAttribution, setQuoteAttribution] = useState('');
  const [quotePosition, setQuotePosition] = useState('');
  const [institution, setInstitution] = useState('');
  const [newsDate, setNewsDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState('');

  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro-exp-03-25');

  useEffect(() => {
    const loadSettings = () => {
      const savedApiKey = sessionStorage.getItem('gemini_api_key');
      const savedModel = sessionStorage.getItem('gemini_model');
      
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
      
      if (savedModel && savedModel.length > 0) {
        setSelectedModel(savedModel);
      }
    };
    
    // Load settings initially
    loadSettings();
    
    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gemini_api_key' || e.key === 'gemini_model') {
        loadSettings();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const generateArticle = async () => {
    if (!title.trim()) {
      toast.error('Masukkan judul terlebih dahulu');
      return;
    }
    
    if (!apiKey) {
      toast.error('API key diperlukan untuk menggunakan layanan ini');
      return;
    }
    
    setLoading(true);
    setArticle('');
    toast.info('Sedang memproses permintaan Anda, ini mungkin memerlukan waktu beberapa saat...');

    const startTime = Date.now();

    try {
      const generatedArticle = await generateNewsWithRetry(title, apiKey, selectedModel, location, quoteAttribution, newsDate, quotePosition, institution);
      setArticle(generatedArticle);
      const processDuration = (Date.now() - startTime) / 1000;
      toast.success(`Artikel berhasil dibuat dalam ${processDuration.toFixed(2)} detik, silakan periksa dan jika kurang sesuai, silakan ulangi prosesnya.`);
    } catch {
      toast.error('Terjadi kesalahan saat membuat artikel. Mohon periksa koneksi internet Anda dan pastikan API key valid, atau coba lagi dalam beberapa saat.');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Pembuat Berita AI</h1>
          <p className="text-muted-foreground">Buat artikel berita yang informatif dan menarik dengan bantuan AI</p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan API
            </Link>
          </Button>
        </div>
        
        <div className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generator Berita</CardTitle>
              <CardDescription>
                Masukkan judul untuk menghasilkan artikel berita yang informatif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsGeneratorForm
                title={title}
                setTitle={setTitle}
                location={location}
                setLocation={setLocation}
                quoteAttribution={quoteAttribution}
                setQuoteAttribution={setQuoteAttribution}
                quotePosition={quotePosition}
                setQuotePosition={setQuotePosition}
                institution={institution}
                setInstitution={setInstitution}
                newsDate={newsDate}
                setNewsDate={setNewsDate}
                loading={loading}
                article={article}
                apiKey={apiKey}
                generateArticle={generateArticle}
                alertInfo={''}
                alertSuccess={''}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}