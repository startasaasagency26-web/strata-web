import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';

const BUILD_DURATION = 20;
const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_PROGRESS_STOPS = [
  0,
  4.5 / BUILD_DURATION,
  6.5 / BUILD_DURATION,
  8.5 / BUILD_DURATION,
  10.5 / BUILD_DURATION,
  12.5 / BUILD_DURATION,
  14.5 / BUILD_DURATION,
  17.5 / BUILD_DURATION,
  19.5 / BUILD_DURATION,
  1,
];
const SCROLL_Y_STOPS = ['0%', '0%', '-20%', '-20%', '-40%', '-40%', '-60%', '-60%', '0%', '0%'];

const GRID_LOOP: TargetAndTransition = {
  opacity: [0.14, 0.36, 0.22, 0.3, 0.16],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const FRAME_LOOP: TargetAndTransition = {
  scale: [1, 1.006, 1],
  transition: {
    duration: 7.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const STATIC_BUILD_STATE: TargetAndTransition = { opacity: 1, y: 0 };
const STATIC_BAR_STATE: TargetAndTransition = { opacity: 0.55, scaleX: 1, x: 0 };
const STATIC_PULSE_STATE: TargetAndTransition = { opacity: 0.3, scale: 1 };

const getBuildAnim = (startSec: number, animationActive: boolean): TargetAndTransition => {
  if (!animationActive) return STATIC_BUILD_STATE;

  const start = startSec / BUILD_DURATION;
  const fadeIn = (startSec + 0.8) / BUILD_DURATION;
  const fadeOutStart = 18.5 / BUILD_DURATION;
  const fadeOutEnd = 19 / BUILD_DURATION;

  return {
    opacity: [0.18, 0.18, 1, 1, 0.18, 0.18],
    y: [18, 18, 0, 0, -8, -8],
    transition: {
      duration: BUILD_DURATION,
      repeat: Infinity,
      ease: PREMIUM_EASE,
      times: [0, start, fadeIn, fadeOutStart, fadeOutEnd, 1],
    },
  };
};

const getBarAnim = (animationActive: boolean, delay = 0): TargetAndTransition => {
  if (!animationActive) return STATIC_BAR_STATE;

  return {
    opacity: [0.26, 0.68, 0.42, 0.58, 0.3],
    scaleX: [0.52, 1, 0.74, 0.92, 0.58],
    x: [-2, 1.5, 0, 1, -1],
    transition: {
      duration: 5.8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };
};

const getPulseAnim = (animationActive: boolean, delay = 0): TargetAndTransition => {
  if (!animationActive) return STATIC_PULSE_STATE;

  return {
    opacity: [0.22, 0.6, 0.28],
    scale: [1, 1.12, 1],
    transition: {
      duration: 3.8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };
};

const BuildPill = ({
  label,
  className = '',
  animate,
}: {
  label: string;
  className?: string;
  animate: TargetAndTransition;
}) => (
  <motion.div
    animate={animate}
    className={`absolute z-30 whitespace-nowrap rounded-full border border-white/20 bg-white px-4 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-black shadow-xl ${className}`}
  >
    {label}
  </motion.div>
);

export const BrowserBuilder = ({ className = '' }: { className?: string }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const wasAnimationActiveRef = useRef(false);
  const loopStartTimeRef = useRef<number | null>(null);
  const [loopRunId, setLoopRunId] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const isMockupInView = useInView(rootRef, {
    amount: 0.22,
    margin: '-8% 0px -8% 0px',
  });
  const animationActive = isMockupInView && !reduceMotion;
  const { scrollYProgress } = useScroll();
  const loopProgress = useMotionValue(0);
  const loopY = useTransform(loopProgress, SCROLL_PROGRESS_STOPS, SCROLL_Y_STOPS);
  const parallaxY = useTransform(scrollYProgress, [0, 0.12, 0.24], [10, -7, 4]);
  const parallaxRotateX = useTransform(scrollYProgress, [0, 0.12, 0.24], [2, 0, -1.4]);

  useEffect(() => {
    if (animationActive && !wasAnimationActiveRef.current) {
      loopStartTimeRef.current = null;
      loopProgress.set(0);
      setLoopRunId((current) => current + 1);
    }

    if (!animationActive) {
      loopStartTimeRef.current = null;
      loopProgress.set(0);
    }

    wasAnimationActiveRef.current = animationActive;
  }, [animationActive, loopProgress]);

  useAnimationFrame((time) => {
    if (!animationActive) return;

    if (loopStartTimeRef.current === null) {
      loopStartTimeRef.current = time;
    }

    const elapsedSeconds = ((time - loopStartTimeRef.current) / 1000) % BUILD_DURATION;
    loopProgress.set(elapsedSeconds / BUILD_DURATION);
  });

  const buildAnim = (delay: number) => getBuildAnim(delay, animationActive);
  const barAnim = (delay = 0) => getBarAnim(animationActive, delay);
  const pulseAnim = (delay = 0) => getPulseAnim(animationActive, delay);
  const frameAnim = animationActive ? FRAME_LOOP : { opacity: 1, scale: 1 };
  const gridAnim = animationActive ? GRID_LOOP : { opacity: 0.18 };

  return (
    <div
      ref={rootRef}
      data-browser-builder
      data-browser-in-view={isMockupInView ? 'true' : 'false'}
      data-browser-animation-active={animationActive ? 'true' : 'false'}
      data-browser-loop-run={loopRunId}
      className={`relative perspective-[1200px] ${className}`}
    >
      {/* Outer Browser Window */}
      <motion.div
        data-browser-frame
        key={`browser-frame-${loopRunId}`}
        animate={frameAnim}
        style={reduceMotion ? undefined : { y: parallaxY, rotateX: parallaxRotateX }}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A0A]/85 shadow-[0_40px_120px_-20px_rgba(0,0,0,1)] backdrop-blur-3xl md:rounded-[32px]"
      >
        {/* Browser Header */}
        <div className="relative z-40 flex h-10 shrink-0 items-center border-b border-white/10 bg-white/[0.04] px-4 md:h-12 md:px-6">
          <div className="flex gap-2">
            {[0, 0.35, 0.7].map((delay) => (
              <motion.div
                key={delay}
                animate={pulseAnim(delay)}
                className="h-2.5 w-2.5 rounded-full bg-white/20"
              />
            ))}
          </div>
          <div className="absolute left-1/2 flex h-5 w-1/3 -translate-x-1/2 items-center rounded-full border border-white/10 bg-white/5 px-3 md:w-1/4">
            <motion.div animate={pulseAnim(1.1)} className="mr-2 h-1.5 w-1.5 rounded-full bg-white/10" />
            <motion.div
              animate={barAnim(0.2)}
              style={{ originX: 0 }}
              className="h-1 w-full rounded-full bg-white/5"
            />
          </div>
        </div>

        {/* Browser Canvas */}
        <div className="relative flex-1 overflow-hidden bg-[#050505]">
          {/* Engineering Grid Overlay */}
          <motion.div
            data-browser-grid
            key={`browser-grid-${loopRunId}`}
            animate={gridAnim}
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center top',
            }}
          />

          {/* Scrolling Content Wrapper */}
          <motion.div
            data-browser-scroll
            key={`browser-scroll-${loopRunId}`}
            style={{ y: loopY }}
            className="absolute left-0 right-0 top-0 z-10 flex origin-top flex-col"
          >
            {/* Stage 1: DESIGN */}
            <section className="relative flex w-full shrink-0 flex-col gap-6 border-b border-white/5 bg-black/20 p-6 md:p-10">
              <BuildPill label="DESIGN" animate={buildAnim(0.8)} className="right-6 top-10 md:right-10" />

              <motion.div animate={buildAnim(0.5)} className="flex w-full items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <motion.div animate={pulseAnim(0.15)} className="h-5 w-5 rounded-sm bg-white" />
                  <motion.div
                    animate={barAnim(0.35)}
                    style={{ originX: 0 }}
                    className="h-1.5 w-16 rounded-full bg-white/30"
                  />
                </div>
                <motion.div animate={pulseAnim(0.7)} className="h-6 w-20 rounded-full bg-white" />
              </motion.div>

              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <motion.div animate={buildAnim(1.2)} className="h-10 w-3/4 rounded-lg bg-white" />
                <motion.div animate={buildAnim(1.4)} className="h-10 w-1/2 rounded-lg bg-white/40" />
                <motion.div
                  animate={barAnim(0.9)}
                  style={{ originX: 0 }}
                  className="mt-2 h-2 w-1/3 rounded-full bg-white/20"
                />
                <motion.div
                  animate={buildAnim(1.8)}
                  className="relative mt-6 aspect-[16/6] w-[85%] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent"
                >
                  <motion.div
                    animate={animationActive ? { opacity: [0.18, 0.44, 0.22], scale: [1, 1.03, 1] } : { opacity: 0.28, scale: 1 }}
                    transition={{ duration: 6.5, repeat: animationActive ? Infinity : 0, ease: 'easeInOut' }}
                    className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
                  />
                </motion.div>
              </div>
            </section>

            {/* Stage 2: DEVELOP */}
            <section className="relative flex w-full shrink-0 flex-col gap-8 border-b border-white/5 bg-white/[0.01] p-6 md:p-10">
              <BuildPill label="DEVELOP" animate={buildAnim(4.0)} className="right-6 top-10 md:right-10" />

              <motion.div animate={buildAnim(4.5)} className="h-6 w-40 rounded bg-white" />
              <div className="grid grid-cols-2 gap-4">
                {[4.8, 5.0, 5.2, 5.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={buildAnim(delay)}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <motion.div animate={pulseAnim(i * 0.25)} className="h-6 w-6 rounded bg-white/10" />
                    <motion.div animate={barAnim(i * 0.2)} style={{ originX: 0 }} className="h-2 w-3/4 rounded-full bg-white/60" />
                    <motion.div animate={barAnim(i * 0.3)} style={{ originX: 0 }} className="h-1 w-full rounded-full bg-white/20" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={buildAnim(5.8)}
                className="space-y-2 rounded-lg border border-white/5 bg-black p-4 font-mono text-[8px] text-white/40"
              >
                <motion.div animate={barAnim(0.1)} style={{ originX: 0 }} className="h-1.5 w-1/2 rounded-full bg-white/10" />
                <motion.div animate={barAnim(0.35)} style={{ originX: 0 }} className="h-1.5 w-3/4 rounded-full bg-white/10" />
                <motion.div animate={barAnim(0.6)} style={{ originX: 0 }} className="h-1.5 w-2/3 rounded-full bg-white/10" />
              </motion.div>
            </section>

            {/* Stage 3: OPTIMIZE */}
            <section className="relative flex w-full shrink-0 flex-col gap-10 border-b border-white/5 p-6 md:p-10">
              <BuildPill label="OPTIMIZE" animate={buildAnim(9.0)} className="right-6 top-10 md:right-10" />

              <div className="flex flex-col gap-4">
                <motion.div animate={buildAnim(9.5)} className="h-8 w-56 rounded bg-white" />
                <motion.div animate={barAnim(0.15)} style={{ originX: 0 }} className="h-2.5 w-3/4 rounded-full bg-white/30" />
              </div>

              <div className="flex justify-between gap-4 py-4">
                {[10.0, 10.3, 10.6].map((delay, i) => (
                  <motion.div key={i} animate={buildAnim(delay)} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-white/10">
                      <motion.div
                        animate={animationActive ? { rotate: 360, opacity: [0.45, 0.8, 0.45] } : { rotate: 0, opacity: 0.55 }}
                        transition={{ duration: 8 + i, repeat: animationActive ? Infinity : 0, ease: 'linear' }}
                        className="h-8 w-8 rounded-full border border-white/40 border-t-white"
                      />
                    </div>
                    <motion.div animate={barAnim(i * 0.2)} style={{ originX: 0 }} className="h-2 w-12 rounded-full bg-white/40" />
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {[11.0, 11.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={buildAnim(delay)}
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4"
                  >
                    <motion.div animate={barAnim(i * 0.25)} style={{ originX: 0 }} className="h-2 w-1/3 rounded-full bg-white/40" />
                    <motion.div animate={pulseAnim(i * 0.35)} className="h-4 w-10 rounded bg-white/80" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Stage 4: SCALE */}
            <section className="relative flex w-full shrink-0 flex-col gap-10 p-6 pb-20 md:p-10">
              <BuildPill label="SCALE" animate={buildAnim(14.0)} className="right-6 top-10 md:right-10" />

              <div className="flex flex-col items-center gap-6 py-10 text-center">
                <motion.div animate={buildAnim(14.5)} className="h-12 w-3/4 rounded-xl bg-white" />
                <motion.div animate={barAnim(0.3)} style={{ originX: 0 }} className="h-4 w-1/2 rounded-full bg-white/30" />
                <motion.div animate={buildAnim(15.2)} className="mt-4 flex gap-4">
                  <motion.div animate={pulseAnim(0.2)} className="h-10 w-24 rounded-full bg-white" />
                  <motion.div animate={pulseAnim(0.6)} className="h-10 w-24 rounded-full border border-white/20" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[15.5, 15.8].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={buildAnim(delay)}
                    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <motion.div animate={barAnim(i * 0.15)} style={{ originX: 0 }} className="h-2 w-1/3 rounded-full bg-white/20" />
                    <motion.div animate={pulseAnim(i * 0.3)} className="h-6 w-full rounded bg-white/80" />
                    <motion.div animate={barAnim(i * 0.35)} style={{ originX: 0 }} className="mt-2 h-10 w-full rounded-full bg-white/10" />
                  </motion.div>
                ))}
              </div>

              {/* Final Bottom Banner */}
              <motion.div
                animate={buildAnim(16.5)}
                className="mt-10 flex w-full flex-col items-center gap-4 rounded-[32px] bg-white py-16 text-black"
              >
                <motion.div animate={pulseAnim(0.2)} className="h-8 w-1/2 rounded bg-black" />
                <div className="flex h-10 w-28 items-center justify-center rounded-full bg-black text-[10px] font-bold uppercase tracking-widest text-white">
                  Start Project
                </div>
              </motion.div>
            </section>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
