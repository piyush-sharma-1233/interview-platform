'use client';

import { create } from 'zustand';
import type { ProgrammingLanguage } from '@/types/interview';
import { MOCK_OUTPUTS, QUESTIONS } from '@/lib/mockData';
import { MOCK_RUN_DELAY_MS } from '@/lib/constants';

interface CodingStore {
  code: string;
  language: ProgrammingLanguage;
  output: string | null;
  isRunning: boolean;
  questionIndex: number;

  setCode: (code: string) => void;
  setLanguage: (lang: ProgrammingLanguage) => void;
  runCode: () => void;
  resetCode: () => void;
  setQuestionIndex: (index: number) => void;
}

export const useCodingStore = create<CodingStore>((set, get) => ({
  code: '',
  language: 'javascript',
  output: null,
  isRunning: false,
  questionIndex: 0,

  setCode: (code) => set({ code }),

  setLanguage: (lang) => {
    const { questionIndex } = get();
    const q = QUESTIONS[questionIndex];
    const template = q?.codeTemplate?.[lang] ?? '';
    set({ language: lang, code: template, output: null });
  },

  runCode: () => {
    set({ isRunning: true, output: null });
    const { language } = get();
    setTimeout(() => {
      set({ isRunning: false, output: MOCK_OUTPUTS[language] ?? '> No output' });
    }, MOCK_RUN_DELAY_MS);
  },

  resetCode: () => {
    const { language, questionIndex } = get();
    const q = QUESTIONS[questionIndex];
    set({ code: q?.codeTemplate?.[language] ?? '', output: null, isRunning: false });
  },

  setQuestionIndex: (index) => {
    const q = QUESTIONS[index];
    const lang = get().language;
    set({ questionIndex: index, code: q?.codeTemplate?.[lang] ?? '', output: null });
  },
}));
