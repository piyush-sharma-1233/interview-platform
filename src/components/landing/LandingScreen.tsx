'use client';

import { PageTransition } from '@/components/layout/PageTransition';
import { HeroSection } from './HeroSection';
import { FeatureCards } from './FeatureCards';

export function LandingScreen() {
  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 py-12 gap-12 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-radial-dark pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 translate-x-24 w-[400px] h-[200px] bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />

        <HeroSection />
        <FeatureCards />
      </div>
    </PageTransition>
  );
}
