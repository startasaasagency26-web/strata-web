import type { CrmRole, CrmPermissions } from "../../types/crm.js";

/**
 * Permission mapping based on CRM roles.
 */
export const getPermissions = (role: CrmRole): CrmPermissions => {
  const isAdmin = role === 'admin';
  const isManager = role === 'manager';

  return {
    canManageTeam: isAdmin,
    canChangeRoles: isAdmin,
    canEditSettings: isAdmin,
    canAccessDangerZone: isAdmin,
    canEditLeads: isAdmin || isManager,
  };
};

/**
 * Strict check for admin-only actions.
 */
export const requireAdmin = (role: CrmRole): boolean => {
  return role === 'admin';
};
