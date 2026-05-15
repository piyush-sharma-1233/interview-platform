'use client';

import { Badge } from '@/components/ui/badge';
import type { DifficultyLevel } from '@/types/interview';
import { cn } from '@/lib/utils';

interface Props { difficulty: DifficultyLevel; }

const config: Record<DifficultyLevel, { label: string; className: string }> = {
  Easy: { label: 'Easy', className: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
  Medium: { label: 'Medium', className: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
  Hard: { label: 'Hard', className: 'bg-red-500/15 text-red-500 border-red-500/30' },
};

export function DifficultyBadge({ difficulty }: Props) {
  const { label, className } = config[difficulty];
  return (
    <Badge variant="outline" className={cn('text-xs font-semibold', className)}>
      {label}
    </Badge>
  );
}
