'use client';

import { useRouter } from 'next/navigation';
import { Mic, CheckCircle, SkipForward, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { QUESTIONS } from '@/lib/mockData';
import { useCodingStore } from '@/store/codingStore';

interface Props {
  onStartAnswer: () => void;
  isRecording: boolean;
}

export function ActionButtons({ onStartAnswer, isRecording }: Props) {
  const router = useRouter();
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const { currentQuestionIndex, skipQuestion, submitAnswer, navigateTo } = useInterviewStore();
  const setCodeQuestion = useCodingStore((s) => s.setQuestionIndex);

  const currentQ = QUESTIONS[currentQuestionIndex];
  const isCoding = currentQ?.type === 'coding';

  const handleStart = () => {
    if (isCoding) {
      setCodeQuestion(currentQuestionIndex);
      router.push('/coding');
    } else {
      onStartAnswer();
    }
  };

  const handleSubmit = () => {
    submitAnswer({ text: '[Voice response recorded]' });
    const next = currentQuestionIndex + 1;
    if (next >= QUESTIONS.length) {
      navigateTo('summary');
      router.push('/summary');
    }
  };

  const handleSkip = () => {
    skipQuestion();
    const next = currentQuestionIndex + 1;
    if (next >= QUESTIONS.length) {
      navigateTo('summary');
      router.push('/summary');
    }
  };

  const handleEndConfirm = () => {
    navigateTo('summary');
    router.push('/summary');
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {!isRecording ? (
          <Button
            onClick={handleStart}
            className="btn-gradient text-white border-0 gap-2 shadow-md shadow-blue-500/20"
          >
            <Mic className="w-4 h-4" />
            {isCoding ? 'Open Editor' : 'Start Answer'}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Submit Answer
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleSkip}
          className="gap-2 border-border/60"
        >
          <SkipForward className="w-4 h-4" />
          Skip
        </Button>

        <Button
          variant="outline"
          onClick={() => setEndDialogOpen(true)}
          className="gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto"
        >
          <XCircle className="w-4 h-4" />
          End Interview
        </Button>
      </div>

      <Dialog open={endDialogOpen} onOpenChange={setEndDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End the Interview?</DialogTitle>
            <DialogDescription>
              Your responses so far will be submitted for evaluation. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEndDialogOpen(false)}>Continue Interview</Button>
            <Button
              onClick={handleEndConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              End & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
