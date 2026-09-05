# Handoff — Strata Web

**Repo root:** `C:\Users\Amirul\Desktop\Strata Growth Technologies\Strata Web`
**Branch:** `codex/video-insights-homepage`
**Written:** 2026-09-04
**By:** Claude (boss)

## Session update — 2026-09-04, latest (full audit + fix pass, verified by Claude)

**This is the newest current state.** Three audits ran (copy, design, technical); every finding
was re-verified by Claude directly before acting.

**SHIPPED 2026-09-05.** All of it is committed as `163ea78`, pushed to `master` and to
`codex/video-insights-homepage` (both refs now point at the same commit), and live in
production. Verified after the deploy, not assumed: the production build reports READY for
`163ea78`; `/`, `/pricing`, `/about`, `/blog` and `/build-with-us` all return 200; the live
`Pricing` chunk is byte-identical to the local `dist` build that carries the retagged headings;
and the live main chunk contains the new footer labels and the pre-filled audit message while
the old `Commercial Terms` / `Privacy & Terms` labels are gone from it.

### Two corrections to the record

1. **Production is CURRENT with this branch. The earlier "Nothing deployed" note is wrong.**
   Proof: the live CSS `index-DqQfqUhT.css` byte-matches the local `dist` build and contains
   `aspect-[68/45]`, a class that exists only in the post-fix `Hero.tsx`; live
   `index-DYw7MDt9.js` and `Home-DxLPn6wr.js` match too. The hero and navbar fixes ARE live.
2. **`preview_start` now works end to end.** The parent-folder launch config was used for real
   this session and brought the dev server up on 5173 and served pages. The previously open
   "real button press unconfirmed" item is closed.

### Fixed and measured this session

Beyond the seven-defect pass recorded below, three more were found and fixed:

- **The homepage closing CTA was still clipped on tablets** — 71px at 640px and 67px at 768px,
  which the seven-defect pass had correctly identified and deliberately left. Root cause was
  not `whitespace`: `FinalCTA.tsx:172` put two long CTAs side by side from the `sm` breakpoint,
  so flex shrank the pill below its content width. Fixed by moving the row switch from `sm` to
  `lg` (line 172), with the two children's width classes moved to match (lines 177, 187). An
  intermediate `md` attempt still clipped 67px at exactly 768px, because `md` IS 768px — worth
  remembering as a trap.
  **Now measured clean at 320, 360, 375, 414, 640, 768, 900, 1024, 1440 and 1920px** on both
  `/` and `/pricing`: every `overflow-hidden` control reports `scrollWidth - clientWidth === 0`
  and `scrollHeight - clientHeight === 0`, and page horizontal overflow is 0. Desktop still
  renders the two CTAs side by side (`flex-direction: row` at 1024 and 1920) — no regression.

- **Eight more audit CTAs were sending the vague opener.** The seven-defect pass fixed the
  footer icon and reported eight others; Claude verified by parsing every `<WhatsAppChoice>`
  opening tag rather than grepping lines, and confirms it — About hero / sales / final-cta,
  BuildWithUs, Pricing hero / scope-drivers / final-cta, and BlogArticle. Every one of those
  buttons says "Book an audit" in some form while opening WhatsApp with "I'd like to talk about
  my business operations." All eight now pass the audit message.
  **This also corrects the copy audit**, which stated that every button other than the footer
  icon already sent the audit message. It did not.

- **The defect class is now structurally impossible.** `message` on `WhatsAppChoice` is a
  required prop and `whatsappDefaultMessage` is deleted from the contact config, so TypeScript
  refuses to build any WhatsApp CTA that does not declare what it is asking for. Verified: the
  string "talk about my business operations" no longer appears anywhere in `src`.

### Verification run

`npx tsc -b` exit 0 · `npx eslint .` exit 0 · `node scripts/check-positioning.mjs` OK, 53 files,
16 phrases, 0 violations · `npm run build` exit 0, ending
`Prerendered 5 routes (0 articles) and generated dist/sitemap.xml.`
WhatsApp messages confirmed in the live DOM: every `wa.me` href on `/pricing` carries
`Hi Strata — I'd like to book a Business Operations Audit.`

### Decision — AI-search visibility is PARKED, deliberately

