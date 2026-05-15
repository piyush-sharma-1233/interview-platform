'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function SkillTagInput({ value, onChange, placeholder = 'e.g. React, TypeScript...', maxTags = 10 }: Props) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim().replace(/,+$/, '').trim();
    if (!trimmed || value.includes(trimmed) || value.length >= maxTags) return;
    onChange([...value, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring transition-shadow'
      )}
    >
      {value.map((tag, i) => (
        <Badge key={i} variant="secondary" className="gap-1 h-6 pl-2 pr-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="rounded-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      {value.length < maxTags && (
        <input
          className="flex-1 min-w-24 outline-none bg-transparent text-sm placeholder:text-muted-foreground"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => addTag(inputValue)}
          placeholder={value.length === 0 ? placeholder : ''}
        />
      )}
    </div>
  );
}
