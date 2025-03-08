'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Clipboard, Trash2, FileText } from 'lucide-react';

interface ThreadGeneratorFormProps {
  newsContent: string;
  setNewsContent: (content: string) => void;
  loading: boolean;
  onGenerate: () => void;
}

export default function ThreadGeneratorForm({
  newsContent,
  setNewsContent,
  loading,
  onGenerate,
}: ThreadGeneratorFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to count characters in the content
  const characterCount = newsContent.length;

  // Function to count words in the content
  const wordCount = newsContent.trim() ? newsContent.trim().split(/\s+/).length : 0;

  // Function to paste content from clipboard
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setNewsContent(clipboardText);
        toast.success('Konten berhasil ditempel!');
      }
    } catch {
      toast.error('Gagal mengakses clipboard. Pastikan Anda memberikan izin.');
    }
  };

  // Function to clear the textarea
  const handleClear = () => {
    setNewsContent('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    toast.success('Konten berhasil dihapus!');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Tempel konten berita di sini..."
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
          className="min-h-[200px] resize-y"
        />
        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>{characterCount} karakter</span>
          </div>
          <div className="flex items-center">
            <span>{wordCount} kata</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePaste}
          className="flex-1"
          type="button"
        >
          <Clipboard className="mr-2 h-4 w-4" />
          Tempel
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="flex-1"
          type="button"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus
        </Button>
      </div>

      <Button
        onClick={onGenerate}
        disabled={loading}
        className="w-full"
      >
        <FileText className="mr-2 h-4 w-4" />
        {loading ? 'Memproses...' : 'Buat Thread'}
      </Button>
    </div>
  );
}