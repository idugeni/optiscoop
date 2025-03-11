'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function TitleGeneratorGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Langkah-langkah Penggunaan</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Buka halaman <Link href="/title" className="text-primary hover:underline">Generator Judul</Link>.</li>
          <li>Pastikan API key sudah dikonfigurasi dengan benar.</li>
          <li>Masukkan deskripsi konten yang ingin dibuatkan judulnya pada kolom Deskripsi.</li>
          <li>Klik tombol &quot;Buat Judul&quot; untuk menghasilkan judul.</li>
          <li>Tunggu beberapa saat hingga proses selesai.</li>
          <li>Pilih judul yang paling sesuai dari daftar yang dihasilkan.</li>
        </ol>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="tips-judul">
          <AccordionTrigger className="text-lg font-semibold">Tips Menulis Deskripsi yang Efektif</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            <div className="rounded-lg border p-4 bg-muted/30 border-green-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Praktik Terbaik</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Sertakan kata kunci utama yang relevan dengan topik artikel.</li>
                    <li>Jelaskan tujuan dan target audiens dari artikel.</li>
                    <li>Sebutkan gaya penulisan yang diinginkan (formal, santai, persuasif, dll).</li>
                    <li>Berikan konteks yang cukup tentang topik yang akan dibahas.</li>
                    <li>Tentukan panjang judul yang diinginkan (pendek, sedang, panjang).</li>
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
                    <li>Deskripsi yang terlalu singkat atau tidak jelas.</li>
                    <li>Menggunakan terlalu banyak jargon teknis tanpa penjelasan.</li>
                    <li>Tidak menyebutkan topik utama artikel.</li>
                    <li>Memberikan instruksi yang saling bertentangan.</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Contoh Deskripsi yang Baik</h3>
        <div className="bg-card p-3 rounded border mb-2">
          <p className="italic">&quot;Artikel tentang manfaat olahraga pagi untuk kesehatan mental dan produktivitas kerja. Target pembaca adalah pekerja kantoran usia 25-40 tahun. Gaya penulisan santai namun informatif. Sertakan kata kunci: olahraga pagi, kesehatan mental, produktivitas, work-life balance. Judul sebaiknya menarik dan memotivasi pembaca untuk mulai berolahraga pagi.&quot;</p>
        </div>
        <p>Deskripsi di atas memberikan informasi yang jelas tentang topik, target pembaca, gaya penulisan, dan kata kunci yang diinginkan.</p>
      </div>
    </div>
  );
}