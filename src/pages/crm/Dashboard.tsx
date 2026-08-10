import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Megaphone,
  MessageCircle,
  Search,
  Send,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CrmShell } from '../../components/crm/CrmShell';
import { ErrorState, LoadingState, PriorityBadge, StatusBadge } from '../../components/crm/CrmUI';
import { getDashboard, getFollowUps, getLeads } from '../../lib/crm/client';
import type { DashboardMetrics, FollowUp, Lead } from '../../types/crm';
import { cn } from '../../lib/utils';

const zeroMetrics: DashboardMetrics = {
  totalLeads: 0,
  newLeads: 0,
  contactedLeads: 0,
  qualifiedLeads: 0,
  proposalSent: 0,
  won: 0,
  lost: 0,
  conversionRate: 0,
  leadsThisWeek: 0,
  followUpsToday: 0,
  pipelineValue: null,
};

const claritySprint = [
  {
    label: 'Pinned clarity post',
    detail: 'Explain what Strata actually does before posting more advice.',
    action: 'Write / publish',
  },
  {
    label: 'Manual distribution',
    detail: 'Send today\'s strongest post to 5-10 service operators.',
    action: 'DM owners',
  },
  {
    label: 'Proof capture',
    detail: 'Turn one delivery screenshot or workflow into a proof asset.',
    action: 'Add proof',
  },
];

const offerShortlist = [
  'Revenue Infrastructure',
  'Growth Media System',
  'System Care Plan',
  'Full System Install',
];

function formatDate(value?: string) {
  if (!value) return 'No date';
  return new Date(value).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
}

function isActiveLead(lead: Lead) {
  return !['won', 'lost', 'unresponsive'].includes(lead.status);
}

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
  return 'Needs lead path diagnosis';
}

function getRecommendedOffer(lead: Lead) {
  const raw = lead.rawPayload || {};
  const rawOffer = raw.recommendedOffer || raw.recommended_offer || raw.selectedOffer;
  if (typeof rawOffer === 'string' && rawOffer.trim()) return rawOffer;
  if (lead.selectedPackage?.trim()) return lead.selectedPackage;
  const text = `${lead.serviceNeed} ${lead.currentProblem} ${lead.projectGoal}`.toLowerCase();
  if (text.includes('content') || text.includes('ads') || text.includes('media')) return 'Growth Media System';
  if (text.includes('maintenance') || text.includes('support')) return 'System Care Plan';
  if (text.includes('full') || text.includes('complete')) return 'Full System Install';
  return 'Revenue Infrastructure';
}

function getInitials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

const Panel = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={cn('rounded-[28px] border border-white/50 bg-white/60 shadow-sm backdrop-blur-md', className)}>
    {children}
  </div>
);

