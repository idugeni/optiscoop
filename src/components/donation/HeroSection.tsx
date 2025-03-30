'use client';

import { Heart, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative text-center space-y-8 py-6">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <div 
        className="flex justify-center mb-8 animate-in fade-in duration-300"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary/40 to-primary/5 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-70"></div>
          <Heart className="h-12 w-12 text-primary relative z-10" />
        </div>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-in fade-in duration-300"
        >
          Dukung OptiScoop
        </h1>
        
        <p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-300"
        >
          Bantu kami mengembangkan solusi AI yang lebih baik untuk profesional Humas 
          di sektor Imigrasi dan Pemasyarakatan Indonesia.
        </p>
        
        <div 
          className="flex justify-center gap-2 pt-4 animate-in fade-in duration-300"
        >
          <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Mendukung Inovasi</span>
          </div>
          <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Memajukan Teknologi AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}