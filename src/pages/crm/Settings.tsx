import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import {
  Database,
  ShieldCheck,
  Users,
  Webhook,
  AlertTriangle,
  Plus,
  Loader2,
  X,
} from 'lucide-react';
import { CrmShell } from '../../components/crm/CrmShell';
import { LoadingState, ErrorState, CrmInput, CrmSelect } from '../../components/crm/CrmUI';
import { checkHealth, getCrmSettings, getTeamMembers, updateCrmSettings, updateProfile } from '../../lib/crm/client';
import type { CrmSettings, CrmUserProfile } from '../../types/crm';
import { cn } from '../../lib/utils';
import { useCrmAuth } from '../../contexts/CrmAuthContext';
import { getPermissions } from '../../lib/crm/permissions';

type HealthStatus = {
  supabaseConnected: boolean;
  tables: Record<string, boolean>;
};

function useDismissableLayer(
  isOpen: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, ref, onClose]);
}

export const Settings = () => {
  const [settings, setSettings] = useState<CrmSettings | null>(null);
  const [team, setTeam] = useState<CrmUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [healthError, setHealthError] = useState('');
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CrmUserProfile | null>(null);
  const [memberRole, setMemberRole] = useState<CrmUserProfile['role']>('manager');
  const [memberStatus, setMemberStatus] = useState<CrmUserProfile['status']>('active');
  const [isSavingMember, setIsSavingMember] = useState(false);
  const [resetText, setResetText] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const integrationRef = useRef<HTMLDivElement>(null);
  const manageRef = useRef<HTMLFormElement>(null);
  const resetRef = useRef<HTMLDivElement>(null);
  const { profile } = useCrmAuth();
  const permissions = getPermissions(profile?.role || 'manager');

  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useDismissableLayer(showIntegrationModal, integrationRef, () => setShowIntegrationModal(false));
  useDismissableLayer(Boolean(selectedMember), manageRef, () => setSelectedMember(null));
  useDismissableLayer(showResetModal, resetRef, () => setShowResetModal(false));

  const fetchData = useCallback(async () => {
    const [settingsData, teamData] = await Promise.all([
      getCrmSettings(),
      getTeamMembers()
    ]);
    setSettings(settingsData);
    setTeam(teamData);
    setEmail(settingsData.contactEmail);
    setWhatsapp(settingsData.whatsappNumber);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        await fetchData();
      } catch (err) {
        console.error('[crm/settings] Data fetch failed:', err);
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Failed to load settings.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [fetchData]);

  const handleUpdateEndpoints = async () => {
    if (!permissions.canEditSettings) return;
    setIsSaving(true);
    setFormError('');
    setSuccess('');
    try {
      const updated = await updateCrmSettings({
        contactEmail: email,
        whatsappNumber: whatsapp,
        isConfigured: true
      });
      setSettings(updated);
      setSuccess('Settings updated successfully.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const openIntegrationStatus = async () => {
    setShowIntegrationModal(true);
    setIsCheckingHealth(true);
    setHealthError('');
    try {
      const health = await checkHealth();
      const tables = health.tables && typeof health.tables === 'object' && !Array.isArray(health.tables)
        ? health.tables as Record<string, boolean>
        : {};
      setHealthStatus({
        supabaseConnected: Boolean(health.supabaseConnected),
        tables,
      });
    } catch (err) {
      setHealthError(err instanceof Error ? err.message : 'Failed to load integration status.');
    } finally {
      setIsCheckingHealth(false);
    }
  };

  const openManageMember = (member: CrmUserProfile) => {
    setSelectedMember(member);
    setMemberRole(member.role);
    setMemberStatus(member.status);
    setFormError('');
    setSuccess('');
  };

  const handleSaveMember = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedMember) return;
    setIsSavingMember(true);
    setFormError('');
    setSuccess('');
    try {
      const updated = await updateProfile(selectedMember.id, {
        role: memberRole,
        status: memberStatus,
      });
      setTeam((current) => current.map((member) => member.id === updated.id ? updated : member));
      setSelectedMember(null);
      setSuccess('Team member updated.');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update team member.');
    } finally {
      setIsSavingMember(false);
    }
  };

  if (isLoading) return <CrmShell><LoadingState message="Accessing system configuration..." /></CrmShell>;
  if (loadError) return <CrmShell><ErrorState message={loadError} onRetry={() => window.location.reload()} /></CrmShell>;
  if (!settings) return null;

  return (
    <CrmShell>
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#111827] mb-2">System Settings</h1>
          <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-gray-500 uppercase">Internal configuration & backend status</p>
        </div>

        {success && (
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
            {success}
          </div>
        )}
        {formError && (
          <div className="rounded-[18px] border border-red-200 bg-red-50 px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-red-600">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Database size={24} className="text-gray-400" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Backend Integration</h2>
              </div>

              <div className={cn(
                'p-8 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-8 transition-all shadow-sm',
                settings.isConfigured
                  ? 'bg-emerald-50/80 backdrop-blur-sm border-emerald-200/50'
                  : 'bg-orange-50/80 backdrop-blur-sm border-orange-200/50'
              )}>
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center shadow-sm bg-white border border-white/50',
                    settings.isConfigured ? 'text-emerald-500' : 'text-orange-500'
                  )}>
                    {settings.isConfigured ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] mb-1">
                      {settings.isConfigured ? 'Production Storage Connected' : 'Backend Status Needs Review'}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                      {settings.isConfigured
                        ? 'CRM storage is configured. Open the status panel to verify protected backend tables.'
                        : 'CRM storage is not marked configured. Use the protected status panel before relying on lead operations.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={openIntegrationStatus}
                  className="px-6 py-3 rounded-xl bg-[#111827] text-white font-mono text-[10px] font-bold tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all"
                >
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
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold mt-0.5">{member.role} · {member.status}</p>
                          </div>
                        </div>
                        {permissions.canChangeRoles && member.id !== profile?.id && (
                          <button
                            onClick={() => openManageMember(member)}
                            className="text-[10px] font-mono font-bold tracking-widest text-gray-400 hover:text-[#111827] uppercase transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-white/50 hover:shadow-sm"
                          >
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
                    <div className="px-8 py-6 text-center">
                      <button
                        disabled
                        title="Invite backend not connected yet."
                        className="w-full py-4 text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase transition-all flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <Plus size={14} /> Invite Team Member
                      </button>
                      <p className="mt-2 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400">Invite backend not connected yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Webhook size={24} className="text-gray-400" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Notification Endpoints</h2>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[32px] p-8 space-y-6 shadow-sm">
                <div className="space-y-5">
                  <CrmInput label="System Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!permissions.canEditSettings} />
                  <CrmInput label="Primary WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} disabled={!permissions.canEditSettings} />
                </div>

                {!permissions.canEditSettings && (
                  <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest text-center">Admin access required to update endpoints.</p>
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

            {permissions.canAccessDangerZone && (
              <section className="rounded-[32px] p-8 space-y-4 transition-all shadow-sm bg-red-50/80 backdrop-blur-sm border border-red-200/50">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle size={18} />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Danger Zone</h3>
                </div>
                <p className="text-[10px] text-red-500/80 leading-relaxed uppercase font-mono font-bold tracking-widest">Irreversible system actions</p>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="w-full py-4 rounded-xl border border-red-500/20 bg-white shadow-sm text-red-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-red-50 hover:border-red-300 transition-all"
                >
                  Factory Reset CRM
                </button>
              </section>
            )}
          </div>
        </div>
      </div>

      {showIntegrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="integration-status-title">
          <div ref={integrationRef} className="w-full max-w-lg rounded-[24px] border border-white/50 bg-white/95 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 id="integration-status-title" className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Integration Status</h2>
              <button onClick={() => setShowIntegrationModal(false)} aria-label="Close integration status" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            {isCheckingHealth ? (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm font-bold text-gray-600">
                <Loader2 size={16} className="animate-spin" /> Checking protected backend status...
              </div>
            ) : healthError ? (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">{healthError}</div>
            ) : healthStatus ? (
              <div className="space-y-3">
                <div className={cn('rounded-xl border p-4 text-sm font-bold', healthStatus.supabaseConnected ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-red-100 bg-red-50 text-red-600')}>
                  Supabase connection: {healthStatus.supabaseConnected ? 'Available' : 'Unavailable'}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(healthStatus.tables).map(([table, ok]) => (
                    <div key={table} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs font-bold text-gray-600">
                      <span>{table}</span>
                      <span className={ok ? 'text-emerald-600' : 'text-red-500'}>{ok ? 'OK' : 'Unavailable'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="manage-member-title">
          <form ref={manageRef} onSubmit={handleSaveMember} className="w-full max-w-md rounded-[24px] border border-white/50 bg-white/95 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 id="manage-member-title" className="text-xl font-display font-bold uppercase tracking-tight text-[#111827]">Manage Member</h2>
              <button type="button" onClick={() => setSelectedMember(null)} aria-label="Close manage member modal" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-700">{selectedMember.fullName}</p>
            <CrmSelect label="Role" value={memberRole} onChange={(event) => setMemberRole(event.target.value as CrmUserProfile['role'])}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </CrmSelect>
            <CrmSelect label="Status" value={memberStatus} onChange={(event) => setMemberStatus(event.target.value as CrmUserProfile['status'])}>
              <option value="active">Active</option>
              <option value="invited">Invited</option>
              <option value="disabled">Disabled</option>
            </CrmSelect>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setSelectedMember(null)} disabled={isSavingMember} className="rounded-full border border-gray-200 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#111827] hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={isSavingMember} className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:bg-gray-800 disabled:opacity-50">
                {isSavingMember && <Loader2 size={14} className="animate-spin" />}
                {isSavingMember ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reset-crm-title">
          <div ref={resetRef} className="w-full max-w-md rounded-[24px] border border-red-100 bg-white/95 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 id="reset-crm-title" className="text-xl font-display font-bold uppercase tracking-tight text-red-600">Factory Reset CRM</h2>
              <button onClick={() => setShowResetModal(false)} aria-label="Close reset confirmation" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-600">Type RESET to confirm. This screen is intentionally blocked because no backend reset endpoint is connected.</p>
            <CrmInput label="Confirmation" value={resetText} onChange={(event) => setResetText(event.target.value)} placeholder="RESET" />
            <button
              disabled
              title="Backend reset endpoint not connected."
              className="w-full rounded-xl border border-red-200 bg-red-50 py-4 text-[10px] font-mono font-bold uppercase tracking-widest text-red-300 cursor-not-allowed"
            >
              {resetText === 'RESET' ? 'Backend reset endpoint not connected.' : 'Type RESET to continue'}
            </button>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">Backend reset endpoint not connected.</p>
          </div>
        </div>
      )}
    </CrmShell>
  );
};
