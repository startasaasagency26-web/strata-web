import { protectCrmRoute, sendSuccess, sendError } from "../../../src/lib/crm/auth.js";
import { CrmRepository } from "../../../src/lib/crm/repository.js";
import { normalizeLeadUpdatePayload } from "../../../src/lib/crm/api-validation.js";
import { getSingleQueryParam, guardMethod, readJsonBody, type VercelRequest, type VercelResponse } from "../_utils.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET", "PATCH"])) {
    return sendError(response, 405, "Method not allowed.");
  }

  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

  const id = getSingleQueryParam(request, "id");
  
  if (!id) return sendError(response, 400, "Lead ID is required.");

  try {
    if (request.method === "GET") {
      const lead = await CrmRepository.getLeadById(id);
      if (!lead) return sendError(response, 404, "Lead not found.");
      sendSuccess(response, { lead });
    } 
    else if (request.method === "PATCH") {
      const body = await readJsonBody(request);
      if (!body.ok) return sendError(response, body.status, body.message);

      const validation = normalizeLeadUpdatePayload(body.data);
      if (!validation.ok) {
        return sendError(response, 400, "Please check the lead fields.", {
          fieldErrors: validation.fieldErrors
        });
      }

      const payload = validation.data;
      const hasStatusChange = Object.prototype.hasOwnProperty.call(payload, "status");
      const currentLead = await CrmRepository.getLeadById(id);

      if (!currentLead) {
        return sendError(response, 404, "Lead not found.");
      }

      const updatedLead = await CrmRepository.updateLead(id, payload);

      if (hasStatusChange && currentLead.status !== payload.status) {
        const nextStatus = payload.status;
        if (!nextStatus) {
          return sendError(response, 400, "Lead status is required.");
        }

        try {
          await CrmRepository.insertStatusHistory(
            id,
            currentLead.status,
            nextStatus,
            auth.user.id
          );
          await CrmRepository.insertActivityLog({
            actorId: auth.user.id,
            actorEmail: auth.user.email,
            action: 'lead.status_changed',
            entityType: 'lead',
            entityId: id,
            metadata: { from: currentLead.status, to: nextStatus }
          });
        } catch (logError) {
          console.error(`[api/crm/leads/${id}] Failed to record status activity:`, logError);
        }
      }

      sendSuccess(response, { lead: updatedLead });
    } 
    else {
      sendError(response, 405, "Method not allowed.");
    }
  } catch (error) {
    console.error(`[api/crm/leads/${id}] Error:`, error);
    sendError(response, 500, "Failed to process lead.");
  }
}
