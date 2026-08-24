import { RuleGrid } from './RuleGrid';
import { SectionShell } from './SectionShell';

export const OperatingMemory = () => (
  <SectionShell
    id="business-rules"
    eyebrow="04 · COMPANY RULES"
    headline="Take critical decisions out of people's heads."
    support="Strata Core is intended to make recurring instructions, exceptions and approval boundaries visible to the people doing the work. The examples below illustrate the direction; this capability is planned."
  >
    <RuleGrid />
  </SectionShell>
);
