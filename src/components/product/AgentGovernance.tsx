import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { Check, LockKeyhole } from 'lucide-react';
import { governedAgents } from '../../content/agents';
import { ScrollStage } from '../motion/ScrollStage';
import { useMediaQuery } from '../motion/useMediaQuery';
import { AvailabilityBadge } from './AvailabilityBadge';
import { AuditLog } from './AuditLog';

const AgentGovernanceStage = ({ progress }: { progress: MotionValue<number> }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const animateStage = isDesktop && !shouldReduceMotion;
  const agentsOpacity = useTransform(progress, [0, 0.25], [0.45, 1], { clamp: true });
  const agentsY = useTransform(progress, [0, 0.25], [18, 0], { clamp: true });
  return (
    <div className="grid w-full max-w-7xl gap-5 px-5 sm:px-8 md:px-12 lg:grid-cols-2 lg:items-start">
      <motion.div style={animateStage ? { opacity: agentsOpacity, y: agentsY } : undefined} className="space-y-3">
        {governedAgents.map((agent) => (
          <article key={agent.name} className="rounded-[24px] border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Defined remit</p><h3 className="mt-1 text-xl font-bold text-primary">{agent.name}</h3></div>
              {agent.availability !== 'live' && <AvailabilityBadge status={agent.availability} />}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{agent.remit}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div><p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-positive"><Check size={14} /> May</p><ul className="mt-1 space-y-1 text-sm text-muted">{agent.may.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-caution"><LockKeyhole size={14} /> May not</p><ul className="mt-1 space-y-1 text-sm text-muted">{agent.mayNot.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </article>
        ))}
      </motion.div>
      <AuditLog progress={progress} animate={animateStage} />
    </div>
  );
};

export const AgentGovernance = () => (
  <ScrollStage id="governed-ai-scroll-stage" heightVh={300}>
    {(progress) => <AgentGovernanceStage progress={progress} />}
  </ScrollStage>
);
