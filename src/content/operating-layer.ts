export type Availability = 'live' | 'beta' | 'planned';

export interface OperatingModule {
  id: string;
  name: string;
  description: string;
  availability: Availability;
}

export const operatingModules: OperatingModule[] = [
  { id: 'shared-core', name: 'Shared Core', description: 'A common foundation for business data, identity, permissions and audit history.', availability: 'planned' },
  { id: 'vertical-packs', name: 'Vertical Packs', description: 'Industry-specific definitions and workflow patterns built on the shared foundation.', availability: 'planned' },
  { id: 'company-rules', name: 'Company Rules', description: 'Each company’s policies, procedures, exceptions and approval boundaries.', availability: 'planned' },
  { id: 'assisted-roles', name: 'Assisted Roles', description: 'Bounded automation for defined tasks, with people retaining judgement and approval.', availability: 'planned' },
  { id: 'web-workspace', name: 'Web Workspace', description: 'The primary place for teams to review context, decisions and work in progress.', availability: 'planned' },
  { id: 'connected-channels', name: 'Connected Channels', description: 'Approved messaging, tools and data sources without making the platform web-dependent.', availability: 'planned' },
];
