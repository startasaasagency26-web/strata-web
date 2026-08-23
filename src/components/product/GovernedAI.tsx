import { AgentGovernance } from './AgentGovernance';
import { SectionShell } from './SectionShell';

export const GovernedAI = () => (
  <SectionShell
    id="governed-ai"
    eyebrow="06 · GOVERNED AI EMPLOYEES"
    headline="AI employees, with boundaries built in."
    support="Each planned AI role has a defined remit, explicit permissions and a human approval boundary. Actions are designed to be attributable and reviewable."
  >
    <AgentGovernance />
  </SectionShell>
);
