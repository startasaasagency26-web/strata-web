import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { 
  ChevronLeft, 
  MessageCircle, 
  Mail, 
  Calendar, 
  User, 
  Briefcase, 
  Globe,
  Clock,
  MoreVertical,
  Paperclip,
  Loader2,
  ArrowRight,
  Edit2,
  Plus
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { 
  LoadingState, 
  ErrorState, 
  CrmSelect
} from '../../components/crm/CrmUI';
import { getLead, getLeadNotes, createLeadNote, updateLead } from '../../lib/crm/client';
import type { Lead, LeadNote } from '../../types/crm';
import { cn } from '../../lib/utils';

const getInitials = (name: string): string => {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
};

const getNoteColorStyles = (type: string) => {
  switch (type) {
    case 'system': return 'bg-gray-900 text-white';
    case 'user': return 'bg-blue-600 text-white';
    case 'call': return 'bg-teal-600 text-white';
    case 'whatsapp': return 'bg-emerald-500 text-white';
    case 'email': return 'bg-[#FBE365] text-gray-900'; // matching the yellow in the reference
    default: return 'bg-gray-100 text-gray-900';
  }
};

const ALL_STAGES = [
  { value: 'new', label: 'New Lead' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualification' },
  { value: 'discovery_scheduled', label: 'Discovery' },
  { value: 'proposal_sent', label: 'Proposal' },
  { value: 'negotiating', label: 'Negotiation' },
  { value: 'won', label: 'Closed Won' },
];

export const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [l, n] = await Promise.all([getLead(id), getLeadNotes(id)]);
        if (!l) {
          setError('Lead not found.');
        } else {
          setLead(l);
          setNotes(n);
        }
      } catch (err) {
        setError('Failed to load lead details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (newStatus: any) => {
    if (!lead || !id) return;
    try {
      const updated = await updateLead(id, { status: newStatus });
      setLead(updated);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handlePriorityChange = async (newPriority: any) => {
    if (!lead || !id) return;
    try {
      const updated = await updateLead(id, { priority: newPriority });
      setLead(updated);
    } catch (err) {
      alert('Failed to update priority');
    }
  };

  const handleAddNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !id || isSubmittingNote) return;

    setIsSubmittingNote(true);
    try {
      const note = await createLeadNote(id, newNote);
      setNotes([note, ...notes]);
      setNewNote('');
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  if (isLoading) return <CrmShell><LoadingState message="Deep diving into lead data..." /></CrmShell>;
  if (error || !lead) return <CrmShell><ErrorState message={error || 'Lead not found'} onRetry={() => navigate('/crm/leads')} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-20">
        {/* Header section matching reference image */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
          <div className="flex items-center gap-4">
            <Link to="/crm/leads" className="w-10 h-10 rounded-full bg-white/50 border border-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all shrink-0">
              <ChevronLeft size={18} />
            </Link>
            <h1 className="text-3xl md:text-[32px] font-display font-bold text-gray-900 leading-none">Customer<br/>Information</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-white/40 border border-gray-200/50 rounded-full px-4 py-2">
                <Globe size={14} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Website Source</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.sourcePage || 'Direct'}</span>
                </div>
             </div>
             <div className="flex items-center gap-2 bg-white/40 border border-gray-200/50 rounded-full px-4 py-2">
                <Clock size={14} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Created On</span>
                  <span className="text-xs font-semibold text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.3fr_1fr] xl:grid-cols-[1.8fr_1.5fr_1fr] gap-6 items-start">
          
          {/* LEFT COLUMN: Interaction History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pl-1">
              <h2 className="text-base font-bold text-gray-900">Interaction History</h2>
              <button className="w-8 h-8 rounded-full bg-white/50 border border-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm">
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {notes.map((note) => {
                const typeStyles = getNoteColorStyles(note.type);
                return (
                  <div key={note.id} className={cn("rounded-3xl p-6 relative overflow-hidden shadow-sm border border-black/5", typeStyles)}>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-70">
                        {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <button className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <p className="text-[15px] font-medium leading-relaxed mb-8">{note.note}</p>
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest uppercase opacity-70 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[8px]">
                           {getInitials(note.createdBy)}
                        </div>
                        <span>By {note.createdBy}</span>
                      </div>
                      <span className="bg-white/20 px-2 py-0.5 rounded-md">{note.type}</span>
                    </div>
                  </div>
                );
              })}

              {/* Note Composer */}
              <form onSubmit={handleAddNote} className="bg-white/60 border border-gray-200/50 rounded-3xl p-4 shadow-sm focus-within:bg-white focus-within:shadow-md transition-all">
                <textarea
                  placeholder="Add a new interaction note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full bg-transparent border-none text-sm text-gray-900 outline-none resize-none min-h-[80px] placeholder:text-gray-400"
                />
                <div className="flex justify-between items-center mt-2">
                  <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                    <Paperclip size={14} />
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmittingNote || !newNote.trim()}
                    className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-30 disabled:hover:bg-gray-900 shadow-sm"
                  >
                    {isSubmittingNote ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* CENTER COLUMN: Schedule + Funnel */}
          <div className="space-y-6">
            {/* Schedule block */}
            <div>
              <div className="flex items-center justify-between pl-1 mb-4">
                <h2 className="text-base font-bold text-gray-900">Tasks Schedule</h2>
                <button className="w-8 h-8 rounded-full bg-white/50 border border-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm">
                  <ArrowRight size={14} className="-rotate-45" />
                </button>
              </div>
              <div className="bg-white/60 border border-gray-200/50 rounded-3xl p-6 shadow-sm min-h-[180px] flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">No scheduled tasks</span>
              </div>
            </div>

            {/* Funnel block */}
            <div>
              <div className="flex items-center justify-between pl-1 mb-4">
                <h2 className="text-base font-bold text-gray-900">Stage Funnel</h2>
                <button className="w-8 h-8 rounded-full bg-white/50 border border-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm">
                  <MoreVertical size={14} />
                </button>
              </div>
              <div className="bg-white/60 border border-gray-200/50 rounded-3xl p-6 shadow-sm space-y-2">
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold text-gray-900">{lead.budgetRange || '-'}</span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Total in Pipeline</span>
                </div>
                
                {ALL_STAGES.map((stage) => {
                  const isActive = lead.status === stage.value;
                  return (
                    <div key={stage.value} className={cn(
                      "flex items-center justify-between p-4 rounded-[20px] transition-all",
                      isActive ? "bg-white border border-gray-200/50 shadow-sm" : "bg-transparent hover:bg-white/30"
                    )}>
                      <div className="flex items-center gap-3">
                         <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-blue-500" : "bg-gray-300")} />
                         <span className={cn(
                           "text-[10px] font-mono font-bold tracking-widest uppercase",
                           isActive ? "text-gray-900" : "text-gray-500"
                         )}>{stage.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Profile & Details */}
          <div className="space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white/60 border border-gray-200/50 rounded-3xl p-8 flex flex-col items-center shadow-sm text-center relative">
              <div className="absolute top-4 left-4 flex gap-2">
                 <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"><Plus size={14} /></button>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                 <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"><MoreVertical size={14} /></button>
              </div>
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center font-mono text-3xl font-bold text-white mb-5 shrink-0 shadow-sm border-4 border-white">
                {getInitials(lead.fullName)}
              </div>
              
              <h2 className="text-xl font-display font-bold text-gray-900 mb-1">{lead.fullName}</h2>
              <p className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase mb-6 leading-tight max-w-[200px]">
                {lead.roleInBusiness} at<br/>{lead.companyName}
              </p>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200/50 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Edit2 size={15} />
                </button>
                <a href={`mailto:${lead.workEmail}`} className="w-10 h-10 rounded-full bg-white border border-gray-200/50 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Mail size={15} />
                </a>
                <a href={`https://wa.me/${lead.whatsappPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200/50 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <MessageCircle size={15} />
                </a>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200/50 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <Calendar size={15} />
                </button>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white/60 border border-gray-200/50 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-900">Detailed Information</h3>
                <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                  <Edit2 size={12} />
                </button>
              </div>
              
              <div className="space-y-5">
                {[
                  { icon: <User size={13} />, label: "First Name", value: lead.fullName.split(' ')[0] },
                  { icon: <User size={13} />, label: "Last Name", value: lead.fullName.split(' ').slice(1).join(' ') || '-' },
                  { icon: <Mail size={13} />, label: "Email", value: lead.workEmail },
                  { icon: <Clock size={13} />, label: "Phone Number", value: lead.whatsappPhone },
                  { icon: <Briefcase size={13} />, label: "Service Need", value: lead.serviceNeed },
                  { icon: <Globe size={13} />, label: "Budget", value: lead.budgetRange },
                  { icon: <Calendar size={13} />, label: "Last Contacted", value: lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString() : 'Never' },
                ].map((field, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded bg-white border border-gray-200/50 flex items-center justify-center text-gray-400 mt-0.5 shrink-0 shadow-sm">
                      {field.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[9px] font-mono font-bold tracking-widest text-gray-500 uppercase mb-0.5">{field.label}</div>
                      <div className="text-[13px] font-medium text-gray-900 break-all">{field.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white/60 border border-gray-200/50 rounded-3xl p-6 shadow-sm space-y-4">
              <CrmSelect 
                label="Sales Status" 
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
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

              <CrmSelect 
                label="Priority Level" 
                value={lead.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
              >
                <option value="hot">Hot Opportunity</option>
                <option value="warm">Warm Lead</option>
                <option value="cold">Cold Lead</option>
              </CrmSelect>
            </div>

          </div>
        </div>
      </div>
    </CrmShell>
  );
};

