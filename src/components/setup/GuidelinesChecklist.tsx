'use client';

import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

const GUIDELINES = [
  'I am in a quiet environment with minimal background noise',
  'My face is clearly visible and well-lit',
  'I understand that leaving the tab will be flagged',
  'I have read and agree to the interview instructions',
  'I am ready to begin the interview session',
];

interface Props {
  onAllChecked: (allChecked: boolean) => void;
}

export function GuidelinesChecklist({ onAllChecked }: Props) {
  const [checked, setChecked] = useState<boolean[]>(new Array(GUIDELINES.length).fill(false));

  const toggle = (i: number) => {
    const next = checked.map((c, idx) => (idx === i ? !c : c));
    setChecked(next);
    onAllChecked(next.every(Boolean));
  };

  return (
    <ul className="space-y-2.5">
      {GUIDELINES.map((g, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 cursor-pointer group"
          onClick={() => toggle(i)}
        >
          {checked[i] ? (
            <CheckSquare className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          ) : (
            <Square className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
          )}
          <span className={`text-sm leading-snug transition-colors ${checked[i] ? 'text-foreground' : 'text-muted-foreground'}`}>
            {g}
          </span>
        </li>
      ))}
    </ul>
  );
}
