'use client';

import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function PageHeader() {
  return (
    <>
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
    </>
  );
}