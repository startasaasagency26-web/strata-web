// import type { IncomingMessage, ServerResponse } from "http";
import { createServerClient } from "../supabase/server";
import { env } from "../env";

export type AuthResult = 
  | { ok: true; user: any } 
  | { ok: false; status: number; message: string };

/**
 * Protects CRM routes by validating the user session and email allowlist.
 */
export const protectCrmRoute = async (request: any, _response: any): Promise<AuthResult> => {
  const supabase = createServerClient();
  
  // 1. Get user from session
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return { ok: false, status: 401, message: "Authentication required." };
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { ok: false, status: 401, message: "Invalid session." };
  }

  // 2. Check Admin Allowlist
  const isAllowed = env.admin.adminEmails.includes(user.email?.toLowerCase() || '');
  
  if (!isAllowed) {
    console.warn(`[auth] Unauthorized access attempt by ${user.email}`);
    return { ok: false, status: 403, message: "Access denied." };
  }

  return { ok: true, user };
};

export const sendError = (response: any, status: number, message: string) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ ok: false, message }));
};

export const sendSuccess = (response: any, data: any) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ ok: true, ...data }));
};
