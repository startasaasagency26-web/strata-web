import type { IncomingMessage, ServerResponse } from "node:http";
import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth";
import { CrmRepository } from "../../src/lib/crm/repository";
import { URL } from "node:url";

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
      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody);
      
      if (!payload.leadId || !payload.dueAt || !payload.title) {
        return sendError(response, 400, "leadId, dueAt, and title are required.");
      }

      const followUp = await CrmRepository.insertFollowUp(payload.leadId, payload);
      sendSuccess(response, { followUp });
    } 
    else if (request.method === "PATCH") {
      const { id } = (request as any).query || {};
      if (!id) return sendError(response, 400, "ID is required for update.");

      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody);
      const updated = await CrmRepository.updateFollowUp(id, payload);
      sendSuccess(response, { followUp: updated });
    }
    else {
      sendError(response, 405, "Method not allowed.");
    }
  } catch (error) {
    console.error("[api/crm/follow-ups] Error:", error);
    sendError(response, 500, "Failed to process follow-ups.");
  }
}
