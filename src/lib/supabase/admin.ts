import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';

/**
 * Supabase client for use in server-side/admin operations only.
 * Uses the Service Role Key and BYPASSES RLS.
 * 
 * WARNING: NEVER import this into client components.
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

export const supabaseAdmin = createAdminClient();
