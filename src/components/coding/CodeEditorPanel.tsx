'use client';

import dynamic from 'next/dynamic';
import { useCodingStore } from '@/store/codingStore';
import { Loader2 } from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
      <Loader2 className="w-6 h-6 text-[#858585] animate-spin" />
    </div>
  ),
});

const LANG_MAP: Record<string, string> = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
};

export function CodeEditorPanel() {
  const { code, language, setCode } = useCodingStore();

  return (
    <div className="flex-1 min-h-0">
      <MonacoEditor
        height="100%"
        language={LANG_MAP[language] ?? 'javascript'}
        value={code}
        onChange={(v) => setCode(v ?? '')}
        theme="vs-dark"
        options={{
          fontSize: 13,
          minimap: { enabled: false },
          lineNumbers: 'on',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          tabSize: 2,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
