# Strata hero motion assets

The hero no longer uses video. "The Shift" is rendered as inline SVG in
`src/components/motion/HeroShift.tsx` and driven entirely by scroll
progress from `src/components/motion/ScrollStage.tsx`.

## Files here

- `hero-poster.webp` — retained for social/OG use. Not used by the hero.

## Rules

- No video. No raster assets in the hero.
- Colours come from Tailwind tokens (`surface`, `line`, `primary`,
  `muted`, `accent`, `caution`). Never hardcode hex in the scene.
- The signal route is an open path with two free ends. It must never
  close into a loop.
