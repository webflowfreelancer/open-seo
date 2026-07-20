import type { AccessRole } from "@/shared/access";

type DelegatedAccessConfig = {
  organizationId?: string;
  organizationName?: string;
  adminEmails?: string;
};

const DEFAULT_ORGANIZATION_ID = "open-seo-shared";
const DEFAULT_ORGANIZATION_NAME = "OpenSEO";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getAdminEmails(value: string | undefined) {
  return new Set(
    (value ?? "").split(/[,\n]/).map(normalizeEmail).filter(Boolean),
  );
}

export function resolveDelegatedAccess(
  userEmail: string,
  config: DelegatedAccessConfig,
) {
  const organizationId =
    config.organizationId?.trim() || DEFAULT_ORGANIZATION_ID;
  const organizationName =
    config.organizationName?.trim() || DEFAULT_ORGANIZATION_NAME;
  const role: AccessRole = getAdminEmails(config.adminEmails).has(
    normalizeEmail(userEmail),
  )
    ? "admin"
    : "user";

  return { organizationId, organizationName, role };
}
