'use client';

import { Camera, CameraOff, Loader2 } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';

export function CameraPreview() {
  const { videoRef, status } = useCamera();

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/50 border border-border/40">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-full object-cover transition-opacity ${status === 'active' ? 'opacity-100' : 'opacity-0'}`}
      />
      {status !== 'active' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          {status === 'requesting' && <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />}
          {status === 'denied' && (
            <>
              <CameraOff className="w-8 h-8 text-destructive" />
              <p className="text-xs text-destructive font-medium">Camera access denied</p>
              <p className="text-xs text-muted-foreground">Allow camera in browser settings</p>
            </>
          )}
          {status === 'idle' && <Camera className="w-8 h-8 text-muted-foreground" />}
          {status === 'unavailable' && (
            <>
              <CameraOff className="w-8 h-8 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Camera not available</p>
            </>
          )}
        </div>
      )}
      {status === 'active' && (
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-white font-medium">Live</span>
        </div>
      )}
    </div>
  );
}
