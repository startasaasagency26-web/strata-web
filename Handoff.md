# Handoff — Strata Web

**Repo root:** `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web`
**Branch:** `codex/video-insights-homepage`
**Written:** 2026-09-04
**By:** Claude (boss)

## Current state

**The repositioned site is live in production and verified.** Deployed from this repo root via
`vercel --prod` (team `srata-growth-technologies`, project `strata-web`), aliased to
`https://www.strataagency.tech`. Production had last deployed 6 days earlier, so the
repositioning had never been public until today.

Observed on the live site, not inferred from deploy output:

- Homepage `h1` is `Find the workflow costing your business time, visibility and
  follow-through.` — the approved external line. The old platform-led `TURN SCATTERED WORK INTO
  ONE CONTROLLED BUSINESS FLOW` is gone. Page title changed from `Strata Core | One Controlled
  Business Flow` to `Business Operations Audit | Strata Growth Technologies`.
- All five routes return **200**: `/`, `/pricing`, `/about`, `/build-with-us`, `/blog`.
- **Analytics is collecting.** `/_vercel/insights/script.js` returns 200 (so Web Analytics is
  *enabled* on the project, not merely installed); `POST /_vercel/insights/view` returned 200;
  `POST /_vercel/insights/event` returned 200, exercised by opening the contact chooser.
- Pricing figures unchanged and intact: RM 3,500 / 5,000 / 7,500 / 10,000. `RECOMMENDED START`
  badge on Growth; CTAs read `CHECK <TIER> FIT`.
- About: client-proof section absent from the rendered page **and every live JS chunk**; the
  retired revenue-ops voice is gone.
- `established` retained in all six sites (Nick's ruling, per the 25 Aug Drive authority).
- Working tree clean. Local `HEAD` == `origin/codex/video-insights-homepage` (`d6c009f`).
  `git log --not --remotes` is empty — nothing is unbacked-up.
- **Positioning guard is live in the repo.** `npm run check:positioning` passes (53 files
  scanned, 14 retired phrases, 0 violations) and is the first step of `npm run build`. Proven to
  fail in the other direction too: injecting "Growth Media and Meta Ads" made it exit 1 and made
  `npm run build` refuse. `.github/workflows/ci.yml` runs it on every branch and PR.

Contrast ratios measured in the live DOM: About gold badges **8.41:1** (was ~3.9);
BuildWithUs eyebrow **6.31:1** (was ~3.5), computed from the rendered colour and background.

## Changed this session

- `src/pages/Pricing.tsx` — FAQ self-contradiction closed (autonomous-AI answer now carries the
  same concierge disclosure as the answer above it); Growth named as the usual starting point
  *before* the grid; Foundation reframed as a genuine fit rather than a cheaper Growth; per-card
  CTA changed to `Check <tier> fit` with an explicit Business Operations Audit message; badge
  `MOST DEPLOYED` -> `RECOMMENDED START`. **No figure changed.**
- `src/pages/About.tsx` — removed the "Selected Work" client-proof section (102 lines) naming
  J-ARMOR, J-ARMOR SHOP, Thunderfix, OneSpecialist, 1MOBILE ROS with four live outbound links:
  permission unverified and several are related parties, not arm's-length clients. Removed the
  two now-dead `View Selected Work` CTAs that anchored to `#selected-work` (each sat beside a
  primary Audit CTA, which stays — no CTA lost). Dropped `opacity-60` on two gold-badge labels
  for contrast. Rewrote "OUR PROCESS" out of the retired revenue-ops voice.
- `src/pages/BuildWithUs.tsx` — eyebrow `text-text/40` -> `text-muted` for contrast.
- `src/lib/analytics.ts` — rewritten to fan out to Vercel Web Analytics plus the optional Meta
  Pixel. `whatsapp_contact` now carries the CTA source; new `contact_intent` event fires when
  the chooser opens. `trackPageView` deliberately left pixel-only.
- `src/App.tsx` — mounts `<Analytics />` beside the existing `SpeedInsights`.
- `src/components/WhatsAppChoice.tsx` — fires `contact_intent` on open.
- `package.json` / `package-lock.json` — added `@vercel/analytics`.

Commits: `bd9790f`, `982047d`, `48bebba`. All pushed.

## NOT done / known broken

- 🔴 **No test suite exists.** No test script in `package.json`, zero test files in `src`.
  "Do not push untested code" currently rests on typecheck, lint and build alone.
  Fixed looks like: a smoke test covering routing and the `packages` data shape, runnable via
  `npm test`, passing in CI.
- 🔴 **`origin/master` still contains retired offer language and needs ONE command from Nick.**
  `caf2a6e`, 40 commits behind, 7 files each still carrying "Growth Media" and "Revenue
  Infrastructure". A positioning guard now exists (`scripts/check-positioning.mjs` +
  `.github/workflows/ci.yml`) but **it does not protect this case yet**: a branch cut from
  today's `master` contains no workflow file, so pushing it runs no check. Master must carry the
  guard for the branch-from-main path to be covered.
  `master` is a strict ancestor of the work branch, so this is a plain fast-forward — nothing is
  discarded, no `--force`:
  `git push origin codex/video-insights-homepage:master`
  Claude attempted this twice and was blocked by the sandbox classifier both times
  (default-branch writes). Not worked around — deliberately left to Nick.
  Fixed looks like: `git grep -il "growth media" origin/master -- src` returns nothing, and
  `git ls-tree -r --name-only origin/master | grep ci.yml` finds the workflow.
