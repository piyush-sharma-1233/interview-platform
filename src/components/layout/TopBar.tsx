'use client';

import { Cpu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">InterviewAI</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
