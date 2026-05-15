'use client';

import { Wifi, WifiOff } from 'lucide-react';
import { useInternetStatus } from '@/hooks/useInternetStatus';

export function InternetStatus() {
  const { isOnline } = useInternetStatus();

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Connected — Stable</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-destructive" />
          <span className="text-xs text-destructive font-medium">No internet connection</span>
        </>
      )}
    </div>
  );
}
