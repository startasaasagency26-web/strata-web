import { SectionShell } from '../product/SectionShell';

const workflows = [
  {
    number: '01',
    title: 'Tender and quotation',
    break: 'Requirements, approvals and follow-up sit across inboxes, documents and individual memory.',
    control: 'One visible path from request and scope to approved quotation and next action.',
  },
  {
    number: '02',
    title: 'Quotation and order intake',
    break: 'Enquiries are re-keyed, ownership changes silently and customers ask for status.',
    control: 'A named owner, required context and an explicit handoff into fulfilment.',
  },
  {
    number: '03',
    title: 'Field service dispatch',
    break: 'Requests, schedules and completion evidence are separated from the original need.',
    control: 'A traceable flow from triage and assignment to completion and review.',
  },
];

export const TheDisconnect = () => (
  <SectionShell
    id="workflows"
    eyebrow="02 · RECOGNISABLE WORKFLOWS"
    headline="Start with the work that already repeats."
    support="Strata looks for a workflow with a clear trigger, recurring handoffs and a measurable outcome. These are common starting points—not claims about your business before the Audit."
  >
    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-accent">THE PATTERN</p>
        <p className="mt-5 max-w-md text-2xl font-semibold leading-snug text-text md:text-3xl">
          The work moves through WhatsApp, spreadsheets, inboxes and staff — but nobody owns what happens next.
        </p>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          The Audit makes the current path visible before recommending technology or implementation.
        </p>
      </div>
      <ol className="border-t border-line">
        {workflows.map((workflow) => (
          <li key={workflow.number} className="grid gap-5 border-b border-line py-7 sm:grid-cols-[4rem_1fr] md:py-9">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">{workflow.number}</span>
            <article>
              <h3 className="text-2xl font-bold text-text md:text-3xl">{workflow.title}</h3>
              <dl className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Where it breaks</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted md:text-base">{workflow.break}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">What control looks like</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text md:text-base">{workflow.control}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </SectionShell>
);
