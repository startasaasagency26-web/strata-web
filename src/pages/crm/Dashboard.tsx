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
import { LoadingState, StatusBadge } from '../../components/crm/CrmUI';
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
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <div className="flex divide-x divide-gray-100 overflow-x-auto">
      {items.map((m, i) => (
        <div key={i} className="flex-1 min-w-[140px] px-6 py-5">
          <div className={cn('inline-flex items-center gap-1.5 mb-3 px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-widest uppercase', m.bg, m.accent)}>
            {m.icon}
            {m.label}
          </div>
          <div className="text-2xl font-display font-bold text-gray-900">{m.value}</div>
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
      className="group flex items-center gap-4 px-5 py-3.5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200"
    >
      <div className={cn('w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center font-mono text-[11px] font-bold shrink-0 text-white', avatarColor)}>
        {getInitials(lead.fullName)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate">{lead.fullName}</p>
        <p className="text-[10px] font-mono text-gray-400 uppercase truncate">{lead.companyName || 'Independent'}</p>
      </div>
      <div className="hidden sm:block shrink-0">
        <StatusBadge status={lead.status} />
      </div>
      {lead.budgetRange && (
        <div className="hidden md:block text-[10px] font-mono text-gray-400 shrink-0">{lead.budgetRange}</div>
      )}
      <div className="hidden lg:block text-[10px] font-mono text-gray-300 shrink-0">{createdDate}</div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
};

export const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataUnavailable, setIsDataUnavailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, l] = await Promise.all([getDashboard(), getLeads()]);
        setMetrics(m || zeroMetrics);
        setRecentLeads(l.slice(0, 8));
        setIsDataUnavailable((m?.totalLeads ?? 0) === 0 && l.length === 0);
      } catch (err) {
        console.error('[crm/dashboard] Data fetch failed:', err);
        setMetrics(zeroMetrics);
        setRecentLeads([]);
        setIsDataUnavailable(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Loading dashboard..." /></CrmShell>;
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
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-400 uppercase mb-1">{today}</p>
            <h1 className="text-2xl font-display font-bold uppercase tracking-tight text-gray-900">Overview</h1>
          </div>
          <Link
            to="/crm/leads"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white hover:bg-gray-700 transition-all"
          >
            <Users size={12} /> All Leads
          </Link>
        </div>

        {isDataUnavailable && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-700">
            No data yet — leads appear once customers submit the form.
          </div>
        )}

        {/* Metrics Strip */}
        <MetricStrip items={metricItems} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Leads */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">Recent Leads</h2>
              <Link to="/crm/leads" className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase">
                View All <ChevronRight size={11} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead, i) => <DealCard key={lead.id} lead={lead} index={i} />)
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-16 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <Users size={20} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">No leads yet</p>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">Contact form submissions appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">Daily Focus</h2>

            <div className="space-y-2">
              <Link to="/crm/follow-ups" className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm transition-all duration-200">
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <Clock size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900">0 Follow-ups Today</div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase">All clear</div>
                </div>
                <ChevronRight size={13} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
              </Link>

              <Link to="/crm/leads" className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900">{metrics.newLeads} New Leads</div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase">Ready to qualify</div>
                </div>
                <ChevronRight size={13} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link to="/crm/pipeline" className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-emerald-200 hover:shadow-sm transition-all duration-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900">Pipeline</div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase">View deal stages</div>
                </div>
                <ChevronRight size={13} className="text-gray-300 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>

            {/* Pipeline Value */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[9px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-1">Pipeline Value</div>
              <div className="text-3xl font-display font-bold text-gray-900 tracking-tight">RM 0</div>
              <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                <TrendingUp size={11} />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">No change</span>
              </div>
            </div>

            {/* Funnel */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="text-[9px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase">Stage Funnel</div>
              {[
                { label: 'New',       value: metrics.newLeads,       color: 'bg-blue-400' },
                { label: 'Contacted', value: metrics.contactedLeads, color: 'bg-purple-400' },
                { label: 'Qualified', value: metrics.qualifiedLeads, color: 'bg-amber-400' },
                { label: 'Proposal',  value: metrics.proposalSent,   color: 'bg-orange-400' },
                { label: 'Won',       value: metrics.won,            color: 'bg-emerald-400' },
              ].map((stage) => {
                const pct = metrics.totalLeads > 0 ? Math.round((stage.value / metrics.totalLeads) * 100) : 0;
                return (
                  <div key={stage.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{stage.label}</span>
                      <span className="text-[9px] font-mono font-bold text-gray-700">{stage.value}</span>
                    </div>
                    <div className="h-[3px] rounded-full bg-gray-100 overflow-hidden">
                      <div className={cn('h-full rounded-full transition-all duration-500', stage.color)} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
