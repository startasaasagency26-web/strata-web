ALTER TABLE public.crm_leads DROP CONSTRAINT IF EXISTS crm_leads_assigned_to_check;
ALTER TABLE public.crm_leads DROP COLUMN IF EXISTS assigned_to;
ALTER TABLE public.crm_leads ADD COLUMN assigned_to UUID REFERENCES public.crm_profiles(id) ON DELETE SET NULL;
ALTER TABLE public.crm_leads ADD COLUMN IF NOT EXISTS notes_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.crm_follow_ups DROP CONSTRAINT IF EXISTS crm_follow_ups_assigned_to_check;
ALTER TABLE public.crm_follow_ups DROP COLUMN IF EXISTS assigned_to;
ALTER TABLE public.crm_follow_ups ADD COLUMN assigned_to UUID REFERENCES public.crm_profiles(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.update_lead_notes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.crm_leads SET notes_count = notes_count + 1 WHERE id = NEW.lead_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.crm_leads SET notes_count = GREATEST(notes_count - 1, 0) WHERE id = OLD.lead_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_notes_count ON public.crm_lead_notes;
CREATE TRIGGER tr_notes_count
  AFTER INSERT OR DELETE ON public.crm_lead_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_lead_notes_count();

CREATE OR REPLACE FUNCTION public.update_lead_next_follow_up()
RETURNS TRIGGER AS $$
DECLARE v_lead_id UUID;
BEGIN
  v_lead_id := COALESCE(NEW.lead_id, OLD.lead_id);
  UPDATE public.crm_leads SET next_follow_up_at = (
    SELECT MIN(due_at) FROM public.crm_follow_ups
    WHERE lead_id = v_lead_id AND status = 'pending'
  ) WHERE id = v_lead_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_next_follow_up ON public.crm_follow_ups;
CREATE TRIGGER tr_next_follow_up
  AFTER INSERT OR UPDATE OR DELETE ON public.crm_follow_ups
  FOR EACH ROW EXECUTE FUNCTION public.update_lead_next_follow_up();
