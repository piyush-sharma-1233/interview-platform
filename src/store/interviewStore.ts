'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CandidateInfo, Answer, Screen, TranscriptEntry } from '@/types/interview';
import { QUESTION_TIMER_SECONDS, TOTAL_QUESTIONS } from '@/lib/constants';

interface InterviewStore {
  candidateInfo: CandidateInfo;
  currentScreen: Screen;
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: Answer[];
  isRecording: boolean;
  timer: number;
  interviewStartTime: string | null;
  transcript: TranscriptEntry[];
  autoSaveTimestamp: string | null;

  setCandidateInfo: (info: CandidateInfo) => void;
  navigateTo: (screen: Screen) => void;
  nextQuestion: () => void;
  skipQuestion: () => void;
  submitAnswer: (answer: Partial<Answer>) => void;
  setTimer: (seconds: number) => void;
  tickTimer: () => void;
  setRecording: (recording: boolean) => void;
  appendTranscript: (entry: TranscriptEntry) => void;
  triggerAutoSave: () => void;
  startInterview: () => void;
  resetInterview: () => void;
}

const DEFAULT_CANDIDATE: CandidateInfo = {
  name: '',
  email: '',
  role: '',
  experience: 'Mid',
  skills: [],
};

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set) => ({
      candidateInfo: DEFAULT_CANDIDATE,
      currentScreen: 'landing',
      currentQuestionIndex: 0,
      totalQuestions: TOTAL_QUESTIONS,
      answers: [],
      isRecording: false,
      timer: QUESTION_TIMER_SECONDS,
      interviewStartTime: null,
      transcript: [],
      autoSaveTimestamp: null,

      setCandidateInfo: (info) => set({ candidateInfo: info }),
      navigateTo: (screen) => set({ currentScreen: screen }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1),
          isRecording: false,
          timer: QUESTION_TIMER_SECONDS,
        })),

      skipQuestion: () =>
        set((state) => {
          const answer: Answer = {
            questionIndex: state.currentQuestionIndex,
            text: '',
            timeUsed: QUESTION_TIMER_SECONDS - state.timer,
            skipped: true,
            submittedAt: new Date(),
          };
          return {
            answers: [...state.answers, answer],
            currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1),
            isRecording: false,
            timer: QUESTION_TIMER_SECONDS,
          };
        }),

      submitAnswer: (partial) =>
        set((state) => {
          const answer: Answer = {
            questionIndex: state.currentQuestionIndex,
            text: partial.text ?? '',
            codeSubmission: partial.codeSubmission,
            language: partial.language,
            timeUsed: QUESTION_TIMER_SECONDS - state.timer,
            skipped: false,
            submittedAt: new Date(),
            ...partial,
          };
          return {
            answers: [...state.answers, answer],
            currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.totalQuestions - 1),
            isRecording: false,
            timer: QUESTION_TIMER_SECONDS,
          };
        }),

      setTimer: (seconds) => set({ timer: seconds }),
      tickTimer: () => set((state) => ({ timer: Math.max(0, state.timer - 1) })),
      setRecording: (recording) => set({ isRecording: recording }),

      appendTranscript: (entry) =>
        set((state) => ({ transcript: [...state.transcript, entry] })),

      triggerAutoSave: () => set({ autoSaveTimestamp: new Date().toISOString() }),

      startInterview: () =>
        set({ interviewStartTime: new Date().toISOString(), currentQuestionIndex: 0, answers: [], transcript: [] }),

      resetInterview: () =>
        set({
          candidateInfo: DEFAULT_CANDIDATE,
          currentScreen: 'landing',
          currentQuestionIndex: 0,
          answers: [],
          isRecording: false,
          timer: QUESTION_TIMER_SECONDS,
          interviewStartTime: null,
          transcript: [],
          autoSaveTimestamp: null,
        }),
    }),
    {
      name: 'interview-session',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? sessionStorage : localStorage)),
      partialize: (state) => ({
        candidateInfo: state.candidateInfo,
        currentScreen: state.currentScreen,
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        interviewStartTime: state.interviewStartTime,
        transcript: state.transcript,
      }),
    }
  )
);
