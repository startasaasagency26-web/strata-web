import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  Clock,
  ChevronRight
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { MetricCard, LoadingState, ErrorState, StatusBadge } from '../../components/crm/CrmUI';
import { getDashboard, getLeads } from '../../lib/crm/client';
import type { DashboardMetrics, Lead } from '../../types/crm';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, l] = await Promise.all([getDashboard(), getLeads()]);
        setMetrics(m);
        setRecentLeads(l.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Calculating metrics..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;
  if (!metrics) return null;

  return (
    <CrmShell>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-white mb-2">Performance Overview</h1>
          <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Global lead metrics & activity</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Total Leads" 
            value={metrics.totalLeads} 
            icon={<Users size={16} />}
          />
          <MetricCard 
            label="Qualified" 
            value={metrics.qualifiedLeads} 
            icon={<TrendingUp size={16} />}
          />
          <MetricCard 
            label="Won" 
            value={metrics.won} 
            icon={<CheckCircle2 size={16} />}
          />
          <MetricCard 
            label="Conversion" 
            value={`${metrics.conversionRate.toFixed(1)}%`} 
            icon={<ArrowUpRight size={16} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Leads */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Recent Leads</h2>
              <Link to="/crm/leads" className="text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-white transition-colors uppercase flex items-center gap-2">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Name / Company</th>
                      <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Status</th>
                      <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">Budget</th>
                      <th className="px-6 py-4 text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentLeads.length > 0 ? (
                      recentLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-bold text-sm text-white">{lead.fullName}</div>
                            <div className="text-[10px] font-mono text-white/40 uppercase">{lead.companyName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-mono text-white/60">{lead.budgetRange}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link 
                              to={`/crm/leads/${lead.id}`}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white transition-all"
                            >
                              <ChevronRight size={14} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                          <p className="text-sm text-white font-bold uppercase tracking-tight mb-2">No leads yet</p>
                          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                            New diagnostic submissions will appear here once customers submit the form.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity / Follow-ups */}
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Daily Focus</h2>
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">0 Follow-ups Today</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Clean schedule</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{metrics.newLeads} New Leads</div>
                    <div className="text-[9px] font-mono text-white/40 uppercase">Ready for qualification</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="text-[10px] font-mono font-bold tracking-widest text-white/20 uppercase mb-4">Pipeline Value</div>
                <div className="text-2xl font-display font-bold text-white uppercase tracking-tight">RM 0</div>
                <div className="mt-2 flex items-center gap-2 text-white/20">
                  <TrendingUp size={12} />
                  <span className="text-[10px] font-mono font-bold uppercase">Stable vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
