'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Phone } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

// Import components and data
import PaymentMethodCard from '@/components/donation/PaymentMethodCard';
import DonorsList from '@/components/donation/DonorsList';
import { paymentMethods } from '@/data/donation/payment-methods';
import { donors } from '@/data/donation/donors';
import Link from 'next/link';

export default function DonationPage() {
  useMetadata('Donation - Support OptiScoop', 'Support the development of OptiScoop by making a donation. Your contribution helps us improve our AI tools for public relations professionals.');

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="space-y-12">
        {/* Hero Section - Kept as requested */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-md">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Dukung OptiScoop</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Bantu kami mengembangkan solusi AI yang lebih baik untuk profesional Humas di sektor Imigrasi dan Pemasyarakatan Indonesia.
          </p>
        </div>

        {/* Payment Methods Section */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">Pilih Metode Pembayaran</h2>
          <p className="text-sm sm:text-base text-center text-muted-foreground mb-6">
            Klik pada kartu untuk menyalin nomor rekening atau akun
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </div>

          {/* Confirmation Instructions */}
          <div className="space-y-4">
            <Alert className="mt-8 bg-warning/10 border-warning/20">
              <AlertDescription className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-warning" />
                <span>
                  Setelah melakukan transfer, harap hubungi kami untuk konfirmasi melalui WhatsApp.
                </span>
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Link 
                href="https://wa.me/6285641159405?text=Halo,%20saya%20ingin%20konfirmasi%20donasi%20untuk%20OptiScoop"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                Konfirmasi via WhatsApp
              </Link>
            </div>
          </div>
        </div>

        {/* Donors Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Donatur Kami</h2>
          <div className="max-w-7xl mx-auto">
            <DonorsList donors={donors} />
          </div>
        </div>
      </div>
    </div>
  );
}