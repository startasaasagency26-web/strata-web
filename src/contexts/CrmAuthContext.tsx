import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/browser';
import type { CrmUserProfile, CrmRole } from '../types/crm';

interface CrmAuthContextType {
  user: any | null;
  profile: CrmUserProfile | null;
  isLoading: boolean;
  role: CrmRole | null;
  error: string | null;
  isAuthorized: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthContextType | undefined>(undefined);

export const CrmAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<CrmUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (uid: string) => {
    console.log('[auth] Fetching profile for:', uid);
    try {
      setError(null);
      const { data, error: profileError } = await supabase
        .from('crm_profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          console.warn('[auth] No CRM profile found for UID:', uid);
        } else {
          console.error('[auth] Profile lookup failed:', profileError);
          setError(`CRM profile verification failed (Error: ${profileError.code || 'Unknown'}). Please check your connection.`);
        }
        return null;
      }

      console.log('[auth] Profile loaded:', data.full_name, '(', data.role, ')');
      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        role: data.role as CrmRole,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as CrmUserProfile;
    } catch (err) {
      console.error('[auth] Unexpected error during fetchProfile:', err);
      setError('An unexpected error occurred while verifying your account.');
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const p = await fetchProfile(user.id);
      setProfile(p);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Guard: if Supabase URL is not defined, don't attempt any network calls
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.error('[auth] VITE_SUPABASE_URL is not defined. Check Vercel env vars and redeploy.');
        if (mounted) {
          setError('Configuration error. Please contact support.');
          setIsLoading(false);
        }
        return;
      }

      try {
        // getSession reads localStorage - zero network calls, always instant
        const { data: { session } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          // Load profile in background - never block render on this
          fetchProfile(session.user.id).then((p) => {
            if (mounted) setProfile(p);
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error('[auth] Init failed:', err);
        if (mounted) setError('Failed to initialize. Please refresh.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    init();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[auth] Auth state change:', event);
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const authUser = session?.user ?? null;
        setUser(authUser);
        if (authUser) {
          const p = await fetchProfile(authUser.id);
          if (mounted) setProfile(p);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setError(null);
      }
      
      if (mounted) setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAuthorized = !!profile
    ? profile.status === 'active' && (profile.role === 'admin' || profile.role === 'manager')
    : false;

  return (
    <CrmAuthContext.Provider value={{ 
      user, 
      profile, 
      isLoading, 
      role: profile?.role ?? null,
      error,
      isAuthorized,
      signOut,
      refreshProfile
    }}>
      {children}
    </CrmAuthContext.Provider>
  );
};

export const useCrmAuth = () => {
  const context = useContext(CrmAuthContext);
  if (context === undefined) {
    throw new Error('useCrmAuth must be used within a CrmAuthProvider');
  }
  return context;
};
