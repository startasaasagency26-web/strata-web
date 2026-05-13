import { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Users, 
  Webhook,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, CrmInput } from '../../components/crm/CrmUI';
import { getCrmSettings, getTeamMembers, updateCrmSettings } from '../../lib/crm/client';
import type { CrmSettings, CrmUserProfile } from '../../types/crm';
import { cn } from '../../lib/utils';
import { useCrmAuth } from '../../contexts/CrmAuthContext';
import { getPermissions } from '../../lib/crm/permissions';

export const Settings = () => {
  const [settings, setSettings] = useState<CrmSettings | null>(null);
  const [team, setTeam] = useState<CrmUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { profile } = useCrmAuth();
  const permissions = getPermissions(profile?.role || 'manager');

  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, teamData] = await Promise.all([
          getCrmSettings(),
          getTeamMembers()
        ]);
        setSettings(settingsData);
        setTeam(teamData);
        setEmail(settingsData.contactEmail);
        setWhatsapp(settingsData.whatsappNumber);
      } catch (err) {
        setError('Failed to load settings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateEndpoints = async () => {
    if (!permissions.canEditSettings) return;
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateCrmSettings({
        contactEmail: email,
        whatsappNumber: whatsapp,
        isConfigured: true
      });
      setSuccess('Settings updated successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <CrmShell><LoadingState message="Accessing system configuration..." /></CrmShell>;
  if (error) return <CrmShell><ErrorState message={error} /></CrmShell>;
  if (!settings) return null;

  return (
    <CrmShell>
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] mb-2">System Settings</h1>
          <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-500 uppercase">Internal configuration & backend status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Integration Status */}
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Database size={24} className="text-gray-400" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Backend Integration</h2>
              </div>
              
              <div className={cn(
                "p-8 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-8 transition-all shadow-sm",
                settings.isConfigured 
                  ? "bg-emerald-50/80 backdrop-blur-sm border-emerald-200/50" 
                  : "bg-orange-50/80 backdrop-blur-sm border-orange-200/50"
              )}>
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-sm bg-white border border-white/50",
                    settings.isConfigured ? "text-emerald-500" : "text-orange-500"
                  )}>
                    {settings.isConfigured ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] mb-1">
                      {settings.isConfigured ? 'Production Storage Connected' : 'CRM Backend Missing'}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                      {settings.isConfigured 
                        ? 'Your lead data is currently synchronized with the Strata production database.' 
                        : 'The CRM is currently running on mock data. Connect a database or webhook to persist leads.'}
                    </p>
                  </div>
                </div>
                <button className="px-6 py-3 rounded-xl bg-[#111827] text-white font-mono text-[10px] font-bold tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all">
                  Configure Integration
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-gray-400" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Team Management</h2>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] overflow-hidden shadow-sm">
                <div className="divide-y divide-white/40">
                  {team.length > 0 ? (
                    team.map((member) => (
                      <div key={member.id} className="px-8 py-6 flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-[16px] bg-white border border-white/50 shadow-sm flex items-center justify-center font-display text-sm font-bold uppercase text-[#111827]">
                            {member.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-[#111827]">{member.fullName}</p>
                              {member.id === profile?.id && (
                                <span className="text-[8px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">You</span>
                              )}
                            </div>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold mt-0.5">{member.role}</p>
                          </div>
                        </div>
                        {permissions.canChangeRoles && member.id !== profile?.id && (
                          <button className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-[#111827] uppercase transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-white/50 hover:shadow-sm opacity-0 group-hover:opacity-100">
                            Manage
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-8 py-12 text-center text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                      No team members found.
                    </div>
                  )}
                  
                  {permissions.canManageTeam && (
                    <button className="w-full py-6 text-[10px] font-mono font-bold tracking-widest text-gray-500 hover:text-[#111827] hover:bg-white/40 uppercase transition-all flex items-center justify-center gap-2">
                      <Plus size={14} /> Invite Team Member
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Webhook size={24} className="text-gray-400" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Notification Endpoints</h2>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-8 space-y-6 shadow-sm">
                <div className="space-y-5">
                  <CrmInput 
                    label="System Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!permissions.canEditSettings}
                  />
                  <CrmInput 
                    label="Primary WhatsApp" 
                    value={whatsapp} 
                    onChange={(e) => setWhatsapp(e.target.value)}
                    disabled={!permissions.canEditSettings}
                  />
                </div>
                
                {success && (
                  <p className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest text-center">{success}</p>
                )}
                {error && (
                  <p className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest text-center">{error}</p>
                )}

                <button 
                  onClick={handleUpdateEndpoints}
                  disabled={!permissions.canEditSettings || isSaving}
                  className="w-full py-4 rounded-xl bg-[#111827] text-white text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-gray-800 hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : permissions.canEditSettings ? 'Update Endpoints' : 'Admin access required'}
                </button>
              </div>
            </section>

            <section className={cn(
              "rounded-[32px] p-8 space-y-4 transition-all shadow-sm",
              permissions.canAccessDangerZone 
                ? "bg-red-50/80 backdrop-blur-sm border border-red-200/50" 
                : "bg-white/40 border border-white/50 opacity-40"
            )}>
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle size={18} />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Danger Zone</h3>
              </div>
              <p className="text-[10px] text-red-500/80 leading-relaxed uppercase font-mono font-bold tracking-widest">Irreversible system actions</p>
              <button 
                disabled={!permissions.canAccessDangerZone}
                className="w-full py-4 rounded-xl border border-red-500/20 bg-white shadow-sm text-red-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-red-50 hover:border-red-300 transition-all disabled:cursor-not-allowed"
              >
                {permissions.canAccessDangerZone ? 'Factory Reset CRM' : 'Admin access required'}
              </button>
            </section>
          </div>
        </div>
      </div>
    </CrmShell>
  );
};
