import { createCrmAdapter, type CrmEnvironment } from "./crm-adapter.js";
import { CONTACT } from "../../config/contact.js";
import { validateLeadPayload } from "./lead-schema.js";
import type { LeadApiResponse } from "./types.js";

export type LeadHandlerResult = {
  status: number;
  body: LeadApiResponse;
};

export const handleLeadSubmission = async (
  payload: unknown,
  env: CrmEnvironment,
  sourcePage: string = CONTACT.requestDemoPath,
): Promise<LeadHandlerResult> => {
  const validation = validateLeadPayload(payload, { sourcePage });

  if (!validation.ok) {
    return {
      status: 400,
      body: {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Please check the required fields.",
        fieldErrors: validation.fieldErrors,
      },
    };
  }

  const adapter = createCrmAdapter(env);

  if (!adapter) {
    console.error("[crm] Lead storage is not configured.", {
      provider: env.CRM_PROVIDER || "",
      hasWebhookUrl: Boolean(env.CRM_WEBHOOK_URL),
      nodeEnv: env.NODE_ENV || "",
      vercelEnv: env.VERCEL_ENV || "",
      leadId: validation.lead.id,
    });

    return {
      status: 503,
      body: {
        ok: false,
        error: "CRM_NOT_CONFIGURED",
        message: "Lead storage is not configured yet.",
      },
    };
  }

  const result = await adapter.submitLead(validation.lead);

  if (!result.ok) {
    console.error("[crm] Lead submission failed.", {
      error: result.error,
      status: result.status,
      message: result.message,
      leadId: validation.lead.id,
    });

    return {
      status: 502,
      body: {
        ok: false,
        error: result.error,
        message: result.message,
      },
    };
  }

  return {
    status: 200,
    body: {
      ok: true,
      leadId: result.leadId,
      message: "Lead submitted successfully.",
    },
  };
};
