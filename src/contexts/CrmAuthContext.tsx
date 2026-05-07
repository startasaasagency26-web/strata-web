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
    try {
      setError(null);
      const { data, error: profileError } = await supabase
        .from('crm_profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (profileError) {
        // Special case: Row not found is a specific authorization error, not a network error
        if (profileError.code === 'PGRST116') {
          console.warn('[auth] No CRM profile found for user:', uid);
        } else {
          console.error('[auth] Profile lookup failed:', profileError);
          setError('CRM profile verification failed. Please check your connection.');
        }
        return null;
      }

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
      console.error('[auth] Unexpected error:', err);
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
    // 1. Initial session check
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      }
      setIsLoading(false);
    };

    initSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN' && session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAuthorized = !!profile && 
    profile.status === 'active' && 
    (profile.role === 'admin' || profile.role === 'manager');

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
