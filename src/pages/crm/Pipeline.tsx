import { useState, useEffect } from 'react';
import { 
  Users, 
  MoreVertical,
  Plus,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, PriorityBadge } from '../../components/crm/CrmUI';
import { getLeads } from '../../lib/crm/client';
import type { Lead, LeadStatus } from '../../types/crm';
import { Link } from 'react-router-dom';

const PIPELINE_STAGES: { id: LeadStatus; name: string }[] = [
  { id: 'new', name: 'New Inbound' },
  { id: 'contacted', name: 'Contacted' },
  { id: 'qualified', name: 'Qualified' },
  { id: 'proposal_sent', name: 'Proposal Sent' },
  { id: 'won', name: 'Project Won' },
  { id: 'lost', name: 'Closed Lost' },
];

export const Pipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError('Failed to load pipeline.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Visualizing sales pipeline..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
          <div>
            <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-white mb-2">Sales Pipeline</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Visual deal tracking & stage control</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-2 flex items-center gap-4">
              <div className="text-right">
                <p className="text-[8px] font-mono font-bold tracking-widest text-white/20 uppercase">Total Value</p>
                <p className="text-sm font-display font-bold text-white uppercase tracking-tight">RM 142.5k</p>
              </div>
              <TrendingUp size={20} className="text-emerald-400 opacity-40" />
            </div>
            <button className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-6">
          <div className="flex gap-6 h-full min-w-[1400px]">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = leads.filter(l => l.status === stage.id);
              
              return (
                <div key={stage.id} className="w-[300px] flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/40 uppercase">{stage.name}</h3>
                      <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-white/20">
                        {stageLeads.length}
                      </span>
                    </div>
                    <button className="text-white/10 hover:text-white transition-colors"><MoreVertical size={14} /></button>
                  </div>

                  <div className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-[24px] p-3 space-y-3 overflow-y-auto custom-scrollbar">
                    {stageLeads.map((lead) => (
                      <Link 
                        key={lead.id}
                        to={`/crm/leads/${lead.id}`}
                        className="block bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <PriorityBadge priority={lead.priority} className="opacity-60" />
                          <span className="text-[8px] font-mono text-white/20 uppercase">{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-white transition-colors">{lead.fullName}</h4>
                          <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider truncate">{lead.companyName}</p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-white/40">
                            <DollarSign size={10} />
                            <span className="text-[10px] font-mono font-bold">{lead.budgetRange.replace('RM ', '')}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[8px] font-mono font-bold text-white/20">
                            {lead.assignedTo?.charAt(0) || '?'}
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {stageLeads.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-20">
                        <Users size={24} className="mb-2" />
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase italic">Empty Stage</span>
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
