INSERT INTO public.pipeline_stages (name, display_name, position, color, is_terminal) VALUES
  ('new','New',1,'#3B82F6',false),
  ('contacted','Contacted',2,'#8B5CF6',false),
  ('qualified','Qualified',3,'#F59E0B',false),
  ('discovery_scheduled','Discovery Scheduled',4,'#06B6D4',false),
  ('proposal_sent','Proposal Sent',5,'#10B981',false),
  ('negotiating','Negotiating',6,'#F97316',false),
  ('won','Won',7,'#22C55E',true),
  ('lost','Lost',8,'#EF4444',true),
  ('unresponsive','Unresponsive',9,'#6B7280',true)
ON CONFLICT (name) DO NOTHING;
