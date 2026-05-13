import { createServerClient } from "../supabase/server.js";
import { supabaseAdmin } from "../supabase/admin.js";
import { env } from "../env.js";
import type { CrmRole, CrmUserProfile } from "../../types/crm.js";

export type AuthResult = 
  | { ok: true; user: { id: string; email?: string }; profile: CrmUserProfile; role: CrmRole } 
  | { ok: false; status: number; message: string };

type ProtectOptions = {
  adminOnly?: boolean;
};

type HeaderMap = Record<string, string | string[] | undefined>;

type HttpRequest = {
  headers: HeaderMap;
};

type HttpResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body: string) => void;
};

type DbCrmProfile = {
  id: string;
  email: string;
  full_name: string;
  role: CrmRole;
  status: CrmUserProfile["status"];
  created_at: string;
  updated_at: string;
};

const mapProfile = (profile: DbCrmProfile): CrmUserProfile => ({
  id: profile.id,
  email: profile.email,
  fullName: profile.full_name,
  role: profile.role,
  status: profile.status,
  createdAt: profile.created_at,
  updatedAt: profile.updated_at,
});

/**
 * Protects CRM routes by validating the bearer token and crm_profiles role/status.
 */
export const protectCrmRoute = async (
  request: HttpRequest,
  _response: HttpResponse,
  options: ProtectOptions = {},
): Promise<AuthResult> => {
  const supabase = createServerClient();
  
  const rawAuthHeader = request.headers.authorization || request.headers.Authorization;
  const authHeader = Array.isArray(rawAuthHeader) ? rawAuthHeader[0] : rawAuthHeader;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { ok: false, status: 401, message: "Authentication required." };
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { ok: false, status: 401, message: "Invalid session." };
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("crm_profiles")
    .select("id,email,full_name,role,status,created_at,updated_at")
    .eq("id", user.id)
    .maybeSingle<DbCrmProfile>();

  if (profileError) {
    console.error("[auth] CRM profile lookup failed:", profileError);
    return { ok: false, status: 500, message: "Unable to verify CRM permissions." };
  }

  if (!profile) {
    console.warn(`[auth] CRM access denied: missing profile for ${user.email}`);
    return { ok: false, status: 403, message: "CRM profile required." };
  }

  if (profile.status !== "active") {
    return { ok: false, status: 403, message: "CRM account is not active." };
  }

  if (profile.role !== "admin" && profile.role !== "manager") {
    return { ok: false, status: 403, message: "CRM role is not authorized." };
  }

  if (options.adminOnly && profile.role !== "admin") {
    return { ok: false, status: 403, message: "Admin access required." };
  }

  const email = user.email?.toLowerCase();
  if (email && env.admin.adminEmails.includes(email)) {
    console.info(`[auth] CRM admin allowlist email authenticated through profile: ${email}`);
  }

  return {
    ok: true,
    user: { id: user.id, email: user.email },
    profile: mapProfile(profile),
    role: profile.role,
  };
};

export const sendError = (
  response: HttpResponse,
  status: number,
  message: string,
  extra?: Record<string, unknown>,
) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify({ ok: false, message, ...extra }));
};

export const sendSuccess = (response: HttpResponse, data: Record<string, unknown>, status = 200) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify({ ok: true, ...data }));
};
