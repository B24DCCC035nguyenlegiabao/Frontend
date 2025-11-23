import { UserRole } from "../types";

/**
 * Check if user has admin role
 */
export const isAdmin = (role: string | null): boolean => {
  return role === UserRole.ADMIN;
};

/**
 * Check if user has staff role
 */
export const isStaff = (role: string | null): boolean => {
  return role === UserRole.STAFF;
};

/**
 * Check if user has admin or staff role
 */
export const isAdminOrStaff = (role: string | null): boolean => {
  return role === UserRole.ADMIN || role === UserRole.STAFF;
};

/**
 * Get role display name
 */
export const getRoleDisplay = (role: string): string => {
  switch (role) {
    case UserRole.ADMIN:
      return "Quản trị viên";
    case UserRole.STAFF:
      return "Nhân viên";
    default:
      return "Người dùng";
  }
};
