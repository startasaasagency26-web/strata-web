import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_INPUT_DIR = "research-leads.local";

const STRATA_RECOMMENDED_OFFERS = new Set([
  "Revenue Infrastructure",
  "Growth Media System",
  "Full System Install",
  "System Care Plan",
]);

const SCORE_LIMITS = {
  demandSignal: 25,
  visibleSystemLeakage: 30,
  budgetRoiFit: 20,
  contactability: 15,
  strataProofRelevance: 10,
};

const trim = (value) => (typeof value === "string" ? value.trim() : "");

const isRecord = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const readNumber = (value) => {
  const parsed = typeof value === "number" ? value : Number.parseFloat(trim(value));
  return Number.isFinite(parsed) ? parsed : null;
};

const priorityFromScore = (total) => {
  if (total >= 75) return "hot";
  if (total >= 55) return "warm";
  return "cold";
};

const parseArgs = (argv) => {
  const options = {
    dryRun: true,
    baseUrl: process.env.STRATA_CRM_BASE_URL || "",
    token: process.env.STRATA_CRM_AUTH_TOKEN || "",
    paths: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--commit") {
      options.dryRun = false;
    } else if (arg === "--base-url") {
      options.baseUrl = trim(argv[index + 1]);
      index += 1;
    } else if (arg === "--token") {
      options.token = trim(argv[index + 1]);
      index += 1;
    } else {
      options.paths.push(arg);
    }
  }

  return options;
};

const expandInputPaths = async (inputs) => {
  const paths = inputs.length > 0 ? inputs : [path.join(DEFAULT_INPUT_DIR, "*.json")];
  const expanded = [];

  for (const input of paths) {
    if (!input.includes("*")) {
      expanded.push(input);
      continue;
    }

    const directory = path.dirname(input);
    const suffix = input.split("*").at(-1) || "";
    const entries = await readdir(directory);
    for (const entry of entries) {
      if (entry.endsWith(suffix)) expanded.push(path.join(directory, entry));
    }
  }

  return [...new Set(expanded)].sort();
};

const readLeadFile = async (filePath) => {
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const leads = Array.isArray(parsed) ? parsed : parsed.leads;
  if (!Array.isArray(leads)) {
    throw new Error(`${filePath} must contain an array or a { "leads": [] } object.`);
  }
  return leads.map((lead, index) => ({ lead, filePath, index }));
};

const normalizeScore = (rawScore, errors) => {
  if (!isRecord(rawScore)) {
    errors.push("research.score is required.");
    return null;
  }

  const score = {};
  let total = 0;

  for (const [key, max] of Object.entries(SCORE_LIMITS)) {
    const value = readNumber(rawScore[key]);
    if (value === null) {
      errors.push(`research.score.${key} is required.`);
      score[key] = 0;
      continue;
    }

    if (value < 0 || value > max) {
      errors.push(`research.score.${key} must be between 0 and ${max}.`);
    }

    const normalized = Math.max(0, Math.min(max, Math.round(value)));
    score[key] = normalized;
    total += normalized;
  }

  score.total = Math.max(0, Math.min(100, Math.round(total)));
  return score;
};

const normalizeResearch = (raw, errors) => {
  const rawResearch = isRecord(raw.research) ? raw.research : raw;
  const sourceUrls = Array.isArray(rawResearch.sourceUrls)
    ? rawResearch.sourceUrls.map(trim).filter(Boolean)
    : [];

  if (sourceUrls.length === 0) {
    errors.push("research.sourceUrls must include at least one public source URL.");
  }
  for (const url of sourceUrls) {
    if (!isValidUrl(url)) errors.push(`Invalid public source URL: ${url}`);
  }

  const visibleGap = trim(rawResearch.visibleGap);
  const recommendedOffer = trim(rawResearch.recommendedOffer);
  const outreachAngle = trim(rawResearch.outreachAngle);
  const nextAction = trim(rawResearch.nextAction);
  const score = normalizeScore(rawResearch.score, errors);

  if (!visibleGap) errors.push("research.visibleGap is required.");
  if (!STRATA_RECOMMENDED_OFFERS.has(recommendedOffer)) {
    errors.push("research.recommendedOffer must be an active Strata offer.");
  }
  if (!outreachAngle) errors.push("research.outreachAngle is required.");
  if (!nextAction) errors.push("research.nextAction is required.");

  return {
    researchedAt: trim(rawResearch.researchedAt) || new Date().toISOString().slice(0, 10),
    researcher: trim(rawResearch.researcher) || "Strata Research Sprint",
    sourceUrls,
    evidenceSummary: trim(rawResearch.evidenceSummary),
    visibleGap,
    recommendedOffer,
    outreachAngle,
    nextAction,
    score: score || {
      demandSignal: 0,
      visibleSystemLeakage: 0,
      budgetRoiFit: 0,
      contactability: 0,
      strataProofRelevance: 0,
      total: 0,
    },
  };
};

const buildResearchNote = (lead, research) => {
  const lines = [
    "Research sprint note",
    `Score: ${research.score.total} (${priorityFromScore(research.score.total).toUpperCase()})`,
    `Recommended offer: ${research.recommendedOffer}`,
    `Visible gap: ${research.visibleGap}`,
    `Outreach angle: ${research.outreachAngle}`,
    `Next action: ${research.nextAction}`,
  ];

  if (research.evidenceSummary) lines.push(`Evidence summary: ${research.evidenceSummary}`);
  lines.push("Sources:");
  for (const sourceUrl of research.sourceUrls) lines.push(`- ${sourceUrl}`);
  if (lead.notes) lines.push(`Research notes: ${lead.notes}`);

  return lines.join("\n");
};

