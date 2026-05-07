import type { IncomingMessage, ServerResponse } from "node:http";
import { protectCrmRoute, sendSuccess, sendError } from "../../../src/lib/crm/auth";
import { CrmRepository } from "../../../src/lib/crm/repository";

const readBody = async (request: IncomingMessage) => {
  return new Promise<string>((resolve) => {
    let body = "";
    request.on("data", chunk => body += chunk.toString());
    request.on("end", () => resolve(body));
  });
};

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return;

  // Extract ID from query (Vercel provides this)
  const { id } = (request as any).query || {};
  
  if (!id) return sendError(response, 400, "Lead ID is required.");

  try {
    if (request.method === "GET") {
      const lead = await CrmRepository.getLeadById(id);
      if (!lead) return sendError(response, 404, "Lead not found.");
      sendSuccess(response, { lead });
    } 
    else if (request.method === "PATCH") {
      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody);
      const updatedLead = await CrmRepository.updateLead(id, payload);
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
