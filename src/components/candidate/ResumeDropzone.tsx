'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResumeDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 cursor-pointer transition-all',
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : fileName
          ? 'border-emerald-500/50 bg-emerald-500/5'
          : 'border-border/60 hover:border-primary/50 hover:bg-accent/30'
      )}
      onClick={() => document.getElementById('resume-upload')?.click()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
      {fileName ? (
        <>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <div className="text-center">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{fileName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Click to replace</p>
          </div>
        </>
      ) : (
        <>
          {isDragging ? (
            <Upload className="w-8 h-8 text-primary animate-bounce" />
          ) : (
            <FileText className="w-8 h-8 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium">Drop your resume here</p>
            <p className="text-xs text-muted-foreground mt-0.5">or click to browse — PDF, DOC, DOCX (optional)</p>
          </div>
        </>
      )}
    </div>
  );
}
