'use client';

import { Save } from 'lucide-react';
import { useAutoSave } from '@/hooks/useAutoSave';

export function AutoSaveStatus() {
  const { display } = useAutoSave();

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Save className="w-3 h-3" />
      <span>Saved {display}</span>
    </div>
  );
}
