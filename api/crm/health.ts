import { validateEnv } from "../../src/lib/env.js";
import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { guardMethod, type VercelRequest, type VercelResponse } from "./_utils.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET"])) {
    return sendError(response, 405, "Method not allowed.");
  }

  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

  try {
    validateEnv();
    const results = await CrmRepository.getHealthStatus();
    sendSuccess(response, results);
  } catch (error) {
    console.error("[api/crm/health] Error:", error);
    sendError(response, 500, "CRM health check failed.");
  }
}
