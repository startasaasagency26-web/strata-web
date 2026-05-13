import type {
  FollowUpStatus,
  CrmRole,
  CrmUserProfile,
  LeadNoteType,
  LeadPriority,
  LeadStatus,
} from "../../types/crm.js";
import { normalizePhone } from "./lead-schema.js";

type FieldErrors = Record<string, string>;

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; fieldErrors: FieldErrors };

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "discovery_scheduled",
  "proposal_sent",
  "negotiating",
  "won",
  "lost",
  "unresponsive",
];

export const LEAD_PRIORITIES: LeadPriority[] = ["hot", "warm", "cold"];
export const NOTE_TYPES: LeadNoteType[] = ["general", "call", "whatsapp", "email", "follow_up", "system"];
export const FOLLOW_UP_STATUSES: FollowUpStatus[] = ["pending", "completed", "cancelled", "overdue"];
export const CONTACT_METHODS = ["whatsapp", "email", "call"] as const;
export const CRM_ROLES: CrmRole[] = ["admin", "manager"];
export const CRM_USER_STATUSES: CrmUserProfile["status"][] = ["active", "invited", "disabled"];

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type ManualLeadInsertPayload = {
  full_name: string;
  company_name: string;
  work_email: string;
  whatsapp_phone: string;
  role_in_business: string;
  country_timezone: string;
  preferred_language: string;
  business_type: string;
  service_need: string;
  website_url?: string;
  current_problem?: string;
  project_goal?: string;
  budget_range: string;
  selected_package?: string;
  timeline: string;
  source_page: string;
  status: LeadStatus;
  priority: LeadPriority;
  consent: boolean;
  marketing_opt_in: boolean;
  raw_payload: Record<string, unknown>;
};

export type LeadUpdatePayload = Partial<{
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string | null;
  lastContactedAt: string;
  nextFollowUpAt: string | null;
}>;

export type FollowUpCreatePayload = {
  leadId: string;
  title: string;
  dueAt: string;
  contactMethod: ContactMethod;
  notes?: string;
  assignedTo?: string | null;
};

export type FollowUpUpdatePayload = Partial<{
  status: FollowUpStatus;
  completedAt: string;
  dueAt: string;
  notes: string;
  assignedTo: string | null;
}>;

export type NoteCreatePayload = {
  leadId: string;
  note: string;
  noteType: LeadNoteType;
};

export type SettingsUpdatePayload = Partial<{
  contactEmail: string;
  whatsappNumber: string;
  isConfigured: boolean;
}>;

export type TeamUpdatePayload = Partial<{
  role: CrmRole;
  status: CrmUserProfile["status"];
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

const trimString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const optionalTrimmedString = (value: unknown) => {
  const trimmed = trimString(value);
  return trimmed || undefined;
};

const isIsoDate = (value: string) => {
  const time = Date.parse(value);
  return Number.isFinite(time);
};

const isValidUuid = (value: string) => uuidPattern.test(value);

const pushError = (fieldErrors: FieldErrors, key: string, message: string) => {
  fieldErrors[key] = message;
};

const validatePayloadShape = (payload: unknown): ValidationResult<Record<string, unknown>> => {
  if (!isRecord(payload)) {
    return { ok: false, fieldErrors: { payload: "Submit a valid JSON object." } };
  }

  return { ok: true, data: payload };
};

export const normalizeManualLeadPayload = (
  payload: unknown,
): ValidationResult<ManualLeadInsertPayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const fullName = trimString(rawPayload.fullName);
  const companyName = trimString(rawPayload.companyName) || "Independent";
  const workEmail = trimString(rawPayload.workEmail).toLowerCase();
  const whatsappPhone = normalizePhone(rawPayload.whatsappPhone);

  if (!fullName) pushError(fieldErrors, "fullName", "Full name is required.");
  if (workEmail && !emailPattern.test(workEmail)) {
    pushError(fieldErrors, "workEmail", "Enter a valid email address.");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      full_name: fullName,
      company_name: companyName,
      work_email: workEmail,
      whatsapp_phone: whatsappPhone,
      role_in_business: "Unknown",
      country_timezone: "Malaysia",
      preferred_language: "English",
      business_type: "Manual CRM Entry",
      service_need: "Not specified",
      budget_range: "Not specified",
      timeline: "Not specified",
      source_page: "Internal CRM",
      status: "new",
      priority: "warm",
      consent: false,
      marketing_opt_in: false,
      raw_payload: {
        origin: "internal_crm_manual_entry",
        submittedFields: {
          fullName,
          companyName,
          workEmail: workEmail || null,
          whatsappPhone: whatsappPhone || null,
        },
      },
    },
  };
};

