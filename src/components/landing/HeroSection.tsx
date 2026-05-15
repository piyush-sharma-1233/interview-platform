'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { InstructionsModal } from './InstructionsModal';

export function HeroSection() {
  const router = useRouter();

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center text-center gap-6 max-w-2xl"
    >
      <motion.div variants={staggerItem} className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs border-primary/30 text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AI Interviewer Online
        </Badge>
      </motion.div>

      <motion.div variants={staggerItem}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Your Interview,{' '}
          <span className="gradient-text">Powered by AI</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
          Experience a professional, unbiased, AI-conducted interview. Adaptive questions, real-time
          analysis, and instant feedback — all in one session.
        </p>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Estimated duration: <strong className="text-foreground">45–60 min</strong></span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure &amp; Confidential</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>10 Questions</span>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={() => router.push('/candidate')}
          className="btn-gradient text-white border-0 shadow-lg shadow-blue-500/25 gap-2 px-8 h-12 text-base"
        >
          Start Interview
          <ArrowRight className="w-4 h-4" />
        </Button>
        <InstructionsModal />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-3 gap-6 pt-2 border-t border-border/50 w-full max-w-sm">
        {[
          { value: '10K+', label: 'Interviews Completed' },
          { value: '94%', label: 'Candidate Satisfaction' },
          { value: '2 min', label: 'Avg. Response Time' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-lg font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