const buildFollowUpDueAt = (rawLead) => {
  const explicitDueAt = trim(rawLead.followUpDueAt);
  if (explicitDueAt && Number.isFinite(Date.parse(explicitDueAt))) return explicitDueAt;

  const due = new Date();
  due.setDate(due.getDate() + 1);
  due.setHours(9, 0, 0, 0);
  return due.toISOString();
};

const normalizeLead = ({ lead: rawLead, filePath, index }) => {
  const errors = [];
  if (!isRecord(rawLead)) {
    return { ok: false, filePath, index, errors: ["Lead entry must be an object."] };
  }

  const fullName = trim(rawLead.fullName);
  const companyName = trim(rawLead.companyName);
  if (!fullName) errors.push("fullName is required.");
  if (!companyName) errors.push("companyName is required.");

  const research = normalizeResearch(rawLead, errors);
  const priority = priorityFromScore(research.score.total);

  if (errors.length > 0) {
    return { ok: false, filePath, index, companyName, errors };
  }

  const leadPayload = {
    fullName,
    companyName,
    workEmail: trim(rawLead.workEmail),
    whatsappPhone: trim(rawLead.whatsappPhone),
    roleInBusiness: trim(rawLead.roleInBusiness) || "Owner / Decision Maker",
    countryTimezone: trim(rawLead.countryTimezone) || "Malaysia / GMT+8",
    preferredLanguage: trim(rawLead.preferredLanguage) || "English",
    businessType: trim(rawLead.businessType) || "Service business",
    serviceNeed: trim(rawLead.serviceNeed) || research.recommendedOffer,
    websiteUrl: trim(rawLead.websiteUrl),
    currentProblem: trim(rawLead.currentProblem) || research.visibleGap,
    projectGoal: trim(rawLead.projectGoal),
    budgetRange: trim(rawLead.budgetRange) || "Not verified",
    selectedPackage: trim(rawLead.selectedPackage) || research.recommendedOffer,
    timeline: trim(rawLead.timeline) || "Research outreach",
    sourcePage: research.sourceUrls[0],
    status: "new",
    priority,
    research,
  };

  return {
    ok: true,
    filePath,
    index,
    companyName,
    priority,
    score: research.score.total,
    leadPayload,
    notePayload: {
      note: buildResearchNote(rawLead, research),
      noteType: "system",
    },
    followUpPayload: {
      title: `Research outreach: ${companyName}`,
      dueAt: buildFollowUpDueAt(rawLead),
      contactMethod: trim(rawLead.whatsappPhone) ? "whatsapp" : trim(rawLead.workEmail) ? "email" : "call",
      notes: research.nextAction,
    },
  };
};

const postJson = async (baseUrl, token, endpoint, payload) => {
  const response = await fetch(new URL(endpoint, baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `Request failed for ${endpoint} (${response.status}).`);
  }
  return data;
};

const importLead = async (normalized, options) => {
  const leadResponse = await postJson(options.baseUrl, options.token, "/api/crm/leads", normalized.leadPayload);
  const leadId = leadResponse.lead?.id;
  if (!leadId) throw new Error("Lead created but API did not return lead.id.");

  await postJson(options.baseUrl, options.token, "/api/crm/notes", {
    leadId,
    ...normalized.notePayload,
  });

  await postJson(options.baseUrl, options.token, "/api/crm/follow-ups", {
    leadId,
    ...normalized.followUpPayload,
  });

  return leadId;
};

const main = async () => {
  const options = parseArgs(process.argv.slice(2));
  if (!options.dryRun && (!options.baseUrl || !options.token)) {
    throw new Error("Commit mode requires STRATA_CRM_BASE_URL and STRATA_CRM_AUTH_TOKEN, or --base-url and --token.");
  }

  const inputPaths = await expandInputPaths(options.paths);
  if (inputPaths.length === 0) throw new Error(`No JSON files found in ${DEFAULT_INPUT_DIR}.`);

  const rawEntries = [];
  for (const inputPath of inputPaths) {
    rawEntries.push(...await readLeadFile(inputPath));
  }

  const normalized = rawEntries.map(normalizeLead);
  const valid = normalized.filter((entry) => entry.ok);
  const skipped = normalized.filter((entry) => !entry.ok);
  const imported = [];

  if (!options.dryRun) {
    for (const entry of valid) {
      const leadId = await importLead(entry, options);
      imported.push({ companyName: entry.companyName, leadId });
    }
  }

  const report = {
    mode: options.dryRun ? "dry-run" : "commit",
    files: inputPaths,
    totalEntries: rawEntries.length,
    validLeads: valid.length,
    skippedLeads: skipped.length,
    importedLeads: imported.length,
    validPreview: valid.map((entry) => ({
      companyName: entry.companyName,
      score: entry.score,
      priority: entry.priority,
      recommendedOffer: entry.leadPayload.research.recommendedOffer,
      sourcePage: entry.leadPayload.sourcePage,
      willCreateResearchNote: true,
      willCreateFirstFollowUp: true,
    })),
    skipped: skipped.map((entry) => ({
      filePath: entry.filePath,
      index: entry.index,
      companyName: entry.companyName || null,
      errors: entry.errors,
    })),
    imported,
  };

  console.log(JSON.stringify(report, null, 2));
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
