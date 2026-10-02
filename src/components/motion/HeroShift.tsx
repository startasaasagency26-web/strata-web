import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { FLOOR, Volume, facePoint, line, makeBox, makeIso, poly, type BoxShape, type Pt } from './iso';

/**
 * "The Shift" — the Strata hero scene.
 *
 * An isometric service-business floor. Four carrier units move one job
 * through it: counter -> bench -> shelf -> the dock row. The `progress` motion
 * value (0 -> 1) is the only clock for the story; the hero plays it once on a
 * timer. The one exception is the idle light pulse, which loops along the lit
 * route only after the story has settled (progress 1).
 *
 * Story beat: a job card rides the route, stalls at the bench handoff in an
 * unowned gap (it dims, a dashed gap marker shows), an "Owner" tag slides on,
 * and the card carries on with its owner attached.
 *
 * Geometry note: the signal route is an OPEN path with two free ends. It
 * must never close into a ring — that is the whole point of the scene.
 */

// ── Isometric projection ─────────────────────────────────────────────────
const iso = makeIso(830, 140);
const box = makeBox(iso);
const OX = 830;
const OY = 140;

// ── The floor plan ───────────────────────────────────────────────────────
const PLATE = box(-14, -14, 488, 408, FLOOR, 0);
const COUNTER = box(10, 10, 90, 60, 26);
const BENCH = box(175, 10, 100, 60, 4, FLOOR + 22);
const SHELF = box(340, 10, 80, 120, 78);

/** Docks run right to left, so the work ends at finance on the far left. */
const DOCKS = [
  { key: 'sales', plan: 346 },
  { key: 'inventory', plan: 249 },
  { key: 'procurement', plan: 152 },
  { key: 'finance', plan: 55 },
] as const;

const deskBox = (px: number) => box(px - 35, 300, 70, 50, 4, FLOOR + 18);
const deskTop = (px: number) => iso(px, 325, FLOOR + 22);

// ── The route — open, never a ring ───────────────────────────────────────
const R_COUNTER = iso(55, 85, FLOOR);
const R_CORNER = iso(150, 85, FLOOR);
const R_BENCH = iso(225, 85, FLOOR);
const R_APPROACH = iso(330, 85, FLOOR);
const R_SHELF = iso(380, 120, FLOOR);
const R_TURN = iso(380, 270, FLOOR);
const R_DOCK = (px: number) => iso(px, 270, FLOOR);
const R_END = iso(55, 300, FLOOR);

const PROC = R_DOCK(152);

/** The whole route as one open path — the idle pulse's track. */
const ROUTE_POINTS: Pt[] = [R_COUNTER, R_CORNER, R_BENCH, R_APPROACH, R_SHELF, R_TURN, R_DOCK(346), R_DOCK(249), PROC, R_DOCK(55), R_END];
const ROUTE_D = line(ROUTE_POINTS);

/** Eight independently revealed segments, ordered along the route. */
const SEGMENTS: { d: string; from: number; to: number }[] = [
  { d: line([R_COUNTER, R_CORNER]), from: 0.06, to: 0.14 },
  { d: line([R_CORNER, R_BENCH]), from: 0.14, to: 0.24 },
  { d: line([R_BENCH, R_APPROACH, R_SHELF]), from: 0.24, to: 0.5 },
  { d: line([R_SHELF, R_TURN]), from: 0.5, to: 0.58 },
  { d: line([R_TURN, R_DOCK(346)]), from: 0.56, to: 0.6 },
  { d: line([R_DOCK(346), R_DOCK(249)]), from: 0.58, to: 0.62 },
  { d: line([R_DOCK(249), PROC]), from: 0.6, to: 0.64 },
  { d: line([PROC, R_DOCK(55), R_END]), from: 0.72, to: 0.82 },
];

/** Short stubs joining the main route up to each dock. */
const BRANCHES: { d: string; from: number; to: number }[] = [
  { d: line([R_DOCK(346), iso(346, 300, FLOOR)]), from: 0.14, to: 0.2 },
  { d: line([R_DOCK(249), iso(249, 300, FLOOR)]), from: 0.32, to: 0.38 },
  { d: line([PROC, iso(152, 300, FLOOR)]), from: 0.62, to: 0.68 },
];

// ── Carrier choreography ─────────────────────────────────────────────────
// Each carrier undocks, works the route, and returns home. Coordinates are
// screen-space keyframes interpolated straight off story progress.
const HOME: Pt[] = DOCKS.map((d) => deskTop(d.plan));

