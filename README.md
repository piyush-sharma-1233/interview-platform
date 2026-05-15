# AI-Based Interview Platform UI

A polished, frontend-only UI for an AI-powered technical interview platform. Built as a 24-hour submission task showcasing modern React patterns, smooth animations, and production-quality UX.

---

## Project Overview

The platform guides a candidate through a complete interview lifecycle across 6 screens:

```
Landing → Candidate Details → Device Setup → AI Interview → Coding Challenge → Summary
```

All navigation state, answers, and transcript are held in memory (Zustand + sessionStorage) — no backend or API calls required.

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.3.0 |
| Component library | shadcn/ui v5 | latest |
| Animations | Framer Motion | 11.x |
| State management | Zustand | 5.x |
| Code editor | Monaco Editor (`@monaco-editor/react`) | 4.x |
| Theme switching | next-themes | 0.x |
| Icons | Lucide React | latest |
| Fonts | Inter + JetBrains Mono (next/font/google) | — |

> **Note:** shadcn v5 uses `@base-ui/react` (not Radix UI). Tailwind v4 uses CSS-first config via `@theme inline` — the theme lives in `globals.css`, not `tailwind.config.ts`.

---

## How to Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# http://localhost:3000  (or 3001 if 3000 is in use)
```

Production build:

```bash
npm run build
npm start
```

---

## Features Implemented

### Landing Screen (`/`)
- Animated hero with gradient "InterviewAI" brand text
- Feature cards (AI Questions, Real-time Analysis, Instant Feedback)
- Instructions modal with accordion sections (Rules, Environment, Scoring, Tips)
- Start Interview CTA

### Candidate Details (`/candidate`)
- Form: name, email, target role, experience level
- Custom skill tag input — type and press Enter/comma to add, Backspace to remove
- Resume drag-and-drop zone (UI only — no upload)
- Form validation before advancing

### Device Setup (`/setup`)
- Live webcam preview via `getUserMedia`
- Real microphone level bars via `AudioContext` + `AnalyserNode` (8 bars)
- Internet connectivity status (navigator.onLine + events)
- Manual guidelines checklist (5 items must all be checked to proceed)

### AI Interview Screen (`/interview`)
- AI avatar with 3 pulsing concentric rings (speaking state animation)
- Question typewriter animation (28ms/char, resets on question change)
- Countdown timer: green → yellow → red at thresholds
- Recording indicator with animated waveform bars
- Question progress bar ("Question 3 of 10") + difficulty badge (Easy/Medium/Hard)
- Live webcam preview in sidebar
- Confidence score meter (per-question mock values)
- Collapsible transcript panel (AI messages in blue, candidate in purple)
- Auto-save status ("Saved 8s ago", updates every 30s)
- Tab/focus loss detection — toast warning appears after 2s of being away

### Coding Challenge (`/coding`)
- Triggered automatically when a coding-type question is reached
- Split layout: problem statement (left) + Monaco editor (right)
- Problem panel: title, description, input/output examples, hint accordion
- Monaco editor: always `vs-dark` theme, macOS window chrome
- Language selector: JavaScript, Python, Java, C++ — switches code template automatically
- Run Code button with 800ms mock delay and language-specific sample output
- Slide-up output panel with PASS/FAIL result styling
- Question step indicator ("Q 9 / 10") in the action bar
- Tab-switch detection (same warning as interview screen)
- Dedicated 5-minute countdown timer

### Summary Screen (`/summary`)
- Stats grid: Questions Attempted, Time Taken, Skipped
- Skill radar as animated fill bars (Communication, Problem Solving, Technical, Adaptability) — staggered Framer Motion entrance
- Circular SVG confidence score with stroke-dashoffset animation (76%)
- Strengths list (green checkmarks) and Improvements list (yellow warnings)
- "Submitted for Review" gradient status banner

---

## Extra Features

- **Dark/light theme toggle** — persistent via next-themes, defaults to dark
- **Framer Motion page transitions** — smooth fade+slide between all 6 routes
- **Real browser APIs** — actual camera/microphone streams, no mocks
- **Tab-focus warning** — `visibilitychange` event with 2s debounce, violation counter shown on every warning
- **Monaco Editor** — full VS Code editor experience with syntax highlighting and IntelliSense
- **Zustand sessionStorage persistence** — progress survives page refresh
- **Mobile responsive** — stacked layout on small screens, sidebar becomes a bottom sheet
- **Custom animations** — pulse rings, waveform bars, typewriter cursor, floating elements
- **Custom scrollbar styling** — subtle 6px scrollbar across the app

---

## Assumptions Made

- **Frontend-only** — all data (questions, feedback, scores) is mocked in `src/lib/mockData.ts`
- **No authentication** — candidate info is entered fresh each session
- **Camera/mic permissions** — setup screen shows real streams when granted, graceful fallback UI when denied
- **Coding questions** are questions 9 and 10 (indices 8–9) in the mock dataset
- **Confidence scores** are pre-defined per question (mock AI scoring)
- **Resume upload** is UI-only — no file is actually processed or stored

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + layout
├── components/
│   ├── layout/             # TopBar, ThemeToggle, PageTransition
│   ├── landing/            # LandingScreen, HeroSection, FeatureCards, InstructionsModal
│   ├── candidate/          # CandidateDetailsScreen, SkillTagInput, ResumeDropzone
│   ├── setup/              # InterviewSetupScreen, CameraPreview, MicLevelBars, etc.
│   ├── interview/          # InterviewScreen + all sub-components (14 components)
│   ├── coding/             # CodingScreen, CodeEditorPanel, ProblemStatement, etc.
│   └── summary/            # SummaryScreen + animated result components
├── hooks/                  # useCamera, useMicrophone, useCountdownTimer, useTypewriter, etc.
├── store/                  # interviewStore (Zustand), codingStore (Zustand)
├── lib/                    # mockData, constants, animations, utils
└── types/                  # interview.ts (all domain interfaces/enums)
```
