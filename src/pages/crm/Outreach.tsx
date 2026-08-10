import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clipboard,
  Copy,
  ExternalLink,
  Loader2,
  MessageCircle,
  Send,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CrmShell } from '../../components/crm/CrmShell';
import { ErrorState, LoadingState, PriorityBadge, StatusBadge } from '../../components/crm/CrmUI';
import { getFollowUps, getLeads, updateLead } from '../../lib/crm/client';
import type { FollowUp, Lead } from '../../types/crm';
import { cn } from '../../lib/utils';

const templates = [
  {
    title: 'WhatsApp is not a CRM',
    body: `Hey [Name], noticed [specific observation about their business].

You already seem to have enquiries coming in, but from the outside it looks like the enquiry path is mostly running through WhatsApp/manual follow-up.

That usually creates a leak: leads come in, but there is no clean funnel, CRM stage, task owner, or follow-up system.

That is exactly what we fix at Strata. We build revenue infrastructure for service businesses so attention turns into enquiries, enquiries turn into pipeline, and pipeline turns into revenue.

Worth me sending you a quick breakdown of where your current lead flow may be leaking?`,
  },
  {
    title: 'Content without lead path',
    body: `Hey [Name], saw that [business name] is posting regularly.

The content may be creating attention, but from the outside it does not look like there is a clear next step for serious buyers: no proper capture, no CRM stage, no automated follow-up.

That means views can happen while buyers still fall through the gap.

We connect content to a revenue system: funnel, CRM, follow-up, and pipeline visibility.

Want me to map where attention is going now versus where it could convert?`,
  },
  {
    title: 'Revenue leak audit',
    body: `Hey [Name], came across [business name] while researching local service businesses.

You seem to have demand, but the system between enquiry and sale looks like it may be leaking: [specific observation].

That is common. The business is good, the demand is real, but the operating layer is not built yet.

Strata installs that layer: funnel, CRM, automation, follow-up rules, and owner visibility.

Open to a short diagnostic of the biggest leak?`,
  },
];

function isOutreachReady(lead: Lead) {
  return ['new', 'contacted', 'qualified'].includes(lead.status) && lead.priority !== 'cold';
}

function getVisibleLeak(lead: Lead) {
  const raw = lead.rawPayload || {};
  const rawLeak = raw.visibleSystemLeak || raw.systemLeak || raw.visible_gap || raw.visibleGap;
  if (typeof rawLeak === 'string' && rawLeak.trim()) return rawLeak;
  if (lead.currentProblem?.trim()) return lead.currentProblem;
  if (lead.projectGoal?.trim()) return lead.projectGoal;
  if (lead.serviceNeed?.trim()) return lead.serviceNeed;
  return 'No clear CRM / follow-up path visible yet';
}

function getRecommendedOffer(lead: Lead) {
  const raw = lead.rawPayload || {};
  const rawOffer = raw.recommendedOffer || raw.recommended_offer || raw.selectedOffer;
  if (typeof rawOffer === 'string' && rawOffer.trim()) return rawOffer;
  if (lead.selectedPackage?.trim()) return lead.selectedPackage;
  const text = `${lead.serviceNeed} ${lead.currentProblem} ${lead.projectGoal}`.toLowerCase();
  if (text.includes('content') || text.includes('ads') || text.includes('media')) return 'Growth Media System';
  if (text.includes('support') || text.includes('maintenance')) return 'System Care Plan';
  if (text.includes('full') || text.includes('complete')) return 'Full System Install';
  return 'Revenue Infrastructure';
}

function getOutreachAngle(lead: Lead) {
  const raw = lead.rawPayload || {};
  const rawAngle = raw.outreachAngle || raw.outreach_angle;
  if (typeof rawAngle === 'string' && rawAngle.trim()) return rawAngle;
  return `Lead with the visible leak: ${getVisibleLeak(lead).toLowerCase()}.`;
}

function getFollowUpDueCount(tasks: FollowUp[], leadId: string) {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return tasks.filter((task) => (
    task.leadId === leadId &&
    ['pending', 'overdue'].includes(task.status) &&
    new Date(task.dueAt).getTime() < tomorrow.getTime()
  )).length;
}

