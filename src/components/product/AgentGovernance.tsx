import { Check, LockKeyhole } from 'lucide-react';
import { governedAgents } from '../../content/agents';
import { AvailabilityBadge } from './AvailabilityBadge';
import { AuditLog } from './AuditLog';

export const AgentGovernance = () => (
  <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
    <div className="space-y-4">
      {governedAgents.map((agent) => (
        <article key={agent.name} className="rounded-[24px] border border-line bg-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Planned role</p>
              <h3 className="mt-2 text-2xl font-bold text-text">{agent.name}</h3>
            </div>
            {agent.availability !== 'live' && <AvailabilityBadge status={agent.availability} />}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{agent.remit}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-positive"><Check size={14} /> May</p>
              <ul className="mt-2 space-y-2 text-sm text-muted">{agent.may.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-caution"><LockKeyhole size={14} /> May not</p>
              <ul className="mt-2 space-y-2 text-sm text-muted">{agent.mayNot.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </article>
      ))}
    </div>
    <AuditLog />
  </div>
);
