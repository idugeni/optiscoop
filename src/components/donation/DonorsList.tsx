'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Award } from 'lucide-react';
import { Donor } from '@/data/donation/donors';
import Image from 'next/image';
import { useMemo } from 'react';

interface DonorsListProps {
  donors: Donor[];
}

// Helper function to convert Indonesian Rupiah string to number for sorting
const extractAmountValue = (amountStr: string): number => {
  // Remove 'Rp ' prefix and all dots, then convert to number
  return parseInt(amountStr.replace('Rp ', '').replace(/\./g, ''), 10);
};

export default function DonorsList({ donors }: DonorsListProps) {
  // Sort donors by donation amount (highest first)
  const sortedDonors = useMemo(() => {
    return [...donors].sort((a, b) => {
      const amountA = extractAmountValue(a.amount);
      const amountB = extractAmountValue(b.amount);
      return amountB - amountA;
    });
  }, [donors]);

  // Function to render medal for top 3 donors
  const renderMedal = (index: number): React.ReactNode => {
    switch (index) {
      case 0:
        return (
          <div title="Top Donor">
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
        );
      case 1:
        return (
          <div title="Second Place">
            <Award className="h-5 w-5 text-gray-400" />
          </div>
        );
      case 2:
        return (
          <div title="Third Place">
            <Award className="h-5 w-5 text-amber-700" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedDonors.map((donor, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className={`h-1 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-primary/30'}`}></div>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  {donor.imageUrl ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-muted">
                      <Image 
                        src={donor.imageUrl} 
                        alt={`${donor.name} logo`} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to user icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('bg-muted');
                          e.currentTarget.parentElement?.appendChild(
                            Object.assign(document.createElement('div'), {
                              className: 'flex h-full w-full items-center justify-center',
                              innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>'
                            })
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  {renderMedal(index)}
                </div>
                <span className="text-sm font-medium text-muted-foreground">{donor.amount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{donor.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}