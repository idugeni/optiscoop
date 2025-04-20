'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useMetadata } from '@/hooks/useMetadata';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Brain } from 'lucide-react';

// Custom Components
import PageHeader from '@/components/settings/PageHeader';
import ApiKeySection from '@/components/settings/ApiKeySection';
import ModelSelectionSection from '@/components/settings/ModelSelectionSection';

export default function ApiSettingsPage() {
  useMetadata('Pengaturan API', 'Konfigurasi API key dan model AI untuk layanan OptiScoop');

  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro-exp-03-25');

  useEffect(() => {
    const savedApiKey = sessionStorage.getItem('gemini_api_key');
    const savedModel = sessionStorage.getItem('gemini_model');

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  const handleSaveSettings = () => {
    if (!apiKey) return toast.error('Masukkan API key terlebih dahulu');

    sessionStorage.setItem('gemini_api_key', apiKey);
    sessionStorage.setItem('gemini_model', selectedModel);

    toast.success('Pengaturan berhasil disimpan. API key dan model akan digunakan di semua layanan.');
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="space-y-8">
        <PageHeader />

        <Card className="rounded-2xl shadow-xl border border-white/10 ring-1 ring-white/10 bg-background/80 backdrop-blur-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Konfigurasi API
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Masukkan API key Gemini dan pilih model yang ingin digunakan untuk semua layanan.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <ApiKeySection apiKey={apiKey} setApiKey={setApiKey} />
              </div>

              <Separator orientation="horizontal" className="block md:hidden" />

              <div className="space-y-4">
                <ModelSelectionSection
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 flex justify-end">
            <Button
              variant="outline"
              onClick={handleSaveSettings}
              className="w-full md:w-auto transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            >
              Simpan Pengaturan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
