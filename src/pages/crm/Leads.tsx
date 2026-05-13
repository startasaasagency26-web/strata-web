import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MessageCircle,
  Mail,
  MoreVertical,
  Plus,
  ChevronRight,
  ArrowUpDown,
  Copy,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, StatusBadge, PriorityBadge, CrmInput, CrmSelect } from '../../components/crm/CrmUI';
import { createLead, getLeadsPage, updateLead } from '../../lib/crm/client';
import type { Lead, LeadPriority, LeadStatus } from '../../types/crm';
import { cn } from '../../lib/utils';

const PAGE_SIZE = 10;

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
  }, [isOpen, onClose, ref]);
}

export const Leads = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>((searchParams.get('status') as LeadStatus) || 'all');
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | 'all'>('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'follow_up'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(searchParams.get('add') === '1');
  const [openRowMenu, setOpenRowMenu] = useState<string | null>(null);
  const [contactingLeadId, setContactingLeadId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [addError, setAddError] = useState('');

  const filterRef = useRef<HTMLDivElement>(null);
  const rowMenuRef = useRef<HTMLDivElement>(null);
  const addModalRef = useRef<HTMLFormElement>(null);

  const closeAddModal = () => {
    setShowAddForm(false);
    setAddError('');
    const next = new URLSearchParams(searchParams);
    next.delete('add');
    setSearchParams(next, { replace: true });
  };

  useDismissableLayer(showFilters, filterRef, () => setShowFilters(false));
  useDismissableLayer(Boolean(openRowMenu), rowMenuRef, () => setOpenRowMenu(null));
  useDismissableLayer(showAddForm, addModalRef, closeAddModal);

  useEffect(() => {
    const search = searchParams.get('search');
    const status = searchParams.get('status') as LeadStatus | null;
    const timeout = window.setTimeout(() => {
      if (search !== null) setSearchTerm(search);
      if (status) setStatusFilter(status);
      if (searchParams.get('add') === '1') setShowAddForm(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      if (!isLoading) setIsRefreshing(true);
      setError('');

      try {
        const result = await getLeadsPage({
          page,
          limit: PAGE_SIZE,
          search: searchTerm.trim() || undefined,
          status: statusFilter === 'all' ? undefined : statusFilter,
          priority: priorityFilter === 'all' ? undefined : priorityFilter,
          sort,
        });

        if (!cancelled) {
          setLeads(result.leads);
          setTotal(result.total);
        }
      } catch (err) {
        console.error('[crm/leads] Data fetch failed:', err);
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load leads.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [page, searchTerm, statusFilter, priorityFilter, sort, isLoading]);

  const refreshCurrentPage = async () => {
    const result = await getLeadsPage({
      page,
      limit: PAGE_SIZE,
      search: searchTerm.trim() || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
      priority: priorityFilter === 'all' ? undefined : priorityFilter,
      sort,
    });
    setLeads(result.leads);
    setTotal(result.total);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleAddLead = async (event: FormEvent) => {
    event.preventDefault();
    setAddError('');
    setNotice('');

    if (!fullName.trim()) {
      setAddError('Full name is required.');
      return;
    }

    setIsSaving(true);
    try {
      await createLead({
        fullName,
        companyName,
        workEmail,
        whatsappPhone,
      });

      setFullName('');
      setCompanyName('');
      setWorkEmail('');
      setWhatsappPhone('');
      closeAddModal();
      setNotice('Lead created and saved.');
      setPage(1);
      await refreshCurrentPage();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Error saving lead.');
    } finally {
      setIsSaving(false);
    }
  };

  const copyText = async (value: string | null | undefined, label: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setNotice(`${label} copied.`);
      setOpenRowMenu(null);
    } catch {
      setNotice('Copy failed. Select the value manually.');
    }
  };

  const markContacted = async (lead: Lead) => {
    setContactingLeadId(lead.id);
    setNotice('');
    try {
      const updated = await updateLead(lead.id, {
        status: 'contacted',
        lastContactedAt: new Date().toISOString(),
      });
      setLeads((current) => current.map((item) => item.id === updated.id ? updated : item));
      setNotice(`${lead.fullName} marked as contacted.`);
      setOpenRowMenu(null);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Failed to mark contacted.');
    } finally {
      setContactingLeadId(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (isLoading) return <CrmShell><LoadingState message="Fetching leads..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} onRetry={() => window.location.reload()} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827]">Leads</h1>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
              {total} total contacts
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-[#111827] text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={14} /> Add Lead
          </button>
        </div>

        {notice && (
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
            {notice}
          </div>
        )}

        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[24px] p-3 flex flex-col sm:flex-row gap-3 shadow-sm relative">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search leads"
              className="w-full bg-white/40 border border-white/50 shadow-inner rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-500 font-sans"
            />
          </div>
          <div className="flex gap-3 sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as LeadStatus | 'all'); setPage(1); }}
              aria-label="Filter leads by status"
              className="bg-white/40 border border-white/50 shadow-inner rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-blue-400 focus:bg-white transition-all appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="discovery_scheduled">Discovery Scheduled</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="negotiating">Negotiating</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="unresponsive">Unresponsive</option>
            </select>
            <button
              onClick={() => setShowFilters((value) => !value)}
              aria-label="Open advanced lead filters"
              aria-expanded={showFilters}
              className="w-12 h-12 rounded-xl bg-white/40 border border-white/50 shadow-inner flex items-center justify-center text-gray-500 hover:text-[#111827] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 transition-all"
            >
              <Filter size={18} />
            </button>
          </div>

          {showFilters && (
            <div
              ref={filterRef}
              className="absolute right-3 top-[calc(100%+0.5rem)] z-30 w-[300px] rounded-[24px] border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Advanced Filters</h2>
                <button onClick={() => setShowFilters(false)} aria-label="Close advanced filters" className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <X size={14} />
                </button>
              </div>
              <CrmSelect
                label="Priority"
                value={priorityFilter}
                onChange={(event) => { setPriorityFilter(event.target.value as LeadPriority | 'all'); setPage(1); }}
              >
                <option value="all">All Priorities</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </CrmSelect>
              <CrmSelect
                label="Sort"
                value={sort}
                onChange={(event) => { setSort(event.target.value as typeof sort); setPage(1); }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="follow_up">Next follow-up</option>
              </CrmSelect>
              <button
                onClick={() => { setPriorityFilter('all'); setSort('newest'); setStatusFilter('all'); setSearchTerm(''); setPage(1); }}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] overflow-hidden shadow-sm relative">
          {isRefreshing && (
            <div className="absolute right-6 top-5 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 shadow-sm">
              <Loader2 size={12} className="animate-spin" /> Updating
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/40 bg-white/40">
                  <th className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
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
                {leads.map((lead, i) => {
                  const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  const phoneDigits = lead.whatsappPhone?.replace(/[^0-9]/g, '');
                  const canWhatsApp = Boolean(phoneDigits);
                  const canEmail = Boolean(lead.workEmail);

                  return (
                    <tr key={lead.id} className="hover:bg-white/60 transition-colors group">
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
                            <div className="text-[10px] font-mono font-bold text-gray-500 tracking-widest uppercase mt-0.5">{lead.companyName || 'Independent'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-[#111827]">{lead.selectedPackage || lead.serviceNeed || 'Not specified'}</div>
                        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-0.5">{lead.budgetRange || 'Budget unavailable'}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5">
                          <StatusBadge status={lead.status} className="w-fit" />
                          <PriorityBadge priority={lead.priority} className="w-fit" />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn('text-xs font-mono font-bold', lead.lastContactedAt ? 'text-gray-700' : 'text-gray-300')}>
                          {formatRelativeDate(lead.lastContactedAt)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {canWhatsApp ? (
                            <a
                              href={`https://wa.me/${phoneDigits}`}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`WhatsApp ${lead.fullName}`}
                              className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
                            >
                              <MessageCircle size={14} />
                            </a>
                          ) : (
                            <button disabled title="No WhatsApp number saved" aria-label="WhatsApp unavailable" className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed">
                              <MessageCircle size={14} />
                            </button>
                          )}
                          {canEmail ? (
                            <a
                              href={`mailto:${lead.workEmail}`}
                              aria-label={`Email ${lead.fullName}`}
                              className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                            >
                              <Mail size={14} />
                            </a>
                          ) : (
                            <button disabled title="No email saved" aria-label="Email unavailable" className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed">
                              <Mail size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 relative">
                          <Link
                            to={`/crm/leads/${lead.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/60 border border-white/50 text-[#111827] text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-white hover:shadow-sm transition-all"
                          >
                            View <ChevronRight size={14} />
                          </Link>
                          <button
                            onClick={() => setOpenRowMenu(openRowMenu === lead.id ? null : lead.id)}
                            aria-label={`Open actions for ${lead.fullName}`}
                            aria-expanded={openRowMenu === lead.id}
                            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] transition-colors rounded-xl hover:bg-white border border-transparent hover:border-white/50"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {openRowMenu === lead.id && (
                            <div
                              ref={rowMenuRef}
                              className="absolute right-0 top-11 z-20 w-56 rounded-[18px] bg-white border border-gray-100 shadow-xl p-2 text-left"
                            >
                              <Link to={`/crm/leads/${lead.id}`} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50">
                                <ChevronRight size={14} /> View lead
                              </Link>
                              <button
                                onClick={() => copyText(lead.workEmail, 'Email')}
                                disabled={!lead.workEmail}
                                className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                              >
                                <Copy size={14} /> Copy email
                              </button>
                              <button
                                onClick={() => copyText(lead.whatsappPhone, 'WhatsApp')}
                                disabled={!lead.whatsappPhone}
                                className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                              >
                                <Copy size={14} /> Copy WhatsApp
                              </button>
                              <button
                                onClick={() => markContacted(lead)}
                                disabled={contactingLeadId === lead.id}
                                className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                              >
                                {contactingLeadId === lead.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Mark contacted
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {leads.length === 0 && (
            <div className="py-24 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-base font-bold text-[#111827] uppercase tracking-tight mb-2">No leads found</p>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create a lead or wait for form submissions'}
              </p>
            </div>
          )}

          <div className="px-6 py-4 border-t border-white/40 bg-white/20 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
              Page {page} of {totalPages} · Showing {leads.length} of {total} leads
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                title={page <= 1 ? 'Already on the first page' : 'Previous page'}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="px-4 py-2 rounded-xl border border-white/50 text-[10px] font-mono font-bold tracking-widest text-[#111827] uppercase disabled:opacity-40 disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed bg-white hover:shadow-sm transition-all"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                title={page >= totalPages ? 'No more lead pages' : 'Next page'}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="px-4 py-2 rounded-xl border border-white/50 text-[10px] font-mono font-bold tracking-widest text-[#111827] uppercase disabled:opacity-40 disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed bg-white hover:shadow-sm transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-lead-title">
          <form
            ref={addModalRef}
            onSubmit={handleAddLead}
            className="bg-white/90 backdrop-blur-md border border-white/50 rounded-[24px] p-6 w-full max-w-md shadow-xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 id="add-lead-title" className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Add Lead</h2>
              <button type="button" onClick={closeAddModal} aria-label="Close add lead modal" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>

            {addError && (
              <div className="text-[10px] font-mono font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 uppercase tracking-widest">
                {addError}
              </div>
            )}

            <div className="space-y-4">
              <CrmInput label="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Doe" required />
              <CrmInput label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Independent if blank" />
              <CrmInput label="Work Email" type="email" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} placeholder="john@example.com" />
              <CrmInput label="WhatsApp Phone" value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} placeholder="+60123456789" />
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
              Missing optional CRM fields are saved with internal manual-entry defaults.
            </div>

            <div className="flex gap-3 justify-end mt-2">
              <button
                type="button"
                onClick={closeAddModal}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-[#111827] text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 bg-[#111827] text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      )}
    </CrmShell>
  );
};