type Track = { stops: number[]; x: number[]; y: number[] };

const TRACKS: Track[] = [
  {
    // 01 Sales — takes the request from the counter to the bench.
    stops: [0, 0.06, 0.14, 0.28, 0.38, 0.5, 1],
    x: [HOME[0][0], HOME[0][0], R_COUNTER[0], R_BENCH[0], R_BENCH[0], HOME[0][0], HOME[0][0]],
    y: [HOME[0][1], HOME[0][1], R_COUNTER[1], R_BENCH[1], R_BENCH[1], HOME[0][1], HOME[0][1]],
  },
  {
    // 02 Inventory — meets 01 at the bench, then pulls the part.
    stops: [0, 0.18, 0.32, 0.38, 0.5, 0.62, 1],
    x: [HOME[1][0], HOME[1][0], R_BENCH[0], R_BENCH[0], R_SHELF[0], HOME[1][0], HOME[1][0]],
    y: [HOME[1][1], HOME[1][1], R_BENCH[1], R_BENCH[1], R_SHELF[1], HOME[1][1], HOME[1][1]],
  },
  {
    // 03 Procurement — carries the PO out, then stops and waits.
    stops: [0, 0.48, 0.58, 0.64, 0.72, 0.8, 1],
    x: [HOME[2][0], HOME[2][0], R_SHELF[0], PROC[0], PROC[0], HOME[2][0], HOME[2][0]],
    y: [HOME[2][1], HOME[2][1], R_SHELF[1], PROC[1], PROC[1], HOME[2][1], HOME[2][1]],
  },
  {
    // 04 Finance — collects the closed job.
    stops: [0, 0.78, 0.86, 0.94, 1],
    x: [HOME[3][0], HOME[3][0], R_BENCH[0], HOME[3][0], HOME[3][0]],
    y: [HOME[3][1], HOME[3][1], R_BENCH[1], HOME[3][1], HOME[3][1]],
  },
];

/** Rim light on/off windows, one per carrier. */
const ACTIVE: [number, number][] = [
  [0.06, 0.5],
  [0.18, 0.62],
  [0.48, 0.8],
  [0.78, 0.94],
];

/** When each dock monitor comes alive. */
const DOCK_LIT = [0.06, 0.18, 0.64, 0.78];

/** Stocked shelf bays, then the two that empty when the part is pulled. */
const STOCKED: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [3, 1],
  [0, 2], [2, 2], [3, 2],
];
const EMPTIED: [number, number][] = [[2, 1], [1, 2]];

const AUDIT_ROWS = [0.9, 0.93, 0.96];

// ── The job card's ride ─────────────────────────────────────────────────
// It follows the drawn route, floating just above it. It reaches the bench
// as the route arrives there, waits in the gap, then moves on with the route.
const CARD_LIFT = 40;
const STALL: [number, number] = [0.27, 0.4];
const CARD: Track = (() => {
  const pts: [number, Pt][] = [
    [0, R_COUNTER],
    [0.06, R_COUNTER],
    [0.14, R_CORNER],
    [STALL[0], R_BENCH],
    [STALL[1], R_BENCH],
    [0.45, R_APPROACH],
    [0.5, R_SHELF],
    [0.58, R_TURN],
    [0.6, R_DOCK(346)],
    [0.62, R_DOCK(249)],
    [0.64, PROC],
    [0.72, PROC],
    [0.78, R_DOCK(55)],
    [0.82, R_END],
    [1, R_END],
  ];
  return { stops: pts.map(([s]) => s), x: pts.map(([, p]) => p[0]), y: pts.map(([, p]) => p[1] - CARD_LIFT) };
})();

// ── Pieces ───────────────────────────────────────────────────────────────
const Legs = ({ shape, drop }: { shape: BoxShape; drop: number }) => (
  <g className="stroke-primary" strokeWidth={1.5} strokeLinecap="round">
    {[shape.corners.B, shape.corners.C, shape.corners.D].map(([x, y], i) => (
      <line key={i} x1={x} y1={y} x2={x} y2={y + drop} />
    ))}
  </g>
);

