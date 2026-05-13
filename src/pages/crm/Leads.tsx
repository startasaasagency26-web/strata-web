import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MessageCircle,
  Mail,
  MoreVertical,
  Plus,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, StatusBadge, PriorityBadge } from '../../components/crm/CrmUI';
import { getLeads } from '../../lib/crm/client';
import type { Lead, LeadStatus } from '../../types/crm';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-emerald-400 to-emerald-600',
  'from-rose-400 to-rose-600',
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
];

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function formatRelativeDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Never';
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
}

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
        setError('Failed to load leads.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <CrmShell><LoadingState message="Fetching leads..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-tight text-gray-900">Leads</h1>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">{leads.length} total contacts</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gray-700 transition-all shadow-sm">
            <Plus size={13} /> Add Lead
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2 sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase cursor-pointer hover:text-gray-700">
                      Contact <ArrowUpDown size={10} />
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">Service</th>
                  <th className="px-5 py-3.5 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">Status</th>
                  <th className="px-5 py-3.5 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">Last Contacted</th>
                  <th className="px-5 py-3.5 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">Reach Out</th>
                  <th className="px-5 py-3.5 text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead, i) => {
                  const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors group">

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center font-mono text-[11px] font-bold text-white shrink-0',
                            avatarColor
                          )}>
                            {getInitials(lead.fullName)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-900">{lead.fullName}</div>
                            <div className="text-[10px] font-mono text-gray-400 uppercase">{lead.companyName || '—'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-semibold text-gray-700">{lead.selectedPackage || lead.serviceNeed || '—'}</div>
                        <div className="text-[10px] font-mono text-gray-400">{lead.budgetRange || ''}</div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5">
                          <StatusBadge status={lead.status} className="w-fit" />
                          <PriorityBadge priority={lead.priority} className="w-fit" />
                        </div>
                      </td>

                      {/* Last Contacted */}
                      <td className="px-5 py-4">
                        <span className={cn(
                          'text-xs font-mono font-bold',
                          lead.lastContactedAt ? 'text-gray-700' : 'text-gray-300'
                        )}>
                          {formatRelativeDate(lead.lastContactedAt)}
                        </span>
                      </td>

                      {/* Reach Out */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${lead.whatsappPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp"
                            className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
                          >
                            <MessageCircle size={14} />
                          </a>
                          <a
                            href={`mailto:${lead.workEmail}`}
                            title="Email"
                            className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                          >
                            <Mail size={14} />
                          </a>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/crm/leads/${lead.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-gray-700 transition-all"
                          >
                            View <ChevronRight size={11} />
                          </Link>
                          <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">No leads found</p>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">Try adjusting your search or filter</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Showing {filteredLeads.length} of {leads.length} leads
            </span>
            <div className="flex gap-1.5">
              <button disabled className="px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-mono text-gray-400 disabled:opacity-40 bg-white">Prev</button>
              <button disabled className="px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-mono text-gray-400 disabled:opacity-40 bg-white">Next</button>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
