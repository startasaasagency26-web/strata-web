import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle,
  Mail,
  MoreVertical,
  Plus
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, StatusBadge, PriorityBadge, CrmInput, CrmSelect } from '../../components/crm/CrmUI';
import { getLeads } from '../../lib/crm/client';
import type { Lead, LeadStatus } from '../../types/crm';
import { Link } from 'react-router-dom';

export const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError('Failed to load leads list.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <CrmShell><LoadingState message="Fetching lead database..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-white mb-2">Lead Management</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Filter, track, and engage opportunities</p>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-all flex items-center gap-2">
            <Plus size={14} /> Add Manual Lead
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <CrmInput 
              placeholder="Search by name, company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/[0.02] border-white/5"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="w-full md:w-48">
              <CrmSelect 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-white/[0.02] border-white/5"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </CrmSelect>
            </div>
            <button className="w-11 h-11 shrink-0 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Lead Details</th>
                  <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Service / Package</th>
                  <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Status & Priority</th>
                  <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Contact</th>
                  <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white/60">
                          {lead.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{lead.fullName}</div>
                          <div className="text-[10px] font-mono text-white/40 uppercase">{lead.companyName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-white/80">{lead.selectedPackage || lead.serviceNeed}</div>
                      <div className="text-[10px] font-mono text-white/30 uppercase">{lead.budgetRange}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <StatusBadge status={lead.status} className="w-fit" />
                        <PriorityBadge priority={lead.priority} className="w-fit opacity-60" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <a href={`https://wa.me/${lead.whatsappPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
                          <MessageCircle size={14} />
                        </a>
                        <a href={`mailto:${lead.workEmail}`} className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
                          <Mail size={14} />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/crm/leads/${lead.id}`}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-widest text-white/60 hover:text-white hover:border-white transition-all uppercase"
                        >
                          Details
                        </Link>
                        <button className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[10px] font-mono font-bold tracking-widest text-white/20 uppercase">No leads matching your filters</p>
            </div>
          )}

          <div className="px-6 py-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Showing {filteredLeads.length} of {leads.length} leads</span>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 rounded border border-white/5 text-[10px] font-mono text-white/20 disabled:opacity-30">Prev</button>
              <button disabled className="px-3 py-1 rounded border border-white/5 text-[10px] font-mono text-white/20 disabled:opacity-30">Next</button>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
