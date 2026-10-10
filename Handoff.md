# Handoff — Strata Web

**Repo root:** `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web`
**Branch:** `feat/websites-page-2026-10` (off `master` @ 6442e8f) — work in progress, not pushed by Forge
**Written:** 2026-10-10
**By:** Forge (build) — Atlas verifies next

Previous handoff (legal pages + kit, 2026-10-05/06) is in this file's git history at `6442e8f`.

## Current state

- **Production:** master `6442e8f` (kit, legal pages, social links) is live on the Hobby Vercel team. Pushing master deploys production — Nick pushes. The SGT sync auto-commits and pushes whatever branch is checked out; never leave this checkout on master (park on `dev` when idle).
- **Branch `feat/websites-page-2026-10`** adds the `/websites` page. Observed by Forge locally on 2026-10-10:
  - `npm run lint` exit 0; `npm run check:positioning` 0 violations; `npm run build` passes, 9 routes prerendered, `/websites` in `dist/sitemap.xml`, `dist/websites/index.html` carries the approved title, description, canonical and a Service JSON-LD block.
  - Headless Chrome against a one-off `vite preview` (stopped): no horizontal scroll at 1280, 1440, 390; desktop nav on one line at 1280 and 1440 with no overlap; hero loop plays muted (WebM; 16:9 at ≥768 px, 9:16 below); with reduced motion only the poster shows; walkthrough is `preload="none"`, captions track present and off; both main CTAs and the concept cards open the WhatsApp chooser with the approved messages; "Visit j-armor.net" opens a new tab with `rel="noopener"`.
  - Every body line of copy §1–9 is present in the rendered page text (scripted check, 67 lines, 0 missing); "Not client work" appears nowhere.

## Changed this session

- `src/pages/Websites.tsx` (new) — the page, mirroring `Kit.tsx` section rhythm, cards, FAQ grid and closing block.
- `src/App.tsx` — lazy `/websites` route inside `PublicShell`.
- `src/config/routeMetadata.ts` — `websites` entry (title, description, Service JSON-LD).
- `src/components/Navbar.tsx` — `WEBSITES` after `AUDIT`; desktop link padding `px-4` → `px-2` (desktop nav only renders at `xl`) so seven links fit beside the CTA at 1280.
- `src/components/Footer.tsx` — "Websites" under "Solo Ops Kit".
- `public/video/websites/` — hero loop MP4 (byte copies of the approved v4 renders), VP9 WebMs, first-frame posters, walkthrough MP4 (lossless remux of v6 with faststart, identical decoded frames), walkthrough poster (15.6 s), VTT.
- `public/images/websites/` — WebP captures of the six concepts (desktop 720/1440, phone 390) and J-Armor (desktop 720/1440 captured fresh from the live site, phone 390/780 from the existing Sapphire Lens capture).

## NOT done / known broken

- ⚠️ **Not browser-verified by Atlas yet** — no human-eye check on a real phone or Lighthouse run. Fixed looks like: Atlas checks /websites at 1440/1280/390 on the 5173 preview and Lighthouse mobile ≥ 90.
- ⚠️ **Nav at 1280 is tight:** 3 px between the ABOUT pill and the BUSINESS OPS AUDIT button. No overlap, but visually crowded toward the right. Fixed looks like: Vibe signs off, or the header grid is changed (layout, not padding).
- ⚠️ **Prices inside images:** the locked concept captures show fictional prices (Lowtide €148 / €90, Ardent Lane S$48,260 / S$31,945), and the locked walkthrough shows, around 24–27 s, a Lorong Table order screen with "RM 14" / "RM 52" next to a Lowtide checkout with euro amounts. Text greps cannot see these. Fixed looks like: Atlas/Nick decide whether that breaks the "no price on the page" rule; if so Vibe re-captures without figures.
- ⚠️ Branch also edits the menu; unmerged `feat/homepage-revamp-2026-10` does too. Whichever merges second rebases and keeps both.
- ⚠️ Carried: Meta Pixel dormant — if switched on, Privacy page + consent banner first. PDPA expects a Bahasa Malaysia privacy notice. Site prices in RM for international buyers (Nick's call). iOS safe-area untested on a real iPhone. `ScrollStage.tsx` unused, `Hero.tsx.bak-preuifix-20260904` tracked.
- ⚠️ Hosting on the free Hobby plan (non-commercial use only); event counts for the new tracking tags need Pro.

## Named inputs the next agent needs

- Approved copy: `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\brain\strata-websites-page-copy-2026-10-09.md` (§1–9, search listing, WhatsApp messages; "Not client work." dropped 2026-10-10).
- Plan: `C:\Users\Amirul\.claude\plans\pasted-content-id-7e29-i-kind-floating-grove.md` §3.
- Source media (locked, untouched): `...\videos\strata-remotion-2026-10-12\websites\out\` (hero v4, walkthrough v6) and `...\websites-page-2026-10\concepts\<slug>\captures\`.
- Tracking sources: `websites / hero-cta`, `websites / closing-cta`, `websites / concept / <slug>`.

## Next actions, in order

1. Atlas verifies the branch in the browser + Lighthouse mobile, then returns the checkout to `dev`.
2. Nick decides on the prices visible inside the concept images and walkthrough.
3. Nick merges to master and pushes (production).

## Verification

```
cd "C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web" && git checkout feat/websites-page-2026-10 && npm run lint && npm run build
```
Expected: lint silent, build ends "Prerendered 9 routes ... generated dist/sitemap.xml."
