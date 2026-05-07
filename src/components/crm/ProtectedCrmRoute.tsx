import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCrmAuth } from '../../contexts/CrmAuthContext';
import { LoadingState } from './CrmUI';

interface ProtectedCrmRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedCrmRoute: React.FC<ProtectedCrmRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, profile, isLoading, role } = useCrmAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <LoadingState message="Verifying session..." />
      </div>
    );
  }

  // 1. Not logged in -> Redirect to login
  if (!user) {
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  // 2. Logged in but no profile yet (e.g. fresh auth but not in crm_profiles)
  // This can happen if the user is in Auth but not in our CRM profiles table.
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-display font-bold text-white mb-4 uppercase">Access Denied</h1>
        <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-md">
          Your account is not authorized to access the CRM. Please contact an administrator.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-widest"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // 3. Admin requirement check
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/crm" replace />;
  }

  return <>{children}</>;
};
