import { supabase } from "../supabase/browser.js";
import type { 
  Lead, 
  DashboardMetrics, 
  LeadNote, 
  FollowUp,
  CrmSettings,
  CrmUserProfile
} from "../../types/crm.js";
import type {
  FollowUpCreatePayload,
  FollowUpUpdatePayload,
  LeadUpdatePayload,
  SettingsUpdatePayload,
  TeamUpdatePayload
} from "./api-validation.js";

/**
 * CRM API Client for Strata.
 * Connects the frontend to the Vercel Function backend.
 */

const getAuthHeader = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { 'Authorization': `Bearer ${session.access_token}` } : {};
};

export type LeadsPage = {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
};

type ApiResponse = Record<string, unknown> & {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const isApiResponse = (value: unknown): value is ApiResponse =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const asArray = <T>(value: unknown): T[] => Array.isArray(value) ? value as T[] : [];

const handleResponse = async (res: Response) => {
  let parsed: unknown;
  try {
    parsed = await res.json();
  } catch {
    parsed = { ok: false, message: 'API returned an unreadable response.' };
  }

  const data = isApiResponse(parsed)
    ? parsed
    : { ok: false, message: 'API returned an invalid response shape.' };

  if (!res.ok || !data.ok) {
    const message = data.message || `API request failed (${res.status})`;
    const error = new Error(message) as Error & {
      status?: number;
      fieldErrors?: Record<string, string>;
    };
    error.status = res.status;
    if (data.fieldErrors) error.fieldErrors = data.fieldErrors;
    throw error;
  }
  return data;
};

export const getDashboard = async (): Promise<DashboardMetrics> => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/crm/dashboard', { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return (data.metrics as DashboardMetrics | undefined) || {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      proposalSent: 0,
      won: 0,
      lost: 0,
      conversionRate: 0,
      leadsThisWeek: 0,
      followUpsToday: 0,
      pipelineValue: null
    };
  } catch (err) {
    console.error('[crm/client] getDashboard failed:', err);
    throw err;
  }
};

export const getLeadsPage = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  sort?: string;
}): Promise<LeadsPage> => {
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
    return {
      leads: asArray<Lead>(data.leads),
      total: Number(data.total || 0),
      page: Number(data.page || params?.page || 1),
      limit: Number(data.limit || params?.limit || 20),
    };
  } catch (err) {
    console.error('[crm/client] getLeads failed:', err);
    throw err;
  }
};

export const getLeads = async (params?: Parameters<typeof getLeadsPage>[0]): Promise<Lead[]> => {
  const result = await getLeadsPage(params);
  return result.leads;
};

export const getLead = async (id: string): Promise<Lead | null> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, { headers: headers as HeadersInit });
  if (res.status === 404) return null;
  const data = await handleResponse(res);
  return data.lead as Lead;
};

export const createLead = async (payload: {
  fullName: string;
  companyName?: string;
  workEmail?: string;
  whatsappPhone?: string;
}): Promise<Lead> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/leads', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.lead as Lead;
};

export const updateLead = async (id: string, payload: LeadUpdatePayload): Promise<Lead> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/leads/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.lead as Lead;
};

export const getLeadNotes = async (id: string): Promise<LeadNote[]> => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/crm/notes?leadId=${id}`, { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return asArray<LeadNote>(data.notes);
  } catch (err) {
    console.error('[crm/client] Error fetching lead notes:', err);
    throw err;
  }
};

export const createLeadNote = async (id: string, note: string, type: LeadNote['type'] = 'general'): Promise<LeadNote> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/notes', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify({ leadId: id, note, noteType: type })
  });
  const data = await handleResponse(res);
  return data.note as LeadNote;
};

export const getFollowUps = async (params?: { leadId?: string; status?: string }): Promise<FollowUp[]> => {
  try {
    const headers = await getAuthHeader();
    const query = new URLSearchParams();
    if (params?.leadId) query.set('leadId', params.leadId);
    if (params?.status) query.set('status', params.status);

    const res = await fetch(`/api/crm/follow-ups?${query.toString()}`, { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return asArray<FollowUp>(data.followUps);
  } catch (err) {
    console.error('[crm/client] getFollowUps failed:', err);
    throw err;
  }
};

export const createFollowUp = async (payload: FollowUpCreatePayload): Promise<FollowUp> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/follow-ups', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.followUp as FollowUp;
};

export const updateFollowUp = async (id: string, payload: FollowUpUpdatePayload): Promise<FollowUp> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/follow-ups?id=${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.followUp as FollowUp;
};

export const getCrmSettings = async (): Promise<CrmSettings> => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/crm/settings', { headers: headers as HeadersInit });
    const data = await handleResponse(res);
    return data.settings as CrmSettings;
  } catch (err) {
    console.error('[crm/client] Error fetching settings:', err);
    throw err;
  }
};

export const updateCrmSettings = async (payload: SettingsUpdatePayload): Promise<CrmSettings> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/settings', {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.settings as CrmSettings;
};

export const getTeamMembers = async (): Promise<CrmUserProfile[]> => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/team', { headers: headers as HeadersInit });
  const data = await handleResponse(res);
  return asArray<CrmUserProfile>(data.members);
};

export const updateProfile = async (id: string, payload: TeamUpdatePayload): Promise<CrmUserProfile> => {
  const headers = await getAuthHeader();
  const res = await fetch(`/api/crm/team?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify(payload)
  });
  const data = await handleResponse(res);
  return data.member as CrmUserProfile;
};

export const checkHealth = async () => {
  const headers = await getAuthHeader();
  const res = await fetch('/api/crm/health', { headers: headers as HeadersInit });
  return handleResponse(res);
};
