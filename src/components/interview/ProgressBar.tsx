'use client';

import { Progress } from '@/components/ui/progress';

interface Props {
  current: number;
  total: number;
}

export function QuestionProgressBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        Question <strong className="text-foreground">{current + 1}</strong> of <strong className="text-foreground">{total}</strong>
      </span>
      <Progress value={pct} className="flex-1 h-1.5" />
    </div>
  );
}
