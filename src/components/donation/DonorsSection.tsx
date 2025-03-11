'use client';

import { Donor } from '@/data/donation/donors';
import DonorsList from './DonorsList';
import { GiftIcon } from 'lucide-react';

interface DonorsSectionProps {
  donors: Donor[];
}

export default function DonorsSection({ donors }: DonorsSectionProps) {
  return (
    <section className="relative py-16 px-4">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 opacity-70"></div>
      
      <div className="max-w-7xl mx-auto">
        <div 
          className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <GiftIcon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Donatur Kami</h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary/50 to-primary/10 rounded-full"></div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-center">
            Terima kasih atas dukungan Anda untuk pengembangan OptiScoop. Kami sangat menghargai kontribusi Anda.
          </p>
        </div>
        
        <div
          className="mt-12 animate-in fade-in duration-800"
          style={{ animationDelay: '800ms' }}
        >
          <DonorsList donors={donors} />
        </div>
      </div>
    </section>
  );
}