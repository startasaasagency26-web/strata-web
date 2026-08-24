import { loopStages } from '../../content/loop';
import { LoopStageCard } from './LoopStageCard';
import { SectionShell } from './SectionShell';

export const OperatingLoop = () => (
  <SectionShell
    id="revenue-flow"
    eyebrow="05 · THE REVENUE FLOW"
    headline="Follow the work from first message to revenue."
    support="The product direction connects each commercial handoff so a conversation can become a customer, opportunity, appointment, sale and measurable revenue without losing its history. Every stage shown here is planned."
    tone="surface2"
  >
    <div className="relative grid gap-4 lg:grid-cols-7">
      <div className="absolute left-[7%] right-[7%] top-9 hidden h-px bg-line lg:block" aria-hidden="true" />
      {loopStages.map((stage) => <LoopStageCard key={stage.number} stage={stage} />)}
    </div>
  </SectionShell>
);
