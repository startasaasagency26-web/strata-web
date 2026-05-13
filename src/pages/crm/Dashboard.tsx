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

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-purple-500',
  qualified: 'bg-amber-500',
  proposal_sent: 'bg-orange-500',
  won: 'bg-emerald-500',
  lost: 'bg-red-500',
};

const AVATAR_COLORS = [
  'from-blue-500/30 to-blue-700/30 text-blue-300',
  'from-purple-500/30 to-purple-700/30 text-purple-300',
  'from-amber-500/30 to-amber-700/30 text-amber-300',
  'from-emerald-500/30 to-emerald-700/30 text-emerald-300',
  'from-rose-500/30 to-rose-700/30 text-rose-300',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
}

interface MetricStripItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: string;
}

const MetricStripItem = ({ label, value, icon, accent }: MetricStripItemProps) => (
  <div className="flex-1 min-w-0 flex flex-col gap-2 px-6 py-5 border-r border-white/10 last:border-r-0">
    <div className={cn('flex items-center gap-2 text-white/40', accent)}>
      {icon}
      <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase">{label}</span>
    </div>
    <div className="text-2xl font-display font-bold text-white tracking-tight">{value}</div>
  </div>
);

interface DealCardProps {
  lead: Lead;
  index: number;
}

const DealCard = ({ lead, index }: DealCardProps) => {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const statusColor = STATUS_COLORS[lead.status] ?? 'bg-white/20';
  const createdDate = lead.createdAt ? formatDate(lead.createdAt) : '—';

  return (
    <Link
      to={`/crm/leads/${lead.id}`}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-200"
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center font-mono text-[11px] font-bold shrink-0',
          avatarColor
        )}
      >
        {getInitials(lead.fullName)}
      </div>

      {/* Name + Company */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{lead.fullName}</p>
        <p className="text-[10px] font-mono text-white/40 uppercase truncate">{lead.companyName || 'Independent'}</p>
      </div>

      {/* Status dot + label */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        <div className={cn('w-1.5 h-1.5 rounded-full', statusColor)} />
        <StatusBadge status={lead.status} />
      </div>

      {/* Budget */}
      {lead.budgetRange && (
        <div className="hidden md:block text-[10px] font-mono text-white/40 shrink-0">{lead.budgetRange}</div>
      )}

      {/* Date */}
      <div className="hidden lg:block text-[10px] font-mono text-white/30 shrink-0">{createdDate}</div>

      {/* Arrow */}
      <ChevronRight
        size={14}
        className="text-white/20 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
      />
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

  return (
    <CrmShell>
      <div className="space-y-8">

        {/* Header Row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase mb-1">{today}</p>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">Overview</h1>
          </div>
          <Link
            to="/crm/leads"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            <Users size={13} /> All Leads
          </Link>
        </div>

        {isDataUnavailable && (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300/80">
            No data yet — leads will appear once customers submit the form.
          </div>
        )}

        {/* Metrics Strip */}
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden">
          <div className="flex divide-x divide-white/10 overflow-x-auto">
            <MetricStripItem
              label="Total Leads"
              value={metrics.totalLeads}
              icon={<Users size={13} />}
            />
            <MetricStripItem
              label="This Week"
              value={metrics.leadsThisWeek}
              icon={<Zap size={13} />}
              accent="text-blue-400"
            />
            <MetricStripItem
              label="Qualified"
              value={metrics.qualifiedLeads}
              icon={<TrendingUp size={13} />}
              accent="text-amber-400"
            />
            <MetricStripItem
              label="Won"
              value={metrics.won}
              icon={<CheckCircle2 size={13} />}
              accent="text-emerald-400"
            />
            <MetricStripItem
              label="Conversion"
              value={`${metrics.conversionRate.toFixed(1)}%`}
              icon={<ArrowUpRight size={13} />}
              accent="text-purple-400"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Leads — Deal Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold tracking-[0.2em] text-white/60 uppercase">Recent Leads</h2>
              <Link
                to="/crm/leads"
                className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-white/30 hover:text-white transition-colors uppercase"
              >
                View All <ChevronRight size={11} />
              </Link>
            </div>

            <div className="space-y-2">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead, i) => (
                  <DealCard key={lead.id} lead={lead} index={i} />
                ))
              ) : (
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-16 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Users size={20} className="text-white/20" />
                  </div>
                  <p className="text-sm font-bold text-white uppercase tracking-tight mb-2">No leads yet</p>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    Submissions from the contact form appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Daily Focus Panel */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold tracking-[0.2em] text-white/60 uppercase">Daily Focus</h2>

            <div className="space-y-2">
              {/* Follow-ups */}
              <Link
                to="/crm/follow-ups"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                  <Clock size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">0 Follow-ups Today</div>
                  <div className="text-[9px] font-mono text-white/30 uppercase">All clear</div>
                </div>
                <ChevronRight size={13} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>

              {/* New leads */}
              <Link
                to="/crm/leads"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">{metrics.newLeads} New Leads</div>
                  <div className="text-[9px] font-mono text-white/30 uppercase">Ready to qualify</div>
                </div>
                <ChevronRight size={13} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>

              {/* Pipeline link */}
              <Link
                to="/crm/pipeline"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">Pipeline</div>
                  <div className="text-[9px] font-mono text-white/30 uppercase">View deal stages</div>
                </div>
                <ChevronRight size={13} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
            </div>

            {/* Pipeline Value */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0A0A0A] space-y-1">
              <div className="text-[9px] font-mono font-bold tracking-[0.25em] text-white/25 uppercase">Pipeline Value</div>
              <div className="text-3xl font-display font-bold text-white uppercase tracking-tight">RM 0</div>
              <div className="flex items-center gap-1.5 text-white/20 pt-1">
                <TrendingUp size={11} />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">No change</span>
              </div>
            </div>

            {/* Funnel mini visual */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0A0A0A] space-y-3">
              <div className="text-[9px] font-mono font-bold tracking-[0.25em] text-white/25 uppercase">Funnel</div>
              {[
                { label: 'New', value: metrics.newLeads, color: 'bg-blue-500' },
                { label: 'Contacted', value: metrics.contactedLeads, color: 'bg-purple-500' },
                { label: 'Qualified', value: metrics.qualifiedLeads, color: 'bg-amber-500' },
                { label: 'Proposal', value: metrics.proposalSent, color: 'bg-orange-500' },
                { label: 'Won', value: metrics.won, color: 'bg-emerald-500' },
              ].map((stage) => {
                const pct = metrics.totalLeads > 0 ? Math.round((stage.value / metrics.totalLeads) * 100) : 0;
                return (
                  <div key={stage.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{stage.label}</span>
                      <span className="text-[9px] font-mono text-white/60">{stage.value}</span>
                    </div>
                    <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500', stage.color)}
                        style={{ width: `${pct}%` }}
                      />
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
