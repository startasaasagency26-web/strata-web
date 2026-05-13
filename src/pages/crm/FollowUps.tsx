import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Plus,
  Loader2,
  X,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, EmptyState, CrmInput, CrmSelect } from '../../components/crm/CrmUI';
import { createFollowUp, getFollowUps, getLeads, updateFollowUp } from '../../lib/crm/client';
import type { ContactMethod, FollowUp, Lead } from '../../types/crm';
import { cn } from '../../lib/utils';

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

const tomorrowStart = () => {
  const date = new Date();
  date.setHours(24, 0, 0, 0);
  return date.getTime();
};

export const FollowUps = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState<'due' | 'upcoming' | 'completed'>('due');
  const [leadFilter, setLeadFilter] = useState(searchParams.get('leadId') ?? '');
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get('create') === '1');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const [leadId, setLeadId] = useState(searchParams.get('leadId') ?? '');
  const [title, setTitle] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [notes, setNotes] = useState('');

  const modalRef = useRef<HTMLFormElement>(null);

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreateError('');
    const next = new URLSearchParams(searchParams);
    next.delete('create');
    setSearchParams(next, { replace: true });
  };

  useDismissableLayer(showCreateModal, modalRef, closeCreateModal);

  const loadData = useCallback(async () => {
    const [tasks, leadOptions] = await Promise.all([
      getFollowUps(),
      getLeads({ limit: 200 }),
    ]);
    setFollowUps(tasks);
    setLeads(leadOptions);
    if (!leadId && leadOptions[0]) setLeadId(leadOptions[0].id);
  }, [leadId]);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        await loadData();
      } catch (err) {
        console.error('[crm/follow-ups] Data fetch failed:', err);
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load follow-ups.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [loadData]);

  useEffect(() => {
    const lead = searchParams.get('leadId');
    const timeout = window.setTimeout(() => {
      if (searchParams.get('create') === '1') setShowCreateModal(true);
      if (lead) {
        setLeadId(lead);
        setLeadFilter(lead);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [searchParams]);

  const handleMarkDone = async (id: string) => {
    if (loadingTaskId) return;
    setLoadingTaskId(id);
    setNotice('');
    try {
      const completedAt = new Date().toISOString();
      const updated = await updateFollowUp(id, { status: 'completed', completedAt });
      setFollowUps((current) => current.map((task) => task.id === id ? updated : task));
      setNotice('Follow-up marked done.');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Failed to update task.');
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleCreateFollowUp = async (event: FormEvent) => {
    event.preventDefault();
    setCreateError('');
    setNotice('');

    if (!leadId || !title.trim() || !dueAt) {
      setCreateError('Lead, title, and due date/time are required.');
      return;
    }

    setIsCreating(true);
    try {
      await createFollowUp({
        leadId,
        title,
        dueAt: new Date(dueAt).toISOString(),
        contactMethod,
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
      setTitle('');
      setDueAt('');
      setNotes('');
      closeCreateModal();
      await loadData();
      setNotice('Follow-up created.');
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create follow-up.');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredTasks = followUps.filter((task) => {
    if (leadFilter && task.leadId !== leadFilter) return false;
    if (activeTab === 'completed') return task.status === 'completed';
    const isDue = new Date(task.dueAt).getTime() < tomorrowStart();
    if (activeTab === 'due') return (task.status === 'pending' || task.status === 'overdue') && isDue;
    return task.status === 'pending' && !isDue;
  });

  if (isLoading) return <CrmShell><LoadingState message="Organizing your agenda..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} onRetry={() => window.location.reload()} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] mb-2">Follow-up Manager</h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-500 uppercase">Task discipline & relationship pacing</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex bg-white/40 border border-white/50 rounded-[24px] p-1 shadow-inner">
              {[
                { id: 'due', name: 'Due Today' },
                { id: 'upcoming', name: 'Upcoming' },
                { id: 'completed', name: 'Done' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'px-6 py-3 rounded-[16px] text-[10px] font-mono font-bold tracking-widest uppercase transition-all',
                    activeTab === tab.id ? 'bg-white text-[#111827] shadow-sm' : 'text-gray-500 hover:text-[#111827]'
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:bg-gray-800 hover:shadow-lg"
            >
              <Plus size={14} /> Create Follow-up
            </button>
          </div>
        </div>

        {notice && (
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
            {notice}
          </div>
        )}

        {leadFilter && (
          <div className="flex items-center justify-between rounded-[18px] border border-blue-200 bg-blue-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
            <span>Filtered to selected lead</span>
            <button onClick={() => setLeadFilter('')} className="flex items-center gap-2 hover:text-blue-900">
              <X size={12} /> Clear filter
            </button>
          </div>
        )}

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/50 shadow-sm',
                  task.status === 'completed' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-orange-50 text-orange-500 border-orange-100'
                )}>
                  {task.status === 'completed' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                </div>
                <div className="min-w-0">
                  <h3 className={cn(
                    'text-xl font-bold text-[#111827] mb-2 truncate',
                    task.status === 'completed' && 'text-gray-400 line-through'
                  )}>{task.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Lead: {task.leadName || 'Unknown lead'}</span>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={12} /> {new Date(task.dueAt).toLocaleString()}
                    </span>
                    {task.contactMethod && (
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{task.contactMethod}</span>
                    )}
                  </div>
                  {task.notes && <p className="text-xs text-gray-500 mt-3 max-w-2xl">{task.notes}</p>}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <Link
                  to={`/crm/leads/${task.leadId}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/40 border border-white/50 text-[10px] font-mono font-bold tracking-widest text-gray-500 hover:text-[#111827] hover:bg-white hover:shadow-sm transition-all uppercase"
                >
                  Open Lead <ExternalLink size={14} />
                </Link>
                {(task.status === 'pending' || task.status === 'overdue') && (
                  <button
                    onClick={() => handleMarkDone(task.id)}
                    disabled={loadingTaskId === task.id}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] text-white font-mono text-[10px] font-bold tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingTaskId === task.id && <Loader2 size={14} className="animate-spin" />}
                    {loadingTaskId === task.id ? 'Saving...' : 'Mark Done'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filteredTasks.length === 0 && (
            <EmptyState
              title={activeTab === 'completed' ? 'No completed tasks yet' : 'All caught up'}
              message={activeTab === 'completed' ? 'Completed follow-ups will appear here after you mark them done.' : `There are no ${activeTab} follow-ups right now.`}
              icon={<CheckCircle2 size={48} className="text-emerald-400" />}
            />
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="create-follow-up-title">
          <form ref={modalRef} onSubmit={handleCreateFollowUp} className="w-full max-w-lg rounded-[24px] border border-white/50 bg-white/95 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 id="create-follow-up-title" className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Create Follow-up</h2>
              <button type="button" onClick={closeCreateModal} aria-label="Close create follow-up modal" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>

            {createError && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                {createError}
              </div>
            )}

            <CrmSelect label="Lead" value={leadId} onChange={(event) => setLeadId(event.target.value)} disabled={leads.length === 0}>
              {leads.length === 0 ? (
                <option value="">No leads available</option>
              ) : (
                leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.fullName} · {lead.companyName || 'Independent'}
                  </option>
                ))
              )}
            </CrmSelect>
            <CrmInput label="Title *" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Discovery call" required />
            <CrmInput label="Due Date / Time *" type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} required />
            <CrmSelect label="Contact Method" value={contactMethod} onChange={(event) => setContactMethod(event.target.value as ContactMethod)}>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="call">Call</option>
            </CrmSelect>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase">Notes</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-24 w-full rounded-xl border border-white/50 bg-white/40 px-4 py-3 text-sm font-semibold text-[#111827] shadow-inner outline-none transition-all placeholder:text-gray-500 focus:border-blue-400 focus:bg-white"
                placeholder="Optional context for the follow-up"
              />
            </div>

            {leads.length === 0 && (
              <p className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700">
                Create a lead before scheduling a follow-up.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button type="button" onClick={closeCreateModal} disabled={isCreating} className="rounded-full border border-gray-200 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#111827] hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || leads.length === 0}
                className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating && <Loader2 size={14} className="animate-spin" />}
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </CrmShell>
  );
};
