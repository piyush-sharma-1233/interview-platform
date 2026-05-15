'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

interface Props {
  text: string;
}

export function QuestionDisplay({ text }: Props) {
  const { displayedText, isDone } = useTypewriter(text);

  return (
    <div className="min-h-[4rem]">
      <p className="text-base leading-relaxed font-medium">
        {displayedText}
        {!isDone && (
          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-blink align-middle" />
        )}
      </p>
    </div>
  );
}
