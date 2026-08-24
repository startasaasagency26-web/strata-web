import { useState } from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { operatingRules, type OperatingRule } from '../../content/rules';
import { ScrollStage } from '../motion/ScrollStage';
import { useMediaQuery } from '../motion/useMediaQuery';
import { AvailabilityBadge } from './AvailabilityBadge';

interface AnimatedRuleCardProps {
  rule: OperatingRule;
  index: number;
  selectedId: string;
  selectRule: (id: string) => void;
  progress: MotionValue<number>;
  animate: boolean;
}

const AnimatedRuleCard = ({ rule, index, selectedId, selectRule, progress, animate }: AnimatedRuleCardProps) => {
  const isSelected = rule.id === selectedId;
  const x = useTransform(progress, [0, 0.5], [index % 2 === 0 ? 180 : -180, 0], { clamp: true });
  const y = useTransform(progress, [0, 0.5], [(3.5 - index) * 48, 0], { clamp: true });
  const opacity = useTransform(progress, [0, 0.5], [0.3, 1], { clamp: true });

  return (
    <motion.article style={animate ? { x, y, opacity } : undefined} className={`rounded-[22px] border p-4 focus-within:!transform-none focus-within:!opacity-100 ${isSelected ? 'border-accent bg-white shadow-[0_12px_32px_rgba(0,102,204,0.08)]' : 'border-line bg-white'}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-snug text-primary">{rule.trigger}</h3>
        {rule.availability !== 'live' && <AvailabilityBadge status={rule.availability} />}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{rule.instruction}</p>
      <button type="button" aria-pressed={isSelected} onClick={() => selectRule(rule.id)} className="mt-3 min-h-11 w-full rounded-full border border-primary/10 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
        {isSelected ? 'Selected rule' : 'Inspect rule'}
      </button>
    </motion.article>
  );
};

const RuleGridStage = ({ progress }: { progress: MotionValue<number> }) => {
  const [selectedId, setSelectedId] = useState(operatingRules[0].id);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const animateStage = isDesktop && !shouldReduceMotion;
  const selectedRule = operatingRules.find((rule) => rule.id === selectedId) ?? operatingRules[0];
  const panelOpacity = useTransform(progress, [0.5, 0.72], [0, 1], { clamp: true });
  const panelY = useTransform(progress, [0.5, 0.72], [16, 0], { clamp: true });

  return (
    <div className="grid w-full max-w-7xl gap-5 px-5 sm:px-8 md:px-12 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {operatingRules.map((rule, index) => (
          <AnimatedRuleCard key={rule.id} rule={rule} index={index} selectedId={selectedId} selectRule={setSelectedId} progress={progress} animate={animateStage} />
        ))}
      </div>
      <motion.div style={animateStage ? { opacity: panelOpacity, y: panelY } : undefined} className="overflow-hidden rounded-[24px] bg-primary text-white lg:self-start">
        <div className="border-b border-white/10 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Rule definition</div>
        <div aria-live="polite" className="p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Owner · {selectedRule.owner}</p>
          <h3 className="mt-4 text-2xl font-bold text-white">{selectedRule.trigger}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{selectedRule.instruction}</p>
          <pre className="mt-6 overflow-x-auto rounded-[16px] border border-white/10 bg-black/20 p-5 font-mono text-[12px] leading-7 text-white/80"><code>{selectedRule.example}</code></pre>
        </div>
      </motion.div>
    </div>
  );
};

export const RuleGrid = () => (
  <ScrollStage id="operating-memory-scroll-stage" heightVh={250}>
    {(progress) => <RuleGridStage progress={progress} />}
  </ScrollStage>
);
