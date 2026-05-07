import type { IncomingMessage, ServerResponse } from "node:http";
import { CONTACT } from "../src/config/contact";
import { handleLeadSubmission } from "../src/lib/crm/lead-handler";
import type { LeadApiResponse } from "../src/lib/crm/types";

const MAX_BODY_BYTES = 64 * 1024;

const sendJson = (response: ServerResponse, status: number, body: LeadApiResponse) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
};

const readBody = async (request: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
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

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, {
      ok: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use POST to submit a lead.",
    });
    return;
  }

  try {
    const rawBody = await readBody(request);
    let payload: unknown;

    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      sendJson(response, 400, {
        ok: false,
        error: "INVALID_JSON",
        message: "Submit a valid JSON payload.",
      });
      return;
    }

    const result = await handleLeadSubmission(
      payload,
      {
        CRM_PROVIDER: process.env.CRM_PROVIDER,
        CRM_WEBHOOK_URL: process.env.CRM_WEBHOOK_URL,
        CRM_API_KEY: process.env.CRM_API_KEY,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
      },
      typeof payload === "object" &&
        payload !== null &&
        !Array.isArray(payload) &&
        typeof (payload as { sourcePage?: unknown }).sourcePage === "string"
        ? (payload as { sourcePage: string }).sourcePage
        : CONTACT.requestDemoPath,
    );

    sendJson(response, result.status, result.body);
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      sendJson(response, 413, {
        ok: false,
        error: "PAYLOAD_TOO_LARGE",
        message: "The submitted payload is too large.",
      });
      return;
    }

    sendJson(response, 500, {
      ok: false,
      error: "CRM_SUBMISSION_FAILED",
      message: "Lead submission could not be completed.",
    });
  }
}