export const Outreach = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [copying, setCopying] = useState<string | null>(null);
  const [contactingLeadId, setContactingLeadId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [leadData, taskData] = await Promise.all([
          getLeads({ limit: 100, sort: 'follow_up' }),
          getFollowUps(),
        ]);
        setLeads(leadData);
        setFollowUps(taskData);
      } catch (err) {
        console.error('[crm/outreach] Data fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load outreach queue.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const outreachQueue = useMemo(
    () => leads.filter(isOutreachReady).sort((a, b) => {
      const priorityOrder = { hot: 0, warm: 1, cold: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }),
    [leads],
  );

  const copiedMessageFor = (lead: Lead) => {
    const company = lead.companyName || 'your business';
    return templates[0].body
      .replace('[Name]', lead.fullName || 'there')
      .replace('[specific observation about their business]', getVisibleLeak(lead))
      .replace('[business name]', company);
  };

  const copyToClipboard = async (id: string, text: string, label: string) => {
    setCopying(id);
    try {
      await navigator.clipboard.writeText(text);
      setNotice(`${label} copied.`);
    } catch {
      setNotice('Copy failed. Select the text manually.');
    } finally {
      setCopying(null);
    }
  };

  const markContacted = async (lead: Lead) => {
    setContactingLeadId(lead.id);
    try {
      const updated = await updateLead(lead.id, {
        status: 'contacted',
        lastContactedAt: new Date().toISOString(),
      });
      setLeads((current) => current.map((item) => item.id === updated.id ? updated : item));
      setNotice(`${lead.fullName} marked contacted.`);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Failed to mark contacted.');
    } finally {
      setContactingLeadId(null);
    }
  };

  if (isLoading) return <CrmShell><LoadingState message="Building outreach queue..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} onRetry={() => window.location.reload()} /></CrmShell>;

  return (
    <CrmShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] md:text-4xl">Outreach OS</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-gray-600">
              Manual sales motion for service businesses with visible lead leaks. Approve, copy, message, follow up.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[20px] border border-white/50 bg-white/60 px-5 py-3 text-center shadow-sm">
              <div className="text-2xl font-display font-bold text-[#111827]">{outreachQueue.length}</div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Queue</div>
            </div>
            <div className="rounded-[20px] border border-white/50 bg-white/60 px-5 py-3 text-center shadow-sm">
              <div className="text-2xl font-display font-bold text-[#111827]">{leads.filter((lead) => lead.priority === 'hot').length}</div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Hot</div>
            </div>
            <div className="rounded-[20px] border border-white/50 bg-white/60 px-5 py-3 text-center shadow-sm">
              <div className="text-2xl font-display font-bold text-[#111827]">{followUps.filter((task) => ['pending', 'overdue'].includes(task.status)).length}</div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Follow-ups</div>
            </div>
          </div>
        </div>

        {notice && (
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
            {notice}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.85fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/50 bg-white/60 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/50 px-6 py-5">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Lead Queue</h2>
                <p className="mt-1 text-sm font-semibold text-[#111827]">Prioritized by priority, status, and follow-up risk.</p>
              </div>
              <Target size={20} className="text-gray-400" />
            </div>

            <div className="divide-y divide-white/50">
              {outreachQueue.length > 0 ? outreachQueue.map((lead) => {
                const phoneDigits = lead.whatsappPhone?.replace(/[^0-9]/g, '');
                const followUpsDue = getFollowUpDueCount(followUps, lead.id);
                return (
                  <div key={lead.id} className="grid gap-5 px-6 py-5 transition hover:bg-white/50 lg:grid-cols-[1fr_1.1fr_auto] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link to={`/crm/leads/${lead.id}`} className="text-base font-bold text-[#111827] hover:underline">
                          {lead.companyName || lead.fullName}
                        </Link>
                        <StatusBadge status={lead.status} />
                        <PriorityBadge priority={lead.priority} />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
                        <span>{lead.fullName}</span>
                        <span>·</span>
                        <span>{getRecommendedOffer(lead)}</span>
                        {followUpsDue > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-orange-600">{followUpsDue} due</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 rounded-[20px] border border-white/60 bg-white/50 p-4">
                      <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400">Visible leak</div>
                      <p className="mt-1 text-sm font-bold leading-relaxed text-[#111827]">{getVisibleLeak(lead)}</p>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">{getOutreachAngle(lead)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <button
                        onClick={() => copyToClipboard(`lead-${lead.id}`, copiedMessageFor(lead), 'Lead message')}
                        className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white transition hover:bg-gray-800"
                      >
                        {copying === `lead-${lead.id}` ? <Loader2 size={13} className="animate-spin" /> : <Copy size={13} />}
                        Copy DM
                      </button>
                      {phoneDigits && (
                        <a
                          href={`https://wa.me/${phoneDigits}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 transition hover:bg-emerald-500 hover:text-white"
                        >
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                      )}
                      <button
                        onClick={() => markContacted(lead)}
                        disabled={contactingLeadId === lead.id}
                        className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#111827] transition hover:shadow-sm disabled:opacity-50"
                      >
                        {contactingLeadId === lead.id ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                        Contacted
                      </button>
                      <Link
                        to={`/crm/leads/${lead.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-600 transition hover:text-[#111827] hover:shadow-sm"
                      >
                        Open <ExternalLink size={13} />
                      </Link>
                    </div>
                  </div>
                );
              }) : (
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <Users size={42} className="mb-4 text-gray-300" />
                  <p className="text-base font-bold text-[#111827]">No outreach-ready leads</p>
                  <p className="mt-1 text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Add or qualify leads first.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Copy Bank</h2>
                  <p className="mt-1 text-sm font-semibold text-[#111827]">Use one clear angle. Then follow up.</p>
                </div>
                <Clipboard size={19} className="text-gray-400" />
              </div>
              <div className="space-y-3">
                {templates.map((template, index) => (
                  <div key={template.title} className="rounded-[20px] border border-white/60 bg-white/60 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-[#111827]">{template.title}</h3>
                      <button
                        onClick={() => copyToClipboard(`template-${index}`, template.body, template.title)}
                        className={cn(
                          'inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-[#111827]',
                          copying === `template-${index}` && 'text-blue-600',
                        )}
                        aria-label={`Copy ${template.title}`}
                      >
                        {copying === `template-${index}` ? <Loader2 size={14} className="animate-spin" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="line-clamp-3 whitespace-pre-line text-xs font-semibold leading-relaxed text-gray-500">{template.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-blue-100 bg-blue-50/70 p-6 shadow-sm">
              <div className="flex items-center gap-3 text-blue-700">
                <Send size={18} />
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">Daily rule</h2>
              </div>
              <p className="mt-4 text-sm font-bold leading-relaxed text-[#111827]">
                Do not let a post sit alone. Every useful post gets sent manually to 5-10 relevant owners with a specific leak angle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
