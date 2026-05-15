'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageTransition } from '@/components/layout/PageTransition';
import { SkillTagInput } from './SkillTagInput';
import { ResumeDropzone } from './ResumeDropzone';
import { useInterviewStore } from '@/store/interviewStore';
import type { CandidateInfo, ExperienceLevel } from '@/types/interview';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface FormErrors { name?: string; email?: string; role?: string; experience?: string; skills?: string; }

export function CandidateDetailsScreen() {
  const router = useRouter();
  const setCandidateInfo = useInterviewStore((s) => s.setCandidateInfo);

  const [form, setForm] = useState<CandidateInfo>({
    name: '', email: '', role: '', experience: 'Mid', skills: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name is required (min 2 chars)';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.role.trim()) e.role = 'Role is required';
    if (!form.experience) e.experience = 'Please select your experience level';
    if (form.skills.length === 0) e.skills = 'Add at least one skill';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setCandidateInfo(form);
    router.push('/setup');
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-2xl"
        >
          <motion.div variants={staggerItem} className="text-center mb-6">
            <h2 className="text-2xl font-bold">Tell us about yourself</h2>
            <p className="text-muted-foreground text-sm mt-1">This information helps personalise your interview</p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Candidate Information</CardTitle>
                <CardDescription>Step 1 of 3 — Profile</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="role" className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" /> Role Applied For
                      </Label>
                      <Input
                        id="role"
                        placeholder="e.g. Frontend Engineer"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className={errors.role ? 'border-destructive' : ''}
                      />
                      {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label>Experience Level</Label>
                      <Select
                        value={form.experience}
                        onValueChange={(v) => setForm({ ...form, experience: v as ExperienceLevel })}
                      >
                        <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {(['Junior', 'Mid', 'Senior', 'Lead'] as ExperienceLevel[]).map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.experience && <p className="text-xs text-destructive">{errors.experience}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Skills / Technologies</Label>
                    <SkillTagInput
                      value={form.skills}
                      onChange={(skills) => setForm({ ...form, skills })}
                    />
                    {errors.skills && <p className="text-xs text-destructive">{errors.skills}</p>}
                    <p className="text-xs text-muted-foreground">Press Enter or comma to add a skill</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Resume (Optional)</Label>
                    <ResumeDropzone />
                  </div>

                  <Button type="submit" className="w-full btn-gradient text-white border-0 gap-2 h-11">
                    Continue to Setup
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
