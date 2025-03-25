'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface ExportButtonProps {
  content: string | string[];
  filename?: string;
  title?: string;
  format: 'txt' | 'json' | 'csv' | 'md' | 'thread';
  disabled?: boolean;
}

export default function ExportButton({ content, filename, title, format, disabled = false }: ExportButtonProps) {
  const handleExport = () => {
    try {
      let exportContent = '';
      let mimeType = '';
      
      switch (format) {
        case 'json':
          exportContent = JSON.stringify(Array.isArray(content) ? content : [content], null, 2);
          mimeType = 'application/json';
          break;
        case 'csv':
          exportContent = Array.isArray(content) ? content.join('\n') : content;
          mimeType = 'text/csv';
          break;
        case 'md':
          exportContent = Array.isArray(content) 
            ? content.map((text, index) => `${index + 1}. ${text}`).join('\n\n')
            : content;
          mimeType = 'text/markdown';
          break;
        case 'thread':
          exportContent = Array.isArray(content)
            ? content.map((text, index) => `Tweet ${index + 1}/${content.length}:\n${text}`).join('\n\n---\n\n')
            : content;
          mimeType = 'text/plain';
          break;
        case 'txt':
        default:
          exportContent = Array.isArray(content) ? content.join('\n\n') : content;
          mimeType = 'text/plain';
          break;
      }

      const blob = new Blob([exportContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const exportFilename = title || filename || 'export';
      link.download = `${exportFilename}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Konten berhasil diekspor!');
    } catch (error) {
      toast.error('Gagal mengekspor konten');
      console.error('Export error:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={disabled}
      className="w-full sm:w-auto"
    >
      <Download className="h-4 w-4 mr-2" />
      Export {format.toUpperCase()}
    </Button>
  );
}