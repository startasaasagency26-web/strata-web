import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/browser';
import type { CrmUserProfile, CrmRole } from '../types/crm';

interface CrmAuthContextType {
  user: any | null;
  profile: CrmUserProfile | null;
  isLoading: boolean;
  role: CrmRole | null;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthContextType | undefined>(undefined);

export const CrmAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<CrmUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('crm_profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) {
        console.error('[auth] Error fetching profile:', error);
        return null;
      }

      // Map DB snake_case to camelCase
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
      console.error('[auth] Unexpected error fetching profile:', err);
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

  return (
    <CrmAuthContext.Provider value={{ 
      user, 
      profile, 
      isLoading, 
      role: profile?.role ?? null,
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
