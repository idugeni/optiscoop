'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Info } from 'lucide-react';

export default function ApiKeyGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah 1: Buat Akun Google AI Studio</h3>
        <p className="mb-2">Kunjungi situs resmi Google AI Studio untuk membuat akun atau masuk dengan akun Google Anda.</p>
        <Button variant="outline" size="sm" className="gap-1" asChild>
          <Link href="https://ai.google.dev/" target="_blank">
            Kunjungi Google AI Studio
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah 2: Dapatkan API Key</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Setelah masuk ke Google AI Studio, klik pada menu <strong>Get API key</strong> di bagian atas halaman.</li>
          <li>Pilih opsi untuk membuat API key baru atau gunakan yang sudah ada.</li>
          <li>Ikuti petunjuk untuk membuat project baru di Google Cloud Platform jika diminta.</li>
          <li>Setelah API key dibuat, salin key tersebut untuk digunakan di aplikasi OptiScoop.</li>
        </ol>
      </div>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah 3: Konfigurasi API Key di OptiScoop</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Buka halaman <Link href="/settings" className="text-primary hover:underline">Pengaturan API</Link> di OptiScoop.</li>
          <li>Tempelkan API key yang telah disalin ke dalam kolom API Key.</li>
          <li>Pilih model Gemini yang ingin digunakan (disarankan menggunakan model default).</li>
          <li>Klik tombol Simpan (ikon disk) untuk menyimpan pengaturan.</li>
        </ol>
      </div>

      <Card className="border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold mb-1">Catatan Penting</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>API key disimpan secara lokal di browser Anda dan tidak dikirim ke server lain.</li>
                <li>API key akan hilang jika Anda membersihkan data browser atau menggunakan browser lain.</li>
                <li>Pastikan untuk menjaga kerahasiaan API key Anda dan tidak membagikannya kepada orang lain.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}