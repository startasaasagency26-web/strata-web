import { protectCrmRoute, sendSuccess, sendError } from "../../src/lib/crm/auth.js";
import { CrmRepository } from "../../src/lib/crm/repository.js";
import { supabaseAdmin } from "../../src/lib/supabase/admin.js";
import { URL } from "node:url";

export default async function handler(request: any, response: any) {
  const auth = await protectCrmRoute(request, response);
  if (!auth.ok) return sendError(response, auth.status, auth.message);

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
    } else if (request.method === "POST") {
      let body;
      try {
        body = JSON.parse(request.body);
      } catch (e) {
        return response.status(400).json({ error: "Invalid JSON" });
      }

      const {
        fullName,
        companyName,
        workEmail,
        whatsappPhone,
        serviceNeed,
        selectedPackage,
        budgetRange,
        status = 'new',
        priority = 'warm'
      } = body;

      if (!fullName) {
        return response.status(400).json({ error: "fullName is required" });
      }

      const { data, error } = await supabaseAdmin.from('crm_leads').insert({
        full_name: fullName,
        company_name: companyName,
        work_email: workEmail,
        whatsapp_phone: whatsappPhone,
        service_need: serviceNeed,
        selected_package: selectedPackage,
        budget_range: budgetRange,
        status,
        priority
      }).select().single();

      if (error) {
        console.error("[api/crm/leads] POST error:", error);
        return response.status(500).json({ error: "Failed to create lead" });
      }

      return response.status(201).json(data);
    } else {
      sendError(response, 405, "Method not allowed.");
    }
  } catch (error) {
    console.error("[api/crm/leads] Error:", error);
    sendError(response, 500, "Failed to load leads.");
  }
}
