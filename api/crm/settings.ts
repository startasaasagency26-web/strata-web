import { protectCrmRoute, sendError, sendSuccess } from "../../src/lib/crm/auth.js";
import { normalizeSettingsUpdatePayload } from "../../src/lib/crm/api-validation.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { guardMethod, readJsonBody, type VercelRequest, type VercelResponse } from "./_utils.js";

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
      const settings = await CrmRepository.getSettings();
      return sendSuccess(response, { settings });
    }

    const body = await readJsonBody(request);
    if (!body.ok) return sendError(response, body.status, body.message);

    const validation = normalizeSettingsUpdatePayload(body.data);
    if (!validation.ok) {
      return sendError(response, 400, "Please check the settings fields.", {
        fieldErrors: validation.fieldErrors,
      });
    }

    const settings = await CrmRepository.updateSettings(validation.data);

    try {
      await CrmRepository.insertActivityLog({
        actorId: auth.user.id,
        actorEmail: auth.user.email,
        action: "settings.updated",
        entityType: "crm_settings",
        metadata: { fields: Object.keys(validation.data) },
      });
    } catch (logError) {
      console.error("[api/crm/settings] Failed to record settings activity:", logError);
    }

    return sendSuccess(response, { settings });
  } catch (error) {
    console.error("[api/crm/settings] Error:", error);
    return sendError(response, 500, "Failed to process CRM settings.");
  }
}
