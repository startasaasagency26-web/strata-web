#!/usr/bin/env node
/**
 * Positioning guard.
 *
 * Fails the build if retired offer language reappears in anything the public
 * site ships. This exists because the retired offers were removed once, by
 * hand, across 39 commits — and `master` sat 39 commits behind still carrying
 * them, so any branch-from-main would have quietly reintroduced them.
 *
 * The authority is the Drive doc "Strata - Current Product Direction &
 * Delivery Model", section "PRODUCT & COMMERCIAL UPDATE - 25 AUGUST 2026",
 * plus Nick's 24 August commercial correction. Growth Media, ads management,
 * campaign execution, media operations and client ad spend are retired.
 * Revenue Infrastructure is a superseded commercial model. Strata must not be
 * described as a generic AI-powered CRM.
 *
 * It is also a stop condition on the 30-day distribution plan: "The website
 * still contains conflicting offers, ads management or Growth Media language."
 * Tripping that blocks Gate 4, so it is cheaper to fail here than in market.
 *
 * Run locally:  npm run check:positioning
 *
 * Phrases are matched case-insensitively and must be PHRASE-specific. Do not
 * add bare words: "Growth" is a live package name, "revenue" and "media"
 * appear legitimately. A word-level rule here would fail every honest build.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();

/** Directories and files the public site ships from. */
const SCAN_TARGETS = ["src", "public", "content", "index.html"];

/** Never walk into these. */
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".vercel", "coverage"]);

/** Only inspect text we could plausibly ship as copy or markup. */
const SCAN_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".html", ".md", ".mdx", ".json", ".txt", ".css",
]);

/**
 * Retired language. Each entry: the phrase, and why it is banned — the reason
 * is printed on failure so whoever trips it learns the rule rather than just
 * deleting words to get green.
 */
const BANNED = [
  ["growth media", "Growth Media is retired as an offer (24 Aug 2026 commercial correction)."],
  ["revenue infrastructure", "Superseded commercial model. Current model is the AI Workforce ladder."],
  ["meta ads", "Ads management is no longer offered."],
  ["ads management", "No longer offered."],
  ["campaign execution", "Retired with Growth Media."],
  ["media operations", "Retired with Growth Media."],
  ["ad spend", "Client ad spend is not part of pricing, proposals or delivery."],
  ["ai-powered crm", "Positioning guardrail: Strata is not a generic AI-powered CRM."],
  ["ai powered crm", "Positioning guardrail: Strata is not a generic AI-powered CRM."],
  ["revenue leakage", "Retired revenue-ops voice. Lead with workflow, ownership and follow-through."],
  ["revenue optimization", "Retired revenue-ops voice."],
  ["revenue optimisation", "Retired revenue-ops voice."],
  ["scalable sales operations", "Retired revenue-ops voice."],
  ["lead leakage", "Retired revenue-ops voice."],
  ["care plan", "System Care Plan is retired (Nick, 2026-09-04). No longer delivered."],
  ["install bundle", "Full System Install Bundle is retired (Nick, 2026-09-04). No longer delivered."],
];

function walk(target) {
  const abs = join(ROOT, target);
  if (!existsSync(abs)) return [];

  const stats = statSync(abs);
  if (stats.isFile()) return [abs];

  const found = [];
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      found.push(...walk(join(target, entry.name)));
      continue;
    }
    const dot = entry.name.lastIndexOf(".");
    if (dot === -1) continue;
    if (!SCAN_EXTENSIONS.has(entry.name.slice(dot))) continue;
    found.push(join(abs, entry.name));
  }
  return found;
}

const files = SCAN_TARGETS.flatMap(walk);
const violations = [];

for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const haystack = line.toLowerCase();
    for (const [phrase, reason] of BANNED) {
      if (haystack.includes(phrase)) {
        violations.push({
          file: relative(ROOT, file).split(sep).join("/"),
          line: index + 1,
          phrase,
          reason,
          text: line.trim().slice(0, 120),
        });
      }
    }
  });
}

if (violations.length === 0) {
  console.log(
    `positioning guard: OK - ${files.length} files scanned, ${BANNED.length} retired phrases checked, 0 violations.`,
  );
  process.exit(0);
}

console.error(`\npositioning guard: FAILED - ${violations.length} violation(s).\n`);
console.error("Retired offer language must not ship. This is a Gate 4 stop condition.\n");
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}`);
  console.error(`    found : "${v.phrase}"`);
  console.error(`    why   : ${v.reason}`);
  console.error(`    line  : ${v.text}`);
  console.error("");
}
console.error(
  "Authority: Drive doc \"Strata - Current Product Direction & Delivery Model\",\n" +
    "section \"PRODUCT & COMMERCIAL UPDATE - 25 AUGUST 2026\".\n" +
    "If an offer has genuinely been reinstated, update scripts/check-positioning.mjs\n" +
    "in the same commit and record the decision in vault/engine/Decision Index.md.\n",
);
process.exit(1);
