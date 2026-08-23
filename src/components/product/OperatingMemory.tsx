import { RuleGrid } from './RuleGrid';
import { SectionShell } from './SectionShell';

export const OperatingMemory = () => (
  <SectionShell
    id="operating-memory"
    eyebrow="04 · OPERATING MEMORY"
    headline="Rules your team can see, select and govern."
    support="Operating Memory is the planned policy layer for the instructions, boundaries and exceptions behind recurring work. It is shown here as a product model, not as a released capability."
  >
    <RuleGrid />
  </SectionShell>
);
