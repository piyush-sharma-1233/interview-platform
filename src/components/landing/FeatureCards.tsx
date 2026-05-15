'use client';

import { motion } from 'framer-motion';
import { Brain, BarChart2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/lib/animations';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Questions',
    description: 'Adaptive questions tailored to your role, experience level, and skill set in real time.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BarChart2,
    title: 'Real-time Analysis',
    description: 'Your responses are analyzed for clarity, depth, and technical accuracy as you speak.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive a comprehensive evaluation with strengths and areas for improvement right after.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
];

export function FeatureCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
    >
      {features.map((f, i) => (
        <motion.div key={i} variants={staggerItem}>
          <Card className="border-border/50 bg-card/60 hover:bg-card/90 transition-colors h-full">
            <CardContent className="pt-5 pb-5 flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
