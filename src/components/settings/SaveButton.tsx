'use client';

import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface SaveButtonProps {
  apiKey: string;
  selectedModel: string;
}

export default function SaveButton({ apiKey, selectedModel }: SaveButtonProps) {
  const handleSaveGlobal = () => {
    if (apiKey) {
      // Save to sessionStorage
      localStorage.setItem('gemini_api_key', apiKey);
      localStorage.setItem('gemini_model', selectedModel);
      
      // Provide detailed success message
      toast.success(`Pengaturan global berhasil disimpan. API key dan model ${selectedModel} akan digunakan di semua layanan.`);
    } else {
      toast.error('Masukkan API key terlebih dahulu');
    }
  };

  return (
    <Button 
      onClick={handleSaveGlobal}
      variant="default"
      className="w-full"
    >
      <Save className="mr-2 h-4 w-4" />
      Simpan Pengaturan Global
    </Button>
  );
}