import { supabase } from "../supabase/browser";
import type { 
  Lead, 
  DashboardMetrics, 
  LeadNote, 
  FollowUp, 
  CrmSettings 
} from "../../types/crm";

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
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/dashboard', { headers: headers as any });
  const data = await handleResponse(res);
  return data.metrics;
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
  const headers = await getAuthHeader();
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val) query.set(key, val.toString());
    });
  }

  const res = await fetch(`/api/crm/leads?${query.toString()}`, { headers: headers as any });
  const data = await handleResponse(res);
  return data.leads;
};

export const getLead = async (id: string): Promise<Lead | null> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, { headers: headers as any });
  if (res.status === 404) return null;
  const data = await handleResponse(res);
  return data.lead;
};

export const updateLead = async (id: string, payload: Partial<Lead>): Promise<Lead> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as any,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.lead;
};

export const getLeadNotes = async (id: string): Promise<LeadNote[]> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/notes?leadId=${id}`, { headers: headers as any });
  const data = await handleResponse(res);
  return data.notes;
};

export const createLeadNote = async (id: string, note: string, type: string = 'general'): Promise<LeadNote> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/notes', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' } as any,
    body: JSON.stringify({ leadId: id, note, noteType: type })
  });
  const data = await handleResponse(res);
  return data.note;
};

export const getFollowUps = async (params?: { leadId?: string; status?: string }): Promise<FollowUp[]> => {
  const headers = await getAuthHeader();
  const query = new URLSearchParams();
  if (params?.leadId) query.set('leadId', params.leadId);
  if (params?.status) query.set('status', params.status);

  const res = await fetch(`/api/crm/follow-ups?${query.toString()}`, { headers: headers as any });
  const data = await handleResponse(res);
  return data.followUps;
};

export const updateFollowUp = async (id: string, payload: Partial<FollowUp>): Promise<FollowUp> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/follow-ups?id=${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as any,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.followUp;
};

export const getCrmSettings = async (): Promise<CrmSettings> => {
  // Static for now, can be moved to API if needed
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

export const checkHealth = async () => {
  const res = await fetch('/api/crm/health');
  return handleResponse(res);
};
