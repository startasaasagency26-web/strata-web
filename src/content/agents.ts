import type { Availability } from './operating-layer';

export interface GovernedAgent {
  name: string;
  remit: string;
  may: string[];
  mayNot: string[];
  availability: Availability;
}

export const governedAgents: GovernedAgent[] = [
  { name: 'Intake assistant', remit: 'Organise a new conversation into clear customer context for human review.', may: ['Draft a factual summary', 'Flag missing information'], mayNot: ['Send a customer message', 'Decide whether the customer qualifies'], availability: 'planned' },
  { name: 'Follow-up assistant', remit: 'Prepare the next approved communication with the relevant history attached.', may: ['Draft from approved guidance', 'Surface prior decisions'], mayNot: ['Contact without approval', 'Change prices or terms'], availability: 'planned' },
  { name: 'Pipeline analyst', remit: 'Highlight stalled opportunities and gaps that need human attention.', may: ['Flag stalled work', 'Explain the data used'], mayNot: ['Alter source records', 'Promise a revenue outcome'], availability: 'planned' },
];

export interface AuditEntry {
  time: string;
  actor: string;
  action: string;
  result: string;
}

export const auditEntries: AuditEntry[] = [
  { time: '09:12', actor: 'Intake assistant', action: 'Drafted customer context', result: 'Awaiting review' },
  { time: '09:16', actor: 'Operations lead', action: 'Approved the next owner', result: 'Recorded' },
  { time: '09:22', actor: 'Follow-up assistant', action: 'Prepared a response draft', result: 'Approval required' },
  { time: '09:31', actor: 'Account owner', action: 'Approved and completed action', result: 'Recorded' },
];
