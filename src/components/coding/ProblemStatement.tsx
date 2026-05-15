'use client';

import { QUESTIONS } from '@/lib/mockData';
import { useCodingStore } from '@/store/codingStore';
import { DifficultyBadge } from '@/components/interview/DifficultyBadge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Terminal, Lightbulb } from 'lucide-react';

export function ProblemStatement() {
  const questionIndex = useCodingStore((s) => s.questionIndex);
  const q = QUESTIONS[questionIndex];

  if (!q) return null;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto px-4 py-4">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-bold">{q.problemTitle ?? `Question ${questionIndex + 1}`}</h2>
        <DifficultyBadge difficulty={q.difficulty} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {q.problemDescription ?? q.text}
      </p>

      {(q.sampleInput || q.expectedOutput) && (
        <>
          <Separator className="opacity-40" />
          <div className="space-y-3">
            {q.sampleInput && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400">Example Input</span>
                </div>
                <pre className="text-xs bg-muted/60 rounded-md p-3 font-mono text-foreground overflow-x-auto">{q.sampleInput}</pre>
              </div>
            )}
            {q.expectedOutput && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Expected Output</span>
                </div>
                <pre className="text-xs bg-muted/60 rounded-md p-3 font-mono text-foreground overflow-x-auto">{q.expectedOutput}</pre>
              </div>
            )}
          </div>
        </>
      )}

      {q.hints && q.hints.length > 0 && (
        <Accordion>
          <AccordionItem value="hints" className="border-border/40">
            <AccordionTrigger className="text-xs gap-2 py-2">
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Hints ({q.hints.length})
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {q.hints.map((h, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                    {h}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
