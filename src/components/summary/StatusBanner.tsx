'use client';

import { motion } from 'framer-motion';
import { Calendar, PartyPopper } from 'lucide-react';
import { fadeIn } from '@/lib/animations';

export function StatusBanner() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="rounded-xl btn-gradient p-px"
    >
      <div className="rounded-[calc(0.75rem-1px)] bg-background/10 backdrop-blur-sm px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-white">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <PartyPopper className="w-5 h-5" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="font-bold text-base">Submitted for Review</p>
          <p className="text-sm opacity-80 mt-0.5">
            Your interview has been recorded and sent to the hiring team.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs opacity-80 shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          <span>Review within 2–3 business days</span>
        </div>
      </div>
    </motion.div>
  );
}
