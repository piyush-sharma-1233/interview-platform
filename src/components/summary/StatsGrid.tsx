'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, SkipForward } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useInterviewStore } from '@/store/interviewStore';
import { TOTAL_QUESTIONS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function StatsGrid() {
  const { answers, interviewStartTime } = useInterviewStore();

  const attempted = answers.filter((a) => !a.skipped).length;
  const skipped = answers.filter((a) => a.skipped).length;

  const timeTakenMin = interviewStartTime
    ? Math.max(1, Math.round((Date.now() - new Date(interviewStartTime).getTime()) / 60000))
    : 42;

  const stats = [
    {
      icon: CheckCircle2,
      label: 'Questions Attempted',
      value: `${attempted} / ${TOTAL_QUESTIONS}`,
      sub: <Progress value={(attempted / TOTAL_QUESTIONS) * 100} className="h-1 mt-2" />,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Clock,
      label: 'Time Taken',
      value: `${timeTakenMin} min`,
      sub: <p className="text-xs text-muted-foreground mt-1">of 60 min allowed</p>,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: SkipForward,
      label: 'Questions Skipped',
      value: String(skipped),
      sub: <p className="text-xs text-muted-foreground mt-1">{TOTAL_QUESTIONS - skipped - attempted} unanswered</p>,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map((s, i) => (
        <motion.div key={i} variants={staggerItem}>
          <Card className="border-border/50">
            <CardContent className="pt-5 pb-5">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{s.value}</p>
              {s.sub}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
