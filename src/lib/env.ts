/**
 * Environment variable validator for Strata CRM.
 * Ensures required keys are present at runtime.
 */

export const env = {
  // Public keys (available in browser and server)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  },
  // Private keys (server only)
  admin: {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    adminEmails: (process.env.CRM_ADMIN_EMAILS || 'admin@strata.agency').split(',').map(e => e.trim().toLowerCase()),
  },
  isProd: import.meta.env.PROD || process.env.NODE_ENV === 'production',
};

export const validateEnv = () => {
  const missing: string[] = [];

  if (!env.supabase.url) missing.push('VITE_SUPABASE_URL');
  if (!env.supabase.anonKey) missing.push('VITE_SUPABASE_ANON_KEY');

  // Only validate admin keys on the server
  if (typeof window === 'undefined') {
    if (!env.admin.serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  if (missing.length > 0) {
    const error = `Missing environment variables: ${missing.join(', ')}`;
    console.error(`[env] ${error}`);
    throw new Error(error);
  }
};
