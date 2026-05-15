'use client';

import { Mic, MicOff } from 'lucide-react';
import { useMicrophone } from '@/hooks/useMicrophone';

export function MicLevelBars() {
  const { bars, status } = useMicrophone();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-0.5 h-8">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-all duration-75"
            style={{
              height: `${Math.max(4, h * 0.3)}px`,
              background: h > 60
                ? 'oklch(0.65 0.22 27)'
                : h > 30
                ? 'oklch(0.8 0.18 85)'
                : 'oklch(0.62 0.22 264)',
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {status === 'active' ? (
          <>
            <Mic className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Microphone active</span>
          </>
        ) : status === 'denied' ? (
          <>
            <MicOff className="w-4 h-4 text-destructive" />
            <span className="text-xs text-destructive font-medium">Microphone access denied</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Requesting microphone…</span>
          </>
        )}
      </div>
    </div>
  );
}
