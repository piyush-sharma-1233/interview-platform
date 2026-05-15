'use client';

import { PageTransition } from '@/components/layout/PageTransition';
import { ProblemStatement } from './ProblemStatement';
import { CodeEditorPanel } from './CodeEditorPanel';
import { MockOutputPanel } from './MockOutputPanel';
import { CodingActionBar } from './CodingActionBar';
import { LanguageSelector } from './LanguageSelector';
import { FocusWarningToast } from '@/components/interview/FocusWarningToast';
import { useFocusWarning } from '@/hooks/useFocusWarning';
import { Separator } from '@/components/ui/separator';

export function CodingScreen() {
  const { showWarning, warningCount } = useFocusWarning(true);

  return (
    <PageTransition>
      <FocusWarningToast show={showWarning} count={warningCount} />
      <div className="h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Problem Statement */}
        <div className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-border/40 overflow-y-auto bg-background flex-shrink-0 max-h-64 lg:max-h-none">
          <ProblemStatement />
        </div>

        {/* Right: Editor + Output + Action Bar */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e]">
          {/* Editor toolbar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <Separator orientation="vertical" className="h-4 bg-[#3c3c3c] mx-1" />
            <LanguageSelector />
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 flex flex-col min-h-0">
            <CodeEditorPanel />
            <MockOutputPanel />
          </div>

          {/* Action bar */}
          <CodingActionBar />
        </div>
      </div>
    </PageTransition>
  );
}
