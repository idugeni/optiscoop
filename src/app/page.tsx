'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, FileText, Settings, Twitter } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

export default function Home() {
  useMetadata('OptiScoop - Empowering Institutional Narratives', 'OptiScoop empowers public relations professionals within Indonesia\'s Ministry of Immigration and Correctional sectors to produce optimized news and headlines.');

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">OptiScoop</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Solusi AI untuk membantu profesional Humas di sektor Imigrasi dan Pemasyarakatan Indonesia
            menghasilkan konten berita dan judul yang optimal.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/api-settings">
                <Settings className="mr-2 h-5 w-5" />
                Mulai dengan Konfigurasi API
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 h-full">
          <Link href="/ai-title" className="cursor-pointer h-full">
            <Card className="transition-all duration-300 hover:shadow-xl relative overflow-hidden group border-primary/10 bg-gradient-to-br from-background to-primary/5 h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-center mt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                </div>
              </div>
              <CardHeader className="flex-none">
                <CardTitle className="text-center text-2xl font-bold">
                  Title Generator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-center">
                  Buat judul artikel yang menarik dan SEO-friendly dengan bantuan AI
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-center">
                  Masukkan deskripsi konten Anda dan dapatkan judul berita yang menarik, 
                  relevan, dan dioptimalkan untuk SEO.
                </p>
              </CardContent>
              <CardFooter className="flex-none">
                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors group-hover:border-primary/50">
                  Buat Judul Sekarang
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/ai-news" className="cursor-pointer h-full">
            <Card className="transition-all duration-300 hover:shadow-xl relative overflow-hidden group border-primary/10 bg-gradient-to-br from-background to-primary/5 h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-center mt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-md">
                  <FileText className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                </div>
              </div>
              <CardHeader className="flex-none">
                <CardTitle className="text-center text-2xl font-bold">
                  News Generator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-center">
                  Buat artikel berita yang informatif dan menarik dengan bantuan AI
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-center">
                  Masukkan judul berita dan dapatkan artikel lengkap yang informatif, 
                  terstruktur dengan baik, dan siap untuk dipublikasikan.
                </p>
              </CardContent>
              <CardFooter className="flex-none">
                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors group-hover:border-primary/50">
                  Buat Berita Sekarang
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/ai-x" className="cursor-pointer h-full">
            <Card className="transition-all duration-300 hover:shadow-xl relative overflow-hidden group border-primary/10 bg-gradient-to-br from-background to-primary/5 h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-center mt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-md">
                  <Twitter className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                </div>
              </div>
              <CardHeader className="flex-none">
                <CardTitle className="text-center text-2xl font-bold">
                  X/Twitter Thread Converter
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-center">
                  Konversi berita menjadi thread X/Twitter yang optimal
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-center">
                  Ubah artikel berita Anda menjadi thread X/Twitter yang terstruktur
                  dengan hashtag yang relevan.
                </p>
              </CardContent>
              <CardFooter className="flex-none">
                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors group-hover:border-primary/50">
                  Buat Thread Sekarang
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Tentang OptiScoop</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            OptiScoop adalah aplikasi yang dirancang khusus untuk membantu profesional Humas 
            di sektor Imigrasi dan Pemasyarakatan Indonesia. Dengan memanfaatkan teknologi AI, 
            OptiScoop membantu menghasilkan konten berita dan judul yang optimal, 
            menghemat waktu dan meningkatkan kualitas publikasi.
          </p>
        </div>
      </div>
    </div>
  );
}