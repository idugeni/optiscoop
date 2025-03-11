'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon, Landmark, Wallet, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { PaymentMethod } from '@/data/donation/payment-methods';

interface PaymentMethodCardProps {
  method: PaymentMethod;
}

export default function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(method.accountNumber);
      setCopied(true);
      toast.success(`Nomor ${method.name} berhasil disalin!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Gagal menyalin nomor. Silakan coba lagi.');
    }
  };

  // Dynamically render the icon based on the icon name
  const renderIcon = () => {
    switch (method.icon) {
      case 'Landmark':
        return <Landmark className="h-6 w-6" />;
      case 'Wallet':
        return <Wallet className="h-6 w-6" />;
      case 'CreditCard':
        return <CreditCard className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="transition-all duration-300 hover:shadow-xl hover:border-opacity-100">
      <Card 
        className={`cursor-pointer overflow-hidden backdrop-blur-sm bg-opacity-95 shadow-lg border-t border-white/20 ${method.color} relative group hover:shadow-2xl hover:border-white/40`} 
        onClick={copyToClipboard}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="absolute -top-24 -right-24 w-40 h-40 rounded-full bg-white/10 blur-2xl -z-10 opacity-70 group-hover:w-44 group-hover:h-44 transition-all"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-2xl -z-10 opacity-50 group-hover:opacity-80 group-hover:w-44 group-hover:h-44 transition-all"></div>
        
        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
        
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm shadow-inner group-hover:bg-white/30 transition-colors">
              {renderIcon()}
            </div>
            <span className="font-semibold tracking-wide">{method.name}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-90">Nomor {method.id === 'bri' ? 'Rekening' : 'Akun'}</p>
              <p className="text-lg font-bold tracking-wider">{method.accountNumber}</p>
            </div>
            <div className="transition-all duration-200 hover:rotate-15 active:scale-90">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full h-10 w-10 ${copied ? 'bg-white/20' : 'hover:bg-white/20'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
              >
                {copied ? 
                  <CheckIcon className="h-5 w-5" /> : 
                  <CopyIcon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <p className="text-sm opacity-90 font-medium">{method.accountName}</p>
        </CardContent>
      </Card>
    </div>
  );
}