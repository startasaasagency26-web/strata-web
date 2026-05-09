import type { CrmAdapter } from "../crm-adapter.js";
import type { CrmSubmitResult, Lead } from "../types.js";

type WebhookCrmAdapterOptions = {
  webhookUrl: string;
  apiKey?: string;
};

export class WebhookCrmAdapter implements CrmAdapter {
  private readonly webhookUrl: string;
  private readonly apiKey?: string;

  constructor(options: WebhookCrmAdapterOptions) {
    this.webhookUrl = options.webhookUrl;
    this.apiKey = options.apiKey;
  }

  async submitLead(lead: Lead): Promise<CrmSubmitResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify({ lead }),
      });

      if (!response.ok) {
        return {
          ok: false,
          error: "CRM_SUBMISSION_FAILED",
          message: "The configured CRM webhook rejected the lead.",
          status: response.status,
        };
      }

      return {
        ok: true,
        leadId: lead.id,
      };
    } catch {
      return {
        ok: false,
        error: "CRM_SUBMISSION_FAILED",
        message: "The configured CRM webhook could not be reached.",
      };
    }
  }
}
