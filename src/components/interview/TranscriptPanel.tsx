'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterviewStore } from '@/store/interviewStore';
import { MOCK_TRANSCRIPT } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function TranscriptPanel() {
  const [open, setOpen] = useState(true);
  const storeTranscript = useInterviewStore((s) => s.transcript);

  const entries = storeTranscript.length > 0 ? storeTranscript : MOCK_TRANSCRIPT.map((e, i) => ({
    ...e,
    questionIndex: 0,
    timestamp: new Date(Date.now() - (MOCK_TRANSCRIPT.length - i) * 20000),
  }));

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">Live Transcript</span>
        </div>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="max-h-48 overflow-y-auto px-3 pb-3 space-y-2.5">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    'text-xs leading-relaxed pl-2 border-l-2',
                    entry.speaker === 'ai'
                      ? 'border-blue-500/60 text-muted-foreground'
                      : 'border-purple-500/60 text-foreground'
                  )}
                >
                  <span className={cn(
                    'font-semibold mr-1',
                    entry.speaker === 'ai' ? 'text-blue-400' : 'text-purple-400'
                  )}>
                    {entry.speaker === 'ai' ? 'AI:' : 'You:'}
                  </span>
                  {entry.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
