import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionShell } from '../product/SectionShell';
import { FLOOR, Volume, line, makeBox, makeIso, poly, type Pt } from '../motion/iso';

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

// ── Mini vignette: the hero's isometric floor, reduced to six stations ──────
// Each workflow is one open route between stations. The active row's route
// draws (pathLength = stroke-dashoffset, same technique as the hero scene).
const iso = makeIso(150, 40);
const box = makeBox(iso);
const PLATE = box(-10, -10, 300, 210, FLOOR, 0);
const COLS = [15, 115, 215];
const ROWS = [15, 120];
const HEIGHTS = [18, 26, 12, 22, 14, 30];
const STATIONS = ROWS.flatMap((y, r) => COLS.map((x, c) => ({ x, y, h: HEIGHTS[r * 3 + c] })));
const front = (i: number): [number, number] => [STATIONS[i].x + 25, STATIONS[i].y + 54];
const floor = (pts: [number, number][]): Pt[] => pts.map(([x, y]) => iso(x, y, FLOOR));

// Station indices: 0 1 2 (back row), 3 4 5 (front row). Corridors at x=90/190/282.
const ROUTES = [
  { stations: [0, 1, 2, 5], d: line(floor([front(0), front(1), front(2), [282, 69], [282, 174], front(5)])) },
  { stations: [3, 4, 2], d: line(floor([front(3), front(4), [190, 174], [190, 69], front(2)])) },
  { stations: [0, 4, 5], d: line(floor([front(0), [90, 69], [90, 174], front(4), front(5)])) },
];

const WorkflowVignette = ({ active, reduce }: { active: number; reduce: boolean }) => (
  <svg viewBox="0 0 360 250" className="w-full" aria-hidden="true">
    <Volume shape={PLATE} />
    <g className="stroke-line" strokeWidth={0.7} opacity={0.7} fill="none">
      {[50, 100, 150].map((v) => <path key={`r${v}`} d={line([iso(-10, v, FLOOR), iso(290, v, FLOOR)])} />)}
      {[65, 165].map((v) => <path key={`c${v}`} d={line([iso(v + 25, -10, FLOOR), iso(v + 25, 200, FLOOR)])} />)}
    </g>
    {/* faint track for every route */}
    <g className="stroke-accent" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.14}>
      {ROUTES.map((r, i) => <path key={i} d={r.d} />)}
    </g>
    {STATIONS.map((s, i) => {
      const shape = box(s.x, s.y, 50, 40, s.h);
      const lit = ROUTES[active].stations.includes(i);
      return (
        <g key={i}>
          <Volume shape={shape} />
          <motion.polygon
            points={poly(shape.top)}
            className="fill-accent"
            initial={false}
            animate={{ opacity: lit ? 0.55 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          />
        </g>
      );
    })}
    <g className="stroke-accent" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {ROUTES.map((r, i) => (
        <motion.path
          key={i}
          d={r.d}
          initial={false}
          animate={{ pathLength: reduce || i === active ? 1 : 0, opacity: i === active ? 1 : reduce ? 0.35 : 0 }}
          transition={{ pathLength: { duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: reduce ? 0 : 0.2 } }}
        />
      ))}
    </g>
  </svg>
);

export const TheDisconnect = () => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The row crossing the middle band of the viewport is the active one.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
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
          <div className="mt-10 hidden max-w-md lg:block">
            <WorkflowVignette active={active} reduce={shouldReduceMotion} />
          </div>
        </div>
        <ol className="border-t border-line">
          {workflows.map((workflow, index) => {
            const isActive = index === active;
            return (
              <li
                key={workflow.number}
                ref={(el) => { rowRefs.current[index] = el; }}
                data-index={index}
                data-active={isActive || undefined}
                className="relative grid gap-5 border-b border-line py-7 sm:grid-cols-[4rem_1fr] md:py-9"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-4 bottom-7 top-7 hidden w-px origin-top bg-gold transition-[transform,opacity] duration-300 lg:block ${isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
                />
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">{workflow.number}</span>
                <article className={`transition-opacity duration-300 ${isActive || shouldReduceMotion ? 'lg:opacity-100' : 'lg:opacity-60'}`}>
                  <h3 className="text-2xl font-bold text-text md:text-3xl">{workflow.title}</h3>
                  <dl className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Where it breaks</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted md:text-base">{workflow.break}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">What control looks like</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-text md:text-base">{workflow.control}</dd>
                    </div>
                  </dl>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
};
