import { loopStages } from '../../content/loop';
import { LoopStageCard } from './LoopStageCard';
import { SectionShell } from './SectionShell';

export const OperatingLoop = () => (
  <SectionShell
    id="operating-loop"
    eyebrow="04 · ONE CONTROLLED LOOP"
    headline="Make every handoff visible from signal to outcome."
    support="This simulated sequence shows the operating principle behind a controlled workflow. Every stage is part of the Strata Core product direction and remains planned."
    tone="surface2"
  >
    <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <div className="absolute left-[8%] right-[8%] top-9 hidden h-px bg-line lg:block" aria-hidden="true" />
      {loopStages.map((stage) => <LoopStageCard key={stage.number} stage={stage} />)}
    </div>
  </SectionShell>
);
