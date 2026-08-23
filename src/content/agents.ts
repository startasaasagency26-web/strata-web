import type { Availability } from './operating-layer';

export interface GovernedAgent {
  name: string;
  remit: string;
  may: string[];
  mayNot: string[];
  availability: Availability;
}

export const governedAgents: GovernedAgent[] = [
  { name: 'Intake agent', remit: 'Structure new enquiry context for review.', may: ['Draft a lead summary', 'Flag missing fields'], mayNot: ['Send a customer message', 'Change commercial terms'], availability: 'planned' },
  { name: 'Follow-up agent', remit: 'Prepare the approved next step for a due task.', may: ['Draft within policy', 'Surface prior context'], mayNot: ['Contact without approval', 'Close an opportunity'], availability: 'planned' },
  { name: 'Pipeline analyst', remit: 'Find exceptions that need human attention.', may: ['Identify stalled records', 'Explain its source data'], mayNot: ['Reassign ownership', 'Alter source records'], availability: 'planned' },
];

export interface AuditEntry {
  time: string;
  actor: string;
  action: string;
  result: string;
}

export const auditEntries: AuditEntry[] = [
  { time: '09:12', actor: 'Intake agent', action: 'Drafted lead summary', result: 'Awaiting review' },
  { time: '09:16', actor: 'Sales lead', action: 'Approved lead priority', result: 'Recorded' },
  { time: '09:22', actor: 'Follow-up agent', action: 'Prepared next-step draft', result: 'Approval required' },
  { time: '09:31', actor: 'Account owner', action: 'Completed follow-up task', result: 'Recorded' },
];
