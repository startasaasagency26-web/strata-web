import { auditEntries } from '../../content/agents';

export const AuditLog = () => (
  <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-surface2 text-text shadow-lg shadow-gold/5">
    <div className="border-b border-border px-6 py-4">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Illustrative audit record</p>
    </div>
    <div className="divide-y divide-white/10">
      {auditEntries.map((entry) => (
        <div key={`${entry.time}-${entry.action}`} className="grid gap-2 px-6 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
          <span className="font-mono text-[11px] text-muted">{entry.time}</span>
          <div>
            <p className="text-sm font-bold text-text">{entry.action}</p>
            <p className="mt-1 text-[12px] text-muted">{entry.actor}</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{entry.result}</span>
        </div>
      ))}
    </div>
  </div>
);
