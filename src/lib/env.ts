/**
 * Environment variable validator for Strata CRM.
 * Ensures required keys are present at runtime.
 */

type RuntimeProcess = {
  env?: Record<string, string | undefined>;
};

declare const process: RuntimeProcess | undefined;

type ImportMetaWithEnv = ImportMeta & {
  env?: Record<string, string | boolean | undefined>;
};

const importMetaEnv = (import.meta as ImportMetaWithEnv).env ?? {};
const runtimeProcess = typeof process !== 'undefined' ? process : undefined;
const envString = (value: string | boolean | undefined) => typeof value === 'string' ? value : undefined;

export const env = {
  // Public keys (available in browser and server)
  supabase: {
    url: envString(importMetaEnv.VITE_SUPABASE_URL) || runtimeProcess?.env?.VITE_SUPABASE_URL,
    anonKey: envString(importMetaEnv.VITE_SUPABASE_ANON_KEY) || runtimeProcess?.env?.VITE_SUPABASE_ANON_KEY,
  },
  // Private keys (server only)
  admin: {
    serviceRoleKey: runtimeProcess?.env?.SUPABASE_SERVICE_ROLE_KEY,
    adminEmails: (runtimeProcess?.env?.CRM_ADMIN_EMAILS || 'admin@strata.agency').split(',').map((e: string) => e.trim().toLowerCase()),
  },
  isProd: Boolean(importMetaEnv.PROD) || runtimeProcess?.env?.NODE_ENV === 'production',
};

export const validateEnv = () => {
  const missing: string[] = [];

  if (!env.supabase.url) missing.push('VITE_SUPABASE_URL');
  if (!env.supabase.anonKey) missing.push('VITE_SUPABASE_ANON_KEY');

  // Only validate admin keys on the server
  if (!('window' in globalThis)) {
    if (!env.admin.serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  if (missing.length > 0) {
    const error = `Missing environment variables: ${missing.join(', ')}`;
    console.error(`[env] ${error}`);
    throw new Error(error);
  }
};
