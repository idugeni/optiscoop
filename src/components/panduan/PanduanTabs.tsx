'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Sparkles, FileText, Info, Twitter } from 'lucide-react';
import { ApiKeyGuide, TitleGeneratorGuide, NewsGeneratorGuide, XThreadsGuide, ConclusionGuide } from '@/components/panduan';

export default function PanduanTabs() {
  return (
    <Tabs defaultValue="api-key" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="api-key" className="flex items-center gap-1.5">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API Key</span>
            <span className="sm:hidden">API</span>
          </TabsTrigger>
          <TabsTrigger value="title-generator" className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Generator Judul</span>
            <span className="sm:hidden">Judul</span>
          </TabsTrigger>
          <TabsTrigger value="news-generator" className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Generator Berita</span>
            <span className="sm:hidden">Berita</span>
          </TabsTrigger>
          <TabsTrigger value="x-threads" className="flex items-center gap-1.5">
            <Twitter className="h-4 w-4" />
            <span className="hidden sm:inline">X/Threads</span>
            <span className="sm:hidden">X</span>
          </TabsTrigger>
          <TabsTrigger value="conclusion" className="flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Kesimpulan</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="mt-4 bg-card rounded-lg border shadow-sm p-6">
        <TabsContent value="api-key" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Cara Mendapatkan API Key Gemini
            </h2>
            <p className="text-muted-foreground">
              Langkah-langkah untuk mendapatkan API key dari Google AI Studio dan mengkonfigurasinya di OptiScoop
            </p>
            <div className="mt-6">
              <ApiKeyGuide />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="title-generator" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Cara Menggunakan Generator Judul
            </h2>
            <p className="text-muted-foreground">
              Panduan untuk menghasilkan judul artikel yang menarik dan SEO-friendly
            </p>
            <div className="mt-6">
              <TitleGeneratorGuide />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="news-generator" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Cara Menggunakan Generator Berita
            </h2>
            <p className="text-muted-foreground">
              Panduan untuk menghasilkan artikel berita yang informatif dan menarik
            </p>
            <div className="mt-6">
              <NewsGeneratorGuide />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="x-threads" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Twitter className="h-5 w-5 text-primary" />
              Cara Menggunakan Generator X/Threads
            </h2>
            <p className="text-muted-foreground">
              Panduan untuk membuat thread X/Twitter yang menarik dan informatif
            </p>
            <div className="mt-6">
              <XThreadsGuide />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="conclusion" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Kesimpulan
            </h2>
            <p className="text-muted-foreground">
              Ringkasan penggunaan OptiScoop untuk hasil optimal
            </p>
            <div className="mt-6">
              <ConclusionGuide />
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}