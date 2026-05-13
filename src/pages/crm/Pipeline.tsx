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
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] mb-2">Sales Pipeline</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-500 uppercase">Visual deal tracking & stage control</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[24px] px-6 py-3 flex items-center gap-4 shadow-sm">
              <div className="text-right">
                <p className="text-[9px] font-mono font-bold tracking-widest text-gray-500 uppercase">Total Value</p>
                <p className="text-lg font-display font-bold text-[#111827] uppercase tracking-tight">RM 142.5k</p>
              </div>
              <TrendingUp size={24} className="text-emerald-500" />
            </div>
            <button className="w-14 h-14 rounded-full bg-[#111827] text-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all">
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
                    <div className="flex items-center gap-3">
                      <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-500 uppercase">{stage.name}</h3>
                      <span className="w-6 h-6 rounded-full bg-white border border-white/50 flex items-center justify-center text-[10px] font-mono font-bold text-[#111827] shadow-sm">
                        {stageLeads.length}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-[#111827] transition-colors"><MoreVertical size={16} /></button>
                  </div>

                  <div className="flex-1 bg-white/40 border border-white/50 rounded-[32px] p-4 space-y-4 overflow-y-auto custom-scrollbar shadow-inner">
                    {stageLeads.map((lead) => (
                      <Link 
                        key={lead.id}
                        to={`/crm/leads/${lead.id}`}
                        className="block bg-white/60 backdrop-blur-md border border-white/50 rounded-[24px] p-5 hover:bg-white hover:border-white transition-all shadow-sm group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <PriorityBadge priority={lead.priority} className="" />
                          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-[#111827] mb-1">{lead.fullName}</h4>
                          <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest truncate">{lead.companyName || 'Independent'}</p>
                        </div>

                        <div className="pt-4 border-t border-white/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <DollarSign size={12} />
                            <span className="text-[10px] font-mono font-bold">{lead.budgetRange.replace('RM ', '')}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white border border-white/50 shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-[#111827]">
                            {lead.assignedTo?.charAt(0) || '?'}
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {stageLeads.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center mb-4">
                          <Users size={24} className="text-gray-400" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase italic">Empty Stage</span>
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
