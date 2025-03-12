'use client';
import { useState, useEffect } from 'react';
import { useMetadata } from '@/hooks/useMetadata';

// Import custom components
import PageHeader from '@/components/title/PageHeader';
import TitleGenerationSection from '@/components/title/TitleGenerationSection';

export default function AiTitle() {
  useMetadata('Pembuat Judul AI - OptiScoop', 'Dapatkan judul artikel yang menarik dengan AI');

  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash-thinking-exp-01-21');
  
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

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <PageHeader />
        <TitleGenerationSection 
          apiKey={apiKey} 
          selectedModel={selectedModel} 
        />
      </div>
    </div>
  );
}
