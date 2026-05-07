import type { 
  Lead, 
  DashboardMetrics, 
  LeadNote, 
  FollowUp, 
  CrmSettings 
} from "../../types/crm";

// Mock data generator helpers
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
    fullName: "Amirul Hakim",
    companyName: "TechCraft Malaysia",
    workEmail: "amirul@techcraft.my",
    whatsappPhone: "+60123456789",
    roleInBusiness: "Founder",
    countryTimezone: "Malaysia (GMT+8)",
    preferredLanguage: "English",
    businessType: "Software Agency",
    serviceNeed: "Website & Digital System",
    websiteUrl: "https://techcraft.my",
    currentProblem: "Manual lead management is slowing us down.",
    projectGoal: "Automate intake and professionalize brand.",
    budgetRange: "RM 15k - 25k",
    selectedPackage: "Strata Growth",
    timeline: "1-2 months",
    sourcePage: "/request-demo",
    status: "new",
    priority: "hot",
    assignedTo: "Khairul",
    notesCount: 2,
    rawPayload: {}
  },
  {
    id: "lead-2",
    createdAt: "2024-04-28T14:30:00Z",
    updatedAt: "2024-04-29T09:15:00Z",
    fullName: "Sarah Chen",
    companyName: "Luxe Decor",
    workEmail: "sarah@luxedecor.com",
    whatsappPhone: "+60198765432",
    roleInBusiness: "Marketing Director",
    countryTimezone: "Malaysia (GMT+8)",
    preferredLanguage: "English",
    businessType: "E-commerce & Product Brand",
    serviceNeed: "E-commerce Experience",
    websiteUrl: "https://luxedecor.com",
    currentProblem: "Current site is slow and doesn't convert.",
    projectGoal: "High-end visual overhaul and speed optimization.",
    budgetRange: "RM 25k+",
    selectedPackage: "Strata Scale",
    timeline: "Immediate",
    status: "contacted",
    priority: "warm",
    assignedTo: "Nick",
    lastContactedAt: "2024-04-29T09:00:00Z",
    nextFollowUpAt: "2024-05-02T10:00:00Z",
    notesCount: 1,
    sourcePage: "/request-demo",
    rawPayload: {}
  }
];

export const getDashboard = async (): Promise<DashboardMetrics> => {
  await sleep(800);
  return {
    totalLeads: 42,
    newLeads: 5,
    contactedLeads: 12,
    qualifiedLeads: 8,
    proposalSent: 4,
    won: 3,
    lost: 2,
    conversionRate: 7.1,
    leadsThisWeek: 8
  };
};

export const getLeads = async (): Promise<Lead[]> => {
  await sleep(1000);
  return MOCK_LEADS;
};

export const getLead = async (id: string): Promise<Lead | null> => {
  await sleep(600);
  return MOCK_LEADS.find(l => l.id === id) || null;
};

export const updateLead = async (id: string, payload: Partial<Lead>): Promise<Lead> => {
  await sleep(800);
  const lead = MOCK_LEADS.find(l => l.id === id);
  if (!lead) throw new Error("Lead not found");
  return { ...lead, ...payload, updatedAt: new Date().toISOString() };
};

export const getLeadNotes = async (id: string): Promise<LeadNote[]> => {
  await sleep(500);
  return [
    {
      id: "note-1",
      leadId: id,
      note: "Initial contact via WhatsApp. Lead is very interested in the Growth package.",
      type: "whatsapp",
      createdBy: "Khairul",
      createdAt: "2024-04-29T10:00:00Z"
    },
    {
      id: "note-2",
      leadId: id,
      note: "Scheduled discovery call for next Tuesday.",
      type: "user",
      createdBy: "Khairul",
      createdAt: "2024-04-30T14:00:00Z"
    }
  ];
};

export const createLeadNote = async (id: string, note: string): Promise<LeadNote> => {
  await sleep(600);
  return {
    id: `note-${Math.random().toString(36).substr(2, 9)}`,
    leadId: id,
    note,
    type: "user",
    createdBy: "Current User",
    createdAt: new Date().toISOString()
  };
};

export const getFollowUps = async (): Promise<FollowUp[]> => {
  await sleep(700);
  return [
    {
      id: "fw-1",
      leadId: "lead-2",
      title: "Follow up on proposal feedback",
      dueAt: new Date().toISOString(),
      status: "pending",
      assignedTo: "Nick",
      createdAt: "2024-04-30T08:00:00Z"
    }
  ];
};

export const updateFollowUp = async (id: string, payload: Partial<FollowUp>): Promise<FollowUp> => {
  await sleep(500);
  return {
    id,
    leadId: "lead-2",
    title: "Updated Follow Up",
    dueAt: new Date().toISOString(),
    status: "completed",
    assignedTo: "Nick",
    createdAt: "2024-04-30T08:00:00Z",
    ...payload
  };
};

export const getCrmSettings = async (): Promise<CrmSettings> => {
  await sleep(400);
  return {
    isConfigured: false,
    contactEmail: "hello@strata.agency",
    whatsappNumber: "+60123456789",
    teamMembers: ["Nick", "Khairul"],
    leadStatuses: [
      "new", "contacted", "qualified", "discovery_scheduled", 
      "proposal_sent", "negotiating", "won", "lost", "unresponsive"
    ]
  };
};
