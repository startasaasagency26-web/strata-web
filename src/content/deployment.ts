export interface DeploymentStep {
  number: string;
  name: string;
  description: string;
}

export const deploymentSteps: DeploymentStep[] = [
  { number: '01', name: 'Current workflow', description: 'The real path from trigger to outcome, including workarounds and exceptions.' },
  { number: '02', name: 'People and systems', description: 'The owners, tools, records, handoffs and approvals involved at every stage.' },
  { number: '03', name: 'Priority gap', description: 'The highest-cost break in visibility, ownership or follow-through.' },
  { number: '04', name: 'Baseline and intervention', description: 'A practical way to measure the gap and the first improvement worth testing.' },
  { number: '05', name: 'Future state and fit', description: 'A one-page controlled workflow and a clear decision on what should happen next.' },
];
