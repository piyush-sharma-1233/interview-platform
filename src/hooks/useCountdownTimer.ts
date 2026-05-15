'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdownTimer(initialSeconds: number, onExpire?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const startRef = useRef<number>(0);
  const baseRef = useRef<number>(initialSeconds);
  const rafRef = useRef<number>(0);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const tick = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    const remaining = Math.max(0, baseRef.current - elapsed);
    setSeconds(remaining);
    if (remaining === 0) {
      setIsRunning(false);
      onExpireRef.current?.();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    startRef.current = Date.now();
    setIsRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    baseRef.current = seconds;
    setIsRunning(false);
  }, [seconds]);

  const reset = useCallback((newSeconds?: number) => {
    cancelAnimationFrame(rafRef.current);
    const s = newSeconds ?? initialSeconds;
    baseRef.current = s;
    setSeconds(s);
    setIsRunning(false);
  }, [initialSeconds]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { seconds, isRunning, start, pause, reset };
}
