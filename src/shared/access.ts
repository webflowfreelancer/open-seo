export const ACCESS_ROLES = ["admin", "user"] as const;

export type AccessRole = (typeof ACCESS_ROLES)[number];

export function canManageWorkspace(role: AccessRole) {
  return role === "admin";
}
