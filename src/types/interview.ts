export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type QuestionType = 'behavioral' | 'technical' | 'coding';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type ProgrammingLanguage = 'javascript' | 'python' | 'java' | 'cpp';
export type Screen = 'landing' | 'candidate-details' | 'setup' | 'interview' | 'coding' | 'summary';

export interface CandidateInfo {
  name: string;
  email: string;
  role: string;
  experience: ExperienceLevel;
  skills: string[];
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  timeLimit: number;
  hints?: string[];
  codeTemplate?: Record<ProgrammingLanguage, string>;
  sampleInput?: string;
  expectedOutput?: string;
  problemTitle?: string;
  problemDescription?: string;
}

export interface Answer {
  questionIndex: number;
  text: string;
  codeSubmission?: string;
  language?: ProgrammingLanguage;
  timeUsed: number;
  skipped: boolean;
  submittedAt: Date;
}

export interface TranscriptEntry {
  questionIndex: number;
  speaker: 'ai' | 'candidate';
  text: string;
  timestamp: Date;
}

export interface SkillScore {
  label: string;
  score: number;
  color: string;
}
