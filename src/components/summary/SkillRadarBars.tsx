'use client';

import { motion } from 'framer-motion';
import { MOCK_SKILL_SCORES } from '@/lib/mockData';

export function SkillRadarBars() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">AI Skill Assessment</h3>
      <div className="space-y-3">
        {MOCK_SKILL_SCORES.map((skill, i) => (
          <div key={skill.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{skill.label}</span>
              <span className="text-muted-foreground tabular-nums">{skill.score}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${skill.color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${skill.score}%` }}
                transition={{ duration: 1.4, delay: i * 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
