CREATE OR REPLACE VIEW public.crm_dashboard_metrics AS
SELECT
  COUNT(*) AS total_leads,
  COUNT(*) FILTER (WHERE status = 'new') AS new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') AS contacted_leads,
  COUNT(*) FILTER (WHERE status = 'qualified') AS qualified_leads,
  COUNT(*) FILTER (WHERE status = 'proposal_sent') AS proposal_sent,
  COUNT(*) FILTER (WHERE status = 'won') AS won,
  COUNT(*) FILTER (WHERE status = 'lost') AS lost,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'won')::numeric / NULLIF(COUNT(*), 0) * 100, 1
  ) AS conversion_rate,
  COUNT(*) FILTER (WHERE created_at >= now() - INTERVAL '7 days') AS leads_this_week
FROM public.crm_leads;
