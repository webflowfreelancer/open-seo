import type { AccessRole } from "@/shared/access";
import { PRODUCT_WORKSPACE_NAME } from "@/shared/product-brand";

type DelegatedAccessConfig = {
  organizationId?: string;
  organizationName?: string;
  adminEmails?: string;
};

const DEFAULT_ORGANIZATION_ID = "open-seo-shared";
const DEFAULT_ORGANIZATION_NAME = PRODUCT_WORKSPACE_NAME;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isDelegatedEmailAllowed(
  userEmail: string,
  allowedDomain: string | undefined,
) {
  const domain = allowedDomain?.trim().toLowerCase().replace(/^@/, "");
  if (!domain) return true;

  const [localPart, emailDomain, ...extraParts] =
    normalizeEmail(userEmail).split("@");
  return (
    Boolean(localPart) && emailDomain === domain && extraParts.length === 0
  );
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
