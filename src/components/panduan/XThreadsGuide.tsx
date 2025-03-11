'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function XThreadsGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah-langkah Penggunaan</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Buka halaman <Link href="/x" className="text-primary hover:underline">Generator X/Thread</Link>.</li>
          <li>Pastikan API key sudah dikonfigurasi dengan benar.</li>
          <li>Masukkan topik atau ide utama thread yang ingin dibuat pada kolom yang tersedia.</li>
          <li>Tentukan jumlah tweet yang diinginkan dalam thread (disarankan 5-10 tweet).</li>
          <li>Klik tombol &quot;Buat Thread&quot; untuk menghasilkan thread.</li>
          <li>Tunggu beberapa saat hingga proses selesai.</li>
          <li>Thread yang dihasilkan akan ditampilkan dengan format yang siap untuk diposting.</li>
        </ol>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="tips-thread">
          <AccordionTrigger className="text-lg font-semibold">Tips Membuat Thread yang Efektif</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            <div className="rounded-lg border p-4 bg-muted/30 border-green-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Praktik Terbaik</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tentukan topik utama yang jelas dan fokus.</li>
                    <li>Berikan konteks yang cukup tentang topik yang akan dibahas.</li>
                    <li>Gunakan bahasa yang ringkas dan langsung ke inti.</li>
                    <li>Sertakan hashtag relevan untuk meningkatkan jangkauan.</li>
                    <li>Buat tweet pertama yang menarik untuk mendapatkan perhatian.</li>
                    <li>Susun thread dengan alur yang logis dan mudah diikuti.</li>
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
                    <li>Thread yang terlalu panjang tanpa struktur yang jelas.</li>
                    <li>Menggunakan terlalu banyak jargon teknis tanpa penjelasan.</li>
                    <li>Terlalu banyak hashtag yang tidak relevan.</li>
                    <li>Konten yang berulang antar tweet dalam thread.</li>
                    <li>Membuat thread tanpa kesimpulan atau call-to-action.</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Contoh Topik Thread yang Baik</h3>
        <div className="bg-card p-3 rounded border mb-2">
          <p className="italic">&quot;Panduan langkah demi langkah untuk memulai investasi saham bagi pemula. Target audiens adalah anak muda usia 20-30 tahun yang baru mulai bekerja. Sertakan tips praktis, istilah penting yang perlu diketahui, dan kesalahan umum yang harus dihindari. Buat thread dengan 8 tweet yang informatif namun tetap santai.&quot;</p>
        </div>
        <p>Topik di atas memberikan informasi yang jelas tentang subjek, target audiens, dan struktur thread yang diinginkan.</p>
      </div>
    </div>
  );
}