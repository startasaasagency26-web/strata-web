import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
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

  // Below 1024px the scroll stage is static, so instead of a still the scene
  // plays one short draw (route, the stall at the bench, the owner tag) the
  // first time it comes into view, and rests where the static stage always did.
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.35 });
  const drawProgress = useMotionValue(0);
  useEffect(() => {
    if (animateStage || shouldReduceMotion || !sceneInView) return;
    const controls = animate(drawProgress, [0, 0.3, 0.38, 0.5], {
      duration: 3.2,
      times: [0, 0.38, 0.72, 1],
      ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [animateStage, shouldReduceMotion, sceneInView, drawProgress]);
  const sceneProgress = animateStage ? progress : drawProgress;

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(var(--gold)/0.12),transparent_40%)] lg:bg-[radial-gradient(circle_at_68%_45%,rgb(var(--gold)/0.1),transparent_42%)]" aria-hidden="true" />
      {/* >= 1024: two columns — copy left, scene right (>= 700px wide at 1440). Top padding keeps the eyebrow >= 40px below the floating nav. */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center px-5 sm:px-8 md:px-12 lg:grid lg:h-full lg:min-h-0 lg:max-w-[1600px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:pb-10 lg:pt-12 lg:[align-items:safe_center]">
        <motion.div style={animateStage ? { opacity: contentOpacity } : undefined} className="max-w-5xl lg:max-w-none">
          <motion.p {...fadeUp()} className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            BUSINESS OPERATIONS AUDIT · FOR GROWING BUSINESSES
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            id="hero-heading"
            className="max-w-6xl text-balance text-[clamp(3rem,7.5vw,7rem)] font-black leading-[0.9] tracking-[-0.055em] text-primary hyphens-none max-[375px]:text-[clamp(2.25rem,11.5vw,3rem)] lg:text-[clamp(2.75rem,min(4.4vw,7.6vh),4.75rem)]"
          >
            Find the workflow costing your business time, visibility and <span className="whitespace-nowrap">follow-through.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mt-7 max-w-3xl text-pretty text-base leading-relaxed text-muted md:text-xl lg:mt-6 lg:max-w-xl lg:text-lg">
            Strata helps growing businesses map where quotations, orders, service requests and approvals stall—then defines the first controlled workflow worth improving.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
            <Button asChild variant="default" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
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
        </motion.div>

        <div className="relative mt-4 w-full pb-12 sm:mt-6 lg:mt-0 lg:pb-9">
          <div ref={sceneRef} className="mx-auto aspect-[68/45] w-full max-w-xl sm:max-w-2xl lg:max-w-none">
            <HeroShift progress={sceneProgress} idle={animateStage} />
          </div>
          <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-muted sm:tracking-[0.22em]">
            Signal → context → owner → approval → evidence
          </p>
        </div>
      </div>
    </section>
  );
};

export const Hero = () => (
  <ScrollStage id="hero-scroll-stage" heightVh={120}>
    {(progress) => <HeroStageContent progress={progress} />}
  </ScrollStage>
);