export const normalizeLeadUpdatePayload = (
  payload: unknown,
): ValidationResult<LeadUpdatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const data: LeadUpdatePayload = {};

  if ("status" in rawPayload) {
    const status = trimString(rawPayload.status) as LeadStatus;
    if (!LEAD_STATUSES.includes(status)) {
      pushError(fieldErrors, "status", "Choose a valid lead status.");
    } else {
      data.status = status;
    }
  }

  if ("priority" in rawPayload) {
    const priority = trimString(rawPayload.priority) as LeadPriority;
    if (!LEAD_PRIORITIES.includes(priority)) {
      pushError(fieldErrors, "priority", "Choose a valid lead priority.");
    } else {
      data.priority = priority;
    }
  }

  if ("assignedTo" in rawPayload) {
    const assignedTo = rawPayload.assignedTo === null ? "" : trimString(rawPayload.assignedTo);
    if (assignedTo && !isValidUuid(assignedTo)) {
      pushError(fieldErrors, "assignedTo", "Choose a valid assignee.");
    } else {
      data.assignedTo = assignedTo || null;
    }
  }

  if ("lastContactedAt" in rawPayload) {
    const lastContactedAt = trimString(rawPayload.lastContactedAt);
    if (!lastContactedAt || !isIsoDate(lastContactedAt)) {
      pushError(fieldErrors, "lastContactedAt", "Enter a valid contact timestamp.");
    } else {
      data.lastContactedAt = lastContactedAt;
    }
  }

  if ("nextFollowUpAt" in rawPayload) {
    const nextFollowUpAt = rawPayload.nextFollowUpAt === null ? "" : trimString(rawPayload.nextFollowUpAt);
    if (nextFollowUpAt && !isIsoDate(nextFollowUpAt)) {
      pushError(fieldErrors, "nextFollowUpAt", "Enter a valid follow-up timestamp.");
    } else {
      data.nextFollowUpAt = nextFollowUpAt || null;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, fieldErrors: { payload: "No supported lead fields were provided." } };
  }

  return { ok: true, data };
};

export const normalizeNoteCreatePayload = (
  payload: unknown,
): ValidationResult<NoteCreatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const leadId = trimString(rawPayload.leadId);
  const note = trimString(rawPayload.note);
  const noteType = (optionalTrimmedString(rawPayload.noteType) || "general") as LeadNoteType;

  if (!leadId || !isValidUuid(leadId)) pushError(fieldErrors, "leadId", "Choose a valid lead.");
  if (!note) pushError(fieldErrors, "note", "Note is required.");
  if (!NOTE_TYPES.includes(noteType)) pushError(fieldErrors, "noteType", "Choose a valid note type.");

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { leadId, note, noteType } };
};

export const normalizeFollowUpCreatePayload = (
  payload: unknown,
): ValidationResult<FollowUpCreatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const leadId = trimString(rawPayload.leadId);
  const title = trimString(rawPayload.title);
  const dueAt = trimString(rawPayload.dueAt);
  const contactMethod = (optionalTrimmedString(rawPayload.contactMethod) || "whatsapp") as ContactMethod;
  const notes = optionalTrimmedString(rawPayload.notes);
  const assignedTo = rawPayload.assignedTo === null ? "" : optionalTrimmedString(rawPayload.assignedTo);

  if (!leadId || !isValidUuid(leadId)) pushError(fieldErrors, "leadId", "Choose a valid lead.");
  if (!title) pushError(fieldErrors, "title", "Title is required.");
  if (!dueAt || !isIsoDate(dueAt)) pushError(fieldErrors, "dueAt", "Choose a valid due date and time.");
  if (!CONTACT_METHODS.includes(contactMethod)) pushError(fieldErrors, "contactMethod", "Choose a valid contact method.");
  if (assignedTo && !isValidUuid(assignedTo)) pushError(fieldErrors, "assignedTo", "Choose a valid assignee.");

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      leadId,
      title,
      dueAt,
      contactMethod,
      ...(notes ? { notes } : {}),
      ...(assignedTo ? { assignedTo } : {}),
    },
  };
};

