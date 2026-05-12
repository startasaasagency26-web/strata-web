import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { URL } from "node:url";

const MAX_BODY_BYTES = 10 * 1024;

const readBody = async (request: any) => {
  return new Promise<string>((resolve, reject) => {
    let body = "";
    let size = 0;

    request.on("data", (chunk: Buffer) => {
      size += chunk.length;

      if (size > MAX_BODY_BYTES) {
        reject(new Error("PAYLOAD_TOO_LARGE"));
        request.destroy();
        return;
      }

      body += chunk.toString("utf8");
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
};

export default async function handler(request: any, response: any) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

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
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      return sendError(response, 413, "The submitted payload is too large.");
    }

    console.error("[api/crm/notes] Error:", error);
    sendError(response, 500, "Failed to process notes.");
  }
}
