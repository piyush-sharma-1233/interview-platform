'use client';

import { useEffect, useRef, useState } from 'react';

const NUM_BARS = 5;

export function useWaveform(isActive: boolean) {
  const [bars, setBars] = useState<number[]>(new Array(NUM_BARS).fill(4));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setBars(new Array(NUM_BARS).fill(4));
      return;
    }

    const tick = () => {
      setBars(
        Array.from({ length: NUM_BARS }, () =>
          Math.floor(Math.random() * 20) + 4
        )
      );
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive]);

  return { bars };
}
