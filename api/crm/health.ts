import { validateEnv } from "../../src/lib/env";
import { supabaseAdmin } from "../../src/lib/supabase/admin";
import { sendSuccess, sendError } from "../../src/lib/crm/auth";

export default async function handler(_request: any, response: any) {
  try {
    validateEnv();

    const results = {
      supabaseConnected: false,
      tables: {
        crm_leads: false,
        crm_lead_notes: false,
        crm_follow_ups: false
      }
    };

    // Check connection and tables
    const { error } = await supabaseAdmin
      .from('crm_leads')
      .select('id')
      .limit(1);

    if (!error) {
      results.supabaseConnected = true;
      results.tables.crm_leads = true;
    }

    const { error: notesError } = await supabaseAdmin.from('crm_lead_notes').select('id').limit(1);
    if (!notesError) results.tables.crm_lead_notes = true;

    const { error: fuError } = await supabaseAdmin.from('crm_follow_ups').select('id').limit(1);
    if (!fuError) results.tables.crm_follow_ups = true;

    sendSuccess(response, results);
  } catch (error) {
    sendError(response, 500, "Supabase connection failed.");
  }
}
