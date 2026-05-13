import { protectCrmRoute, sendError, sendSuccess } from "../../src/lib/crm/auth.js";
import { normalizeTeamUpdatePayload } from "../../src/lib/crm/api-validation.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { getSingleQueryParam, guardMethod, readJsonBody, type VercelRequest, type VercelResponse } from "./_utils.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET", "PATCH"])) {
    return sendError(response, 405, "Method not allowed.");
  }

  const auth = await protectCrmRoute(request, response, {
    adminOnly: request.method === "PATCH",
  });
  if (!auth.ok) return sendError(response, auth.status, auth.message);

  try {
    if (request.method === "GET") {
      const members = await CrmRepository.getTeamMembers();
      return sendSuccess(response, { members });
    }

    const id = getSingleQueryParam(request, "id");
    if (!id) return sendError(response, 400, "Team member ID is required.");
    if (id === auth.user.id) return sendError(response, 400, "You cannot change your own role or status here.");

    const body = await readJsonBody(request);
    if (!body.ok) return sendError(response, body.status, body.message);

    const validation = normalizeTeamUpdatePayload(body.data);
    if (!validation.ok) {
      return sendError(response, 400, "Please check the team member fields.", {
        fieldErrors: validation.fieldErrors,
      });
    }

    const member = await CrmRepository.updateTeamMember(id, validation.data);

    try {
      await CrmRepository.insertActivityLog({
        actorId: auth.user.id,
        actorEmail: auth.user.email,
        action: "team_member.updated",
        entityType: "crm_profile",
        entityId: member.id,
        metadata: { fields: Object.keys(validation.data) },
      });
    } catch (logError) {
      console.error("[api/crm/team] Failed to record team activity:", logError);
    }

    return sendSuccess(response, { member });
  } catch (error) {
    console.error("[api/crm/team] Error:", error);
    return sendError(response, 500, "Failed to process CRM team.");
  }
}
