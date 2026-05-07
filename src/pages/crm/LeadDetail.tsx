import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  MessageCircle, 
  Mail, 
  Calendar, 
  User, 
  Briefcase, 
  Globe,
  Clock,
  Send,
  MoreVertical,
  Paperclip,
  CheckCircle2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { 
  LoadingState, 
  ErrorState, 
  PriorityBadge, 
  CrmSelect
} from '../../components/crm/CrmUI';
import { getLead, getLeadNotes, createLeadNote, updateLead } from '../../lib/crm/client';
import type { Lead, LeadNote } from '../../types/crm';


export const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [error, setError] = useState('');
  const [showRawPayload, setShowRawPayload] = useState(false);

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
      <div className="space-y-8">
        {/* Back link & Actions */}
        <div className="flex items-center justify-between">
          <Link to="/crm/leads" className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-white transition-colors uppercase">
            <ChevronLeft size={14} /> Back to Database
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-white/40 hover:text-white transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Profile & Qualification */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Card */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <PriorityBadge priority={lead.priority} className="text-sm px-4 py-1" />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-3xl font-bold text-white/20">
                  {lead.fullName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-2">{lead.fullName}</h1>
                  <p className="text-sm font-mono font-bold tracking-[0.2em] text-white/40 uppercase">{lead.companyName} • {lead.roleInBusiness}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`https://wa.me/${lead.whatsappPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-emerald-600 transition-all">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a href={`mailto:${lead.workEmail}`} className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                      <Mail size={14} /> Email Lead
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Panel */}
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-white pl-4 border-l-4 border-white">Qualification Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Briefcase size={16} />, label: "Business Type", value: lead.businessType },
                  { icon: <User size={16} />, label: "Service Need", value: lead.serviceNeed },
                  { icon: <Globe size={16} />, label: "Website", value: lead.websiteUrl || 'No current site', isLink: !!lead.websiteUrl },
                  { icon: <Clock size={16} />, label: "Budget Range", value: lead.budgetRange },
                  { icon: <CheckCircle2 size={16} />, label: "Selected Package", value: lead.selectedPackage || 'Custom Solution' },
                  { icon: <Calendar size={16} />, label: "Expected Timeline", value: lead.timeline },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 space-y-2">
                    <div className="flex items-center gap-2 text-white/20">
                      {item.icon}
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{item.label}</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {item.isLink ? (
                        <a href={item.value} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                          {item.value} <ExternalLink size={12} />
                        </a>
                      ) : item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Text Blocks */}
              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-4">
                  <h3 className="text-[10px] font-mono font-bold tracking-widest text-white/20 uppercase">Current Problem</h3>
                  <p className="text-white/80 leading-relaxed italic">"{lead.currentProblem || 'Not specified'}"</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-4">
                  <h3 className="text-[10px] font-mono font-bold tracking-widest text-white/20 uppercase">Project Goal</h3>
                  <p className="text-white/80 leading-relaxed italic">"{lead.projectGoal || 'Not specified'}"</p>
                </div>
              </div>
            </div>

            {/* Debug/Raw Payload */}
            <div>
              <button 
                onClick={() => setShowRawPayload(!showRawPayload)}
                className="text-[10px] font-mono font-bold tracking-widest text-white/20 hover:text-white uppercase transition-colors"
              >
                {showRawPayload ? 'Hide' : 'View'} Raw Form Payload
              </button>
              <AnimatePresence>
                {showRawPayload && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 bg-black border border-white/5 rounded-2xl p-6 overflow-hidden"
                  >
                    <pre className="text-[10px] font-mono text-white/40 leading-relaxed whitespace-pre-wrap">
                      {JSON.stringify(lead, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Status & Timeline */}
          <div className="space-y-8">
            {/* Control Panel */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 space-y-8 sticky top-24">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Lead Controls</h2>
              
              <div className="space-y-6">
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

                <CrmSelect label="Assigned Strategist" value={lead.assignedTo || ''}>
                  <option value="">Unassigned</option>
                  <option value="Nick">Nick</option>
                  <option value="Khairul">Khairul</option>
                </CrmSelect>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white/20">Lead Created</span>
                  <span className="text-white/60">{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white/20">Last Contact</span>
                  <span className="text-white/60">{lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString() : 'Never'}</span>
                </div>
              </div>

              {/* Follow-up Reminder */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <Clock size={14} />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Next Follow-up</span>
                </div>
                {lead.nextFollowUpAt ? (
                   <div className="text-xs font-bold text-white">{new Date(lead.nextFollowUpAt).toLocaleString()}</div>
                ) : (
                  <button className="text-[10px] font-mono font-bold text-white/40 hover:text-white transition-colors uppercase">Set Reminder</button>
                )}
              </div>
            </div>

            {/* Notes Timeline */}
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Activity Log</h2>
              
              {/* Note Composer */}
              <form onSubmit={handleAddNote} className="relative group">
                <textarea
                  placeholder="Add a private note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-white/30 transition-all min-h-[100px] pb-12"
                />
                <div className="absolute bottom-3 left-4 flex gap-2">
                  <button type="button" className="text-white/20 hover:text-white transition-colors"><Paperclip size={16} /></button>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmittingNote || !newNote.trim()}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                >
                  {isSubmittingNote ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </form>

              {/* Notes List */}
              <div className="space-y-6">
                {notes.map((note) => (
                  <div key={note.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-[-24px] before:w-px before:bg-white/10 last:before:hidden">
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-white/20" />
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                          {note.createdBy} • {new Date(note.createdAt).toLocaleString()}
                        </div>
                        {note.type === 'whatsapp' && <MessageCircle size={12} className="text-emerald-400 opacity-40" />}
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">{note.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