const Carrier = ({
  p,
  track,
  active,
}: {
  p: MotionValue<number>;
  track: Track;
  active: [number, number];
}) => {
  const x = useTransform(p, track.stops, track.x);
  const y = useTransform(p, track.stops, track.y);
  const lit = useTransform(
    p,
    [active[0] - 0.02, active[0] + 0.02, active[1] - 0.02, active[1] + 0.02],
    [0, 1, 1, 0],
  );

  return (
    <motion.g style={{ x, y }}>
      <ellipse cx={0} cy={9} rx={15} ry={4} className="fill-primary" opacity={0.1} />
      <g className="stroke-primary" strokeWidth={1.1} strokeLinejoin="round">
        <rect x={-13} y={-9} width={26} height={14} rx={3} className="fill-surface" />
        <rect x={-8} y={-14} width={16} height={6} rx={1.5} className="fill-surface2" />
      </g>
      <motion.rect x={-11} y={2} width={22} height={2} rx={1} className="fill-accent" style={{ opacity: lit }} />
    </motion.g>
  );
};

const RouteSegment = ({ p, seg, width, opacity }: { p: MotionValue<number>; seg: { d: string; from: number; to: number }; width: number; opacity?: number }) => {
  const pathLength = useTransform(p, [seg.from, seg.to], [0, 1]);
  return <motion.path d={seg.d} strokeWidth={width} opacity={opacity} style={{ pathLength }} />;
};

const ShelfBaysEmptied = ({ p, face }: { p: MotionValue<number>; face: Pt[] }) => {
  const opacity = useTransform(p, [0.46, 0.54], [0, 0.16]);
  return (
    <motion.g style={{ opacity }}>
      {EMPTIED.map(([c, r]) => (
        <polygon
          key={`${c}-${r}`}
          className="fill-primary"
          points={poly([
            facePoint(face, c / 4, r / 3),
            facePoint(face, (c + 1) / 4, r / 3),
            facePoint(face, (c + 1) / 4, (r + 1) / 3),
            facePoint(face, c / 4, (r + 1) / 3),
          ])}
        />
      ))}
    </motion.g>
  );
};

const Dock = ({ p, plan, index }: { p: MotionValue<number>; plan: number; index: number }) => {
  const shape = deskBox(plan);
  const [mx, my] = deskTop(plan);
  const lit = useTransform(p, [DOCK_LIT[index] - 0.02, DOCK_LIT[index] + 0.02], [0, 0.85]);
  const cleared = useTransform(p, [0.7, 0.74], [0, 0.85]);
  const isProcurement = index === 2;

  return (
    <g>
      <Legs shape={shape} drop={18} />
      <Volume shape={shape} />
      <g className="stroke-primary" strokeWidth={1.1} strokeLinejoin="round">
        <rect x={mx - 15} y={my - 34} width={30} height={20} rx={2} className="fill-surface" />
        <line x1={mx} y1={my - 14} x2={mx} y2={my - 8} />
      </g>
      <motion.rect
        x={mx - 12}
        y={my - 31}
        width={24}
        height={14}
        rx={1.5}
        className={isProcurement ? 'fill-caution' : 'fill-accent'}
        style={{ opacity: lit }}
      />
      {isProcurement && (
        <motion.rect
          x={mx - 12}
          y={my - 31}
          width={24}
          height={14}
          rx={1.5}
          className="fill-accent"
          style={{ opacity: cleared }}
        />
      )}
    </g>
  );
};

const Handoff = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0.32, 0.35, 0.37, 0.4], [0, 1, 1, 0]);
  const d = `M${(R_BENCH[0] - 16).toFixed(1)} ${(R_BENCH[1] - 14).toFixed(1)} Q ${R_BENCH[0].toFixed(1)} ${(R_BENCH[1] - 32).toFixed(1)} ${(R_BENCH[0] + 16).toFixed(1)} ${(R_BENCH[1] - 14).toFixed(1)}`;
  return (
    <motion.path
      d={d}
      className="stroke-accent"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      style={{ opacity }}
    />
  );
};

const ApprovalHold = ({ p }: { p: MotionValue<number> }) => {
  const waiting = useTransform(p, [0.63, 0.66, 0.71, 0.73], [0, 1, 1, 0]);
  const cleared = useTransform(p, [0.72, 0.75, 0.8, 0.83], [0, 1, 1, 0]);
  const cx = PROC[0];
  const cy = PROC[1] - 32;

  return (
    <>
      <motion.g style={{ opacity: waiting }}>
        <circle cx={cx} cy={cy} r={9} className="fill-surface stroke-caution" strokeWidth={1.4} />
        <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 1} className="stroke-caution" strokeWidth={1.6} strokeLinecap="round" />
        <circle cx={cx} cy={cy + 4} r={0.9} className="fill-caution" />
      </motion.g>
      <motion.g style={{ opacity: cleared }}>
        <circle cx={cx} cy={cy} r={9} className="fill-surface stroke-accent" strokeWidth={1.4} />
        <path
          d={`M${(cx - 4).toFixed(1)} ${cy.toFixed(1)} l3 3.2 l5.4 -6.4`}
          className="stroke-accent"
          fill="none"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </>
  );
};

