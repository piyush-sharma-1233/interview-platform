'use client';

import { useRouter } from 'next/navigation';
import { Play, Send, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCodingStore } from '@/store/codingStore';
import { useInterviewStore } from '@/store/interviewStore';
import { CountdownTimer } from '@/components/interview/CountdownTimer';
import { CODING_TIMER_SECONDS, QUESTION_TIMER_SECONDS } from '@/lib/constants';
import { QUESTIONS } from '@/lib/mockData';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { useEffect } from 'react';

export function CodingActionBar() {
  const router = useRouter();
  const { runCode, resetCode, isRunning } = useCodingStore();
  const { submitAnswer, currentQuestionIndex, navigateTo } = useInterviewStore();
  const { seconds, start } = useCountdownTimer(CODING_TIMER_SECONDS);

  useEffect(() => { start(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const handleSubmit = () => {
    const { code, language } = useCodingStore.getState();
    submitAnswer({ codeSubmission: code, language, text: '[Code submission]' });
    const next = currentQuestionIndex + 1;
    if (next >= QUESTIONS.length) {
      navigateTo('summary');
      router.push('/summary');
    } else {
      router.push('/interview');
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#252526] border-t border-[#3c3c3c]">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => router.push('/interview')}
        className="text-[#858585] hover:text-white h-8 px-2 gap-1.5 text-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Button>

      <span className="text-[#858585] text-xs ml-2">
        Q {currentQuestionIndex + 1} / {QUESTIONS.length}
      </span>

      <div className="ml-2">
        <CountdownTimer seconds={seconds} total={CODING_TIMER_SECONDS} />
      </div>

      <div className="flex gap-2 ml-auto">
        <Button
          size="sm"
          variant="ghost"
          onClick={resetCode}
          className="text-[#858585] hover:text-white h-8 px-2 gap-1.5 text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>

        <Button
          size="sm"
          onClick={runCode}
          disabled={isRunning}
          className="h-8 gap-1.5 text-xs bg-[#0e639c] hover:bg-[#1177bb] text-white border-0"
        >
          <Play className="w-3.5 h-3.5" />
          {isRunning ? 'Running…' : 'Run Code'}
        </Button>

        <Button
          size="sm"
          onClick={handleSubmit}
          className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white border-0"
        >
          <Send className="w-3.5 h-3.5" />
          Submit Code
        </Button>
      </div>
    </div>
  );
}
