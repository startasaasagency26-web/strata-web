import { validateEnv } from "../src/lib/env";
import { CrmRepository } from "../src/lib/crm/repository";
import { validateLeadPayload } from "../src/lib/crm/lead-schema";
import type { LeadApiResponse } from "../src/lib/crm/types";

const MAX_BODY_BYTES = 64 * 1024;

const sendJson = (response: any, status: number, body: LeadApiResponse) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
};

const readBody = async (request: any) =>
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

export default async function handler(request: any, response: any) {
  // 1. Method Check
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
    // 2. Validate Environment
    validateEnv();

    // 3. Read & Parse Body
    const rawBody = await readBody(request);
    let payload: any;

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

    // 4. Validate & Normalize Lead Data
    const validation = validateLeadPayload(payload, { 
      sourcePage: payload.sourcePage || "/request-demo" 
    });

    if (validation.ok === false) {
      sendJson(response, 400, {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Please check the required fields.",
        fieldErrors: validation.fieldErrors,
      });
      return;
    }

    const lead = validation.lead;

    // 5. Insert into Supabase via Repository
    try {
      const insertedLead = await CrmRepository.insertLead({
        full_name: lead.fullName,
        company_name: lead.companyName,
        work_email: lead.workEmail,
        whatsapp_phone: lead.whatsappPhone,
        role_in_business: lead.roleInBusiness,
        country_timezone: lead.countryTimezone,
        preferred_language: lead.preferredLanguage,
        business_type: lead.businessType,
        service_need: lead.serviceNeed,
        website_url: lead.websiteUrl,
        current_problem: lead.currentProblem,
        project_goal: lead.projectGoal,
        budget_range: lead.budgetRange,
        selected_package: lead.selectedPackage,
        timeline: lead.timeline,
        source_page: lead.sourcePage,
        consent: lead.consent,
        raw_payload: lead.rawPayload || {}
      });

      // 6. Return Success
      sendJson(response, 200, {
        ok: true,
        leadId: insertedLead.id,
        message: "Lead submitted successfully.",
      });
    } catch (dbError) {
      console.error("[api/leads] Supabase insertion failed:", dbError);
      sendJson(response, 502, {
        ok: false,
        error: "SUPABASE_INSERT_FAILED",
        message: "We could not submit your request right now.",
      });
    }
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      sendJson(response, 413, {
        ok: false,
        error: "PAYLOAD_TOO_LARGE",
        message: "The submitted payload is too large.",
      });
      return;
    }

    console.error("[api/leads] Unexpected error:", error);
    sendJson(response, 500, {
      ok: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    });
  }
}

