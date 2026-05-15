'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Terminal } from 'lucide-react';
import { useCodingStore } from '@/store/codingStore';
import { outputSlideUp } from '@/lib/animations';

export function MockOutputPanel() {
  const { output, isRunning } = useCodingStore();
  const visible = isRunning || !!output;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={outputSlideUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-[#1e1e1e] border-t border-[#3c3c3c] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3c3c3c]">
            <Terminal className="w-3.5 h-3.5 text-[#858585]" />
            <span className="text-xs text-[#858585] font-medium">Output</span>
          </div>
          <div className="px-4 py-3 max-h-40 overflow-y-auto">
            {isRunning ? (
              <div className="flex items-center gap-2 text-[#858585]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-mono">Running test cases…</span>
              </div>
            ) : (
              <pre className="text-xs font-mono text-[#d4d4d4] whitespace-pre-wrap leading-relaxed">{output}</pre>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
