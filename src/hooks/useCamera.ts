'use client';

import { useEffect, useRef, useState } from 'react';

type CameraStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unavailable';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>('idle');

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unavailable');
        return;
      }
      setStatus('requesting');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus('active');
      } catch {
        if (!cancelled) setStatus('denied');
      }
    };

    start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  return { videoRef, status };
}
