'use client';

import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { PaymentMethod } from '@/data/donation/payment-methods';
import PaymentMethodCard from './PaymentMethodCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
}

export default function PaymentMethodsSection({ paymentMethods }: PaymentMethodsSectionProps) {
  return (
    <section className="space-y-8">
      <div 
        className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <h2 className="text-2xl sm:text-3xl font-bold">Pilih Metode Pembayaran</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Klik pada kartu untuk menyalin nomor rekening atau akun
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <div 
            key={method.id} 
            className={`animate-in fade-in slide-in-from-bottom-4 duration-500`}
            style={{ animationDelay: `${300 + (index * 100)}ms` }}
          >
            <PaymentMethodCard method={method} />
          </div>
        ))}
      </div>

      {/* Confirmation Instructions */}
      <div 
        className="animate-in fade-in duration-500"
        style={{ animationDelay: '800ms' }}
      >
        <div className="transition-all duration-300 hover:shadow-xl hover:border-opacity-100">
          <Card className="overflow-hidden backdrop-blur-sm bg-opacity-95 shadow-lg border-t border-white/20 bg-green-600/10 relative group hover:shadow-2xl hover:border-green-500/30">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute -top-24 -right-24 w-40 h-40 rounded-full bg-green-500/10 blur-2xl -z-10 opacity-70 group-hover:w-44 group-hover:h-44 transition-all"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-green-500/10 blur-2xl -z-10 opacity-50 group-hover:opacity-80 group-hover:w-44 group-hover:h-44 transition-all"></div>
            
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
            
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-500/20 backdrop-blur-sm shadow-inner group-hover:bg-green-500/30 transition-colors">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-semibold tracking-wide">Konfirmasi Donasi</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <p className="text-sm">Setelah melakukan transfer, harap hubungi kami untuk konfirmasi melalui WhatsApp.</p>
              
              <div className="flex justify-center">
                <Link 
                  href="https://wa.me/6285641159405?text=Halo,%20saya%20ingin%20konfirmasi%20donasi%20untuk%20OptiScoop"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg transition-all w-full justify-center"
                >
                  <MessageCircle className="h-5 w-5" />
                  Konfirmasi via WhatsApp
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}