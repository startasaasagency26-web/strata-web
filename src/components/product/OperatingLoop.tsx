import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { loopStages } from '../../content/loop';
import { LoopStageCard } from './LoopStageCard';
import { SectionShell } from './SectionShell';

const STEP_MS = 2200;

export const OperatingLoop = () => {
  const shouldReduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  // Draw the connector once; cycle the active step only while the loop is on screen.
  const drawn = useInView(gridRef, { once: true, amount: 0.3 });
  const onScreen = useInView(gridRef, { amount: 0.1 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !onScreen) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % loopStages.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, onScreen]);

  return (
    <SectionShell
      id="operating-loop"
      eyebrow="04 · ONE CONTROLLED LOOP"
      headline="Make every handoff visible from signal to outcome."
      support="This simulated sequence shows the operating principle behind a controlled workflow. Every stage is part of the Strata Core product direction and remains planned."
      tone="surface2"
    >
      <div ref={gridRef} className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <div className="absolute left-[8%] right-[8%] top-9 hidden h-px bg-line lg:block" aria-hidden="true">
          <motion.div
            className="h-full w-full origin-left bg-gold/70"
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={shouldReduceMotion || drawn ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {loopStages.map((stage, index) => (
          <LoopStageCard key={stage.number} stage={stage} active={Boolean(shouldReduceMotion) || index === active} />
        ))}
      </div>
    </SectionShell>
  );
};
