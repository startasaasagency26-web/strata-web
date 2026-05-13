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
import { LoadingState, ErrorState, StatusBadge, PriorityBadge, CrmInput } from '../../components/crm/CrmUI';
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

  const [showAddForm, setShowAddForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [addError, setAddError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLead = async () => {
    setAddError('');
    if (!fullName) {
      setAddError('Full name is required');
      return;
    }
    
    setIsSaving(true);
    try {
      const { data: { session } } = await import('../../lib/supabase/browser').then(m => m.supabase.auth.getSession());
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session ? { 'Authorization': `Bearer ${session.access_token}` } : {})
        },
        body: JSON.stringify({
          fullName,
          companyName,
          workEmail,
          whatsappPhone
        })
      });

      if (!res.ok) {
        throw new Error('Failed to create lead');
      }

      setShowAddForm(false);
      setFullName('');
      setCompanyName('');
      setWorkEmail('');
      setWhatsappPhone('');
      await fetchData();
    } catch (err: any) {
      setAddError(err.message || 'Error saving lead');
    } finally {
      setIsSaving(false);
    }
  };

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
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827]">Leads</h1>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">{leads.length} total contacts</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-[#111827] text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={14} /> Add Lead
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[24px] p-3 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/40 border border-white/50 shadow-inner rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-500 font-sans"
            />
          </div>
          <div className="flex gap-3 sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
              className="bg-white/40 border border-white/50 shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-blue-400 focus:bg-white transition-all appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <button className="w-12 h-12 rounded-xl bg-white/40 border border-white/50 shadow-inner flex items-center justify-center text-gray-500 hover:text-[#111827] hover:bg-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/40 bg-white/40">
                  <th className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase cursor-pointer hover:text-[#111827]">
                      Contact <ArrowUpDown size={12} />
                    </span>
                  </th>
                  <th className="px-6 py-4 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-4 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Last Contacted</th>
                  <th className="px-6 py-4 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Reach Out</th>
                  <th className="px-6 py-4 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {filteredLeads.map((lead, i) => {
                  const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <tr key={lead.id} className="hover:bg-white/60 transition-colors group">

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gradient-to-br flex items-center justify-center font-display text-xs font-bold text-white shrink-0',
                            avatarColor
                          )}>
                            {getInitials(lead.fullName)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#111827]">{lead.fullName}</div>
                            <div className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase mt-0.5">{lead.companyName || '—'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-[#111827]">{lead.selectedPackage || lead.serviceNeed || '—'}</div>
                        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-0.5">{lead.budgetRange || ''}</div>
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
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            to={`/crm/leads/${lead.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/60 border border-white/50 text-[#111827] text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-white hover:shadow-sm transition-all"
                          >
                            View <ChevronRight size={14} />
                          </Link>
                          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] transition-colors rounded-xl hover:bg-white border border-transparent hover:border-white/50">
                            <MoreVertical size={18} />
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
            <div className="py-24 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-base font-bold text-[#111827] uppercase tracking-tight mb-2">No leads found</p>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Try adjusting your search or filter</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/40 bg-white/20 flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
              Showing {filteredLeads.length} of {leads.length} leads
            </span>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 rounded-xl border border-white/50 text-[10px] font-mono font-bold tracking-widest text-[#111827] uppercase disabled:opacity-40 disabled:bg-transparent disabled:text-gray-400 bg-white hover:shadow-sm transition-all">Prev</button>
              <button disabled className="px-4 py-2 rounded-xl border border-white/50 text-[10px] font-mono font-bold tracking-widest text-[#111827] uppercase disabled:opacity-40 disabled:bg-transparent disabled:text-gray-400 bg-white hover:shadow-sm transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md border border-white/50 rounded-[24px] p-6 w-full max-w-md shadow-xl flex flex-col gap-6">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Add Lead</h2>
            
            {addError && (
              <div className="text-[10px] font-mono font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 uppercase tracking-widest">
                {addError}
              </div>
            )}
            
            <div className="space-y-4">
              <CrmInput 
                label="Full Name *" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="e.g. John Doe"
              />
              <CrmInput 
                label="Company Name" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                placeholder="e.g. Acme Corp"
              />
              <CrmInput 
                label="Work Email" 
                type="email"
                value={workEmail} 
                onChange={(e) => setWorkEmail(e.target.value)} 
                placeholder="john@example.com"
              />
              <CrmInput 
                label="WhatsApp Phone" 
                value={whatsappPhone} 
                onChange={(e) => setWhatsappPhone(e.target.value)} 
                placeholder="+1234567890"
              />
            </div>
            
            <div className="flex gap-3 justify-end mt-2">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-[#111827] text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleAddLead}
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-[#111827] text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </CrmShell>
  );
};
