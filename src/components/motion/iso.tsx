/* eslint-disable react-refresh/only-export-components */
/**
 * Shared isometric line-art primitives — the drawing language of the hero
 * scene ("The Shift"). Section vignettes reuse these so every illustration on
 * the page is drawn the same way: same projection, same stroke weights, same
 * two-tone faces.
 */

export const KX = 0.6755;
export const KY = 0.39;
export const FLOOR = 12; // slab thickness — everything rests on this plane

export type Pt = [number, number];

/** A projection anchored at a screen-space origin. */
export const makeIso = (ox: number, oy: number) => (px: number, py: number, lift = 0): Pt => [
  ox + KX * (px - py),
  oy + KY * (px + py) - lift,
];

export const poly = (list: Pt[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
export const line = (list: Pt[]) =>
  list.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

/** An isometric volume: top face plus the two faces turned toward the viewer. */
export const makeBox = (iso: ReturnType<typeof makeIso>) =>
  (px: number, py: number, w: number, d: number, h: number, base = FLOOR) => {
    const A = iso(px, py, base + h);
    const B = iso(px + w, py, base + h);
    const C = iso(px + w, py + d, base + h);
    const D = iso(px, py + d, base + h);
    return {
      top: [A, B, C, D] as Pt[],
      right: [C, B, iso(px + w, py, base), iso(px + w, py + d, base)] as Pt[],
      left: [D, C, iso(px + w, py + d, base), iso(px, py + d, base)] as Pt[],
      corners: { B, C, D },
    };
  };

export type BoxShape = ReturnType<ReturnType<typeof makeBox>>;

/** Bilinear point on a quad given as [topA, topB, baseB, baseA]. */
export const facePoint = (q: Pt[], u: number, v: number): Pt => {
  const [tA, tB, bB, bA] = q;
  const tx = tA[0] + (tB[0] - tA[0]) * u;
  const ty = tA[1] + (tB[1] - tA[1]) * u;
  const bx = bA[0] + (bB[0] - bA[0]) * u;
  const by = bA[1] + (bB[1] - bA[1]) * u;
  return [tx + (bx - tx) * v, ty + (by - ty) * v];
};

export const Volume = ({
  shape,
  topClass = 'fill-surface',
  sideClass = 'fill-surface2',
  strokeWidth = 1.1,
}: {
  shape: BoxShape;
  topClass?: string;
  sideClass?: string;
  strokeWidth?: number;
}) => (
  <g className="stroke-primary" strokeWidth={strokeWidth} strokeLinejoin="round">
    <polygon points={poly(shape.left)} className={sideClass} opacity={0.92} />
    <polygon points={poly(shape.right)} className={sideClass} opacity={0.76} />
    <polygon points={poly(shape.top)} className={topClass} />
  </g>
);
