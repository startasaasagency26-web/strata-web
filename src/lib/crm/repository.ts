import { supabaseAdmin } from '../supabase/admin.js';
import type {
  CrmSettings,
  CrmUserProfile,
  DashboardMetrics,
  FollowUp,
  Lead,
  LeadNote,
} from '../../types/crm.js';
import type {
  FollowUpCreatePayload,
  FollowUpUpdatePayload,
  LeadUpdatePayload,
  ManualLeadInsertPayload,
} from './api-validation.js';

const getMalaysiaDayBounds = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const year = Number(partMap.year);
  const month = Number(partMap.month);
  const day = Number(partMap.day);
  const start = new Date(Date.UTC(year, month - 1, day, -8, 0, 0, 0)).toISOString();
  const end = new Date(Date.UTC(year, month - 1, day + 1, -8, 0, 0, 0)).toISOString();
  return { start, end };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const asString = (value: unknown) => typeof value === 'string' ? value : '';
const asOptionalString = (value: unknown) => typeof value === 'string' ? value : undefined;

const mapJoinedProfile = (profile: unknown) => {
  const value = Array.isArray(profile) ? profile[0] : profile;
  if (!isRecord(value)) return null;

  return {
    id: asString(value.id),
    email: asOptionalString(value.email),
    fullName: asString(value.full_name),
  };
};

/**
 * Supabase Repository for Strata CRM.
 * Uses the admin client to bypass RLS for internal logic.
 */
