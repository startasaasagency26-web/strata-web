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
  assignedTo?: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  notesCount: number;
  rawPayload: Record<string, unknown>;
}

export interface LeadNote {
  id: string;
  leadId: string;
  note: string;
  type: "system" | "user" | "call" | "email" | "whatsapp";
  createdBy: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  title: string;
  dueAt: string;
  status: "pending" | "completed" | "rescheduled";
  assignedTo: string;
  completedAt?: string;
  createdAt: string;
  leadName?: string;
  leadCompany?: string;
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
}

export interface CrmSettings {
  isConfigured: boolean;
  contactEmail: string;
  whatsappNumber: string;
  teamMembers: string[];
  leadStatuses: LeadStatus[];
}
