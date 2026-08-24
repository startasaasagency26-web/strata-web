import type { Availability } from './operating-layer';

export interface LoopStage {
  number: string;
  name: string;
  description: string;
  availability: Availability;
}

export const loopStages: LoopStage[] = [
  { number: '01', name: 'Conversation', description: 'A customer interaction enters with its source and context intact.', availability: 'planned' },
  { number: '02', name: 'Customer', description: 'The interaction is connected to the right customer history.', availability: 'planned' },
  { number: '03', name: 'Qualification', description: 'The team records fit, need and the decision behind the next step.', availability: 'planned' },
  { number: '04', name: 'Opportunity', description: 'Commercial ownership, value and next action become visible.', availability: 'planned' },
  { number: '05', name: 'Appointment', description: 'The agreed meeting or service commitment is tracked.', availability: 'planned' },
  { number: '06', name: 'Sale', description: 'The decision, terms and accountable owner are recorded.', availability: 'planned' },
  { number: '07', name: 'Revenue', description: 'The business can connect the outcome back to the work that produced it.', availability: 'planned' },
];
