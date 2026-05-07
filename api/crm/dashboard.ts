import type { IncomingMessage, ServerResponse } from "node:http";
import { protectCrmRoute, sendSuccess, sendError } from "../../../src/lib/crm/auth";
import { CrmRepository } from "../../../src/lib/crm/repository";

export default async function handler(request: IncomingMessage, response: ServerResponse) {
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
