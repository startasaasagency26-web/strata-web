import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
import { ScrollStage } from '../motion/ScrollStage';
import { HeroShift } from '../motion/HeroShift';
import { useMediaQuery } from '../motion/useMediaQuery';
import { Button } from '../ui/liquid-glass-button';

const HeroStageContent = ({ progress }: { progress: MotionValue<number> }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const contentOpacity = useTransform(progress, [0, 0.6], [1, 0.15], { clamp: true });
  const animateStage = isDesktop && !shouldReduceMotion;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full overflow-hidden px-5 py-24 sm:px-8 md:px-12 lg:pb-0 lg:pt-48"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(0,102,204,0.13),transparent_34%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center lg:min-h-[calc(100vh-12rem)]">
        <motion.div style={animateStage ? { opacity: contentOpacity } : undefined}>
          <div className="max-w-5xl">
            <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
              STRATA CORE · AI OPERATING LAYER
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(2.75rem,6vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-primary"
            >
              Run the business from one shared operating layer.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Strata Core connects customer signals, operating rules, team actions and governed AI in one system—so work moves with context, control and a visible record.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
              <Button asChild variant="glassStrong" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                  Book a demo <ArrowRight size={14} />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                <Link to="/#operating-layer">Explore the platform</Link>
              </Button>
            </div>
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
