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
  const { user, profile, isLoading, role, isAuthorized, error } = useCrmAuth();
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

  // 2. Technical error during profile lookup
  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-display font-bold text-white mb-4 uppercase">Verification Error</h1>
        <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-md">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 border border-white/10 text-white/40 hover:text-white font-mono text-[10px] uppercase tracking-widest rounded-lg transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // 3. Logged in but not authorized (no profile, wrong status, or wrong role)
  if (!isAuthorized) {
    let message = 'Your account is not authorized to access the CRM. Please contact an administrator.';
    
    if (profile && profile.status !== 'active') {
      message = `Your account status is "${profile.status}". Access is currently restricted.`;
    } else if (profile && profile.role !== 'admin' && profile.role !== 'manager') {
      message = 'Your role does not have sufficient permissions to access the CRM dashboard.';
    }

    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-display font-bold text-white mb-4 uppercase">Access Denied</h1>
        <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-md leading-loose">
          {message}
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

  // 4. Admin requirement check
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/crm" replace />;
  }

  return <>{children}</>;
};