export const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardMetrics, leadData, taskData] = await Promise.all([
          getDashboard(),
          getLeads({ limit: 100, sort: 'follow_up' }),
          getFollowUps(),
        ]);
        setMetrics(dashboardMetrics || zeroMetrics);
        setLeads(leadData);
        setFollowUps(taskData);
      } catch (err) {
        console.error('[crm/dashboard] Data fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const today = useMemo(() => new Date().toLocaleDateString('en-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }), []);

  if (isLoading) return <CrmShell><LoadingState message="Loading Strata HQ..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} onRetry={() => window.location.reload()} /></CrmShell>;

  const resolvedMetrics = metrics || zeroMetrics;
  const activeLeads = leads.filter(isActiveLead);
  const hotLeads = activeLeads.filter((lead) => lead.priority === 'hot');
  const outreachQueue = activeLeads.filter(isOutreachReady).slice(0, 5);
  const proposalReady = leads.filter((lead) => ['qualified', 'discovery_scheduled', 'proposal_sent', 'negotiating'].includes(lead.status));
  const todayEnd = new Date();
  todayEnd.setHours(24, 0, 0, 0);
  const dueFollowUps = followUps
    .filter((task) => ['pending', 'overdue'].includes(task.status) && new Date(task.dueAt).getTime() < todayEnd.getTime())
    .slice(0, 5);

  const metricItems = [
    { label: 'Active leads', value: activeLeads.length, icon: <Users size={15} />, tone: 'text-gray-700 bg-white' },
    { label: 'Follow-ups due', value: resolvedMetrics.followUpsToday, icon: <Clock size={15} />, tone: 'text-orange-700 bg-orange-50' },
    { label: 'Hot review', value: hotLeads.length, icon: <Zap size={15} />, tone: 'text-blue-700 bg-blue-50' },
    { label: 'Proposal ready', value: proposalReady.length, icon: <FileText size={15} />, tone: 'text-purple-700 bg-purple-50' },
    { label: 'Won', value: resolvedMetrics.won, icon: <CheckCircle2 size={15} />, tone: 'text-emerald-700 bg-emerald-50' },
  ];

  return (
    <CrmShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500">{today}</p>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] md:text-4xl">
              Strata HQ
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-gray-600">
              Control room for turning attention into pipeline, pipeline into follow-up, and follow-up into revenue.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/crm/outreach"
              className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800"
            >
              <Send size={14} /> Outreach Queue
            </Link>
            <Link
              to="/crm/leads?add=1"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#111827] shadow-sm transition-all hover:bg-white"
            >
              <Users size={14} /> Add Lead
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          {metricItems.map((item) => (
            <Panel key={item.label} className="p-5">
              <div className={cn('mb-4 inline-flex h-9 w-9 items-center justify-center rounded-2xl', item.tone)}>
                {item.icon}
              </div>
              <div className="text-3xl font-display font-bold tracking-tight text-[#111827]">{item.value}</div>
              <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{item.label}</div>
            </Panel>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/50 px-6 py-5">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Today Control Panel</h2>
                <p className="mt-1 text-sm font-semibold text-[#111827]">The work that protects revenue today.</p>
              </div>
              <Link to="/crm/follow-ups" className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-[#111827]">
                View tasks
              </Link>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-2">
              <div className="rounded-[24px] border border-orange-100 bg-orange-50/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-orange-700">
                    <Clock size={14} /> Follow up today
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-mono font-bold text-orange-700">{dueFollowUps.length}</span>
                </div>
                <div className="space-y-3">
                  {dueFollowUps.length > 0 ? dueFollowUps.map((task) => (
                    <Link key={task.id} to={`/crm/leads/${task.leadId}`} className="block rounded-2xl bg-white/80 p-4 transition hover:bg-white">
                      <div className="text-sm font-bold text-[#111827]">{task.title}</div>
                      <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
                        {task.leadName || 'Unknown lead'} · {formatDate(task.dueAt)}
                      </div>
                    </Link>
                  )) : (
                    <div className="rounded-2xl bg-white/70 p-5 text-sm font-semibold text-gray-500">No urgent follow-ups due.</div>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border border-blue-100 bg-blue-50/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                    <Target size={14} /> Hot lead review
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-mono font-bold text-blue-700">{hotLeads.length}</span>
                </div>
                <div className="space-y-3">
                  {hotLeads.slice(0, 3).map((lead) => (
                    <Link key={lead.id} to={`/crm/leads/${lead.id}`} className="block rounded-2xl bg-white/80 p-4 transition hover:bg-white">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold text-[#111827]">{lead.fullName}</div>
                          <div className="mt-1 truncate text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{lead.companyName || 'Independent'}</div>
                        </div>
                        <PriorityBadge priority={lead.priority} />
                      </div>
                    </Link>
                  ))}
                  {hotLeads.length === 0 && (
                    <div className="rounded-2xl bg-white/70 p-5 text-sm font-semibold text-gray-500">No hot leads waiting.</div>
                  )}
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Clarity Sprint</h2>
                <p className="mt-1 text-sm font-semibold text-[#111827]">Make Strata obvious before scaling posts.</p>
              </div>
              <Megaphone size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {claritySprint.map((item) => (
                <div key={item.label} className="rounded-[20px] border border-white/60 bg-white/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-[#111827]">{item.label}</div>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500">{item.detail}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#111827] px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-white">
                      {item.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <Panel className="xl:col-span-2">
            <div className="flex items-center justify-between border-b border-white/50 px-6 py-5">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Outreach Queue</h2>
                <p className="mt-1 text-sm font-semibold text-[#111827]">Leads worth a manual message, not another passive post.</p>
              </div>
              <Link to="/crm/outreach" className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-[#111827]">
                Open <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-white/50">
              {outreachQueue.length > 0 ? outreachQueue.map((lead) => (
                <Link key={lead.id} to={`/crm/leads/${lead.id}`} className="grid gap-4 px-6 py-5 transition hover:bg-white/50 md:grid-cols-[1fr_1.2fr_auto] md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111827] text-xs font-display font-bold text-white shadow-sm">
                      {getInitials(lead.fullName)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-[#111827]">{lead.companyName || lead.fullName}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <StatusBadge status={lead.status} />
                        <PriorityBadge priority={lead.priority} />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-gray-700">{getVisibleLeak(lead)}</div>
                    <div className="mt-1 truncate text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{getRecommendedOffer(lead)}</div>
                  </div>
                  <MessageCircle size={18} className="text-gray-400" />
                </Link>
              )) : (
                <div className="px-6 py-12 text-center text-sm font-semibold text-gray-500">No leads ready for outreach yet.</div>
              )}
            </div>
          </Panel>

          <Panel className="p-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Offer Focus</h2>
            <p className="mt-1 text-sm font-semibold text-[#111827]">Default wedges to keep the sales story concrete.</p>
            <div className="mt-5 space-y-3">
              {offerShortlist.map((offer) => (
                <div key={offer} className="flex items-center justify-between rounded-[18px] bg-white/60 px-4 py-3">
                  <span className="text-sm font-bold text-[#111827]">{offer}</span>
                  <ClipboardList size={15} className="text-gray-400" />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Search size={18} className="text-gray-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Pipeline Diagnosis</h2>
            </div>
            <div className="text-4xl font-display font-bold text-[#111827]">{resolvedMetrics.conversionRate.toFixed(1)}%</div>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">Won rate across current CRM records. Improve this by enforcing follow-up, not by adding random content.</p>
          </Panel>
          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <CalendarCheck size={18} className="text-gray-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">This Week</h2>
            </div>
            <div className="text-4xl font-display font-bold text-[#111827]">{resolvedMetrics.leadsThisWeek}</div>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">New lead records captured in the last 7 days.</p>
          </Panel>
          <Panel className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <TrendingUp size={18} className="text-gray-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Pipeline Value</h2>
            </div>
            <div className="text-4xl font-display font-bold text-[#111827]">
              {resolvedMetrics.pipelineValue === null ? 'TBD' : `RM ${resolvedMetrics.pipelineValue.toLocaleString()}`}
            </div>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">Exact deal values should be added only when the offer is real.</p>
          </Panel>
        </div>

        {leads.length === 0 && (
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700">
            No CRM data yet. Add leads manually or connect diagnostic submissions before relying on dashboard metrics.
          </div>
        )}

        {resolvedMetrics.followUpsToday > 0 && dueFollowUps.length === 0 && (
          <div className="rounded-[24px] border border-blue-200 bg-blue-50 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
            <AlertCircle size={14} className="mr-2 inline" />
            Dashboard metrics report follow-ups due, but the detailed task query returned none. Check CRM data freshness.
          </div>
        )}
      </div>
    </CrmShell>
  );
};

const demoLeads: Lead[] = [
  {
    id: 'preview-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Amirul Afiz',
    companyName: 'One Mobile Repair',
    workEmail: 'owner@example.com',
    whatsappPhone: '+60190000000',
    roleInBusiness: 'Owner',
    countryTimezone: 'Malaysia',
    preferredLanguage: 'English',
    businessType: 'Repair business',
    serviceNeed: 'CRM pipeline and follow-up automation',
    websiteUrl: 'https://example.com',
    currentProblem: 'Leads come through WhatsApp but staff follow-up is inconsistent.',
    projectGoal: 'Create owner visibility across enquiries, quotes, and follow-ups.',
    budgetRange: 'RM 8,500 - RM 14,500',
    selectedPackage: 'Revenue Infrastructure',
    timeline: 'This month',
    sourcePage: 'Preview',
    status: 'qualified',
    priority: 'hot',
    assignedTo: null,
    assignedProfile: null,
    lastContactedAt: new Date().toISOString(),
    nextFollowUpAt: new Date().toISOString(),
    notesCount: 2,
    rawPayload: {
      visibleSystemLeak: 'WhatsApp enquiries are not turning into a controlled pipeline.',
      recommendedOffer: 'Revenue Infrastructure',
      outreachAngle: 'Lead with the owner visibility leak before mentioning tools.',
    },
  },
  {
    id: 'preview-2',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Khairul Azril',
    companyName: 'Thunderfix Auto',
    workEmail: 'manager@example.com',
    whatsappPhone: '+60140000000',
    roleInBusiness: 'Manager',
    countryTimezone: 'Malaysia',
    preferredLanguage: 'English',
    businessType: 'Automotive',
    serviceNeed: 'Content plus lead capture',
    currentProblem: 'Content creates attention but no clear next step captures serious buyers.',
    projectGoal: 'Connect content to enquiry capture and follow-up.',
    budgetRange: 'RM 3,500 - RM 5,500/mo',
    selectedPackage: 'Growth Media System',
    timeline: '30 days',
    sourcePage: 'Preview',
    status: 'contacted',
    priority: 'warm',
    assignedTo: null,
    assignedProfile: null,
    lastContactedAt: new Date(Date.now() - 172800000).toISOString(),
    nextFollowUpAt: new Date(Date.now() + 86400000).toISOString(),
    notesCount: 1,
    rawPayload: {
      visibleSystemLeak: 'Strong attention, weak conversion path.',
      recommendedOffer: 'Growth Media System',
    },
  },
  {
    id: 'preview-3',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: 'Aina Hassan',
    companyName: 'Local Clinic Group',
    workEmail: 'ops@example.com',
    whatsappPhone: '+60120000000',
    roleInBusiness: 'Operations Lead',
    countryTimezone: 'Malaysia',
    preferredLanguage: 'English',
    businessType: 'Clinic',
    serviceNeed: 'Follow-up process and monthly care',
    currentProblem: 'Missed callbacks and unclear staff ownership after enquiries.',
    projectGoal: 'Install follow-up discipline and reporting.',
    budgetRange: 'RM 599 - RM 999/mo',
    selectedPackage: 'System Care Plan',
    timeline: '2 weeks',
    sourcePage: 'Preview',
    status: 'new',
    priority: 'warm',
    assignedTo: null,
    assignedProfile: null,
    lastContactedAt: undefined,
    nextFollowUpAt: new Date().toISOString(),
    notesCount: 0,
    rawPayload: {
      visibleSystemLeak: 'No one owns the next action after the first reply.',
      recommendedOffer: 'System Care Plan',
    },
  },
];

const demoFollowUps: FollowUp[] = [
  {
    id: 'follow-preview-1',
    leadId: 'preview-1',
    title: 'Send lead path diagnosis',
    dueAt: new Date().toISOString(),
    status: 'pending',
    assignedTo: null,
    assignedProfile: null,
    createdAt: new Date().toISOString(),
    leadName: 'Amirul Afiz',
    leadCompany: 'One Mobile Repair',
    contactMethod: 'whatsapp',
    notes: 'Lead with WhatsApp pipeline leak.',
  },
  {
    id: 'follow-preview-2',
    leadId: 'preview-3',
    title: 'Follow up on clinic callback process',
    dueAt: new Date().toISOString(),
    status: 'pending',
    assignedTo: null,
    assignedProfile: null,
    createdAt: new Date().toISOString(),
    leadName: 'Aina Hassan',
    leadCompany: 'Local Clinic Group',
    contactMethod: 'call',
  },
];

const demoMetrics: DashboardMetrics = {
  totalLeads: 3,
  newLeads: 1,
  contactedLeads: 1,
  qualifiedLeads: 1,
  proposalSent: 0,
  won: 0,
  lost: 0,
  conversionRate: 0,
  leadsThisWeek: 3,
  followUpsToday: 2,
  pipelineValue: 31500,
};

export const DashboardPreview = () => {
  const activeLeads = demoLeads.filter(isActiveLead);
  const hotLeads = activeLeads.filter((lead) => lead.priority === 'hot');
  const outreachQueue = activeLeads.filter(isOutreachReady);
  const today = new Date().toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long' });

  const metricItems = [
    { label: 'Active leads', value: activeLeads.length, icon: <Users size={15} />, tone: 'text-gray-700 bg-white' },
    { label: 'Follow-ups due', value: demoMetrics.followUpsToday, icon: <Clock size={15} />, tone: 'text-orange-700 bg-orange-50' },
    { label: 'Hot review', value: hotLeads.length, icon: <Zap size={15} />, tone: 'text-blue-700 bg-blue-50' },
    { label: 'Proposal ready', value: 1, icon: <FileText size={15} />, tone: 'text-purple-700 bg-purple-50' },
    { label: 'Pipeline value', value: `RM ${demoMetrics.pipelineValue?.toLocaleString()}`, icon: <TrendingUp size={15} />, tone: 'text-emerald-700 bg-emerald-50' },
  ];

  return (
    <CrmShell>
      <div className="space-y-6">
        <div className="rounded-[24px] border border-blue-200 bg-blue-50 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
          Preview mode uses safe demo data. Real CRM remains protected behind login.
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500">{today}</p>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] md:text-4xl">Strata HQ Preview</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-gray-600">
              Control room for turning attention into pipeline, pipeline into follow-up, and follow-up into revenue.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#preview-outreach" className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:bg-gray-800">
              <Send size={14} /> Preview Outreach
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          {metricItems.map((item) => (
            <Panel key={item.label} className="p-5">
              <div className={cn('mb-4 inline-flex h-9 w-9 items-center justify-center rounded-2xl', item.tone)}>{item.icon}</div>
              <div className="text-3xl font-display font-bold tracking-tight text-[#111827]">{item.value}</div>
              <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{item.label}</div>
            </Panel>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <Panel className="overflow-hidden">
            <div className="border-b border-white/50 px-6 py-5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Today Control Panel</h2>
              <p className="mt-1 text-sm font-semibold text-[#111827]">The work that protects revenue today.</p>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-2">
              <div className="rounded-[24px] border border-orange-100 bg-orange-50/70 p-5">
                <div className="mb-4 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-orange-700">
                  <span className="flex items-center gap-2"><Clock size={14} /> Follow up today</span>
                  <span className="rounded-full bg-white px-2.5 py-1">{demoFollowUps.length}</span>
                </div>
                <div className="space-y-3">
                  {demoFollowUps.map((task) => (
                    <div key={task.id} className="rounded-2xl bg-white/80 p-4">
                      <div className="text-sm font-bold text-[#111827]">{task.title}</div>
                      <div className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{task.leadCompany} · {formatDate(task.dueAt)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-blue-100 bg-blue-50/70 p-5">
                <div className="mb-4 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
                  <span className="flex items-center gap-2"><Target size={14} /> Hot lead review</span>
                  <span className="rounded-full bg-white px-2.5 py-1">{hotLeads.length}</span>
                </div>
                <div className="space-y-3">
                  {hotLeads.map((lead) => (
                    <div key={lead.id} className="rounded-2xl bg-white/80 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold text-[#111827]">{lead.fullName}</div>
                          <div className="mt-1 truncate text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{lead.companyName}</div>
                        </div>
                        <PriorityBadge priority={lead.priority} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Clarity Sprint</h2>
                <p className="mt-1 text-sm font-semibold text-[#111827]">Make Strata obvious before scaling posts.</p>
              </div>
              <Megaphone size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {claritySprint.map((item) => (
                <div key={item.label} className="rounded-[20px] border border-white/60 bg-white/60 p-4">
                  <div className="text-sm font-bold text-[#111827]">{item.label}</div>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel className="overflow-hidden" id="preview-outreach">
          <div className="border-b border-white/50 px-6 py-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500">Outreach Queue</h2>
            <p className="mt-1 text-sm font-semibold text-[#111827]">Leads worth a manual message, not another passive post.</p>
          </div>
          <div className="divide-y divide-white/50">
            {outreachQueue.map((lead) => (
              <div key={lead.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1fr_1.2fr_auto] md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111827] text-xs font-display font-bold text-white shadow-sm">{getInitials(lead.fullName)}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-[#111827]">{lead.companyName}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <StatusBadge status={lead.status} />
                      <PriorityBadge priority={lead.priority} />
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-gray-700">{getVisibleLeak(lead)}</div>
                  <div className="mt-1 truncate text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{getRecommendedOffer(lead)}</div>
                </div>
                <MessageCircle size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </CrmShell>
  );
};
