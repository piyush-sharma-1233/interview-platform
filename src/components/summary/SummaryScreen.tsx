'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { StatsGrid } from './StatsGrid';
import { SkillRadarBars } from './SkillRadarBars';
import { FeedbackLists } from './FeedbackLists';
import { CircularConfidenceScore } from './CircularConfidenceScore';
import { StatusBanner } from './StatusBanner';
import { useInterviewStore } from '@/store/interviewStore';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function SummaryScreen() {
  const { candidateInfo } = useInterviewStore();
  const name = candidateInfo.name || 'Candidate';
  const role = candidateInfo.role || 'Software Engineer';

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-3.5rem)] px-4 py-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center space-y-3">
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 text-xs border-emerald-500/40 text-emerald-500 bg-emerald-500/10"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Interview Completed
            </Badge>
            <h1 className="text-3xl font-bold">
              Great work, <span className="gradient-text">{name}!</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Your interview for <strong className="text-foreground">{role}</strong> has been recorded and evaluated
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={staggerItem}>
            <StatsGrid />
          </motion.div>

          {/* AI Evaluation + Circular Score */}
          <motion.div variants={staggerItem}>
            <Card className="border-border/50">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-6">
                    <SkillRadarBars />
                    <Separator className="opacity-40" />
                    <FeedbackLists />
                  </div>
                  <div className="lg:border-l border-border/40 lg:pl-8 flex justify-center">
                    <CircularConfidenceScore />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Banner */}
          <motion.div variants={staggerItem}>
            <StatusBanner />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
