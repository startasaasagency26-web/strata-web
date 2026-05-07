import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth";
import { CrmRepository } from "../../src/lib/crm/repository";
import { URL } from "node:url";

export default async function handler(request: any, response: any) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return;

  const url = new URL(request.url || "", `http://${request.headers.host}`);
  const params = url.searchParams;

  try {
    if (request.method === "GET") {
      const result = await CrmRepository.getLeads({
        page: parseInt(params.get("page") || "1"),
        limit: parseInt(params.get("limit") || "20"),
        search: params.get("search") || undefined,
        status: params.get("status") || undefined,
        priority: params.get("priority") || undefined,
        assignedTo: params.get("assignedTo") || undefined,
        sort: (params.get("sort") as any) || "newest"
      });
      
      sendSuccess(response, result);
    } else {
      sendError(response, 405, "Method not allowed.");
    }
  } catch (error) {
    console.error("[api/crm/leads] Error:", error);
    sendError(response, 500, "Failed to load leads.");
  }
}
