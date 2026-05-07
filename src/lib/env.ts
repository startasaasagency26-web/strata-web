/**
 * Environment variable validator for Strata CRM.
 * Ensures required keys are present at runtime.
 */

declare const process: any;

export const env = {
  // Public keys (available in browser and server)
  supabase: {
    url: (import.meta as any).env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    anonKey: (import.meta as any).env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  },
  // Private keys (server only)
  admin: {
    serviceRoleKey: typeof process !== 'undefined' ? process.env?.SUPABASE_SERVICE_ROLE_KEY : undefined,
    adminEmails: (typeof process !== 'undefined' ? process.env?.CRM_ADMIN_EMAILS || 'admin@strata.agency' : 'admin@strata.agency').split(',').map((e: string) => e.trim().toLowerCase()),
  },
  isProd: (import.meta as any).env.PROD || (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production'),
};

export const validateEnv = () => {
  const missing: string[] = [];

  if (!env.supabase.url) missing.push('VITE_SUPABASE_URL');
  if (!env.supabase.anonKey) missing.push('VITE_SUPABASE_ANON_KEY');

  // Only validate admin keys on the server
  if (typeof (globalThis as any).window === 'undefined') {
    if (!env.admin.serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  if (missing.length > 0) {
    const error = `Missing environment variables: ${missing.join(', ')}`;
    console.error(`[env] ${error}`);
    throw new Error(error);
  }
};
