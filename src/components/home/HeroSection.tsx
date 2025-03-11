'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">OptiScoop</h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        Solusi AI untuk membantu profesional Humas di sektor Imigrasi dan Pemasyarakatan Indonesia
        menghasilkan konten berita dan judul yang optimal.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Button asChild size="lg">
          <Link href="/settings">
            <Settings className="mr-2 h-5 w-5" />
            Mulai dengan Konfigurasi API
          </Link>
        </Button>
      </div>
    </div>
  );
}