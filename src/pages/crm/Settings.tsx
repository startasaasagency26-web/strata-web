import { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Users, 
  Webhook,
  AlertTriangle
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, CrmInput } from '../../components/crm/CrmUI';
import { getCrmSettings } from '../../lib/crm/client';
import type { CrmSettings } from '../../types/crm';
import { cn } from '../../lib/utils';

export const Settings = () => {
  const [settings, setSettings] = useState<CrmSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCrmSettings();
        setSettings(data);
      } catch (err) {
        setError('Failed to load settings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <CrmShell><LoadingState message="Accessing system configuration..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;
  if (!settings) return null;

  return (
    <CrmShell>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-white mb-2">System Settings</h1>
          <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Internal configuration & backend status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Integration Status */}
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-white/20" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Backend Integration</h2>
              </div>
              
              <div className={cn(
                "p-8 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-8 transition-all",
                settings.isConfigured 
                  ? "bg-emerald-500/5 border-emerald-500/20" 
                  : "bg-orange-500/5 border-orange-500/20"
              )}>
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    settings.isConfigured ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                  )}>
                    {settings.isConfigured ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {settings.isConfigured ? 'Production Storage Connected' : 'CRM Backend Missing'}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                      {settings.isConfigured 
                        ? 'Your lead data is currently synchronized with the Strata production database.' 
                        : 'The CRM is currently running on mock data. Connect a database or webhook to persist leads.'}
                    </p>
                  </div>
                </div>
                <button className="px-6 py-3 rounded-xl bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all">
                  Configure Integration
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-white/20" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Team Management</h2>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                <div className="divide-y divide-white/5">
                  {settings.teamMembers.map((member, i) => (
                    <div key={i} className="px-8 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-sm font-bold">{member.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-white">{member}</p>
                          <p className="text-[10px] font-mono text-white/20 uppercase">Strategist</p>
                        </div>
                      </div>
                      <button className="text-[9px] font-mono font-bold tracking-widest text-white/20 hover:text-white uppercase transition-colors">Edit Access</button>
                    </div>
                  ))}
                  <button className="w-full py-6 text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-white hover:bg-white/5 uppercase transition-all">
                    Invite Team Member
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Webhook size={20} className="text-white/20" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white">Notification Endpoints</h2>
              </div>
              
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 space-y-6">
                <div className="space-y-4">
                  <CrmInput label="System Email" defaultValue={settings.contactEmail} />
                  <CrmInput label="Primary WhatsApp" defaultValue={settings.whatsappNumber} />
                </div>
                <button className="w-full py-4 rounded-xl border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                  Update Endpoints
                </button>
              </div>
            </section>

            <section className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-8 space-y-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={16} />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Danger Zone</h3>
              </div>
              <p className="text-[10px] text-red-400/60 leading-relaxed uppercase font-mono">Irreversible system actions</p>
              <button className="w-full py-3 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                Purge All Mock Data
              </button>
            </section>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
