export type Availability = 'live' | 'beta' | 'planned';

export interface OperatingModule {
  id: string;
  name: string;
  description: string;
  availability: Availability;
}

export const operatingModules: OperatingModule[] = [
  { id: 'capture', name: 'Capture', description: 'Create and organise lead records from one controlled workspace.', availability: 'live' },
  { id: 'qualify', name: 'Qualify', description: 'Record priority, status and the context behind the opportunity.', availability: 'live' },
  { id: 'route', name: 'Route', description: 'Move qualified work through a visible sales pipeline.', availability: 'live' },
  { id: 'follow-up', name: 'Follow up', description: 'Schedule, assign and complete follow-up work against each lead.', availability: 'live' },
  { id: 'operate', name: 'Operate', description: 'Coordinate cross-team actions from shared business rules.', availability: 'planned' },
  { id: 'learn', name: 'Learn', description: 'Turn outcomes into reusable operating context.', availability: 'planned' },
];
