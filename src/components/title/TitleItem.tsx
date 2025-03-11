'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface TitleItemProps {
  index: number;
  title: string;
  onCopy: (text: string) => void;
}

export default function TitleItem({ index, title, onCopy }: TitleItemProps) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell className="text-right">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onCopy(title)}
        >
          <Copy className="h-4 w-4 mr-1" />
          Salin
        </Button>
      </TableCell>
    </TableRow>
  );
}