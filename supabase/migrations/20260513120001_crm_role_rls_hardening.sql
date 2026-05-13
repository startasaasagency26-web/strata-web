-- Harden CRM RLS so authenticated users must also be active CRM admins/managers.

CREATE OR REPLACE FUNCTION public.get_current_crm_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role
    FROM public.crm_profiles
    WHERE id = auth.uid()
      AND status = 'active'
      AND role IN ('admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP POLICY IF EXISTS "Allow all for authenticated" ON public.leads;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.lead_notes;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.follow_ups;

DROP POLICY IF EXISTS "CRM users can view leads" ON public.crm_leads;
DROP POLICY IF EXISTS "CRM users can insert leads" ON public.crm_leads;
DROP POLICY IF EXISTS "Admins and managers can update leads" ON public.crm_leads;
DROP POLICY IF EXISTS "leads_anon_insert" ON public.crm_leads;
DROP POLICY IF EXISTS "leads_auth_select" ON public.crm_leads;
DROP POLICY IF EXISTS "leads_role_update" ON public.crm_leads;

DROP POLICY IF EXISTS "CRM users can view notes" ON public.crm_lead_notes;
DROP POLICY IF EXISTS "CRM users can manage notes" ON public.crm_lead_notes;
DROP POLICY IF EXISTS "notes_auth_select" ON public.crm_lead_notes;
DROP POLICY IF EXISTS "notes_role_insert" ON public.crm_lead_notes;
DROP POLICY IF EXISTS "notes_role_delete" ON public.crm_lead_notes;

DROP POLICY IF EXISTS "CRM users can view follow_ups" ON public.crm_follow_ups;
DROP POLICY IF EXISTS "CRM users can manage follow_ups" ON public.crm_follow_ups;
DROP POLICY IF EXISTS "followups_auth_select" ON public.crm_follow_ups;
DROP POLICY IF EXISTS "followups_role_insert" ON public.crm_follow_ups;
DROP POLICY IF EXISTS "followups_role_update" ON public.crm_follow_ups;

DROP POLICY IF EXISTS "CRM users can view settings" ON public.crm_settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.crm_settings;
DROP POLICY IF EXISTS "settings_auth_select" ON public.crm_settings;
DROP POLICY IF EXISTS "settings_admin_update" ON public.crm_settings;

DROP POLICY IF EXISTS "stages_auth_select" ON public.pipeline_stages;
DROP POLICY IF EXISTS "stages_admin_mutate" ON public.pipeline_stages;

DROP POLICY IF EXISTS "history_auth_select" ON public.lead_status_history;

DROP POLICY IF EXISTS "activity_admin_select" ON public.activity_log;

CREATE POLICY "crm_leads_anon_insert"
ON public.crm_leads
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "crm_leads_role_select"
ON public.crm_leads
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_leads_role_update"
ON public.crm_leads
FOR UPDATE TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'))
WITH CHECK (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_lead_notes_role_select"
ON public.crm_lead_notes
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_lead_notes_role_insert"
ON public.crm_lead_notes
FOR INSERT TO authenticated
WITH CHECK (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_lead_notes_role_delete"
ON public.crm_lead_notes
FOR DELETE TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_follow_ups_role_select"
ON public.crm_follow_ups
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_follow_ups_role_insert"
ON public.crm_follow_ups
FOR INSERT TO authenticated
WITH CHECK (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_follow_ups_role_update"
ON public.crm_follow_ups
FOR UPDATE TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'))
WITH CHECK (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_settings_role_select"
ON public.crm_settings
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "crm_settings_admin_update"
ON public.crm_settings
FOR UPDATE TO authenticated
USING (public.get_current_crm_role() = 'admin')
WITH CHECK (public.get_current_crm_role() = 'admin');

CREATE POLICY "pipeline_stages_role_select"
ON public.pipeline_stages
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "pipeline_stages_admin_mutate"
ON public.pipeline_stages
FOR ALL TO authenticated
USING (public.get_current_crm_role() = 'admin')
WITH CHECK (public.get_current_crm_role() = 'admin');

CREATE POLICY "lead_status_history_role_select"
ON public.lead_status_history
FOR SELECT TO authenticated
USING (public.get_current_crm_role() IN ('admin', 'manager'));

CREATE POLICY "activity_log_admin_select"
ON public.activity_log
FOR SELECT TO authenticated
USING (public.get_current_crm_role() = 'admin');

ALTER VIEW public.crm_dashboard_metrics SET (security_invoker = true);