- 🔴 **Body copy is invisible to anything that does not run JavaScript.** `scripts/prerender.ts`
  emits head tags only; every route serves ~6 KB with a correct `<title>` but no `<h1>` and no
  body copy. First paint is an empty dark rectangle with no loading affordance.
  Fixed looks like: `curl https://www.strataagency.tech/ | grep -c "<h1"` returns 1, and the
  Navbar/Footer/hero copy appear in raw HTML.
- ⚠️ **"Strata Vision Demo" is named nowhere in `src`** — `grep -ric "vision demo" src` returns
  0. It is step 4 of the required message hierarchy, so the funnel runs Audit -> pricing tiers
  with no tangible mechanism between them.
  Fixed looks like: `DeploymentPath.tsx` step 05 offers a Vision Demo of the prospect's own
  workflow, in those words.
- ⚠️ `src/components/sections/BusinessProblem.tsx:35` says "The work crosses people and tools" —
  a euphemism. The approved hierarchy names WhatsApp, spreadsheets, inboxes and staff on purpose.
  Fixed looks like: that sentence naming those four surfaces.
- ⚠️ `src/components/Footer.tsx:28` — the icon-only WhatsApp control passes no `message`, so it
  sends the generic opener while every other CTA sends the Audit one.
  Fixed looks like: a `message` prop matching line 75.
- ⚠️ `src/pages/Blog.tsx:21` — "what an AI workforce **actually does**" is present tense and
  implies a shipped product, contradicting the route's own meta description ("should do").
  Fixed looks like: future/intent phrasing. Low urgency: zero articles are published.
- ⚠️ **Heading-level skips (WCAG 1.3.1)** — `h2 -> h4` with no `h3` in `About.tsx`,
  `Pricing.tsx` (3 places) and `Footer.tsx` (3 `h4`s, zero `h3`s). Chosen for font size rather
  than outline position; the same files do it correctly elsewhere.
  Fixed looks like: retagged to `h3` with size set by utility class.
- ⚠️ `text-faint` computes ~4.4:1 on canvas at `BlogArticle.tsx:85`, under AA, and it carries a
  real update date. The token itself has no margin.
- ⚠️ **Hero clamp untested at 320–375px.** `Hero.tsx:39` floors at 48px with `font-black` and
  `-0.055em` tracking in a ~280px column, and the section is `overflow-hidden`, so an overflow
  would **clip silently** rather than scroll. Unverified on a real device.
  Fixed looks like: `break-words` on the `h1`, or a confirmed clean render at 320px.
- ⚠️ Icon-only touch targets are 40px (`Navbar.tsx:192`, `WhatsAppChoice.tsx:151`). Passes WCAG
  2.5.8's 24px, below the 44px comfort guideline.
