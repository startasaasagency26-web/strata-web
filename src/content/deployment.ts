import type { Availability } from './operating-layer';

export interface DeploymentStep {
  number: string;
  name: string;
  description: string;
  availability: Availability;
}

export const deploymentSteps: DeploymentStep[] = [
  { number: '01', name: 'Choose the loop', description: 'Select one business workflow with a clear owner and outcome.', availability: 'planned' },
  { number: '02', name: 'Map the context', description: 'Define the records, decisions and exceptions the loop needs.', availability: 'planned' },
  { number: '03', name: 'Set the rules', description: 'Make permissions, approvals and handoffs explicit.', availability: 'planned' },
  { number: '04', name: 'Run with people', description: 'Launch the workflow with human control at every decision boundary.', availability: 'planned' },
  { number: '05', name: 'Extend carefully', description: 'Add new loops only after the operating record is reliable.', availability: 'planned' },
];
