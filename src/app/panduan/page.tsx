'use client';

import { useMetadata } from '@/hooks/useMetadata';
import { PanduanTabs } from '@/components/panduan';

export default function PanduanPage() {
  useMetadata('Panduan Penggunaan', 'Panduan lengkap cara mendapatkan API key Gemini dan menggunakan OptiScoop');

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Panduan Penggunaan</h1>
          <p className="text-muted-foreground">Cara mendapatkan API key Gemini dan menggunakan OptiScoop secara optimal</p>
        </div>
        
        <div className="mt-8">
          <PanduanTabs />
        </div>
      </div>
    </div>
  );
}