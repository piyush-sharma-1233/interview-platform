import type { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.22 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -24 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: 24 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.92 },
};

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const skillBarVariant = (targetPct: number): Variants => ({
  initial: { width: '0%' },
  animate: { width: `${targetPct}%`, transition: { duration: 1.4, ease: 'easeOut' } },
});

export const circleVariant = (targetOffset: number): Variants => ({
  initial: { strokeDashoffset: 251.3 },
  animate: { strokeDashoffset: targetOffset, transition: { duration: 1.6, ease: 'easeOut' } },
});

export const toastVariant: Variants = {
  initial: { opacity: 0, y: -32, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -32, scale: 0.95, transition: { duration: 0.2 } },
};

export const outputSlideUp: Variants = {
  initial: { opacity: 0, y: 20, height: 0 },
  animate: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.32 } },
  exit: { opacity: 0, y: 20, height: 0, transition: { duration: 0.2 } },
};
