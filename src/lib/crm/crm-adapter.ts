import { ConsoleCrmAdapter } from "./adapters/console-crm-adapter";
import { WebhookCrmAdapter } from "./adapters/webhook-crm-adapter";
import type { CrmSubmitResult, Lead } from "./types";

export type CrmEnvironment = {
  CRM_PROVIDER?: string;
  CRM_WEBHOOK_URL?: string;
  CRM_API_KEY?: string;
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

export interface CrmAdapter {
  submitLead(lead: Lead): Promise<CrmSubmitResult>;
}

export const createCrmAdapter = (env: CrmEnvironment): CrmAdapter | null => {
  const provider = env.CRM_PROVIDER?.trim().toLowerCase();
  const webhookUrl = env.CRM_WEBHOOK_URL?.trim();
  const isProduction = env.NODE_ENV === "production" || env.VERCEL_ENV === "production";

  if (webhookUrl) {
    return new WebhookCrmAdapter({
      webhookUrl,
      apiKey: env.CRM_API_KEY,
    });
  }

  if (provider === "webhook") {
    return null;
  }

  if (!isProduction) {
    return new ConsoleCrmAdapter();
  }

  return null;
};
