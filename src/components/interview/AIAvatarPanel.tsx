'use client';

import { Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  isSpeaking: boolean;
  isRecording: boolean;
}

export function AIAvatarPanel({ isSpeaking, isRecording }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        {/* Outer rings */}
        <div className={cn(
          'absolute inset-0 rounded-full border-2 scale-125',
          isSpeaking ? 'border-blue-500/30 animate-pulse-ring-slow' : 'border-border/20'
        )} />
        <div className={cn(
          'absolute inset-0 rounded-full border-2 scale-[1.5]',
          isSpeaking ? 'border-blue-500/15 animate-pulse-ring' : 'border-border/10'
        )} />
        <div className={cn(
          'absolute inset-0 rounded-full border-2 scale-[1.75]',
          isSpeaking ? 'border-blue-500/8 animate-pulse-ring-slow' : 'border-transparent'
        )} />

        {/* Avatar circle */}
        <div className={cn(
          'relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300',
          isRecording
            ? 'bg-purple-600/20 border-2 border-purple-500/50'
            : 'bg-gradient-brand border-2 border-blue-400/50 shadow-lg shadow-blue-500/30'
        )}>
          <Cpu className="w-6 h-6 text-white" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">InterviewAI</p>
          {isSpeaking && !isRecording && (
            <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-medium">
              Speaking
            </span>
          )}
          {isRecording && (
            <span className="text-xs bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded-full font-medium">
              Listening
            </span>
          )}
          {!isSpeaking && !isRecording && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
              Waiting
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">AI Interviewer</p>
      </div>
    </div>
  );
}
