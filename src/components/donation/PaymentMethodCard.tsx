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
    <Card className={`cursor-pointer transition-all duration-300 hover:shadow-md ${method.color}`} onClick={copyToClipboard}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {renderIcon()}
          <span>{method.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Nomor {method.id === 'bri' ? 'Rekening' : 'Akun'}</p>
            <p className="text-lg font-bold">{method.accountNumber}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-sm">{method.accountName}</p>
      </CardContent>
    </Card>
  );
}