import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

/**
 * Supabase client for use in server-side handlers (Vercel Functions).
 * Uses the anonymous key but runs in a server context.
 */
export const createServerClient = () => {
  return createClient(
    env.supabase.url!,
    env.supabase.anonKey!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};