const AuditRow = ({ p, from, index }: { p: MotionValue<number>; from: number; index: number }) => {
  const pathLength = useTransform(p, [from, from + 0.04], [0, 1]);
  const d = line([iso(120 - index * 30, 394, FLOOR), iso(300 - index * 46, 394, FLOOR)]);
  return <motion.path d={d} style={{ pathLength }} />;
};

/** The unowned gap at the bench: a dashed marker that shows only while the card waits. */
const OwnershipGap = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [STALL[0] + 0.01, STALL[0] + 0.03, STALL[1] - 0.04, STALL[1] - 0.01], [0, 0.9, 0.9, 0]);
  const cx = R_BENCH[0];
  const cy = R_BENCH[1] - CARD_LIFT;
  return (
    <motion.rect
      x={cx - 24}
      y={cy - 17}
      width={48}
      height={34}
      rx={6}
      className="stroke-caution"
      fill="none"
      strokeWidth={1.2}
      strokeDasharray="3 3"
      style={{ opacity }}
    />
  );
};

const JobCard = ({ p }: { p: MotionValue<number> }) => {
  const x = useTransform(p, CARD.stops, CARD.x);
  const y = useTransform(p, CARD.stops, CARD.y);
  // Dims while it sits in the unowned gap, recovers once it has an owner.
  const opacity = useTransform(p, [STALL[0] - 0.01, STALL[0] + 0.02, STALL[1] - 0.03, STALL[1]], [1, 0.38, 0.38, 1]);
  // The owner tag slides on from the right partway through the stall, then stays attached.
  const tagX = useTransform(p, [STALL[1] - 0.07, STALL[1] - 0.03], [18, 0]);
  const tagOpacity = useTransform(p, [STALL[1] - 0.07, STALL[1] - 0.04], [0, 1]);

  return (
    <motion.g style={{ x, y }}>
      <motion.g style={{ opacity }}>
        <rect x={-15} y={-10} width={30} height={20} rx={2.5} className="fill-surface stroke-primary" strokeWidth={1.1} />
        <g className="stroke-primary" strokeWidth={1} strokeLinecap="round" opacity={0.55}>
          <line x1={-10} y1={-4} x2={8} y2={-4} />
          <line x1={-10} y1={1} x2={4} y2={1} />
          <line x1={-10} y1={5.5} x2={6} y2={5.5} />
        </g>
      </motion.g>
      <motion.g style={{ x: tagX, opacity: tagOpacity }}>
        <rect x={18} y={-8} width={44} height={16} rx={8} className="fill-accent" />
        <text
          x={40}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-void font-sans"
          fontSize={10.5}
          fontWeight={700}
          letterSpacing={0.2}
        >
          Owner
        </text>
      </motion.g>
    </motion.g>
  );
};

/** Progress at which the story has finished and holds its final frame. */
const SETTLED = 1;

/**
 * Idle light pulse: once the story has settled, a short bright dash keeps
 * travelling the lit route. stroke-dashoffset only (CSS keyframes) plus a fade
 * in; paused until the story settles and whenever the scene is off screen.
 */
const IdlePulse = ({ p, running }: { p: MotionValue<number>; running: boolean }) => {
  const opacity = useTransform(p, [SETTLED - 0.02, SETTLED], [0, 1]);
  return (
    <motion.g style={{ opacity }} className="hero-pulse" data-running={running ? 'true' : 'false'} aria-hidden="true">
      <path d={ROUTE_D} className="stroke-accent" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.16} />
      <path
        d={ROUTE_D}
        pathLength={1}
        className="hero-pulse-dash stroke-champagne"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.06 1.2"
      />
    </motion.g>
  );
};