- ⚠️ **Dead components in the bundle graph** — `SystemSpine` and `GovernedAI` have zero
  references; `AuditLog`, `AgentGovernance`, `RuleGrid`, `BrowserBuilder` have one each, likely
  a barrel export. None render. `AuditLog.tsx:8` holds the only raw colour in the tree
  (`divide-white/10`).
- ⚠️ Ad hoc opacity greys (`text-text/70 /60 /50 /35 /20`) bypass the calibrated token system.
  Most clear 4.5:1 by luck; `/40` did not, which is what A1 fixed.

**Not a bug — do not chase it.** Auditing in a hidden browser pane shows every Framer Motion
element, including the `h1` and header, stuck at `opacity: 0`. Cause: `document.hidden === true`
and Framer Motion drives entry animations with `requestAnimationFrame`, which never advances in
a hidden document. Not reproducible for a real visitor.

## Named inputs the next agent needs

- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\brain\strata-distribution-strategy-30-day-revenue-validation-launch.md`
  — positioning authority. Read the "Correction — 2026-09-04" section at the end; two `FACT:`
  lines in "Current status" are struck and superseded.
- Google Doc `15s_mN0MMlb_UXs8yvq800mwIUjS8LZQMDOyBlPDAH1M` — "Strata — Current Product
  Direction & Delivery Model", section "PRODUCT & COMMERCIAL UPDATE — 25 AUGUST 2026". **The
  pricing and ICP authority.** Drive wins over the skill file and the vault.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\projects\Strata Web Distribution Readiness.md`
  — the full verified task list with evidence paths.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\vault\engine\Decision Index.md`
  — 13 dated decisions, including one retraction. Read before re-deciding anything.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\.claude\skills\sgt-agent\SKILL.md`
  — **holds SUPERSEDED pricing** (Revenue Infrastructure, Growth Media). Do not use it as the
  pricing source until Nick has it rewritten.
- `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web\.vercel\project.json`
  — `prj_eczHPCctGflZ4Z7zSPzPPzH4da6M`. Deploy from this repo root only; both
  `.codex-strata-deploy-20260823*` folders target the same project.

## Next actions, in order

1. Watch the first real `whatsapp_contact` events by CTA source in Vercel Web Analytics. That is
   the measurable proxy for qualified discovery conversations; nothing else on this list matters
   until traffic exists.
2. Prerender the static shell (Navbar, Footer, hero copy — none depend on client state). Closes
   both the blank-first-paint and non-JS-crawler items with one change.
3. Name the production branch in Vercel and neutralise `origin/master`.
4. Fix the remaining copy defects: Vision Demo naming, `BusinessProblem.tsx:35`,
   `Footer.tsx:28`, `Blog.tsx:21`.
5. Fix the heading-level skips and `text-faint`; add `break-words` to the hero `h1`.
6. Add a smoke test suite so the release gate is more than typecheck and lint.

## Verification

```
cd "C:/Users/Amirul/Desktop/Strata Growth Technologies/Strata Web" && npx tsc -b && npx eslint . && npm run build
```
Expected: no output from `tsc -b` or `eslint`, both exit 0; build ends
`✓ built in ...` then `Prerendered 5 routes (0 articles) and generated dist/sitemap.xml.`, exit 0.

```
curl -s -o /dev/null -w "%{http_code}\n" https://www.strataagency.tech/_vercel/insights/script.js
```
Expected: `200` — Web Analytics enabled and serving.

```
cd "C:/Users/Amirul/Desktop/Strata Growth Technologies/Strata Web" && git log --oneline --not --remotes
```
Expected: no output — nothing unpushed.

---

Decision: Site repositioned, proof section dropped, "established" kept, analytics added — all deployed and verified live.
Action: Watch `whatsapp_contact` by source; then prerender the static shell.
Owner: Nick (positioning, pricing, proof) · Forge (prerender, tests) · Not set — needs Nick for the copy-fix owner
Due date: Not set — needs Nick
Storage: `vault/projects/Strata Web Distribution Readiness.md` · `vault/engine/Decision Index.md`
Review date: Not set — needs Nick
