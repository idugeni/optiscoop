'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useMetadata } from '@/hooks/useMetadata';

// Import custom components
import PageHeader from '@/components/settings/PageHeader';
import ApiKeySection from '@/components/settings/ApiKeySection';
import ModelSelectionSection from '@/components/settings/ModelSelectionSection';

export default function ApiSettingsPage() {
  useMetadata('Pengaturan API', 'Konfigurasi API key dan model AI untuk layanan OptiScoop');
  
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro-exp-03-25');

  useEffect(() => {
    // Load saved API key and model from sessionStorage
    const savedApiKey = sessionStorage.getItem('gemini_api_key');
    const savedModel = sessionStorage.getItem('gemini_model');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);


  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <PageHeader />

        <Card>
          <CardHeader>
            <CardTitle>Konfigurasi API</CardTitle>
            <CardDescription>
              Masukkan API key Gemini dan pilih model yang ingin digunakan untuk semua layanan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ApiKeySection 
              apiKey={apiKey} 
              setApiKey={setApiKey} 
            />
            
            <ModelSelectionSection 
              selectedModel={selectedModel} 
              setSelectedModel={setSelectedModel} 
            />
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </div>
    </div>
  );
}