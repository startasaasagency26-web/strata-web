import { SectionShell } from './SectionShell';

const platformLayers = [
  { title: 'Business context', description: 'Approved records, company terminology and relevant history.' },
  { title: 'Human control', description: 'Named owners, permissions, approvals and clear escalation points.' },
  { title: 'Reviewable execution', description: 'Bounded assistance, logged actions and visible outcomes.' },
];

export const OperatingLayer = () => (
  <SectionShell
    id="platform"
    eyebrow="05 · STRATA CORE · IN DEVELOPMENT"
    headline="A governed operating layer behind the first workflow."
    support="Strata Core is the future platform direction—not a released product. It is being designed to preserve business context, keep people in control and make assisted work reviewable."
  >
    <div className="grid overflow-hidden rounded-[28px] border border-line lg:grid-cols-[0.8fr_1.2fr]">
      <div className="bg-gold p-7 text-void md:p-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]">WHAT STRATA DOES TODAY</p>
        <h3 className="mt-6 text-3xl font-black leading-tight md:text-4xl">Audit one workflow. Define the next controlled step.</h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-void/75 md:text-base">The current engagement is the Business Operations Audit, followed only by scoped implementation when there is a clear fit.</p>
      </div>
      <div className="bg-surface2 p-7 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-muted">WHAT THE PLATFORM IS DESIGNED TO SUPPORT</p>
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent">PLANNED</span>
        </div>
        <ol className="mt-7 border-t border-line">
          {platformLayers.map((layer, index) => (
            <li key={layer.title} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-xs font-bold text-accent">0{index + 1}</span>
              <div>
                <h3 className="text-xl font-bold text-text">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{layer.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </SectionShell>
);
