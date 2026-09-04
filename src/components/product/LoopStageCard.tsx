import type { LoopStage } from '../../content/loop';
import { AvailabilityBadge } from './AvailabilityBadge';

export const LoopStageCard = ({ stage }: { stage: LoopStage }) => (
  <article className="relative border-t border-gold/35 bg-transparent px-1 py-5 lg:min-h-48 lg:px-3">
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] font-bold text-accent">{stage.number}</span>
      {stage.availability !== 'live' && <AvailabilityBadge status={stage.availability} />}
    </div>
    <h3 className="mt-6 text-lg font-bold leading-tight text-primary">{stage.name}</h3>
    <p className="mt-3 text-sm leading-relaxed text-muted">{stage.description}</p>
  </article>
);
