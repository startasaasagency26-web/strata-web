import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { normalizeNoteCreatePayload } from "../../src/lib/crm/api-validation.js";
import { guardMethod, readJsonBody, type VercelRequest, type VercelResponse } from "./_utils.js";
import { URL } from "node:url";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (!guardMethod(request, response, ["GET", "POST"])) {
    return sendError(response, 405, "Method not allowed.");
  }

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
      const body = await readJsonBody(request, 10 * 1024);
      if (!body.ok) return sendError(response, body.status, body.message);

      const validation = normalizeNoteCreatePayload(body.data);
      if (!validation.ok) {
        return sendError(response, 400, "Please check the note fields.", {
          fieldErrors: validation.fieldErrors
        });
      }

      const note = await CrmRepository.insertNote(validation.data.leadId, {
        note: validation.data.note,
        noteType: validation.data.noteType,
        createdBy: auth.user.email || auth.user.id
      });

      try {
        await CrmRepository.insertActivityLog({
          actorId: auth.user.id,
          actorEmail: auth.user.email,
          action: "lead.note_created",
          entityType: "lead",
          entityId: validation.data.leadId,
          metadata: { noteType: validation.data.noteType }
        });
      } catch (logError) {
        console.error("[api/crm/notes] Failed to record note activity:", logError);
      }
      
      sendSuccess(response, { note });
    }
  } catch (error) {
    console.error("[api/crm/notes] Error:", error);
    sendError(response, 500, "Failed to process notes.");
  }
}
