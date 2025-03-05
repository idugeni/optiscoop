'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useMetadata } from '@/hooks/useMetadata';
import { Save, Trash2, Eye, EyeOff } from 'lucide-react';

// Import models from JSON file
import modelsData from '@/data/models/gemini-models.json';
const AVAILABLE_MODELS = modelsData.models;

export default function ApiSettingsPage() {
  useMetadata('Pengaturan API', 'Konfigurasi API key dan model AI untuk layanan OptiScoop');
  
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash-exp');
  const [showApiKey, setShowApiKey] = useState(false);

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

  const handleSaveApiKey = () => {
    if (apiKey) {
      sessionStorage.setItem('gemini_api_key', apiKey);
      sessionStorage.setItem('gemini_model', selectedModel);
      toast.success('Pengaturan berhasil disimpan');
    } else {
      toast.error('Masukkan API key terlebih dahulu');
    }
  };

  const handleClearApiKey = () => {
    sessionStorage.removeItem('gemini_api_key');
    sessionStorage.removeItem('gemini_model');
    setApiKey('');
    toast.success('API key berhasil dihapus');
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const handleSaveGlobal = () => {
    if (apiKey) {
      // Save to sessionStorage
      sessionStorage.setItem('gemini_api_key', apiKey);
      sessionStorage.setItem('gemini_model', selectedModel);
      
      // You could also save to localStorage for persistence across sessions
      // localStorage.setItem('gemini_api_key', apiKey);
      // localStorage.setItem('gemini_model', selectedModel);
      
      toast.success('Pengaturan global berhasil disimpan');
    } else {
      toast.error('Masukkan API key terlebih dahulu');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Pengaturan API</h1>
          <p className="text-muted-foreground">Konfigurasi API key dan model AI untuk layanan OptiScoop</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Konfigurasi API</CardTitle>
            <CardDescription>
              Masukkan API key Gemini dan pilih model yang ingin digunakan untuk semua layanan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="api-key">API Key</Label>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="Masukkan API key Gemini Anda di sini"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                    onClick={toggleShowApiKey}
                    title={showApiKey ? "Sembunyikan API Key" : "Tampilkan API Key"}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-primary hover:text-primary-content"
                  onClick={handleSaveApiKey}
                  title="Simpan Pengaturan"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-destructive hover:text-destructive-content"
                  onClick={handleClearApiKey}
                  title="Hapus API Key"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                API key diperlukan untuk mengakses layanan Gemini. Dapatkan API key di
                <a 
                  href="https://ai.google.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model-select">Model AI</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select">
                  <SelectValue placeholder="Pilih model AI" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Pilih model yang ingin digunakan untuk semua layanan AI
              </p>
            </div>


          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveGlobal}
              variant="default"
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan Global
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}