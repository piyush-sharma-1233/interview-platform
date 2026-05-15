'use client';

import { Progress } from '@/components/ui/progress';

const SCORES_BY_Q: number[] = [65, 70, 72, 68, 75, 80, 78, 82, 71, 76];

interface Props { questionIndex: number; }

export function ConfidenceScoreMeter({ questionIndex }: Props) {
  const score = SCORES_BY_Q[questionIndex % SCORES_BY_Q.length];

  const color =
    score >= 75 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">Confidence Score</span>
        <span className={`text-sm font-bold tabular-nums ${color}`}>{score}%</span>
      </div>
      <Progress value={score} className="h-1.5" />
      <p className="text-xs text-muted-foreground">Based on response clarity & pace</p>
    </div>
  );
}
