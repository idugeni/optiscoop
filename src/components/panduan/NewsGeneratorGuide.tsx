'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsGeneratorGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah-langkah Penggunaan</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Buka halaman <Link href="/news" className="text-primary hover:underline">Generator Berita</Link>.</li>
          <li>Pastikan API key sudah dikonfigurasi dengan benar.</li>
          <li>Masukkan judul berita yang ingin dibuatkan artikelnya pada kolom Judul Berita.</li>
          <li>Klik tombol &quot;Buat Artikel&quot; untuk menghasilkan artikel berita.</li>
          <li>Tunggu beberapa saat hingga proses selesai.</li>
          <li>Artikel yang dihasilkan akan ditampilkan di bawah form.</li>
        </ol>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="tips-berita">
          <AccordionTrigger className="text-lg font-semibold">Tips Menulis Judul Berita yang Efektif</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            <div className="rounded-lg border p-4 bg-muted/30 border-green-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Praktik Terbaik</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gunakan judul yang spesifik dan informatif.</li>
                    <li>Sertakan kata kunci utama di awal judul jika memungkinkan.</li>
                    <li>Pastikan judul mencerminkan isi berita yang diinginkan.</li>
                    <li>Gunakan kata kerja aktif untuk membuat judul lebih dinamis.</li>
                    <li>Sesuaikan judul dengan gaya jurnalistik yang standar.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 bg-muted/30 border-red-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Hindari Hal Berikut</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Judul yang terlalu sensasional atau menyesatkan.</li>
                    <li>Judul yang terlalu panjang dan bertele-tele.</li>
                    <li>Menggunakan terlalu banyak jargon yang tidak umum.</li>
                    <li>Judul yang tidak memberikan konteks yang cukup.</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Contoh Judul Berita yang Baik</h3>
        <div className="bg-card p-3 rounded border mb-2">
          <p className="italic">&quot;Imigrasi Bandara Soetta Luncurkan Sistem Pemeriksaan Paspor Otomatis untuk Percepat Layanan&quot;</p>
        </div>
        <p>Judul di atas spesifik, informatif, menggunakan kata kerja aktif, dan memberikan konteks yang jelas tentang berita yang akan disampaikan.</p>
      </div>
    </div>
  );
}