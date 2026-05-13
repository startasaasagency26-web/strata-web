import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { normalizeManualLeadPayload } from "../../src/lib/crm/api-validation.js";
import { guardMethod, parsePositiveInteger, parseSort, readJsonBody, type VercelRequest, type VercelResponse } from "./_utils.js";
import { URL } from "node:url";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET", "POST"])) {
    return sendError(response, 405, "Method not allowed.");
  }

  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

  const url = new URL(request.url || "", `http://${request.headers.host}`);
  const params = url.searchParams;

  try {
    if (request.method === "GET") {
      const result = await CrmRepository.getLeads({
        page: parsePositiveInteger(params.get("page"), 1, 500),
        limit: parsePositiveInteger(params.get("limit"), 20, 100),
        search: (params.get("search") || "").slice(0, 120) || undefined,
        status: params.get("status") || undefined,
        priority: params.get("priority") || undefined,
        assignedTo: params.get("assignedTo") || undefined,
        sort: parseSort(params.get("sort"))
      });
      
      sendSuccess(response, result);
    } else if (request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.ok) return sendError(response, body.status, body.message);

      const validation = normalizeManualLeadPayload(body.data);
      if (!validation.ok) {
        return sendError(response, 400, "Please check the lead fields.", {
          fieldErrors: validation.fieldErrors
        });
      }

      const lead = await CrmRepository.insertLead(validation.data);

      try {
        await CrmRepository.insertActivityLog({
          actorId: auth.user.id,
          actorEmail: auth.user.email,
          action: "lead.created",
          entityType: "lead",
          entityId: lead.id,
          metadata: { source: "internal_crm" }
        });
      } catch (logError) {
        console.error("[api/crm/leads] Failed to record lead creation activity:", logError);
      }

      sendSuccess(response, { lead }, 201);
    }
  } catch (error) {
    console.error("[api/crm/leads] Error:", error);
    sendError(response, 500, "Failed to process leads.");
  }
}
