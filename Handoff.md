# Handoff — Strata Web

**Repo root:** `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web`
**Branch:** `feat/websites-page-2026-10` (off `master` @ 6442e8f) — built and checked; on origin via the SGT sync (preview deploy only). Local checkout parked back on `dev`.
**Written:** 2026-10-10
**By:** Forge (build), Atlas (verification)

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
- `src/components/Navbar.tsx` — `WEBSITES` after `AUDIT`; at `xl` the header grid is `auto minmax(0,1fr) auto` so the links centre in the space between logo and CTA (link padding back to the original `px-4`). Below `xl` the grid is unchanged (`1fr auto 1fr`).
- Walkthrough "silent, tap for sound" (Nick, 2026-10-10): src + poster only set within 1200 px of the viewport; muted looping autoplay while ≥ 50% visible, pauses when it leaves; "Tap for sound" button (top-left, 44 px) unmutes, restarts at 0, turns on native controls and stops looping; never re-muted; after sound-on it only resumes a pause it caused. Reduced motion: no autoplay, button reads "Play with sound". VTT track kept, off by default.
- Atlas fixes round 1 (2026-10-10): hero loop retries `play()` on `loadeddata`/`canplay`/`visibilitychange` and pauses when fully off-screen; walkthrough poster only set when the player is within 1200 px of the viewport; below-hero sections use `content-visibility: auto` with tuned intrinsic sizes.
- `src/components/Footer.tsx` — "Websites" under "Solo Ops Kit".
- `public/video/websites/` — hero loop MP4 (byte copies of the approved v4 renders), VP9 WebMs, first-frame posters, walkthrough MP4 (now a lossless faststart remux of the pure-Remotion **v5** — Nick rejected v6's Higgsfield scenery; decoded video and audio MD5 identical to source), walkthrough poster (v5 frame at 15.6 s, no caption), VTT (v5, identical text to v6).
- `public/images/websites/` — WebP captures of the six concepts (desktop 720/1440, phone 390) and J-Armor (desktop 720/1440 captured fresh from the live site, phone 390/780 from the existing Sapphire Lens capture).

## NOT done / known broken

- ✅ **CHECKED by Atlas 2026-10-10 on `a155573`** (built dist via `vite preview` :4180, in-app browser): lint 0, build + positioning guard OK, 9 routes; no horizontal scroll at 1440/1280/375; nav at 1280 one row, logo→WORKFLOWS 26 px, ABOUT→CTA 25 px; mobile menu lists WEBSITES; all 15 images paint (incl. J-Armor + six concepts); hero WhatsApp button opens chooser with the exact approved message. Lighthouse mobile, quiet machine, paired with /kit: /websites 92, 92, 91 vs /kit 90, 89, 90 (LCP 2.7–2.8 s, CLS 0). Hero background-tab code read and sound (retries play on visibility/ready, pauses off-screen); the original freeze was seen in a hidden in-app pane, not reproduced in a visible browser.
- **WAITING ON NICK:** his own look at the branch preview `https://strata-web-git-feat-web-75e951-startasaasagency26-webs-projects.vercel.app/websites` (Vercel login), then his go and his merge/push to master. Not live.
- ✅ Nav: measured gaps logo→first link and last link→CTA are 31/31 px at 1280 and 64/64 px at 1440 and 1920, on /, /websites, /kit, /pricing; one row; mobile header unchanged at 1279 and 390.
- ✅ Lighthouse mobile (lighthouse@12.8.2, `vite preview` on 4180, runs gated on CPU load < 25%): /websites 91, 92, 92 (LCP 2.82–2.85 s, TBT 136–157 ms, CLS 0). Scores swing 80–90 when the machine is busy; /kit swings the same way.
- ✅ Walkthrough v5 checked by Forge 2026-10-10 (headless Chrome, one-off preview, stopped): no walkthrough request at load (network log empty until scrolled near); in view → paused=false, muted=true, muted attribute present, loop on; scrolled away → paused; back → playing; real mouse tap on the button → muted=false, t=0.27 s after 0.4 s, controls on, button gone; sound on + scroll away/back → resumes; viewer pause + scroll away/back → stays paused. Reduced motion: no autoplay, only the poster requested, "Play with sound" tap plays unmuted from 0 with controls. No horizontal scroll at 390/1280/1440. Lighthouse mobile on /websites/ (CPU-gated): 89, 92, 93, 92, 91, 93 — the walkthrough is not requested during the Lighthouse run. Audio not listened to by anyone here.
- ⚠️ Background-tab hero fix: headless Chrome could not reproduce the original frozen hero (old build resumed on focus too), so the fix is verified only as "plays after focus, pauses off-screen, resumes on visibilitychange". Fixed looks like: Atlas re-runs his real-Chrome repro.
- ⚠️ `content-visibility: auto` means full-page "capture beyond viewport" screenshots show below-hero sections blank until scrolled; real scrolling renders them (checked per section at 1440).
- ⚠️ Pre-existing: nav active state compares `pathname === href`, so on `/websites/` (trailing slash, as `vite preview` serves it) WEBSITES is not highlighted; same for /kit/.
- ✅ Ruled ALLOWED by Atlas 2026-10-09 (fictional shops' prices; Nick approved walkthrough v6). For the record — the locked concept captures show fictional prices (Lowtide €148 / €90, Ardent Lane S$48,260 / S$31,945), and the locked walkthrough shows, around 24–27 s, a Lorong Table order screen with "RM 14" / "RM 52" next to a Lowtide checkout with euro amounts. Text greps cannot see these. Settled: allowed, no change.
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
