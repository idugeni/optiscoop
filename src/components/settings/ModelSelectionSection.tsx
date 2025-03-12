'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import models from JSON file
import modelsData from '@/data/models/gemini-models.json';
const AVAILABLE_MODELS = modelsData.models;

interface ModelSelectionSectionProps {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
}

export default function ModelSelectionSection({ selectedModel, setSelectedModel }: ModelSelectionSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="model-select">Model AI</Label>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger id="model-select">
          <SelectValue placeholder="Pilih model AI" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Pilih model yang ingin digunakan untuk semua layanan AI
      </p>
    </div>
  );
}