import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Mail, 
  Calendar, 
  User, 
  Globe,
  Clock,
  MoreHorizontal,
  Loader2,
  ArrowUpRight,
  Edit2,
  Plus,
  Maximize2,
  Network,
  Share2,
  Phone
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

const NOTE_COLORS = [
  'bg-[#2D5BFF] text-white',
  'bg-[#408B9B] text-white',
  'bg-[#F1DE36] text-gray-900',
  'bg-[#0B0B0B] text-white',
];

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



  // Calendar mock generation
  const daysInMonth = 31;
  const startOffset = 2; // e.g. starts on a Tuesday
  const calendarCells = Array.from({ length: 35 }).map((_, i) => {
    const dateNum = i - startOffset + 1;
    if (dateNum > 0 && dateNum <= daysInMonth) return dateNum;
    return null;
  });

  const ageDays = lead.createdAt
    ? Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / 86400000)
    : null;

  return (
    <CrmShell>
      {/* Background container to match the soft gradient in the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E2F0F9] via-[#F0F4EC] to-[#E9F3D8] -z-10" />
      
      <div className="space-y-6 max-w-[1600px] mx-auto pb-20 relative z-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-4">
          <div className="flex items-center gap-6">
            <Link to="/crm/leads" className="w-10 h-10 rounded-full bg-white/40 border border-white/50 shadow-sm flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-all shrink-0">
              <ChevronLeft size={18} />
            </Link>
            <h1 className="text-4xl md:text-[40px] font-display font-medium text-gray-900 leading-[1.1] tracking-tight">
              Customer<br/>Information
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-3 bg-white/40 border border-white/50 shadow-sm rounded-full px-5 py-2.5">
                <Globe size={16} className="text-gray-600" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">Direct Traffic</span>
                    <span className="text-[8px] font-bold bg-[#2D5BFF] text-white px-1.5 py-0.5 rounded-full uppercase">Source</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{lead.sourcePage || 'No specific landing page'}</span>
                </div>
             </div>
             <div className="flex items-center gap-3 bg-white/40 border border-white/50 shadow-sm rounded-full px-5 py-2.5">
                <Clock size={16} className="text-gray-600" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{ageDays !== null ? `${ageDays} Days` : '—'}</span>
                    <span className="text-[8px] font-bold bg-[#2D5BFF] text-white px-1.5 py-0.5 rounded-full uppercase">Active</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Since {new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.3fr_1fr] xl:grid-cols-[1.8fr_1.5fr_1fr] gap-6 items-start">
          
          {/* LEFT COLUMN: Interaction History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pl-2 mb-2">
              <h2 className="text-sm font-bold text-gray-900">Interaction History</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#EAECE6]/50 flex items-center justify-center text-gray-500 hover:bg-white transition-colors">
                  <MoreHorizontal size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#EAECE6]/50 flex items-center justify-center text-gray-500 hover:bg-white transition-colors">
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {notes.slice(0, 4).map((note, index) => {
                const colorClass = NOTE_COLORS[index % NOTE_COLORS.length];
                const strippedBudget = lead.budgetRange?.replace(/[^0-9]/g, '');
                const mockValue = strippedBudget ? `RM ${parseInt(strippedBudget).toLocaleString()}` : '—';
                
                return (
                  <div key={note.id} className={cn("p-6 rounded-[32px] relative flex flex-col min-h-[160px] shadow-sm", colorClass)}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-[11px] font-semibold opacity-90 mb-1">
                          {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-sm font-bold opacity-100 leading-snug line-clamp-2 pr-2">
                          {note.type === 'system' ? 'System Notification Update' : note.note}
                        </div>
                      </div>
                      <button className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", 
                        index === 3 ? "bg-white text-black" : "bg-black/10 border border-white/10"
                      )}>
                        {index === 3 ? <ArrowUpRight size={14} /> : <MoreHorizontal size={14} />}
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-auto">
                      <div className="text-xl font-bold tracking-tight">
                         {mockValue}
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full border-[1.5px] border-white/20 bg-gradient-to-br from-gray-200 to-gray-400 shadow-sm" />
                        <div className="w-7 h-7 rounded-full border-[1.5px] border-white/20 bg-gradient-to-br from-orange-200 to-orange-400 shadow-sm" />
                        <div className="w-7 h-7 rounded-full border-[1.5px] border-white/20 bg-gradient-to-br from-blue-200 to-blue-400 shadow-sm" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note Composer */}
            <form onSubmit={handleAddNote} className="bg-[#EAECE6]/50 rounded-3xl p-4 shadow-sm mt-2 flex gap-2">
              <input
                placeholder="Add a new interaction note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-transparent border-none text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400 px-2"
              />
              <button 
                type="submit"
                disabled={isSubmittingNote || !newNote.trim()}
                className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 shrink-0"
              >
                {isSubmittingNote ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              </button>
            </form>
          </div>

          {/* CENTER COLUMN: Schedule + Funnel */}
          <div className="space-y-4">
            
            {/* Tasks Schedule (Calendar) */}
            <div className="bg-[#EAECE6]/50 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-bold text-gray-900">Tasks Schedule</h3>
                 <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><MoreHorizontal size={14}/></button>
                    <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><ArrowUpRight size={14}/></button>
                 </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                 <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-[#DCE1DA]/80 flex items-center justify-center text-gray-500 hover:bg-white"><ChevronLeft size={14}/></button>
                    <button className="w-8 h-8 rounded-full bg-[#DCE1DA]/80 flex items-center justify-center text-gray-500 hover:bg-white"><ChevronRight size={14}/></button>
                 </div>
                 <span className="font-bold text-base text-gray-900">October</span>
                 <button className="w-8 h-8 rounded-full bg-[#DCE1DA]/80 flex items-center justify-center text-gray-500 hover:bg-white"><Maximize2 size={12}/></button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2 px-1">
                 {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} className="text-[10px] font-bold text-gray-400">{d}</div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-1 px-1">
                 {calendarCells.map((dateNum, i) => {
                    // Mock Highlights from reference image
                    const isBlue = dateNum === 4 || dateNum === 16;
                    const isYellow = dateNum === 11 || dateNum === 12;
                    const hasAvatarTop = dateNum === 4;
                    const hasAvatarMulti = dateNum === 11;
                    const hasAvatarBlueBottom = dateNum === 16;

                    return (
                       <div key={i} className={cn(
                         "aspect-square rounded-[10px] flex flex-col items-start justify-end p-1.5 relative",
                         isBlue ? "bg-[#2D5BFF] text-white" : isYellow ? "bg-[#F1DE36] text-gray-900" : dateNum ? "text-gray-400 bg-white/30" : "bg-transparent"
                       )}>
                          {dateNum && <span className={cn("text-[11px] font-bold", (isBlue || isYellow) ? "opacity-100" : "opacity-60")}>{dateNum}</span>}
                          
                          {/* Mock Avatars overlaid on dates */}
                          {hasAvatarTop && (
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/20 bg-gradient-to-br from-pink-300 to-rose-400" />
                          )}
                          {hasAvatarMulti && (
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 flex -space-x-1">
                              <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-gradient-to-br from-purple-300 to-purple-400" />
                              <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-gradient-to-br from-teal-300 to-teal-400" />
                            </div>
                          )}
                          {hasAvatarBlueBottom && (
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/20 bg-gradient-to-br from-blue-300 to-cyan-400" />
                          )}
                       </div>
                    )
                 })}
              </div>
            </div>

            {/* Stage Funnel */}
            <div className="bg-[#EAECE6]/50 rounded-[32px] p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-bold text-gray-900">Stage Funnel</h3>
                 <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><MoreHorizontal size={14}/></button>
                    <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><ArrowUpRight size={14}/></button>
                 </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                 {ALL_STAGES.slice(0, 4).map((stage, idx) => {
                    // Staggered indents logic
                    const indents = ['ml-4 mr-12', 'ml-12 mr-6', 'ml-20 mr-10', 'ml-24 mr-4'];
                    const mockValues = ['92,350$', '67,120$', '28,980$', '12,400$'];
                    const isActive = lead.status === stage.value;
                    
                    return (
                       <div key={stage.value} className={cn(
                         "bg-[#DCE1DA]/60 rounded-full py-4 px-6 flex flex-col items-center justify-center relative shadow-sm border border-white/40",
                         indents[idx],
                         isActive && "bg-white border-blue-200 shadow-md"
                       )}>
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{stage.label}</span>
                          <span className="text-sm font-bold text-gray-900">{mockValues[idx]}</span>
                          {idx === 0 && <button className="absolute right-3 w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-gray-500"><Maximize2 size={10}/></button>}
                          {idx === 1 && <button className="absolute right-3 w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-gray-500"><Maximize2 size={10}/></button>}
                          {idx === 2 && <button className="absolute right-3 w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-gray-500"><Maximize2 size={10}/></button>}
                       </div>
                    )
                 })}
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Contact Profile & Details */}
          <div className="space-y-4">
            
            {/* Profile Card */}
            <div className="bg-[#EAECE6]/50 rounded-[32px] p-6 shadow-sm flex flex-col items-center relative">
               <div className="absolute top-6 left-6 flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white"><Network size={14}/></button>
                  <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white"><Share2 size={14}/></button>
               </div>
               <div className="absolute top-6 right-6 flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white"><MoreHorizontal size={14}/></button>
                  <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white"><ArrowUpRight size={14}/></button>
               </div>
               
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 mb-4 mt-8 flex items-center justify-center text-white font-bold text-3xl shadow-sm">
                  {getInitials(lead.fullName)}
               </div>
               <h2 className="text-xl font-bold text-gray-900 leading-tight">{lead.fullName}</h2>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center mt-1.5 mb-6 leading-relaxed max-w-[200px]">
                  {lead.roleInBusiness}, {lead.companyName}
               </p>
               
               <div className="flex gap-2 bg-[#DCE1DA]/60 rounded-full p-1.5 border border-white/50">
                  <button className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm"><Edit2 size={14}/></button>
                  <a href={`mailto:${lead.workEmail}`} className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm"><Mail size={14}/></a>
                  <a href={`https://wa.me/${lead.whatsappPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm"><Phone size={14}/></a>
                  <button className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm"><Plus size={14}/></button>
                  <button className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition-colors shadow-sm"><Calendar size={14}/></button>
               </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-[#EAECE6]/50 rounded-[32px] p-6 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-900">Detailed Information</h3>
                  <div className="flex gap-2">
                     <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><Edit2 size={12}/></button>
                     <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-500 hover:bg-white"><ArrowUpRight size={14}/></button>
                  </div>
               </div>
               
               <div className="space-y-4">
                  {[
                     { icon: <User size={14} />, label: "First Name", value: lead.fullName.split(' ')[0] },
                     { icon: <User size={14} />, label: "Last Name", value: lead.fullName.split(' ').slice(1).join(' ') || '-' },
                     { icon: <Mail size={14} />, label: "Email", value: lead.workEmail },
                     { icon: <Phone size={14} />, label: "Phone Number", value: lead.whatsappPhone },
                     { icon: <Globe size={14} />, label: "Sources", value: lead.sourcePage || 'Direct' },
                     { icon: <Calendar size={14} />, label: "Last Contacted", value: lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString() : 'Never' },
                  ].map((field, idx) => (
                     <div key={idx} className="flex items-center justify-between group py-1">
                        <div className="flex gap-3 items-center">
                           <div className="text-gray-400 w-5 flex justify-center">{field.icon}</div>
                           <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{field.label}</span>
                              <span className="text-[13px] font-bold text-gray-900">{field.value}</span>
                           </div>
                        </div>
                        <button className="w-7 h-7 rounded-full bg-[#DCE1DA]/60 flex items-center justify-center text-gray-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                          <Edit2 size={12} />
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            {/* Controls */}
            <div className="bg-[#EAECE6]/50 border border-white/50 rounded-[32px] p-6 shadow-sm space-y-4">
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

