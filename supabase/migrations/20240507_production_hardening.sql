-- CRM Production Hardening Migration

-- 1. Create crm_profiles table
CREATE TABLE IF NOT EXISTS public.crm_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'disabled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create crm_settings table
CREATE TABLE IF NOT EXISTS public.crm_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_email TEXT,
    whatsapp_number TEXT,
    is_configured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE public.crm_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- 4. Helper Function: Get Current User Role
CREATE OR REPLACE FUNCTION public.get_current_crm_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (SELECT role FROM public.crm_profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RLS Policies for crm_profiles
CREATE POLICY "Users can view their own profile"
ON public.crm_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.crm_profiles FOR SELECT
USING (public.get_current_crm_role() = 'admin');

CREATE POLICY "Admins can manage profiles"
ON public.crm_profiles FOR ALL
USING (public.get_current_crm_role() = 'admin');

-- 6. RLS Policies for crm_settings
CREATE POLICY "CRM users can view settings"
ON public.crm_settings FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update settings"
ON public.crm_settings FOR UPDATE
USING (public.get_current_crm_role() = 'admin');

-- 7. RLS Policies for crm_leads
CREATE POLICY "CRM users can view leads"
ON public.crm_leads FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "CRM users can insert leads"
ON public.crm_leads FOR INSERT
WITH CHECK (TRUE); -- Allow public demo submissions

CREATE POLICY "Admins and managers can update leads"
ON public.crm_leads FOR UPDATE
USING (public.get_current_crm_role() IN ('admin', 'manager'));

-- 8. RLS Policies for lead_notes
CREATE POLICY "CRM users can view notes"
ON public.lead_notes FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "CRM users can manage notes"
ON public.lead_notes FOR ALL
USING (public.get_current_crm_role() IN ('admin', 'manager'));

-- 9. RLS Policies for follow_ups
CREATE POLICY "CRM users can view follow_ups"
ON public.follow_ups FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "CRM users can manage follow_ups"
ON public.follow_ups FOR ALL
USING (public.get_current_crm_role() IN ('admin', 'manager'));

-- 10. Seed default settings if empty
INSERT INTO public.crm_settings (contact_email, whatsapp_number, is_configured)
SELECT 'hello@strata.agency', '+60123456789', true
WHERE NOT EXISTS (SELECT 1 FROM public.crm_settings);
