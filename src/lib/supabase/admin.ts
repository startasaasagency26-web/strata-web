import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';

/**
 * Supabase admin client — server-side only, bypasses RLS.
 * WARNING: Never import this in browser/client components.
 */
export const createAdminClient = () => {
  if (typeof (globalThis as any).window !== 'undefined') {
    throw new Error('Admin client cannot be initialized in the browser.');
  }
  if (!env.admin.serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client.');
  }
  return createClient(
    env.supabase.url!,
    env.admin.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};

let _adminClient: ReturnType<typeof createAdminClient> | null = null;

export const getAdminClient = () => {
  if (!_adminClient) _adminClient = createAdminClient();
  return _adminClient;
};

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createAdminClient>, {
  get(_target, prop) {
    return (getAdminClient() as any)[prop];
  }
});
