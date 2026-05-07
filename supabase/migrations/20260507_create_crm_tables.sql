-- Strata CRM Database Schema
-- Migration: 20260507_create_crm_tables.sql

-- Enable pgcrypto for UUIDs if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Table: crm_leads
CREATE TABLE IF NOT EXISTS public.crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Lead Identity
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    whatsapp_phone TEXT NOT NULL,
    role_in_business TEXT NOT NULL,
    country_timezone TEXT NOT NULL,
    preferred_language TEXT NOT NULL,
    
    -- Qualification
    business_type TEXT,
    service_need TEXT,
    website_url TEXT,
    current_problem TEXT,
    project_goal TEXT,
    budget_range TEXT,
    selected_package TEXT,
    timeline TEXT,
    source_page TEXT,
    
    -- CRM Fields
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'discovery_scheduled', 'proposal_sent', 'negotiating', 'won', 'lost', 'unresponsive')),
    priority TEXT NOT NULL DEFAULT 'warm' CHECK (priority IN ('hot', 'warm', 'cold')),
    assigned_to TEXT DEFAULT 'unassigned' CHECK (assigned_to IN ('nick', 'khairul', 'unassigned')),
    last_contacted_at TIMESTAMPTZ,
    next_follow_up_at TIMESTAMPTZ,
    
    -- System
    consent BOOLEAN DEFAULT false,
    marketing_opt_in BOOLEAN DEFAULT false,
    raw_payload JSONB DEFAULT '{}'::jsonB
);

-- 2. Table: crm_lead_notes
CREATE TABLE IF NOT EXISTS public.crm_lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by TEXT,
    note_type TEXT NOT NULL DEFAULT 'general' CHECK (note_type IN ('general', 'call', 'whatsapp', 'email', 'follow_up', 'system')),
    note TEXT NOT NULL
);

-- 3. Table: crm_follow_ups
CREATE TABLE IF NOT EXISTS public.crm_follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    due_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'overdue')),
    assigned_to TEXT DEFAULT 'unassigned' CHECK (assigned_to IN ('nick', 'khairul', 'unassigned')),
    contact_method TEXT DEFAULT 'whatsapp' CHECK (contact_method IN ('whatsapp', 'email', 'call')),
    title TEXT NOT NULL,
    notes TEXT
);

-- Triggers for updated_at
CREATE TRIGGER tr_crm_leads_updated_at
    BEFORE UPDATE ON public.crm_leads
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tr_crm_follow_ups_updated_at
    BEFORE UPDATE ON public.crm_follow_ups
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crm_leads_created_at ON public.crm_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads (status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_priority ON public.crm_leads (priority);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned_to ON public.crm_leads (assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_leads_next_follow_up ON public.crm_leads (next_follow_up_at);
CREATE INDEX IF NOT EXISTS idx_crm_leads_email ON public.crm_leads (work_email);
CREATE INDEX IF NOT EXISTS idx_crm_leads_company ON public.crm_leads (company_name);

CREATE INDEX IF NOT EXISTS idx_crm_lead_notes_lead_id ON public.crm_lead_notes (lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_lead_notes_created_at ON public.crm_lead_notes (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_crm_follow_ups_lead_id ON public.crm_follow_ups (lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_follow_ups_due_at ON public.crm_follow_ups (due_at);
CREATE INDEX IF NOT EXISTS idx_crm_follow_ups_status ON public.crm_follow_ups (status);

-- Enable RLS
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_follow_ups ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- For internal CRM, we only allow access via authenticated service role (Admin Client)
-- OR we can add policies for authenticated users if we use Supabase Auth.
-- Since the routes are protected by email allowlist in the API, we keep RLS strict.

-- Note: No public policies are created. This ensures data is only accessible via the Service Role
-- or through authenticated sessions with explicit permission.

-- Realtime Publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_lead_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_follow_ups;
