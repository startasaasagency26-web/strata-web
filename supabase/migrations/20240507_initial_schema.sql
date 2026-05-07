-- Strata CRM Database Schema

-- Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    full_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    whatsapp_phone TEXT NOT NULL,
    company_name TEXT NOT NULL,
    role_in_business TEXT NOT NULL,
    business_type TEXT NOT NULL,
    service_need TEXT NOT NULL,
    website_url TEXT,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    current_problem TEXT,
    project_goal TEXT,
    selected_package TEXT,
    status TEXT DEFAULT 'new' NOT NULL,
    priority TEXT DEFAULT 'warm' NOT NULL,
    assigned_to TEXT,
    last_contacted_at TIMESTAMPTZ,
    next_follow_up_at TIMESTAMPTZ,
    raw_payload JSONB
);

-- Lead Notes Table
CREATE TABLE IF NOT EXISTS public.lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
    note TEXT NOT NULL,
    created_by TEXT NOT NULL,
    type TEXT DEFAULT 'internal' NOT NULL -- internal, call, whatsapp, email
);

-- Follow-ups Table
CREATE TABLE IF NOT EXISTS public.follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    due_at TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, cancelled
    completed_at TIMESTAMPTZ,
    assigned_to TEXT
);

-- RLS Policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- For internal CRM, we might want to allow authenticated users to see everything
-- Since this is an internal CRM, we'll assume the team uses the service role or a specific admin role
-- For now, let's create a policy that allows all authenticated users to read/write for development
CREATE POLICY "Allow all for authenticated" ON public.leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated" ON public.lead_notes FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated" ON public.follow_ups FOR ALL TO authenticated USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.follow_ups;
