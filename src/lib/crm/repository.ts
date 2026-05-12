import { supabaseAdmin } from '../supabase/admin.js';
import type { Lead, LeadNote, FollowUp, DashboardMetrics } from '../../types/crm.js';

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
      .select('*', { count: 'exact' });

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

  async insertLead(payload: any) {
    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return this.mapDbLead(data);
  },

  async updateLead(id: string, payload: Partial<Lead>) {
    // Map camelCase to snake_case for DB
    const dbPayload: any = {};
    if (payload.status) dbPayload.status = payload.status;
    if (payload.priority) dbPayload.priority = payload.priority;
    if ('assignedTo' in payload) dbPayload.assigned_to = payload.assignedTo || null;
    if (payload.lastContactedAt) dbPayload.last_contacted_at = payload.lastContactedAt;
    if (payload.nextFollowUpAt) dbPayload.next_follow_up_at = payload.nextFollowUpAt;

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

  async insertNote(leadId: string, payload: { note: string; noteType?: string; createdBy?: string }) {
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
      .select('*, crm_leads(full_name, company_name)');

    if (params.leadId) query = query.eq('lead_id', params.leadId);
    if (params.status) query = query.eq('status', params.status);
    if (params.assignedTo) query = query.eq('assigned_to', params.assignedTo);

    query = query.order('due_at', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map(this.mapDbFollowUp);
  },

  async insertFollowUp(leadId: string, payload: any) {
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

  async updateFollowUp(id: string, payload: any) {
    const dbPayload: any = {};
    if (payload.status) dbPayload.status = payload.status;
    if (payload.completedAt) dbPayload.completed_at = payload.completedAt;
    if (payload.dueAt) dbPayload.due_at = payload.dueAt;
    if (payload.notes) dbPayload.notes = payload.notes;
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

  // --- HELPERS ---

  mapDbLead(db: any): Lead {
    return {
      id: db.id,
      createdAt: db.created_at,
      updatedAt: db.updated_at,
      fullName: db.full_name,
      companyName: db.company_name,
      workEmail: db.work_email,
      whatsappPhone: db.whatsapp_phone,
      roleInBusiness: db.role_in_business,
      countryTimezone: db.country_timezone ?? "",
      preferredLanguage: db.preferred_language ?? "",
      businessType: db.business_type,
      serviceNeed: db.service_need,
      websiteUrl: db.website_url,
      currentProblem: db.current_problem,
      projectGoal: db.project_goal,
      budgetRange: db.budget_range,
      timeline: db.timeline,
      selectedPackage: db.selected_package,
      sourcePage: db.source_page ?? "",
      status: db.status,
      priority: db.priority,
      assignedTo: db.assigned_to ?? undefined,
      lastContactedAt: db.last_contacted_at,
      nextFollowUpAt: db.next_follow_up_at,
      notesCount: Number(db.notes_count ?? 0),
      rawPayload: db.raw_payload ?? {}
    };
  },

  mapDbNote(db: any): LeadNote {
    return {
      id: db.id,
      leadId: db.lead_id,
      createdAt: db.created_at,
      createdBy: db.created_by,
      type: db.note_type,
      note: db.note
    };
  },

  mapDbFollowUp(db: any): FollowUp {
    return {
      id: db.id,
      leadId: db.lead_id,
      createdAt: db.created_at,
      dueAt: db.due_at,
      completedAt: db.completed_at,
      status: db.status,
      assignedTo: db.assigned_to ?? "",
      title: db.title,
      // Include lead info if joined
      leadName: db.crm_leads?.full_name,
      leadCompany: db.crm_leads?.company_name
    };
  }
};
      status: db.status,
      priority: db.priority,
      assignedTo: db.assigned_to,
      lastContactedAt: db.last_contacted_at,
      nextFollowUpAt: db.next_follow_up_at,
      notesCount: Number(db.notes_count ?? 0),
      rawPayload: db.raw_payload ?? {}
    };
  },

  mapDbNote(db: any): LeadNote {
    return {
      id: db.id,
      leadId: db.lead_id,
      createdAt: db.created_at,
      createdBy: db.created_by,
      type: db.note_type,
      note: db.note
    };
  },

  mapDbFollowUp(db: any): FollowUp {
    return {
      id: db.id,
      leadId: db.lead_id,
      createdAt: db.created_at,
      dueAt: db.due_at,
      completedAt: db.completed_at,
      status: db.status,
      assignedTo: db.assigned_to,
      title: db.title,
      leadName: db.crm_leads?.full_name,
      leadCompany: db.crm_leads?.company_name
    };
  }
};
      leadCompany: db.crm_leads?.company_name
    };
  }
};
