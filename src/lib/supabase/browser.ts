import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';

/**
 * Supabase client for use in browser/client components.
 * Uses the anonymous key and is restricted by RLS.
 */
export const createBrowserClient = () => {
  return createClient(
    env.supabase.url!,
    env.supabase.anonKey!
  );
};

export const supabase = createBrowserClient();
