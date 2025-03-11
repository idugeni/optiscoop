'use client';

import { Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import TitleItem from '@/components/title/TitleItem';

interface TitleGeneratorFormProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  titles: string[];
  apiKey: string;
  generateTitles: () => Promise<void>;
  titleCount: number;
  setTitleCount: (value: number) => void;
}

export default function TitleGeneratorForm({
  input,
  setInput,
  loading,
  titles,
  apiKey,
  generateTitles,
  titleCount,
  setTitleCount,
}: TitleGeneratorFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateTitles();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Judul berhasil disalin!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 mb-4">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          placeholder="Masukkan deskripsi yang mencakup kata kunci dan topik konten"
          className="min-h-32 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Jelaskan konten yang Anda perlukan untuk membuat judul
        </p>
      </div>
      
      <div className="space-y-3 mb-4">
        <Label htmlFor="titleCount">Jumlah Judul</Label>
        <Select
          value={titleCount.toString()}
          onValueChange={(value) => setTitleCount(parseInt(value))}
          disabled={loading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih jumlah judul" />
          </SelectTrigger>
          <SelectContent className='max-h-60'>
            <SelectItem value="1">1 Judul</SelectItem>
            <SelectItem value="2">2 Judul</SelectItem>
            <SelectItem value="3">3 Judul</SelectItem>
            <SelectItem value="4">4 Judul</SelectItem>
            <SelectItem value="5">5 Judul</SelectItem>
            <SelectItem value="6">6 Judul</SelectItem>
            <SelectItem value="7">7 Judul</SelectItem>
            <SelectItem value="8">8 Judul</SelectItem>
            <SelectItem value="9">9 Judul</SelectItem>
            <SelectItem value="10">10 Judul</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Pilih berapa banyak judul yang ingin dihasilkan
        </p>
      </div>
      
      <div className="mt-6 mb-4">
        <Button
          className="w-full"
          onClick={generateTitles}
          disabled={loading || !apiKey}
        >
          {loading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Sedang membuat judul...
            </>
          ) : titles.length > 0 ? (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Hasilkan Lagi
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Buat Judul
            </>
          )}
        </Button>
      </div>
      
      {!apiKey && (
        <Alert variant="destructive" className="mt-4 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            API key diperlukan. Silakan masukkan API key di tab Pengaturan.
          </AlertDescription>
        </Alert>
      )}
      
      {titles.length > 0 && (
        <div className="mt-8">
          <Table>
            <TableCaption>Judul yang dihasilkan oleh AI</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Judul Artikel</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {titles.map((title, index) => (
                <TitleItem 
                  key={index}
                  index={index}
                  title={title}
                  onCopy={copyToClipboard}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}