'use client';

import ExportButton from '@/components/export/ExportButton';

interface ThreadDisplayProps {
  thread: string[];
}

export default function ThreadDisplay({ thread }: ThreadDisplayProps) {
  if (!thread || thread.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {thread.map((tweet, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <p className="whitespace-pre-wrap">{tweet}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-end gap-2 mt-4">
        <ExportButton content={thread} filename="thread" format="txt" />
        <ExportButton content={thread} filename="thread" format="json" />
        <ExportButton content={thread} filename="thread" format="csv" />
      </div>
    </div>
  );
}