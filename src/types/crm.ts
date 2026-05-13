export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "discovery_scheduled"
  | "proposal_sent"
  | "negotiating"
  | "won"
  | "lost"
  | "unresponsive";

export type LeadPriority = "hot" | "warm" | "cold";
export type LeadNoteType = "general" | "call" | "whatsapp" | "email" | "follow_up" | "system";
export type FollowUpStatus = "pending" | "completed" | "cancelled" | "overdue";
export type ContactMethod = "whatsapp" | "email" | "call";

export interface CrmProfileSummary {
  id: string;
  email?: string;
  fullName: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  whatsappPhone: string;
  roleInBusiness: string;
  countryTimezone: string;
  preferredLanguage: string;
  businessType: string;
  serviceNeed: string;
  websiteUrl?: string;
  currentProblem?: string;
  projectGoal?: string;
  budgetRange: string;
  selectedPackage?: string;
  timeline: string;
  sourcePage: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string | null;
  assignedProfile?: CrmProfileSummary | null;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  notesCount: number;
  rawPayload: Record<string, unknown>;
}

export interface LeadNote {
  id: string;
  leadId: string;
  note: string;
  type: LeadNoteType;
  createdBy: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  title: string;
  dueAt: string;
  status: FollowUpStatus;
  assignedTo?: string | null;
  assignedProfile?: CrmProfileSummary | null;
  completedAt?: string;
  createdAt: string;
  leadName?: string;
  leadCompany?: string;
  contactMethod?: ContactMethod;
  notes?: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  proposalSent: number;
  won: number;
  lost: number;
  conversionRate: number;
  leadsThisWeek: number;
  followUpsToday: number;
  pipelineValue: number | null;
}

export type CrmRole = "admin" | "manager";

export interface CrmUserProfile {
  id: string;
  email: string;
  fullName: string;
  role: CrmRole;
  status: "active" | "invited" | "disabled";
  createdAt: string;
  updatedAt: string;
}

export interface CrmPermissions {
  canManageTeam: boolean;
  canChangeRoles: boolean;
  canEditSettings: boolean;
  canAccessDangerZone: boolean;
  canEditLeads: boolean;
}

export interface CrmSettings {
  isConfigured: boolean;
  contactEmail: string;
  whatsappNumber: string;
  teamMembers: string[];
  leadStatuses: LeadStatus[];
}
