'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  seconds: number;
  total?: number;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function CountdownTimer({ seconds, total = 120 }: Props) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = seconds / total;

  const color =
    pct > 0.5
      ? 'text-emerald-500'
      : pct > 0.25
      ? 'text-amber-500'
      : 'text-red-500';

  return (
    <div className={cn('flex items-center gap-1.5 font-mono font-semibold text-lg tabular-nums', color)}>
      <Clock className="w-4 h-4" />
      <span>{pad(mins)}:{pad(secs)}</span>
    </div>
  );
}
