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
  { id: 'urgent-request', trigger: 'A customer issue becomes urgent', instruction: 'Pause routine handling and alert the accountable owner.', owner: 'Service manager', example: 'WHEN urgency = critical\nTHEN require owner_review', availability: 'planned' },
  { id: 'discount', trigger: 'A discount exceeds the team limit', instruction: 'Request approval before any offer is confirmed.', owner: 'Commercial lead', example: 'WHEN discount > team_limit\nTHEN request approval', availability: 'planned' },
  { id: 'stock', trigger: 'Stock falls below the safe level', instruction: 'Prepare a replenishment request with current demand context.', owner: 'Inventory owner', example: 'WHEN stock < safe_level\nTHEN prepare replenishment', availability: 'planned' },
  { id: 'appointment', trigger: 'An appointment is missed', instruction: 'Create a recovery task and preserve the prior context.', owner: 'Service coordinator', example: 'WHEN attendance = missed\nTHEN create recovery_task', availability: 'planned' },
  { id: 'exception', trigger: 'A request falls outside policy', instruction: 'Stop the workflow and ask a person to decide.', owner: 'Department manager', example: 'WHEN policy_match = false\nTHEN require decision', availability: 'planned' },
  { id: 'handoff', trigger: 'A handoff passes its deadline', instruction: 'Surface the blocker to the current and next owners.', owner: 'Operations lead', example: 'WHEN handoff = overdue\nTHEN surface blocker', availability: 'planned' },
  { id: 'mismatch', trigger: 'Two source records disagree', instruction: 'Prevent the next action until the facts are reconciled.', owner: 'Data owner', example: 'WHEN records = mismatch\nTHEN pause action', availability: 'planned' },
  { id: 'audit', trigger: 'An approved action completes', instruction: 'Record who decided, what changed and the outcome.', owner: 'System owner', example: 'WHEN action = complete\nTHEN append audit_event', availability: 'planned' },
];
