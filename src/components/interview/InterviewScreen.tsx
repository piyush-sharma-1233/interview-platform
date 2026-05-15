'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageTransition } from '@/components/layout/PageTransition';
import { AIAvatarPanel } from './AIAvatarPanel';
import { QuestionDisplay } from './QuestionDisplay';
import { CandidateVideoPreview } from './CandidateVideoPreview';
import { CountdownTimer } from './CountdownTimer';
import { RecordingIndicator } from './RecordingIndicator';
import { QuestionProgressBar } from './ProgressBar';
import { DifficultyBadge } from './DifficultyBadge';
import { ActionButtons } from './ActionButtons';
import { TranscriptPanel } from './TranscriptPanel';
import { AutoSaveStatus } from './AutoSaveStatus';
import { FocusWarningToast } from './FocusWarningToast';
import { ConfidenceScoreMeter } from './ConfidenceScoreMeter';
import { useInterviewStore } from '@/store/interviewStore';
import { QUESTIONS } from '@/lib/mockData';
import { QUESTION_TIMER_SECONDS } from '@/lib/constants';
import { useFocusWarning } from '@/hooks/useFocusWarning';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { fadeIn, staggerItem } from '@/lib/animations';

export function InterviewScreen() {
  const { currentQuestionIndex, totalQuestions, isRecording, setRecording } = useInterviewStore();
  const [isSpeaking, setIsSpeaking] = useState(true);
  const { showWarning, warningCount } = useFocusWarning(true);
  const question = QUESTIONS[currentQuestionIndex];

  const { seconds, start, pause, reset } = useCountdownTimer(QUESTION_TIMER_SECONDS, () => {
    setRecording(false);
  });

  // New question → reset and start "AI speaking" phase
  useEffect(() => {
    setIsSpeaking(true);
    setRecording(false);
    reset(QUESTION_TIMER_SECONDS);
    const t = setTimeout(() => setIsSpeaking(false), 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  const handleStartAnswer = () => {
    setRecording(true);
    setIsSpeaking(false);
    start();
  };

  if (!question) return null;

  return (
    <PageTransition>
      <FocusWarningToast show={showWarning} count={warningCount} />

      <div className="min-h-[calc(100vh-3.5rem)] px-4 py-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 h-full">

          {/* ── Main Column ── */}
          <div className="flex flex-col gap-4">

            {/* Progress + Difficulty */}
            <motion.div variants={fadeIn} initial="initial" animate="animate" className="flex items-center gap-3">
              <div className="flex-1">
                <QuestionProgressBar current={currentQuestionIndex} total={totalQuestions} />
              </div>
              <DifficultyBadge difficulty={question.difficulty} />
            </motion.div>

            {/* Question Card */}
            <motion.div variants={staggerItem} initial="initial" animate="animate">
              <Card className="border-border/50 bg-card/80">
                <CardContent className="pt-5 pb-5 space-y-5">
                  <AIAvatarPanel isSpeaking={isSpeaking} isRecording={isRecording} />
                  <Separator className="opacity-50" />
                  <QuestionDisplay text={question.text} key={question.id} />
                  {question.hints && question.hints.length > 0 && (
                    <div className="rounded-md bg-muted/40 px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-primary">Hint:</span> {question.hints[0]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Timer + Recording */}
            <div className="flex items-center justify-between px-1">
              <CountdownTimer seconds={seconds} total={QUESTION_TIMER_SECONDS} />
              <RecordingIndicator isRecording={isRecording} />
            </div>

            {/* Action Buttons */}
            <ActionButtons onStartAnswer={handleStartAnswer} isRecording={isRecording} />

            {/* Auto-save */}
            <div className="px-1">
              <AutoSaveStatus />
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="flex flex-col gap-4">
            <CandidateVideoPreview />
            <ConfidenceScoreMeter questionIndex={currentQuestionIndex} />
            <TranscriptPanel />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
