import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
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
      className="relative min-h-screen w-full scroll-mt-[var(--section-scroll-offset)] overflow-hidden py-24 lg:pb-0 lg:pt-48"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(var(--gold)/0.12),transparent_40%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center px-5 sm:px-8 md:px-12 lg:min-h-[calc(100vh-12rem)]">
        <motion.div style={animateStage ? { opacity: contentOpacity } : undefined}>
          <div className="max-w-5xl">
          <motion.p {...fadeUp()} className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            STRATA CORE · AI OPERATING LAYER
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            id="hero-heading"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-primary"
          >
            Run the business from one shared operating layer.
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-xl">
            Strata Core connects customer signals, operating rules, team actions and governed AI in one system—so work moves with context, control and a visible record.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild variant="glassStrong" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                Book a demo <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <Link to="/#operating-layer">Explore the platform</Link>
            </Button>
          </motion.div>
          </div>
        </motion.div>

        <div className="mt-4 h-[300px] w-full sm:h-[320px] lg:mt-2 lg:h-[min(42vh,340px)]">
          <HeroShift progress={progress} />
        </div>
      </div>
    </section>
  );
};

export const Hero = () => (
  <ScrollStage id="hero-scroll-stage" heightVh={250}>
    {(progress) => <HeroStageContent progress={progress} />}
  </ScrollStage>
);
