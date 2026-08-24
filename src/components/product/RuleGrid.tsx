import { useState } from 'react';
import { operatingRules } from '../../content/rules';
import { AvailabilityBadge } from './AvailabilityBadge';

export const RuleGrid = () => {
  const [selectedId, setSelectedId] = useState(operatingRules[0].id);
  const selectedRule = operatingRules.find((rule) => rule.id === selectedId) ?? operatingRules[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {operatingRules.map((rule) => {
          const isSelected = rule.id === selectedId;
          return (
            <article key={rule.id} className={`rounded-[22px] border p-5 ${isSelected ? 'border-accent bg-surface shadow-[0_12px_32px_rgb(var(--gold)/0.08)]' : 'border-line bg-surface'}`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-snug text-text">{rule.trigger}</h3>
                {rule.availability !== 'live' && <AvailabilityBadge status={rule.availability} />}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{rule.instruction}</p>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(rule.id)}
                className="mt-5 min-h-11 w-full rounded-full border border-gold/30 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-text transition-colors hover:bg-gold hover:text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset"
              >
                {isSelected ? 'Selected rule' : 'Inspect rule'}
              </button>
            </article>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[24px] border border-gold/25 bg-surface2 text-text shadow-lg shadow-gold/5 lg:self-start">
        <div className="border-b border-border px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Rule definition</div>
        <div aria-live="polite" className="p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Owner · {selectedRule.owner}</p>
          <h3 className="mt-4 text-2xl font-bold text-text">{selectedRule.trigger}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{selectedRule.instruction}</p>
          <pre className="mt-6 overflow-x-auto rounded-[16px] border border-border bg-gold/20 p-5 font-mono text-[12px] leading-7 text-void/80"><code>{selectedRule.example}</code></pre>
        </div>
      </div>
    </div>
  );
};
