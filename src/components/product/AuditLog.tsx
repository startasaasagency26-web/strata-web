import { motion, useTransform, type MotionValue } from 'framer-motion';
import { auditEntries } from '../../content/agents';
import { useStageProgress } from '../motion/useStageProgress';

interface AuditRowProps { index: number; rowProgress: MotionValue<number[]>; animate: boolean; }

const AuditRow = ({ index, rowProgress, animate }: AuditRowProps) => {
  const entry = auditEntries[index];
  const localProgress = useTransform(rowProgress, (values) => values[index] ?? 0);
  const opacity = useTransform(localProgress, [0, 1], [0, 1], { clamp: true });
  const y = useTransform(localProgress, [0, 1], [24, 0], { clamp: true });
  return (
    <motion.div style={animate ? { opacity, y } : undefined} className="grid gap-2 px-6 py-4 sm:grid-cols-[56px_1fr_auto] sm:items-center">
      <span className="font-mono text-[11px] text-white/45">{entry.time}</span>
      <div><p className="text-sm font-bold text-white">{entry.action}</p><p className="mt-1 text-[12px] text-white/55">{entry.actor}</p></div>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/65">{entry.result}</span>
    </motion.div>
  );
};

export const AuditLog = ({ progress, animate }: { progress: MotionValue<number>; animate: boolean }) => {
  const rowProgress = useStageProgress(progress, auditEntries.length);
  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-primary text-white">
      <div className="border-b border-white/10 px-6 py-4"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Illustrative audit record</p></div>
      <div className="divide-y divide-white/10">
        {auditEntries.map((entry, index) => <AuditRow key={`${entry.time}-${entry.action}`} index={index} rowProgress={rowProgress} animate={animate} />)}
      </div>
    </div>
  );
};
