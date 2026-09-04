import type { Availability } from './operating-layer';

export interface LoopStage {
  number: string;
  name: string;
  description: string;
  availability: Availability;
}

export const loopStages: LoopStage[] = [
  { number: '01', name: 'Signal received', description: 'The request enters with its source and essential context intact.', availability: 'planned' },
  { number: '02', name: 'Context understood', description: 'The right record, history and exception details become visible.', availability: 'planned' },
  { number: '03', name: 'Work assigned', description: 'One accountable owner receives the next action and timing.', availability: 'planned' },
  { number: '04', name: 'Approval requested', description: 'A person reviews the decision at the agreed boundary.', availability: 'planned' },
  { number: '05', name: 'Action completed', description: 'The approved work moves forward without losing its history.', availability: 'planned' },
  { number: '06', name: 'Evidence logged', description: 'The outcome can be reviewed against the work that produced it.', availability: 'planned' },
];
