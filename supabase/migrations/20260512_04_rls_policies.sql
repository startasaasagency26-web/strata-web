DROP POLICY IF EXISTS "Allow all for authenticated" ON public.leads;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.lead_notes;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.follow_ups;

DROP POLICY IF EXISTS "CRM users can view leads" ON public.crm_leads;
DROP POLICY IF EXISTS "CRM users can insert leads" ON public.crm_leads;
DROP POLICY IF EXISTS "Admins and managers can update leads" ON public.crm_leads;
DROP POLICY IF EXISTS "CRM users can view notes" ON public.lead_notes;
DROP POLICY IF EXISTS "CRM users can manage notes" ON public.lead_notes;
DROP POLICY IF EXISTS "CRM users can view follow_ups" ON public.follow_ups;
DROP POLICY IF EXISTS "CRM users can manage follow_ups" ON public.follow_ups;

CREATE POLICY "leads_anon_insert" ON public.crm_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "leads_auth_select" ON public.crm_leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "leads_role_update" ON public.crm_leads FOR UPDATE TO authenticated
  USING (public.get_current_crm_role() IN ('admin','manager'));

CREATE POLICY "notes_auth_select" ON public.crm_lead_notes FOR SELECT TO authenticated USING (true);
CREATE POLICY "notes_role_insert" ON public.crm_lead_notes FOR INSERT TO authenticated
  WITH CHECK (public.get_current_crm_role() IN ('admin','manager'));
CREATE POLICY "notes_role_delete" ON public.crm_lead_notes FOR DELETE TO authenticated
  USING (public.get_current_crm_role() IN ('admin','manager'));

CREATE POLICY "followups_auth_select" ON public.crm_follow_ups FOR SELECT TO authenticated USING (true);
CREATE POLICY "followups_role_insert" ON public.crm_follow_ups FOR INSERT TO authenticated
  WITH CHECK (public.get_current_crm_role() IN ('admin','manager'));
CREATE POLICY "followups_role_update" ON public.crm_follow_ups FOR UPDATE TO authenticated
  USING (public.get_current_crm_role() IN ('admin','manager'));

DROP POLICY IF EXISTS "Users can view their own profile" ON public.crm_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.crm_profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.crm_profiles;
CREATE POLICY "profiles_self_select" ON public.crm_profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.get_current_crm_role() = 'admin');
CREATE POLICY "profiles_admin_mutate" ON public.crm_profiles FOR ALL TO authenticated
  USING (public.get_current_crm_role() = 'admin');

DROP POLICY IF EXISTS "CRM users can view settings" ON public.crm_settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.crm_settings;
CREATE POLICY "settings_auth_select" ON public.crm_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "settings_admin_update" ON public.crm_settings FOR UPDATE TO authenticated
  USING (public.get_current_crm_role() = 'admin');

CREATE POLICY "stages_auth_select" ON public.pipeline_stages FOR SELECT TO authenticated USING (true);
CREATE POLICY "stages_admin_mutate" ON public.pipeline_stages FOR ALL TO authenticated
  USING (public.get_current_crm_role() = 'admin');

CREATE POLICY "history_auth_select" ON public.lead_status_history FOR SELECT TO authenticated USING (true);

CREATE POLICY "activity_admin_select" ON public.activity_log FOR SELECT TO authenticated
  USING (public.get_current_crm_role() = 'admin');
