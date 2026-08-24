import { AgentGovernance } from './AgentGovernance';
import { SectionShell } from './SectionShell';

export const GovernedAI = () => (
  <SectionShell
    id="controlled-assistance"
    eyebrow="06 · CONTROLLED ASSISTANCE"
    headline="Automation stops where judgement starts."
    support="Strata Core is intended to support narrowly defined tasks with explicit permissions, human approval points and reviewable actions. The roles below are planned examples, not released assistants."
  >
    <AgentGovernance />
  </SectionShell>
);
