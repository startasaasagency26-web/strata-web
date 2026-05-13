import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import {
  normalizeFollowUpCreatePayload,
  normalizeFollowUpUpdatePayload
} from "../../src/lib/crm/api-validation.js";
import { getSingleQueryParam, guardMethod, readJsonBody, type VercelRequest, type VercelResponse } from "./_utils.js";
import { URL } from "node:url";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET", "POST", "PATCH"])) {
    return sendError(response, 405, "Method not allowed.");
  }

  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

  const url = new URL(request.url || "", `http://${request.headers.host}`);
  const leadId = url.searchParams.get("leadId");
  const status = url.searchParams.get("status");

  try {
    if (request.method === "GET") {
      const followUps = await CrmRepository.getFollowUps({
        leadId: leadId || undefined,
        status: status || undefined
      });
      sendSuccess(response, { followUps });
    } 
    else if (request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.ok) return sendError(response, body.status, body.message);

      const validation = normalizeFollowUpCreatePayload(body.data);
      if (!validation.ok) {
        return sendError(response, 400, "Please check the follow-up fields.", {
          fieldErrors: validation.fieldErrors
        });
      }

      const followUp = await CrmRepository.insertFollowUp(validation.data.leadId, validation.data);

      try {
        await CrmRepository.insertActivityLog({
          actorId: auth.user.id,
          actorEmail: auth.user.email,
          action: "follow_up.created",
          entityType: "follow_up",
          entityId: followUp.id,
          metadata: { leadId: validation.data.leadId }
        });
      } catch (logError) {
        console.error("[api/crm/follow-ups] Failed to record follow-up activity:", logError);
      }

      sendSuccess(response, { followUp });
    } 
    else if (request.method === "PATCH") {
      const id = getSingleQueryParam(request, "id");
      if (!id) return sendError(response, 400, "ID is required for update.");

      const body = await readJsonBody(request);
      if (!body.ok) return sendError(response, body.status, body.message);

      const validation = normalizeFollowUpUpdatePayload(body.data);
      if (!validation.ok) {
        return sendError(response, 400, "Please check the follow-up fields.", {
          fieldErrors: validation.fieldErrors
        });
      }

      const updated = await CrmRepository.updateFollowUp(id, validation.data);

      if (validation.data.status === "completed") {
        try {
          await CrmRepository.insertActivityLog({
            actorId: auth.user.id,
            actorEmail: auth.user.email,
            action: "follow_up.completed",
            entityType: "follow_up",
            entityId: id,
            metadata: { completedAt: validation.data.completedAt }
          });
        } catch (logError) {
          console.error("[api/crm/follow-ups] Failed to record follow-up completion:", logError);
        }
      }

      sendSuccess(response, { followUp: updated });
    }
  } catch (error) {
    console.error("[api/crm/follow-ups] Error:", error);
    sendError(response, 500, "Failed to process follow-ups.");
  }
}
