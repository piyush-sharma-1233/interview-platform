'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ProgrammingLanguage } from '@/types/interview';
import { useCodingStore } from '@/store/codingStore';

const LANGUAGES: { value: ProgrammingLanguage; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useCodingStore();

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as ProgrammingLanguage)}>
      <SelectTrigger className="w-36 h-8 text-xs bg-[#1e1e1e] border-[#3c3c3c] text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[#252526] border-[#3c3c3c]">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value} className="text-white text-xs hover:bg-[#37373d] focus:bg-[#37373d]">
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
