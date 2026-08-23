import type { LoopStage } from '../../content/loop';
import { AvailabilityBadge } from './AvailabilityBadge';

export const LoopStageCard = ({ stage }: { stage: LoopStage }) => (
  <article className="relative rounded-[20px] border border-line bg-surface p-5 lg:min-h-48">
    <span className="font-mono text-[11px] font-bold text-accent">{stage.number}</span>
    <h3 className="mt-5 text-xl font-bold text-primary">{stage.name}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
    {stage.availability !== 'live' && <div className="mt-4"><AvailabilityBadge status={stage.availability} /></div>}
  </article>
);
