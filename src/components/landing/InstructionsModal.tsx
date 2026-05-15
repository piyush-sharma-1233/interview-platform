'use client';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Info } from 'lucide-react';

const sections = [
  {
    title: 'General Rules',
    content: 'Ensure you are in a quiet, well-lit environment. Keep your camera enabled throughout the session. Do not leave the browser tab during the interview — violations are recorded.',
  },
  {
    title: 'Technical Requirements',
    content: 'You need a working webcam and microphone. A stable internet connection of at least 5 Mbps is recommended. Use Chrome, Firefox, or Edge — latest version.',
  },
  {
    title: 'Coding Questions',
    content: 'For coding challenges, a built-in editor is provided. Select your preferred language, write your solution, and click "Run Code" to test before submitting. Pseudocode alone will not be accepted.',
  },
  {
    title: 'Submission',
    content: 'Once you end the interview, your answers are submitted automatically. You cannot re-enter the session. Ensure all answers are finalized before ending.',
  },
];

export function InstructionsModal() {
  return (
    <Dialog>
      <DialogTrigger
        className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors inline-flex items-center gap-1"
      >
        <Info className="w-3.5 h-3.5" />
        View Instructions
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Interview Instructions</DialogTitle>
        </DialogHeader>
        <Accordion className="w-full">
          {sections.map((s, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-sm font-medium">{s.title}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{s.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
