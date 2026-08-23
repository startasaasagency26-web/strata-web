import type { Availability } from './operating-layer';

export interface OperatingRule {
  id: string;
  trigger: string;
  instruction: string;
  owner: string;
  example: string;
  availability: Availability;
}

export const operatingRules: OperatingRule[] = [
  { id: 'priority', trigger: 'Priority becomes hot', instruction: 'Place the lead at the top of the review queue.', owner: 'Sales lead', example: 'WHEN priority = hot\nTHEN queue = owner_review', availability: 'planned' },
  { id: 'follow-up', trigger: 'Follow-up becomes due', instruction: 'Surface the task with its lead context.', owner: 'Assigned owner', example: 'WHEN follow_up_at <= now\nTHEN surface lead_context', availability: 'planned' },
  { id: 'no-reply', trigger: 'No reply is recorded', instruction: 'Prepare the next approved contact step.', owner: 'Account owner', example: 'WHEN reply = none\nTHEN prepare next_step', availability: 'planned' },
  { id: 'qualified', trigger: 'Lead becomes qualified', instruction: 'Move the record into discovery preparation.', owner: 'Sales lead', example: 'WHEN status = qualified\nTHEN stage = discovery', availability: 'planned' },
  { id: 'proposal', trigger: 'Proposal is sent', instruction: 'Create a dated review checkpoint.', owner: 'Proposal owner', example: 'WHEN stage = proposal_sent\nTHEN create review_date', availability: 'planned' },
  { id: 'exception', trigger: 'Rule confidence is low', instruction: 'Stop and request a human decision.', owner: 'Manager', example: 'WHEN confidence < policy\nTHEN require approval', availability: 'planned' },
  { id: 'won', trigger: 'Opportunity is won', instruction: 'Open the approved onboarding path.', owner: 'Delivery lead', example: 'WHEN stage = won\nTHEN open onboarding', availability: 'planned' },
  { id: 'audit', trigger: 'A governed action runs', instruction: 'Write the decision and outcome to the audit record.', owner: 'System owner', example: 'WHEN action = executed\nTHEN append audit_event', availability: 'planned' },
];
