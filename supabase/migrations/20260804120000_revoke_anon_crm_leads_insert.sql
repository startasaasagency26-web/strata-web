-- Close the unvalidated public write path into public.crm_leads.
--
-- Context:
--   Public lead intake runs through /api/leads, which validates with
--   validateLeadPayload() (src/lib/crm/lead-schema.ts) and then inserts using
--   the service-role client (src/lib/crm/repository.ts -> supabaseAdmin).
--   The anon role is therefore never used to insert a lead.
--
-- Problem:
--   VITE_SUPABASE_ANON_KEY is inlined into the client bundle by Vite, so it is
--   public by design. Combined with an anon INSERT policy carrying
--   WITH CHECK (true), anyone could POST arbitrary rows directly to
--   /rest/v1/crm_leads -- bypassing lead validation, setting any column, at any
--   volume. Read access was never exposed (no anon SELECT policy), so this was a
--   data-integrity hole rather than a data leak.
--
-- Effect after this migration:
--   crm_leads accepts writes only from the service role (server-side API).
--   Authenticated admin/manager retain SELECT and UPDATE via the policies from
--   20260513120001_crm_role_rls_hardening.sql. No authenticated INSERT policy
--   existed before this migration and none is added here.
--
-- Rollback (only if a genuine client-side insert path is ever introduced):
--   GRANT INSERT ON public.crm_leads TO anon;
--   CREATE POLICY "crm_leads_anon_insert" ON public.crm_leads
--     FOR INSERT TO anon WITH CHECK (true);
--   Prefer keeping inserts server-side so validateLeadPayload() cannot be bypassed.

-- 1. Drop every historical name this policy has had, so the write path is closed
--    regardless of which migrations a given database has already applied.
DROP POLICY IF EXISTS "crm_leads_anon_insert" ON public.crm_leads;      -- 20260513120001
DROP POLICY IF EXISTS "leads_anon_insert" ON public.crm_leads;          -- 20260512_04_rls_policies
DROP POLICY IF EXISTS "CRM users can insert leads" ON public.crm_leads; -- 20240507_production_hardening

-- 2. Defence in depth. The schema declares no GRANT/REVOKE of its own and relies
--    on Supabase's default privileges for anon/authenticated, which means RLS is
--    currently the only layer. Remove the underlying table privilege too, so a
--    future policy added by mistake cannot silently reopen public writes.
REVOKE INSERT ON public.crm_leads FROM anon;
