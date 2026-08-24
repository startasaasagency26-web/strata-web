import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Mail,
  Calendar,
  User,
  Globe,
  Clock,
  MoreHorizontal,
  Loader2,
  Edit2,
  Plus,
  Network,
  Share2,
  Phone,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import {
  LoadingState,
  ErrorState,
  CrmSelect
} from '../../components/crm/CrmUI';
import { getFollowUps, getLead, getLeadNotes, createLeadNote, updateLead } from '../../lib/crm/client';
import type { FollowUp, Lead, LeadNote, LeadPriority, LeadStatus } from '../../types/crm';
import { cn } from '../../lib/utils';

const getInitials = (name: string): string => {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
};

const ALL_STAGES: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New Lead' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualification' },
  { value: 'discovery_scheduled', label: 'Discovery' },
  { value: 'proposal_sent', label: 'Proposal' },
  { value: 'negotiating', label: 'Negotiation' },
  { value: 'won', label: 'Closed Won' },
  { value: 'lost', label: 'Closed Lost' },
  { value: 'unresponsive', label: 'Unresponsive' },
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

export const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingPriority, setIsUpdatingPriority] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [now] = useState(() => Date.now());
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useDismissableLayer(showProfileMenu, profileMenuRef, () => setShowProfileMenu(false));

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [leadData, noteData, followUpData] = await Promise.all([
          getLead(id),
          getLeadNotes(id),
          getFollowUps({ leadId: id }),
        ]);

        if (!leadData) {
          setError('Lead not found.');
        } else {
          setLead(leadData);
          setNotes(noteData);
          setFollowUps(followUpData);
        }
      } catch (err) {
        console.error('[crm/lead-detail] Data fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load lead details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || !id) return;
    setIsUpdatingStatus(true);
    setActionError('');
    try {
      const updated = await updateLead(id, { status: newStatus });
      setLead(updated);
      setNotice('Lead status updated.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: LeadPriority) => {
    if (!lead || !id) return;
    setIsUpdatingPriority(true);
    setActionError('');
    try {
      const updated = await updateLead(id, { priority: newPriority });
      setLead(updated);
      setNotice('Lead priority updated.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update priority.');
    } finally {
      setIsUpdatingPriority(false);
    }
  };

  const handleAddNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !id || isSubmittingNote) return;

    setIsSubmittingNote(true);
    setActionError('');
    try {
      const note = await createLeadNote(id, newNote, 'general');
      setNotes([note, ...notes]);
      setNewNote('');
      setNotice('Note added.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to add note.');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const copyText = async (value: string | undefined, label: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setNotice(`${label} copied.`);
      setShowProfileMenu(false);
    } catch {
      setActionError('Copy failed. Select the value manually.');
    }
  };

  const shareLead = async () => {
    await copyText(window.location.href, 'Lead link');
  };

  if (isLoading) return <CrmShell><LoadingState message="Loading lead data..." /></CrmShell>;
  if (error || !lead) return <CrmShell><ErrorState message={error || 'Lead not found'} onRetry={() => navigate('/crm/leads')} /></CrmShell>;

  const ageDays = lead.createdAt
    ? Math.floor((now - new Date(lead.createdAt).getTime()) / 86400000)
    : null;
  const activeStageIndex = ALL_STAGES.findIndex((stage) => stage.value === lead.status);
  const phoneDigits = lead.whatsappPhone?.replace(/[^0-9]/g, '');
  const hasEmail = Boolean(lead.workEmail);
  const hasPhone = Boolean(phoneDigits);
  const sourceIsUrl = lead.sourcePage?.startsWith('http');

  return (
    <CrmShell>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgb(var(--gold)/0.05),transparent_42%)] -z-10" />

      <div className="space-y-6 max-w-[1600px] mx-auto pb-20 relative z-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-4">
          <div className="flex items-center gap-6">
            <Link to="/crm/leads" aria-label="Back to leads" className="w-10 h-10 rounded-full bg-surface2 border border-border shadow-sm flex items-center justify-center text-muted hover:bg-surface3 hover:text-text transition-all shrink-0">
              <ChevronLeft size={18} />
            </Link>
            <div>
              <h1 className="text-4xl md:text-[40px] font-display font-medium text-text leading-[1.1] tracking-tight">
                {lead.fullName}
              </h1>
              <p className="mt-2 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">{lead.companyName || 'Independent'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-surface2 border border-border shadow-sm rounded-full px-5 py-2.5">
              <Globe size={16} className="text-text2" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text">{lead.sourcePage || 'Source unavailable'}</span>
                  <span className="text-[8px] font-bold bg-gold text-void px-1.5 py-0.5 rounded-full uppercase">Source</span>
                </div>
                <span className="text-[10px] text-muted">Captured from lead record</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface2 border border-border shadow-sm rounded-full px-5 py-2.5">
              <Clock size={16} className="text-text2" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text">{ageDays !== null ? `${ageDays} Days` : '—'}</span>
                  <span className="text-[8px] font-bold bg-gold text-void px-1.5 py-0.5 rounded-full uppercase">Age</span>
                </div>
                <span className="text-[10px] text-muted">Created {new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {notice && (
          <div className="rounded-[18px] border border-positive/30 bg-positiveSoft px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-positive">
            {notice}
          </div>
        )}
        {actionError && (
          <div className="rounded-[18px] border border-danger/30 bg-dangerSoft px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-danger">
            {actionError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.3fr_1fr] xl:grid-cols-[1.8fr_1.5fr_1fr] gap-6 items-start">
          <div className="space-y-4">
            <div className="flex items-center justify-between pl-2 mb-2">
              <h2 className="text-sm font-bold text-text">Interaction History</h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">{notes.length} notes</span>
            </div>

            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-[24px] border border-border bg-surface2 p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">{note.type.replace('_', ' ')}</p>
                        <p className="mt-2 text-sm font-semibold text-text leading-relaxed">{note.note}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {note.createdBy && (
                      <p className="mt-3 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">By {note.createdBy}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[32px] border border-border bg-surface2 px-8 py-16 text-center shadow-sm">
                <p className="text-base font-bold text-text uppercase tracking-tight mb-2">No notes yet</p>
                <p className="text-xs font-mono text-muted uppercase tracking-widest">Saved notes will appear here after submission</p>
              </div>
            )}

            <form onSubmit={handleAddNote} className="bg-surface2 rounded-3xl p-4 shadow-sm mt-2 flex gap-2">
              <input
                placeholder="Add a new interaction note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-transparent border-none text-sm font-semibold text-text outline-none placeholder:text-muted px-2"
              />
              <button
                type="submit"
                aria-label="Add note"
                disabled={isSubmittingNote || !newNote.trim()}
                className="w-10 h-10 rounded-full bg-gold text-void flex items-center justify-center hover:bg-goldHover shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingNote ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-surface2 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-text">Lead Follow-ups</h3>
                <button
                  onClick={() => navigate(`/crm/follow-ups?create=1&leadId=${lead.id}`)}
                  aria-label="Schedule follow-up for this lead"
                  className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-muted hover:bg-surface3"
                >
                  <Plus size={14} />
                </button>
              </div>

              {followUps.length > 0 ? (
                <div className="space-y-3">
                  {followUps.map((task) => (
                    <div key={task.id} className="rounded-[18px] border border-border bg-surface2 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-text">{task.title}</p>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">{task.contactMethod || 'contact'} · {task.status}</p>
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">{new Date(task.dueAt).toLocaleDateString()}</span>
                      </div>
                      {task.notes && <p className="mt-2 text-xs text-muted">{task.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-border bg-surface2 px-6 py-10 text-center">
                  <p className="text-sm font-bold text-text">No follow-ups scheduled</p>
                  <p className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Use the plus button to schedule one</p>
                </div>
              )}
            </div>

            <div className="bg-surface2 rounded-[32px] p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-text">Status Progression</h3>
              </div>

              <div className="space-y-2">
                {ALL_STAGES.map((stage, index) => {
                  const isCurrent = stage.value === lead.status;
                  const isComplete = activeStageIndex >= 0 && index < activeStageIndex && !['lost', 'unresponsive'].includes(lead.status);
                  return (
                    <div key={stage.value} className={cn(
                      'rounded-2xl border px-4 py-3 flex items-center justify-between',
                      isCurrent ? 'bg-surface border-info/30 shadow-sm' : 'bg-surface2 border-border',
                      isComplete && 'text-positive'
                    )}>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{stage.label}</span>
                      {isComplete ? <CheckCircle2 size={14} /> : isCurrent ? <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-info">Current</span> : <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted/60">Pending</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface2 rounded-[32px] p-6 shadow-sm flex flex-col items-center relative">
              <div className="absolute top-6 left-6 flex gap-2">
                <button disabled title="Relationship graph not connected yet." aria-label="Relationship graph unavailable" className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-muted/60 cursor-not-allowed">
                  <Network size={14} />
                </button>
                <button onClick={shareLead} aria-label="Copy lead link" className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-text2 hover:bg-surface3">
                  <Share2 size={14} />
                </button>
              </div>
              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() => setShowProfileMenu((value) => !value)}
                  aria-label="Open profile actions"
                  aria-expanded={showProfileMenu}
                  className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-text2 hover:bg-surface3"
                >
                  <MoreHorizontal size={14} />
                </button>
                {showProfileMenu && (
                  <div ref={profileMenuRef} className="absolute right-0 top-10 z-20 w-56 rounded-[18px] bg-surface border border-border shadow-xl p-2">
                    <button onClick={() => copyText(lead.workEmail, 'Email')} disabled={!hasEmail} className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2 disabled:text-muted/60 disabled:cursor-not-allowed">
                      <Copy size={14} /> Copy email
                    </button>
                    <button onClick={() => copyText(lead.whatsappPhone, 'WhatsApp')} disabled={!hasPhone} className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2 disabled:text-muted/60 disabled:cursor-not-allowed">
                      <Copy size={14} /> Copy WhatsApp
                    </button>
                    {sourceIsUrl ? (
                      <a href={lead.sourcePage} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-text2 hover:bg-surface2">
                        <Globe size={14} /> Open source
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-muted/60">
                        <Globe size={14} /> No source URL
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 mb-4 mt-8 flex items-center justify-center text-text font-bold text-3xl shadow-sm">
                {getInitials(lead.fullName)}
              </div>
              <h2 className="text-xl font-bold text-text leading-tight">{lead.fullName}</h2>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest text-center mt-1.5 mb-6 leading-relaxed max-w-[220px]">
                {lead.roleInBusiness || 'Role unknown'}, {lead.companyName || 'Independent'}
              </p>

              <div className="flex gap-2 bg-surface3 rounded-full p-1.5 border border-border">
                <button disabled title="Lead profile editing is not connected yet." aria-label="Lead profile editing unavailable" className="w-9 h-9 rounded-full flex items-center justify-center text-muted/60 cursor-not-allowed shadow-sm">
                  <Edit2 size={14} />
                </button>
                {hasEmail ? (
                  <a aria-label={`Email ${lead.fullName}`} href={`mailto:${lead.workEmail}`} className="w-9 h-9 rounded-full hover:bg-surface3 flex items-center justify-center text-text2 transition-colors shadow-sm"><Mail size={14} /></a>
                ) : (
                  <button disabled title="No email saved" aria-label="Email unavailable" className="w-9 h-9 rounded-full flex items-center justify-center text-muted/60 cursor-not-allowed shadow-sm"><Mail size={14} /></button>
                )}
                {hasPhone ? (
                  <a aria-label={`WhatsApp ${lead.fullName}`} href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full hover:bg-surface3 flex items-center justify-center text-text2 transition-colors shadow-sm"><Phone size={14} /></a>
                ) : (
                  <button disabled title="No WhatsApp number saved" aria-label="WhatsApp unavailable" className="w-9 h-9 rounded-full flex items-center justify-center text-muted/60 cursor-not-allowed shadow-sm"><Phone size={14} /></button>
                )}
                <button onClick={() => navigate(`/crm/follow-ups?create=1&leadId=${lead.id}`)} aria-label="Create follow-up" className="w-9 h-9 rounded-full hover:bg-surface3 flex items-center justify-center text-text2 transition-colors shadow-sm"><Plus size={14} /></button>
                <button onClick={() => navigate(`/crm/follow-ups?leadId=${lead.id}`)} aria-label="Open lead calendar follow-ups" className="w-9 h-9 rounded-full hover:bg-surface3 flex items-center justify-center text-text2 transition-colors shadow-sm"><Calendar size={14} /></button>
              </div>
            </div>

            <div className="bg-surface2 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-text">Detailed Information</h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <User size={14} />, label: 'Role', value: lead.roleInBusiness || 'Unknown' },
                  { icon: <Mail size={14} />, label: 'Email', value: lead.workEmail || 'Not provided' },
                  { icon: <Phone size={14} />, label: 'Phone Number', value: lead.whatsappPhone || 'Not provided' },
                  { icon: <Globe size={14} />, label: 'Source', value: lead.sourcePage || 'Unavailable' },
                  { icon: <Calendar size={14} />, label: 'Last Contacted', value: lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString() : 'Never' },
                  { icon: <Clock size={14} />, label: 'Timeline', value: lead.timeline || 'Not specified' },
                ].map((field) => (
                  <div key={field.label} className="flex items-center justify-between py-1">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="text-muted w-5 flex justify-center shrink-0">{field.icon}</div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider">{field.label}</span>
                        <span className="text-[13px] font-bold text-text break-words">{field.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface2 border border-border rounded-[32px] p-6 shadow-sm space-y-4">
              <div className="relative">
                {isUpdatingStatus && <Loader2 size={14} className="absolute right-3 top-8 z-10 animate-spin text-muted" />}
                <CrmSelect
                  label="Sales Status"
                  value={lead.status}
                  disabled={isUpdatingStatus}
                  onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="discovery_scheduled">Discovery Scheduled</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="negotiating">Negotiating</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                  <option value="unresponsive">Unresponsive</option>
                </CrmSelect>
              </div>

              <div className="relative">
                {isUpdatingPriority && <Loader2 size={14} className="absolute right-3 top-8 z-10 animate-spin text-muted" />}
                <CrmSelect
                  label="Priority Level"
                  value={lead.priority}
                  disabled={isUpdatingPriority}
                  onChange={(e) => handlePriorityChange(e.target.value as LeadPriority)}
                >
                  <option value="hot">Hot Opportunity</option>
                  <option value="warm">Warm Lead</option>
                  <option value="cold">Cold Lead</option>
                </CrmSelect>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
