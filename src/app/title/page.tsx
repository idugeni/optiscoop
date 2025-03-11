'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { Settings } from 'lucide-react';

// Import custom components
import TitleGeneratorForm from '@/components/title/TitleGeneratorForm';

// Import services
import { generateTitlesWithRetry } from '@/services/title';

export default function AiTitle() {
  useEffect(() => {
    document.title = 'Pembuat Judul AI - OptiScoop';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Dapatkan judul artikel yang menarik dengan AI');
  }, []);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash-thinking-exp-01-21');
  const [titleCount, setTitleCount] = useState(5); // Default to 5 titles
  useEffect(() => {
    const savedApiKey = sessionStorage.getItem('gemini_api_key');
    const savedModel = sessionStorage.getItem('gemini_model');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedModel && savedModel.length > 0) {
      setSelectedModel(savedModel);
    }
  }, []);

  const generateTitles = async () => {
    if (!input.trim()) {
      toast.error('Masukkan deskripsi terlebih dahulu');
      return;
    }
    
    if (!apiKey) {
      toast.error('API key diperlukan untuk menggunakan layanan ini');
      return;
    }
    
    setLoading(true);
    setTitles([]);
    toast.info('Sedang memproses permintaan Anda, ini mungkin memerlukan waktu beberapa saat...');

    const startTime = Date.now();

    try {
      // Add a more detailed message about the process starting
      console.log(`Starting title generation with model: ${selectedModel}, requesting ${titleCount} titles`);
      
      const generatedTitles = await generateTitlesWithRetry(input, apiKey, selectedModel, titleCount);
      setTitles(generatedTitles);

      const processDuration = (Date.now() - startTime) / 1000;
      toast.success(`Judul berhasil dibuat dalam ${processDuration.toFixed(2)} detik, silakan periksa dan jika kurang sesuai, silakan ulangi prosesnya.`);
    } catch (error) {
      // Improve error handling with more specific error messages
      let errorMessage = 'Terjadi kesalahan saat membuat judul.';
      
      if (error instanceof Error) {
        console.error('Title generation error:', error.message);
        errorMessage = `${errorMessage} Detail: ${error.message}`;
      }
      
      toast.error(`${errorMessage} Mohon periksa koneksi internet Anda dan pastikan API key valid, atau coba lagi dalam beberapa saat.`);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Pembuat Judul AI</h1>
          <p className="text-muted-foreground">Buat judul artikel yang menarik dan SEO-friendly dengan bantuan AI</p>
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
                <CardTitle>Generator Judul</CardTitle>
                <CardDescription>
                  Masukkan deskripsi untuk menghasilkan judul artikel yang menarik
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TitleGeneratorForm
                  input={input}
                  setInput={setInput}
                  loading={loading}
                  titles={titles}
                  apiKey={apiKey}
                  generateTitles={generateTitles}
                  titleCount={titleCount}
                  setTitleCount={setTitleCount}
                />
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
