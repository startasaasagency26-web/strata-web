import { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  AlertCircle,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { ErrorState, LoadingState, StatusBadge } from '../../components/crm/CrmUI';
import { getDashboard, getLeads } from '../../lib/crm/client';
import type { DashboardMetrics, Lead } from '../../types/crm';
import { Link } from 'react-router-dom';
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

const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-emerald-400 to-emerald-600',
  'from-rose-400 to-rose-600',
];

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
}

interface MetricItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
  bg: string;
}

const MetricStrip = ({ items }: { items: MetricItem[] }) => (
  <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[32px] overflow-hidden shadow-sm">
    <div className="flex divide-x divide-white/40 overflow-x-auto">
      {items.map((m, i) => (
        <div key={i} className="flex-1 min-w-[140px] px-6 py-5 hover:bg-white/40 transition-colors">
          <div className={cn('inline-flex items-center gap-1.5 mb-3 px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-widest uppercase', m.bg, m.accent)}>
            {m.icon}
            {m.label}
          </div>
          <div className="text-2xl font-display font-bold text-[#111827]">{m.value}</div>
        </div>
      ))}
    </div>
  </div>
);

interface DealCardProps {
  lead: Lead;
  index: number;
}

const DealCard = ({ lead, index }: DealCardProps) => {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const createdDate = lead.createdAt ? formatDate(lead.createdAt) : '—';

  return (
    <Link
      to={`/crm/leads/${lead.id}`}
      className="group flex items-center gap-4 px-5 py-4 rounded-[24px] border border-white/50 bg-white/40 hover:bg-white backdrop-blur-sm hover:shadow-sm transition-all duration-200"
    >
      <div className={cn('w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gradient-to-br flex items-center justify-center font-display text-xs font-bold shrink-0 text-white', avatarColor)}>
        {getInitials(lead.fullName)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#111827] truncate">{lead.fullName}</p>
        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest truncate mt-0.5">{lead.companyName || 'Independent'}</p>
      </div>
      <div className="hidden sm:block shrink-0">
        <StatusBadge status={lead.status} />
      </div>
      {lead.budgetRange && (
        <div className="hidden md:block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest shrink-0">{lead.budgetRange}</div>
      )}
      <div className="hidden lg:block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest shrink-0">{createdDate}</div>
      <ChevronRight size={16} className="text-gray-400 group-hover:text-[#111827] group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
  );
};

export const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataUnavailable, setIsDataUnavailable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, l] = await Promise.all([getDashboard(), getLeads()]);
        setMetrics(m || zeroMetrics);
        setRecentLeads(l.slice(0, 8));
        setIsDataUnavailable((m?.totalLeads ?? 0) === 0 && l.length === 0);
      } catch (err) {
        console.error('[crm/dashboard] Data fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Loading dashboard..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} onRetry={() => window.location.reload()} /></CrmShell>;
  if (!metrics) return null;

  const today = new Date().toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long' });

  const metricItems: MetricItem[] = [
    { label: 'Total Leads',  value: metrics.totalLeads,                        icon: <Users size={11} />,        accent: 'text-gray-600',   bg: 'bg-gray-100' },
    { label: 'This Week',    value: metrics.leadsThisWeek,                     icon: <Zap size={11} />,          accent: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Qualified',    value: metrics.qualifiedLeads,                    icon: <TrendingUp size={11} />,   accent: 'text-amber-600',  bg: 'bg-amber-50' },
    { label: 'Won',          value: metrics.won,                               icon: <CheckCircle2 size={11} />, accent: 'text-emerald-700',bg: 'bg-emerald-50' },
    { label: 'Conversion',   value: `${metrics.conversionRate.toFixed(1)}%`,   icon: <ArrowUpRight size={11} />, accent: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <CrmShell>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-500 uppercase mb-1">{today}</p>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827]">Overview</h1>
          </div>
          <Link
            to="/crm/leads"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Users size={14} /> All Leads
          </Link>
        </div>

        {isDataUnavailable && (
          <div className="rounded-[24px] border border-amber-200/50 bg-amber-50/50 backdrop-blur-sm px-6 py-4 text-xs font-mono font-bold uppercase tracking-[0.15em] text-amber-700">
            No data yet — leads appear once customers submit the form.
          </div>
        )}

        {/* Metrics Strip */}
        <MetricStrip items={metricItems} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Leads */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-500 uppercase">Recent Leads</h2>
              <Link to="/crm/leads" className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-gray-500 hover:text-[#111827] transition-colors uppercase">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead, i) => <DealCard key={lead.id} lead={lead} index={i} />)
              ) : (
                <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] px-8 py-20 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center mx-auto mb-5">
                    <Users size={24} className="text-gray-400" />
                  </div>
                  <p className="text-base font-bold text-[#111827] uppercase tracking-tight mb-2">No leads yet</p>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Contact form submissions appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-500 uppercase">Daily Focus</h2>

            <div className="space-y-3">
              <Link to="/crm/follow-ups" className="group flex items-center gap-4 p-5 rounded-[24px] border border-white/50 bg-white/40 hover:bg-white backdrop-blur-sm hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 rounded-[14px] bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#111827]">{metrics.followUpsToday} Follow-ups Due</div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                    {metrics.followUpsToday > 0 ? 'Needs attention' : 'All clear today'}
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link to="/crm/leads" className="group flex items-center gap-4 p-5 rounded-[24px] border border-white/50 bg-white/40 hover:bg-white backdrop-blur-sm hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 rounded-[14px] bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#111827]">{metrics.newLeads} New Leads</div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-0.5">Ready to qualify</div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link to="/crm/pipeline" className="group flex items-center gap-4 p-5 rounded-[24px] border border-white/50 bg-white/40 hover:bg-white backdrop-blur-sm hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 rounded-[14px] bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#111827]">Pipeline</div>
                  <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-0.5">View deal stages</div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Pipeline Value */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-8 shadow-sm">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Pipeline Value</div>
              <div className="text-4xl font-display font-bold text-[#111827] tracking-tight">
                {metrics.pipelineValue === null ? 'Unavailable' : `RM ${metrics.pipelineValue.toLocaleString()}`}
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-3">
                <TrendingUp size={14} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  {metrics.pipelineValue === null ? 'Budget ranges are not exact deal values yet' : 'Computed from lead values'}
                </span>
              </div>
            </div>

            {/* Funnel */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-8 shadow-sm space-y-4">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-gray-500 uppercase">Stage Funnel</div>
              <div className="space-y-4">
                {[
                  { label: 'New',       value: metrics.newLeads,       color: 'bg-blue-500' },
                  { label: 'Contacted', value: metrics.contactedLeads, color: 'bg-purple-500' },
                  { label: 'Qualified', value: metrics.qualifiedLeads, color: 'bg-amber-500' },
                  { label: 'Proposal',  value: metrics.proposalSent,   color: 'bg-orange-500' },
                  { label: 'Won',       value: metrics.won,            color: 'bg-emerald-500' },
                ].map((stage) => {
                  const pct = metrics.totalLeads > 0 ? Math.round((stage.value / metrics.totalLeads) * 100) : 0;
                  return (
                    <div key={stage.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest">{stage.label}</span>
                        <span className="text-[10px] font-mono font-bold text-[#111827]">{stage.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white border border-white/50 shadow-inner overflow-hidden">
                        <div className={cn('h-full rounded-full transition-all duration-500', stage.color)} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
