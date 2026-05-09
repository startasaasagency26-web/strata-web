import type { CrmAdapter } from "../crm-adapter.js";
import type { CrmSubmitResult, Lead } from "../types.js";

export class ConsoleCrmAdapter implements CrmAdapter {
  async submitLead(lead: Lead): Promise<CrmSubmitResult> {
    console.info("[crm:console] Development lead received", {
      id: lead.id,
      createdAt: lead.createdAt,
      fullName: lead.fullName,
      companyName: lead.companyName,
      workEmail: lead.workEmail,
      sourcePage: lead.sourcePage,
    });

    return {
      ok: true,
      leadId: lead.id,
    };
  }
}
