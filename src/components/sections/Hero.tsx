import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppChoice } from '../WhatsAppChoice';
import { HeroShift } from '../motion/HeroShift';
import { ScrollStage } from '../motion/ScrollStage';
import { useMediaQuery } from '../motion/useMediaQuery';
import { Button } from '../ui/liquid-glass-button';

const EASE = [0.22, 1, 0.36, 1] as const;

const HeroStageContent = ({ progress }: { progress: MotionValue<number> }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const contentOpacity = useTransform(progress, [0, 0.6], [1, 0.15], { clamp: true });
  const animateStage = isDesktop && !shouldReduceMotion;
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] w-full scroll-mt-[var(--section-scroll-offset)] overflow-hidden py-24 lg:h-full lg:min-h-0 lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(var(--gold)/0.12),transparent_40%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center px-5 sm:px-8 md:px-12 lg:h-full lg:min-h-0 lg:justify-start">
        <motion.div style={animateStage ? { opacity: contentOpacity } : undefined}>
          <div className="max-w-5xl">
          <motion.p {...fadeUp()} className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            BUSINESS OPERATIONS AUDIT · FOR ESTABLISHED SMEs
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            id="hero-heading"
            className="max-w-6xl text-balance text-[clamp(3rem,7.5vw,7rem)] font-black leading-[0.9] tracking-[-0.055em] text-primary lg:text-[clamp(3rem,min(7.5vw,10vh),7rem)]"
          >
            Find the workflow costing your business time, visibility and follow-through.
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mt-7 max-w-3xl text-pretty text-base leading-relaxed text-muted md:text-xl">
            Strata helps established Malaysian businesses map where quotations, orders, service requests and approvals stall—then defines the first controlled workflow worth improving.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild variant="glassStrong" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <WhatsAppChoice
                message="Hi Strata — I'd like to book a Business Operations Audit."
                source="home / hero-cta"
                className="flex items-center gap-2"
              >
                Business operations audit <ArrowRight size={14} />
              </WhatsAppChoice>
            </Button>
            <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <Link to="/#audit-outcome">See what the audit maps</Link>
            </Button>
          </motion.div>
          </div>
        </motion.div>

        <div className="relative mt-4 h-[300px] w-full pb-8 sm:h-[320px] lg:mt-2 lg:h-[clamp(180px,25vh,310px)] lg:min-h-0">
          <HeroShift progress={progress} />
          <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[10px] sm:tracking-[0.22em]">
            Signal → context → owner → approval → evidence
          </p>
        </div>
      </div>
    </section>
  );
};

export const Hero = () => (
  <ScrollStage id="hero-scroll-stage" heightVh={180}>
    {(progress) => <HeroStageContent progress={progress} />}
  </ScrollStage>
);
