import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";

export default async function handler(request: any, response: any) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return;

  try {
    const metrics = await CrmRepository.getDashboardMetrics();
    sendSuccess(response, { metrics });
  } catch (error) {
    console.error("[api/crm/dashboard] Error:", error);
    sendError(response, 500, "Failed to load dashboard data.");
  }
}
