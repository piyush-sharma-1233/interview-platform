'use client';

import { useWaveform } from '@/hooks/useWaveform';

interface Props {
  isRecording: boolean;
}

export function RecordingIndicator({ isRecording }: Props) {
  const { bars } = useWaveform(isRecording);

  if (!isRecording) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-recording-dot" />
      <span className="text-xs text-red-500 font-medium">REC</span>
      <div className="flex items-end gap-0.5 h-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-red-400/70 transition-all duration-75"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}
