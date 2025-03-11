'use client';
import { useMetadata } from '@/hooks/useMetadata';

// Import components and data
import HeroSection from '@/components/donation/HeroSection';
import PaymentMethodsSection from '@/components/donation/PaymentMethodsSection';
import DonorsSection from '@/components/donation/DonorsSection';
import { paymentMethods } from '@/data/donation/payment-methods';
import { donors } from '@/data/donation/donors';

export default function DonationPage() {
  useMetadata('Donation - Support OptiScoop', 'Support the development of OptiScoop by making a donation. Your contribution helps us improve our AI tools for public relations professionals.');

  return (
    <div className="relative min-h-screen">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none"></div>
      
      {/* Main content */}
      <div className="mx-auto py-10 px-4 max-w-7xl relative z-10">
        <div className="space-y-24">
          {/* Hero Section */}
          <HeroSection />

          {/* Payment Methods Section */}
          <PaymentMethodsSection paymentMethods={paymentMethods} />

          {/* Donors Section */}
          <DonorsSection donors={donors} />
        </div>
      </div>
    </div>
  );
}