export const normalizeFollowUpUpdatePayload = (
  payload: unknown,
): ValidationResult<FollowUpUpdatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const data: FollowUpUpdatePayload = {};

  if ("status" in rawPayload) {
    const status = trimString(rawPayload.status) as FollowUpStatus;
    if (!FOLLOW_UP_STATUSES.includes(status)) {
      pushError(fieldErrors, "status", "Choose a valid follow-up status.");
    } else {
      data.status = status;
    }
  }

  if ("completedAt" in rawPayload) {
    const completedAt = trimString(rawPayload.completedAt);
    if (!completedAt || !isIsoDate(completedAt)) {
      pushError(fieldErrors, "completedAt", "Enter a valid completion timestamp.");
    } else {
      data.completedAt = completedAt;
    }
  }

  if ("dueAt" in rawPayload) {
    const dueAt = trimString(rawPayload.dueAt);
    if (!dueAt || !isIsoDate(dueAt)) {
      pushError(fieldErrors, "dueAt", "Enter a valid due timestamp.");
    } else {
      data.dueAt = dueAt;
    }
  }

  if ("notes" in rawPayload) {
    data.notes = trimString(rawPayload.notes);
  }

  if ("assignedTo" in rawPayload) {
    const assignedTo = rawPayload.assignedTo === null ? "" : trimString(rawPayload.assignedTo);
    if (assignedTo && !isValidUuid(assignedTo)) {
      pushError(fieldErrors, "assignedTo", "Choose a valid assignee.");
    } else {
      data.assignedTo = assignedTo || null;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, fieldErrors: { payload: "No supported follow-up fields were provided." } };
  }

  return { ok: true, data };
};

export const normalizeSettingsUpdatePayload = (
  payload: unknown,
): ValidationResult<SettingsUpdatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const data: SettingsUpdatePayload = {};

  if ("contactEmail" in rawPayload) {
    const contactEmail = trimString(rawPayload.contactEmail).toLowerCase();
    if (contactEmail && !emailPattern.test(contactEmail)) {
      pushError(fieldErrors, "contactEmail", "Enter a valid system email.");
    } else {
      data.contactEmail = contactEmail;
    }
  }

  if ("whatsappNumber" in rawPayload) {
    data.whatsappNumber = normalizePhone(rawPayload.whatsappNumber);
  }

  if ("isConfigured" in rawPayload) {
    if (typeof rawPayload.isConfigured !== "boolean") {
      pushError(fieldErrors, "isConfigured", "Choose a valid configuration status.");
    } else {
      data.isConfigured = rawPayload.isConfigured;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, fieldErrors: { payload: "No supported settings fields were provided." } };
  }

  return { ok: true, data };
};

export const normalizeTeamUpdatePayload = (
  payload: unknown,
): ValidationResult<TeamUpdatePayload> => {
  const shape = validatePayloadShape(payload);
  if (!shape.ok) return shape;
  const rawPayload = shape.data;

  const fieldErrors: FieldErrors = {};
  const data: TeamUpdatePayload = {};

  if ("role" in rawPayload) {
    const role = trimString(rawPayload.role) as CrmRole;
    if (!CRM_ROLES.includes(role)) {
      pushError(fieldErrors, "role", "Choose a valid CRM role.");
    } else {
      data.role = role;
    }
  }

  if ("status" in rawPayload) {
    const status = trimString(rawPayload.status) as CrmUserProfile["status"];
    if (!CRM_USER_STATUSES.includes(status)) {
      pushError(fieldErrors, "status", "Choose a valid team status.");
    } else {
      data.status = status;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, fieldErrors: { payload: "No supported team fields were provided." } };
  }

  return { ok: true, data };
};