Nick was shown that the site serves ~6 KB shells with zero `<h1>` and no body copy on all five
routes, so ChatGPT, Claude and Perplexity read only the ~150-word static JSON-LD graph and
leave, while Google still renders and indexes normally. Estimated 3-4 hours to fix by
prerendering body HTML (`entry-server.tsx` + `renderToString`, keeping `createRoot` — do NOT
switch to `hydrateRoot`, which is where the regression risk lives). **Nick parked it on
2026-09-04.** Reason: leverage, not urgency — get paying clients before optimising a channel
with no traffic yet. This is a decision, not an oversight. Do not reopen it unprompted.

Parked with it, same reason: per-route JSON-LD (1 h, zero risk, mechanism already exists —
`routeMetadata.ts` declares `jsonLd` and `prerender.ts` emits it, but not one route sets it);
a `headers` block in `vercel.json` (hashed assets currently serve `max-age=0, must-revalidate`,
and only `Strict-Transport-Security` is set — no `X-Frame-Options`, `X-Content-Type-Options` or
`Referrer-Policy`); and a real 404 route (every unknown URL returns HTTP 200 with the homepage
shell).

### NOT done / still open

- **NOTHING IS COMMITTED.** All of the above is working-tree only.
- **The hero/navbar fix still lives only on a `codex/*` branch and in production.**
  `origin/master` is at `d6c009f`; the branch is ahead. There is no Git-to-production trigger
  (no deployment carries commit metadata), so master cannot revert the live site — but a
  deleted Codex branch would lose the fix. Master is a strict ancestor, so this is a plain
  fast-forward, no `--force`:
  `git push origin codex/video-insights-homepage:master`
  Claude has been blocked by the sandbox on default-branch writes before; left to Nick.
- **No Privacy Policy or Terms pages exist.** The two footer links that claimed to be them were
  relabelled to stop them lying ("About Strata", "How Pricing Works"), which is a mitigation,
  not a fix. Real pages are needed before any Meta or Google Ads account, and it is a Malaysian
  PDPA gap. Needs Nick's decision plus actual legal content — do not invent policy text.
- **`/build-with-us` still skips h1 to h3.** That page has no `h2` at all, so the footer
  headings follow the page title directly. A complete fix needs a section heading on the page,
  which is content, not code.
- **`/pricing` final CTA reports 5px of scroll overflow at 320px only**, with `clipX = 0` —
  nothing visibly cut; the label eats 4px of the pill's 40px padding. Was 100px.
- **Blog article date contrast could not be verified in a live DOM** — zero articles are
  published, so `BlogArticle` never renders. Fixed at source (`text-faint` to `text-muted`) and
  verified by computing the tokens: `--faint` = 4.425:1 (fails AA at 10px), `--muted` = 6.692:1.
- No test suite. Judged acceptable debt for a five-page marketing site — the two real
  regression classes this quarter were retired-offer language (caught by the positioning guard
  in CI) and a starved hero grid (caught by opening the page). One worthwhile extension, ~1 h:
  assert each prerendered route has a DISTINCT title and a canonical matching its own path,
  which is this architecture's one plausible silent failure.
- Eight dead components (`SystemSpine`, `GovernedAI`, `BrowserBuilder`, `ProductFrame` have zero
  references; `AgentGovernance`, `AuditLog`, `OperatingMemory`, `RuleGrid` are reachable only
  from those). All fully tree-shaken out of `dist` — hygiene, not risk.
- Untracked backups on disk, deliberately preserved: `Navbar.tsx.bak-preuifix-20260904`,
  `Hero.tsx.bak-preuifix-20260904`, `check-positioning.mjs.bak-preretire-20260904`.

**Not a bug — do not chase it.** Scroll-reveal sections render blank in a hidden browser pane,
so screenshots of them are worthless. Measure through the DOM
(`scrollWidth` / `clientWidth` / `getBoundingClientRect`), never by eye.

## Session update — 2026-09-04, later (Forge: seven-defect fix pass)

**This is the newest current state. The section below it still stands except where corrected
here.** Written by Forge. Uncommitted — the changes sit in the working tree on
`codex/video-insights-homepage`; nothing was committed, pushed, merged or deployed.

### Current state — all seven observed working

Seven defects fixed, 17 lines across 7 files. Verified against two real builds served side by
side (HEAD baseline in a throwaway git worktree vs the fixed tree) and measured through the DOM
in headless Chromium at 320 / 360 / 375 / 414 / 640 / 768 / 1024 / 1440 px on `/`, `/pricing`,
`/about`, `/blog`, `/build-with-us`, plus the mobile nav overlay.

