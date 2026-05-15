'use client';

import { useEffect, useRef, useState } from 'react';

type MicStatus = 'idle' | 'active' | 'denied' | 'unavailable';

const NUM_BARS = 8;

export function useMicrophone() {
  const [bars, setBars] = useState<number[]>(new Array(NUM_BARS).fill(0));
  const [status, setStatus] = useState<MicStatus>('idle');
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unavailable');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const ctx = new AudioContext();
        ctxRef.current = ctx;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          analyser.getByteFrequencyData(data);
          const step = Math.floor(data.length / NUM_BARS);
          const newBars = Array.from({ length: NUM_BARS }, (_, i) =>
            Math.round((data[i * step] / 255) * 100)
          );
          setBars(newBars);
          rafRef.current = requestAnimationFrame(tick);
        };

        setStatus('active');
        rafRef.current = requestAnimationFrame(tick);
      } catch {
        if (!cancelled) setStatus('denied');
      }
    };

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return { bars, status };
}
