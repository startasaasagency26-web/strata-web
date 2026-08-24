import { useState, useEffect, useRef, type RefObject } from 'react';
import { 
  Users, 
  MoreVertical,
  Plus,
  TrendingUp,
  DollarSign,
  Copy,
  Filter,
  X
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, PriorityBadge } from '../../components/crm/CrmUI';
import { getLeads } from '../../lib/crm/client';
import type { Lead, LeadStatus } from '../../types/crm';
import { Link, useNavigate } from 'react-router-dom';

const PIPELINE_STAGES: { id: LeadStatus; name: string }[] = [
  { id: 'new', name: 'New Inbound' },
  { id: 'contacted', name: 'Contacted' },
  { id: 'qualified', name: 'Qualified' },
  { id: 'proposal_sent', name: 'Proposal Sent' },
  { id: 'won', name: 'Project Won' },
  { id: 'lost', name: 'Closed Lost' },
];

function useDismissableLayer(
  isOpen: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, ref, onClose]);
}

export const Pipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [openStageMenu, setOpenStageMenu] = useState<LeadStatus | null>(null);
  const [stageFilter, setStageFilter] = useState<LeadStatus | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useDismissableLayer(Boolean(openStageMenu), menuRef, () => setOpenStageMenu(null));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeads({ limit: 100 });
        setLeads(data);
      } catch {
        setError('Failed to load pipeline.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Visualizing sales pipeline..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;

  const visibleStages = stageFilter ? PIPELINE_STAGES.filter((stage) => stage.id === stageFilter) : PIPELINE_STAGES;

  const copyStageSummary = async (stage: { id: LeadStatus; name: string }, stageLeads: Lead[]) => {
    const summary = [
      `${stage.name}: ${stageLeads.length} lead${stageLeads.length === 1 ? '' : 's'}`,
      ...stageLeads.map((lead) => `- ${lead.fullName} (${lead.companyName || 'Independent'}) · ${lead.priority}`),
    ].join('\n');
    await navigator.clipboard.writeText(summary);
    setNotice(`${stage.name} summary copied.`);
    setOpenStageMenu(null);
  };

  return (
    <CrmShell>
      <div className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
          <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-text mb-2">Sales Pipeline</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-muted uppercase">Visual deal tracking & stage control</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface2 backdrop-blur-md border border-border rounded-[24px] px-6 py-3 flex items-center gap-4 shadow-sm">
              <div className="text-right">
                <p className="text-[9px] font-mono font-bold tracking-widest text-muted uppercase">Total Value</p>
                <p className="text-lg font-display font-bold text-text uppercase tracking-tight">Unavailable</p>
                <p className="text-[8px] font-mono font-bold tracking-widest text-muted uppercase">No exact deal values</p>
              </div>
              <TrendingUp size={24} className="text-positive" />
            </div>
            <button
              onClick={() => navigate('/crm/leads?add=1')}
              aria-label="Add lead to pipeline"
              className="w-14 h-14 rounded-full bg-gold text-void flex items-center justify-center hover:-translate-y-1 hover:bg-goldHover hover:shadow-lg active:bg-goldActive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {notice && (
          <div className="rounded-[18px] border border-positive/30 bg-positiveSoft px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-positive">
            {notice}
          </div>
        )}

        {stageFilter && (
          <div className="flex items-center justify-between rounded-[24px] border border-info/30 bg-infoSoft px-5 py-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-info">
              Showing {PIPELINE_STAGES.find((stage) => stage.id === stageFilter)?.name}
            </span>
            <button onClick={() => setStageFilter(null)} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-info hover:text-info">
              <X size={12} /> Clear filter
            </button>
          </div>
        )}

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-6">
          <div className="flex gap-6 h-full min-w-[1400px]">
            {visibleStages.map((stage) => {
              const stageLeads = leads.filter(l => l.status === stage.id);
              
              return (
                <div key={stage.id} className="w-[300px] flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2 shrink-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-muted uppercase">{stage.name}</h3>
                      <span className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center text-[10px] font-mono font-bold text-text shadow-sm">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setOpenStageMenu(openStageMenu === stage.id ? null : stage.id)}
                        aria-label={`Open actions for ${stage.name}`}
                        aria-expanded={openStageMenu === stage.id}
                        className="text-muted hover:text-text transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openStageMenu === stage.id && (
                        <div ref={menuRef} className="absolute right-0 top-7 z-20 w-56 rounded-[18px] bg-surface border border-border shadow-xl p-2">
                          <button
                            onClick={() => navigate(`/crm/leads?status=${stage.id}`)}
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2 text-left"
                          >
                            <Users size={14} /> View leads in this stage
                          </button>
                          <button
                            onClick={() => copyStageSummary(stage, stageLeads)}
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2 text-left"
                          >
                            <Copy size={14} /> Copy stage summary
                          </button>
                          <button
                            onClick={() => { setStageFilter(stage.id); setOpenStageMenu(null); }}
                            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2 text-left"
                          >
                            <Filter size={14} /> Filter by this stage
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 bg-surface2 border border-border rounded-[32px] p-4 space-y-4 overflow-y-auto custom-scrollbar shadow-inner">
                    {stageLeads.map((lead) => (
                      <Link 
                        key={lead.id}
                        to={`/crm/leads/${lead.id}`}
                        className="block bg-surface2 backdrop-blur-md border border-border rounded-[24px] p-5 hover:bg-surface3 hover:border-border transition-all shadow-sm group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <PriorityBadge priority={lead.priority} className="" />
                          <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-text mb-1">{lead.fullName}</h4>
                          <p className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest truncate">{lead.companyName || 'Independent'}</p>
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-muted">
                            <DollarSign size={12} />
                            <span className="text-[10px] font-mono font-bold">{lead.budgetRange || 'Budget unavailable'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {lead.assignedProfile ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-surface border border-border shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-text">
                                  {lead.assignedProfile.fullName.charAt(0).toUpperCase()}
                                </div>
                                <span className="sr-only">Assigned to {lead.assignedProfile.fullName}</span>
                              </>
                            ) : (
                              <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">Unassigned</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {stageLeads.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <div className="w-16 h-16 rounded-full bg-surface shadow-sm border border-border flex items-center justify-center mb-4">
                          <Users size={24} className="text-muted" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-muted tracking-widest uppercase italic">Empty Stage</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
