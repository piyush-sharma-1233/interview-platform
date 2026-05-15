'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_WARNING_DEBOUNCE_MS } from '@/lib/constants';

export function useFocusWarning(active: boolean) {
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const handleHidden = () => {
      if (document.visibilityState === 'hidden') {
        timerRef.current = setTimeout(() => {
          countRef.current += 1;
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 4000);
        }, FOCUS_WARNING_DEBOUNCE_MS);
      } else {
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleHidden);
    return () => {
      document.removeEventListener('visibilitychange', handleHidden);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  return { showWarning, warningCount: countRef.current };
}
