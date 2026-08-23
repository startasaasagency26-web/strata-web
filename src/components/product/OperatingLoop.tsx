import { loopStages } from '../../content/loop';
import { LoopStageCard } from './LoopStageCard';
import { SectionShell } from './SectionShell';

export const OperatingLoop = () => (
  <SectionShell
    id="operating-loop"
    eyebrow="05 · THE OPERATING LOOP"
    headline="One operating loop from signal to learning."
    support="Every stage stays visible. Live CRM steps are separated from planned decision, verification and learning layers so the product boundary is clear."
    tone="surface2"
  >
    <div className="relative grid gap-4 lg:grid-cols-7">
      <div className="absolute left-[7%] right-[7%] top-9 hidden h-px bg-line lg:block" aria-hidden="true" />
      {loopStages.map((stage) => <LoopStageCard key={stage.number} stage={stage} />)}
    </div>
  </SectionShell>
);
