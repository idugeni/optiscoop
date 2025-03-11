'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function ConclusionGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Praktik Terbaik untuk Hasil Optimal</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Selalu pastikan API key sudah dikonfigurasi dengan benar sebelum menggunakan layanan.</li>
          <li>Berikan deskripsi atau judul yang spesifik dan jelas untuk mendapatkan hasil yang lebih baik.</li>
          <li>Jika hasil yang dihasilkan kurang sesuai, coba perbaiki input Anda dan hasilkan ulang.</li>
          <li>Gunakan model AI yang sesuai dengan kebutuhan Anda (model yang lebih besar biasanya memberikan hasil yang lebih baik).</li>
          <li>Selalu tinjau dan edit hasil yang dihasilkan oleh AI sebelum menggunakannya secara resmi.</li>
        </ol>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Button asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Konfigurasi API
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}