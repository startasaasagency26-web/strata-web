import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { loopStages } from '../../content/loop';
import { ScrollStage } from '../motion/ScrollStage';
import { useMediaQuery } from '../motion/useMediaQuery';
import { useStageProgress } from '../motion/useStageProgress';
import { LoopStageCard } from './LoopStageCard';
import { SectionShell } from './SectionShell';

interface AnimatedLoopCardProps {
  progress: MotionValue<number>;
  stageProgress: MotionValue<number[]>;
  index: number;
  animate: boolean;
}

const AnimatedLoopCard = ({ progress, stageProgress, index, animate }: AnimatedLoopCardProps) => {
  const localProgress = useTransform(stageProgress, (values) => values[index] ?? 0);
  const opacity = useTransform(progress, (value) => {
    const activeIndex = Math.min(loopStages.length - 1, Math.floor(value * loopStages.length));
    if (activeIndex !== index) return 0.25;
    return Math.min(1, 0.25 + localProgress.get() * 0.75);
  });
  const y = useTransform(localProgress, [0, 1], [24, 0], { clamp: true });

  return (
    <motion.div style={animate ? { opacity, y } : undefined}>
      <LoopStageCard stage={loopStages[index]} />
    </motion.div>
  );
};

const OperatingLoopStage = ({ progress }: { progress: MotionValue<number> }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const stageProgress = useStageProgress(progress, loopStages.length);
  const railScale = useTransform(progress, [0, 1], [0, 1], { clamp: true });
  const animateStage = isDesktop && !shouldReduceMotion;

  return (
    <div className="w-full max-w-7xl px-5 sm:px-8 md:px-12">
      <div className="relative grid gap-4 lg:grid-cols-7">
        <div className="absolute left-[7%] right-[7%] top-9 hidden h-px bg-line lg:block" aria-hidden="true" />
        <motion.div
          className="absolute left-[7%] right-[7%] top-9 hidden h-px origin-left bg-accent lg:block"
          style={animateStage ? { scaleX: railScale } : undefined}
          aria-hidden="true"
        />
        {loopStages.map((stage, index) => (
          <AnimatedLoopCard key={stage.number} progress={progress} stageProgress={stageProgress} index={index} animate={animateStage} />
        ))}
      </div>
    </div>
  );
};

export const OperatingLoop = () => (
  <SectionShell
    id="operating-loop"
    eyebrow="05 · THE OPERATING LOOP"
    headline="One operating loop from signal to learning."
    support="Every stage stays visible. Live CRM steps are separated from planned decision, verification and learning layers so the product boundary is clear."
    tone="surface2"
  >
    <ScrollStage id="operating-loop-scroll-stage" heightVh={400}>
      {(progress) => <OperatingLoopStage progress={progress} />}
    </ScrollStage>
  </SectionShell>
);
