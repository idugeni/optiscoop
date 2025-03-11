'use client';

import { useMetadata } from '@/hooks/useMetadata';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AboutSection } from '@/components/home/AboutSection';

export default function Home() {
  useMetadata('OptiScoop - Empowering Institutional Narratives', 'OptiScoop empowers public relations professionals within Indonesia\'s Ministry of Immigration and Correctional sectors to produce optimized news and headlines.');

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="space-y-12">
        <HeroSection />

        <FeaturesSection />

        <AboutSection />
      </div>
    </div>
  );
}