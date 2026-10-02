import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, type Easing } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppChoice } from '../WhatsAppChoice';
import { HeroShift } from '../motion/HeroShift';
import { useMediaQuery } from '../motion/useMediaQuery';
import { Button } from '../ui/liquid-glass-button';

const EASE = [0.22, 1, 0.36, 1] as const;

type Story = { values: number[]; at: number[]; ease: Easing[]; delay: number };

const storyTransition = ({ at, ease, delay }: Story) => {
  const duration = at[at.length - 1];
  return { duration, delay, ease, times: at.map((t) => t / duration) };
};

/**
 * >= 1024: the whole story, once, on a clock (seconds), starting just after the
 * headline has faded up. Each value is a beat boundary in HeroShift progress.
 */
const DESKTOP_STORY: Story = {
  delay: 0.5,
  values: [0, 0.27, 0.33, 0.37, 0.4, 0.64, 0.72, 0.82, 1],
  at: [0, 1.0, 2.2, 2.65, 3.2, 4.4, 5.1, 5.6, 6.3],
  ease: [
    'easeInOut', // card rides counter -> bench
    'linear', //    stalls in the unowned gap, dims, gap marker shows
    'easeOut', //   "Owner" tag slides on
    'linear', //    tag holds, card recovers
    'easeInOut', // card rides on to procurement
    'linear', //    approval hold
    'easeInOut', // cleared, card on to finance
    'easeOut', //   finance collects, audit rows draw
  ],
};

/** < 1024: the short draw (route, the stall at the bench, the owner tag) it has always played. */
const MOBILE_DRAW: Story = {
  delay: 0,
  values: [0, 0.3, 0.38, 0.5],
  at: [0, 1.216, 2.304, 3.2],
  ease: ['easeInOut', 'easeInOut', 'easeInOut'],
};

const HeroStageContent = () => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // The scene plays once, on time rather than scroll, the first time it comes
  // into view, and then rests on its settled final frame. Scroll never drives
  // or rewinds it. Reduced motion: HeroShift shows the settled frame instead.
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.35 });
  const sceneProgress = useMotionValue(0);
  useEffect(() => {
    if (shouldReduceMotion || !sceneInView) return;
    const story = isDesktop ? DESKTOP_STORY : MOBILE_DRAW;
    // Already under way (the viewport crossed 1024px mid-play, or after it):
    // rest on this layout's final frame instead of replaying from the start.
    if (sceneProgress.get() > 0) {
      sceneProgress.set(story.values[story.values.length - 1]);
      return;
    }
    const controls = animate(sceneProgress, story.values, storyTransition(story));
    return () => controls.stop();
  }, [isDesktop, shouldReduceMotion, sceneInView, sceneProgress]);

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
        <div className="max-w-5xl lg:max-w-none">
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
        </div>

        <div className="relative mt-4 w-full pb-12 sm:mt-6 lg:mt-0 lg:pb-9">
          <div ref={sceneRef} className="mx-auto aspect-[68/45] w-full max-w-xl sm:max-w-2xl lg:max-w-none">
            <HeroShift progress={sceneProgress} idle={isDesktop} />
          </div>
          <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-muted sm:tracking-[0.22em]">
            Signal → context → owner → approval → evidence
          </p>
        </div>
      </div>
    </section>
  );
};

// The scene no longer needs scroll, so the hero is not pinned: >= 1024 it is one
// screen-tall frame below the nav that scrolls away normally. The id is what the
// sticky audit bar watches.
export const Hero = () => (
  <div id="hero-scroll-stage" className="relative">
    <div className="relative flex w-full items-center justify-center overflow-visible lg:h-screen lg:overflow-hidden lg:pt-[calc(var(--nav-height)+0.25rem)]">
      <HeroStageContent />
    </div>
  </div>
);
