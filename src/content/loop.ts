import type { Availability } from './operating-layer';

export interface LoopStage {
  number: string;
  name: string;
  description: string;
  availability: Availability;
}

export const loopStages: LoopStage[] = [
  { number: '01', name: 'Detect', description: 'A signal enters the operating layer.', availability: 'planned' },
  { number: '02', name: 'Record', description: 'The CRM keeps the lead and its context together.', availability: 'live' },
  { number: '03', name: 'Decide', description: 'A visible rule proposes the next step.', availability: 'planned' },
  { number: '04', name: 'Assign', description: 'Ownership is made explicit before work moves.', availability: 'planned' },
  { number: '05', name: 'Act', description: 'A person completes and records the approved action.', availability: 'live' },
  { number: '06', name: 'Verify', description: 'The system checks the outcome against policy.', availability: 'planned' },
  { number: '07', name: 'Learn', description: 'The result becomes reusable operating context.', availability: 'planned' },
];
