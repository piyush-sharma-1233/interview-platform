'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Mic, Wifi, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageTransition } from '@/components/layout/PageTransition';
import { CameraPreview } from './CameraPreview';
import { MicLevelBars } from './MicLevelBars';
import { InternetStatus } from './InternetStatus';
import { GuidelinesChecklist } from './GuidelinesChecklist';
import { useInterviewStore } from '@/store/interviewStore';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function InterviewSetupScreen() {
  const router = useRouter();
  const startInterview = useInterviewStore((s) => s.startInterview);
  const [allChecked, setAllChecked] = useState(false);

  const handleBegin = () => {
    startInterview();
    router.push('/interview');
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-3xl space-y-6"
        >
          <motion.div variants={staggerItem} className="text-center">
            <h2 className="text-2xl font-bold">System Check</h2>
            <p className="text-muted-foreground text-sm mt-1">Step 2 of 3 — Verify your setup before starting</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div variants={staggerItem} className="space-y-5">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-500" /> Camera Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CameraPreview />
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-500" /> Microphone Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MicLevelBars />
                  <p className="text-xs text-muted-foreground mt-2">Speak a few words to test your microphone level</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-emerald-500" /> Internet Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InternetStatus />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="border-border/50 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-amber-500" /> Interview Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <GuidelinesChecklist onAllChecked={setAllChecked} />
                  <Separator />
                  <div className="rounded-md bg-muted/40 p-3 space-y-1.5 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">What to expect:</p>
                    <p>• 10 questions across behavioral and technical topics</p>
                    <p>• 2 minutes per question (5 min for coding)</p>
                    <p>• AI will analyze your responses in real time</p>
                    <p>• Results available immediately after submission</p>
                  </div>
                  <Button
                    onClick={handleBegin}
                    disabled={!allChecked}
                    className="w-full btn-gradient text-white border-0 gap-2 h-11 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Begin Interview
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  {!allChecked && (
                    <p className="text-xs text-muted-foreground text-center">Check all guidelines to continue</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
