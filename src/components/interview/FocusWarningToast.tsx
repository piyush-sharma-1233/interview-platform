'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { toastVariant } from '@/lib/animations';

interface Props {
  show: boolean;
  count: number;
}

export function FocusWarningToast({ show, count }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={toastVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-destructive/95 text-destructive-foreground rounded-lg px-4 py-3 shadow-xl shadow-black/30 text-sm font-medium"
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <div>
            <p className="font-semibold">Tab switch detected!</p>
            <p className="text-xs opacity-80 font-normal">Violation {count} — Please keep focus on this tab</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
