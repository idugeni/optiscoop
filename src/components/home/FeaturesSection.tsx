'use client';

import { Sparkles, FileText, Twitter } from 'lucide-react';
import { FeatureCard } from '@/components/home/FeatureCard';

const features = [
  {
    href: '/title',
    icon: Sparkles,
    title: 'Title Generator',
    description: 'Buat judul artikel yang menarik dan SEO-friendly dengan bantuan AI',
    content: 'Masukkan deskripsi konten Anda dan dapatkan judul berita yang menarik, relevan, dan dioptimalkan untuk SEO.',
    buttonText: 'Buat Judul Sekarang'
  },
  {
    href: '/news',
    icon: FileText,
    title: 'News Generator',
    description: 'Buat artikel berita yang informatif dan menarik dengan bantuan AI',
    content: 'Masukkan judul berita dan dapatkan artikel lengkap yang informatif, terstruktur dengan baik, dan siap untuk dipublikasikan.',
    buttonText: 'Buat Berita Sekarang'
  },
  {
    href: '/x',
    icon: Twitter,
    title: 'X/Twitter Thread',
    description: 'Konversi berita menjadi thread X/Twitter yang optimal',
    content: 'Ubah artikel berita Anda menjadi thread X/Twitter yang terstruktur dengan hashtag yang relevan.',
    buttonText: 'Buat Thread Sekarang'
  }
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 h-full">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          href={feature.href}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          content={feature.content}
          buttonText={feature.buttonText}
        />
      ))}
    </div>
  );
}