// ── Scene ────────────────────────────────────────────────────────────────
const Scene = ({ p, idle }: { p: MotionValue<number>; idle: { running: boolean } | null }) => {
  const shelfFace = SHELF.left;

  return (
    <>
      <ellipse cx={OX} cy={OY + 350} rx={332} ry={54} className="fill-primary" opacity={0.07} />
      <Volume shape={PLATE} />

      <g className="stroke-line" strokeWidth={0.7} opacity={0.75} fill="none">
        {Array.from({ length: 12 }, (_, i) => -14 + i * 44).map((v) => (
          <g key={v}>
            <path d={line([iso(v, -14, FLOOR), iso(v, 394, FLOOR)])} />
            <path d={line([iso(-14, v, FLOOR), iso(474, v, FLOOR)])} />
          </g>
        ))}
      </g>

      <Volume shape={COUNTER} />
      <Legs shape={BENCH} drop={22} />
      <Volume shape={BENCH} />
      <Volume shape={SHELF} />

      <g className="stroke-primary" strokeWidth={0.8} opacity={0.7} fill="none">
        {[0.25, 0.5, 0.75].map((u) => (
          <path key={`u${u}`} d={line([facePoint(shelfFace, u, 0), facePoint(shelfFace, u, 1)])} />
        ))}
        {[0.33, 0.66].map((v) => (
          <path key={`v${v}`} d={line([facePoint(shelfFace, 0, v), facePoint(shelfFace, 1, v)])} />
        ))}
      </g>
      <g>
        {STOCKED.map(([c, r]) => (
          <polygon
            key={`${c}-${r}`}
            className="fill-surface2 stroke-primary"
            strokeWidth={0.7}
            opacity={0.95}
            points={poly([
              facePoint(shelfFace, (c + 0.16) / 4, (r + 0.28) / 3),
              facePoint(shelfFace, (c + 0.84) / 4, (r + 0.28) / 3),
              facePoint(shelfFace, (c + 0.84) / 4, (r + 0.92) / 3),
              facePoint(shelfFace, (c + 0.16) / 4, (r + 0.92) / 3),
            ])}
          />
        ))}
      </g>
      <ShelfBaysEmptied p={p} face={shelfFace} />

      {DOCKS.map((dock, i) => (
        <Dock key={dock.key} p={p} plan={dock.plan} index={i} />
      ))}

      {idle && <IdlePulse p={p} running={idle.running} />}

      <g className="stroke-accent" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {SEGMENTS.map((seg, i) => (
          <RouteSegment key={i} p={p} seg={seg} width={2.2} />
        ))}
        {BRANCHES.map((br, i) => (
          <RouteSegment key={`b${i}`} p={p} seg={br} width={1.4} opacity={0.6} />
        ))}
      </g>

      <Handoff p={p} />
      <ApprovalHold p={p} />

      {TRACKS.map((track, i) => (
        <Carrier key={i} p={p} track={track} active={ACTIVE[i]} />
      ))}

      <OwnershipGap p={p} />
      <JobCard p={p} />

      <g className="stroke-accent" fill="none" strokeWidth={1.3} strokeLinecap="round" opacity={0.5}>
        {AUDIT_ROWS.map((from, i) => (
          <AuditRow key={from} p={p} from={from} index={i} />
        ))}
      </g>
    </>
  );
};

/**
 * @param idle  Render the idle light pulse (desktop only). It runs once
 *              progress has settled at 1 and the scene is on screen.
 */
export const HeroShift = ({ progress, idle = false }: { progress: MotionValue<number>; idle?: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  const settled = useMotionValue(1);
  const p = shouldReduceMotion ? settled : progress;
  const svgRef = useRef<SVGSVGElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [settledStory, setSettledStory] = useState(() => progress.get() >= SETTLED);
  const showIdle = idle && !shouldReduceMotion;

  useMotionValueEvent(progress, 'change', (v) => {
    const next = v >= SETTLED;
    setSettledStory((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (!showIdle || !svgRef.current || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.05 });
    io.observe(svgRef.current);
    return () => io.disconnect();
  }, [showIdle]);

  return (
    <svg
      ref={svgRef}
      viewBox="490 -10 680 450"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="hero-shift-title hero-shift-desc"
    >
      <title id="hero-shift-title">One job moving through a business on Strata</title>
      <desc id="hero-shift-desc">
        An isometric view of a service-business floor. A request arrives at the front counter and
        moves to the job bench, a part is pulled from the parts shelf, and four carrier units move
        the work between four agent workstations. The job card waits at the bench handoff until an
        owner tag is attached, then continues. Procurement stops and waits for a human approval
        before continuing. Every route the work travelled stays lit, and an audit trail is written
        along the front edge.
      </desc>
      <Scene p={p} idle={showIdle ? { running: onScreen && settledStory } : null} />
    </svg>
  );
};
