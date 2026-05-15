'use client';

import { motion } from 'framer-motion';

const SCORE = 76;
const R = 40;
const CIRC = 2 * Math.PI * R;
const TARGET_OFFSET = CIRC * (1 - SCORE / 100);

export function CircularConfidenceScore() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/40" />
          <motion.circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: TARGET_OFFSET }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span className="text-2xl font-bold tabular-nums">{SCORE}</span>
          <span className="text-xs text-muted-foreground -mt-0.5">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">Overall Confidence</p>
        <p className="text-xs text-muted-foreground mt-0.5">Above average performance</p>
      </div>
    </div>
  );
}
