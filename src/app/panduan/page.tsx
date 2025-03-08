'use client';

import { useMetadata } from '@/hooks/useMetadata';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, ExternalLink, Key, Sparkles, FileText, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PanduanPage() {
  useMetadata('Panduan Penggunaan', 'Panduan lengkap cara mendapatkan API key Gemini dan menggunakan OptiScoop');

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Panduan Penggunaan</h1>
          <p className="text-muted-foreground">Cara mendapatkan API key Gemini dan menggunakan OptiScoop secara optimal</p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/api-settings">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan API
            </Link>
          </Button>
        </div>
        
        <div className="space-y-6 mt-4">
          {/* Cara Mendapatkan API Key */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Cara Mendapatkan API Key Gemini
              </CardTitle>
              <CardDescription>
                Langkah-langkah untuk mendapatkan API key dari Google AI Studio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <li>Buka halaman <Link href="/api-settings" className="text-primary hover:underline">Pengaturan API</Link> di OptiScoop.</li>
                    <li>Tempelkan API key yang telah disalin ke dalam kolom API Key.</li>
                    <li>Pilih model Gemini yang ingin digunakan (disarankan menggunakan model default).</li>
                    <li>Klik tombol Simpan (ikon disk) untuk menyimpan pengaturan.</li>
                  </ol>
                </div>

                <div className="rounded-lg border p-4 bg-muted/30 border-amber-200">
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cara Menggunakan Generator Judul */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Cara Menggunakan Generator Judul
              </CardTitle>
              <CardDescription>
                Panduan untuk menghasilkan judul artikel yang menarik dan SEO-friendly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h3 className="text-lg font-semibold mb-2">Langkah-langkah Penggunaan</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Buka halaman <Link href="/ai-title" className="text-primary hover:underline">Generator Judul</Link>.</li>
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
            </CardContent>
          </Card>

          {/* Cara Menggunakan Generator Berita */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Cara Menggunakan Generator Berita
              </CardTitle>
              <CardDescription>
                Panduan untuk menghasilkan artikel berita yang informatif dan menarik
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h3 className="text-lg font-semibold mb-2">Langkah-langkah Penggunaan</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Buka halaman <Link href="/ai-news" className="text-primary hover:underline">Generator Berita</Link>.</li>
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
            </CardContent>
          </Card>

          {/* Kesimpulan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Kesimpulan
              </CardTitle>
              <CardDescription>
                Ringkasan penggunaan OptiScoop untuk hasil optimal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <Link href="/api-settings">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}