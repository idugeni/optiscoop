'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import Link from 'next/link';

/**
 * Komponen untuk mengelola API key.
 *
 * @param {ApiKeySectionProps} props - Properti komponen.
 */
interface ApiKeySectionProps {
  apiKey: string;
  setApiKey: (value: string) => void;
}

/**
 * Komponen untuk mengelola API key.
 *
 * @param {ApiKeySectionProps} props - Properti komponen.
 * @returns {JSX.Element} Komponen API key.
 */
export default function ApiKeySection({ apiKey, setApiKey }: ApiKeySectionProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  /**
   * Menghapus API key dari penyimpanan sesi.
   */
  const handleClearApiKey = () => {
    sessionStorage.removeItem('gemini_api_key');
    setApiKey('');
    toast.success('API key berhasil dihapus');
  };

  /**
   * Mengubah status tampilan API key.
   */
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
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
          className="h-8 w-8 rounded-full text-destructive hover:text-destructive-content"
          onClick={handleClearApiKey}
          title="Hapus API Key"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        API key diperlukan untuk mengakses layanan Gemini. Dapatkan API key di
        <Link 
          href="https://ai.google.dev/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline ml-1"
        >
          Google AI Studio
        </Link>
      </p>
    </div>
  );
}