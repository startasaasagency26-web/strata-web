export type Lead = {
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  whatsappPhone: string;
  roleInBusiness: string;
  countryTimezone: string;
  preferredLanguage: string;
  businessType?: string;
  serviceNeed?: string;
  websiteUrl?: string;
  currentProblem?: string;
  projectGoal?: string;
  budgetRange?: string;
  selectedPackage?: string;
  timeline?: string;
  sourcePage?: string;
  consent?: boolean;
  marketingOptIn?: boolean;
  rawPayload: Record<string, unknown>;
};

export type LeadFieldErrors = Partial<Record<keyof Lead | "payload", string>>;

export type LeadValidationResult =
  | {
      ok: true;
      lead: Lead;
    }
  | {
      ok: false;
      fieldErrors: LeadFieldErrors;
    };

export type CrmSubmitResult =
  | {
      ok: true;
      leadId: string;
    }
  | {
      ok: false;
      error: "CRM_NOT_CONFIGURED" | "CRM_SUBMISSION_FAILED";
      message: string;
      status?: number;
    };

export type LeadApiSuccess = {
  ok: true;
  leadId: string;
  message: "Lead submitted successfully.";
};

export type LeadApiError = {
  ok: false;
  error: "VALIDATION_ERROR" | "CRM_NOT_CONFIGURED" | "CRM_SUBMISSION_FAILED" | "METHOD_NOT_ALLOWED" | "INVALID_JSON" | "PAYLOAD_TOO_LARGE" | "SUPABASE_INSERT_FAILED" | "INTERNAL_SERVER_ERROR";
  message: string;
  fieldErrors?: LeadFieldErrors;
};

export type LeadApiResponse = LeadApiSuccess | LeadApiError;
