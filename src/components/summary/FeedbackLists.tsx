'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_STRENGTHS, MOCK_IMPROVEMENTS } from '@/lib/mockData';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function FeedbackLists() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Strengths
        </h3>
        <ul className="space-y-2.5">
          {MOCK_STRENGTHS.map((s, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex gap-2.5 text-sm text-muted-foreground leading-snug"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              {s}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          Areas for Improvement
        </h3>
        <ul className="space-y-2.5">
          {MOCK_IMPROVEMENTS.map((s, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex gap-2.5 text-sm text-muted-foreground leading-snug"
            >
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              {s}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