1. **Shared button no longer clips its label on phones.**
   `src/components/ui/liquid-glass-button.tsx:12` — `whitespace-nowrap` →
   `whitespace-normal text-center sm:whitespace-nowrap`. One component-level change, no call
   sites touched. `overflow-hidden` kept (the gloss layers need it). Wording unchanged.
   Clipped pixels on the homepage closing CTA: 320px 123→0, 360px 83→0, 375px 68→0,
   414px 29→0. `/pricing` hero 48.8→0, scope-drivers 63.8→0, final CTA 118.8→0,
   "View platform direction" 27.3→0. Mobile nav CTA 6→0. No page-level horizontal
   overflow at any width, before or after (`documentElement.scrollWidth - clientWidth === 0`).
2. **Footer WhatsApp icon sends the right opener.** `src/components/Footer.tsx:29` — added the
   Business Operations Audit message. Live-checked: the icon's `wa.me` links now carry the same
   text as the footer button.
3. **Two footer links stopped claiming to be legal pages.** `Footer.tsx:90-91` —
   "Privacy & Terms" → "About Strata", "Commercial Terms" → "How Pricing Works". Targets
   unchanged. No policy page or policy text was invented.
4. **Homepage problem statement replaced.** `src/components/sections/BusinessProblem.tsx:35`.
5. **Blog intro no longer contradicts its own meta description.** `src/pages/Blog.tsx:21-22`.
6. **Heading-level skips gone.** `About.tsx:260`, `Pricing.tsx:267/465/546`, `Footer.tsx:45/58/68`
   — seven `h4` retagged to `h3`. Heading-order skips across the site: 7 → 1. Proven visually
   inert: 52 retagged headings compared before/after on computed `font-size`, `font-weight`,
   `line-height`, `font-family`, `letter-spacing`, `text-transform`, `color`, `margin-bottom`
   and box geometry — zero differences. The only deltas anywhere are `y` offsets caused by
   fix 1's taller wrapped buttons at 375px.
7. **Blog article update date meets AA.** `src/pages/BlogArticle.tsx:85` — `text-faint`
   (4.425:1, fails) → `text-muted` (6.692:1). The `--faint` token was not changed.

Gates: `npx tsc -b` 0 · `npx eslint .` 0 · `node scripts/check-positioning.mjs` 0 violations
· `npm run build` 0.

### NOT done — found, deliberately left

- **The homepage closing CTA is still clipped 59px at 640px and 44.9px at 768px.** Identical
  before and after — pre-existing, not caused by this pass, clean again at 1024px. Cause is
  not whitespace: `FinalCTA.tsx:172` flips to `sm:flex-row`, putting two long CTAs side by side
  in 548px. The fix is a breakpoint change (`sm:flex-row` → `md:flex-row`), which is a layout
  decision and was outside the seven-item brief.
- **`/pricing` final CTA still reports 5px of scroll overflow at 320px only.** No visible
  clipping (`clipX` = 0); the label sits inside the pill and eats 4px of its 40px padding.
  Removing it means either breaking a word mid-label or reducing `px-10` at the call site.
- **`/build-with-us` still skips h1 → h3** because that page has no `h2` at all. The footer
  retag improved it from h1 → h4. A complete fix needs a section heading on that page.
- **Eight other WhatsApp CTAs still send the generic opener** — `About.tsx:32/271/482`,
  `Pricing.tsx:219/457/566`, `BuildWithUs.tsx:54`, `BlogArticle.tsx:107` pass no `message`, so
  they fall back to "...talk about my business operations" while their visible labels say
  "Book an audit". Same defect as fix 2, eight more places.
- **Fix 7 was not verified in a live DOM** because zero articles are published, so
  `BlogArticle` never renders. Verified by contrast computation from the CSS tokens and by the
  source diff.
- Nothing committed, pushed, merged or deployed. No `*.bak-*` file touched. `vercel.json`,
  prerendering, JSON-LD and dead components untouched by design.

## Session update — 2026-09-04 (UI fixes + retirement enforcement)

**This section is the current state. Everything below it still stands except where corrected
here.**

### Fixed — measured, not eyeballed

