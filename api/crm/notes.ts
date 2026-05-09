import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { URL } from "node:url";

const readBody = async (request: any) => {
  return new Promise<string>((resolve) => {
    let body = "";
    request.on("data", (chunk: any) => body += chunk.toString());
    request.on("end", () => resolve(body));
  });
};

export default async function handler(request: any, response: any) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return;

  const url = new URL(request.url || "", `http://${request.headers.host}`);
  const leadId = url.searchParams.get("leadId");

  if (!leadId && request.method === "GET") {
    return sendError(response, 400, "leadId is required.");
  }

  try {
    if (request.method === "GET") {
      const notes = await CrmRepository.getLeadNotes(leadId!);
      sendSuccess(response, { notes });
    } 
    else if (request.method === "POST") {
      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody);
      
      if (!payload.leadId || !payload.note) {
        return sendError(response, 400, "leadId and note are required.");
      }

      const note = await CrmRepository.insertNote(payload.leadId, {
        note: payload.note,
        noteType: payload.noteType,
        createdBy: auth.ok ? auth.user.email : 'system'
      });
      
      sendSuccess(response, { note });
    } 
    else {
      sendError(response, 405, "Method not allowed.");
    }
  } catch (error) {
    console.error("[api/crm/notes] Error:", error);
    sendError(response, 500, "Failed to process notes.");
  }
}
