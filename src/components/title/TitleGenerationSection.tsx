'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

// Import custom components
import TitleGeneratorForm from '@/components/title/TitleGeneratorForm';

// Import services
import { generateTitlesWithRetry } from '@/services/title';

export interface TitleGenerationSectionProps {
  apiKey: string;
  selectedModel: string;
}

export default function TitleGenerationSection({ apiKey, selectedModel }: TitleGenerationSectionProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [titleCount, setTitleCount] = useState(5); // Default to 5 titles

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
      // Dismiss any previous toast
      toast.dismiss();
      
      const generatedTitles = await generateTitlesWithRetry(input, apiKey, selectedModel, titleCount);
      setTitles(generatedTitles);

      const processDuration = (Date.now() - startTime) / 1000;
      // Dismiss any existing toasts before showing success message
      toast.dismiss();
      toast.success(`Judul berhasil dibuat dalam ${processDuration.toFixed(2)} detik, silakan periksa dan jika kurang sesuai, silakan ulangi prosesnya.`);
    } catch (error) {
      let errorMessage = 'Terjadi kesalahan saat membuat judul.';
      
      if (error instanceof Error) {
        // Don't show this separate error toast, consolidate messages instead
        // toast.error('Title generation error: ' + error.message);
        
        if (error.message.includes('timed out')) {
          errorMessage = 'Permintaan melebihi batas waktu. Server API mungkin sedang sibuk.';
        } else if (error.message.includes('API memproses permintaan tetapi tidak menghasilkan konten')) {
          errorMessage = 'API memproses permintaan tetapi tidak menghasilkan konten. Coba gunakan deskripsi yang lebih jelas dan spesifik.';
        } else if (error.message.includes('filter keamanan')) {
          errorMessage = error.message;
        } else if (error.message.includes('Respons API tidak valid')) {
          errorMessage = 'Respons API tidak valid. Coba gunakan deskripsi yang lebih spesifik atau periksa API key Anda.';
        } else {
          errorMessage = `${errorMessage} Detail: ${error.message}`;
        }
      }
      
      // Dismiss any existing toasts before showing error message
      toast.dismiss();
      toast.error(`${errorMessage} Mohon periksa koneksi internet Anda dan pastikan API key valid, atau coba lagi dalam beberapa saat.`);
    }

    setLoading(false);
  };

  return (
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
  );
}