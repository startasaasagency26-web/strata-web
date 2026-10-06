# Handoff — Strata Web

**Repo root:** `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web`
**Branch:** `feat/legal-pages-2026-10` (off `master` @ 734b13e) — work in progress
**Written:** 2026-10-05
**By:** Claude (boss)

Previous handoff (2026-09-04 → 2026-10-02 history) moved unchanged to
`C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\engine\handoff-archive\strata-web-to-2026-10-05.md`.

## Current state

- **Production:** on 2026-10-05 ~21:33 MYT, `https://www.strataagency.tech/` returned **HTTP 402 `DEPLOYMENT_DISABLED`** ("Payment required") from Vercel (observed by Forge with curl). The site is not serving. Cause not investigated (likely Vercel billing/plan on the team). Nick needs to look at the Vercel dashboard.
- Pushing master does NOT deploy. Production changes only through `vercel --prod`, which Nick runs.
- **Branch `feat/legal-pages-2026-10`** (pushed to origin) holds `/privacy`, `/terms` and `/kit`:
  - `a0975d6` chore(sync) checkpoint — auto-commit that captured the Privacy/Terms work (`src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/components/LegalPage.tsx`, `src/config/legal.ts`, routes, footer links).
  - `f813d4e` feat(kit) — `/kit` page (`src/pages/Kit.tsx`), `src/config/kit.ts` (single Gumroad URL constant `KIT.checkoutUrl`), nav + footer "Solo Ops Kit" links.
  - Observed locally by Forge: `npm run build` passes (8 routes prerendered), `npm run lint` exit 0; all three routes render at 1440, 1280 and 390 with no horizontal scroll; direct load works both as prerendered `dist/<route>/index.html` and via SPA rewrite to `/index.html`; footer, desktop nav and mobile-menu links navigate; both buy buttons point at the Gumroad listing; every body line of the approved kit copy is present on the page.
- Local env fix (not in git): `node_modules/@esbuild/win32-x64/esbuild.exe` was missing on this Windows machine, so `prerender` failed; restored from the npm tarball of the same version (0.28.2).

## Changed this session

- Added `/privacy`, `/terms`, `/kit`; footer links Privacy, Terms, Solo Ops Kit; nav link SOLO OPS KIT. Nothing else changed.

## NOT done / known broken

- 🔴 Production returns 402 DEPLOYMENT_DISABLED (see above). Nothing on the branch can go live until that is fixed.
- 🔴 None of the three pages is live. Fixed looks like: `/privacy`, `/terms`, `/kit` return 200 on www.strataagency.tech and Nick has read the legal wording.
- ✅ Checked by Atlas 2026-10-06 (laptop, local dev server): lint exit 0, build passes (8 routes prerendered); `/kit` text matches the approved copy (spot-checked every claim: 27 pages, 1.5–2 h, 14-day refund, US$99, bike-shop example); both buy buttons go to the Gumroad listing; Privacy and Terms show business name + reg. no. 202603196433 (CA0424990-H), no address, nick@strataagency.tech, 14-day refund; no horizontal scroll at 390 on all three. One unrepeated glitch: a first phone-width load of `/privacy` landed on `/`; reload was correct (likely dev-server first-load, not seen in the built output).
- ✅ Legal wording approved by Nick 2026-10-06, unchanged (Decision Index). Still a sensible baseline, not legal advice.
- ⚠️ Kit Gumroad button **clicks are not counted**. Page views are counted by Vercel Web Analytics (`<Analytics />` in `src/App.tsx`) only if Web Analytics is enabled on the Vercel project — not verified (site is down).
- ⚠️ Privacy page says "no cookies, no advertising pixels". True today: the Meta Pixel code in `src/lib/analytics.ts` is dormant (no `VITE_META_PIXEL_ID` in Vercel env or local `.env`; compiled bundle has the id as `void 0`). **If paid ads turn the pixel on, the Privacy page must be updated and an EU/UK consent banner added first.**
- ⚠️ Malaysia PDPA s.7(3) expects the privacy notice in Bahasa Malaysia as well as English. Only English exists.
- ⚠️ The site prices the service in RM while buyers are now international. Open flag for Nick. Don't change prices.
- ⚠️ Carried from 2026-10-02: iOS safe-area under the sticky bar not tested on a real iPhone. `ScrollStage.tsx` is unused and `Hero.tsx.bak-preuifix-20260904` is tracked; both are for a later cleanup.

## Named inputs the next agent needs

- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\brain\strata-kit-page-copy-2026-10-05.md` — approved /kit copy, to be used word for word.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\brain\strata-website-audit-2026-10-01.md` — section 6, stage 0 is the kit and legal page spec.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\engine\Decision Index.md` — entry "2026-10-05 — Kit refund 14 days; legal pages show no address": business name STRATA GROWTH TECHNOLOGIES, registration no. 202603196433 (CA0424990-H), **no postal address**, contact nick@strataagency.tech, refund 14 days.
- Gumroad listing: https://stratatechnologies.gumroad.com/l/soloopskit

## Next actions, in order

1. Nick fixes the Vercel 402 / DEPLOYMENT_DISABLED state.
2. ~~Atlas verifies the branch build~~ — done 2026-10-06 (see NOT done list).
3. ~~Nick reviews the legal wording~~ — approved 2026-10-06.
4. Merge to master, then Nick runs `vercel --prod`. Atlas checks that `/kit`, `/privacy` and `/terms` return 200 live on phone and desktop.
5. Then point the Instagram bio and the Reel 03/05 captions at `/kit`.

## Verification

```
cd "C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web" && git checkout feat/legal-pages-2026-10 && npm run lint && npm run build
```
Expected: lint reports no errors; build ends with Vite's "built in" line and no errors.

```
curl -s -o /dev/null -w "%{http_code}\n" https://www.strataagency.tech/privacy https://www.strataagency.tech/terms https://www.strataagency.tech/kit
```
Expected after go-live: `200` three times. Today, before go-live, this is not expected to pass.

---

Decision: Build /privacy, /terms and /kit before any paid ads (plan B3, audit stage 0)
Action: Forge builds on `feat/legal-pages-2026-10`; Atlas verifies; Nick deploys
Owner: Forge (build), Atlas (verify), Nick (deploy)
Due date: Not set — needs Nick
Storage: this repo; copy and decisions in the nick-sgt vault
Review date: Not set — needs Nick
