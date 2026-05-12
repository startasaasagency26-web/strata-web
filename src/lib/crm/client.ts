import { supabase } from "../supabase/browser.js";
import type { 
  Lead, 
  DashboardMetrics, 
  LeadNote, 
  FollowUp,
  CrmSettings,
  CrmUserProfile
} from "../../types/crm.js";

/**
 * CRM API Client for Strata.
 * Connects the frontend to the Vercel Function backend.
 */

const getAuthHeader = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { 'Authorization': `Bearer ${session.access_token}` } : {};
};

const handleResponse = async (res: Response) => {
  const data = (await res.json()) as any;
  if (!res.ok || !data.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

export const getDashboard = async (): Promise<DashboardMetrics> => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/crm/dashboard', { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return data.metrics || {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      proposalSent: 0,
      won: 0,
      lost: 0,
      conversionRate: 0,
      leadsThisWeek: 0
    };
  } catch (err) {
    console.error('[crm/client] Error fetching dashboard:', err);
    // Return empty metrics instead of throwing if it's just a data issue
    return {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      proposalSent: 0,
      won: 0,
      lost: 0,
      conversionRate: 0,
      leadsThisWeek: 0
    };
  }
};

export const getLeads = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  sort?: string;
}): Promise<Lead[]> => {
  try {
    const headers = await getAuthHeader();
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val) query.set(key, val.toString());
      });
    }

    const res = await fetch(`/api/crm/leads?${query.toString()}`, { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return data.leads || [];
  } catch (err) {
    console.error('[crm/client] Error fetching leads:', err);
    return [];
  }
};

export const getLead = async (id: string): Promise<Lead | null> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, { headers: headers as HeadersInit });
  if (res.status === 404) return null;
  const data = await handleResponse(res);
  return data.lead;
};

export const updateLead = async (id: string, payload: Partial<Lead>): Promise<Lead> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.lead;
};

export const getLeadNotes = async (id: string): Promise<LeadNote[]> => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/crm/notes?leadId=${id}`, { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return data.notes || [];
  } catch (err) {
    console.error('[crm/client] Error fetching lead notes:', err);
    return [];
  }
};

export const createLeadNote = async (id: string, note: string, type: string = 'general'): Promise<LeadNote> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/notes', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify({ leadId: id, note, noteType: type })
  });
  const data = await handleResponse(res);
  return data.note;
};

export const getFollowUps = async (params?: { leadId?: string; status?: string }): Promise<FollowUp[]> => {
  try {
    const headers = await getAuthHeader();
    const query = new URLSearchParams();
    if (params?.leadId) query.set('leadId', params.leadId);
    if (params?.status) query.set('status', params.status);

    const res = await fetch(`/api/crm/follow-ups?${query.toString()}`, { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return data.followUps || [];
  } catch (err) {
    console.error('[crm/client] Error fetching follow-ups:', err);
    return [];
  }
};

export const updateFollowUp = async (id: string, payload: Partial<FollowUp>): Promise<FollowUp> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/follow-ups?id=${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.followUp;
};

export const getCrmSettings = async (): Promise<CrmSettings> => {
  try {
    const { data, error } = await supabase
      .from('crm_settings')
      .select('*')
      .single();

    if (error) throw error;

    return {
      isConfigured: data.is_configured,
      contactEmail: data.contact_email,
      whatsappNumber: data.whatsapp_number,
      teamMembers: [], // This will be handled by getTeamMembers
      leadStatuses: ["new", "contacted", "qualified", "discovery_scheduled", "proposal_sent", "negotiating", "won", "lost", "unresponsive"]
    };
  } catch (err) {
    console.error('[crm/client] Error fetching settings:', err);
    return {
      isConfigured: false,
      contactEmail: "hello@strata.agency",
      whatsappNumber: "+60123456789",
      teamMembers: [],
      leadStatuses: ["new", "contacted", "qualified", "won", "lost"]
    };
  }
};

export const updateCrmSettings = async (payload: Partial<CrmSettings>): Promise<void> => {
  const { error } = await supabase
    .from('crm_settings')
    .update({
      contact_email: payload.contactEmail,
      whatsapp_number: payload.whatsappNumber,
      is_configured: payload.isConfigured,
      updated_at: new Date().toISOString()
    })
    .eq('is_configured', true); // Update the active config

  if (error) throw error;
};

export const getTeamMembers = async (): Promise<CrmUserProfile[]> => {
  const { data, error } = await supabase
    .from('crm_profiles')
    .select('*')
    .order('full_name');

  if (error) throw error;

  return (data || []).map(d => ({
    id: d.id,
    email: d.email,
    fullName: d.full_name,
    role: d.role,
    status: d.status,
    createdAt: d.created_at,
    updatedAt: d.updated_at
  }));
};

export const updateProfile = async (id: string, payload: Partial<CrmUserProfile>): Promise<void> => {
  const { error } = await supabase
    .from('crm_profiles')
    .update({
      full_name: payload.fullName,
      role: payload.role,
      status: payload.status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw error;
};

export const checkHealth = async () => {
  const res = await fetch('/api/crm/health');
  return handleResponse(res);
};
