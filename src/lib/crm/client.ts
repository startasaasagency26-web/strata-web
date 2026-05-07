import { supabase } from "../supabase";
import type { 
  Lead, 
  DashboardMetrics, 
  LeadNote, 
  FollowUp, 
  CrmSettings 
} from "../../types/crm";

// Mapping helpers
const mapDbLead = (dbLead: any): Lead => ({
  id: dbLead.id,
  createdAt: dbLead.created_at,
  updatedAt: dbLead.updated_at,
  fullName: dbLead.full_name,
  workEmail: dbLead.work_email,
  whatsappPhone: dbLead.whatsapp_phone,
  companyName: dbLead.company_name,
  roleInBusiness: dbLead.role_in_business,
  businessType: dbLead.business_type,
  serviceNeed: dbLead.service_need,
  websiteUrl: dbLead.website_url,
  budgetRange: dbLead.budget_range,
  timeline: dbLead.timeline,
  currentProblem: dbLead.current_problem,
  projectGoal: dbLead.project_goal,
  selectedPackage: dbLead.selected_package,
  status: dbLead.status,
  priority: dbLead.priority,
  assignedTo: dbLead.assigned_to,
  lastContactedAt: dbLead.last_contacted_at,
  nextFollowUpAt: dbLead.next_follow_up_at,
  rawPayload: dbLead.raw_payload || {}
});

export const getDashboard = async (): Promise<DashboardMetrics> => {
  const { data: leads, error } = await supabase.from('leads').select('status, created_at');
  if (error) throw error;

  const metrics: DashboardMetrics = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'new').length,
    contactedLeads: leads.filter(l => l.status === 'contacted').length,
    qualifiedLeads: leads.filter(l => l.status === 'qualified').length,
    proposalSent: leads.filter(l => l.status === 'proposal_sent').length,
    won: leads.filter(l => l.status === 'won').length,
    lost: leads.filter(l => l.status === 'lost').length,
    conversionRate: leads.length > 0 ? (leads.filter(l => l.status === 'won').length / leads.length) * 100 : 0,
    leadsThisWeek: leads.filter(l => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(l.created_at) > weekAgo;
    }).length
  };

  return metrics;
};

export const getLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data.map(mapDbLead);
};

export const getLead = async (id: string): Promise<Lead | null> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return mapDbLead(data);
};

export const updateLead = async (id: string, payload: Partial<Lead>): Promise<Lead> => {
  // Map frontend keys to snake_case for DB
  const dbPayload: any = {};
  if (payload.status) dbPayload.status = payload.status;
  if (payload.priority) dbPayload.priority = payload.priority;
  if (payload.assignedTo) dbPayload.assigned_to = payload.assignedTo;
  if (payload.lastContactedAt) dbPayload.last_contacted_at = payload.lastContactedAt;
  if (payload.nextFollowUpAt) dbPayload.next_follow_up_at = payload.nextFollowUpAt;
  
  const { data, error } = await supabase
    .from('leads')
    .update({ ...dbPayload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return mapDbLead(data);
};

export const getLeadNotes = async (id: string): Promise<LeadNote[]> => {
  const { data, error } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data.map(n => ({
    id: n.id,
    leadId: n.lead_id,
    note: n.note,
    type: n.type,
    createdBy: n.created_by,
    createdAt: n.created_at
  }));
};

export const createLeadNote = async (id: string, note: string, type: string = 'internal'): Promise<LeadNote> => {
  const { data, error } = await supabase
    .from('lead_notes')
    .insert({
      lead_id: id,
      note,
      type,
      created_by: 'Nick' // Mocked for now, will come from auth
    })
    .select()
    .single();
  
  if (error) throw error;
  return {
    id: data.id,
    leadId: data.lead_id,
    note: data.note,
    type: data.type,
    createdBy: data.created_by,
    createdAt: data.created_at
  };
};

export const getFollowUps = async (): Promise<FollowUp[]> => {
  const { data, error } = await supabase
    .from('follow_ups')
    .select('*')
    .order('due_at', { ascending: true });
  
  if (error) throw error;
  return data.map(f => ({
    id: f.id,
    leadId: f.lead_id,
    title: f.title,
    dueAt: f.due_at,
    status: f.status,
    completedAt: f.completed_at,
    assignedTo: f.assigned_to,
    createdAt: f.created_at
  }));
};

export const updateFollowUp = async (id: string, payload: Partial<FollowUp>): Promise<FollowUp> => {
  const dbPayload: any = {};
  if (payload.status) dbPayload.status = payload.status;
  if (payload.completedAt) dbPayload.completed_at = payload.completedAt;
  
  const { data, error } = await supabase
    .from('follow_ups')
    .update(dbPayload)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return {
    id: data.id,
    leadId: data.lead_id,
    title: data.title,
    dueAt: data.due_at,
    status: data.status,
    completedAt: data.completed_at,
    assignedTo: data.assigned_to,
    createdAt: data.created_at
  };
};

export const getCrmSettings = async (): Promise<CrmSettings> => {
  // This could come from a settings table later
  return {
    isConfigured: true,
    contactEmail: "hello@strata.agency",
    whatsappNumber: "+60123456789",
    teamMembers: ["Nick", "Khairul"],
    leadStatuses: [
      "new", "contacted", "qualified", "discovery_scheduled", 
      "proposal_sent", "negotiating", "won", "lost", "unresponsive"
    ]
  };
};