- **The hamburger rendered in the horizontal centre of the nav bar at every width below
  1280px, phones included.** Cause: the bar is a three-column grid with four children and no
  explicit column placement. Below `xl` the desktop `nav` is `display:none` (generates no box)
  and the mobile STRATA wordmark is `absolute` (out of flow), so grid auto-placement skipped
  both and put the CTA+hamburger group in the **middle** track. `justify-self-end` then aligned
  it to the end of a content-sized centre column, i.e. dead centre of the bar. At 1280px and up
  the nav re-enters the flow and it landed correctly, which is why it only broke below that.
  Fix: `col-start-1` / `col-start-2` / `col-start-3` on the logo wrapper (line 123), the desktop
  nav (line 143) and the CTA+hamburger wrapper (line 171).
  Measured before to after: at 1279px the hamburger centre moved 635 to 1168 (the bar centre is
  635), leaving 48px to the bar edge and 454px of clearance from the wordmark. At 375px its
  centre moved 188 to 322, 20px off the edge. At 320px, 21px off the edge. At 1920px nothing
  changed, as required.

- **The hero diagram was starved of height, not broken.** The SVG viewBox is 680x450
  (1.5111:1) with `xMidYMid meet` inside a box roughly 1200px wide but only 180-320px tall, so
  it rendered height-bound and adrift in a very wide band.
  Fix in two parts. (1) The headline block became `max-w-5xl lg:max-w-none`, widening the
  measure from 1024 to 1108px and dropping the h1 from **four rendered lines to three at the
  same 80px font size** — 72px freed with no type change. (2) The diagram band became
  `lg:flex-1` inside the existing two-child flex column so it takes whatever the headline
  leaves, with an aspect-locked inner frame `aspect-[68/45]` (the viewBox ratio, so no
  letterboxing) clamped `lg:min-h-[220px] lg:max-h-[520px]`.
  Measured after: **1279x800 gives 362x240** (was 302x200, computed from the old
  `clamp(180px,25vh,310px)`); **1920x1080 gives 524x347** (was 408x270). 375px and 320px are
  unchanged at 310x205 and 255x169 — both were already width-bound, so there was nothing to win.

- **No clipping and no horizontal overflow at 320, 375, 1279 or 1920.** This also closes the
  previously unverified "hero clamp untested at 320-375px" item: at 320px the h1 renders 255x389
  and does not overflow.

### An intermediate state clipped. Not in the final code, but note the trap.

A 220px floor combined with the *old* four-line headline made the section overflow — and the
hero section is `overflow-hidden`, so it **clipped in silence** rather than scrolling. Any
future change to the diagram floor must be proven against `scrollHeight > clientHeight`, never
by looking at the page.

### Retirement enforcement

`scripts/check-positioning.mjs` carries two more banned phrases, `care plan` and
`install bundle`, because Nick retired the System Care Plan and the Full System Install Bundle
on 2026-09-04. Guard reports **16 phrases, 53 files, 0 violations**, and was verified in both
directions: injecting "care plan" into `src/config/contact.ts` made it exit 1, and the probe was
reverted byte-clean. Neither phrase had ever appeared in site copy, so no page changed.

### Correction to the record below

The NOT-done list below says `origin/master` is 40 commits behind and still carries Growth Media
and Revenue Infrastructure. **No longer true.** Verified 2026-09-04: master is at `d6c009f`, one
commit behind this branch, and the only files matching the retired phrases are the guard and its
CI workflow, which list them in order to block them.

### NOT done this session

- **The mobile menu overlay has not been reopened and re-checked** since the grid change. The
  overlay is a fixed-position sibling of the header rather than a grid child, so column
  placement cannot affect it structurally — but that is reasoning, not observation. One click.
- Option B is **specified, not built.** Nick chose to step the desktop headline down one size
  (the `lg` clamp cap from `10vh` to `8vh`) and give the freed height to the diagram. A full
  Codex brief carrying the baseline numbers to beat was handed to him. As it stands the diagram
  is *bigger*, not yet *big*.
- Untracked backups on disk: `src/components/Navbar.tsx.bak-preuifix-20260904`,
  `src/components/sections/Hero.tsx.bak-preuifix-20260904`,
  `scripts/check-positioning.mjs.bak-preretire-20260904`.

### Verification run this session

`npx tsc -b` clean, `npx eslint .` clean, `npm run build` exit 0, ending
`Prerendered 5 routes (0 articles) and generated dist/sitemap.xml.` Nothing deployed.

---

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
