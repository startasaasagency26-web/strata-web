import React, { useEffect, useState } from 'react';
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
  const { user, profile, isLoading, role, isAuthorized } = useCrmAuth();
  const location = useLocation();

  // Profile loads in background after isLoading=false.
  // Wait up to 3s for it before showing Access Denied.
  const [profileWaitExpired, setProfileWaitExpired] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (user && !profile) {
      const t = setTimeout(() => setProfileWaitExpired(true), 3000);
      return () => clearTimeout(t);
    }
  }, [isLoading, user, profile]);

  // Still initialising or waiting for profile
  if (isLoading || (user && !profileWaitExpired && !profile)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <LoadingState message="Verifying session..." />
      </div>
    );
  }

  // No session — go to login
  if (!user) {
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  // Logged in but not authorised
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

  // Admin-only pages
  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/crm" replace />;
  }

  return <>{children}</>;
};
