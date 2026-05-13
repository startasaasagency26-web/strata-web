/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/browser';
import type { CrmUserProfile, CrmRole } from '../types/crm';

interface CrmAuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CrmUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (uid: string): Promise<CrmUserProfile | null> => {
    try {
      const { data, error: profileError } = await supabase
        .from('crm_profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (profileError) {
        if (profileError.code !== 'PGRST116') {
          console.error('[auth] Profile lookup error:', profileError.code);
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
      console.error('[auth] fetchProfile exception:', err);
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
      try {
        // getSession reads localStorage — no network call, always instant
        const { data: { session } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          // Load profile in background — never block the render on this
          fetchProfile(session.user.id).then((p) => {
            if (mounted) setProfile(p);
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error('[auth] Init error:', err);
      } finally {
        // Always unblock the UI immediately — profile loads separately
        if (mounted) setIsLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const authUser = session?.user ?? null;
        setUser(authUser);
        if (authUser) {
          fetchProfile(authUser.id).then((p) => {
            if (mounted) setProfile(p);
          });
        }
        if (mounted) setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setError(null);
        if (mounted) setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
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
