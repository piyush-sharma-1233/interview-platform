'use client';

import { useEffect, useState } from 'react';
import { AUTOSAVE_INTERVAL_MS } from '@/lib/constants';
import { useInterviewStore } from '@/store/interviewStore';

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

export function useAutoSave() {
  const triggerAutoSave = useInterviewStore((s) => s.triggerAutoSave);
  const autoSaveTimestamp = useInterviewStore((s) => s.autoSaveTimestamp);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      triggerAutoSave();
    }, AUTOSAVE_INTERVAL_MS);
    triggerAutoSave();
    return () => clearInterval(interval);
  }, [triggerAutoSave]);

  useEffect(() => {
    if (!autoSaveTimestamp) return;
    const update = () => {
      setDisplay(formatTimeAgo(new Date(autoSaveTimestamp)));
    };
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [autoSaveTimestamp]);

  return { display };
}
