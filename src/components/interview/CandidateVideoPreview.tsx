'use client';

import { useCamera } from '@/hooks/useCamera';
import { CameraOff } from 'lucide-react';

export function CandidateVideoPreview() {
  const { videoRef, status } = useCamera();

  return (
    <div className="relative rounded-lg overflow-hidden bg-black/50 border border-border/40 aspect-video w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-full object-cover scale-x-[-1] transition-opacity ${status === 'active' ? 'opacity-100' : 'opacity-0'}`}
      />
      {status !== 'active' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CameraOff className="w-6 h-6 text-muted-foreground/50" />
        </div>
      )}
      <div className="absolute bottom-1.5 left-2 text-xs text-white/70 font-medium">You</div>
    </div>
  );
}
