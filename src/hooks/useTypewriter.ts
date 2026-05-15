'use client';

import { useEffect, useRef, useState } from 'react';
import { TYPEWRITER_SPEED_MS } from '@/lib/constants';

export function useTypewriter(text: string, speed = TYPEWRITER_SPEED_MS, startDelay = 400) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    indexRef.current = 0;

    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayedText(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delay);
  }, [text, speed, startDelay]);

  return { displayedText, isDone };
}
