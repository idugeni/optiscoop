import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface ExportOptionsType {
  format: string;
  includeMetadata: boolean;
  customFileName: string;
  compressionLevel: number;
}

interface ExportOptionsProps {
  onExport: (options: ExportOptionsType) => void;
  isExporting?: boolean;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ onExport, isExporting = false }) => {
  const [options, setOptions] = useState<ExportOptionsType>({
    format: 'json',
    includeMetadata: true,
    customFileName: '',
    compressionLevel: 0
  });

  const handleExport = () => {
    onExport(options);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Export Options</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Format</Label>
          <Select
            value={options.format}
            onValueChange={(value) => setOptions({ ...options, format: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="txt">Plain Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="metadata"
            checked={options.includeMetadata}
            onCheckedChange={(checked) =>
              setOptions({ ...options, includeMetadata: checked as boolean })
            }
          />
          <Label htmlFor="metadata">Include Metadata</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="filename">Custom Filename</Label>
          <Input
            id="filename"
            value={options.customFileName}
            onChange={(e) =>
              setOptions({ ...options, customFileName: e.target.value })
            }
            placeholder="Enter custom filename"
          />
        </div>

        <div className="space-y-2">
          <Label>Compression Level (0-9)</Label>
          <Select
            value={options.compressionLevel.toString()}
            onValueChange={(value) =>
              setOptions({ ...options, compressionLevel: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select compression level" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i === 0 ? 'None' : i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </div>
    </Card>
  );
};