export const CrmRepository = {
  // --- LEADS ---
  
  async getLeads(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
    sort?: 'newest' | 'oldest' | 'follow_up';
  }) {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      status, 
      priority, 
      assignedTo, 
      sort = 'newest' 
    } = params;
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('crm_leads')
      .select('*, assigned_profile:crm_profiles(id,email,full_name)', { count: 'exact' });

    // Filters
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    if (assignedTo) query = query.eq('assigned_to', assignedTo);
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,company_name.ilike.%${search}%,work_email.ilike.%${search}%,whatsapp_phone.ilike.%${search}%`);
    }

    // Sort
    if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    } else if (sort === 'follow_up') {
      query = query.order('next_follow_up_at', { ascending: true, nullsFirst: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query.range(from, to);
    if (error) throw error;

    return { 
      leads: (data || []).map(this.mapDbLead), 
      total: count || 0,
      page,
      limit
    };
  },

  async getLeadById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return this.mapDbLead(data);
  },

  async insertLead(payload: ManualLeadInsertPayload) {
    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbLead(data);
  },

  async updateLead(id: string, payload: LeadUpdatePayload) {
    // Map camelCase to snake_case for DB
    const dbPayload: Record<string, unknown> = {};
    if (payload.status) dbPayload.status = payload.status;
    if (payload.priority) dbPayload.priority = payload.priority;
    if ('assignedTo' in payload) dbPayload.assigned_to = payload.assignedTo || null;
    if ('lastContactedAt' in payload) dbPayload.last_contacted_at = payload.lastContactedAt;
    if ('nextFollowUpAt' in payload) dbPayload.next_follow_up_at = payload.nextFollowUpAt || null;

    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbLead(data);
  },

  // --- NOTES ---

  async getLeadNotes(leadId: string) {
    const { data, error } = await supabaseAdmin
      .from('crm_lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.mapDbNote);
  },

  async insertNote(leadId: string, payload: { note: string; noteType?: LeadNote['type']; createdBy?: string }) {
    const { data, error } = await supabaseAdmin
      .from('crm_lead_notes')
      .insert({
        lead_id: leadId,
        note: payload.note,
        note_type: payload.noteType || 'general',
        created_by: payload.createdBy
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapDbNote(data);
  },

  // --- FOLLOW-UPS ---

  async getFollowUps(params: { 
    leadId?: string;
    status?: string;
    assignedTo?: string;
  }) {
    let query = supabaseAdmin
      .from('crm_follow_ups')
      .select('*, crm_leads(full_name, company_name), assigned_profile:crm_profiles(id,email,full_name)');

    if (params.leadId) query = query.eq('lead_id', params.leadId);
    if (params.status) query = query.eq('status', params.status);
    if (params.assignedTo) query = query.eq('assigned_to', params.assignedTo);

    query = query.order('due_at', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map(this.mapDbFollowUp);
  },

  async insertFollowUp(leadId: string, payload: FollowUpCreatePayload) {
    const { data, error } = await supabaseAdmin
      .from('crm_follow_ups')
      .insert({
        lead_id: leadId,
        due_at: payload.dueAt,
        title: payload.title,
        status: 'pending',
        assigned_to: payload.assignedTo || null,
        contact_method: payload.contactMethod || 'whatsapp',
        notes: payload.notes
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapDbFollowUp(data);
  },

  async updateFollowUp(id: string, payload: FollowUpUpdatePayload) {
    const dbPayload: Record<string, unknown> = {};
    if (payload.status) dbPayload.status = payload.status;
    if (payload.completedAt) dbPayload.completed_at = payload.completedAt;
    if (payload.dueAt) dbPayload.due_at = payload.dueAt;
    if ('notes' in payload) dbPayload.notes = payload.notes;
    if ('assignedTo' in payload) dbPayload.assigned_to = payload.assignedTo || null;

    const { data, error } = await supabaseAdmin
      .from('crm_follow_ups')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbFollowUp(data);
  },

  // --- DASHBOARD ---

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const { data, error } = await supabaseAdmin
      .from('crm_dashboard_metrics')
      .select('*')
      .single();

    if (error) throw error;

    const endOfToday = getMalaysiaDayBounds().end;
    const { count: followUpsToday, error: followUpsError } = await supabaseAdmin
      .from('crm_follow_ups')
      .select('id', { count: 'exact', head: true })
      .in('status', ['pending', 'overdue'])
      .lt('due_at', endOfToday);

    if (followUpsError) throw followUpsError;

    return {
      totalLeads: Number(data?.total_leads ?? 0),
      newLeads: Number(data?.new_leads ?? 0),
      contactedLeads: Number(data?.contacted_leads ?? 0),
      qualifiedLeads: Number(data?.qualified_leads ?? 0),
      proposalSent: Number(data?.proposal_sent ?? 0),
      won: Number(data?.won ?? 0),
      lost: Number(data?.lost ?? 0),
      conversionRate: Number(data?.conversion_rate ?? 0),
      leadsThisWeek: Number(data?.leads_this_week ?? 0),
      followUpsToday: Number(followUpsToday ?? 0),
      pipelineValue: null,
    };
  },

  async getPipelineStages() {
    const { data, error } = await supabaseAdmin
      .from('pipeline_stages')
      .select('*')
      .eq('is_active', true)
      .order('position');

    if (error) throw error;
    return data || [];
  },

  async insertStatusHistory(
    leadId: string,
    fromStatus: string | null,
    toStatus: string,
    changedBy: string | null,
    note?: string
  ) {
    const { error } = await supabaseAdmin.from('lead_status_history').insert({
      lead_id: leadId,
      from_status: fromStatus,
      to_status: toStatus,
      changed_by: changedBy || null,
      note: note || null
    });

    if (error) throw error;
  },

  async insertActivityLog(entry: {
    actorId?: string;
    actorEmail?: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
  }) {
    const { error } = await supabaseAdmin.from('activity_log').insert({
      actor_id: entry.actorId || null,
      actor_email: entry.actorEmail || null,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId || null,
      metadata: entry.metadata || {}
    });

    if (error) throw error;
  },

  async getSettings(): Promise<CrmSettings> {
    const { data, error } = await supabaseAdmin
      .from('crm_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return {
      isConfigured: Boolean(data?.is_configured),
      contactEmail: data?.contact_email ?? '',
      whatsappNumber: data?.whatsapp_number ?? '',
      teamMembers: [],
      leadStatuses: ['new', 'contacted', 'qualified', 'discovery_scheduled', 'proposal_sent', 'negotiating', 'won', 'lost', 'unresponsive']
    };
  },

  async updateSettings(payload: { contactEmail?: string; whatsappNumber?: string; isConfigured?: boolean }) {
    const dbPayload: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if ('contactEmail' in payload) dbPayload.contact_email = payload.contactEmail ?? '';
    if ('whatsappNumber' in payload) dbPayload.whatsapp_number = payload.whatsappNumber ?? '';
    if ('isConfigured' in payload) dbPayload.is_configured = Boolean(payload.isConfigured);

    const { data: existing, error: existingError } = await supabaseAdmin
      .from('crm_settings')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingError) throw existingError;

    const query = existing?.id
      ? supabaseAdmin.from('crm_settings').update(dbPayload).eq('id', existing.id)
      : supabaseAdmin.from('crm_settings').insert(dbPayload);

    const { error } = await query;
    if (error) throw error;

    return this.getSettings();
  },

  async getTeamMembers(): Promise<CrmUserProfile[]> {
    const { data, error } = await supabaseAdmin
      .from('crm_profiles')
      .select('id,email,full_name,role,status,created_at,updated_at')
      .order('full_name', { ascending: true });

    if (error) throw error;
    return (data || []).map(this.mapDbProfile);
  },

  async updateTeamMember(
    id: string,
    payload: { role?: CrmUserProfile['role']; status?: CrmUserProfile['status'] }
  ): Promise<CrmUserProfile> {
    const dbPayload: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };
    if (payload.role) dbPayload.role = payload.role;
    if (payload.status) dbPayload.status = payload.status;

    const { data, error } = await supabaseAdmin
      .from('crm_profiles')
      .update(dbPayload)
      .eq('id', id)
      .select('id,email,full_name,role,status,created_at,updated_at')
      .single();

    if (error) throw error;
    return this.mapDbProfile(data);
  },

  async getHealthStatus() {
    const tables = {
      crm_leads: false,
      crm_lead_notes: false,
      crm_follow_ups: false,
      crm_profiles: false,
      crm_settings: false,
    };

    for (const table of Object.keys(tables) as Array<keyof typeof tables>) {
      const { error } = await supabaseAdmin.from(table).select('id').limit(1);
      tables[table] = !error;
    }

    return {
      supabaseConnected: Object.values(tables).some(Boolean),
      tables,
    };
  },

  // --- HELPERS ---

  mapDbProfile(db: Record<string, unknown>): CrmUserProfile {
    return {
      id: asString(db.id),
      email: asString(db.email),
      fullName: asString(db.full_name),
      role: db.role as CrmUserProfile['role'],
      status: db.status as CrmUserProfile['status'],
      createdAt: asString(db.created_at),
      updatedAt: asString(db.updated_at),
    };
  },

  mapDbLead(db: Record<string, unknown>): Lead {
    return {
      id: asString(db.id),
      createdAt: asString(db.created_at),
      updatedAt: asString(db.updated_at),
      fullName: asString(db.full_name),
      companyName: asString(db.company_name),
      workEmail: asString(db.work_email),
      whatsappPhone: asString(db.whatsapp_phone),
      roleInBusiness: asString(db.role_in_business),
      countryTimezone: asString(db.country_timezone),
      preferredLanguage: asString(db.preferred_language),
      businessType: asString(db.business_type),
      serviceNeed: asString(db.service_need),
      websiteUrl: asOptionalString(db.website_url),
      currentProblem: asOptionalString(db.current_problem),
      projectGoal: asOptionalString(db.project_goal),
      budgetRange: asString(db.budget_range),
      timeline: asString(db.timeline),
      selectedPackage: asOptionalString(db.selected_package),
      sourcePage: asString(db.source_page),
      status: db.status as Lead['status'],
      priority: db.priority as Lead['priority'],
      assignedTo: asOptionalString(db.assigned_to) ?? null,
      assignedProfile: mapJoinedProfile(db.assigned_profile),
      lastContactedAt: asOptionalString(db.last_contacted_at),
      nextFollowUpAt: asOptionalString(db.next_follow_up_at),
      notesCount: Number(db.notes_count ?? 0),
      rawPayload: isRecord(db.raw_payload) ? db.raw_payload : {}
    };
  },

  mapDbNote(db: Record<string, unknown>): LeadNote {
    return {
      id: asString(db.id),
      leadId: asString(db.lead_id),
      createdAt: asString(db.created_at),
      createdBy: asString(db.created_by),
      type: db.note_type as LeadNote['type'],
      note: asString(db.note)
    };
  },

  mapDbFollowUp(db: Record<string, unknown>): FollowUp {
    const joinedLead = isRecord(db.crm_leads) ? db.crm_leads : null;
    return {
      id: asString(db.id),
      leadId: asString(db.lead_id),
      createdAt: asString(db.created_at),
      dueAt: asString(db.due_at),
      completedAt: asOptionalString(db.completed_at),
      status: db.status as FollowUp['status'],
      assignedTo: asOptionalString(db.assigned_to) ?? null,
      assignedProfile: mapJoinedProfile(db.assigned_profile),
      title: asString(db.title),
      contactMethod: db.contact_method as FollowUp['contactMethod'],
      notes: asOptionalString(db.notes),
      // Include lead info if joined
      leadName: joinedLead ? asOptionalString(joinedLead.full_name) : undefined,
      leadCompany: joinedLead ? asOptionalString(joinedLead.company_name) : undefined
    };
  }
};
