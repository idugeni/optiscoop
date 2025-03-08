// src/data/donation/payment-methods.ts

export interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  icon: string;
  color: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bri',
    name: 'Bank Rakyat Indonesia',
    accountNumber: '011201075046507',
    accountName: 'Eliyanto Sarage',
    icon: 'Landmark',
    color: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
  },
  {
    id: 'dana',
    name: 'DANA',
    accountNumber: '085641159405',
    accountName: 'Eliyanto Sarage',
    icon: 'Wallet',
    color: 'bg-[#0081FF] text-white border-[#0070E0] hover:bg-[#0070E0]'
  },
  {
    id: 'ovo',
    name: 'OVO',
    accountNumber: '085641159405',
    accountName: 'Eliyanto Sarage',
    icon: 'CreditCard',
    color: 'bg-[#4C2A86] text-white border-[#3E2270] hover:bg-[#3E2270]'
  }
];